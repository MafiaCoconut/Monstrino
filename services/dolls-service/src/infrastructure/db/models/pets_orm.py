from datetime import datetime, UTC
from typing import Optional, List

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY, ForeignKey, TEXT, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class PetsORM(Base):
    __tablename__ = "pets"
    id:                     Mapped[int] = mapped_column(Integer, primary_key=True)
    name:                   Mapped[str] = mapped_column(String(120),  nullable=False, unique=True)
    display_name:           Mapped[str] = mapped_column(String(120),  nullable=False)
    description:  Mapped[Optional[str]] = mapped_column(Text)
    owner_id:     Mapped[Optional[int]] = mapped_column(ForeignKey("characters.id"))

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    owner = relationship(
        "CharactersORM",
        back_populates='pet'
    )
