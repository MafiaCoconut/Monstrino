from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends

from fastapi.security import HTTPBearer
from monstrino_api.auth import VerifyToken

from application.services.processing_service import ProcessingService

router = APIRouter()
auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/internal',
                    tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])


def config_routes(app: FastAPI):
    app.include_router(private)


# @router.post('/parse')
# async def parse(
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     await processing_service.parse()
#
#
# @private.post('/process_characters')
# async def process_characters(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_characters()
#
#
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
# @private.post('/process_release')
# async def process_release(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         processing_service: ProcessingService = Depends(get_processing_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await processing_service.process_release()
