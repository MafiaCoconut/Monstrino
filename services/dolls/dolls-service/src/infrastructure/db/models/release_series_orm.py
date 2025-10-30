from datetime import datetime, UTC
from typing import List, Optional

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY, TEXT, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base



class ReleaseSeriesORM(Base):
    __tablename__ = "release_series"

    id:                       Mapped[int] = mapped_column(Integer,       primary_key=True)
    name:                     Mapped[str] = mapped_column(String(120),   nullable=False, unique=True)
    display_name:             Mapped[str] = mapped_column(String(120),   nullable=False, unique=True)
    description:    Mapped[Optional[str]] = mapped_column(TEXT)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    releases: Mapped[List["ReleasesORM"]] = relationship(
        back_populates="series",
        cascade="all, delete-orphan"
    )
