from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends
import logging

from fastapi.security import HTTPBearer

from application.services.parser_service import ParserService
from application.use_cases.auth.verify_token_use_case import VerifyToken
from presentation.deps import get_parser_service

router = APIRouter()
auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/internal', tags=["Private"], dependencies=[Depends(VerifyToken())])
public = APIRouter(prefix='/api/v1', tags=["Public"])
def config(app: FastAPI):
    app.include_router(private)

@router.post('/parse')
async def parse(
        response: Response, background_tasks: BackgroundTasks,
        parser_service: ParserService = Depends(get_parser_service)
):
    await parser_service.parse()


@private.post('/kafka_publish_message')
async def parse(
        response: Response, background_tasks: BackgroundTasks,
        parser_service: ParserService = Depends(get_parser_service)
):
    await parser_service.publish_message()