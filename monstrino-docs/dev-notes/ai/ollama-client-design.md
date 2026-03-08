---
id: ollama-client-design
title: Ollama Client Design
sidebar_label: Ollama Client Design
sidebar_position: 2
description: Design notes for the OllamaClient abstraction used by the ai-orchestrator service.
---

# Ollama Client Design

:::info
This document describes the internal `OllamaClient` component that encapsulates communication with the local Ollama HTTP API.
:::

---

## Overview

Monstrino communicates with local models using the **Ollama HTTP API**.

A dedicated `OllamaClient` abstraction encapsulates communication details and exposes a clean interface to the rest of `ai-orchestrator`, without leaking HTTP concerns into higher-level orchestration logic.

---

## Covered Endpoints

| Endpoint | Purpose |
|---|---|
| `POST /api/generate` | single-turn text generation (completion style) |
| `POST /api/chat` | multi-turn conversation with message history |
| `GET /api/tags` | list available local models |

---

## Design Goals

- **Reusable client component** — all Ollama communication is in one place,
- **Configurable generation options** — inference parameters are injected, not hardcoded,
- **Isolation from infrastructure details** — callers do not construct HTTP requests directly.

---

## Inference Options

The client exposes configurable options that control model inference behavior.

| Option | Description |
|---|---|
| `context_window` (num_ctx) | number of tokens the model considers as context |
| `temperature` | controls randomness — lower is more deterministic |
| `batch_size` (num_batch) | tokens processed per batch during generation |
| `thread_count` (num_thread) | CPU threads allocated to inference |

:::note
These parameters are configured centrally in the client implementation.
Consumers of `OllamaClient` should not set raw inference options directly — they should use higher-level generation request objects.
:::

---

## Responsibility Boundary

`OllamaClient` is responsible for:

- constructing and sending HTTP requests to Ollama,
- deserializing response payloads,
- surface-level error handling (transport errors, non-2xx responses),
- listing available models for health checks.

`OllamaClient` is **not** responsible for:

- prompt construction,
- response parsing or command extraction,
- retry logic or rate limiting,
- model selection decisions.

Those concerns belong to higher layers within `ai-orchestrator`.

---

## Related Documents

- [AI Orchestrator Architecture](./ai-orchestrator-architecture) — where this client fits in the service,
- [Model Selection Strategy](./model-selection) — which models are configured for use.
