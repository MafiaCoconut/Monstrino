import asyncio
import logging
import dotenv
from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.container import AppContainer
from infrastructure.db.base import sessions, config_repositories_connection
from presentation import api_config, cors
from infrastructure.logging import logs_config
from app.wiring import build_app
# from infra.db.models import *
# from monstrino_models.orm import *
dotenv.load_dotenv()
logger = logging.getLogger(__name__)
logger.info('***********************************************')
logger.info('*                                             *')
logger.info('*       Starting dolls-importer service       *')
logger.info('*                                             *')
logger.info('***********************************************')

app = FastAPI()

cors.config(app=app)


@asynccontextmanager
async def lifespan(app: FastAPI):

    # async with async_engine.begin() as conn:
    #     await conn.run_sync(lambda conn: None)
    # repo_connection = asyncio.create_task(config_repositories_connection())
    app.state.container = build_app()
    api_config.config(app=app)
    # kafka_task = asyncio.create_task(app.state.container.adapters.kafka_consumer.start())
    # ic(await scheduler_service.get_all_jobs())
    yield
    # await sessions.close()
    # repo_connection.cancel()
    # kafka_task.cancel()

app.router.lifespan_context = lifespan
