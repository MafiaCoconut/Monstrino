from datetime import datetime, UTC

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.db.base import Base


class RefreshTokensORM(Base):
    __tablename__ = "refresh_token"

    id:             Mapped[int] = mapped_column(INTEGER, primary_key=True)
    user_id:        Mapped[int] = mapped_column(INTEGER, nullable=False)
    token:          Mapped[str] = mapped_column(
        String,  nullable=False, unique=True)
    ip_address:     Mapped[str] = mapped_column(String,  nullable=False)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text(
        "TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(
        server_default=text("TIMEZONE('utc', now())"))
