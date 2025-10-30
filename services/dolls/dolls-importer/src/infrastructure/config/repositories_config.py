from app.container import Repositories
from infrastructure.repositories_impl.release_images_repository_impl import ReleaseImagesRepositoryImpl
from infrastructure.repositories_impl.releae_relations_repository_impl import ReleaseRelationsRepositoryImpl
from infrastructure.repositories_impl.dolls_releases_repository_impl import DollsReleasesRepositoryImpl
from infrastructure.repositories_impl.dolls_series_repository_impl import DollsSeriesRepositoryImpl
from infrastructure.repositories_impl.dolls_types_repository_impl import DollsTypesRepositoryImpl
from infrastructure.repositories_impl.original_characters_repository_impl import OriginalCharactersRepositoryImpl
from infrastructure.repositories_impl.release_characters_repository_impl import ReleaseCharactersRepositoryImpl


def build_repositories() -> Repositories:
    return Repositories(
        dolls_releases=DollsReleasesRepositoryImpl(),
        release_images=ReleaseImagesRepositoryImpl(),
        release_relations=ReleaseRelationsRepositoryImpl(),
        dolls_series=DollsSeriesRepositoryImpl(),
        dolls_types=DollsTypesRepositoryImpl(),
        original_characters=OriginalCharactersRepositoryImpl(),
        release_characters=ReleaseCharactersRepositoryImpl(),
    )