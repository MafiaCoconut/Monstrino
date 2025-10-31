import logging
from icecream import ic

from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError

from application.repositories.parsed_images_repository import ParsedImagesRepository

logger = logging.getLogger(__name__)



class ProcessImagesUseCase:
    def __init__(self,
                 parsed_images_repo: ParsedImagesRepository,
                 ):
        self.parsed_images_repo = parsed_images_repo

    async def execute(self):
        unprocessed_images = await self._get_unprocessed_characters(1)
        ic(unprocessed_images)
        # series = self.series_repository.get_series_by_id(series_id)
        # if not series:
        #     raise ValueError("Series not found")
        #
        # processed_data = self.processor.process(series.data)
        # self.series_repository.save_processed_data(series_id, processed_data)
        # return processed_data

    async def _get_unprocessed_characters(self, count: int) -> list | None:
        try:
            unprocessed_characters = await self.parsed_images_repo.get_unprocessed_images(count)
            return unprocessed_characters
        except EntityNotFound:
            ...
        except DBConnectionError:
            ...
        except Exception as e:
            logger.error(f"Unexpected error during processing characters: {e}")

        return None