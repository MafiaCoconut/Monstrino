import logging

from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
from fastapi.security import HTTPBearer
from icecream import ic
from monstrino_api.v1.shared.exceptions import NotFoundError, ConflictError, ApiError, BadRequestError, InternalError
from monstrino_api.v1.shared.responces import ResponseFactory

from monstrino_api.v1.shared.responces import ResponseFactory
from monstrino_contracts.v1.domains.catalog.catalog_api_service.contracts import ReleaseSearchRequest, GetReleaseByIdRequest
from monstrino_contracts.v1.domains.catalog.catalog_api_service.responses import GetReleaseTypesResponse


from app.use_cases import ReleaseSearchUseCase
from app.use_cases.release import GetReleaseTypesUseCase
from presentation.api.deps import *
from presentation.api.mappers import GetByReleaseIdMapper, ReleaseSearchMapper
from src.app.use_cases.get_release_by_id import GetReleaseByIdUseCase

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

        logger.exception(e)
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



@public.get("/releases/id-")
async def get_release_id_by(
    request: Request, response: Response, background_tasks: BackgroundTasks,
    uc: GetReleaseTypesUseCase = Depends(get_use_case_get_release_types),
    response_model=GetReleaseTypesResponse
):
    try:
        result = await uc.execute()
        ic(result)
        return rf.ok(request, data=result)
    except Exception as e:
        logger.error(f"Failed to start get release types. Details: {e}")
        raise InternalError(message="Internal server error")



@public.get("/release-types")
async def get_release_types(
    request: Request, response: Response, background_tasks: BackgroundTasks,
    uc: GetReleaseTypesUseCase = Depends(get_use_case_get_release_types),
    response_model=GetReleaseTypesResponse
):
    try:
        result = await uc.execute()
        ic(result)
        return rf.ok(request, data=result)
    except Exception as e:
        logger.error(f"Failed to start get release types. Details: {e}")
        raise InternalError(message="Internal server error")









