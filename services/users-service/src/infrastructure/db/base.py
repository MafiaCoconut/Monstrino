import ssl

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from infrastructure.db.db_config import get_db_settings
from dotenv import load_dotenv

load_dotenv()

ctx = ssl.create_default_context()
ctx.minimum_version = ssl.TLSVersion.TLSv1_3


sync_engine = create_engine(
    url=f"{get_db_settings().DATABASE_URL_psycopg}?sslmode=require",
    # echo=True,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
    pool_recycle=1800,
    pool_pre_ping=True,
)

async_engine = create_async_engine(
    url=get_db_settings().DATABASE_URL_asyncpg,
    connect_args={"ssl": ctx},
    # echo=True,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
    pool_recycle=1800,
    pool_pre_ping=True,
)


session_factory = sessionmaker(sync_engine)
async_session_factory = async_sessionmaker(async_engine)


class Base(DeclarativeBase):
    pass

