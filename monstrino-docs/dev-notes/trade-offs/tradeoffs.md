---
id: tradeoffs
title: Trade-offs & Intentional Constraints
sidebar_label: Trade-offs
---

:::info
This document summarizes **conscious engineering trade-offs** made during the development of Monstrino.
It complements ADRs by presenting decisions **as a system-wide mindset**, not as isolated events.
:::

---

## Why This Document Exists

Every non-trivial system is shaped as much by **what it refuses to do**
as by what it implements.

This document captures:
- simplifications chosen deliberately,
- complexity accepted intentionally,
- features postponed or rejected on purpose.

The goal is to make engineering judgment explicit.

---

## Data Integrity Over Throughput

### Decision
Favor **observable, inspectable batch processing** over streaming pipelines.

### What Was Rejected
- Kafka-based streaming ingestion
- implicit offset management
- opaque retry behavior

### Why
- External data is noisy and inconsistent.
- Manual inspection and correction are part of the workflow.
- Throughput is not the primary bottleneck.

### Accepted Cost
- Slower ingestion compared to streaming
- Higher latency between source updates and availability

---

## Domain Stability Over Early User Features

### Decision
Postpone authentication, user profiles, and social features.

### What Was Rejected
- Early JWT-based user system
- User collections without stable catalog data

### Why
- User features depend on a trustworthy release archive.
- Reworking auth later is cheaper than fixing corrupted domain data.

### Accepted Cost
- No early user-facing engagement
- Delayed feedback from end users

---

## Explicit Boundaries Over Convenience

### Decision
Introduce strict boundaries between parsing, importing, and domain logic.

### What Was Rejected
- Parsers writing directly into canonical tables
- Shared mutable models across layers

### Why
- External data must not bypass domain validation.
- Clear boundaries reduce blast radius of schema changes.

### Accepted Cost
- More tables and indirection
- Additional transformation layers

---

## Shared Packages Over Local Duplication

### Decision
Extract shared models, repositories, and infrastructure into versioned packages.

### What Was Rejected
- Per-service copies of ORM models and repositories
- Ad-hoc duplication of base logic

### Why
- Duplication scales poorly with number of services.
- Versioned packages provide controlled evolution.

### Accepted Cost
- Dependency management overhead
- Need for stricter version discipline

---

## Generalized Repositories Over Custom Per-Entity Logic

### Decision
Use generic BaseRepo and CrudRepo abstractions.

### What Was Rejected
- Hand-written repositories per entity
- Entity-specific persistence patterns

### Why
- CRUD behavior is largely uniform.
- Generic abstractions reduce maintenance burden.

### Accepted Cost
- Additional abstraction layers
- Risk of overly generic APIs if misused

---

## Batch Asynchrony Over Real-Time Guarantees

### Decision
Process parsed records asynchronously in bounded batches.

### What Was Rejected
- Fully synchronous processing
- Real-time guarantees across domains

### Why
- External sources are unreliable.
- Isolation between records matters more than ordering.

### Accepted Cost
- Eventual consistency
- Non-deterministic completion time per record

---

## Assistive AI Over AI-Centric Architecture

### Decision
Use LLMs as **assistive enrichment**, not as core decision-makers.

### What Was Rejected
- LLM-driven core domain logic
- Hard dependency on AI availability

### Why
- Determinism and reproducibility are critical.
- AI output must be optional and inspectable.

### Accepted Cost
- Limited automation compared to full AI pipelines
- Manual review remains necessary

---

## Operational Simplicity Over Infrastructure Maximalism

### Decision
Use k3s with namespace separation instead of multi-cluster setups.

### What Was Rejected
- Full Kubernetes clusters per environment
- Complex CI-driven infra orchestration

### Why
- Single-node homelab constraints
- Operational clarity over theoretical scalability

### Accepted Cost
- Reduced fault isolation
- Shared-node risks

---

## Closing Note

:::note
These trade-offs are not permanent truths.
They reflect **current constraints, priorities, and stage of the project**.

As Monstrino evolves, some of these decisions may be revisited,
but the reasoning behind them remains valuable.
:::