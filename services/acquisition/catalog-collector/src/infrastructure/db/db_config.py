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

class DBSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=find_env_file(),
        extra="ignore")

    MODE: str

    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    @property
    def DATABASE_URL_asyncpg(self):
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


    @property
    def DATABASE_URL_psycopg(self):
        return f"postgresql+psycopg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

db_settings = DBSettings()

