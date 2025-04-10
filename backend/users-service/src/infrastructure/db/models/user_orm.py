from datetime import datetime, UTC

from sqlalchemy import Column, String, JSON, INTEGER, Float, text
from sqlalchemy.orm import Mapped, mapped_column


from infrastructure.db.base import Base

class UserORM(Base):
    __tablename__ = "users"

    id:            Mapped[int]             = mapped_column(INTEGER, primary_key=True)
    username:      Mapped[str]             = mapped_column(String, default="", nullable=False)
    firstName:     Mapped[str]             = mapped_column(String, default="", nullable=False)
    lastName:      Mapped[str]             = mapped_column(String, default="", nullable=False)

    updatedAt:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=datetime.now(UTC).replace(tzinfo=None), nullable=True)
    createdAt:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

