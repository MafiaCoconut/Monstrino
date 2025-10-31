from app.container import Repositories

from infrastructure.repositories_impl.parsed_images_repository_impl import ParsedImagesRepositoryImpl


def build_repositories() -> Repositories:
    return Repositories(
        parsed_images=ParsedImagesRepositoryImpl()
    )