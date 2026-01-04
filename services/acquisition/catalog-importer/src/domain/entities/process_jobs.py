from dataclasses import dataclass

from application.use_cases.processing.character import ProcessCharacterBatchUseCase
from application.use_cases.processing.pet import ProcessPetBatchUseCase
from application.use_cases.processing.releases import ProcessReleasesBatchUseCase
from application.use_cases.processing.series import ProcessSeriesBatchUseCase


@dataclass(frozen=True)
class ProcessJobs:
    characters: ProcessCharacterBatchUseCase
    pets: ProcessPetBatchUseCase
    series: ProcessSeriesBatchUseCase
    releases: ProcessReleasesBatchUseCase
