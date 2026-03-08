---
id: ingress-and-networking
title: Ingress and Networking
sidebar_label: Ingress and Networking
sidebar_position: 5
description: How external traffic is routed into the Monstrino cluster and how services communicate internally.
---

# Ingress and Networking

:::info
This document describes how external HTTP traffic reaches the cluster and how services communicate internally within Kubernetes.
:::

---

## External Access — Ingress

External access to services is handled through an **Ingress controller**.

The Ingress layer is responsible for:

| Responsibility | Notes |
|---|---|
| **Routing** | maps hostnames and paths to backend services |
| **TLS termination** | handles HTTPS, terminates SSL before traffic reaches services |
| **Domain management** | binds external domain names to internal services |

### Request Flow

```
Client (browser / API consumer)
    → Ingress Controller
        → Kubernetes Service
            → Pod
```

---

## Internal Networking

Services communicate internally using **Kubernetes service discovery** — no external URLs or hardcoded IPs.

Service DNS pattern:

```
<service-name>.<namespace>.svc.cluster.local
```

For services within the same namespace, the short name is sufficient:

```
<service-name>
```

:::tip
Internal services should **never use external URLs** to reach other cluster services. Always use cluster DNS to keep traffic internal and avoid unnecessary egress.
:::

---

## Cloudflare Tunnel

External traffic is routed into the homelab cluster via **Cloudflare Tunnel** (`cloudflared`), which avoids exposing the homelab IP address directly to the internet.

See the Kubernetes manifests in `monstrino-configurations/kubernetes/cloudflared` for the tunnel deployment.

---

## Related Documents

- [Kubernetes Cluster Architecture](./kubernetes-cluster-architecture) — the cluster this networking belongs to,
- [Kubernetes Namespace Structure](./kubernetes-namespace-structure) — how namespaces affect DNS resolution.
