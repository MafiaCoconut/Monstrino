from fastapi import APIRouter, Response, BackgroundTasks, FastAPI
from fastapi.params import Depends

from application.services.core_service import CoreService
from domain.user import NewUser
# from application.services.scheduler_service import SchedulerService
from infrastructure.config.logs_config import log_api_decorator
from infrastructure.api.responces.default_codes import responses, raise_validation_error, raise_item_not_found, raise_created, raise_internal_server_error

router = APIRouter()
api_main_path = "/endpoints/v1"


class UsersApi:
    def __init__(self, app: FastAPI):
        app.include_router(router)

    @log_api_decorator()
    @router.post(f"{api_main_path}/users/registerNewUser", responses=responses)
    async def register_new_user(
            self,
            user: NewUser,
            response: Response, background_tasks: BackgroundTasks,
            core_service: CoreService = Depends(get_core_service())
    ):
        pass



