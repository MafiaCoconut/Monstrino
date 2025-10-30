from application.repositories.source.parsed_series_repository import ParsedSeriesRepository


class ProcessSeriesUseCase:
    def __init__(self,
                 parsed_series_repository: ParsedSeriesRepository,
                 release_series_repository: ReleaseSeriesRepository
                 ):
        self.series_repository = series_repository
        self.processor = processor

    def execute(self, series_id):
        series = self.series_repository.get_series_by_id(series_id)
        if not series:
            raise ValueError("Series not found")

        processed_data = self.processor.process(series.data)
        self.series_repository.save_processed_data(series_id, processed_data)
        return processed_data