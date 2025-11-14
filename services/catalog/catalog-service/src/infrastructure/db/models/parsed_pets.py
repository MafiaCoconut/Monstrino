from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text, TEXT, INTEGER,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ParsedPetsORM(Base):
    __tablename__ = "parsed_pet"

    id:                          Mapped[int] = mapped_column(
        Integer, primary_key=True)
    name:                        Mapped[str] = mapped_column(
        String(200), nullable=False)
    display_name:      Mapped[Optional[str]] = mapped_column(String(64))
    description:       Mapped[Optional[str]] = mapped_column(Text)
    owner_name:        Mapped[Optional[str]] = mapped_column(String(100))
    primary_image:     Mapped[Optional[str]] = mapped_column(Text)
    link:              Mapped[Optional[str]] = mapped_column(Text)
    processing_state:               Mapped[str] = mapped_column(String(50))
    original_html_content:       Mapped[str] = mapped_column(Text)

    updated_at:   Mapped[Optional[datetime]] = mapped_column(server_default=text(
        "TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:   Mapped[Optional[datetime]] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"))
