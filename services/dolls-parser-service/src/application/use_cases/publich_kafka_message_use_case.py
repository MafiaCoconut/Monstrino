from application.ports.kafka_producer_port import KafkaProducerPort


class PublishKafkaMessageUseCase:
    def __init__(self, kafka_producer: KafkaProducerPort):
        self.kafka_producer = kafka_producer

    async def execute(self):
        message = {"test": "TEST MESSAGE"}
        await self.kafka_producer.publish_new_release(message)
