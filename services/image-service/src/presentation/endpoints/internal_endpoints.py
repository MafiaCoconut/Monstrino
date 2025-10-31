import json

from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
import logging

from fastapi.security import HTTPBearer
from pydantic import BaseModel

from application.services.processing_service import ProcessingService
from application.use_cases.auth.verify_token_use_case import VerifyToken
from presentation.deps import get_processing_service

router = APIRouter()
auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/internal', tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])
def config(app: FastAPI):
    app.include_router(private)

# @router.post('/parse')
# async def parse(
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     await processing_service.parse()


@private.post('/process_images')
async def process_characters(
        request: Request,
        response: Response, background_tasks: BackgroundTasks,
        processing_service: ProcessingService = Depends(get_processing_service)
):
    # payload = json.loads(payload.value.decode('utf-8'))
    await processing_service.process_images()

# @private.post('/process_pets')
# async def process_pets(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_pets()
#
#
# @private.post('/process_series')
# async def process_series(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_series()
#
#
# @private.post('/process_releases')
# async def process_releases(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_releases()