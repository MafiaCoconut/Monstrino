from dataclasses import dataclass

from app.use_cases.processing.series import ProcessSeriesSingleUseCase, ProcessSeriesBatchUseCase


@dataclass
class UseCases:
    process_series_batch: ProcessSeriesBatchUseCase
    process_series_single: ProcessSeriesSingleUseCase

