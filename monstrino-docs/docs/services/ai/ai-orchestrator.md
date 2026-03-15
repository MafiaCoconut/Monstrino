---
title: AI Orchestrator
sidebar_position: 2
description: >
  AI-domain execution service that claims pending modality jobs, runs
  scenario-based reasoning loops, performs allowlisted actions, and stores
  normalized results.
---

# AI Orchestrator

`ai-orchestrator` is the AI execution engine.
It processes internal jobs created by `ai-intake-service`, runs scenario logic
against local models, optionally performs allowlisted external lookups, and
stores terminal execution results in AI-domain tables.

---

## Responsibilities

The service:

- discovers work by `orchestration_status = pending` on modality tables
- claims jobs with `SELECT FOR UPDATE SKIP LOCKED`
- transitions execution lifecycle (`pending` -> `running` -> terminal state)
- resolves scenario executor and model policy
- runs bounded multi-step reasoning loops
- validates model commands and output contracts
- executes allowlisted actions to external APIs
- persists normalized result payloads and failure metadata
- handles retry/backoff and stale-lock recovery

The service does not:

- consume external request topics
- publish results to requesting domains
- write business data in requesting domains

---

## Execution Flow

```mermaid
flowchart TD
    A[ai_text_job / ai_image_job pending] --> B[Claim row + lock job]
    B --> C[Set execution_status = running]
    C --> D[Resolve scenario executor]
    D --> E[Call model]
    E --> F{Response kind}
    F -->|request_action| G[Validate allowlisted action]
    G -->|valid| H[Call external API with timeout]
    H --> I[Append result to context]
    I --> E
    F -->|final| J[Validate structured output]
    J --> K{Valid + usable?}
    K -->|Yes| L[Save normalized result]
    K -->|No| M[Set no_result or failure]
    L --> N[Set orchestration_status=completed]
    M --> O[Retry or terminal fail]
```

---

## Allowlisted External Actions

| Target service | Purpose |
| --- | --- |
| `catalog-api-service` | read-only catalog lookups for text scenarios |
| `media-api-service` | save generated image bytes to temp zone and receive `temp_path` |

The orchestrator validates every action against allowlisted commands before
execution. The model never calls services directly.

---

## Retry and Failure Model

- retryable failures: `model_error`, `action_timeout`, `execution_timeout`
- structural terminal failures: `invalid_model_output`, `action_not_allowed`,
  `max_steps_exceeded`
- fixed backoff for retry scheduling (documented as 60s in AI pipeline docs)
- stale lock recovery resets stuck `picked_up`/`running` jobs back to pending

---

## Boundaries

- domain role: AI scenario execution runtime
- communication:
  - synchronous out: allowlisted API calls (`catalog-api-service`,
    `media-api-service`)
  - persistence: updates `ai_job` and modality rows in `ai` schema
- does not own outbound Kafka publishing

---

## Related Services

| Service | Relationship |
| --- | --- |
| `ai-intake-service` | supplies pending modality jobs for execution |
| `ai-job-dispatcher-service` | consumes terminal execution outcomes for outbound delivery |
| `catalog-api-service` | lookup dependency for text reasoning |
| `media-api-service` | temp image upload target for image generation flows |
