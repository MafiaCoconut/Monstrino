from abc import ABC, abstractmethod


class KafkaConsumerPort(ABC):
    @abstractmethod
    def start(self):
        """Consume messages from a Kafka topic."""
        pass