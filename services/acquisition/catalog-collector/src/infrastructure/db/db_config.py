from __future__ import annotations

import logging
import os
from functools import lru_cache
from pathlib import Path
from typing import Any, Literal

from icecream import ic
from pydantic import Field, SecretStr, computed_field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy.engine import URL


logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def find_env_file(start: Path | None = None) -> Path | None:
    """
    ENV file search
    """

    # Explicit env file
    explicit = os.getenv("ENV_FILE")
    if explicit:
        explicit_path = Path(explicit).expanduser().resolve()
        if explicit_path.is_file():
            return explicit_path
        logger.warning("Explicit env file not found: %s", explicit_path)

    # Find params by DB_MODE
    mode = (os.getenv("DB_MODE") or "local").strip().lower()
    if mode:
        logger.info(f"DB configuration mode: {mode}")
        mode_to_file = {
            "local": ".env.db_local",
            "test": ".env.db_test",
            "dev": ".env.db_dev",
            "prod": ".env.db_prod",
        }
        env_name = mode_to_file.get(mode)
        if env_name:
            p = Path(env_name).expanduser().resolve()
            if p.is_file():
                return p
            logger.warning("Env file for DB_MODE='%s' not found: %s", mode, p)

    # Search .env upwards
    base = (start or Path(__file__).parent).resolve()
    for cur in (base, *base.parents):
        candidate = cur / ".env"
        if candidate.is_file():
            return candidate

    return None


class DBSettings(BaseSettings):
    """
    Enterprise-настройки БД:
    - читает DB_* переменные окружения
    - пароль хранится как SecretStr
    - DSN формируется через SQLAlchemy URL.create (без ручных f-string)
    - единая точка доступа через get_db_settings() (кэш)
    """

    model_config = SettingsConfigDict(
        env_file=find_env_file(),
        env_file_encoding="utf-8",
        extra="ignore",          # env часто содержит лишнее (k8s/compose/CI)
        case_sensitive=False,
        env_prefix="DB_",        # HOST читается из DB_HOST и т.д.
    )

    # DB_MODE отдельно, чтобы не попадал под env_prefix=DB_
    mode: Literal["local", "dev", "test", "prod"] = Field(
        default="local",
        validation_alias="DB_MODE",
    )

    host: str           = Field(default="localhost", alias="DB_HOST")
    port: int           = Field(default=5432, alias="DB_PORT")

    user: str           = Field(alias="DB_USER")
    password: SecretStr = Field(alias="DB_PASSWORD")
    name: str           = Field(alias="DB_NAME")

    pool_size: int = Field(default=10, alias="POOL_SIZE")
    max_overflow: int = Field(default=20, alias="MAX_OVERFLOW")
    pool_timeout: int = Field(default=30, alias="POOL_TIMEOUT")
    pool_recycle: int = Field(default=1800, alias="POOL_RECYCLE")  # сек
    pool_pre_ping: bool = Field(default=True, alias="POOL_PRE_PING")
    echo_sql: bool = Field(default=False, alias="ECHO_SQL")

    # SSL (часто нужно в managed Postgres)
    # sslmode: Literal["disable", "allow", "prefer", "require", "verify-ca", "verify-full"] = Field(
    #     default="prefer",
    #     alias="SSLMODE",
    # )

    @field_validator("host")
    @classmethod
    def _host_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("DB_HOST must not be empty")
        return v

    @field_validator("port")
    @classmethod
    def _port_range(cls, v: int) -> int:
        if not (1 <= v <= 65535):
            raise ValueError("DB_PORT must be in range 1..65535")
        return v

    def _base_url(self, *, drivername: str) -> URL:
        # SecretStr безопасно “раскрываем” только здесь
        return URL.create(
            drivername=drivername,
            username=self.user,
            password=self.password.get_secret_value(),
            host=self.host,
            port=self.port,
            database=self.name,
        )

    @computed_field  # type: ignore[misc]
    @property
    def sqlalchemy_url_asyncpg(self) -> URL:
        return self._base_url(drivername="postgresql+asyncpg")

    @computed_field  # type: ignore[misc]
    @property
    def sqlalchemy_url_psycopg(self) -> URL:
        return self._base_url(drivername="postgresql+psycopg")

    @computed_field  # type: ignore[misc]
    @property
    def database_url_asyncpg(self) -> str:
        return self.sqlalchemy_url_asyncpg.render_as_string(hide_password=False)

    @computed_field  # type: ignore[misc]
    @property
    def database_url_psycopg(self) -> str:
        return self.sqlalchemy_url_psycopg.render_as_string(hide_password=False)

    def engine_kwargs(self) -> dict[str, Any]:
        connect_args: dict[str, Any] = {}

        return {
            "url": self.sqlalchemy_url_asyncpg,
            "echo": self.echo_sql,
            "pool_size": self.pool_size,
            "max_overflow": self.max_overflow,
            "pool_timeout": self.pool_timeout,
            "pool_recycle": self.pool_recycle,
            "pool_pre_ping": self.pool_pre_ping,
            "connect_args": connect_args,
        }


@lru_cache(maxsize=1)
def get_db_settings() -> DBSettings:
    # единая точка чтения env + кэш (удобно для DI и тестов)
    return DBSettings()
