from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text, TEXT, INTEGER,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ParsedSingleReleasesORM(Base):
    __tablename__ = "parsed_pets"

    id:                          Mapped[int] = mapped_column(Integer, primary_key=True)
    type_name:                   Mapped[str] = mapped_column(String(100), nullable=False)
    name:                        Mapped[str] = mapped_column(String(100))
    mpn:               Mapped[Optional[str]] = mapped_column(String(64))
    series_name:       Mapped[Optional[str]] = mapped_column(String(150))
    gender:            Mapped[Optional[str]] = mapped_column(String(50))
    pet_name:          Mapped[Optional[str]] = mapped_column(String(100))
    year:              Mapped[Optional[int]] = mapped_column(Integer)
    description:       Mapped[Optional[str]] = mapped_column(Text)
    from_the_box_tex:  Mapped[Optional[str]] = mapped_column(Text)
    link:              Mapped[Optional[str]] = mapped_column(Text)
    exclusive_of_name: Mapped[Optional[str]] = mapped_column(String(100))
    process_state:               Mapped[str] = mapped_column(String(50))
    original_html_content:       Mapped[str] = mapped_column(Text)
    extra:             Mapped[Optional[str]] = mapped_column(Text) # Любые дополнительные параметры

    updated_at:   Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:   Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    # id:              Mapped[int]             = mapped_column(Integer, primary_key=True)
    # type_id:         Mapped[int]             = mapped_column(ForeignKey("release_types.id"), nullable=False)
    # name:            Mapped[str]             = mapped_column(String(200), nullable=False)
    # mpn:             Mapped[Optional[str]]   = mapped_column(String(64))
    # series_id:       Mapped[Optional[int]]   = mapped_column(ForeignKey("release_series.id"))
    # year:            Mapped[Optional[int]]   = mapped_column(Integer)
    # description:     Mapped[Optional[str]]   = mapped_column(Text)
    # link:            Mapped[Optional[str]]   = mapped_column(Text)
    # exclusive_of_id: Mapped[Optional[int]]   = mapped_column(ForeignKey("release_exclusives.id"))
    #
    # updated_at:    Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    # created_at:    Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
