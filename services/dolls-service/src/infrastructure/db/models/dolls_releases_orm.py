from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base
from infrastructure.db.models.original_mh_characters_orm import OriginalMHCharactersORM
from infrastructure.db.models.dolls_types_orm import DollsTypesORM
from infrastructure.db.models.dolls_series_orm import DollsSeriesORM


class DollsReleasesORM(Base):
    __tablename__ = "dolls_releases"
    __table_args__ = (
        # Индексы для ускоренного поиска
        Index("ix_releases_type", "type_id"),
        Index("ix_releases_series", "series_id"),
        Index("ix_releases_year", "year"),
    )

    id:            Mapped[int]             = mapped_column(Integer, primary_key=True)
    type_id:       Mapped[int]             = mapped_column(ForeignKey("dolls_types.id"), nullable=False)
    character_id:  Mapped[int]             = mapped_column(ForeignKey("original_mh_characters.id"), nullable=False)
    name:          Mapped[str]             = mapped_column(String(160), nullable=False)
    mpn:           Mapped[Optional[str]]   = mapped_column(String(64))
    series_id:     Mapped[Optional[int]]   = mapped_column(ForeignKey("dolls_series.id"))
    year:          Mapped[Optional[int]]   = mapped_column(Integer)
    description:   Mapped[Optional[str]]   = mapped_column(Text)
    link:          Mapped[Optional[str]]   = mapped_column(Text)

    updated_at:    Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:    Mapped[Optional[datetime]] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    # relationships:
    type: Mapped[DollsTypesORM] = relationship()                      # связь с типом продукта
    series: Mapped[Optional["DollsSeriesORM"]] = relationship(back_populates="releases")  # серия

    # галерея изображений (один релиз -> много фото)
    images: Mapped[List["DollsImagesORM"]] = relationship(
        back_populates="release",
        cascade="all, delete-orphan"
    )

    # m2m персонажи (через промежуточную таблицу)
    characters: Mapped[List["OriginalMHCharactersORM"]] = relationship(
        secondary="release_characters",
        back_populates="releases"
    )

    # список связей персонажей с ролями
    character_links: Mapped[List["ReleaseCharactersORM"]] = relationship(
        back_populates="release",
        cascade="all, delete-orphan"
    )

    # исходящие связи релиза с другими релизами
    relations_out: Mapped[List["DollsRelationsORM"]] = relationship(
        foreign_keys="Relation.release_id",
        back_populates="src",
        cascade="all, delete-orphan"
    )

    # входящие связи от других релизов
    relations_in: Mapped[List["DollsRelationsORM"]] = relationship(
        foreign_keys="Relation.related_release_id",
        back_populates="dst",
        cascade="all, delete-orphan"
    )

