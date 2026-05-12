import os

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from monstrino_core.kernel.enums.kafka import KafkaClientIds
from monstrino_infra.adapters import SchedulerAdapter
from monstrino_infra.messaging.kafka import KafkaPublisher, KafkaSubscriber

from bootstrap.container_components import Adapters


def build_adapters(aps: AsyncIOScheduler) -> Adapters:
    return Adapters(
        scheduler=SchedulerAdapter(aps),
        kafka_publisher=KafkaPublisher(
            bootstrap_servers="localhost:9092",
            client_id=KafkaClientIds.CATALOG_ENRICHER_AI_JOB_REQUEST_PUBLISHER,
        ),
        # kafka_subscriber=KafkaSubscriber(
        #     bootstrap_servers="localhost:9092",
        #     client_id=KafkaClientIds.CATALOG_ENRICHER_AI_JOB_RESULT_SUBSCRIBER,
        # )
    )