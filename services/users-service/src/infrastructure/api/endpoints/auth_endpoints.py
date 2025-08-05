from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends
import logging

from icecream import ic

from application.services.core_service import CoreService
from domain.user import UserRegistration, UserLogin
from infrastructure.api.requests.auth_requests import SetRefreshTokenRequest
from infrastructure.api.responces.auth_responces.responces import RegisterUserResponse, LoginResponse
from infrastructure.api.responces.models import ResponseModel
from infrastructure.api.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.api.responces.default_codes import responses, return_validation_error_status_code, return_item_not_found_status_code, \
    return_created_status_code, return_internal_server_error_status_code, return_conflict_error_status_code
from infrastructure.config.services_config import get_core_service

router = APIRouter()

logger = logging.getLogger(__name__)

def config(app: FastAPI):
    app.include_router(router)

@router.post("/api/v1/auth/registerNewUser", tags=["Auth"],
             response_model=RegisterUserResponse,)
@log_api_decorator()
async def register_new_user(
        user_credentials: UserRegistration,
        response: Response, background_tasks: BackgroundTasks,
        core_service: CoreService = Depends(get_core_service)
    ):
    if user_credentials:
        result = await core_service.register_new_user(user=user_credentials)
        if result.get('error') != "":
            return await return_conflict_error_status_code(description="User with this credentials already exists", data=result.get('error'))
        logger.info(f"user_base_info: {result.get('user')}")
        return await get_success_json_response(data=result.get('user').model_dump())
    else:
        return await return_validation_error_status_code(description="Users data is not valid")


@router.post("/api/v1/auth/setRefreshToken", tags=["Auth"], response_model=ResponseModel)
async def set_refresh_token(
        request: SetRefreshTokenRequest,
        core_service: CoreService = Depends(get_core_service)
    ):
    user_id = request.user_id
    refresh_token = request.refresh_token
    if user_id and refresh_token:
        await core_service.set_refresh_token(user_id=user_id, new_refresh_token=refresh_token)
        return await get_success_json_response(data={'message': "Refresh token is set"})
    else:
        return await return_validation_error_status_code(description="Users data is not valid")

@router.post("/api/v1/auth/login", tags=["Auth"], response_model=LoginResponse)
async def login(
        user_credentials: UserLogin,
        response: Response, background_tasks: BackgroundTasks,
        core_service: CoreService = Depends(get_core_service)
    ):
    if user_credentials:
        result = await core_service.login(user=user_credentials)
        if result:
            logger.info(f"Login for {user_credentials.email} was successful")
            return await get_success_json_response(data=result.model_dump())
        else:
            logger.info(f"Login for {user_credentials.email} was not successful")
            return await return_item_not_found_status_code()
    else:
        return await return_validation_error_status_code(detail="Users credentials are not valid")