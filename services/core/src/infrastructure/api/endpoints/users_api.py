from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends

from application.services.core_service import CoreService
from application.services.users_service import UsersService
from domain.user import UserRegistration
from infrastructure.api.responces.templates import get_success_json_response
# from application.services.scheduler_service import SchedulerService
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.api.responces.default_codes import responses, return_validation_error_status_code, return_item_not_found_status_code, return_created_status_code, return_internal_server_error_status_code
from infrastructure.config.services_config import get_users_service

router = APIRouter()

def config(app: FastAPI):
    app.include_router(router)

# @log_api_decorator()
# @router.post(f"/api/v1/users/registerNewUser", responses=responses)
# async def register_new_user(
#         user: UserRegistration,
#         response: Response, background_tasks: BackgroundTasks,
#         users_service: UsersService = Depends(get_users_service)
# ):
#     # print(user)
#     if user:
#         await users_service.register_new_user(user=user)
#     return await get_success_json_response(data={"success": True})
#


