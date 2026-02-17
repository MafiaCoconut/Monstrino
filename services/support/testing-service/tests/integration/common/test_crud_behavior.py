import pytest
import logging
import uuid

from monstrino_core.domain.errors import DuplicateEntityError, EntityNotFoundError
from monstrino_core.interfaces import UnitOfWorkInterface
from monstrino_repositories.repositories_impl import ParsedSeriesRepo
from monstrino_testing.fixtures.db import Repositories
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)


@pytest.mark.usefixtures("uow")
class BaseCrudRepoTest:
    """Generic CRUD test suite for any repository."""

    entity_cls = None            # e.g. CharacterGender
    repo_attr = None             # e.g. 'character_gender'
    sample_create_data = {}      # e.g. {"name": "MALE", "display_name": "Male", ...}
    unique_field = None          # e.g. entity_cls.NAME
    unique_field_value = None    # e.g. "MALE"
    update_field = None          # e.g. "display_name"
    updated_value = None         # e.g. "Updated"
    is_duplicable = False

    @pytest.mark.asyncio
    async def test_save_and_get(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        entity = self.entity_cls(**self.sample_create_data)
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            await repo.save(entity)
            fetched = await repo.get_one_by(**{self.unique_field: self.unique_field_value})

        assert fetched is not None
        assert isinstance(fetched, self.entity_cls)

    @pytest.mark.asyncio
    async def test_update_existing(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            entity = self.entity_cls(**self.sample_create_data)
            await repo.save(entity)
            await repo.update(
                filters={self.unique_field: self.unique_field_value},
                values={self.update_field: self.updated_value},
            )
            updated = await repo.get_one_by(**{self.unique_field: self.unique_field_value})
        assert getattr(updated, self.update_field) == self.updated_value

    @pytest.mark.asyncio
    async def test_unique_conflict_raises(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            first = self.entity_cls(**self.sample_create_data)
            await repo.save(first)
            duplicate = self.entity_cls(**self.sample_create_data)
            if not self.is_duplicable:
                with pytest.raises(DuplicateEntityError):
                    async with uow.savepoint():
                        await repo.save(duplicate)

    @pytest.mark.asyncio
    async def test_get_by_field_returns_none(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            if isinstance(self.unique_field_value, str):
                result = await repo.get_one_by(**{self.unique_field: "NON_EXISTENT"})
            elif isinstance(self.unique_field_value, int):
                result = await repo.get_one_by(**{self.unique_field: -99999})
            elif isinstance(self.unique_field_value, uuid.UUID):
                result = await repo.get_one_by(**{self.unique_field: uuid.uuid7()})
            else:
                raise ValueError("unique_field must be str, int, or UUID for this test")

        assert result is None

    @pytest.mark.asyncio
    async def test_get_one_by_or_raise(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            with pytest.raises(EntityNotFoundError):
                if isinstance(self.unique_field_value, str):
                    await repo.get_one_by_or_raise(**{self.unique_field: "NON_EXISTENT"})
                elif isinstance(self.unique_field_value, int):
                    await repo.get_one_by_or_raise(**{self.unique_field: -99999})
                elif isinstance(self.unique_field_value, uuid.UUID):
                    await repo.get_one_by_or_raise(**{self.unique_field: uuid.uuid7()})
                else:
                    raise ValueError("unique_field must be str, int, or UUID for this test")

    @pytest.mark.asyncio
    async def test_count(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            entity = self.entity_cls(**self.sample_create_data)
            before_count = await repo.count_all()
            await repo.save(entity)
            after_count = await repo.count_all()
            assert after_count == before_count + 1

    @pytest.mark.asyncio
    async def test_update_partial_fields(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            entity = self.entity_cls(**self.sample_create_data)
            await repo.save(entity)

            await repo.update(
                filters={self.unique_field: self.unique_field_value},
                values={self.update_field: self.updated_value},
            )

            updated = await repo.get_one_by(**{self.unique_field: self.unique_field_value})
            assert getattr(updated, self.update_field) == self.updated_value
            assert getattr(
                updated, self.unique_field) == self.unique_field_value

    @pytest.mark.asyncio
    async def test_get_by_field_invalid_field_raises(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            with pytest.raises(ValueError):
                await repo.get_one_by(**{"nonexistent_field": "X"})

    @pytest.mark.asyncio
    async def test_delete_by_id(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            entity = self.entity_cls(**self.sample_create_data)
            saved = await repo.save(entity)
            if getattr(saved, "id", None) is not None:
                deleted_count = await repo.delete_by_id(saved.id)
                assert deleted_count == 1
                result = await repo.get_one_by(**{"id": saved.id})
                assert result is None

    @pytest.mark.asyncio
    async def test_get_all_returns_list(self, uow: UnitOfWorkInterface[AsyncSession, Repositories], request):
        async with uow:
            repo = getattr(uow.repos, self.repo_attr)
            # сначала очистим, если нужно
            all_before = await repo.get_all()
            assert isinstance(all_before, list)

            entity = self.entity_cls(**self.sample_create_data)
            await repo.save(entity)
            all_after = await repo.get_all()
            assert any(
                getattr(e, self.unique_field) == self.unique_field_value for e in all_after
            )
