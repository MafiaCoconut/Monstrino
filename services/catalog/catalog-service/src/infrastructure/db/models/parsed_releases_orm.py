from datetime import datetime, UTC, date
from typing import Optional, List

from sqlalchemy import (
    String, Integer, Date, Text, Boolean, Enum as SAEnum, text, TEXT, INTEGER,
    ForeignKey, UniqueConstraint, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base


class ParsedReleasesORM(Base):
    __tablename__ = "parsed_release"

    id:                              Mapped[int] = mapped_column(
        Integer, primary_key=True)
    name:                            Mapped[str] = mapped_column(
        Text)                # Название релиза
    # Персонажи, если несколько, через ';'    "clawdeen-wolf;draculaura"
    characters:            Mapped[Optional[str]] = mapped_column(Text)
    series_name:           Mapped[Optional[str]] = mapped_column(Text)
    type_name:             Mapped[Optional[str]] = mapped_column(
        Text)                # Тип релиза,
    gender:                Mapped[Optional[str]] = mapped_column(Text)
    multi_pack:            Mapped[Optional[str]] = mapped_column(
        Text)                       # Тип ли мультипаком
    year:                  Mapped[Optional[str]] = mapped_column(Text)
    # Названия эксклюзивов, если несколько, через ';'    "comic-con;target"
    exclusive_of_names:    Mapped[Optional[str]] = mapped_column(Text)
    # Названия переизданий, если несколько, через ';'    "ghoulia's-groove;clawdeens-couture"
    reissue_of:            Mapped[Optional[str]] = mapped_column(Text)
    mpn:                   Mapped[Optional[str]] = mapped_column(Text)
    # Имена питомцев, если несколько, через ';'    "draculaura's-bat;clawdeen's-wolf"
    pet_names:             Mapped[Optional[str]] = mapped_column(Text)
    description:           Mapped[Optional[str]] = mapped_column(Text)
    from_the_box_text:     Mapped[Optional[str]] = mapped_column(Text)
    primary_image:         Mapped[Optional[str]] = mapped_column(Text)
    # Ссылки на изображения, если несколько, через ';'    "link1;link2;link3"
    images:                Mapped[Optional[str]] = mapped_column(Text)
    images_link:           Mapped[Optional[str]] = mapped_column(
        Text)                       # Ссылки на страницу со всеми изображениями
    link:                  Mapped[Optional[str]] = mapped_column(Text)
    processing_state:                   Mapped[str] = mapped_column(String(50))
    original_html_content: Mapped[Optional[str]] = mapped_column(Text)
    extra:                 Mapped[Optional[str]] = mapped_column(
        Text)  # Любые дополнительные параметры

    updated_at:       Mapped[Optional[datetime]] = mapped_column(server_default=text(
        "TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:       Mapped[Optional[datetime]] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"))
