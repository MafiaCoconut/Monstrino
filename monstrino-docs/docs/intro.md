---
title: Introduction
sidebar_position: 1
description: Overview of the Monstrino platform — architecture, AI features, custom packages, patterns, pipelines, and principles.
---

import DocCard from '@site/src/components/DocCard/DocCard';

# Monstrino Documentation

Monstrino is a data platform for Monster High collectors. It aggregates release, character, pet, media, and pricing information from multiple external sources, normalizes that data into a structured domain model, and exposes it through a single public API.

The system is built as a service-oriented architecture with explicit responsibility boundaries, designed for long-term maintainability and incremental evolution on self-hosted infrastructure.

---

## Platform Scope

| Domain | Responsibility |
|---|---|
| **Catalog** | Structured releases, characters, pets, series, and their relationships |
| **Acquisition** | Automated data collection from official retailers and community sources |
| **AI Enrichment** | LLM-assisted attribute inference via the `ai-orchestrator` service |
| **Media** | Image rehosting, storage, normalization, and variant generation |
| **Market** | MSRP tracking and pricing observations over time |
| **APIs** | Internal domain APIs aggregated behind a single public entry point |

---

## Start Here

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>

<DocCard title="Architecture Overview" href="/docs/architecture/architecture-overview/">
  System purpose, design priorities, high-level data flow, and service map.
</DocCard>

<DocCard title="AI Features" href="/docs/ai-features/ai-strategy/">
  How Monstrino uses LLMs for catalog enrichment — strategy, orchestration, and a real walkthrough.
</DocCard>

<DocCard title="Custom Packages" href="/docs/architecture/custom-packages/overview/">
  The 7 internal Python packages — architectural layers, responsibilities, and dependency rules.
</DocCard>

<DocCard title="Architecture Patterns" href="/docs/architecture/patterns/overview/">
  Clean Architecture, Unit of Work, dependency inversion, service and repository structure.
</DocCard>

<DocCard title="Catalog Ingestion Pipeline" href="/docs/pipelines/data-ingestion/catalog-ingestion-pipeline/">
  Staged pipeline: collection → parsing → enrichment → import.
</DocCard>

<DocCard title="Design Principles" href="/docs/principles/design-principles/">
  Core engineering principles that guide service design and platform evolution.
</DocCard>

</div>

---

## Documentation Sections

### Architecture

C4-style system documentation covering system context, container architecture, storage design, service communication, security boundaries, scalability strategy, deployment model, and observability.

Two embedded subsections:

- **Custom Packages** — the 7 internal Python packages (`monstrino-core` through `monstrino-testing`) with full dependency graph, structure, and responsibility breakdown
- **Architecture Patterns** — Clean Architecture, Unit of Work, dependency rules, service and repository structure with real code examples

### AI Features

How Monstrino integrates LLMs without losing operational control:

- AI strategy and where AI is and is not used
- `ai-orchestrator` service — scenario-based execution, multi-step command loop, model abstraction
- Step-by-step enrichment walkthrough using a real release payload with full JSON examples

### Pipelines

End-to-end ingestion architecture, catalog ingestion stages (collection → parsing → enrichment → import), and the media ingestion and normalization flow.

### Principles

Design principles, service boundary rules, data ownership model, and API design conventions applied consistently across the platform.
