import logging

from fastapi import FastAPI

from contextlib import asynccontextmanager

from app.wiring import build_app
from presentation import api_config, cors


logger = logging.getLogger(__name__)

logger.info('-------------------------------------------------------')

app = FastAPI()

cors.config(app=app)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info('Starting core-service')
    app.state.container = build_app()
    api_config.config(app=app)
    yield

app.router.lifespan_context = lifespan
