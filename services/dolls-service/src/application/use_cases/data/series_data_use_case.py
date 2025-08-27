from application.repositories.series_repository import SeriesRepository


class SeriesDataUseCase:
    def __init__(self,
                 series_repository: SeriesRepository
                 ):
        self.series_repository = series_repository



    def get_series_by_name(self, name: str) -> int:
        # TODO здесь должен быть перебор из нескольких
        #  возможных вариантов написания имени серии
        pass