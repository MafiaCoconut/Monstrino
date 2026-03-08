---
id: intro
title: Dev Notes
sidebar_label: Dev Notes
sidebar_position: 0
---

:::info Engineering Context
This section documents **engineering reasoning and system reality** for the Monstrino project.  
It is written to explain **how decisions are made, where boundaries exist, and what the system actually guarantees**.
:::

---

## What This Is

This is an **engineering decision log and system reality reference**.

It exists to answer questions such as:

- Why is the system structured this way?
- Where are the boundaries between services and packages?
- What guarantees can other parts of the system rely on?
- Which trade-offs were consciously accepted?
- Where does the system intentionally *not* try to be perfect?

The documents here focus on **reasoning, constraints, and consequences**.

---

## What This Is Not

This section is intentionally **not**:

- product documentation,
- API reference material,
- setup or deployment instructions,
- a progress diary,
- a tutorial or learning journal.

Those concerns are handled elsewhere or inside individual services.

---

## How This Section Is Organized

The documentation is split by **intent**, not by code structure.

### Architecture Decision Records (ADR)
Records of **explicit architectural decisions**.

They explain:
- what options were considered,
- which option was chosen,
- what consequences were accepted.

ADR answer the question:  
**“Why was this decision made?”**

---

## Design Principles Reflected Here

Across all documents, the following principles apply:

- explicit boundaries over implicit coupling,
- debuggability over hidden automation,
- conservative evolution over premature optimization,
- clarity of responsibility over convenience.

These notes reflect how the system behaves **today**, not how it was imagined initially.

---

## Living Documentation

This section evolves together with the system.

- New ADRs are added when meaningful decisions are made.
- Service and package documents are updated when real behavior changes.
- Deprecated decisions are kept for historical context.

Nothing here is considered final.

---

:::note Where to Start
If you are new to this section, start with the **ADR** entries.  
They provide the fastest overview of the system’s foundations.
:::