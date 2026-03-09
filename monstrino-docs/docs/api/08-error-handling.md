---
title: Error Handling
sidebar_position: 9
description: Error taxonomy and consumer-facing error design for the Monstrino API layer.
---

# Error Handling

Good APIs fail clearly.

The Monstrino API should expose stable consumer-facing errors even when internal failures come from different downstream services.

---

## Error Design Goals

Errors should be:

- **predictable** — consistent shape across all endpoints
- **machine-readable** — stable error codes, not prose only
- **easy to trace** — request IDs in every error
- **safe to expose** — no implementation details
- **clearly separated from internal errors** — no raw stack traces in responses

---

## Recommended Error Envelope

```json
"error": {
  "code": "Internal Error",
  "message": "Internal server error",
  "retryable": true,
  "details": null
},
```

---

## Recommended Error Categories

| HTTP Status | Meaning | Example triggers |
|---|---|---|
| **400** Bad Request | malformed or invalid input | invalid query parameter, bad path value, malformed filter |
| **401** Unauthorized | missing or invalid auth | no token, expired token |
| **403** Forbidden | authenticated but not permitted | accessing admin scope from public token |
| **404** Not Found | resource does not exist | release slug not found |
| **409** Conflict | state conflict on write | duplicate create or stale update |
| **429** Too Many Requests | rate limit reached | quota exceeded |
| **500** Internal Server Error | unexpected platform failure | unhandled exception |
| **502 / 503 / 504** | downstream dependency issue | internal service unreachable or timed out |

---

## Internal-to-External Error Translation

Internal service errors must be translated before reaching clients.

| Internal error | External representation |
|---|---|
| internal timeout | `503 service_unavailable` or `504 gateway_timeout` |
| downstream validation error on internal path | stable gateway error contract |
| missing optional market data | no error — partial response if policy allows |
| database connectivity loss | `503` with stable code |

:::warning
Never forward internal error messages directly to external consumers.

Raw stack traces, SQL details, internal hostnames, and bucket names must never appear in public error responses.
:::

---

## Request Tracing

Every error path should be traceable through:

- request ID
- correlation ID when used across services
- structured logs
- metrics and alerting

---

## Error Message Rule

Consumer-facing messages should be clear but not over-detailed.

| Good | Bad |
|---|---|
| `Release not found.` | `NullPointerException at catalog_service:127` |
| `Invalid sort value.` | `psycopg2 cursor error: column "xyz" does not exist` |
| `Authentication required.` | `Internal service 10.0.0.4:8080 returned 500` |

---

## Related Pages

- [API Gateway](./02-api-gateway.md)
- [Internal Service APIs](./03-internal-service-apis.md)
- [API Contracts and Versioning](./06-api-contracts-and-versioning.md)
