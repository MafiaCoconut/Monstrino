from abc import ABC, abstractmethod

from domain.entities.dolls.new_dolls_series import NewDollsSeries


class DollsSeriesRepository(ABC):
    @abstractmethod
    async def save(self, series: NewDollsSeries):
        pass