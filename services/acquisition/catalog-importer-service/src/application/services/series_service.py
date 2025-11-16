from monstrino_repositories.repositories_interfaces import SeriesRepoInterface


class SeriesService:
    def __init__(
            self,
            series_repo: SeriesRepoInterface
    ):
        self.series_repo = series_repo


