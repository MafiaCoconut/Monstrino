---
id: adr-di-001
title: "ADR-DI-001: Parsed Models for Heterogeneous Source Data"
sidebar_label: "DI-001: Heterogeneous Parsed Models"
sidebar_position: 1
tags: [data-ingestion, parsed-models, schema-design, sources]
---

# ADR-DI-001 — Design Parsed Models for Heterogeneous Source Data

| Field     | Value                                                       |
| --------- | ----------------------------------------------------------- |
| **Status**  | Accepted                                                    |
| **Date**    | 2025-08-10                                                  |
| **Author**  | @monstrino-team                                             |
| **Tags**    | `#data-ingestion` `#parsed-models` `#schema-design`        |

## Context

Monstrino collects data from multiple external sources, each with distinct structures:

- **Shopify-based stores** provide structured JSON product data with variants, images, and tags.
- **Fan wikis and databases** offer semi-structured HTML with inconsistent field naming.
- **Social media / announcement feeds** contain free-text descriptions with embedded metadata.

Early parsed models were designed around a single source (Mattel Creations / Shopify) and made source-specific assumptions:

- Fixed field names matched Shopify's product schema.
- Variant structures assumed Shopify's `option1` / `option2` pattern.
- Price fields expected USD-formatted decimals from a single storefront.

When additional sources were integrated, these assumptions broke, requiring schema redesign and data migration.

:::danger Lesson Learned
Source-specific parsed models create a **hidden migration tax**: every new source potentially requires schema changes, data backfills, and downstream importer updates.
:::

## Options Considered

### Option 1: Source-Specific Parsed Tables

One set of parsed tables per source (e.g., `parsed_shopify_releases`, `parsed_wiki_releases`).

- **Pros:** Each table matches its source perfectly, no compromise.
- **Cons:** Table proliferation, duplicate importer logic per source, cross-source queries require UNIONs, adding a source means new tables + new importers.

### Option 2: Universal Parsed Schema with Flexible Fields ✅

A single set of parsed tables designed for the **union of all known source shapes**, using nullable columns, JSONB overflow fields, and source metadata.

- **Pros:** One schema to maintain, one importer pipeline, cross-source queries are trivial, adding sources rarely requires schema changes.
- **Cons:** Some columns unused for certain sources, schema is wider, JSONB fields lose database-level type enforcement.

### Option 3: Fully Schemaless Storage (JSONB-only)

Parsed records stored as raw JSONB documents with minimal typed columns.

- **Pros:** Maximum flexibility, zero schema changes for new sources.
- **Cons:** No query optimization, no database-level validation, difficult to build reliable importers against unstructured data.

## Decision

> Parsed tables must be designed for **heterogeneous, multi-source data** using a combination of typed common fields and flexible JSONB extension fields.

### Design Principles

| Principle                        | Implementation                                              |
| -------------------------------- | ----------------------------------------------------------- |
| **Common fields are typed**      | `title`, `external_id`, `source`, `processing_state` are typed columns |
| **Source-specific data in JSONB** | `raw_data`, `extra_attributes` store source-specific fields |
| **Source always recorded**       | Every parsed record carries `source` + `external_id`       |
| **No source-specific columns**   | Avoid `shopify_handle`, `wiki_page_id` as top-level columns |
| **Nullable by default**         | Non-universal fields are nullable — not every source provides every attribute |

### Example Schema Pattern

```sql
CREATE TABLE ingest.parsed_releases (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source        VARCHAR(50) NOT NULL,
    external_id   VARCHAR(255) NOT NULL,
    title         TEXT,
    description   TEXT,
    raw_data      JSONB NOT NULL,        -- Full source response
    extra_attrs   JSONB DEFAULT '{}',    -- Extracted but non-standard fields
    processing_state VARCHAR(20) DEFAULT 'init',
    created_at    TIMESTAMPTZ DEFAULT now(),
    updated_at    TIMESTAMPTZ DEFAULT now(),
    UNIQUE (source, external_id)
);
```

## Consequences

### Positive

- **Source-agnostic pipeline** — new sources can be added by writing a parser without touching the schema.
- **Reduced schema churn** — the parsed schema is stable across source additions.
- **Raw data preservation** — `raw_data` JSONB stores the complete source response for replay and debugging.
- **Queryable flexibility** — PostgreSQL JSONB operators allow querying source-specific fields when needed.

### Negative

- **Wider tables** — some columns are NULL for certain sources, wasting minor space.
- **JSONB discipline required** — teams must document which keys appear in `extra_attrs` per source.
- **Weaker compile-time guarantees** — JSONB fields are not validated by the database schema.

### Risks

- JSONB fields can become dumping grounds — establish conventions for what goes in `extra_attrs` vs. what warrants a typed column.
- Query performance on JSONB requires GIN indexes — ensure these are created for high-frequency access patterns.

## Related Decisions

- [ADR-A-001](../architecture/adr-a-001.md) — Parsed tables boundary (establishes the need for parsed models)
- [ADR-DI-002](./adr-di-002.md) — External references as identifiers (defines the `source` + `external_id` pattern)
- [ADR-DI-003](./adr-di-003.md) — Idempotency enforcement (uses the unique constraint from this schema)
