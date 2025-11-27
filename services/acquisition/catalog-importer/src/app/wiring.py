from app.container import AppContainer
from app.bootstrap import *
from infrastructure.adapters.adapters_config import build_adapters
from infrastructure.logging.logger_adapter import LoggerAdapter


def build_app():
    logger = LoggerAdapter()
    logger.debug("Processing wiring")

    logger.debug("Processing scheduler configuration")
    aps = build_apscheduler()
    logger.debug("Finishing scheduler configuration")

    logger.debug("Starting adapters configuration")
    adapters = build_adapters(logger, aps)
    logger.debug("Finishing adapters configuration")

    logger.debug("Starting repositories configuration")
    repositories = build_repositories()
    logger.debug("Finishing repositories configuration")

    logger.debug("Processing services configuration")
    services = build_services(repositories=repositories, adapters=adapters)
    logger.debug("Finishing services configuration")

    return AppContainer(
        services=services,
        adapters=adapters,
        repositories=repositories,
    )

