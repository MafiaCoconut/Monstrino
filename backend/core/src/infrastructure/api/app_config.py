from fastapi import FastAPI
from contextlib import asynccontextmanager

from infrastructure.api import api_config
from infrastructure.config import logs_config
from infrastructure.config.services_config import get_scheduler_service



@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler_service = get_scheduler_service()
    await scheduler_service.set_all_jobs()

    logs_config.config()

    api_config.config(app=app)

    # ic(await scheduler_service.get_all_jobs())
    # app.include_router(router)
    yield

app = FastAPI(lifespan=lifespan)

