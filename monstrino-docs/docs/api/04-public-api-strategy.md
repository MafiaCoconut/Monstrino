---
title: Public API Strategy
sidebar_position: 5
description: Direction and boundaries for the future Monstrino public API.
---

# Public API Strategy

The public API is a **planned product surface**, not the current primary integration mode.

The frontend can evolve faster with a gateway-oriented delivery model. The public API should be introduced only when the platform is ready to support external consumers with stable contracts, authentication, quotas, and documentation.

---

## Public API Goals

A future public API should enable third parties to:

- search releases
- retrieve release detail pages in machine-readable form
- browse characters, pets, and series
- inspect selected market metadata
- resolve public media metadata
- build community tools and catalog integrations

---

## What Should Not Be Exposed Initially

:::warning Stay conservative in v1
The first public API should not expose:

- ingestion internals
- raw parsed content
- AI command schemas
- internal retry state
- scheduler jobs
- moderation internals
- storage provider details beyond what is necessary for delivery
:::

---

## Recommended Maturity Stages

### Stage 1 — Internal Gateway Only
Current practical focus.

| Property | Value |
|---|---|
| Consumer audience | frontend only |
| Token program | none |
| Contract stability | fast iteration |
| Docs | internal |

### Stage 2 — Read-Only External API
First safe external milestone.

| Property | Value |
|---|---|
| Resources | release, series, character, pet, media, selected market reads |
| Authentication | token-based |
| Quotas | documented |
| Terms | explicit terms of use |

### Stage 3 — Extended Ecosystem API
Only after operational maturity.

| Property | Value |
|---|---|
| Capabilities | richer filtering, export-like features, webhooks/feeds if needed |
| Partners | integration partnerships |
| Maturity gate | proven operational stability at Stage 2 |

---

## Recommended Public Route Families

```text
/api/v1/releases
/api/v1/releases/{slug}
/api/v1/series
/api/v1/series/{slug}
/api/v1/characters
/api/v1/characters/{slug}
/api/v1/pets
/api/v1/pets/{slug}
/api/v1/media
/api/v1/search
```

---

## Contract Posture

The public API should follow stricter rules than the internal delivery API:

| Rule | Why |
|---|---|
| versioned base path | enables breaking changes without destroying active clients |
| stronger backwards compatibility guarantees | third-party clients cannot all update simultaneously |
| deprecation notices before removal | courtesy and predictability |
| explicit rate limiting | operational protection |
| explicit documentation of nullable fields | clients cannot guess |
| explicit pagination and sorting rules | reduces integration ambiguity |

---

## Best First API Product

:::tip
The best first public API product is likely a **read-only catalog API**.

It is:
- useful to community developers
- low-risk (reads only)
- easy to document
- naturally aligned with Monstrino's strongest domain
:::

---

## Related Pages

- [API Contracts and Versioning](./06-api-contracts-and-versioning.md)
- [Authentication and Authorization](./05-authentication-and-authorization.md)
- [Consumer Flows](./10-consumer-flows.md)
