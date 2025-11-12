from datetime import datetime, UTC
from typing import Optional, List

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY, ForeignKey, TEXT, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class CharactersORM(Base):
    __tablename__ = "characters"
    id:                      Mapped[int] = mapped_column(
        Integer, primary_key=True)
    name:                    Mapped[str] = mapped_column(
        String(120),  nullable=False, unique=True)
    display_name:            Mapped[str] = mapped_column(
        String(120),  nullable=False)
    gender_id:               Mapped[int] = mapped_column(
        ForeignKey('character_gender.id'), nullable=False)
    description:   Mapped[Optional[str]] = mapped_column(Text)
    primary_image: Mapped[Optional[str]] = mapped_column(Text)
    alt_names:     Mapped[Optional[str]] = mapped_column(Text)
    notes:         Mapped[Optional[str]] = mapped_column(Text)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text(
        "TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"))

    # --------------- Relationships ----------------
    # 1:1
    pet: Mapped[Optional["PetsORM"]] = relationship(
        "PetsORM",
        back_populates="owner",
        uselist=False,
        cascade="save-update, merge"
    )

    # 1:1
    gender: Mapped["CharacterGendersORM"] = relationship(
        "CharacterGendersORM",
        back_populates="characters",
        uselist=False,
    )

    # release: Mapped[List["DollsReleasesORM"]] = relationship(
    #     secondary="release_character_link",
    #     back_populates="characters",
    #     viewonly=True
    # )
