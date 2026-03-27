---
id: ai-orchestrator-architecture
title: AI Orchestrator Architecture
sidebar_label: AI Orchestrator Architecture
sidebar_position: 1
description: Architecture and responsibilities of the ai-orchestrator service in Monstrino.
---

# AI Orchestrator Architecture

:::info Engineering Working Notes
This document describes the architectural role and design rationale of the `ai-orchestrator` service.
It is written as an engineering reference, not as API documentation.
:::

---

## Purpose

The `ai-orchestrator` service is the centralized AI execution engine in the Monstrino platform.

It owns all prompt logic, model configuration, and scenario execution. No other service knows how AI is implemented. Consuming services interact with the AI pipeline exclusively through Kafka — they never call `ai-orchestrator` directly.

---

## Responsibilities

| Responsibility | Notes |
|---|---|
| Execute text and image AI scenarios | single point of model invocation |
| Manage model configuration and prompt files | all model settings live here |
| Claim pending jobs via state machine | `SELECT FOR UPDATE SKIP LOCKED` on modality tables |
| Route requests to local models | via Ollama in the homelab environment |

---

## Architecture

`ai-orchestrator` is the middle service in a three-service AI pipeline. It discovers work through the `orchestration_status` state machine — not through Kafka or a direct API:

```
catalog-data-enricher (or other service)
    → Kafka: ai.job.requested
        → ai-intake-service (validates, creates ai_job + modality row)
            → ai-orchestrator (claims pending row, runs scenario)
                → Ollama → Local Model → Response
            → ai-job-dispatcher-service (picks up completed job, publishes result)
        → Kafka: result_route_key topic
    → catalog-data-enricher (consumes result)
```

No internal service communicates with Ollama directly. All AI execution goes through `ai-orchestrator`.

---

## Centralization Rationale

> Centralizing AI execution in a single service means **model changes never affect consumers**.

This becomes important when:

- swapping or upgrading a model (e.g., moving to a larger LLM),
- adjusting inference parameters globally,
- adding request logging, rate limiting, or fallback behavior,
- moving from local to remote inference in the future.

---

## Advantages

- **Centralized model management** - configuration, versioning, and prompt templates in one place,
- **Easier upgrades and model switching** - consumers call the same API regardless of which model is behind it,
- **Consistent request format** - internal services use a stable command-based schema,
- **Isolation** - model infrastructure concerns do not leak into catalog, market, or media services.

---

## Related Documents

- [Ollama Client Design](./ollama-client-design) - how the service communicates with Ollama,
- [AI Command Execution Schema](./ai-command-schema) - structured response format used by this service,
- [AI Data Enrichment Strategy](./ai-data-enrichment) - where this service fits in the ingestion pipeline,
- [Model Selection Strategy](./model-selection) - which models are used and why.
