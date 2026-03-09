---
title: Authentication and Authorization
sidebar_position: 6
description: Authentication and authorization model for the Monstrino API layer.
---

# Authentication and Authorization

Authentication and authorization requirements differ depending on the API surface.

---

## Surface-Specific Policy

| Surface | Policy |
|---|---|
| Public documentation pages | public |
| Public catalog reads | public initially; token-protected when public API launches |
| Admin and operational APIs | must be protected |
| Internal service APIs | must not be publicly reachable |

---

## Recommended Auth Model

### 1. Gateway Session or Token Auth
Use the gateway as the **policy enforcement point**.

This keeps consumer auth logic in one place and prevents every internal service from becoming externally security-aware.

### 2. Service-to-Service Trust
Internal service APIs should rely on **cluster-private networking** plus service authentication where needed.

### 3. Admin Scope Separation
Admin operations should be isolated from public catalog reads.

A strong scope split:

| Scope | Target |
|---|---|
| public read scope | any consumer |
| authenticated user scope | future registered users |
| admin scope | internal admin operations |
| internal service scope | cluster-internal only |

---

## API Token Direction

When the public API is introduced, token design should support at least:

| Field | Purpose |
|---|---|
| token identifier | stable identity for the token |
| owner or client application | who holds the token |
| status | active / revoked |
| `created_at` / `expires_at` | lifecycle management |
| optional scopes | fine-grained permission control |
| rate limit tier | enforcement bucket |

---

## Authorization Philosophy

Monstrino is primarily a **read platform** from the consumer perspective.

Authorization should stay simple unless write surfaces are introduced:

| Operation | Access level |
|---|---|
| catalog reads | broad access |
| market summary reads | broad access (if legally acceptable) |
| admin write operations | explicit admin-only |
| ingestion, AI, maintenance | internal-only |

---

## Security Boundary Rule

:::warning
Public clients should **never** receive:

- direct credentials
- internal service topology information
- operational endpoints for object storage administration
- internal service IP addresses or DNS
- AI infrastructure access
- scheduler control endpoints
- ingestion job management endpoints
:::

---

## Related Pages

- [API Gateway](./02-api-gateway.md)
- [Public API Strategy](./04-public-api-strategy.md)
- [Security Boundaries](../architecture/06-security-boundaries.md)
