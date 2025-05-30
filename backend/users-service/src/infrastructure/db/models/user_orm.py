from datetime import datetime, UTC

from sqlalchemy import Column, String, JSON, INTEGER, Float, text
from sqlalchemy.orm import Mapped, mapped_column


from infrastructure.db.base import Base

class UserORM(Base):
    __tablename__ = "users"

    id:             Mapped[int]             = mapped_column(INTEGER, primary_key=True)
    username:       Mapped[str]             = mapped_column(String, default="", nullable=False)
    first_name:     Mapped[str | None]      = mapped_column(String, default="", nullable=False)
    last_name:      Mapped[str | None]      = mapped_column(String, default="", nullable=False)
    email:          Mapped[str]             = mapped_column(String, default="", nullable=False)
    password:       Mapped[str]             = mapped_column(String, default="", nullable=False)
    refresh_token:  Mapped[str | None]      = mapped_column(String, default="", nullable=True)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=datetime.now(UTC).replace(tzinfo=None), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

