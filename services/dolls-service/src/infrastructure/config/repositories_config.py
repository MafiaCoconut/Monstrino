from app.container import Repositories
from infrastructure.repositories_impl.dolls_images_repository_impl import DollsImagesRepositoryImpl
from infrastructure.repositories_impl.dolls_relations_repository_impl import DollsRelationsRepositoryImpl
from infrastructure.repositories_impl.dolls_releases_repository_impl import DollsReleasesRepositoryImpl
from infrastructure.repositories_impl.dolls_series_repository_impl import DollsSeriesRepositoryImpl
from infrastructure.repositories_impl.dolls_types_repository_impl import DollsTypesRepositoryImpl
from infrastructure.repositories_impl.original_mh_characters_repository_impl import OriginalMHCharactersRepositoryImpl
from infrastructure.repositories_impl.release_characters_repository_impl import ReleaseCharactersRepositoryImpl


def build_repositories() -> Repositories:
    return Repositories(
        dolls_releases=DollsReleasesRepositoryImpl(),
        dolls_images=DollsImagesRepositoryImpl(),
        dolls_relations=DollsRelationsRepositoryImpl(),
        dolls_series=DollsSeriesRepositoryImpl(),
        dolls_types=DollsTypesRepositoryImpl(),
        original_mh_characters=OriginalMHCharactersRepositoryImpl(),
        release_characters=ReleaseCharactersRepositoryImpl(),
    )