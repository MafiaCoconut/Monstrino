---
id: adr-ls-001
title: "ADR-LS-001: Isolate LLM Processing Behind llm-gateway"
sidebar_label: "LS-001: llm-gateway Service"
sidebar_position: 1
tags: [llm, gateway, ollama, normalization, isolation]
description: "Isolates all LLM processing behind a dedicated llm-gateway service to centralize model configuration and prevent LLM dependencies from spreading across services."
---

# ADR-LS-001 — Isolate AI Processing Behind `llm-gateway`

| Field      | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| **Status** | Accepted                                                     |
| **Date**   | 2025-11-25                                                   |
| **Author** | @Aleks                                              |
| **Tags**   | `#llm` `#gateway` `#ollama` `#normalization` `#isolation`   |

## Context

Some data normalization tasks (e.g., extracting structured release info from free-form product names) are too complex for rule-based parsers but well-suited to LLMs. However, introducing LLM dependencies directly into collector or importer services would:

- Couple multiple services to a specific LLM provider.
- Spread Ollama/LLM configuration across services.
- Make LLM swapping or upgrades expensive.

## Options Considered

### Option 1: LLM Calls Inline in Collector/Importer

Each service that needs LLM processing calls the model directly.

- **Pros:** No extra service hop.
- **Cons:** LLM provider coupled to every consuming service, duplicated configuration, hard to update or swap models.

### Option 2: Dedicated `llm-gateway` Service ✅

A single gateway service exposes a simple internal API for LLM-powered operations. All other services call the gateway rather than the LLM directly.

- **Pros:** Single point of LLM provider configuration, swap models in one place, independent scaling, centralized prompt management.
- **Cons:** Additional internal service to deploy.

## Decision

> A **`llm-gateway`** service is introduced as the only component that communicates with Ollama (or any LLM backend). Other services call `llm-gateway` via its internal API for LLM-powered processing tasks.

## Consequences

### Positive

- LLM provider, model, and configuration changes require updates in one service only.
- Prompts and model behavior are centrally managed.
- Consuming services are LLM-agnostic.

### Negative

- Additional network hop for LLM-powered operations.
- `llm-gateway` becomes a dependency for services requiring normalization.

## Related Decisions

- [ADR-LS-002](./adr-ls-002.md) — LLM-assisted normalization for release data
