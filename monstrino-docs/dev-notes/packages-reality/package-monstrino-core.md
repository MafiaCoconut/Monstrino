---
id: package-monstrino-core
title: Package — monstrino-core
sidebar_label: monstrino-core
---

> **Type:** Shared domain package  
> **Audience:** Engineering / Architecture review

---

## Responsibility

The **monstrino-core** package provides domain-level building blocks shared across services.
It exists to keep domain rules and primitives consistent across the system and to prevent
re-implementing foundational concepts in each service.

---

## What This Package Owns

- Domain dataclasses and value objects
- Enums and constants used across services
- Domain exceptions
- Abstract interfaces (ports) used by application layers

---

## Guarantees

- Domain primitives are stable and reusable across services
- Value objects encode domain constraints close to the data
- Exceptions provide consistent failure semantics across services
- Interfaces define clear boundaries between application logic and infrastructure

---

## Non-Guarantees

- No persistence models (ORM) and no database coupling
- No network clients, adapters, or deployment concerns
- No service-specific configuration logic

---

## Usage Constraints

- Treat this package as the **lowest-level dependency** for Monstrino services
- Do not import service-specific modules into this package
- Keep interfaces small and focused; denote intent, not implementation details
- Prefer additions that are domain-wide; avoid leaking local service needs into core

---

## Failure Modes (Logical)

- Overgrowth risk: core becomes a dumping ground for random utilities
- Coupling risk: service-specific decisions creep into shared primitives
- Stability risk: frequent breaking changes ripple through all services

---

## Evolution Notes

:::note
Changes in this package should be conservative and versioned carefully.
Prefer additive changes over breaking changes whenever possible.
:::
