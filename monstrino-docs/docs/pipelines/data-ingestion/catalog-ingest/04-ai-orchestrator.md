---
title: AI Pipeline
sidebar_position: 5
description: >
  How the AI pipeline integrates with the catalog ingest pipeline — three
  services that handle intake, execution, and result dispatch of AI enrichment
  jobs via Kafka.
---

# AI Pipeline

The AI pipeline is triggered by `catalog-data-enricher` when built-in scripts
cannot resolve an attribute. It runs as three independent services — intake,
execution, and dispatch — fully decoupled from the catalog pipeline via Kafka.

`catalog-data-enricher` never calls AI services directly. It publishes a Kafka
message and later consumes the result.

---

## Position in the Catalog Ingest Pipeline

```mermaid
sequenceDiagram
    participant Enricher as catalog-data-enricher
    participant Kafka as Kafka
    participant Intake as ai-intake-service
    participant Orch as ai-orchestrator
    participant Disp as ai-job-dispatcher-service

    Enricher->>Kafka: publish ai.job.requested
    Kafka->>Intake: consume + validate
    Intake->>Intake: create ai_job + ai_text_job<br/>orchestration_status = pending
    Note over Orch: polls modality tables independently
    Orch->>Orch: claim ai_text_job<br/>orchestration_status = picked_up
    Orch->>Orch: run AI scenario
    Orch->>Orch: store result<br/>orchestration_status = completed
    Disp->>Disp: pick up completed ai_job
    Disp->>Kafka: publish to result_route_key
    Kafka->>Enricher: consume AI result
```

---

## How the AI Pipeline is Triggered

When `catalog-data-enricher` cannot resolve an attribute via scripts, it
publishes `ai.job.requested` to Kafka and continues processing other
attributes. The AI pipeline handles the rest independently.

```json
{
  "event_id": "uuid",
  "event_type": "ai.job.requested",
  "event_version": 1,
  "occurred_at": "2026-03-15T10:00:00Z",
  "source_service": "catalog-data-enricher",
  "correlation_id": "uuid",
  "request": {
    "source_request_id": "uuid",
    "job_type": "text",
    "target_service": "catalog-data-enricher",
    "result_route_key": "catalog-enricher.attribute-result",
    "priority": "normal",
    "text_job": {
      "attribute_name": "characters",
      "scenario_type": "character_resolution",
      "input_context": {
        "title": "Dawn of the Dance 3-Pack",
        "description": "This Walmart exclusive features Draculaura...",
        "year": 2011,
        "existing_characters": []
      }
    }
  }
}
```

The enricher matches the inbound result to the pending attribute by
`source_request_id` when consuming from `catalog-enricher.attribute-result`.

---

## Three Services

| Service | Role |
| --- | --- |
| `ai-intake-service` | Consumes `ai.job.requested` from Kafka, validates, deduplicates on `event_id`, creates `ai_job` and modality row in the `ai` schema |
| `ai-orchestrator` | Claims pending jobs via `orchestration_status` on modality tables, runs named AI scenarios, manages reasoning loops, stores normalized results |
| `ai-job-dispatcher-service` | Claims completed jobs, publishes result back to `result_route_key` via Kafka |

---

## Pipeline Overview

```mermaid
flowchart TD
    A[catalog-data-enricher<br/>script cannot resolve attribute] --> B[Publish ai.job.requested<br/>to Kafka]
    B --> C[ai-intake-service<br/>validate + create ai_job + ai_text_job<br/>orchestration_status = pending]
    C --> D[ai-orchestrator claims ai_text_job<br/>orchestration_status = picked_up]
    D --> E[Run AI scenario]
    E --> F{AI needs lookup?}
    F -->|yes| G[Action request<br/>catalog-api-service lookup]
    G --> H[Inject result into context]
    H --> E
    F -->|no| I[Validate structured output<br/>Store result in ai_text_job<br/>orchestration_status = completed]
    I --> J[ai-job-dispatcher-service<br/>publish to result_route_key]
    J --> K[catalog-data-enricher consumes result<br/>from catalog-enricher.attribute-result]
```

---

## Kafka Topics

| Topic | Direction | Notes |
| --- | --- | --- |
| `ai.job.requested` | `catalog-data-enricher` → `ai-intake-service` | Entry point into the AI pipeline |
| `ai.job.requested.dlq` | `ai-intake-service` → manual | Dead-letter after persistent intake failure |
| `catalog-enricher.attribute-result` | `ai-job-dispatcher-service` → `catalog-data-enricher` | Set as `result_route_key` at intake time |

---

## Database Schema

All AI-pipeline tables reside in the `ai` schema. The catalog pipeline has
no shared tables with the AI domain — all coordination is via Kafka.

```mermaid
erDiagram

    ai_job ||--o| ai_text_job : has
    ai_job ||--o{ ai_job_model_call : has
    ai_job ||--o{ ai_job_action_log : has
    ai_job ||--o{ ai_job_status_history : has

    ai_job {
        uuid id
        text job_type
        text source_service
        text source_request_id
        text correlation_id
        text result_route_key
        text priority
        text execution_status
        text dispatch_status
        text failure_code
        int max_attempts
        int execution_attempt_count
        int dispatch_attempt_count
        timestamp available_at
        text locked_by
        timestamp locked_at
        timestamp finished_at
    }

    ai_text_job {
        uuid job_id
        text attribute_name
        text scenario_type
        text orchestration_status
        json input_context_json
        json result_payload_json
        json suggested_value_json
        float confidence
        text reasoning_summary
    }

    ai_job_model_call {
        uuid id
        uuid job_id
        int step_no
        text model_name
        json request_payload_json
        json response_payload_json
        int latency_ms
        timestamp created_at
    }

    ai_job_action_log {
        uuid id
        uuid job_id
        int step_no
        text action_name
        json action_params_json
        text target_service
        json response_payload_json
        text action_status
        timestamp created_at
    }
```

---

## Job State Machine

A single `ai_job` row tracks two independent status axes.

### Execution axis — `ai_job.execution_status`

```mermaid
stateDiagram-v2
    [*] --> pending : intake creates job
    pending --> running : orchestrator claims job
    running --> completed : result stored
    running --> no_result : model returned no usable result
    running --> failed : terminal failure
    running --> pending : non-terminal failure, attempts remaining
```

### Dispatch axis — `ai_job.dispatch_status`

```mermaid
stateDiagram-v2
    [*] --> pending_dispatch : intake initializes job
    pending_dispatch --> dispatched : publish succeeded
    pending_dispatch --> pending_dispatch : publish failed, retry on next poll
    pending_dispatch --> dispatch_failed : attempts exhausted
```

### Orchestration axis — `ai_text_job.orchestration_status`

```mermaid
stateDiagram-v2
    [*] --> pending : intake creates modality row
    pending --> picked_up : orchestrator claims job
    picked_up --> running : execution begins
    running --> completed : result written
    running --> failed : terminal failure
    failed --> pending : retry if attempts remaining
```

---

## Action Request Contract

When the model needs additional information during reasoning, it returns a
structured action request. The orchestrator validates it against the
per-scenario allowlist, executes the lookup, and continues the reasoning loop.

```json
{
  "status": "request_action",
  "is_final": false,
  "requested_action": {
    "action_name": "catalog_search_characters",
    "action_params": {
      "filters": { "search": "Draculaura" },
      "page": { "limit": 5, "offset": 0 },
      "context": { "locale": "en" }
    }
  }
}
```

### Allowlisted action targets

| Target service | Actions | Scenarios |
| --- | --- | --- |
| `catalog-api-service` | catalog search queries | text (all scenarios) |
| `media-api-service` | `save_temp_image` | image (all scenarios) |

A maximum of **4 action calls** are allowed per job. Exceeding this sets
`failure_code = max_steps_exceeded`.

---

## Retry and Failure

| `failure_code` | Retryable | Meaning |
| --- | --- | --- |
| `model_error` | Yes | model returned an error response |
| `action_timeout` | Yes | external lookup did not respond within timeout |
| `execution_timeout` | Yes | job exceeded maximum elapsed execution time |
| `max_steps_exceeded` | No | reasoning loop hit the 4-action limit |
| `invalid_model_output` | No | structured output failed schema validation |
| `action_not_allowed` | No | model requested an action outside the allowlist |

Retryable failures retry with 60 s fixed backoff up to `ai_job.max_attempts`.
Structural failures are terminal and do not retry regardless of remaining
attempts.

---

## Outbound Result Contract

`ai-job-dispatcher-service` publishes to `result_route_key` after the job
reaches a terminal execution state. `catalog-data-enricher` consumes from this
topic and identifies the matching attribute by `source_request_id`.

```json
{
  "event_id": "uuid",
  "event_type": "ai.text.result.completed",
  "event_version": 1,
  "source_service": "ai-job-dispatcher-service",
  "correlation_id": "uuid",
  "result": {
    "source_request_id": "uuid",
    "job_id": "uuid",
    "attribute_name": "characters",
    "scenario_type": "character_resolution",
    "payload": {
      "characters": [
        { "name": "Draculaura", "slug": "draculaura" },
        { "name": "Clawdeen Wolf", "slug": "clawdeen-wolf" },
        { "name": "Frankie Stein", "slug": "frankie-stein" }
      ]
    },
    "confidence": 0.96,
    "reasoning_summary": "Matched extracted names against catalog lookup results."
  }
}
```

All three terminal execution outcomes are dispatched back to the enricher:

| `execution_status` | `event_type` | Enricher behavior |
| --- | --- | --- |
| `completed` | `ai.text.result.completed` | Candidate enters evaluation pipeline |
| `no_result` | `ai.job.result.no_result` | Enricher keeps existing value |
| `failed` | `ai.job.result.failed` | Logged, step flagged for review |

---

## Responsibility Boundaries

| Component | Responsibility |
| --- | --- |
| `catalog-data-enricher` | decides when AI enrichment is needed |
| `catalog-data-enricher` | publishes `ai.job.requested` to Kafka |
| `catalog-data-enricher` | consumes result and applies evaluation pipeline |
| `catalog-data-enricher` | applies final merge decision |
| `ai-intake-service` | validates and materializes internal AI jobs |
| `ai-orchestrator` | executes AI scenarios, manages reasoning loops |
| `ai-orchestrator` | performs controlled external lookups |
| `ai-job-dispatcher-service` | publishes results back to requesting domains |
| `catalog-api-service` | provides domain lookup data during reasoning |

---

## Key Design Principles

1. **`catalog-data-enricher` never calls AI services directly** — all
   communication is via Kafka; no shared tables between the catalog pipeline
   and the AI domain
2. **One AI job per attribute per ingest item** — each unresolved attribute
   becomes one `ai_job`
3. **Three separate services, each owning one lifecycle phase** — intake,
   execution, and dispatch are independent
4. **All AI calls and actions are audit-logged** in `ai_job_model_call` and
   `ai_job_action_log`
5. **Structural failures are terminal** — retries are reserved for transient
   errors only
6. **Final merge decision happens in `catalog-data-enricher`** — the AI
   pipeline only produces suggestions
