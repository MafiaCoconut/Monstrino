from datetime import datetime, UTC

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.db.base import Base
class SeriesORM(Base):
    __tablename__ = "series"
    id: Mapped[int]          = mapped_column(INTEGER,       primary_key=True)
    name: Mapped[str]        = mapped_column(String,        nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String,        nullable=False)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
