import pytest
from monstrino_core.kernel.enums.kafka import KafkaClientIds
from monstrino_core.kernel.interfaces.kafka import KafkaSubscriberInterface
from monstrino_infra.messaging.kafka import KafkaSubscriber


@pytest.fixture
def kafka_subscriber() -> KafkaSubscriberInterface:
    subscriber = KafkaSubscriber(
        bootstrap_servers="localhost:9092",
        client_id=KafkaClientIds.CATALOG_ENRICHER_AI_JOB_RESULT_SUBSCRIBER
    )
    return subscriber