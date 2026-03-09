---
title: Media Delivery
sidebar_position: 10
description: How media assets should be represented and delivered through the Monstrino API layer.
---

# Media Delivery

Media is a **first-class part of the Monstrino product experience**.

From an API perspective, media delivery should feel simple even though the underlying platform involves ingestion jobs, attachments, variants, moderation, object storage, and public URL generation.

---

## Delivery Responsibilities

The API layer should expose media in a form that is:

- safe for public consumption
- stable over time
- useful for frontend rendering
- decoupled from ingestion internals

---

## Relevant Media Concepts

| Concept | What it describes |
|---|---|
| **Media Asset** | the stored media object and its technical metadata |
| **Media Attachment** | how an asset is attached to a domain owner such as a release |
| **Media Asset Variant** | a transformed or alternate version (e.g., resized derivatives) |
| **Media Ingestion Job** | internal processing state — usually not exposed in public read APIs |

---

## Public Media Contract Recommendations

A public media object should expose only what consumers need:

| Field | Required | Notes |
|---|---|---|
| `assetId` | yes | stable identifier |
| `url` | yes | stable public URL |
| `width` | when known | pixel dimensions |
| `height` | when known | pixel dimensions |
| `contentType` | yes | MIME type for rendering |
| `role` | yes | e.g., `primary`, `gallery` |
| `sortOrder` | when relevant | display ordering |
| `altText` | when available | accessibility text |
| `caption` | when available | optional display caption |

---

## Variant Selection

If variants are available, the API should either:

- choose the best default variant automatically, or
- expose a simple variant list with predictable naming

:::tip
Do not force clients to understand internal storage transforms. Variants should be an implementation detail unless clients explicitly need to choose between them.
:::

---

## Visibility and Moderation

Only media that is **safe and intended for the current audience** should be exposed.

:::warning Internal concerns that must stay behind the API boundary:
- quarantined asset state
- failed variant generation details
- moderation review internals
- retry status and lease ownership
- ingestion job identifiers
:::

---

## URL Strategy

Public media should be served through **stable public URLs**.

The API references those URLs directly, while the underlying bucket, provider, and storage key remain internal implementation details.

---

## Example Media Item

```json
{
  "assetId": "uuid",
  "url": "https://media.monstrino.com/images/releases/dawn-of-the-dance-3-pack/main.webp",
  "contentType": "image/webp",
  "width": 1200,
  "height": 1600,
  "role": "primary",
  "sortOrder": 1,
  "altText": "Dawn of the Dance 3-Pack promotional image"
}
```

---

## Related Pages

- [Response Shaping](./07-response-shaping.md)
- [Media Model](../models/07-media-model.md)
- [Consumer Flows](./10-consumer-flows.md)
