---
title: Response Shaping
sidebar_position: 8
description: How Monstrino transforms canonical domain data into consumer-oriented API responses.
---

# Response Shaping

One of the most important responsibilities of the API layer is **response shaping**.

Monstrino stores and processes data in multiple domain zones, but consumers should receive coherent resource views.

---

## Why Shaping Matters

Without response shaping, clients would need to understand:

- release entities
- relation tables and link records
- media attachment ownership rules
- market observation structures
- raw ingest artifacts

That would be bad API design.

---

## Shape Resources Around Consumer Use Cases

The gateway should return resources that match how clients actually render or use the platform.

### Release Detail View
A release detail response should include:

- release identity fields
- human-readable title and slug
- year and identifiers such as MPN or GTIN when available
- related series
- related characters and pets
- release type metadata
- exclusivity information
- primary media and gallery media
- optional market summary

### Character Detail View
A character detail response should include:

- identity and slug
- primary display metadata
- alt names
- associated releases
- related pets where relevant
- public media

### Series Detail View
A series detail response should include:

- title, slug, kind
- parent or secondary relations where relevant
- tagged release groups
- notable releases or waves

---

## Keep Nullability Intentional

If a field may genuinely be absent, keep it nullable and document why.

| Field | Why it may be null |
|---|---|
| `mpn` | not all releases have a manufacturer part number |
| `gtin` | GTIN is not universally available |
| `description` | some releases have no editorial description yet |
| `textFromBox` | packaging text is not always captured |
| `market.priceSummary` | market data may not yet exist for a release |

:::note
Do not fake certainty in the contract when the domain data is not guaranteed.
:::

---

## Do Not Leak Storage Details

:::warning
Avoid exposing internal fields unless they are product-relevant.

Internal fields that usually should stay hidden:

- lease state
- retry counters
- raw payloads
- internal storage keys unless directly needed
- ingestion trace internals
- moderation reasons unless the consumer is privileged
:::

---

## Media Shaping Rules

A media response should prioritize usability:

- primary image first
- only active and visible assets
- stable public URL
- width and height when available
- useful alt text or caption if present

---

## Example: Release Media Block

```json
{
  "media": {
    "primary": {
      "assetId": "uuid",
      "url": "https://media.monstrino.com/images/...",
      "width": 1200,
      "height": 1600,
      "altText": "Draculaura in Dawn of the Dance 3-Pack"
    },
    "gallery": [
      {
        "assetId": "uuid",
        "url": "https://media.monstrino.com/images/...",
        "role": "gallery",
        "sortOrder": 2
      }
    ]
  }
}
```

---

## Aggregation Discipline

Good shaping does not mean unlimited aggregation.

:::tip
The gateway should compose only what a route **genuinely needs**.

Over-aggregation makes the API slow, expensive, and hard to cache.
:::

---

## Related Pages

- [API Gateway](./02-api-gateway.md)
- [API Contracts and Versioning](./06-api-contracts-and-versioning.md)
- [Media Delivery](./09-media-delivery.md)
- [Consumer Flows](./10-consumer-flows.md)
