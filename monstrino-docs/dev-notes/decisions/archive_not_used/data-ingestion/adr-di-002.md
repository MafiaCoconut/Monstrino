---
id: adr-di-002
title: "ADR-DI-002: External References as Primary Identifiers"
sidebar_label: "DI-002: External Reference IDs"
sidebar_position: 2
tags: [data-ingestion, identifiers, idempotency, external-data]
---

# ADR-DI-002 — Use External References as Primary Ingestion Identifiers

| Field     | Value                                                       |
| --------- | ----------------------------------------------------------- |
| **Status**  | Accepted                                                    |
| **Date**    | 2025-08-12                                                  |
| **Author**  | @monstrino-team                                             |
| **Tags**    | `#data-ingestion` `#identifiers` `#idempotency`            |

## Context

External data sources provide various means of identifying their entities:

- **URLs** — page links, API endpoints, image URLs.
- **Slugs** — human-readable path components (e.g., `monster-high-draculaura-doll`).
- **API identifiers** — Shopify product IDs, database primary keys from external systems.
- **SKU / UPC codes** — standardized product identification numbers.

Early implementations used **URLs as primary identifiers** for ingested records. This proved fragile:

- URLs change during site redesigns or CDN migrations.
- The same product may appear at multiple URLs (localized stores, URL rewrites).
- URL encoding differences create false duplicates (`%20` vs `+` vs space).
- URLs contain transport-specific components (query parameters, fragments) that are irrelevant to identity.

## Options Considered

### Option 1: Use URLs as Identifiers

Parse page URLs are the primary key for deduplication and tracking.

- **Pros:** Immediately available, no parsing required.
- **Cons:** Fragile, changes frequently, encoding issues, multiple URLs per entity, transport-coupled.

### Option 2: Generated Hash-Based IDs

Generate deterministic hashes from content or field combinations.

- **Pros:** Stable if input fields are stable, content-addressable.
- **Cons:** Hash collisions, brittle if field selection changes, no semantic meaning, debugging difficulty.

### Option 3: Stable External References ✅

Use the most stable, semantically meaningful identifier from each source: API IDs, product handles, SKU codes, or other persistent external identifiers.

- **Pros:** Semantically meaningful, stable across URL changes, supports API targeting, enables reliable deduplication.
- **Cons:** Requires source-specific knowledge of which identifier is most stable.

## Decision

> Source objects must be identified and processed through **stable external identifiers and references** rather than URLs or generated hashes. Each source must define which external field serves as its canonical identifier.

### Identifier Hierarchy per Source Type

| Source Type           | Primary Identifier     | Fallback                    |
| --------------------- | ---------------------- | --------------------------- |
| Shopify stores        | Product `handle`       | Shopify product ID          |
| REST APIs             | API entity ID          | Composite key from fields   |
| Fan wiki pages        | Page slug / title      | URL-derived slug            |
| Price listings        | SKU / UPC code         | Source + listing ID         |

### Usage Pattern

```python
parsed_release = ParsedRelease(
    source="mattel-creations",
    external_id="monster-high-draculaura-skulltimate-secrets",
    # ... other fields
)
```

The combination of `source` + `external_id` uniquely identifies every ingested record across the system.

## Consequences

### Positive

- **URL independence** — identifier survives site redesigns, CDN changes, and URL format updates.
- **API targetability** — external IDs can be used to query source APIs directly for updates.
- **Reliable deduplication** — same entity from multiple URL variations resolves to one record.
- **Semantic clarity** — `external_id` communicates what the entity is, unlike a hash.

### Negative

- **Source analysis required** — each new source requires identifying the most stable reference field.
- **Not universally available** — some sources may lack stable identifiers, requiring fallback strategies.
- **Mapping maintenance** — source-to-identifier-field mapping must be documented and maintained.

### Risks

- External identifiers can still change (though less frequently than URLs) — build monitoring for identifier drift.
- Different sources may coincidentally use the same identifier value — the `source` field prevents cross-source collisions.

## Related Decisions

- [ADR-DI-001](./adr-di-001.md) — Parsed model design (external_id is a core schema field)
- [ADR-DI-003](./adr-di-003.md) — Idempotency enforcement (depends on the identifier strategy from this ADR)
- [ADR-DI-004](./adr-di-004.md) — Replayable JSON storage (references are used as storage keys)
