from aiokafka import AIOKafkaProducer
import asyncio
import json

from app.ports.kafka_producer_port import KafkaProducerPort


class KafkaProducerAdapter(KafkaProducerPort):
    def __init__(self, servers: str):
        self.producer = AIOKafkaProducer(bootstrap_servers=servers)
        self.new_release_topic = 'new-release'

    async def start(self):
        await self.producer.start()

    async def stop(self):
        await self.producer.stop()

    async def publish_new_release(self, message: dict):
        await self.producer.send_and_wait(topic=self.new_release_topic, value=json.dumps(message).encode('utf-8'))
