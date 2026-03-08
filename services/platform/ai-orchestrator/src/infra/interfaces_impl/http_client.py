from __future__ import annotations
from icecream import ic
import asyncio
import json
from datetime import timedelta
from typing import Any, Optional, Type, TypeVar

import httpx
from aiobreaker import CircuitBreaker, CircuitBreakerListener
from pydantic import BaseModel

T = TypeVar("T", bound=BaseModel)


class BreakerLogger(CircuitBreakerListener):
    def state_change(self, circuit_breaker, old_state, new_state) -> None:
        print(f"[CIRCUIT] {circuit_breaker.name} {old_state.name} -> {new_state.name}")


class HttpClient:
    """
    Абсолютно независимый, универсальный HTTP-клиент:
      - НЕ знает base_url
      - принимает любой URL в методах get/post
      - поддерживает retries, circuit breaker, pooling, concurrency limits
    """

    _semaphore = asyncio.Semaphore(10)

    def __init__(
        self,
        *,
        timeout: float = 20.0,
        max_connections: int = 100,
        max_keepalive_connections: int = 20,
        breaker_fail_threshold: int = 5,
        breaker_reset_timeout_sec: int = 20,
        user_agent: str = "monstrino-http-client/2025",
    ):
        self._client = httpx.AsyncClient(
            http2=True,
            timeout=timeout,
            limits=httpx.Limits(
                max_connections=max_connections,
                max_keepalive_connections=max_keepalive_connections,
            ),
            headers={"User-Agent": user_agent},
        )

        self._breaker = CircuitBreaker(
            fail_max=breaker_fail_threshold,
            timeout_duration=timedelta(seconds=breaker_reset_timeout_sec),
            listeners=[BreakerLogger()],
            name="HttpClient",
        )

    async def _raw_request(
        self,
        method: str,
        url: str,
        *,
        json_body: Optional[dict[str, Any]] = None,
    ) -> httpx.Response:
        async with self._semaphore:
            resp = await self._client.request(method, url, json=json_body)
            # resp.raise_for_status()
            return resp

    async def post(
        self,
        url: str,
        payload: BaseModel | dict[str, Any],
        response_model: Type[T],
    ) -> T:
        """
        Отправка POST на ЛЮБОЙ URL.
        - оборачивается в circuit breaker
        - типизированный ответ
        """

        if isinstance(payload, BaseModel):
            json_body = payload.model_dump()
        else:
            json_body = payload

        @_wrap_breaker(self._breaker)
        async def run():
            resp = await self._raw_request("POST", url, json_body=json_body)
            data = resp.json()
            if resp.status_code == 200:
                try:

                    return response_model.model_validate(data)
                except Exception as e:
                    print("[HTTPCLIENT] Response validation error:", e)
                    print(json.dumps(data, ensure_ascii=False, indent=2))
                    raise
            else:
                print(f"[HTTPCLIENT] {resp.status_code} response: {data}")
                print(json.dumps(data, ensure_ascii=False, indent=2))
            return None
                # resp.raise_for_status()

        return await run()

    async def get(
        self,
        url: str,
        response_model: Type[T],
    ) -> T:

        @_wrap_breaker(self._breaker)
        async def run():
            resp = await self._raw_request("GET", url)
            data = resp.json()
            return response_model.model_validate(data)

        return await run()

    async def close(self) -> None:
        await self._client.aclose()


def _wrap_breaker(breaker: CircuitBreaker):
    """
    Обёртка, позволяющая использовать CircuitBreaker для корутин.
    """
    def decorator(fn):
        @breaker
        async def wrapped(*args, **kwargs):
            return await fn(*args, **kwargs)
        return wrapped
    return decorator
