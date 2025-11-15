from monstrino_repositories.repositories import SeriesRepo


class SeriesService:
    def __init__(
            self,
            series_repo: SeriesRepo
    ):
        self.series_repo = series_repo


