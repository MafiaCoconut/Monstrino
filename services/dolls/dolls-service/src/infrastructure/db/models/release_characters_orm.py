from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base

class ReleaseCharactersORM(Base):
    __tablename__ = "release_characters"
    __table_args__ = (
        UniqueConstraint("release_id", "character_id", "role_id", name="uix_release_character_role"),
        Index("ix_rc_character_role", "character_id", "role_id"),
    )

    release_id:             Mapped[int] = mapped_column(ForeignKey("releases.id"), primary_key=True)
    character_id:           Mapped[int] = mapped_column(ForeignKey("characters.id"), primary_key=True)
    role_id:                Mapped[int] = mapped_column(ForeignKey("release_character_roles.id"), nullable=False)
    position:               Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    updated_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    # relationships:
    release: Mapped["DollsReleasesORM"] = relationship(
        back_populates="character_links",
        overlaps="characters"
    )
    character: Mapped["OriginalCharactersORM"] = relationship(
        overlaps="characters"
    )

