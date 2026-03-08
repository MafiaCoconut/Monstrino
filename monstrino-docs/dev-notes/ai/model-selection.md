---
id: model-selection
title: Model Selection Strategy
sidebar_label: Model Selection Strategy
sidebar_position: 5
description: How models are selected and run in the Monstrino AI layer.
---

# Model Selection Strategy

:::info
This document describes the types of models used in the Monstrino AI layer and the rationale for running them locally.
:::

---

## Requirements

The Monstrino AI layer must support three distinct capability areas:

| Capability | Use Case |
|---|---|
| **Text analysis** | processing titles, descriptions, and free-form fields from catalog sources |
| **Structured extraction** | extracting named entities, series, character names, and metadata from unstructured text |
| **Image understanding** | analyzing product images for content, classification, or duplicate detection |

---

## Model Types

### Text Models

Used for textual enrichment and extraction tasks.

- instruction-tuned LLMs that follow structured prompts,
- models capable of returning JSON-formatted responses reliably,
- sized to fit within homelab hardware constraints.

### Vision Models

Used for image-related tasks.

- multimodal models capable of analyzing image content alongside text context,
- used for image-assisted entity recognition or content verification.

---

## Local Execution

All models are executed locally using **Ollama** in the homelab environment.

:::tip Why Local?

| Reason | Notes |
|---|---|
| **Privacy** | catalog and enrichment data never leaves the homelab |
| **Cost control** | no per-token API charges regardless of enrichment volume |
| **Full infrastructure ownership** | no external provider dependency for core operations |
| **Reproducibility** | model versions are pinned and controlled locally |

:::

---

## Tradeoffs

:::warning
Local execution has real constraints to keep in mind:

- **Hardware ceiling** — available model sizes are limited by local GPU/CPU memory,
- **No auto-scaling** — inference throughput is fixed by the homelab setup,
- **Manual upgrades** — model updates require deliberate action, not automatic rollouts.

These are acceptable given the current project stage and data volumes.
:::

---

## Model Configuration Ownership

Model names, versions, and inference options are configured within the `ai-orchestrator` service.

> Consuming services never specify which model to use. They call `ai-orchestrator` with a task, and the orchestrator selects the appropriate model internally.

This means model upgrades or replacements require changes in one place only.

---

## Related Documents

- [AI Orchestrator Architecture](./ai-orchestrator-architecture) — the service responsible for model routing,
- [Ollama Client Design](./ollama-client-design) — how models are invoked at the HTTP level.
