from datetime import datetime, UTC
from typing import List

from sqlalchemy import Column, String, JSON, Integer, Float, text, ARRAY, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ReleaseTypesORM(Base):
    __tablename__ = "release_type"

    id:           Mapped[int] = mapped_column(Integer,    primary_key=True)
    name:         Mapped[str] = mapped_column(
        String(80), nullable=False, unique=True)
    display_name: Mapped[str] = mapped_column(
        Text,       nullable=False, unique=True)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text(
        "TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"))

    release: Mapped[List["ReleasesORM"]] = relationship(
        back_populates="type",
        cascade="save-update, merge"
    )
