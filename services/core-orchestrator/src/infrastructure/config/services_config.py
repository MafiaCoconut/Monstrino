from app.container import Services
from application.ports.scheduler_port import SchedulerPort
from application.services.auth_service import AuthService
from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService
from application.services.users_service import UsersService
from infrastructure.config.gateways_config import users_gateway


# def get_core_service() -> CoreService:
#     return CoreService(
#     )


#
# def get_users_service() -> UsersService:
#     return UsersService(
#         users_gateway=users_gateway,
#
#     )
#
# def get_auth_service() -> AuthService:
#     return AuthService(
#         users_service=get_users_service()
#     )

def build_services(scheduler: SchedulerPort) -> Services:
    users_service = UsersService(
        users_gateway=users_gateway
    )
    return Services(
        scheduler=SchedulerService(scheduler=scheduler),
        users=users_service,
        auth=AuthService(users_service=users_service)
    )