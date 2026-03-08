---
title: AI Features Overview
sidebar_position: 1
description: How Monstrino integrates LLM-based inference into a production data pipeline — architecture, boundaries, and operational control.
---

import Admonition from '@theme/Admonition';

# AI Features

Monstrino uses large language models as a controlled, production-grade component of its data enrichment pipeline.

The integration is designed around one principle: **AI increases data quality without introducing unpredictability into the platform**. Every AI interaction is scoped, validated, and executed through a dedicated service that owns all prompt logic, model configuration, and structured response handling.

---

## The Problem AI Solves

Monster High release data arriving from external sources is frequently incomplete.

A release record may contain a title, an MPN, and a description — but the `characters`, `series`, `tier`, or `content_type` fields are empty. Filling them through deterministic rules alone would require maintaining increasingly fragile pattern matching across many source formats, languages, and naming conventions.

LLMs solve this class of problem well. They can interpret natural language descriptions, recognize entity names in context, and return structured output — without requiring hand-crafted rules for every variation.

<Admonition type="info" title="Scope">
AI is used exclusively for interpretation and enrichment tasks. Ingestion, storage, normalization, public APIs, and media processing are all fully deterministic and have no dependency on AI availability.
</Admonition>

---

## Architecture at a Glance

The AI layer consists of two services working in sequence:

| Service | Role |
|---|---|
| `catalog-data-enricher` | Detects missing fields, selects enrichment Use Cases, validates results, forwards to downstream |
| `ai-orchestrator` | Executes AI scenarios, manages prompts, handles multi-step command loops, abstracts models |

The calling service never constructs prompts or interacts with a model directly. It sends domain data and receives structured output. All AI complexity is encapsulated inside `ai-orchestrator`.

```text
catalog-data-enricher
  → AIOrchestratorApiClient
  → ai-orchestrator (Job → Use Case → AIClient → model)
  → structured result
  → validation
  → downstream
```

---

## What Makes This Production-Grade

Most "AI integrations" in hobby or early-stage projects are direct API calls with raw prompt strings scattered across services. Monstrino is deliberately built differently.

### Centralized scenario execution

`ai-orchestrator` exposes named business scenarios — `characters-enrichment`, `series-enrichment`, `image-recognition` — not generic endpoints like "ask AI". Calling services use domain vocabulary, not model vocabulary.

### Model abstraction

All AI clients implement a common `LLMClientInterface` Protocol. Switching from one model backend to another requires changes only inside `ai-orchestrator`. No other service is affected.

### Multi-step command loop

AI models in Monstrino can request additional information mid-flow by returning a structured command rather than a final answer. The orchestrator interprets the command, calls the appropriate service, injects the result into context, and continues the scenario. The model never calls services directly.

```json
{ "action": "request_action", "command": "lookup-character", "name": "Draculaura" }
```

This keeps all side effects deterministic and in backend code.

### Validation before persistence

AI output is not trusted unconditionally. Before any enriched value reaches the catalog, `catalog-data-enricher` validates the result for structural correctness, completeness, and consistency. Records that fail validation are flagged for administrator review — they do not enter the pipeline silently.

### Operational isolation

If `ai-orchestrator` is unavailable, enrichment pauses. Ingestion, import, media processing, and API serving continue unaffected. AI is a quality multiplier, not a system dependency.

---

## Current Capabilities

| Capability | Status |
|---|---|
| Character inference from release description | Available |
| Pet inference from release description | Available |
| Series classification | Available |
| Content type and tier classification | Available |
| Image-based item detection | In progress |
| Vision-based accessory identification | Planned |
| User photo recognition (future UI feature) | Planned |

---

## Section Contents

<br/>

**[AI Strategy](/docs/ai-features/ai-strategy/)**

The full responsibility model: where AI is used, where it is explicitly excluded, controlled workflow design, source-of-truth rules, and validation policy.

**[AI Orchestrator](/docs/ai-features/ai-orchestrator/)**

Internal architecture of the `ai-orchestrator` service: scenario-based execution model, Job → Use Case → AIClient composition, prompt isolation, structured output parsing, multi-step command loop, and vision support.

**[LLM Enrichment Walkthrough](/docs/ai-features/llm-enrichment-walkthrough/)**

A step-by-step trace of a real enrichment run using the *Dawn of the Dance 3-Pack* release — from raw parsed input through multi-step AI interaction to validated structured output ready for import.
