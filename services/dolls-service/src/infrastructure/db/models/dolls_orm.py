from datetime import datetime, UTC

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.db.base import Base


class DollsORM(Base):
    __tablename__ = "dolls"
    id:       Mapped[int] = mapped_column(INTEGER, primary_key=True)
    owner_id: Mapped[int] = mapped_column(INTEGER, nullable=False)

    name:          Mapped[str]  = mapped_column(String, default=None, nullable=True)
    series:        Mapped[str]  = mapped_column(String, default=None, nullable=True)
    description:   Mapped[str]  = mapped_column(String, default=None, nullable=True)
    images:        Mapped[dict] = mapped_column(JSON, default={}, nullable=True)

    updated_at:    Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=datetime.now(UTC).replace(tzinfo=None), nullable=True)
    created_at:    Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
