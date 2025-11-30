from __future__ import annotations

from typing import Any, Protocol, Type, TypeVar
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)


class HttpClientInterface(Protocol):
    """
    Интерфейс для любого HTTP-клиента Monstrino (универсальный, асинхронный).
    Используется для DI, моков и адаптеров.
    """

    async def get(
        self,
        url: str,
        response_model: Type[T],
    ) -> T:
        """
        Выполняет GET-запрос на указанный абсолютный URL
        и возвращает результат, провалидированный через Pydantic-модель.
        """
        ...

    async def post(
        self,
        url: str,
        payload: BaseModel | dict[str, Any],
        response_model: Type[T],
    ) -> T:
        """
        Выполняет POST-запрос с типизированным payload (BaseModel или dict)
        и возвращает response_model, провалидированный через Pydantic.
        """
        ...

    async def close(self) -> None:
        """
        Корректно закрывает internal httpx.AsyncClient или любой транспорт.
        """
        ...
