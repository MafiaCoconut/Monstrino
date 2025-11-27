from platform import release

from monstrino_models.dto import ParsedRelease
from monstrino_models.exceptions import SavingParsedRecordWithErrors
from monstrino_models.orm import ParsedReleasesORM
from sqlalchemy.exc import IntegrityError

from application.repositories.parsed_release_repository import ParsedReleasesRepository
from infrastructure.db.base import async_session_factory


class ParsedReleasesRepositoryImpl(ParsedReleasesRepository):
    async def save(self, data: ParsedRelease):
        async with async_session_factory() as session:
            try:
                release_orm = self._format_pydantic_to_orm(data)
                session.add(release_orm)
                await session.commit()
            except IntegrityError as e:
                raise SavingParsedRecordWithErrors(
                    F"Release with name {data.name} already exists: {e}")
            except Exception as e:
                raise SavingParsedRecordWithErrors(
                    f"Error saving release {data.name}: {e}") from e

    @staticmethod
    def _format_pydantic_to_orm(dto: ParsedRelease):
        return ParsedReleasesORM(
            name=dto.name,
            characters=dto.characters,
            series_name=dto.series_name,
            type_name=dto.type_name,
            gender=dto.gender,
            multi_pack=dto.multi_pack,
            year=dto.year,
            exclusive_of_names=dto.exclusive_of_names,
            reissue_of=dto.reissue_of,
            mpn=dto.mpn,
            pet_names=dto.pet_names,
            description=dto.description,
            from_the_box_text=dto.from_the_box_text,
            primary_image=dto.primary_image,
            images=dto.images,
            images_link=dto.images_link,
            link=dto.link,
            original_html_content=dto.original_html_content,
            extra=dto.extra,
            processing_state="init",
            source=dto.source,
        )
