from datetime import datetime, UTC
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base
from infrastructure.db.models.enums import ShotType
from infrastructure.db.models.dolls_releases_orm import DollsReleasesORM


class DollsImagesORM(Base):
    __tablename__ = "dolls_images"
    __table_args__ = (
        Index("ix_images_release", "release_id"),
        Index("ix_images_primary", "release_id", "is_primary"),
    )

    id:         Mapped[int]             = mapped_column(Integer, primary_key=True)
    release_id: Mapped[int]             = mapped_column(ForeignKey("dolls_releases.id"), nullable=False)
    url:        Mapped[str]             = mapped_column(String(500), nullable=False)
    is_primary: Mapped[bool]            = mapped_column(Boolean, default=False, nullable=False)
    shot_type:  Mapped[ShotType]        = mapped_column(SAEnum(ShotType), default=ShotType.box, nullable=False)
    width:      Mapped[Optional[int]]   = mapped_column(Integer)
    height:     Mapped[Optional[int]]   = mapped_column(Integer)

    release:    Mapped[DollsReleasesORM]     = relationship(back_populates="images")

    updated_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

