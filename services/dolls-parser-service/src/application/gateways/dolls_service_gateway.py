from abc import ABC, abstractmethod

class DollsServiceGateway(ABC):
    @abstractmethod
    def send_release_data(self):
        pass