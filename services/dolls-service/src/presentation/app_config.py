import logging

from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.container import AppContainer
from presentation import api_config, cors
from infrastructure.logging import logs_config
from app.wiring import build_app

logger = logging.getLogger(__name__)

logger.info('-------------------------------------------------------')

app = FastAPI()

cors.config(app=app)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('Starting dolls-service')
    app.state.container = build_app()
    api_config.config(app=app)
    # ic(await scheduler_service.get_all_jobs())
    yield

app.router.lifespan_context = lifespan
