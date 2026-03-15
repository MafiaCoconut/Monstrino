---
title: Admin API Service
sidebar_position: 3
description: >
  Unified admin-facing API entrypoint that aggregates admin domain read models
  and submits validated admin commands into asynchronous workflows.
---

# Admin API Service

`admin-api-service` is the single admin-facing API layer for alert and review
workflows. It provides read models across admin domain tables and converts
admin actions into controlled state transitions or asynchronous commands.

---

## Responsibilities

The service:

- exposes read APIs for alerts and reviews
- provides acknowledge/resolve endpoints for high-severity alerts
- publishes `admin.review.decision.submit` when admin chooses a review option
- exposes cancellation endpoint for open reviews
- aggregates admin-domain tables into admin-facing DTOs
- acts as protocol boundary for gateways (Telegram/web clients)

The service does not:

- own alert creation
- own review request/option/response persistence logic
- publish final review result (`admin.review.decided`)

---

## Interface Role in Pipelines

| Pipeline | API role |
| --- | --- |
| Alert | read alert state, acknowledge/resolve `error` and `critical` alerts |
| Review | read open review cases/options, submit decision command, cancel open review |

---

## Key Actions

### Alert actions

- `PATCH /alerts/:id/acknowledge`
- `PATCH /alerts/:id/resolve`

These update admin action fields (`acknowledged_by`, `resolved_by`, timestamps,
optional resolution note) on alert records.

### Review actions

- submit selected review option -> publish `admin.review.decision.submit`
- `POST /reviews/:id/cancel` for open review cancellation

Decision submission uses async command flow so external transports cannot bypass
review validation logic in `admin-review-service`.

---

## Data Access Pattern

- Read-only access across admin review and alert tables for aggregation
- No direct ownership of review workflow persistence
- No direct ownership of alert creation/delivery state machine

---

## Boundaries

- Domain: **admin API boundary**
- Communication:
  - synchronous: admin-facing HTTP endpoints
  - asynchronous: Kafka command publication (`admin.review.decision.submit`)
- Security: admin-scoped operations only (internal admin access policy)

---

## Related Services

| Service | Relationship |
| --- | --- |
| `admin-alert-service` | source of alert domain state |
| `admin-review-service` | source of review domain state and decision handling |
| `admin-telegram-gateway` | gateway client of this API for admin interaction flows |
