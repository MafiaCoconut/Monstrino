---
id: kubernetes-namespace-structure
title: Kubernetes Namespace Structure
sidebar_label: Kubernetes Namespace Structure
sidebar_position: 3
description: How Kubernetes namespaces are used to isolate environments and workloads in the Monstrino cluster.
---

# Kubernetes Namespace Structure

:::info
This document describes how namespaces are used within the Monstrino Kubernetes cluster to isolate environments and manage workloads.
:::

---

## Purpose

Namespaces are used to **isolate environments and workloads** inside the Kubernetes cluster.

They provide a logical grouping that prevents resources from one environment from interfering with another.

---

## Current Structure

The namespace layout mirrors the environment strategy:

| Namespace | Maps to Environment |
|---|---|
| `local` | local development |
| `test` | integration testing and staging |
| `production` | live platform |

:::note
All services belonging to the same environment are deployed into the same namespace.
:::

---

## Benefits

| Benefit | Notes |
|---|---|
| **Logical separation** | resources in one namespace are invisible to others by default |
| **Easier resource management** | quotas, limits, and policies can be applied per namespace |
| **Environment isolation** | a broken deployment in `test` cannot affect `production` |
| **Access control** | RBAC policies can be scoped per namespace |

---

## Resource Naming

Within a namespace, services are addressable by short name:

```
<service-name>
```

Across namespaces, the full DNS path is required:

```
<service-name>.<namespace>.svc.cluster.local
```

---

## Related Documents

- [Kubernetes Cluster Architecture](./kubernetes-cluster-architecture) - the cluster this namespace structure belongs to,
- [Environment Strategy](./environment-strategy) - how environments are defined and what each provides.
