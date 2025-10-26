from dataclasses import dataclass

from app.dependencies.container_components.repositories import Repositories
from app.dependencies.container_components.services import Services
from application.ports.kafka_consumer_port import KafkaConsumerPort
from application.ports.logger_port import LoggerPort


@dataclass
class Adapters:
    logger: LoggerPort
    kafka_consumer: KafkaConsumerPort

@dataclass
class AppContainer:
    adapters: Adapters
    services: Services
    repositories: Repositories

