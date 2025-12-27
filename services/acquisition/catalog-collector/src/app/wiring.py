import logging
from dataclasses import dataclass

from app.bootstrap import build_apscheduler, build_adapters, registry_config, build_services, \
    uow_factory_config
from app.bootstrap.registry_config import registry
from app.container import AppContainer
from application.services.scheduler_service import SchedulerService
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.scheduling.scheduler import scheduler_config
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter

logger = logging.getLogger(__name__)


def build_app():
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

    logger.debug("Starting  services configuration")
    services = build_services(adapters=adapters)
    logger.debug("Finishing services configuration")

    logger.debug("Starting uow_factory configuration")
    uow_factory = uow_factory_config()
    logger.debug("Finishing uow_factory configuration")

    logger.debug("Start scheduler cron jobs setup")
    scheduler_config(scheduler=adapters.scheduler, uow_factory=uow_factory, registry=registry)
    logger.debug("Finished scheduler cron jobs setup")

    return AppContainer(
        services=services,
        adapters=adapters,
        registry=registry,
        uow_factory=uow_factory
    )

