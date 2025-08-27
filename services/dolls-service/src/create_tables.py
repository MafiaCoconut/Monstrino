from infrastructure.db.base import Base, async_engine, sync_engine
from infrastructure.db.models.dolls_images_orm import DollsImagesORM
from infrastructure.db.models.dolls_series_orm import DollsSeriesORM
from infrastructure.db.models.dolls_releases_orm import DollsReleasesORM
from infrastructure.db.models.release_characters_orm import ReleaseCharactersORM
from infrastructure.db.models.original_mh_characters_orm import OriginalMHCharactersORM
from infrastructure.db.models.dolls_types_orm import DollsTypesORM
from infrastructure.db.models.dolls_relations_orm import DollsRelationsORM


# Base.metadata.drop_all(sync_engine)
Base.metadata.create_all(sync_engine)