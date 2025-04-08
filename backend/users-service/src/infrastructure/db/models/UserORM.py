from datetime import datetime

from sqlalchemy import Column, String, JSON, INTEGER, Float, text
from sqlalchemy.orm import Mapped, mapped_column


from infrastructure.db.base import Base

class UserORM(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(INTEGER, primary_key=True)
    username: Mapped[str] = mapped_column(String, default="", nullable=False)
    firstName: Mapped[str] = mapped_column(String, default="", nullable=False)
    lastName: Mapped[str] = mapped_column(String, default="", nullable=False)

    # TODO посмотреть как делать updatedAt сразу в таблице при изменении данных
    updatedAt:         Mapped[datetime] = mapped_column(nullable=True)
    createdAt:         Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

