from typing import Any
from uuid import UUID
import logging

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface
from monstrino_infra.debug import ic_model
from monstrino_models.dto import MediaAsset

from app.ports import Repositories, ImageCompressorPort, ImageFormatConverterPort

logger = logging.getLogger(__name__)


class ProcessNewImageUseCase:
    def __init__(
        self,
        uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
        image_compressor: ImageCompressorPort,
        image_format_converter: ImageFormatConverterPort,
    ):
        self.uow_factory = uow_factory

        self.image_compressor = image_compressor
        self.image_format_converter = image_format_converter

    async def execute(self, asset_id: UUID):
        """
        Передаем DTO с информацией о месторасположении изображения в S3 и asset

        :return:
        """
        ...

        async with self.uow_factory.create() as uow:
            asset = await uow.repos.media_asset.get_one_by_id(asset_id)
            if asset is None:
                logger.error(f"Media asset not found for ID: {asset_id}")

            ic_model(asset)

