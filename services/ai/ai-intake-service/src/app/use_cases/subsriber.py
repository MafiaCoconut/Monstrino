from .intake import IntakeUseCase


class SubscriberUseCase:
    def __init__(self):
        self.intake_uc = IntakeUseCase

    async def execute(self):
        """
        Running all the time
        - Subscribing to kafka topic
        - Reads new message
        - Calls IntakeUC
        """
        ...