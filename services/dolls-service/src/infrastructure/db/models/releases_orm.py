from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base
from infrastructure.db.models.characters_orm import CharactersORM
from infrastructure.db.models.enums import ReleaseStatus
from infrastructure.db.models.product_types_orm import ProductTypesORM
from infrastructure.db.models.series_orm import SeriesORM


class ReleasesORM(Base):
    __tablename__ = "releases"
    __table_args__ = (
        # Индексы для ускоренного поиска
        Index("ix_releases_type", "type_id"),
        Index("ix_releases_series", "series_id"),
        Index("ix_releases_release_date", "release_date"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    type_id: Mapped[int] = mapped_column(ForeignKey("product_types.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    variant_name: Mapped[Optional[str]] = mapped_column(String(160))
    mpn: Mapped[Optional[str]] = mapped_column(String(64))
    series_id: Mapped[Optional[int]] = mapped_column(ForeignKey("series.id"))
    status: Mapped[ReleaseStatus] = mapped_column(SAEnum(ReleaseStatus), default=ReleaseStatus.released, nullable=False)
    release_date: Mapped[Optional[date]] = mapped_column(Date)
    description: Mapped[Optional[str]] = mapped_column(Text)
    link: Mapped[Optional[str]] = mapped_column(Text)

    updated_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at: Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    # relationships:
    type: Mapped[ProductTypesORM] = relationship()                      # связь с типом продукта
    series: Mapped[Optional[SeriesORM]] = relationship(back_populates="releases")  # серия

    # галерея изображений (один релиз -> много фото)
    images: Mapped[List["Image"]] = relationship(
        back_populates="release",
        cascade="all, delete-orphan"
    )

    # m2m персонажи (через промежуточную таблицу)
    characters: Mapped[List[CharactersORM]] = relationship(
        secondary="release_characters",
        back_populates="releases"
    )

    # список связей персонажей с ролями
    character_links: Mapped[List["ReleaseCharacter"]] = relationship(
        back_populates="release",
        cascade="all, delete-orphan"
    )

    # исходящие связи релиза с другими релизами
    relations_out: Mapped[List["Relation"]] = relationship(
        foreign_keys="Relation.release_id",
        back_populates="src",
        cascade="all, delete-orphan"
    )

    # входящие связи от других релизов
    relations_in: Mapped[List["Relation"]] = relationship(
        foreign_keys="Relation.related_release_id",
        back_populates="dst",
        cascade="all, delete-orphan"
    )

