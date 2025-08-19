from app.container import Adapters
from application.ports.logger_port import LoggerPort


def build_adapters(logger: LoggerPort) -> Adapters:
    return Adapters(
        logger=logger
    )