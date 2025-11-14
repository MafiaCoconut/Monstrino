import logging

from application.services.auth_service import AuthService
from application.use_cases.auth.fastapi_jwt_bearer import JWTBearer

from domain.entities.user import UserRegistration, UserLogin
from presentation.deps import get_auth_service
from presentation.responces.auth_responces.responses import RegistrationResponse, LoginResponse, RefreshResponse, \
    StatusResponse
from presentation.responces.templates import get_success_json_response
from infrastructure.config.jwt_config import REFRESH_TOKEN_COOKIE_NAME
from presentation.responces.default_codes import return_validation_error_status_code, \
    return_item_not_found_status_code, \
    return_created_status_code, return_internal_server_error_status_code, \
    return_unauthorized_found_status_code, return_conflict_error_status_code
from presentation.responces.default_codes import responses as default_responses

from fastapi import APIRouter, Response, BackgroundTasks, FastAPI, Request
from fastapi.params import Depends
from fastapi.security import HTTPBearer

auth_scheme = HTTPBearer()
private = APIRouter(prefix='/api/v1/auth',
                    tags=["Auth"], dependencies=[Depends(JWTBearer())])
public = APIRouter(prefix='/api/v1/auth', tags=["Public"])

logger = logging.getLogger(__name__)


def config(app: FastAPI):
    app.include_router(private)
    app.include_router(public)


@public.post("/registration", response_model=RegistrationResponse, responses=default_responses)
async def registration(
    user_credentials: UserRegistration,
    response: Response, background_tasks: BackgroundTasks,
    auth_service: AuthService = Depends(get_auth_service),
):
    logger.info(f"credentials: {user_credentials}")
    if user_credentials:
        result = await auth_service.registration(user=user_credentials)
        if result.get('error'):
            error: str = result.get('error')
            match error:
                case str() if "not-valid" in error:
                    # 422
                    return await return_validation_error_status_code(data=error[error.rfind('-')+1:])
                case str() if "user-with-this-email-already-exist" in error:
                    # 409
                    return await return_conflict_error_status_code(data='email')
                case str() if "user-with-this-username-already-exist" in error:
                    # 409
                    return await return_conflict_error_status_code(data='username')
                case "internal-error":
                    return await return_internal_server_error_status_code()  # 500
            return await return_internal_server_error_status_code()  # 500
        else:
            return await get_success_json_response(
                data={
                    "access_token": result.get('tokens').get('access_token'),
                    "user": result.get('user')
                },
                # 200
                cookies=[{'key': REFRESH_TOKEN_COOKIE_NAME, "value": result.get('tokens').get('refresh_token')}])
    else:
        return await return_validation_error_status_code()  # 422


@public.post("/login", response_model=LoginResponse)
async def login(
    user_credentials: UserLogin,
    response: Response, background_tasks: BackgroundTasks,
    auth_service: AuthService = Depends(get_auth_service)
):
    logger.info(f"credentials: {user_credentials}")
    if user_credentials:
        result = await auth_service.login(user=user_credentials)
        if result:
            if result.get('error') is not None:
                error_code = result.get('error')
                match error_code:
                    case 401: return await return_unauthorized_found_status_code()
                    case 404: return await return_item_not_found_status_code()
                    case 500: return await return_internal_server_error_status_code()
            else:
                return await get_success_json_response(
                    data={
                        "access_token": result.get('tokens').get('access_token'),
                        "user": result.get('user')
                    },
                    cookies=[{'key': REFRESH_TOKEN_COOKIE_NAME,
                              "value": result.get('tokens').get('refresh_token')}]
                )
        else:
            return await return_unauthorized_found_status_code()
    return await return_unauthorized_found_status_code()


@public.get("/refresh", response_model=RefreshResponse)
async def refresh_token(
    request: Request,
    response: Response, background_tasks: BackgroundTasks,
    auth_service: AuthService = Depends(get_auth_service),
):
    refresh_token = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)
    if refresh_token:
        result = await auth_service.refresh(refresh_token=refresh_token)
        match (result.get('code')):
            case 200:
                # await set_refresh_token_in_cookie(response=response, refresh_token=result.get('refresh_token'))
                return await get_success_json_response(data=result.get('access_token'), cookies=[{'key': REFRESH_TOKEN_COOKIE_NAME, "value": result.get('refresh_token')}])

            case 401:
                print(result)
                return await return_unauthorized_found_status_code()
    else:
        return await return_unauthorized_found_status_code()


@private.get("/status", response_model=StatusResponse)
async def status(
    request: Request,
    response: Response, background_tasks: BackgroundTasks,
):
    print(request.state.user_id)
    return await get_success_json_response(data={'result': True})
    # if access_token:
    #     result = await auth_service.status(access_token=access_token)
    #     if result:
    #         return await get_success_json_response(data={"result": result})
    #     else:
    #         return await return_unauthorized_found_status_code()
    # else:
    #     return await return_unauthorized_found_status_code()


@private.get("/test")
async def test(
        request: Request,
        response: Response, background_tasks: BackgroundTasks,
        user_id: int = Depends(JWTBearer()),
):
    print(user_id)
