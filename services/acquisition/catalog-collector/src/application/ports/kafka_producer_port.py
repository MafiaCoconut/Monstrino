from abc import ABC, abstractmethod


class KafkaProducerPort(ABC):
    @abstractmethod
    async def publish_new_release(self, message: dict):
        pass

    @abstractmethod
    async def start(self):
        pass

    @abstractmethod
    async def stop(self):
        pass