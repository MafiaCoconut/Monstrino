from icecream import ic
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv

from infrastructure.db.db_config import get_db_settings

load_dotenv()

db_settings = get_db_settings()
kw = db_settings.engine_kwargs()

async_engine = create_async_engine(
    url=kw["url"],
    echo=kw["echo"],
    pool_size=kw["pool_size"],
    max_overflow=kw["max_overflow"],
    pool_timeout=kw["pool_timeout"],
    pool_recycle=kw["pool_recycle"],
    pool_pre_ping=kw["pool_pre_ping"],
    connect_args=kw["connect_args"],
)

async_session_factory = async_sessionmaker(async_engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass

