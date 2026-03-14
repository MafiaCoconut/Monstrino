---
title: AI Orchestrator Pipeline
sidebar_position: 7
description: >
  Execution pipeline of the AI domain responsible for processing internal AI
  jobs, calling models, running reasoning loops, and storing normalized results.
---

# AI Orchestrator Pipeline

The `ai-orchestrator` service is the execution engine of the AI domain.
It processes internal jobs created by `ai-intake-service`, executes the
appropriate AI workflow, performs controlled lookup actions when required, and
stores the final normalized result.

The service works only with internal AI-domain tables and does not know which
external domain originally requested the job.

## Responsibilities

The service:

- fetches internal pending jobs
- locks jobs for exclusive execution
- resolves the scenario executor for the job
- calls local AI models
- performs bounded reasoning loops
- executes allowlisted external lookup actions through API services
- validates structured model outputs
- stores final normalized execution results
- updates execution lifecycle state
- logs all model calls and action steps

The service does not:

- consume external domain request topics directly
- publish final results back to requesting domains
- know target Kafka topics or outbound routing configuration
- decide merge policy in requesting domains

Those responsibilities belong to `ai-intake-service` and
`ai-job-dispatcher-service`.

---

## High-Level Service Overview

```mermaid
flowchart LR
    A[(ai.ai_job)] --> B[ai-orchestrator]
    B --> C[(ai.ai_text_job / ai.ai_image_job)]
    B --> D[Scenario Resolver]
    D --> E[Local AI Models]
    B --> F[Action Executor]
    F --> G[<domain>-api-service]
    B --> H[(ai.ai_job_model_call)]
    B --> I[(ai.ai_job_action_log)]
    B --> J[(ai.ai_job_status_history)]
    B --> K[(ai.ai_text_job / ai.ai_image_job result fields)]
```

---

## Pipeline Overview

```mermaid
flowchart TD
    A[Pending internal AI job exists] --> B[Worker claims job]
    B --> C[Set execution_status = running]
    C --> D[Load modality payload row]
    D --> E[Resolve scenario executor]
    E --> F[Build initial prompt context]
    F --> G[Call AI model]
    G --> H{Response type}
    H -->|final| I[Validate structured output]
    I --> J[Save normalized result]
    J --> K[Set execution_status = completed or no_result]
    H -->|request_action| L[Validate requested action]
    L --> M[Execute allowlisted lookup]
    M --> N[Store action log]
    N --> O[Append lookup result to context]
    O --> G
    L -->|invalid| P[Set execution_status = failed]
```

---

## Detailed Sequence

```mermaid
sequenceDiagram
    participant DB as AI Schema DB
    participant Orch as ai-orchestrator
    participant Model as Local AI Model
    participant API as <domain>-api-service

    Orch->>DB: claim pending ai_job
    Orch->>DB: set execution_status = running
    Orch->>DB: load ai_text_job / ai_image_job
    Orch->>Orch: resolve scenario executor
    Orch->>Model: initial call with context
    Model-->>Orch: response
    Orch->>DB: insert ai_job_model_call

    alt response requests action
        Orch->>Orch: validate allowlisted action
        Orch->>API: execute lookup
        API-->>Orch: lookup result
        Orch->>DB: insert ai_job_action_log
        Orch->>Model: follow-up call with lookup context
        Model-->>Orch: final response
        Orch->>DB: insert ai_job_model_call
    end

    Orch->>Orch: validate structured result
    Orch->>DB: update ai_text_job / ai_image_job result fields
    Orch->>DB: update ai_job execution_status
    Orch->>DB: insert ai_job_status_history
```

---

## Internal Reasoning Loop

```mermaid
flowchart TD
    A[Load normalized job context] --> B[Build prompt]
    B --> C[Model call]
    C --> D{Response kind}

    D -->|final| E[Validate output]
    E --> F[Store result]

    D -->|request_action| G[Validate command]
    G --> H[Execute action]
    H --> I[Append context]
    I --> J{Max steps reached?}
    J -->|No| B
    J -->|Yes| K[Fail job]
```

---

## Execution Policies

The orchestrator should enforce explicit execution limits, including:

- maximum reasoning steps per job
- maximum action calls per job
- maximum model call count per job
- maximum elapsed execution time per job
- per-scenario allowed model list
- per-scenario allowed action list

These limits prevent infinite loops, repeated low-value retries, and unbounded
resource usage.

---

## Structured Output Validation

The service must validate both classes of model responses:

### Final result

- expected envelope fields exist
- payload conforms to scenario schema
- required typed values are present
- confidence is within accepted range if provided

### Action request

- `action_name` exists in the allowlist
- parameters match the action contract
- repeated useless action loops are prevented

Invalid responses should move the job to a terminal failure state.

---

## Database Schema

```mermaid
erDiagram

    ai_job ||--o| ai_text_job : has
    ai_job ||--o| ai_image_job : has
    ai_job ||--o{ ai_job_model_call : has
    ai_job ||--o{ ai_job_action_log : has
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

    ai_job_model_call {
        uuid id
        uuid job_id
        int step_no
        text call_type
        text model_name
        text model_provider
        json request_payload_json
        json response_payload_json
        json parsed_response_json
        int input_tokens
        int output_tokens
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
        int latency_ms
        text action_status
        text error_message
        timestamp created_at
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

## Job State Machine

```mermaid
stateDiagram-v2
    [*] --> pending
    pending --> running
    running --> completed
    running --> no_result
    running --> failed
    running --> cancelled
```

Dispatch transitions are handled by `ai-job-dispatcher-service`, not by the
orchestrator.

---

## Example Action Request Contract

```json
{
  "status": "request_action",
  "is_final": false,
  "requested_action": {
    "action_name": "lookup_characters_by_names",
    "action_params": {
      "character_names": [
        "Draculaura",
        "Clawdeen Wolf"
      ]
    }
  }
}
```

---

## Example Final Text Result

```json
{
  "status": "final",
  "is_final": true,
  "final_payload": {
    "characters": [
      {
        "name": "Draculaura",
        "slug": "draculaura"
      },
      {
        "name": "Clawdeen Wolf",
        "slug": "clawdeen-wolf"
      }
    ],
    "confidence": 0.96,
    "reasoning_summary": "Matched extracted names against catalog lookup results."
  }
}
```

---

## Example Final Image Result

```json
{
  "status": "final",
  "is_final": true,
  "final_payload": {
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

## Ownership Boundaries

| Component | Responsibility |
|---|---|
| `ai-intake-service` | creates internal AI jobs |
| `ai-orchestrator` | executes internal AI jobs |
| `ai-orchestrator` | validates model outputs |
| `ai-orchestrator` | stores normalized result payloads |
| `ai-job-dispatcher-service` | publishes completed results outward |

---

## Key Design Principles

1. **The orchestrator knows only internal AI-domain records**
2. **Execution is separate from intake and dispatch**
3. **Model outputs are always validated before persistence**
4. **Reasoning loops are bounded by explicit policy**
5. **All model calls and actions are audit-logged**
