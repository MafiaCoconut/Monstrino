from datetime import datetime, UTC
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ReleaseImagesORM(Base):
    __tablename__ = "release_images"
    __table_args__ = (
        Index("ix_images_release", "release_id"),
        Index("ix_images_primary", "release_id", "is_primary"),
    )

    id:         Mapped[int]             = mapped_column(Integer, primary_key=True)
    release_id: Mapped[int]             = mapped_column(ForeignKey("releases.id"), nullable=False)
    url:        Mapped[str]             = mapped_column(String(500), nullable=False)
    is_primary: Mapped[bool]            = mapped_column(Boolean, default=False, nullable=False)

    updated_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    # Relationships:
    release:    Mapped["ReleasesORM"] = relationship(
        back_populates="images"
    )
