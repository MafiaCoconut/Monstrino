import logging
import os
import time

from icecream import ic
from monstrino_api.v1.shared.middleware import RequestContextMiddleware

logger = logging.getLogger(__name__)
logger.info('=============================================')
logger.info('‖                                           ‖')
logger.info('‖       MONSTRINO CATALOG - COLLECTOR       ‖')
logger.info('‖                                           ‖')
logger.info('=============================================')

start = time.time()
from monstrino_infra.configs import async_engine
logger.info("Imports of async_engine done in %.2f seconds", time.time() - start)
import dotenv
from fastapi import FastAPI
from contextlib import asynccontextmanager

from presentation import api_config, cors
from bootstrap.wiring import build_app

dotenv.load_dotenv()

app = FastAPI()
app.add_middleware(RequestContextMiddleware)
api_config.config(app=app)


@asynccontextmanager
async def lifespan(fastapi_app: FastAPI):
    start = time.time()
    try:
        async with async_engine.begin() as conn:
            await conn.run_sync(lambda conn: None)
    except Exception as e:
        logger.error("Database connection error: %s", e)
        raise e
    logger.info("Database connected in %.2f seconds", time.time() - start)
    start = time.time()
    fastapi_app.state.container = build_app()
    logger.info("Application built in %.2f seconds", time.time() - start)
    yield

app.router.lifespan_context = lifespan
