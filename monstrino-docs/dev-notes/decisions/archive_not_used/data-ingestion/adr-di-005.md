---
id: adr-di-005
title: "ADR-DI-005: Centralize Source Parsers in monstrino-infra"
sidebar_label: "DI-005: Centralized Parsers"
sidebar_position: 5
tags: [data-ingestion, parsers, code-sharing, infrastructure]
---

# ADR-DI-005 — Centralize Source Parsers in `monstrino-infra`

| Field     | Value                                                        |
| --------- | ------------------------------------------------------------ |
| **Status**  | Accepted                                                     |
| **Date**    | 2025-08-22                                                   |
| **Author**  | @monstrino-team                                              |
| **Tags**    | `#data-ingestion` `#parsers` `#code-sharing`                |

## Context

The same external sources (e.g., Mattel Creations / Shopify) are consumed by multiple pipeline stages:

- **Catalog collectors** parse product pages for release metadata (title, description, images, variants).
- **Price collectors** parse the same pages for pricing information (MSRP, availability, currency).
- **Media subscribers** parse image URLs and asset metadata from the same source responses.

When parser logic is implemented independently in each service:

- **Behavioral drift** — one service's parser handles edge cases differently from another's.
- **Duplicated maintenance** — source format changes require updating parsers in multiple places.
- **Inconsistent coverage** — one parser may handle a new data format while another silently fails.

:::note Shopify Example
A Shopify product page contains product metadata, pricing, images, and variant data in a single JSON response. At least three different services need to extract different fields from the same structure.
:::

## Options Considered

### Option 1: Parser per Service

Each service implements its own parser for each source.

- **Pros:** Full independence, service-specific optimizations.
- **Cons:** Code duplication, behavioral drift, maintenance multiplier, inconsistent error handling.

### Option 2: Shared Parser Functions in `monstrino-infra` ✅

Source parsers live in the `monstrino-infra` package and expose reusable, composable functions that multiple services import.

- **Pros:** Single source of truth, consistent behavior, one update propagates everywhere, testable in isolation.
- **Cons:** Package dependency, requires careful API design to serve multiple consumers.

### Option 3: Parser Microservice

A dedicated service that accepts raw source data and returns parsed results via API.

- **Pros:** Full isolation, language-agnostic consumers.
- **Cons:** Network overhead for a CPU-bound operation, unnecessary infrastructure for internal parsing, adds latency.

## Decision

> Source parsers must live in **`monstrino-infra`** as reusable functions organized by source platform. Services import and compose these parsers as needed.

### Package Structure

```
monstrino-infra/
└── src/
    └── monstrino_infra/
        └── parsers/
            ├── __init__.py
            ├── shopify/
            │   ├── __init__.py
            │   ├── product_parser.py     # Parse product metadata
            │   ├── price_parser.py       # Parse pricing data
            │   ├── image_parser.py       # Parse image/media URLs
            │   └── variant_parser.py     # Parse variant structures
            ├── wiki/
            │   ├── __init__.py
            │   └── page_parser.py
            └── common/
                ├── __init__.py
                └── html_utils.py         # Shared HTML processing
```

### Design Principles

| Principle                     | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| **Pure functions**            | Parsers take raw data in, return typed DTOs out — no I/O   |
| **Composable**                | Small, focused functions that can be combined per use case  |
| **Source-organized**          | One module per source platform                             |
| **Well-typed returns**        | Parsers return Pydantic models or dataclasses, never dicts |
| **Tested with fixtures**      | Each parser has golden-file tests from real source samples  |

## Consequences

### Positive

- **Consistency** — all services extract the same fields in the same way from the same source.
- **Single point of update** — when a source changes format, one parser update fixes all consumers.
- **Testability** — parsers are pure functions testable with fixture data, no HTTP mocking needed.
- **Discoverability** — all supported sources and their parsers are visible in one package.

### Negative

- **Coupling** — all parser consumers depend on `monstrino-infra` versions.
- **API stability pressure** — parser function signatures must remain stable or versioned carefully.
- **Generalization tension** — serving multiple consumers may lead to over-generic interfaces.

### Risks

- Parser functions may accumulate consumer-specific logic — resist the urge. Each parser should return a neutral parsed DTO; consumer-specific transformations belong in the consuming service.
- Version bumps in `monstrino-infra` that change parser output must be coordinated across consumers.

## Related Decisions

- [ADR-A-003](../architecture/adr-a-003.md) — Shared packages (establishes `monstrino-infra` as a shared package)
- [ADR-DI-001](./adr-di-001.md) — Parsed model design (parsers produce data matching these models)
- [ADR-PS-006](../product-strategy/adr-ps-006.md) — Mattel/Shopify as primary sources (defines which parsers are built first)
