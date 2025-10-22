from abc import ABC, abstractmethod

class MPimGateway(ABC):
    @abstractmethod
    async def send_message(self, message: str):
        pass