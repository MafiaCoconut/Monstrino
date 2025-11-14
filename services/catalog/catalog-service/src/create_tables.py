from infrastructure.db.base import Base, async_engine, sync_engine
from infrastructure.db.models.release_image_orm import ReleaseImagesORM
from infrastructure.db.models.release_series_orm import SeriesORM
from infrastructure.db.models.release_orm import ReleasesORM
from infrastructure.db.models.release_character_link_orm import ReleaseCharactersORM
from infrastructure.db.models.characters_orm import CharactersORM
from infrastructure.db.models.release_type_orm import ReleaseTypesORM
from infrastructure.db.models.release_relation_link_orm import ReleaseRelationsORM


# Base.metadata.drop_all(sync_engine)
Base.metadata.create_all(sync_engine)
