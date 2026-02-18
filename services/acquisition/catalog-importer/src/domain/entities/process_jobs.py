from dataclasses import dataclass

from app.use_cases.processing.character import ProcessCharacterBatchUseCase
from app.use_cases.processing.pet import ProcessPetBatchUseCase
from app.use_cases.processing.releases import ProcessReleasesBatchUseCase
from app.use_cases.processing.series import ProcessSeriesBatchUseCase


@dataclass(frozen=True)
class ProcessJobs:
    characters: ProcessCharacterBatchUseCase
    pets: ProcessPetBatchUseCase
    series: ProcessSeriesBatchUseCase
    releases: ProcessReleasesBatchUseCase
