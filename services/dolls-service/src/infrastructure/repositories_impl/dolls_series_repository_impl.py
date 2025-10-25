from application.repositories.dolls_series_repository import DollsSeriesRepository
from domain.entities.dolls.new_dolls_series import NewDollsSeries


class DollsSeriesRepositoryImpl(DollsSeriesRepository):
    def __init__(self):
        pass

    async def save(self, series: NewDollsSeries):
        pass