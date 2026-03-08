---
title: monstrino-api
description: Shared HTTP API layer — middleware, exception handlers, ResponseFactory, and the unified response envelope used by every service.
sidebar_label: monstrino-api
sidebar_position: 4
---

# monstrino-api

## Purpose

`monstrino-api` provides the **shared HTTP API layer** for all Monstrino services.

It standardizes how services expose APIs: exception handling, response serialization, request context propagation, validation, and HTTP client abstractions.

## Dependencies

| Package |
|---------|
| `fastapi` |
| `httpx` |
| `pydantic` |
| `aiobreaker` |

No internal Monstrino packages are depended upon — this package is independently deployable.

## Actual Structure

```text
monstrino_api/
├── interface/
└── v1/
    ├── shared/
    │   ├── errors/         # ApiError, NotFoundError, contract_mapper
    │   ├── exceptions/     # Exception hierarchy + register_exception_handlers()
    │   ├── middleware/     # RequestContextMiddleware — X-Request-Id / X-Correlation-Id
    │   ├── requests/       # Request models (e.g. GenerateText)
    │   ├── responses/      # ResponseFactory + response envelope models
    │   └── validation/     # Pydantic validation helpers
    └── support/            # Support domain API module (reserved)
```

## Key Concepts

### Exception Handlers

`register_exception_handlers(app, rf)` registers three handlers on a FastAPI app:

| Exception | HTTP Status | Behaviour |
|-----------|------------|-----------|
| `ApiError` | varies | returns structured `code`/`message`/`details` |
| `RequestValidationError` | 422 | lists field-level validation failures |
| `Exception` (unhandled) | 500 | generic `INTERNAL_ERROR` with `retryable=True` |

### Request Context Middleware
`RequestContextMiddleware` reads or generates `X-Request-Id` and `X-Correlation-Id` headers per request and attaches them to `request.state`. Both headers are echoed back in the response, enabling distributed tracing.

### HttpClientInterface
A `Protocol`-based interface that abstracts any async HTTP client:

```python
class HttpClientInterface(Protocol):
    async def get(self, url: str, response_model: Type[T]) -> T: ...
    async def post(self, url: str, payload: BaseModel | dict, response_model: Type[T]) -> T: ...
    async def close(self) -> None: ...
```

The concrete implementation (`HttpClient`) lives in `monstrino-infra`.

### ResponseFactory
Provides a unified `rf.err(...)` method to produce standardized JSON error envelopes across all services.

### Unified Response Structure

Because every service uses `ResponseFactory` from this package, **all Monstrino services always return the same response envelope** — regardless of which service handles the request.

The envelope has a fixed outer shape:

| Field | Description |
|-------|-------------|
| `status` | `"success"` or `"error"` |
| `request_id` | Auto-generated or forwarded from `X-Request-Id` header |
| `correlation_id` | Auto-generated or forwarded from `X-Correlation-Id` header |
| `trace_id` | Optional trace identifier |
| `data` | Payload — defined per-service via `monstrino-contracts` models |
| `error` | Error details when `status = "error"`, otherwise `null` |
| `meta` | Service name, API version, timestamp |

**Success response:**

```json
{
  "status": "success",
  "request_id": "req_cee2f468f547",
  "correlation_id": "req_cee2f468f547",
  "trace_id": null,
  "data": {
    "items": [],
    "total": 0,
    "page": 1,
    "page_size": 10
  },
  "error": null,
  "meta": {
    "service": "catalog-api-service",
    "version": "v1",
    "timestamp": "2026-03-07T16:14:36.875306Z"
  }
}
```

**Error response:**

```json
{
  "status": "error",
  "request_id": "req_518a4716dc52",
  "correlation_id": "req_518a4716dc52",
  "trace_id": null,
  "data": null,
  "error": {
    "code": "Internal Error",
    "message": "Internal server error",
    "retryable": true,
    "details": null
  },
  "meta": {
    "service": "catalog-api-service",
    "version": "v1",
    "timestamp": "2026-03-07T16:13:53.096787Z"
  }
}
```

The `data` field is the only part that varies between services — each service fills it with its own response model defined in **`monstrino-contracts`**. The rest of the envelope is always identical.

## Architectural Role

`monstrino-api` is the **shared HTTP contract layer**:

```
Client → [monstrino-api: middleware, validation, error handling] → Service handlers → Domain
```
