from domain.entities.dolls.new_dolls_series import NewDollsSeries


class NewSeriesEvent:
    def __init__(self,
                 dolls_series_repository: DpllsSeriesRepository
                 ):
        pass

    async def execute(self, new_series: NewDollsSeries):
