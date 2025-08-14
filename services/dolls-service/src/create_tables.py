from infrastructure.db.base import Base, async_engine, sync_engine
from infrastructure.db.models.images_orm import ImagesORM
from infrastructure.db.models.series_orm import SeriesORM
from infrastructure.db.models.releases_orm import ReleasesORM
from infrastructure.db.models.release_characters_orm import ReleaseCharactersORM
from infrastructure.db.models.characters_orm import CharactersORM
from infrastructure.db.models.product_types_orm import ProductTypesORM
from infrastructure.db.models.relations_orm import RelationsORM


Base.metadata.drop_all(sync_engine)
Base.metadata.create_all(sync_engine)