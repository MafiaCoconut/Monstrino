---
id: package-monstrino-contracts
title: Package — monstrino-contracts
sidebar_label: monstrino-contracts
---

> **Type:** Shared contracts package  
> **Audience:** Engineering / Architecture review

---

## Purpose

The **monstrino-contracts** package defines versioned request and response schemas used for
service-to-service communication and external API boundaries.

---

## What This Package Contains

- Versioned request and response schemas
- Public data structures for service communication
- Command and event models (where applicable)

---

## Boundaries

- Contracts are **DTO-only** and must not embed business logic
- Contracts should remain stable and evolve via versioning
- Application logic should not depend on HTTP-specific details; use mappers and commands

---

## Notes

:::note
This package is a compatibility surface. Changes should be additive when possible and
coordinated via versioning and ADRs when breaking changes are unavoidable.
:::
