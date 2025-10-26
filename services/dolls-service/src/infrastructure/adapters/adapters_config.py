import os
from app.container import Adapters
from application.ports.logger_port import LoggerPort
from infrastructure.adapters.kafka_consumer_adapter import KafkaConsumerAdapter


def build_adapters(logger: LoggerPort) -> Adapters:
    return Adapters(
        logger=logger,
        kafka_consumer=KafkaConsumerAdapter(
            servers=os.getenv("KAFKA_CONSUMER_SERVERS"),
            group_id=os.getenv("KAFKA_GROUP_ID")
        ),
    )