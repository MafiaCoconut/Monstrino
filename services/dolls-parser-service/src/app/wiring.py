from dataclasses import dataclass

from app.container import AppContainer
from application.services.scheduler_service import SchedulerService
from infrastructure.adapters.adapters_config import build_adapters
from infrastructure.config.repositories_config import build_repositories
from infrastructure.config.services_config import build_services
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter
from infrastructure.scheduling.scheduler_config import build_apscheduler
from infrastructure.config.registry_config import config as registry_config


def build_app():
    logger = LoggerAdapter()
    logger.debug("Starting wiring")

    logger.debug("Starting scheduler configuration")
    aps = build_apscheduler()
    logger.debug("Finishing scheduler configuration")

    logger.debug("Starting adapters configuration")
    adapters = build_adapters(logger, aps)
    logger.debug("Finishing adapters configuration")

    logger.debug("Starting registry configuration")
    registry = registry_config(adapters)
    logger.debug("Finishing registry configuration")

    logger.debug("Starting repositories configuration")
    repositories = build_repositories()
    logger.debug("Finishing registry configuration")


    logger.debug("Starting  services configuration")
    services = build_services(registry=registry, adapters=adapters, repositories=repositories)
    logger.debug("Finishing services configuration")

    return AppContainer(
        services=services,
        adapters=adapters,
        registry=registry,
        repositories=repositories
    )

