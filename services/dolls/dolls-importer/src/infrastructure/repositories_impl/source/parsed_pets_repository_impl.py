import logging

from monstrino_models.exceptions.db import EntityNotFound, DBConnectionError
from monstrino_models.exceptions.post_parser_processing.exceptions import SettingProcessStateError
from sqlalchemy import select, update, or_, desc, asc

from monstrino_models.dto import ParsedPet
from monstrino_models.orm.parsed.parsed_pets_orm import ParsedPetsORM

from application.repositories.source.parsed_pets_repository import ParsedPetsRepository
from infrastructure.db.base import async_session_factory


class ParsedPetsRepositoryImpl(ParsedPetsRepository):
    async def get_unprocessed_pets(self, count: int = 10) -> list[ParsedPet] | None:
        async with async_session_factory() as session:
            try:
                query = select(ParsedPetsORM).where(ParsedPetsORM.process_state=='init').limit(count).order_by(asc(ParsedPetsORM.id))
                result = await session.execute(query)
                if result:
                    pets_orms = result.scalars().all()
                    if pets_orms:
                        return [self._format_orm_to_pydantic(orm) for orm in pets_orms]
                    else:
                        raise EntityNotFound(f"Unprocessed pets were not found")

            except EntityNotFound:
                raise
            except Exception as e:
                raise SettingProcessStateError(f"Error getting unprocessed pets: {e}")


    async def set_pet_as_processed(self, pet_id: int):
        await self._set_pet_process_state(pet_id, "processed")

    async def set_pet_as_processed_with_errors(self, series_id: int):
       await self._set_pet_process_state(series_id, "processed_with_errors")

    @staticmethod
    async def _set_pet_process_state(pet_id: int, state: str):
        async with async_session_factory() as session:
            try:
                query = select(ParsedPetsORM).where(ParsedPetsORM.id == pet_id)
                result = await session.execute(query)
                series_orm = result.scalar_one_or_none()

                if not series_orm:
                    raise EntityNotFound(f"Series with id {pet_id} not found")

                series_orm.process_state = state

                await session.commit()

            except EntityNotFound:
                raise
            except Exception as e:
                raise SettingProcessStateError(f"Error updating process_state for series {pet_id}: {e}")

    @staticmethod
    def _format_orm_to_pydantic(data: ParsedPetsORM) -> ParsedPet:
        return ParsedPet(
            id=data.id,
            name=data.name,
            display_name=data.display_name,
            owner_name=data.owner_name,
            description=data.description,
            primary_image=data.primary_image,
            link=data.link,
            process_state=data.process_state,
        )

    @staticmethod
    def _format_pydantic_to_orm(dto):
        return ParsedPetsORM(
            name=dto.name,
            display_name=dto.display_name,
            owner_name=dto.owner_name,
            description=dto.description,
            primary_image=dto.primary_image,
            link=dto.link,
            process_state="init",
            original_html_content=dto.original_html_content,
        )
