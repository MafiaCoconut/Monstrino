import pytest
from monstrino_models.dto import ImageReferenceOrigin
from monstrino_models.orm import ImageReferenceOriginORM


@pytest.fixture
def image_reference_origin() -> ImageReferenceOrigin:
    return ImageReferenceOrigin(
        entity_name="Release",
        table_name="releases",
        field_name="primary_image",
        description="Main image for release entry",
        relation_type="one_to_one",
        is_active=True,
    )


@pytest.fixture
def image_reference_origins() -> list[ImageReferenceOrigin]:
    return [
        ImageReferenceOrigin(
            entity_name="Release",
            table_name="releases",
            field_name="primary_image",
            description="Main image for release entry",
            relation_type="one_to_one",
            is_active=True,
        ),
        ImageReferenceOrigin(
            entity_name="Character",
            table_name="characters",
            field_name="primary_image",
            description="Main image for character profile",
            relation_type="one_to_one",
            is_active=True,
        ),
        ImageReferenceOrigin(
            entity_name="ParsedImage",
            table_name="parsed_images",
            field_name="image_url",
            description="Image URLs extracted from parsed HTML content",
            relation_type="one_to_many",
            is_active=False,
        ),
    ]


@pytest.fixture
def image_reference_origins_orms() -> list[ImageReferenceOriginORM]:
    return [
        ImageReferenceOriginORM(
            entity_name="Release",
            table_name="releases",
            field_name="primary_image",
            description="Main image for release entry",
            relation_type="one_to_one",
            is_active=True,
        ),
        ImageReferenceOriginORM(
            entity_name="Character",
            table_name="characters",
            field_name="primary_image",
            description="Main image for character profile",
            relation_type="one_to_one",
            is_active=True,
        ),
        ImageReferenceOriginORM(
            entity_name="ParsedImage",
            table_name="parsed_images",
            field_name="image_url",
            description="Image URLs extracted from parsed HTML content",
            relation_type="one_to_many",
            is_active=False,
        ),
    ]


@pytest.fixture
async def seed_image_reference_origin_db(engine, session_factory, image_reference_origins_orms):
    """Асинхронное наполнение таблицы image_reference_origin начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(image_reference_origins_orms)
        await session.commit()
    yield
