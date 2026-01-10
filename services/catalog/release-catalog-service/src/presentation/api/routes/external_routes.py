import logging

from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
from fastapi.security import HTTPBearer
from monstrino_api.v1.shared.exceptions import NotFoundError, ConflictError, ApiError, BadRequestError, InternalError
from monstrino_api.v1.shared.responces import ResponseFactory

from monstrino_api.v1.shared.responces import ResponseFactory
from monstrino_contracts.v1.domains.catalog.release_catalog_service.contracts import ReleaseSearchRequest, \
    GetReleaseByIdRequest

from application.use_cases import ReleaseSearchUseCase
from presentation.api.deps import get_use_case_get_release_by_id, get_use_case_release_search
from presentation.api.mappers import GetByReleaseIdMapper, ReleaseSearchMapper
from src.application.use_cases.get_release_by_id import GetReleaseByIdUseCase

logger = logging.getLogger(__name__)

auth_scheme = HTTPBearer()

public = APIRouter(prefix='/api/v1', tags=["Public"])
rf: ResponseFactory

def config_routes(app: FastAPI, _rf: ResponseFactory):
    app.include_router(public)
    global rf
    rf = _rf

@public.post("/releases/search")
async def releases_search(
        body: ReleaseSearchRequest,
        request: Request, response: Response, background_tasks: BackgroundTasks,
        uc: ReleaseSearchUseCase = Depends(get_use_case_release_search)
):
    """
    FLOW
    1. Get Contract
    2. Validate Contract
    3.

    """
    query = ReleaseSearchMapper.map(body)
    try:
        result = await uc.execute(query)
        return rf.ok(request, data=result)
    except Exception as e:

        logger.error(e)
        raise InternalError(message="Internal server error")



@public.post("/releases/get")
async def get_release_by_id(
        request_query: GetReleaseByIdRequest,
        request: Request, response: Response, background_tasks: BackgroundTasks,
        uc: GetReleaseByIdUseCase = Depends(get_use_case_get_release_by_id)
):
    query = GetByReleaseIdMapper.map(request_query)
    try:
        result = await uc.execute(query)
        return rf.ok(request, data=result)
    except Exception as e:
        logger.error(e)
        raise InternalError(message="Internal server error")















