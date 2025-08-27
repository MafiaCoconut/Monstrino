from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base
from infrastructure.db.models.enums import RelationType


class DollsRelationsORM(Base):
    __tablename__ = "dolls_relations"
    __table_args__ = (
        Index("ix_rel_src", "release_id", "relation_type"),
        Index("ix_rel_dst", "related_release_id"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    release_id: Mapped[int] = mapped_column(ForeignKey("dolls_releases.id"), nullable=False)
    related_release_id: Mapped[int] = mapped_column(ForeignKey("dolls_releases.id"), nullable=False)
    relation_type: Mapped[RelationType] = mapped_column(SAEnum(RelationType), nullable=False)
    note: Mapped[Optional[str]] = mapped_column(String(240))

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))


    # relationships:
    # src — исходный релиз, dst — связанный
    src: Mapped["DollsReleasesORM"] = relationship(foreign_keys=[release_id], back_populates="relations_out")
    dst: Mapped["DollsReleasesORM"] = relationship(foreign_keys=[related_release_id], back_populates="relations_in")