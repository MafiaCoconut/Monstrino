from datetime import datetime, UTC
from typing import Optional, List

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class CharacterGendersORM(Base):
    __tablename__ = "character_genders"

    id:    Mapped[int] = mapped_column(Integer, primary_key=True)
    name:  Mapped[str] = mapped_column(String(60),  nullable=False, unique=True)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    characters: Mapped[List["CharactersORM"]] = relationship(
        "CharactersORM",
        back_populates="gender"
    )