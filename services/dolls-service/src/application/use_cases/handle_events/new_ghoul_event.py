from application.repositories.dolls_releases_repository import DollsReleasesRepository
from application.repositories.original_mh_characters_repository import OriginalMHCharactersRepository
from application.repositories.series_repository import SeriesRepository
from application.use_cases.data.original_characters_data_use_case import OriginalCharactersDataUseCase
from application.use_cases.data.series_data_use_case import SeriesDataUseCase
from domain.entities.dolls_release import DollsRelease
from src.domain.entities.dolls.new_ghoul import NewGhoul


class NewGhoulEvent:
    def __init__(self,
                 dolls_releases_repository: DollsReleasesRepository,
                 series_repository: SeriesRepository,
                 original_mh_characters_repository: OriginalMHCharactersRepository
                 ):
        self.type_id = 1

        self.series_repository = series_repository
        self.original_mh_characters_repository = original_mh_characters_repository
        self.dolls_releases_repository = dolls_releases_repository

    async def transform(self, new_ghoul: NewGhoul):
        """
        Шаги того что должно быть сделано
        1.  У нас есть NewGhoul данные не форматированные,
            их нужно переформатировать в корректный release
        1.1     Сначала нужно получить series_id, original_charakter_id,
        1.2     Если у серия не найдена, значит это новая оригинальная кукла
                 и нужно создать нового оригинального персонажа
        1.3     Сначала сохраняем новый релиз, чтобы потом взять от него id и запихнуть в images
        2.  Если есть фотографии, их тоже нужно отформатировать и сохранить
        3.

        """
        original_character_id = await self.original_mh_characters_repository.get_id_by_name(new_ghoul.character)

        if original_character_id is None:
            """
            Нужно будет как-то проверять, что новый 
            гуль является новой оригинальной куклой
            """

        series_id = await self.series_repository.get_id_by_name(new_ghoul.series)
        """
        Нужно сначала спарсить
        - всех оригинальных персонажей,
        - все серии
         
        Если серия не будет найдена, тогда просто отобразим '-1'
        и если что отправим уведомление админу о ситуации
        """
        if series_id is None:
            series_id = -1



        release = DollsRelease(
            type_id=self.type_id,
            character_id=original_character_id,
            name=new_ghoul.name,
            mpn=new_ghoul.model_number,
            series_id=series_id,
            year=new_ghoul.year,
            description="",
            link=new_ghoul.url,
        )

        images = None

