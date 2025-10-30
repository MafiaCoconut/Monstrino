from datetime import datetime, UTC
from typing import List, Optional

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY, TEXT, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from infrastructure.db.base import Base

class ReleaseCharacterRolesORM(Base):
    __tablename__ = "release_character_roles"

    id:                    Mapped[int] = mapped_column(Integer, primary_key=True)
    name:                  Mapped[str] = mapped_column(String(50), unique=True)
    description: Mapped[Optional[str]] = mapped_column(Text)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    release_links: Mapped[List["ReleaseCharactersORM"]] = relationship(
        back_populates="role"
    )