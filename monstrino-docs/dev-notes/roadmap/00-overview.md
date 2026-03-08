---
title: Roadmap
sidebar_position: 0
description: Near-term architectural focus and long-horizon intentions for the Monstrino platform.
---

# Roadmap

This section captures architectural direction, not delivery commitments.

The distinction matters: architectural roadmap describes where the system is expected to evolve and what constraints that evolution must respect, independent of specific delivery schedules.

---

## Purpose of This Section

The roadmap exists to make architectural intent **visible and stable** across time.

Without an explicit roadmap:
- Short-term decisions optimize locally and create future technical debt.
- Long-term goals remain vague and don't generate useful architectural pressure.
- Trade-offs are made without reference to a bigger picture.

Writing roadmap decisions down creates a shared frame for evaluating what to build next and why.

---

## Current Architectural State

The platform has reached a stable foundation across its core functions:

| Area | Status |
|---|---|
| Catalog ingestion pipeline | Stable and operational |
| Canonical domain model | Stable — entities, invariants, ownership rules in place |
| Media ingestion and rehosting | Operational |
| LLM-based enrichment (text) | Available — characters, series, content type, tier |
| Catalog API | Stable, production-ready |
| Internal package layer | Stable — 7 packages covering all architectural layers |

---

## Section Contents

- [Short-Term Roadmap](/dev-notes/roadmap/short-term/) — near-term architectural focus areas and active decision pressures
- [Long-Term Roadmap](/dev-notes/roadmap/long-term/) — long-horizon intentions, strategic direction, and open architectural risks
