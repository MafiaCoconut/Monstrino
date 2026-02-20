# seed_from_sql_file.py
from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Callable, Iterable, Mapping, Optional
from uuid import UUID

import pytest
from icecream import ic
from monstrino_models.dto import Source
from pydantic import BaseModel

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_testing.fixtures import Repositories

# ВАЖНО: предполагаем, что DTO лежат тут и импортируются звездочкой в вашем проекте
# (как вы делали раньше: from monstrino_models.dto import *)
import monstrino_models.dto as dto_mod


# ----------------------------
# Настройки / хуки
# ----------------------------

# Если у вас в seed-файле встречаются поля вроде source_type_code / country_code и т.п.,
# и вы хотите подтягивать FK id динамически — добавляйте резолверы сюда.
# Ключ: (table_name, column_name) -> async fn(uow, raw_value) -> resolved_value
FK_RESOLVERS: dict[tuple[str, str], Callable[[Any, Any], Any]] = {}


# Если репозиторий называется иначе, чем таблица, можно переопределить здесь.
# Например: "parsed_pet" -> "pet_parsed" (если вдруг)
REPO_ALIASES: dict[str, str] = {}


# Для дедупликации: какие колонки использовать как "уникальный ключ" (если нет id).
# По умолчанию: пытаемся по "id", иначе ничего не проверяем и просто вставляем.
UNIQUE_KEYS: dict[str, tuple[str, ...]] = {
    # "parsed_pet": ("external_id", "source_id"),
}


# ----------------------------
# Внутренние структуры
# ----------------------------

@dataclass(frozen=True)
class InsertStmt:
    table: str
    columns: tuple[str, ...]
    values: tuple[Any, ...]


@dataclass(frozen=True)
class SeedReport:
    total_statements: int
    inserted_rows: int
    per_table_inserted: dict[str, int]


# ----------------------------
# Парсинг SQL INSERT
# ----------------------------

_INSERT_RE = re.compile(
    r"""^\s*INSERT\s+INTO\s+(?P<table>[a-zA-Z_][a-zA-Z0-9_]*)\s*
        \((?P<cols>[^)]*)\)\s*VALUES\s*\((?P<vals>.*)\)\s*;\s*$""",
    re.IGNORECASE | re.VERBOSE | re.DOTALL,
)


def _split_csv_preserving_quotes(s: str) -> list[str]:
    """
    Делит строку вида:  'a', null, 'b''c', '2026-02-18 02:50:59'
    на токены, корректно учитывая одинарные кавычки и экранирование '' внутри строки.
    """
    out: list[str] = []
    cur: list[str] = []
    in_str = False
    i = 0
    while i < len(s):
        ch = s[i]
        if ch == "'":
            cur.append(ch)
            if in_str:
                # если две кавычки подряд -> это экранированная кавычка внутри строки
                if i + 1 < len(s) and s[i + 1] == "'":
                    cur.append("'")
                    i += 2
                    continue
                in_str = False
            else:
                in_str = True
            i += 1
            continue

        if ch == "," and not in_str:
            token = "".join(cur).strip()
            out.append(token)
            cur = []
            i += 1
            continue

        cur.append(ch)
        i += 1

    token = "".join(cur).strip()
    if token:
        out.append(token)
    return out


def _unquote_sql_string(token: str) -> str:
    # token: 'hello''world' -> hello'world
    assert token.startswith("'") and token.endswith("'")
    inner = token[1:-1]
    return inner.replace("''", "'")


def _parse_scalar(token: str) -> Any:
    t = token.strip()
    if not t:
        return None
    low = t.lower()

    if low == "null":
        return None
    if low == "true":
        return True
    if low == "false":
        return False

    # строка
    if t.startswith("'") and t.endswith("'"):
        s = _unquote_sql_string(t)

        # UUID?
        try:
            return UUID(s)
        except Exception:
            pass

        # datetime "YYYY-MM-DD HH:MM:SS"
        # (если у вас timezone/iso — можно расширить)
        try:
            return datetime.strptime(s, "%Y-%m-%d %H:%M:%S")
        except Exception:
            pass

        return s

    # число (int/float)
    # NB: если у вас в SQL встречается 01 leading zero — это всё равно int.
    try:
        if "." in t:
            return float(t)
        return int(t)
    except Exception:
        pass

    # fallback: как есть
    return t


def parse_insert_line(line: str) -> Optional[InsertStmt]:
    m = _INSERT_RE.match(line)
    if not m:
        return None

    table = m.group("table").strip()
    cols_raw = m.group("cols").strip()
    vals_raw = m.group("vals").strip()

    columns = tuple(c.strip().strip('"') for c in cols_raw.split(",") if c.strip())
    val_tokens = _split_csv_preserving_quotes(vals_raw)
    values = tuple(_parse_scalar(v) for v in val_tokens)

    if len(columns) != len(values):
        raise ValueError(
            f"Column/value count mismatch for table '{table}': {len(columns)} cols vs {len(values)} vals.\n"
            f"cols={columns}\nvals={val_tokens}"
        )

    return InsertStmt(table=table, columns=columns, values=values)


def parse_sql_file(sql_path: str | Path) -> list[InsertStmt]:
    p = Path(sql_path)
    raw = p.read_text(encoding="utf-8", errors="ignore")

    stmts: list[InsertStmt] = []
    for n, line in enumerate(raw.splitlines(), start=1):
        line = line.strip()
        if not line or line.startswith("--"):
            continue

        stmt = parse_insert_line(line)
        if stmt is None:
            # если в файле есть что-то кроме INSERT, вы можете:
            # - raise
            # - или просто пропускать
            raise ValueError(f"Unsupported or malformed SQL at line {n}: {line[:200]}")
        stmts.append(stmt)

    return stmts


# ----------------------------
# Динамическое определение DTO и Repo
# ----------------------------

def snake_to_pascal(name: str) -> str:
    return "".join(part[:1].upper() + part[1:] for part in name.split("_") if part)


def get_dto_class_for_table(table: str) -> type[BaseModel]:
    """
    parsed_pet -> ParsedPet (ожидаем, что DTO класс так называется)
    """
    cls_name = snake_to_pascal(table)
    cls = getattr(dto_mod, cls_name, None)
    if cls is None:
        raise AttributeError(
            f"DTO class '{cls_name}' not found in monstrino_models.dto for table '{table}'. "
            f"Создайте DTO или добавьте маппинг в код."
        )
    if not isinstance(cls, type) or not issubclass(cls, BaseModel):
        raise TypeError(f"Found '{cls_name}', but it is not a Pydantic model (BaseModel).")
    return cls


def get_repo_for_table(uow: Any, table: str) -> Any:
    repo_name = REPO_ALIASES.get(table, table)
    repo = getattr(uow.repos, repo_name, None)
    if repo is None:
        raise AttributeError(
            f"Repository '{repo_name}' not found in uow.repos for table '{table}'. "
            f"Либо добавьте репозиторий, либо пропишите REPO_ALIASES."
        )
    return repo


# ----------------------------
# Вставка в БД через UoW / repos
# ----------------------------

async def _resolve_fk_if_needed(uow: Any, table: str, col: str, value: Any) -> Any:
    resolver = FK_RESOLVERS.get((table, col))
    if resolver is None:
        return value
    return await resolver(uow, value)


async def _exists_by_unique(repo: Any, dto_cls: type[BaseModel], table: str, payload: Mapping[str, Any]) -> bool:
    """
    Проверка "уже есть?" по ключам:
    - если есть id в payload -> repo.get_id_by(id=...)
    - иначе если в UNIQUE_KEYS есть правило -> repo.get_id_by(**{...})
    - иначе -> False
    """
    # 1) id
    if "id" in payload and payload["id"] is not None:
        try:
            obj_id = await repo.get_id_by(**{getattr(dto_cls, "ID", "id"): payload["id"]})
            return obj_id is not None
        except Exception:
            # repo может не поддерживать такой вызов — тогда не проверяем
            return False

    # 2) уникальные ключи
    keys = UNIQUE_KEYS.get(table)
    if keys:
        filt: dict[str, Any] = {}
        for k in keys:
            if k not in payload:
                return False
            filt[getattr(dto_cls, k.upper(), k)] = payload[k]
        try:
            obj_id = await repo.get_id_by(**filt)
            return obj_id is not None
        except Exception:
            return False

    return False


async def seed_from_sql_file(
    uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
    sql_path: str | Path,
    *,
    skip_existing: bool = True,
    batch_size: int = 500,
) -> SeedReport:
    """
    Главная функция:
    - читает INSERT-ы
    - группирует по таблицам
    - строит DTO динамически
    - сохраняет через save_many()
    """
    statements = parse_sql_file(sql_path)

    per_table: dict[str, list[InsertStmt]] = {}
    for st in statements:
        per_table.setdefault(st.table, []).append(st)

    inserted_total = 0
    per_table_inserted: dict[str, int] = {}

    async with uow_factory.create() as uow:
        source_id = await uow.repos.source.get_id_by(**{Source.CODE: 'mh-archive'})
        for table, stmts in per_table.items():
            dto_cls = get_dto_class_for_table(table)
            repo = get_repo_for_table(uow, table)

            models_to_save: list[BaseModel] = []
            inserted_for_table = 0

            for st in stmts:
                payload = dict(zip(st.columns, st.values))

                # FK-resolve hooks (если заданы)
                for col, val in list(payload.items()):
                    payload[col] = await _resolve_fk_if_needed(uow, table, col, val)

                if skip_existing:
                    exists = await _exists_by_unique(repo, dto_cls, table, payload)
                    if exists:
                        continue

                model = dto_cls.model_validate(payload)
                model.source_id = source_id
                try:
                    model.parent_id = None
                except Exception:
                    pass
                
                models_to_save.append(model)

                if len(models_to_save) >= batch_size:
                    await repo.save_many(models_to_save)
                    inserted_for_table += len(models_to_save)
                    inserted_total += len(models_to_save)
                    models_to_save.clear()

            if models_to_save:
                await repo.save_many(models_to_save)
                inserted_for_table += len(models_to_save)
                inserted_total += len(models_to_save)

            per_table_inserted[table] = inserted_for_table

    return SeedReport(
        total_statements=len(statements),
        inserted_rows=inserted_total,
        per_table_inserted=per_table_inserted,
    )

