import logging
from dataclasses import dataclass

from app.bootstrap import build_apscheduler, build_adapters, registry_config, build_repositories, build_services
from app.bootstrap.registry_config import registry
from app.container import AppContainer
from application.services.scheduler_service import SchedulerService
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter

logger = logging.getLogger(__name__)


def build_app():
    # logger = LoggerAdapter()
    # logger.debug("Starting wiring")
    logger.debug("Processing wiring")

    logger.debug("Starting scheduler configuration")
    aps = build_apscheduler()
    logger.debug("Finishing scheduler configuration")

    logger.debug("Starting adapters configuration")
    adapters = build_adapters(aps)
    logger.debug("Finishing adapters configuration")

    logger.debug("Starting registry configuration")
    registry_config(adapters)
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

