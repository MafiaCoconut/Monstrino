---
title: API Gateway
sidebar_position: 3
description: Responsibilities, boundaries, and design expectations for the Monstrino API Gateway.
---

# API Gateway

The API Gateway is the **public backend entrypoint** of the Monstrino platform.

Its job is not to become a second business domain. Its job is to provide a stable delivery facade over internal services.

---

## Core Responsibilities

The gateway handles the following concerns:

- request routing
- contract-level validation
- aggregation of downstream reads
- response shaping
- authentication and authorization checks
- pagination normalization
- filtering and sorting normalization
- error translation
- observability and request tracing

---

## What the Gateway Should Not Do

:::warning Scope boundary
The gateway must not become the place where core domain rules live.

It should avoid:

- owning catalog truth
- owning market truth
- owning media truth
- duplicating ingestion logic
- embedding AI processing workflows
- reimplementing domain validation already owned by downstream services
:::

---

## Recommended Endpoint Groups

```text
/api/v1/releases
/api/v1/series
/api/v1/characters
/api/v1/pets
/api/v1/market
/api/v1/media
/api/v1/search
/api/v1/health
```

---

## BFF + API Product Hybrid

For Monstrino, the gateway can serve two modes at once:

### Frontend Delivery Mode
Optimized for:

- page rendering
- aggregated responses
- minimal round trips
- UI-friendly payloads

### Public API Mode
Optimized for:

- stable external contracts
- explicit pagination
- documented filtering
- token-based access
- stronger backwards compatibility guarantees

:::tip
These two modes may share infrastructure, but they should be treated as **distinct contract surfaces**.
:::

---

## Example: Release Detail Endpoint

A release detail endpoint should feel like a ready-to-render view, not a bag of unrelated raw rows.

```json
{
  "id": "uuid",
  "slug": "dawn-of-the-dance-3-pack",
  "code": "dawn-of-the-dance-3-pack",
  "title": "Dawn of the Dance 3-Pack",
  "mpn": "V7967",
  "year": 2011,
  "description": "...",
  "textFromBox": null,
  "series": [
    {
      "id": "uuid",
      "slug": "dawn-of-the-dance",
      "title": "Dawn of the Dance",
      "kind": "line",
      "relation": "primary"
    }
  ],
  "characters": [
    {
      "id": "uuid",
      "slug": "draculaura",
      "title": "Draculaura",
      "role": "main"
    }
  ],
  "pets": [],
  "releaseTypes": [
    {
      "code": "doll-figure",
      "category": "content",
      "title": "Doll Figure"
    }
  ],
  "exclusiveVendors": [
    {
      "code": "walmart",
      "title": "Walmart"
    }
  ],
  "media": {
    "primary": {
      "url": "https://media.monstrino.com/...",
      "width": 1200,
      "height": 1600
    },
    "gallery": []
  },
  "market": {
    "msrp": [],
    "priceSummary": null
  }
}
```

---

## Gateway Quality Bar

:::note
A strong gateway implementation should provide:

- stable route naming
- consistent pagination format
- consistent filtering semantics
- explicit nullability behavior
- explicit sorting defaults
- correlation IDs in logs and responses where needed
- contract tests against downstream integrations
:::

---

## Related Pages

- [API Architecture](./01-api-architecture.md)
- [Internal Service APIs](./03-internal-service-apis.md)
- [Response Shaping](./07-response-shaping.md)
- [API Contracts and Versioning](./06-api-contracts-and-versioning.md)
