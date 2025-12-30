import json

from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
import logging

from fastapi.security import HTTPBearer
from icecream import ic
from monstrino_api.responces.default_codes import return_item_not_found_status_code, return_conflict_error_status_code
from pydantic import BaseModel

from application.ports.scheduler_port import SchedulerPort
from application.services.parser_service import ParserService
from application.use_cases.auth.verify_token_use_case import VerifyToken
from presentation.api.deps.scheduler import get_scheduler

router = APIRouter()
auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/internal',
                    tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])


def config(app: FastAPI):
    app.include_router(private)



# @router.post('/parse')
# async def parse(
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     await parser_service.parse()
#
#
# class Payload(BaseModel):
#     dict: dict


# @private.post('/kafka_publish_message')
# async def parse(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await parser_service.publish_message(await request.json())
#
#
# @private.post('/parse_characters')
# async def parse_characters(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await parser_service.parse_characters()
#
#
# @private.post('/parse_pets')
# async def parse_pets(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await parser_service.parse_pets()
#
#
# @private.post('/parse_series')
# async def parse_series(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service)
# ):
#     # payload = json.loads(payload.value.decode('utf-8'))
#     await parser_service.parse_series()
#
#
# @private.post('/parse_release')
# async def parse_release(
#         request: Request,
#         response: Response, background_tasks: BackgroundTasks,
#         parser_service: ParserService = Depends(get_parser_service),
#         scheduler: SchedulerPort = Depends(get_scheduler)
# ):
    ...
    # payload = json.loads(payload.value.decode('utf-8'))
    # scheduler.
    # await parser_service.parse_release()

@private.post('/sources/{source_id}/parse/characters')
async def parse_characters(
        source_id: int,
        request: Request,
        response: Response, background_tasks: BackgroundTasks
):
    ...

@private.post('/jobs/{job_id}/resume')
async def resume_job(
        job_id: str,
        request: Request,
        response: Response, background_tasks: BackgroundTasks,
        scheduler: SchedulerPort = Depends(get_scheduler)
):
    job = scheduler.get_job(job_id)
    if not job:
        return await return_item_not_found_status_code()
    try:
        scheduler.trigger_job(job_id=job_id)
    except Exception as e:
        logging.exception(f"Failed to resume job {job_id} e: {e}")
        return await return_conflict_error_status_code()
