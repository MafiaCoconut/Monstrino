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
from infrastructure.api.responces.default_codes import responses, raise_validation_error, raise_item_not_found, raise_created, raise_internal_server_error
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
        user_base_info = await core_service.register_new_user(user=user_credentials)
        logger.info(f"user_base_info: {user_base_info}")
        if user_base_info:
            return await get_success_json_response(data=user_base_info.model_dump())
        else:
            return await raise_validation_error(detail="Users data is not valid")

    else:
        return await raise_validation_error(detail="Users data is not valid")


@router.post("/api/v1/auth/setRefreshToken", tags=["Auth"], response_model=ResponseModel)
async def set_refresh_token(
        request: SetRefreshTokenRequest,
        core_service: CoreService = Depends(get_core_service)
    ):
    user_email = request.user_email
    refresh_token = request.refresh_token
    if user_email and refresh_token:
        await core_service.set_refresh_token(user_email=user_email, new_refresh_token=refresh_token)
        return await get_success_json_response(data={'message': "Refresh token is set"})
    else:
        return await raise_validation_error(detail="Users data is not valid")

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
            return await raise_item_not_found()
    else:
        return await raise_validation_error(detail="Users credentials are not valid")