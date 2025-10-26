from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text, TEXT,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ReleaseRelationsORM(Base):
    __tablename__ = "release_relations"
    __table_args__ = (
        Index("ix_rel_src", "release_id", "relation_type_id"),
        Index("ix_rel_dst", "related_release_id"),
    )

    id:                          Mapped[int] = mapped_column(Integer, primary_key=True)
    release_id:                  Mapped[int] = mapped_column(ForeignKey("releases.id"), nullable=False)
    related_release_id:          Mapped[int] = mapped_column(ForeignKey("releases.id"), nullable=False)
    relation_type_id:            Mapped[int] = mapped_column(ForeignKey("relation_types.id"), nullable=False)
    note:              Mapped[Optional[str]] = mapped_column(Text)

    updated_at:   Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:   Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    # relationships:
    release: Mapped["ReleasesORM"] = relationship(
        back_populates="relations",
        foreign_keys=[release_id]
    )
    related_release: Mapped["ReleasesORM"] = relationship(
        back_populates="related_to",
        foreign_keys=[related_release_id]
    )
    relation_type: Mapped["RelationTypesORM"] = relationship(
        back_populates="relations"
    )