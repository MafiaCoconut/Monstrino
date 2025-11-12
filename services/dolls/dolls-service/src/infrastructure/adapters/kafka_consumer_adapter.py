import logging
import os

from aiokafka import AIOKafkaConsumer
import asyncio
import json

from app.dependencies.container_components.services import Services
from application.dto.ReleaseCreateDto import ReleaseCreateDto
from application.ports.kafka_consumer_port import KafkaConsumerPort

logger = logging.getLogger(__name__)


class KafkaConsumerAdapter(KafkaConsumerPort):
    def __init__(self, servers: str, group_id: str, services: Services):
        self.servers = servers
        self.group_id = group_id
        self.consumer = None
        self.new_release = os.getenv("KAFKA_TOPIC_NEW_RELEASES")
        self.services = services

    async def start(self):
        self.consumer = AIOKafkaConsumer(
            self.new_release,
            bootstrap_servers=self.servers,
            group_id=self.group_id,
            auto_offset_reset='earliest',
            enable_auto_commit=True
        )

        await self.consumer.start()
        logger.info("🟢 Kafka consumer started")

        try:
            async for msg in self.consumer:
                payload = json.loads(msg.value.decode('utf-8'))
                logger.info(f"📨 Received message: {payload}")
                try:
                    match msg.topic:
                        case self.new_release:
                            dto = ReleaseCreateDto(**payload)
                            await self.services.scenarios.create_release(dto)
                    await self.consumer.commit()

                except Exception as e:
                    logger.error(f"❗ Error processing message: {e}")
                logger.info(
                    f"✅ Message processed and offset committed ({msg.topic}:{msg.partition}:{msg.offset})")
        except asyncio.CancelledError:
            logger.info("🟡 Consumer cancelled")
        finally:
            await self.consumer.stop()
            logger.info("🔴 Kafka consumer stopped")

    async def print_message(self, payload):
        logger.info("++++++++++++++++++++++++++++++++++++++++++")
        logger.info(f"Received message: {payload}")
        logger.info("++++++++++++++++++++++++++++++++++++++++++")
