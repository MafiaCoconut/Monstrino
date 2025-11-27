import logging
import dotenv
from fastapi import FastAPI
from contextlib import asynccontextmanager

from presentation import api_config
from presentation.api import cors
from app.wiring import build_app
# from infra.db.models import *
# from monstrino_models.orm import *
dotenv.load_dotenv()
logger = logging.getLogger(__name__)

logger.info('*************************************************')
logger.info('*                                               *')
logger.info('*       Starting catalog-importer-service       *')
logger.info('*                                               *')
logger.info('*************************************************')

app = FastAPI()

cors.config(app=app)


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.container = build_app()
    api_config.config(app=app)
    yield

app.router.lifespan_context = lifespan
