---
id: architecture-decisions
title: Architecture Decisions Index
sidebar_label: Decisions
---

:::info
This document acts as a **navigation and context map** for all Architecture Decision Records (ADR)
in the Monstrino project.

It does not restate decisions.
It explains **how individual decisions relate to each other** and where to find details.
:::

---

## How to Use This Document

- Start here to understand the **decision landscape** of the system.
- Follow links to individual ADRs for detailed reasoning.
- Use this index to see **why the architecture looks the way it does today**.

---

## Decision Areas Overview

Monstrino’s architecture decisions are grouped into the following areas:

1. Data ingestion and external boundaries  
2. Persistence and transaction management  
3. Application boundaries and orchestration  
4. Platform and infrastructure choices  
5. Product and evolution strategy  

Each area links to one or more ADRs.

---

## 1. Data Ingestion & External Data Handling

These decisions define how external, untrusted data enters the system.

- **ADR-002 — DB Processing State vs Kafka Pipeline**  
  Rationale for choosing inspectable batch processing over streaming ingestion.

- **ADR-003 — Parsed Tables as Ingestion Boundary**  
  Separation between external data and canonical domain models.

- **ADR-007 — Contracts → Commands → Dispatcher Boundary**  
  How external requests are mapped into application logic without leaking transport concerns.

---

## 2. Persistence & Transaction Management

These decisions define how data is stored, accessed, and kept consistent.

- **ADR-004 — Unit of Work for Transaction Boundaries**  
  Explicit transaction scope and rollback behavior.

- **ADR-005 — Generic BaseRepo and CrudRepo Abstractions**  
  Shared persistence logic instead of per-entity repositories.

- **ADR-006 — Sandbox Service for Repository Testing**  
  Independent validation of repository behavior.

---

## 3. Application Boundaries & Internal Architecture

These decisions define internal layering and responsibility separation.

- **ADR-001 — Shared Domain Packages as Single Source of Truth**  
  Centralization of models, repositories, and core abstractions.

- **ADR-007 — Contracts → Commands → Dispatcher Boundary**  
  Clear separation between transport, application, and domain logic.

---

## 4. Platform & Infrastructure Choices

These decisions define how the system is deployed and operated.

- **ADR-010 — k3s with Namespace-Based Environment Separation**  
  Lightweight infrastructure aligned with homelab constraints.

---

## 5. Product Strategy & Controlled Scope

These decisions define *what the system intentionally does not do yet*.

- **ADR-008 — Deferring Authentication Until Domain Stability**  
  Domain correctness prioritized over early user features.

- **ADR-009 — LLM as Assistive, Non-Core Component**  
  AI used for enrichment without becoming a hard dependency.

---

## Reading Order Recommendation

For a first-time reader:

1. ADR-002  
2. ADR-003  
3. ADR-004  
4. ADR-007  
5. ADR-001  

This sequence explains the system from external boundaries inward.

---

:::note
Each ADR is a standalone document and represents a decision at a specific point in time.
Outdated decisions are preserved intentionally for historical context.
:::
