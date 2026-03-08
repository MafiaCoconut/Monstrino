---
id: adr-ip-002
title: "ADR-IP-002: Publish Services Through Cloudflared"
sidebar_label: "IP-002: Cloudflare Tunnel"
sidebar_position: 2
tags: [infra, cloudflare, tunnel, networking, homelab]
---

# ADR-IP-002 — Publish Homelab Services Through Cloudflared

| Field      | Value                                                          |
| ---------- | -------------------------------------------------------------- |
| **Status** | Accepted                                                       |
| **Date**   | 2025-06-10                                                     |
| **Author** | @monstrino-team                                                |
| **Tags**   | `#infra` `#cloudflare` `#tunnel` `#networking` `#homelab`     |

## Context

Monstrino runs on a homelab server that does not have a publicly routable IP address (ISP-level CGNAT or dynamic IP). This makes it impossible to expose services to the internet by simply opening firewall ports.

The catalog needs to be publicly accessible (for users and search engine crawlers) without purchasing a static IP or VPS.

## Options Considered

### Option 1: VPS as Reverse Proxy

Rent a cheap VPS and forward traffic from it to the homelab via a VPN tunnel.

- **Pros:** Full control over the proxy.
- **Cons:** Additional monthly cost, more infrastructure to manage.

### Option 2: Dynamic DNS + Port Forwarding

Use a DDNS service and open ports on the router.

- **Pros:** Free or cheap.
- **Cons:** Requires ISP cooperation (no CGNAT), dynamic IP changes, exposes the home network directly.

### Option 3: Cloudflare Tunnel (Cloudflared) ✅

Run the `cloudflared` daemon in the cluster, which establishes an encrypted outbound tunnel to Cloudflare's network. Traffic flows through Cloudflare → tunnel → homelab service without any inbound ports.

- **Pros:** No open ports, no static IP required, free tier available, fast CDN in front of the service as a bonus, DDoS protection.
- **Cons:** Dependency on Cloudflare as an intermediary, limited to HTTP/HTTPS traffic.

## Decision

> All publicly accessible Monstrino services are published via **Cloudflare Tunnel** (`cloudflared`). The daemon runs as a deployment in the k3s cluster and handles routing from public hostnames to internal cluster services.

## Consequences

### Positive

- No inbound firewall rules or open ports on the home network.
- Works behind CGNAT and dynamic IPs.
- Cloudflare CDN and DDoS protection included.

### Negative

- All external traffic passes through Cloudflare — trust dependency.
- Not suitable for non-HTTP services (e.g., raw TCP databases).

## Related Decisions

- [ADR-IP-001](./adr-ip-001.md) — k3s homelab deployment
