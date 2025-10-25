import logging

from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.container import AppContainer
from infrastructure.db.base import async_engine
from presentation import api_config, cors
from infrastructure.logging import logs_config
from app.wiring import build_app
from infrastructure.db.models import *

logger = logging.getLogger(__name__)

logger.info('-------------------------------------------------------')

app = FastAPI()

cors.config(app=app)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('Starting dolls-service')
    async with async_engine.begin() as conn:
        await conn.run_sync(lambda conn: None)

    app.state.container = build_app()
    api_config.config(app=app)
    # ic(await scheduler_service.get_all_jobs())
    yield

app.router.lifespan_context = lifespan
