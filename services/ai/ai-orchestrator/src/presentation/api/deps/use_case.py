from fastapi import Request, Depends
from app.container import AppContainer, UseCases
from presentation.api.deps import get_container


def get_use_cases(container: AppContainer = Depends(get_container)) -> UseCases:
    return container.use_cases

def get_request_llm_text_uc(use_cases: UseCases = Depends(get_use_cases)):
    return use_cases.request_llm_text
