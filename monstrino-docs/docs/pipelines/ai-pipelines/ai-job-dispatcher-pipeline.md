---
title: AI Job Dispatcher Pipeline
sidebar_position: 8
description: >
  Outbound dispatch pipeline of the AI domain responsible for publishing
  completed AI job results back to requesting domains through Kafka.
---

# AI Job Dispatcher Pipeline

The `ai-job-dispatcher-service` is the outbound integration layer of the AI
domain.
It takes completed internal AI jobs, resolves the external routing target,
builds the correct outbound message contract, and publishes the result back to
the requesting domain.

The service is the only AI-domain component that needs knowledge of requesting
services and outbound Kafka routing.

## Responsibilities

The service:

- fetches completed undispatched AI jobs
- loads internal execution results
- resolves outbound route configuration from `result_route_key`
- selects the proper outbound message builder
- publishes Kafka result messages
- retries failed dispatch attempts
- records dispatch logs and dispatch status transitions

The service does not:

- consume external request topics for job creation
- execute AI workflows
- call models or perform reasoning loops
- modify requesting-domain data directly

Those responsibilities belong to `ai-intake-service`, `ai-orchestrator`, and
requesting domain services.

---

## High-Level Service Overview

```mermaid
flowchart LR
    A[(ai.ai_job)] --> B[ai-job-dispatcher-service]
    B --> C[(ai.ai_text_job / ai.ai_image_job)]
    B --> D[Route Resolver]
    D --> E[Publisher Adapter Registry]
    E --> F[(Kafka)]
    B --> G[(ai.ai_job_dispatch)]
    B --> H[(ai.ai_job_status_history)]
    F --> I[Requesting domain consumer]
```

---

## Pipeline Overview

```mermaid
flowchart TD
    A[Internal AI job is completed] --> B[Dispatcher selects eligible job]
    B --> C[Load normalized result payload]
    C --> D[Resolve outbound route by result_route_key]
    D --> E[Choose message contract builder]
    E --> F[Build outbound Kafka payload]
    F --> G[Publish to resolved topic]
    G --> H{Published successfully?}
    H -->|Yes| I[Insert ai_job_dispatch log]
    I --> J[Set dispatch_status = dispatched]
    J --> K[Write status history]
    H -->|No| L[Insert failed dispatch log]
    L --> M[Set dispatch_status = dispatch_failed]
```

---

## Detailed Sequence

```mermaid
sequenceDiagram
    participant DB as AI Schema DB
    participant Disp as ai-job-dispatcher-service
    participant Resolver as Route Resolver
    participant Registry as Publisher Registry
    participant Kafka as Kafka
    participant Target as Requesting Domain

    Disp->>DB: fetch ai_job where execution_status = completed and dispatch_status = pending_dispatch
    Disp->>DB: load ai_text_job / ai_image_job
    Disp->>Resolver: resolve result_route_key
    Resolver-->>Disp: topic + contract type
    Disp->>Registry: select message builder
    Registry-->>Disp: message builder
    Disp->>Disp: build outbound message
    Disp->>Kafka: publish result message
    Kafka-->>Target: deliver message
    Disp->>DB: insert ai_job_dispatch
    Disp->>DB: update ai_job dispatch_status = dispatched
    Disp->>DB: insert ai_job_status_history
```

---

## Route Resolution Model

The dispatcher should not hardcode topic names in business logic.
Instead, it should resolve routing using infrastructure-level configuration.

Recommended flow:

1. load `result_route_key` from `ai_job`
2. resolve route metadata in infrastructure
3. determine:
   - target topic
   - outbound contract type
   - publisher adapter
4. publish with the correct typed message body

This keeps business records stable even if topic names change.

---

## Dispatcher Output Types

The service may publish different outbound messages depending on:

- job modality (`text`, `image`)
- result status (`completed`, `failed`, `no_result`)
- target contract type

Examples:

- `ai.text.result.completed`
- `ai.image.result.completed`
- `ai.job.result.failed`

---

## Database Schema

```mermaid
erDiagram

    ai_job ||--o| ai_text_job : has
    ai_job ||--o| ai_image_job : has
    ai_job ||--o{ ai_job_dispatch : has
    ai_job ||--o{ ai_job_status_history : has

    ai_job {
        uuid id
        text job_type
        text source_service
        text source_request_id
        text correlation_id
        text causation_event_id
        text target_service
        text result_route_key
        text priority
        text execution_status
        text dispatch_status
        text failure_code
        text failure_message
        int max_attempts
        int execution_attempt_count
        int dispatch_attempt_count
        timestamp available_at
        text locked_by
        timestamp locked_at
        timestamp started_at
        timestamp finished_at
        timestamp dispatched_at
        timestamp created_at
        timestamp updated_at
    }

    ai_text_job {
        uuid job_id
        text attribute_name
        text scenario_type
        json input_context_json
        text normalized_input_text
        json result_payload_json
        json suggested_value_json
        float confidence
        text reasoning_summary
        timestamp created_at
        timestamp updated_at
    }

    ai_image_job {
        uuid job_id
        text scenario_type
        json input_payload_json
        json source_asset_refs_json
        text prompt_text
        text negative_prompt_text
        json result_asset_payload_json
        json generation_metadata_json
        float confidence
        text reasoning_summary
        timestamp created_at
        timestamp updated_at
    }

    ai_job_dispatch {
        uuid id
        uuid job_id
        text target_service
        text result_route_key
        text resolved_topic_name
        text message_contract_type
        json message_payload_json
        text dispatch_status
        int attempt_count
        text last_error
        timestamp published_at
        timestamp created_at
        timestamp updated_at
    }

    ai_job_status_history {
        uuid id
        uuid job_id
        text status_axis
        text old_status
        text new_status
        text changed_by_service
        text reason_code
        text reason_message
        timestamp created_at
    }
```

---

## Data Model Notes

### `ai_job`

The dispatcher uses:

- `target_service`
- `result_route_key`
- `execution_status`
- `dispatch_status`
- `dispatch_attempt_count`
- `dispatched_at`

### `ai_job_dispatch`

Stores dispatch attempt history and the exact outbound payload published for each
attempt.

This is important for:

- replay analysis
- transport debugging
- downstream troubleshooting
- operational retries

### `ai_job_status_history`

Captures dispatch state transitions separately from execution transitions.

---

## Dispatch State Machine

```mermaid
stateDiagram-v2
    [*] --> pending_dispatch
    pending_dispatch --> dispatched
    pending_dispatch --> dispatch_failed
```

---

## Example Outbound Message: Text Result Completed

```json
{
  "event_id": "uuid",
  "event_type": "ai.text.result.completed",
  "event_version": 1,
  "occurred_at": "2026-03-14T18:20:00Z",
  "source_service": "ai-job-dispatcher-service",
  "correlation_id": "uuid",
  "result": {
    "source_request_id": "uuid",
    "job_id": "uuid",
    "attribute_name": "characters",
    "scenario_type": "character_resolution",
    "payload": {
      "characters": [
        {
          "name": "Draculaura",
          "slug": "draculaura"
        }
      ]
    },
    "confidence": 0.96,
    "reasoning_summary": "Matched extracted names against catalog lookup results."
  }
}
```

---

## Example Outbound Message: Image Result Completed

```json
{
  "event_id": "uuid",
  "event_type": "ai.image.result.completed",
  "event_version": 1,
  "occurred_at": "2026-03-14T18:22:00Z",
  "source_service": "ai-job-dispatcher-service",
  "correlation_id": "uuid",
  "result": {
    "source_request_id": "uuid",
    "job_id": "uuid",
    "scenario_type": "image_generation",
    "assets": [
      {
        "storage_key": "generated/release-123/front.webp",
        "width": 1024,
        "height": 1024,
        "mime_type": "image/webp"
      }
    ],
    "generation_metadata": {
      "model": "local-image-model",
      "seed": 112233
    }
  }
}
```

---

## Example Outbound Message: Failed Result

```json
{
  "event_id": "uuid",
  "event_type": "ai.job.result.failed",
  "event_version": 1,
  "occurred_at": "2026-03-14T18:25:00Z",
  "source_service": "ai-job-dispatcher-service",
  "correlation_id": "uuid",
  "result": {
    "source_request_id": "uuid",
    "job_id": "uuid",
    "job_type": "text",
    "failure_code": "invalid_model_response",
    "failure_message": "The model returned an invalid structured payload."
  }
}
```

---

## Ownership Boundaries

| Component | Responsibility |
|---|---|
| `ai-intake-service` | creates internal jobs from external requests |
| `ai-orchestrator` | produces normalized internal AI results |
| `ai-job-dispatcher-service` | knows outbound services and routing |
| `ai-job-dispatcher-service` | publishes result contracts to Kafka |
| Requesting domain service | consumes AI result and applies its own domain logic |

---

## Key Design Principles

1. **Only the dispatcher knows outbound service integration details**
2. **The orchestrator is completely isolated from external routing**
3. **Outbound transport history is persisted for debugging and retries**
4. **Routing is resolved by route key, not by hardcoded business logic**
5. **Requesting domains remain owners of their own final write decisions**
