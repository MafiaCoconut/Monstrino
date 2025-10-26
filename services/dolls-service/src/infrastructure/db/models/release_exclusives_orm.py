from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text, TEXT, INTEGER, Text
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ReleaseExclusivesORM(Base):
    __tablename__ = "release_exclusives"

    id:                       Mapped[int] = mapped_column(Integer,       primary_key=True)
    name:                     Mapped[str] = mapped_column(String(120),   nullable=False, unique=True)
    display_name:             Mapped[str] = mapped_column(String(120),   nullable=False, unique=True)
    description:    Mapped[Optional[str]] = mapped_column(Text)
    image:          Mapped[Optional[str]] = mapped_column(Text)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

