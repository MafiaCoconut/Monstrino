from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text, TEXT, INTEGER,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ParsedReleasesORM(Base):
    __tablename__ = "parsed_releases"

    id:                Mapped[int]             = mapped_column(Integer, primary_key=True)
    type_name:         Mapped[int]             = mapped_column(String(50),  nullable=False)
    name:              Mapped[str]             = mapped_column(String(200), nullable=False)
    mpn:               Mapped[Optional[str]]   = mapped_column(String(64))
    series_name:       Mapped[Optional[int]]   = mapped_column(Integer)
    year:              Mapped[Optional[int]]   = mapped_column(Integer)
    description:       Mapped[Optional[str]]   = mapped_column(Text)
    link:              Mapped[Optional[str]]   = mapped_column(Text)
    exclusive_of_name: Mapped[Optional[int]]   = mapped_column(ForeignKey("release_exclusives.id"))
