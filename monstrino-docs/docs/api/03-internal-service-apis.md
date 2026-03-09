---
title: Internal Service APIs
sidebar_position: 4
description: Internal API boundaries between the gateway and Monstrino domain services.
---

# Internal Service APIs

Internal service APIs exist to preserve domain ownership while still allowing the delivery layer to assemble rich responses.

---

## Internal API Principles

Internal service APIs should be:

- **explicit** — stable named contracts, not ad-hoc integration
- **minimal** — expose only what downstream consumers need
- **domain-owned** — each service owns its read model
- **cluster-internal** — not reachable from outside
- **documented by capability** — not by controller file layout

---

## Service Groups Relevant to Delivery

### Release Catalog Service
Primary source for canonical catalog reads.

Typical responsibilities:

- release lookup by id, code, or slug
- series resolution
- character and pet relationships
- release types and exclusivity metadata
- external references where needed internally

### Market Read Models
Responsible for delivery-friendly market data.

Typical responsibilities:

- latest observed prices
- source-based market links
- price history summaries
- region-specific MSRP views

### Media Read Models
Responsible for media attachment and asset delivery metadata.

Typical responsibilities:

- resolving media attachments for a release or other owner
- selecting primary image
- returning active variants
- returning stable public URLs
- exposing moderation-safe visible assets only

---

## What Should Stay Internal-Only

:::warning
The following capabilities should remain internal and undocumented for external consumers:

| Capability | Why |
|---|---|
| collector execution endpoints | operational tooling |
| parser execution endpoints | ingestion internals |
| AI orchestration endpoints | infrastructure detail |
| enrichment retries | operational tooling |
| media ingestion claim/retry operations | job management internals |
| scheduler-triggered maintenance operations | platform operations |
:::

---

## Recommended Internal Endpoint Style

Internal APIs should prioritize **clarity over public elegance**:

```text
/internal/api/v1/releases/by-slug/{slug}
/internal/api/v1/releases/{id}/relationships
/internal/api/v1/media/owners/{owner_type}/{owner_id}/attachments
/internal/api/v1/market/releases/{release_id}/summary
/internal/api/v1/market/releases/{release_id}/msrp
```

These routes are not public-facing. They make intent and ownership obvious.

---

## Aggregation Rule

The gateway aggregates internal reads, but it should not force internal services to return frontend-shaped responses.

| Layer | Returns |
|---|---|
| Internal services | domain-oriented read models |
| Gateway | delivery-oriented contracts |

---

## Partial Failure Behavior

Because gateway responses may depend on multiple services, partial data rules must be explicit:

| Failure type | Policy |
|---|---|
| Missing optional market data | should **not** break release pages |
| Missing optional media variants | should **not** break release pages if primary asset exists |
| Missing canonical release data | should **fail** the request |
| Internal timeouts | translate into stable consumer-facing errors |

---

## Internal API Evolution

Internal API compatibility matters, but it does not need the same long-lived guarantees as public APIs.

:::note Practical rule
- Breaking internal changes are allowed **only with coordinated rollout**.
- Gateway integrations must be covered by contract tests.
- Cross-service field naming should stay stable where shared packages already define DTOs.
:::

---

## Related Pages

- [API Gateway](./02-api-gateway.md)
- [Public API Strategy](./04-public-api-strategy.md)
- [Error Handling](./08-error-handling.md)
