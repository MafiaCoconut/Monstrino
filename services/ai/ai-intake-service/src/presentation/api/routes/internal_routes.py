import logging

from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
from fastapi.security import HTTPBearer
from icecream import ic
from monstrino_api.v1.shared.exceptions import NotFoundError, ConflictError, ApiError
from monstrino_api.v1.shared.responces import ResponseFactory
from monstrino_core.scheduler import SchedulerPort
from monstrino_infra.auth import VerifyToken

from presentation.api.deps import get_scheduler

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


