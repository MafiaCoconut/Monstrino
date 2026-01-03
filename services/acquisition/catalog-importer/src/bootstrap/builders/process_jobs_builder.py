from typing import Any

from monstrino_core.interfaces.uow.unit_of_work_factory_interface import UnitOfWorkFactoryInterface

from app.container_components import ProcessJobs, Repositories, Services
from application.use_cases.processing.character import ProcessCharacterBatchUseCase, ProcessCharacterSingleUseCase
from application.use_cases.processing.pet import ProcessPetBatchUseCase, ProcessPetSingleUseCase
from application.use_cases.processing.releases import ProcessReleasesBatchUseCase, ProcessReleaseSingleUseCase
from application.use_cases.processing.series import ProcessSeriesBatchUseCase, ProcessSeriesSingleUseCase


def build_process_jobs(
        uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
        services: Services,
):
    return ProcessJobs(
        characters=ProcessCharacterBatchUseCase(
            uow_factory=uow_factory,
            single_uc=ProcessCharacterSingleUseCase(
                uow_factory=uow_factory,
                gender_resolver_svc=services.process.character.gender_resolver,
                processing_states_svc=services.process.common.processing_states,
                image_reference_svc=services.process.common.image_reference,
            )
        ),
        pets=ProcessPetBatchUseCase(
            uow_factory=uow_factory,
            single_uc=ProcessPetSingleUseCase(
                uow_factory=uow_factory,
                owner_resolver_svc=services.process.pet.owner_resolver,
                processing_states_svc=services.process.common.processing_states,
                image_reference_svc=services.process.common.image_reference,
            )
        ),
        series=ProcessSeriesBatchUseCase(
            uow_factory=uow_factory,
            single_uc=ProcessSeriesSingleUseCase(
                uow_factory=uow_factory,
                parent_resolver_svc=services.process.series.parent_resolver,
                processing_states_svc=services.process.common.processing_states,
                image_reference_svc=services.process.common.image_reference,
            )
        ),
        releases=ProcessReleasesBatchUseCase(
            uow_factory=uow_factory,
            single_uc=ProcessReleaseSingleUseCase(
                uow_factory=uow_factory,
                processing_states_svc=services.process.common.processing_states,
                image_reference_svc=services.process.common.image_reference,

                character_resolver_svc=services.process.release.character_resolver,
                series_resolver_svc=services.process.release.series_resolver,
                exclusive_resolver_svc=services.process.release.exclusive_resolver,
                pet_resolver_svc=services.process.release.pet_resolver,
                reissue_relation_svc=services.process.release.reissue_relation_resolver,

                image_processing_svc=services.process.release.image_processing,

                content_type_resolver_svc=services.process.release.type_resolver,
                pack_type_resolver_svc=services.process.release.type_resolver,
                tier_type_resolver_svc=services.process.release.type_resolver,
            )
        ),
    )