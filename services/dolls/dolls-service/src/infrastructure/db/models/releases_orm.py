from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text, TEXT, INTEGER,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ReleasesORM(Base):
    __tablename__ = "release"
    __table_args__ = (
        # Индексы для ускоренного поиска
        Index("ix_release_type", "type_id"),
        Index("ix_release_series", "series_id"),
        Index("ix_release_year", "year"),
    )

    id:              Mapped[int] = mapped_column(Integer, primary_key=True)
    type_id:         Mapped[int] = mapped_column(
        ForeignKey("release_type.id"), nullable=False)
    name:            Mapped[str] = mapped_column(String(200), nullable=False)
    mpn:             Mapped[Optional[str]] = mapped_column(String(64))
    series_id:       Mapped[Optional[int]] = mapped_column(
        ForeignKey("release_series.id"))
    year:            Mapped[Optional[int]] = mapped_column(Integer)
    description:     Mapped[Optional[str]] = mapped_column(Text)
    link:            Mapped[Optional[str]] = mapped_column(Text)
    exclusive_of_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("exclusive_vendor.id"))

    updated_at:    Mapped[Optional[datetime]] = mapped_column(server_default=text(
        "TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:    Mapped[Optional[datetime]] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"))

    # relationships:
    # type: # Mapped[ReleaseTypesORM] = relationship()                      # связь с типом продукта
    # series: Mapped[Optional["SeriesORM"]] = relationship(back_populates="release")  # серия
    #
    # # галерея изображений (один релиз -> много фото)
    # images: Mapped[List["ReleaseImagesORM"]] = relationship(
    #     back_populates="release",
    #     cascade="save-update, merge"
    # )
    #
    # # m2m персонажи (через промежуточную таблицу)
    # characters: Mapped[List["CharactersORM"]] = relationship(
    #     secondary="release_character_link",
    #     back_populates="release"
    # )
    #
    # # список связей персонажей с ролями
    # character_links: Mapped[List["ReleaseCharactersORM"]] = relationship(
    #     back_populates="release",
    #     cascade="save-update, merge",
    #     overlaps = "characters"
    # )
    #
    # # исходящие связи релиза с другими релизами
    # relations_out: Mapped[List["ReleaseRelationsORM"]] = relationship(
    #     foreign_keys=[ReleaseRelationsORM.release_id],
    #     back_populates="src",
    #     cascade="save-update, merge"
    # )
    #
    # # входящие связи от других релизов
    # relations_in: Mapped[List["ReleaseRelationsORM"]] = relationship(
    #     foreign_keys=[ReleaseRelationsORM.related_release_id],
    #     back_populates="dst",
    #     cascade="save-update, merge"
    # )
