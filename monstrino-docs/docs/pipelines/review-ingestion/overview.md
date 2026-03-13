---
title: Review Ingestion Pipeline
sidebar_position: 1
description: Overview of the Monstrino review ingestion pipeline — a scheduler-driven pipeline that discovers and collects user and editorial reviews for known releases from external sources.
---

# Review Ingestion Pipeline

The review ingestion pipeline is responsible for collecting review data for known releases from external sources such as retail sites, fan communities, and editorial platforms.

Its architecture follows the same structural pattern as the market ingestion pipeline: a two sub-pipeline approach of **discovery** followed by **collection**, both scheduler-driven and adapter-based.

The internal data model (tables, schemas, domain records) is still being defined. This document describes the pipeline at the architectural and flow level only.

---

## Pipeline Scope

The review ingestion area is implemented as two dedicated sub-pipelines:

| Sub-pipeline | Responsibility |
|---|---|
| **Review Source Discovery** | scan sources for review entries related to known releases; create persistent review source link records |
| **Review Collector** | revisit known source links on a schedule; fetch current review data and store observations |

These sub-pipelines are intentionally separated so that discovery (which is relatively infrequent) and collection (which runs on a recurring schedule) can evolve and scale independently.

---

## Architecture Overview

The review ingestion pipeline shares the same architectural patterns as market ingestion:

| Aspect | Design |
|---|---|
| Triggering | scheduler-driven |
| Source isolation | each source runs in its own Kubernetes pod |
| Country support | a single pod may handle multiple country or locale contexts for the same source |
| Parser resolution | registry-based — `PortsRegistry` maps source name + port type → adapter implementation |

The integration layer uses a centralized `PortsRegistry`. Orchestration code selects the correct adapter per source context at runtime. Source-specific parsing logic is fully isolated inside adapters, meaning new sources can be added without modifying orchestration.

---

## Sub-Pipeline 1: Review Source Discovery

**Goal:** identify which external sources contain review data for Monstrino releases, and create durable source link records for each discovered entry.

High-level flow:

```
Scheduler Trigger
  → Select Source / Source Country Context
  → Resolve Parser via Registry
  → Collect review entry references from source
  → Check existing source link records
  → Already Known?
      Yes → Skip
      No  → Create new source link record
```

Discovery is not expected to run as frequently as collection. Its output — a set of persistent source link records — becomes the input inventory for the review collector.

---

## Sub-Pipeline 2: Review Collector

**Goal:** revisit all known source links and fetch current review state, storing each observation as a new record.

High-level flow:

```
Scheduler Trigger
  → Load Known source link records
  → Start ProcessJob
  → Resolve Parser via Registry
  → Fetch review data from source
  → Resolve canonical release_id via catalog-api-service
  → Store review observation record
```

Collection is append-only by design: each scheduled run produces new observation records. This preserves full historical state and allows the system to reconstruct how review scores or sentiments changed over time.

---

## Source Context Model

Like market ingestion, review ingestion operates at the `source_country` level rather than only at the logical `source` level. The same review platform may expose different content across country or locale contexts. Discovery and collection both account for this.

---

## Triggering Model

| Property | Value |
|---|---|
| Trigger type | scheduler |
| Source isolation | different sources run independently |
| Pod deployment | one source per Kubernetes pod |
| Country / locale support | a single service may define multiple scheduler triggers for different contexts |

---

## Design Notes

- Internal table names, schema definitions, and domain model records are **not yet finalized**. This document intentionally omits those details until the data layer is designed.
- The pipeline is expected to share infrastructure patterns (scheduler, `PortsRegistry`, adapter resolution) with market ingestion — no new architectural primitives are required.
- The relationship between review observations and canonical releases will be resolved the same way as in market ingestion: via MPN or equivalent identifier sent to `catalog-api-service`.

---

## Future Considerations

- Support for multiple review types: user ratings, editorial scores, community sentiment
- Aggregated review signals exposed through platform APIs
- Source trust and confidence model for review data (similar to MSRP trust in market ingestion)
- Locale-aware review normalization
