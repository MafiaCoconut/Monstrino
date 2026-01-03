import logging
from app.container import AppContainer
from app.bootstrap import *
from infra.adapters.adapters_config import build_adapters

logger = logging.getLogger(__name__)


def build_app():
    logger.debug("Processing wiring")

    logger.debug("Processing scheduler configuration")
    aps = build_apscheduler()

    logger.debug("Starting adapters configuration")
    adapters = build_adapters(aps)

    logger.debug("Starting uow_factory configuration")
    uow_factory = uow_factory_config()

    logger.debug("Processing services configuration")
    services = build_services()

    logger.debug("Processing gateways configuration")
    gateways = build_gateways()


    return AppContainer(
        services=services,
        adapters=adapters,
        repositories=repositories,
        gateways=gateways,
    )

