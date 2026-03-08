---
id: ai-roadmap
title: AI Integration Roadmap
sidebar_label: AI Integration Roadmap
sidebar_position: 3
description: Phased plan for expanding AI-assisted capabilities in the Monstrino platform.
---

# AI Integration Roadmap

:::info
This document describes the intended phases of AI capability expansion in Monstrino, from basic text assistance to intelligent pipeline automation.
:::

---

## Overview

AI integration in Monstrino is developed in phases, each building on validated capabilities from the previous one.

The guiding principle:

> AI assists the pipeline — it does **not replace deterministic validation**. Every AI output must pass through a validation step before it reaches canonical storage.

---

## Phase 1 — Basic AI Assistance

**Status: operational**

Initial AI integration focuses on improving the quality of text-based catalog data.

| Capability | Description |
|---|---|
| **Text normalization** | clean up titles, descriptions, and source-specific formatting |
| **Entity extraction** | identify character names, series names, and release types from free-form text |
| **Metadata cleanup** | remove noise, separate mixed fields, standardize formatting |

**Impact:** reduces manual data cleaning and improves catalog consistency for text-heavy sources.

---

## Phase 2 — Advanced Extraction

**Status: planned**

Future models will extend AI assistance to more complex extraction tasks.

| Capability | Description |
|---|---|
| **Character recognition from images** | identify characters from product photos using vision models |
| **Automatic release classification** | classify release type, tier, and category from combined text and image context |
| **Improved unstructured description parsing** | extract structured data from complex, multi-field free-text descriptions |

:::note
Phase 2 requires vision model integration. The current `ai-orchestrator` architecture already supports multimodal models — this phase is about applying that capability to specific extraction tasks.
:::

---

## Phase 3 — Intelligent Automation

**Status: long-term direction**

Long-term goals focus on reducing manual review and detecting data quality issues automatically.

| Capability | Description |
|---|---|
| **AI-driven ingestion validation** | automatically validate extracted data against known catalog patterns |
| **Anomaly detection** | surface suspicious or inconsistent records before they reach canonical storage |
| **Smarter enrichment pipelines** | confidence-scored enrichment with automatic routing of low-confidence items to review queues |

:::warning
Phase 3 capabilities require a strong validation layer and significant observability investment before they can be trusted in production pipelines. Over-automation without confidence scoring creates data corruption risk.
:::

---

## Cross-Cutting Constraint

Across all phases, one constraint applies:

> **AI outputs must be deterministically verifiable before writing to canonical storage.**

This means each AI-assisted stage must have a corresponding validation step that can reject or flag implausible outputs — regardless of what the model returned.

---

## Related Documents

- [AI Orchestrator Architecture](../ai/ai-orchestrator-architecture) — the service executing AI requests,
- [AI Data Enrichment Strategy](../ai/ai-data-enrichment) — how enrichment is integrated into the ingestion pipeline,
- [Model Selection Strategy](../ai/model-selection) — which models support these phases.
