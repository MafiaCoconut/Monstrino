import logging

from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
from fastapi.security import HTTPBearer
from icecream import ic
from monstrino_api.v1.shared.exceptions import NotFoundError, ConflictError, ApiError
from monstrino_api.v1.shared.responces import ResponseFactory
from monstrino_core.scheduler import SchedulerPort
from monstrino_infra.auth import VerifyToken

logger = logging.getLogger(__name__)

router = APIRouter()
auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/internal',
                    tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])

rf: ResponseFactory


def config_routes(app: FastAPI, _rf: ResponseFactory):
    app.include_router(private)
    global rf
    rf = _rf

# @private.post('/jobs/{job_id}/resume')
# async def resume_job(
#         job_id: str,
#         request: Request, response: Response, background_tasks: BackgroundTasks,
#         scheduler: SchedulerPort = Depends(get_scheduler)
# ):
#     job = scheduler.get_job(job_id)
#     ic(job)
#     if job is None:
#         ic("HANDLER ApiError id", id(ApiError))
#         ic("HANDLER ApiError module", ApiError.__module__)
#         from monstrino_api.v1.shared.exceptions import base as exc_base
#         ic("HANDLER module file", exc_base.__file__)
#         raise ApiError(message="Job not found", code="NOT_FOUND", http_status=404)
#         ic(NotFoundError.__mro__)
#         raise NotFoundError(code="JOB_NOT_FOUND", message="Job not found")
#
#     try:
#         scheduler.trigger_job(job_id=job_id)
#         return rf.accepted(request)
#     except Exception as e:
#         logging.exception(f"Failed to resume job {job_id} e: {e}")
#         raise ConflictError(code="CONFLICT", message="Failed to resume job")


@private.get("/__debug__/raise-api-error")
async def debug_raise_api_error():
    raise ApiError(code="DEBUG_ERROR", message="test", http_status=418)


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
