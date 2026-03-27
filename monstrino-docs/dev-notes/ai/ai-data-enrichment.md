---
id: ai-data-enrichment
title: AI Data Enrichment Strategy
sidebar_label: AI Data Enrichment Strategy
sidebar_position: 4
description: How and where AI-assisted enrichment fits into the Monstrino data ingestion pipeline.
---

# AI Data Enrichment Strategy

:::info
This document describes the role of AI-assisted enrichment within the Monstrino data ingestion pipeline - specifically, when it runs and what problems it is expected to solve.
:::

---

## Problem

External sources often contain **incomplete or inconsistent information** about releases.

Common issues encountered in the wild:

| Issue | Example |
|---|---|
| Missing character names | product title mentions a doll name but not the character |
| Inconsistent series names | same series spelled differently across sources |
| Unstructured descriptions | free-form text mixing specs, marketing copy, and metadata |
| Ambiguous release types | not clear from source data if item is a doll, a set, or an accessory |

Rule-based parsers alone cannot reliably resolve these ambiguities.

---

## Solution

AI models assist in post-parse enrichment by performing:

| Operation | Description |
|---|---|
| **Entity extraction** | identifying character names, series, and types from free-form text |
| **Description cleanup** | removing noise, normalizing phrasing, separating fields |
| **Field validation** | checking whether extracted values are plausible |
| **Candidate mapping** | proposing associations to known Monstrino entities |

:::note
AI enrichment is **not a replacement for deterministic parsers**. It is a complementary step applied after initial parsing, where rule-based extraction reaches its limits.
:::

---

## Pipeline Integration

AI enrichment is inserted between raw parsing and final persistence.

```
Source Collector
    → Raw Payload Storage
        → Parser (deterministic field extraction)
            → AI Enrichment (optional, high-ambiguity fields only)
                → Validation
                    → Normalized Persistence
```

This position means:

- the AI model always works on **already partially structured data**, reducing hallucination risk,
- enrichment failures can be isolated without affecting raw or parsed records,
- the step can be skipped for clean sources that need no enrichment.

---

## When AI Enrichment Is Applied

:::tip
Not every ingestion record needs AI enrichment. It should be applied selectively.
:::

Enrichment is most useful when:

- the parser extracted a title but could not identify the character confidently,
- the series name appears in an unexpected format,
- the item description contains structured facts buried in free text,
- automated validation detects low-confidence field values.

---

## Failure Handling

If AI enrichment fails or returns low-confidence results:

- the record should **not be blocked** from persisting in its partially enriched state,
- enrichment failures should be logged with enough context to retry,
- records with unresolved ambiguity should transition to `needs_review` rather than `failed`.

---

## Related Documents

- [Catalog Ingestion Pipeline](/docs/pipelines/data-ingestion/catalog-ingest/overview) - the full ingestion flow this enrichment step belongs to,
- [AI Command Execution Schema](./ai-command-schema) - how enrichment commands are structured,
- [AI Orchestrator Architecture](./ai-orchestrator-architecture) - the service that executes enrichment requests.
