import pytest
from monstrino_core.kernel.enums.kafka import KafkaClientIds
from monstrino_core.kernel.interfaces.kafka import KafkaPublisherInterface
from monstrino_infra.messaging.kafka import KafkaPublisher


@pytest.fixture
def kafka_publisher() -> KafkaPublisherInterface:
    publisher = KafkaPublisher(
        bootstrap_servers="localhost:9092",
        client_id=KafkaClientIds.CATALOG_ENRICHER_AI_JOB_REQUEST_PUBLISHER
    )
    return publisher