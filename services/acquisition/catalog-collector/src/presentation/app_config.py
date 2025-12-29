import logging
import os
import dotenv
from fastapi import FastAPI
from contextlib import asynccontextmanager
import asyncio
from app.container import AppContainer
from infrastructure.db.base import async_engine
from presentation import api_config, cors
from infrastructure.logging import logs_config
from app.wiring import build_app

dotenv.load_dotenv()

logger = logging.getLogger(__name__)
app = FastAPI()

cors.config(app=app)

@asynccontextmanager
async def lifespan(fastapi_app: FastAPI):
    logger.info('=============================================')
    logger.info('‖                                           ‖')
    logger.info('‖       MONSTRINO CATALOG - COLLECTOR       ‖')
    logger.info('‖                                           ‖')
    logger.info('=============================================')

    async with async_engine.begin() as conn:
        await conn.run_sync(lambda conn: None)

    fastapi_app.state.container = build_app()
    api_config.config(app=fastapi_app)
    # ic(await scheduler_service.get_all_jobs())
    # kafka_task = asyncio.create_task(app.state.container.adapters.kafka_producer.start())
    yield
    # kafka_task.cancel()

app.router.lifespan_context = lifespan
