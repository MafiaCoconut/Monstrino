import logging

from application.ports.logger_port import LoggerPort


class LoggerAdapter(LoggerPort):
    def __init__(self):
        self.log = logging.getLogger(__name__)

    def debug(self, message: str) -> None:
        self.log.debug(message, stacklevel=1)

    def info(self, message: str) -> None:
        self.log.info(message, stacklevel=2)

    def error(self, message: str) -> None:
        self.log.error(message, stacklevel=2)

    def warning(self, message: str) -> None:
        self.log.warning(message, stacklevel=2)

    def critical(self, message: str) -> None:
        self.log.critical(message, stacklevel=2)
