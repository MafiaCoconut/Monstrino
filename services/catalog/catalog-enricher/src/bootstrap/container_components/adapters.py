from dataclasses import dataclass

from monstrino_core.kernel import SchedulerPort
from monstrino_core.kernel.interfaces.kafka.publisher import KafkaPublisherInterface
from monstrino_core.kernel.interfaces.kafka.subscriber import KafkaSubscriberInterface


@dataclass
class Adapters:
    scheduler: SchedulerPort
    kafka_publisher: KafkaPublisherInterface
    # kafka_subscriber: KafkaSubscriberInterface
