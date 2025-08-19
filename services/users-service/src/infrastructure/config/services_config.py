from app.container import Services, Repositories
from application.ports.scheduler_port import SchedulerPort
from application.services.core_service import CoreService
from application.services.scheduler_service import SchedulerService
from application.services.tokens_service import TokensService


# def get_tokens_service() -> TokensService:
#     return TokensService(
#         refresh_tokens_repository=refresh_tokens_repository
#     )
#
# def get_core_service():
#     return CoreService(
#         users_repository=users_repository,
#         tokens_service=get_tokens_service()
#     )


# def get_scheduler_service() -> SchedulerService:
    # return SchedulerService(
        # scheduler_interface=scheduler_interface,
    # )

def build_services(repositories: Repositories, scheduler: SchedulerPort) -> Services:
    tokens_service = TokensService(
            refresh_tokens_repository=repositories.refresh_tokens
    )

    return Services(
        tokens=tokens_service,
        core=CoreService(
            users_repository=repositories.users,
            tokens_service=tokens_service
        ),
        scheduler=SchedulerService(scheduler=scheduler)
    )