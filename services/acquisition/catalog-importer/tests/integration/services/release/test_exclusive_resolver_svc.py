import pytest
from monstrino_core.domain.services import NameFormatter
from monstrino_core.domain.errors import ExclusiveDataInvalidError
from monstrino_models.dto import ReleaseCharacterLink, ReleaseExclusiveLink
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.releases import CharacterResolverService, ExclusiveResolverService


def exclusive_list_data() -> list:
    return [
        {
            "link": "https://mattel-creation",
            "text": "Mattel Creations"
        },
        {
            "link": "https://target.com",
            "text": "Target"
        }
    ]


@pytest.mark.asyncio
async def test_exclusive_resolver_svc(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_exclusive_vendor_list,
        seed_release_list
):

    service = ExclusiveResolverService()
    release_exclusives = exclusive_list_data()
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            exclusive_list=release_exclusives
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseExclusiveLink] = await uow.repos.release_exclusive_link.get_all()
        assert len(links) == len(release_exclusives)

        assert links[0].vendor_id == await uow.repos.exclusive_vendor.get_id_by(name=NameFormatter.format_name(release_exclusives[0]['text']))
        assert links[1].vendor_id == await uow.repos.exclusive_vendor.get_id_by(name=NameFormatter.format_name(release_exclusives[1]['text']))


@pytest.mark.asyncio
async def test_exclusive_resolver_svc_duplicate_link_created(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_exclusive_vendor_list,
        seed_release_list
):
    """
    Тест проверяет, что при отсутствии проверки EXISTS в сервисе,
    повторный вызов resolve (или дубликаты в списке) создаст дублирующие связи.
    """
    service = ExclusiveResolverService()
    release_exclusives = exclusive_list_data() # Два вендора: 'Mattel Creations', 'Target'

    async with uow_factory.create() as uow:
        # Первый вызов создает 2 связи
        await service.resolve(
            uow=uow,
            release_id=1,
            exclusive_list=release_exclusives
        )
        # Второй вызов должен создать 2 дублирующие связи
        await service.resolve(
            uow=uow,
            release_id=1,
            exclusive_list=release_exclusives
        )

    async with uow_factory.create() as uow:
        links: list[ReleaseExclusiveLink] = await uow.repos.release_exclusive_link.get_all()
        # Ожидается 4 связи, если логика предотвращения дублирования отсутствует.
        # Если вы добавите логику предотвращения дублирования, это должно быть 2.
        assert len(links) == 2


import logging  # Не забудьте импортировать


@pytest.mark.asyncio
async def test_exclusive_resolver_svc_vendor_not_found_in_db(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_exclusive_vendor_list,
        seed_release_list,
        caplog  # Фикстура pytest для перехвата логов
):
    """
    Тест проверяет, что если вендор не найден в БД,
    связь не создается, а в лог записывается ошибка.
    """
    service = ExclusiveResolverService()
    release_exclusives = [
        exclusive_list_data()[0],  # Существующий вендор: 'Mattel Creations'
        {"link": "https://nonexistent.com", "text": "NonExistentVendor"}  # Несуществующий
    ]

    # Задаем уровень логирования, чтобы убедиться, что error будет перехвачен
    with caplog.at_level(logging.ERROR):
        async with uow_factory.create() as uow:
            await service.resolve(
                uow=uow,
                release_id=1,
                exclusive_list=release_exclusives
            )

    async with uow_factory.create() as uow:
        links: list[ReleaseExclusiveLink] = await uow.repos.release_exclusive_link.get_all()

        # Должна быть создана только 1 связь (для существующего вендора)
        assert len(links) == 1

        # Проверяем, что ошибка была залогирована
        assert "Exclusive vendor found in parser data, but not found in db with name: NonExistentVendor" in caplog.text


@pytest.mark.asyncio
async def test_exclusive_resolver_svc_data_invalid_error(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list
):
    """
    Тест проверяет, что выбрасывается ExclusiveDataInvalidError при отсутствии поля 'text'.
    """
    service = ExclusiveResolverService()
    # Данные без поля 'text'
    release_exclusives = [
        {"link": "https://missing-text.com"}
    ]

    async with uow_factory.create() as uow:
        with pytest.raises(ExclusiveDataInvalidError) as excinfo:
            await service.resolve(
                uow=uow,
                release_id=1,
                exclusive_list=release_exclusives
            )

        # Проверка сообщения об ошибке
        assert "Exclusive vendor" in str(excinfo.value)

    # Убедимся, что никакие связи не были созданы
    async with uow_factory.create() as uow:
        links: list[ReleaseExclusiveLink] = await uow.repos.release_exclusive_link.get_all()
        assert len(links) == 0