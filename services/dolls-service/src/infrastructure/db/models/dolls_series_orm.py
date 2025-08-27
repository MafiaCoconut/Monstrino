from datetime import datetime, UTC
from typing import List

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base



class DollsSeriesORM(Base):
    __tablename__ = "dolls_series"
    id: Mapped[int]          = mapped_column(INTEGER,       primary_key=True)
    name: Mapped[str]        = mapped_column(String,        nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String,        nullable=False)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    releases: Mapped[List["DollsReleasesORM"]] = relationship(back_populates="series")