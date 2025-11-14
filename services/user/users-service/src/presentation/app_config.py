import logging

from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.wiring import build_app
from presentation import cors, api_config

app = FastAPI()

cors.config(app=app)

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('-------------------------------------------------------')
    logger.info('Start configuration users-service')
    app.state.container = build_app()
    api_config.config(app=app)
    yield

app.router.lifespan_context = lifespan
