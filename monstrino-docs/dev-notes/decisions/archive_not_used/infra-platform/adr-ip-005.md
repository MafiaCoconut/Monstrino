---
id: adr-ip-005
title: "ADR-IP-005: Docusaurus for Engineering Documentation"
sidebar_label: "IP-005: Docusaurus Docs"
sidebar_position: 5
tags: [infra, documentation, docusaurus, docs-as-code]
---

# ADR-IP-005 — Adopt Docusaurus for Engineering Documentation

| Field     | Value                                                       |
| --------- | ----------------------------------------------------------- |
| **Status**  | Accepted                                                    |
| **Date**    | 2025-06-10                                                  |
| **Author**  | @monstrino-team                                             |
| **Tags**    | `#infra` `#documentation` `#docusaurus` `#docs-as-code`   |

## Context

As Monstrino's architecture grew in complexity, documentation needs expanded beyond simple README files:

- **Architecture decisions** require structured, searchable records (ADRs).
- **Pipeline descriptions** need diagrams, cross-references, and versioned content.
- **Onboarding guides** must be organized, navigable, and maintainable.
- **Dev notes** (reflections, trade-offs, failures) benefit from a dedicated section separate from formal docs.

Requirements for the documentation platform:

- Markdown-based (docs-as-code, version-controlled alongside source code).
- Supports multiple doc sections (formal docs, dev notes, blog).
- Mermaid diagram support for architecture visualizations.
- Search, navigation, dark mode, responsive design.
- Deployable as a static site.

## Options Considered

### Option 1: GitHub Wiki

Use the built-in GitHub wiki for documentation.

- **Pros:** Zero setup, integrated with repository.
- **Cons:** Poor navigation, no sidebar customization, no Mermaid support, separate commit history, limited formatting.

### Option 2: MkDocs (Material)

Static site generator specifically designed for project documentation.

- **Pros:** Clean design, excellent search, Python-based (matches project stack), good Mermaid plugin.
- **Cons:** Single docs section (no separate dev-notes/blog), less flexible theming, smaller plugin ecosystem.

### Option 3: Docusaurus ✅

React-based documentation framework by Meta, supporting multiple doc instances, blog, versioning, and extensive plugin ecosystem.

- **Pros:** Multiple doc instances, blog support, Mermaid integration, versioned docs, admonitions, tabs, MDX support, active community, excellent theming.
- **Cons:** Node.js/React stack (different from project's Python stack), heavier build process.

### Option 4: Notion / Confluence

SaaS documentation platform.

- **Pros:** Rich editing, collaboration features.
- **Cons:** Not version-controlled, vendor lock-in, doesn't follow docs-as-code principles, export limitations, cost at scale.

## Decision

> Architecture, dev-notes, pipeline descriptions, and internal technical documentation must be maintained as **docs-as-code in Docusaurus**, deployed as a static site.

### Documentation Structure

```
monstrino-docs/
├── docs/                    # Formal public documentation
│   ├── architecture/        # System architecture
│   ├── pipelines/           # Pipeline descriptions
│   └── principles/          # Design principles
├── dev-notes/               # Internal engineering notes
│   ├── decisions/           # ADRs (this section)
│   ├── architecture/        # Architecture deep-dives
│   ├── reflections/         # Engineering reflections
│   ├── trade-offs/          # Trade-off analysis
│   └── failures/            # Failure post-mortems
├── blog/                    # Development blog
└── docusaurus.config.ts     # Site configuration
```

### Docusaurus Features Used

| Feature               | Usage                                                  |
| --------------------- | ------------------------------------------------------ |
| **Multiple doc instances** | `docs/` (public) + `dev-notes/` (internal)        |
| **Admonitions**       | `:::info`, `:::warning`, `:::tip`, `:::danger`         |
| **Mermaid diagrams**  | Architecture flows, state machines, ER diagrams        |
| **Frontmatter**       | Tags, sidebar position, custom metadata                |
| **Generated indexes** | Category landing pages with auto-generated card lists  |
| **Dark mode**         | Default dark theme for developer comfort               |

## Consequences

### Positive

- **Scalable structure** — multiple doc sections grow independently with consistent navigation.
- **Version-controlled** — all docs live in git, reviewed via PRs, traceable history.
- **Rich formatting** — Mermaid diagrams, admonitions, tabs, and MDX enable expressive documentation.
- **Deployable** — static site can be served from the cluster or any CDN.
- **Developer-friendly** — Markdown-first workflow, no proprietary editor required.

### Negative

- **Node.js dependency** — requires Node.js/npm for building, separate from the Python stack.
- **Build time** — Docusaurus builds can be slow for large documentation sites.
- **Learning curve** — MDX and Docusaurus-specific features require some learning.

### Risks

- Documentation rot: without regular updates, docs drift from reality — incorporate doc updates into feature development workflow.
- Over-customization: resist the urge to build complex custom React components — keep docs simple and maintainable.

## Related Decisions

- [ADR-IP-001](./adr-ip-001.md) — k3s deployment (Docusaurus runs as a pod in the cluster)
- [ADR-IP-002](./adr-ip-002.md) — Cloudflared (docs site exposed through tunnel)
