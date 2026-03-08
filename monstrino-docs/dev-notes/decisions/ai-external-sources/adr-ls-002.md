---
id: adr-ls-002
title: "ADR-LS-002: LLM-Assisted Normalization for Release Data"
sidebar_label: "LS-002: LLM Normalization"
sidebar_position: 2
tags: [llm, normalization, release-data, parsing]
description: "Applies LLM-assisted normalization via llm-gateway to extract structured data from inconsistent and free-form Monster High release titles."
---

# ADR-LS-002 — Use LLM-Assisted Normalization for Release Data

| Field      | Value                                                         |
| ---------- | ------------------------------------------------------------- |
| **Status** | Accepted                                                      |
| **Date**   | 26-11-2025                                                    |
| **Author** | @Aleks                                               |
| **Tags**   | `#llm` `#normalization` `#release-data` `#parsing`           |

## Context

Monster High release titles and product names do not follow a consistent naming convention. The same doll line may be described in multiple formats across sources:

- `"Monster High Draculaura Basic Refresh Wave 2"`
- `"Basic Refresh - Wave 2 - Draculaura"`
- `"Draculaura (Basic Refresh, G3 Wave 2)"`

Rule-based parsers produce inconsistent or broken structured output from these names. Comprehensive regex rules would require constant maintenance and would still fail on novel formats.

## Options Considered

### Option 1: Rule-Based Parsing Only

Write and maintain regex/pattern matching for all known title formats.

- **Pros:** Fully deterministic, no external service dependency.
- **Cons:** Brittle, requires constant maintenance, fails on new formats, cannot generalize.

### Option 2: LLM-Assisted Extraction ✅

Use an LLM to extract structured fields (line name, character, wave, generation) from free-form product title text, routing through `llm-gateway`.

- **Pros:** Handles novel formats gracefully, requires simple prompt engineering rather than regex maintenance.
- **Cons:** Non-deterministic output (requires validation), depends on LLM availability, slower than regex.

## Decision

> **LLM-assisted normalization** is used for extracting structured information from free-form release names. The LLM is called via `llm-gateway` and the response is validated against a schema before being stored.

## Consequences

### Positive

- Handles diverse and unpredictable title formats without rule maintenance.
- Can improve over time with better models or prompts.

### Negative

- Non-deterministic — requires output validation and fallback handling.
- Adds latency compared to rule-based parsing.
- Depends on `llm-gateway` availability.

## Related Decisions

- [ADR-LS-001](./adr-ls-001.md) — llm-gateway isolation
- [ADR-DI-005](../data-ingestion/adr-di-005.md) — Heterogeneous parsed models
