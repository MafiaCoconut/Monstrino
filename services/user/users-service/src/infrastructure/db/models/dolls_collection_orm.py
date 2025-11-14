from datetime import datetime

from sqlalchemy import Column, String, JSON, INTEGER, Float, text
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.db.base import Base


class DollsCollectionORM(Base):
    __tablename__ = "dollsCollection"

    id: Mapped[int]  = mapped_column(String, primary_key=True)
    ownerId: Mapped[int]  = mapped_column(INTEGER, default=0, nullable=True)
    dolls: Mapped[dict]     = mapped_column(JSON, default={}, nullable=True)

    # TODO посмотреть как делать updatedAt сразу в таблице при изменении данных
    updatedAt:         Mapped[datetime] = mapped_column(nullable=True)
    createdAt:         Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
