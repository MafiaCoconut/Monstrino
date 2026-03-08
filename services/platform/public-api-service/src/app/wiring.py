from dataclasses import dataclass

from app.container import AppContainer
from application.services.scheduler_service import SchedulerService
from infrastructure.adapters.adapters_config import build_adapters
from infrastructure.config.services_config import build_services
from infrastructure.logging.logger_adapter import LoggerAdapter
from infrastructure.scheduling.scheduler_adapter import SchedulerAdapter
from infrastructure.scheduling.scheduler_config import build_apscheduler


def build_app():
    logger = LoggerAdapter()
    logger.debug("Starting wiring")

    logger.debug("Processing  scheduler configuration")
    aps = build_apscheduler()

    logger.debug("Processing  adapters configuration")
    adapters = build_adapters(logger)

    logger.debug("Processing  services configuration")
    services = build_services(scheduler=SchedulerAdapter(aps))

    return AppContainer(
        services=services,
        adapters=adapters,
    )

