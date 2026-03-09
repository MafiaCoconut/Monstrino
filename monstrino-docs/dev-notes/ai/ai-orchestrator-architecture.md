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

The `ai-orchestrator` service provides a **centralized interface for all AI operations** in the Monstrino platform.

Instead of allowing multiple services to communicate directly with local models, the orchestrator acts as a unified abstraction layer that shields the rest of the platform from model infrastructure details.

---

## Responsibilities

| Responsibility | Notes |
|---|---|
| Execute text and multimodal prompts | single point of model invocation |
| Manage model configuration | all model settings live here |
| Provide a stable API for internal services | consumers are model-agnostic |
| Route requests to local models | via Ollama in the homelab environment |

---

## Architecture

The typical request flow:

```
Internal Service
    → ai-orchestrator
        → Ollama
            → Local Model
                → Response
```

No internal service should communicate with Ollama directly. All AI-related calls go through `ai-orchestrator`.

---

## Gateway Pattern Rationale

> Centralizing AI access in a single service means **model changes never affect consumers**.

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
