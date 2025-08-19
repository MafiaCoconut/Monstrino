from app.container import Adapters
from infrastructure.logging.logger_adapter import LoggerAdapter


def build_adapters(logger: LoggerAdapter) -> Adapters:
    return Adapters(
        logger=logger
    )