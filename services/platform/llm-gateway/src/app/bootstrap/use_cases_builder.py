from app.container_components import UseCases
from application.interfaces import TextOllamaModelInterface
from application.use_cases.ollama import RequestLLMTextUseCase


def build_use_cases(text_model: TextOllamaModelInterface):
    return UseCases(
        request_llm_text=RequestLLMTextUseCase(
            text_model=text_model
        )

    )