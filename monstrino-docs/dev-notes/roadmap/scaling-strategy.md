---
id: scaling-strategy
title: Scaling Strategy
sidebar_label: Scaling Strategy
sidebar_position: 4
description: How the Monstrino infrastructure is expected to grow as workload and traffic increase.
---

# Scaling Strategy

:::info
This document describes the current infrastructure constraints and the intended path for scaling the platform as workloads and data volumes grow.
:::

---

## Current Infrastructure

The system currently runs on a **single Kubernetes cluster hosted on one physical server** in a homelab environment.

Environment separation is achieved through namespaces:

| Namespace | Purpose |
|---|---|
| `local` | local development |
| `test` | integration testing and staging |
| `production` | live platform |

This setup is sufficient for the current stage but has a clear ceiling.

:::note
Running all environments on one physical server means that a hardware failure affects local, test, and production simultaneously. This is an accepted risk at the current project scale.
:::

---

## Scaling Plan

When traffic or workloads increase, the platform will evolve in the following direction:

| Step | Description |
|---|---|
| **Dedicated production server** | production cluster moves to its own physical host, isolated from dev/test |
| **Additional nodes** | production cluster grows to multi-node for redundancy and capacity |
| **Data replication** | storage and database replication to avoid single points of failure |

---

## Reliability Improvements

Beyond raw capacity, the following reliability improvements are on the long-term roadmap:

| Improvement | Notes |
|---|---|
| **Redundant storage** | media and database data replicated across nodes or locations |
| **Backup clusters** | a passive cluster ready to assume traffic on primary failure |
| **Automated failover** | workloads recovered automatically without manual intervention |

:::warning
These improvements require careful planning before implementation. Moving too fast toward distributed infrastructure adds operational complexity that may not be justified until the platform has validated demand and stable workloads.
:::

---

## Ingestion Pipeline Scaling

Beyond infrastructure-level scaling, pipeline throughput can be improved independently:

| Approach | Description |
|---|---|
| **Horizontal processor scaling** | run more processor replicas for parallel job execution |
| **Partition-based work distribution** | split job queues by source or entity type across processors |
| **Scheduler frequency tuning** | adjust polling intervals per source based on actual volume |

These approaches are lower-risk than infrastructure changes and should be explored first when ingestion becomes a bottleneck.

---

## Related Documents

- [Platform Architecture Evolution](./platform-evolution) — broader architectural direction,
- [Kubernetes Cluster Architecture](../infrastructure/kubernetes-cluster-architecture) — current cluster setup,
- [Environment Strategy](../infrastructure/environment-strategy) — how environments are currently separated.
