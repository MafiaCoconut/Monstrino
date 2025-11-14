from __future__ import annotations

from pathlib import Path
from functools import lru_cache
from typing import Literal
import os

import logging
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, SecretStr, computed_field, field_validator
from sqlalchemy.engine import URL


system_logger = logging.getLogger(__name__)



@lru_cache(maxsize=1)
def find_env_file(start: Path | None = None) -> Path | None:
    """
    Ищет .env, двигаясь вверх от start (или от файла модуля),
    останавливается на корне. Возвращает Path или None.
    """
    # Приоритет: ENV_FILE из окружения
    env_override = os.getenv("ENV_FILE")
    if env_override:
        p = Path(env_override).expanduser().resolve()
        if p.is_file():
            return p
        system_logger.warning("ENV_FILE='%s' не найден.", env_override)

    base = (start or Path(__file__).parent).resolve()
    for cur in [base, *base.parents]:
        candidate = cur / ".env"
        if candidate.is_file():
            return candidate
    return None
# def find_src_folder(start_path: Path) -> Path:
#     """Рекурсивно ищет директорию 'src' начиная с указанного пути и поднимаясь."""
#     current_path = start_path.resolve()
#     while current_path != current_path.parent:  # Пока не достигнем корня файловой системы
#         src_path = current_path / "src"
#         if src_path.is_dir():  # Проверяем, существует ли папка src
#             return src_path
#         current_path = current_path.parent
#     raise FileNotFoundError("Папка 'src' не найдена в иерархии директорий.")
#
# def get_env_path():
#     """
#     Эти функции нужны для того, чтобы корректно находить .env
#     вне зависимости откуда была начата программа
#     """
#     env_path = ".env"
#     try:
#         src_folder = find_src_folder(Path(__file__).parent)
#         env_path = src_folder / ".env"
#     except Exception as e:
#         system_logger.error(f"env_path: {env_path}")
#
#     return env_path
class DBSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=find_env_file(),          # может быть None — это ок
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Режим приложения
    MODE: Literal["dev", "prod", "test"] = Field(default="dev")

    # Подключение к БД
    DB_HOST: str = Field(default="localhost")
    DB_PORT: int = Field(default=5432)
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    # Валидация порта
    @field_validator("DB_PORT")
    @classmethod
    def _port_range(cls, v: int) -> int:
        if not (1 <= v <= 65535):
            raise ValueError("DB_PORT должен быть в диапазоне 1..65535")
        return v

    @property
    def DATABASE_URL_asyncpg(self):
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


    @property
    def DATABASE_URL_psycopg(self):
        return f"postgresql+psycopg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"



# Ленивый синглтон без побочных эффектов при импорте
@lru_cache(maxsize=1)
def get_db_settings() -> DBSettings:
    return DBSettings()
