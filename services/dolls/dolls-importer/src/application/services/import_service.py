from app.dependencies.container_components.repositories import Repositories


class ImportService:
    def __init__(self, repositories: Repositories):
        self.repositories = repositories