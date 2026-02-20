from dataclasses import dataclass

from application.use_cases.ollama import RequestLLMTextUseCase


# from application.use_cases.processing.series import ProcessSeriesSingleUseCase, ProcessSeriesBatchUseCase


@dataclass
class UseCases:
    request_llm_text: RequestLLMTextUseCase
    ...
    # process_series_batch: ProcessSeriesBatchUseCase
    # process_series_single: ProcessSeriesSingleUseCase

