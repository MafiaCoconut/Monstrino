from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends
import logging

from application.services.parser_service import ParserService
from presentation.deps import get_parser_service

router = APIRouter()

def config(app: FastAPI):
    app.include_router(router)

@router.post('/parse')
async def parse(
        response: Response, background_tasks: BackgroundTasks,
        parser_service: ParserService = Depends(get_parser_service)
):
    await parser_service.parse()