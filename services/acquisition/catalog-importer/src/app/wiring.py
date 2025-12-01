import logging
from app.container import AppContainer
from app.bootstrap import *
from infra.adapters.adapters_config import build_adapters
from infra.logging.logger_adapter import LoggerAdapter

logger = logging.getLogger(__name__)


def build_app():
    logger.debug("Processing wiring")

    logger.debug("Processing scheduler configuration")
    aps = build_apscheduler()
    logger.debug("Finishing scheduler configuration")

    logger.debug("Starting adapters configuration")
    adapters = build_adapters(aps)
    logger.debug("Finishing adapters configuration")

    logger.debug("Starting repositories configuration")
    repositories = build_repositories()
    logger.debug("Finishing repositories configuration")

    logger.debug("Processing services configuration")
    services = build_services(repositories=repositories, adapters=adapters)
    logger.debug("Finishing services configuration")

    logger.debug("Processing gateways configuration")
    gateways = build_gateways()
    logger.debug("Finishing gateways configuration")


    return AppContainer(
        services=services,
        adapters=adapters,
        repositories=repositories,
        gateways=gateways,
    )

