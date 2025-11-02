from monstrino_models.dto import ParsedPet
from monstrino_models.exceptions import SavingParsedRecordWithErrors
from monstrino_models.orm import ParsedPetsORM
from sqlalchemy.exc import IntegrityError

from application.repositories.parsed_pets_repository import ParsedPetsRepository
from infrastructure.db.base import async_session_factory


class ParsedPetsRepositoryImpl(ParsedPetsRepository):
    async def save(self, data: ParsedPet):
        async with async_session_factory() as session:
            try:
                character_orm = self._format_pydantic_to_orm(data)
                session.add(character_orm)
                await session.commit()
                # await session.refresh(character_orm)
                # return self._format_orm_to_pydantic(character_orm)
            except IntegrityError as e:
                raise SavingParsedRecordWithErrors(F"Pet with name {data.name} already exists")
            except Exception as e:
                raise SavingParsedRecordWithErrors(f"Error saving pet {data.name}: {e}") from e



    @staticmethod
    def _format_pydantic_to_orm(dto: ParsedPet):
        return ParsedPetsORM(
            name=dto.name,
            owner_name=dto.owner_name,
            description=dto.description,
            primary_image=dto.primary_image,
            link=dto.link,
            process_state="init",
            source=dto.source,
            original_html_content=dto.original_html_content,
        )
