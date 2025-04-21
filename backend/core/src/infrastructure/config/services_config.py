from application.services.auth_service import AuthService
from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService
from application.services.users_service import UsersService
from infrastructure.config.gateways_config import users_gateway
from infrastructure.config.interfaces_config import scheduler_interface


def get_scheduler_service() -> SchedulerService:
    return SchedulerService(
        scheduler_interface=scheduler_interface,
    )

# def get_core_service() -> CoreService:
#     return CoreService(
#     )



def get_users_service() -> UsersService:
    return UsersService(
        users_gateway=users_gateway,

    )

def get_auth_service() -> AuthService:
    return AuthService(
        users_service=get_users_service()
    )