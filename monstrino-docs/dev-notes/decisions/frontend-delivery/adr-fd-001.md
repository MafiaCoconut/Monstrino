---
id: adr-fd-001
title: "ADR-FD-001: Migrate Frontend from Vite to Next.js"
sidebar_label: "FD-001: Next.js Migration"
sidebar_position: 1
tags: [frontend, nextjs, vite, seo, ssr]
description: "Migrates the frontend from a Vite SPA to Next.js to enable server-side rendering and incremental static regeneration for SEO-critical catalog pages."
---

# ADR-FD-001 - Migrate Frontend from Vite to Next.js

| Field      | Value                                                    |
| ---------- | -------------------------------------------------------- |
| **Status** | Accepted                                                 |
| **Date**   | 2026-02-03                                               |
| **Author** | @Aleks                                          |
| **Tags**   | `#frontend` `#nextjs` `#vite` `#seo` `#ssr`             |

## Context

The initial Monstrino frontend was built with **Vite + React** as a client-side single-page application (SPA). While this worked for development, it presented a fundamental SEO problem:

- Google Search requires pre-rendered HTML to index pages correctly.
- A SPA delivers an empty shell and relies on JavaScript execution for content - this degrades or blocks indexing.
- A catalog product must be discoverable via search to provide any value.

## Options Considered

### Option 1: Keep Vite SPA + Dynamic Rendering Service

Add a headless browser rendering service (Puppeteer/Rendertron) to serve pre-rendered HTML to bots.

- **Pros:** No migration required.
- **Cons:** Complex infrastructure, brittle, slow, still not ideal for SEO, maintenance burden.

### Option 2: Static Site Generator (Gatsby, Astro)

Pre-generate all pages at build time.

- **Pros:** Fast static pages, great SEO.
- **Cons:** Rebuild required for every catalog update, not suitable for a dynamically updated catalog, poor developer experience for data-driven pages.

### Option 3: Next.js with SSR/ISR ✅

Migrate to Next.js, which supports Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) - individual pages can be statically generated and automatically revalidated as catalog data updates.

- **Pros:** Full HTML delivery for SEO, ISR means pages update without full rebuilds, strong ecosystem, App Router provides file-based routing and layouts.
- **Cons:** Migration effort, more complex than a pure SPA.

## Decision

> The Monstrino frontend migrates from Vite to **Next.js** to support SSR and ISR. This ensures SEO-ready HTML for all catalog pages while keeping the React component model familiar.

## Consequences

### Positive

- Catalog pages are fully indexable by search engines.
- ISR allows catalog data to appear in rendered pages without full rebuilds.
- Better Core Web Vitals (faster initial paint from SSR).

### Negative

- Migration effort from existing Vite codebase.
- Next.js has a more complex deployment model than a simple SPA.

## Related Decisions

- [ADR-FD-002](./adr-fd-002.md) - Frontend in a dedicated repository
