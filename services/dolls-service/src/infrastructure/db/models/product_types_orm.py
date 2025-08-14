from datetime import datetime, UTC

from sqlalchemy import Column, String, JSON, INTEGER, Float, text, ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from infrastructure.db.base import Base

class ProductTypesORM(Base):
    __tablename__ = "product_types"
    id: Mapped[int]          = mapped_column(INTEGER,       primary_key=True)
    name: Mapped[str]        = mapped_column(String,        nullable=False, unique=True)
    display_name: Mapped[str] = mapped_column(String,       nullable=False, unique=True)

    updated_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"), onupdate=text("TIMEZONE('utc', now())"), nullable=True)
    created_at:     Mapped[datetime | None] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
