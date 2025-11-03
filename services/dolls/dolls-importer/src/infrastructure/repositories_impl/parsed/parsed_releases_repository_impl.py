from monstrino_models.orm import ParsedReleasesORM

from application.repositories import ParsedReleasesRepo
from infrastructure.db.base import async_session_factory


class ParsedReleasesRepoImpl(ParsedReleasesRepo):
    async def save(self, data):

        async with async_session_factory() as session:
            release_orm = self._format_pydantic_to_orm(data)
            session.add(release_orm)
            await session.commit()


    @staticmethod
    def _format_pydantic_to_orm(dto):
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
            process_state="init",
        )
