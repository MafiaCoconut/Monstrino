from datetime import datetime, UTC
from typing import Optional, List

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base

class CharactersORM(Base):
    __tablename__ = "characters"
    id: Mapped[int]          = mapped_column(INTEGER,       primary_key=True)
    name: Mapped[str]        = mapped_column(String,        nullable=False, unique=True)
    description: Mapped[Optional[str]] = mapped_column(String,        nullable=False)
    alt_names: Mapped[list]  = mapped_column(ARRAY(String), nullable=False)
    notes: Mapped[str]       = mapped_column(String,        nullable=False)

    releases: Mapped[List["Release"]] = relationship(
        secondary="release_characters",
        back_populates="characters",
        viewonly=True
    )

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
