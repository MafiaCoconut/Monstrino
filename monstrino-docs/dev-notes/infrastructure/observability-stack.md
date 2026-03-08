---
id: observability-stack
title: Observability Stack
sidebar_label: Observability Stack
sidebar_position: 6
description: How the Monstrino platform is monitored and how failures become visible.
---

# Observability Stack

:::info
This document describes the monitoring and observability tooling used to keep the Monstrino platform inspectable in production.
:::

---

## Purpose

> Observability ensures that ingestion pipelines and APIs remain reliable, and failures become detectable before they cause data loss or user-visible problems.

---

## Monitoring Stack

The platform uses the standard Prometheus + Grafana monitoring stack.

| Component | Role |
|---|---|
| **Prometheus** | scrapes and stores time-series metrics from services |
| **Grafana** | visualizes metrics, provides dashboards and alerting |

---

## Key Metrics

The following metrics are considered most important for Monstrino workloads:

| Metric | Why It Matters |
|---|---|
| **Service latency** | detects degraded API or pipeline performance |
| **Error rates** | surfaces failures in processing stages or external calls |
| **Resource usage** | CPU and memory pressure on collector and processor services |
| **Pipeline job counts** | tracks pending, processing, and failed job volumes |
| **Source fetch success rate** | detects when external sources start failing |

---

## Pipeline Observability

Ingestion pipelines are particularly important to monitor because failures are often silent — a job may be stuck in `processing` or accumulating in `retry_pending` without immediately affecting the user-facing API.

:::tip
Every pipeline should expose enough structured logging to answer:

- what entered the pipeline,
- what stage it reached,
- what failed,
- what was retried,
- how long processing took.

See [Pipelines Overview — Observability](../pipelines/pipelines-overview#observability) for details.
:::

---

## Logging

Structured logging is expected from all services.

Each log entry for pipeline operations should include:

- `pipeline_name`
- `job_id`
- `source_name`
- `external_id`
- `processing_stage`
- `retry_count`
- `correlation_id` where applicable

---

## Related Documents

- [Kubernetes Cluster Architecture](./kubernetes-cluster-architecture) — the infrastructure being observed,
- [Pipeline Patterns and Conventions](../pipelines/pipeline-patterns) — logging conventions for pipeline operations.
