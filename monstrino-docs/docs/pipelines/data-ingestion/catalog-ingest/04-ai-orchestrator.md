---
title: AI Orchestrator
sidebar_position: 5
description: >
  Architecture and execution pipeline of the AI Orchestrator service
  responsible for attribute-level enrichment jobs.
---

# AI Orchestrator

The `ai-orchestrator` service executes AI-based enrichment for individual
catalog attributes. It is invoked only when `catalog-data-enricher`
cannot resolve an attribute through its own built-in scripts.

Each job processes one attribute of one ingest item and returns a
structured suggestion that downstream services may accept or reject.

The service:

- executes AI workflows
- logs every AI request and response
- performs optional multi-step reasoning loops
- requests additional data from other services when required
- produces a final structured suggestion for an attribute

The service does not:

- modify catalog data directly
- access foreign database tables
- decide final merge policy for ingest data
- attempt script-based resolution of attributes

Those responsibilities belong to `catalog-data-enricher`.

---

## High-Level Service Overview

```mermaid
flowchart LR
    A[catalog-data-enricher] -->|create enrichment_job| B[(ai_orchestrator.enrichment_job)]
    B --> C[AI Orchestrator]
    C -->|AI calls| D[Local AI Models]
    C -->|external lookup| E[catalog-api-service]
    C -->|store logs| F[(ai_enrichment_call)]
    C -->|store action logs| G[(enrichment_job_action_log)]
    C -->|write result| B
    B -->|status updated| A
    A -->|apply decision| H[(ingest_item.enriched_payload)]
```

---

## Pipeline Overview

```mermaid
flowchart TD
    A[Ingest Item Exists] --> B[catalog-data-enricher decides enrichment needed]
    B --> C[Attempt script-based enrichment]
    C -->|resolved| Z[Apply resolved value — no AI needed]
    C -->|unresolved| D[Create enrichment_job]
    D --> E[Set status: pending_ai_processing]
    E --> F[AI Orchestrator picks job]
    F --> G[Run AI workflow]
    G --> H{AI needs external lookup?}
    H -->|No| I[Return final structured result]
    H -->|Yes| J[Request action]
    J --> K[Call external API service]
    K --> L[Return context data]
    L --> G
    I --> M[Save result in enrichment_job]
    M --> N[Set status: awaiting_enricher_review]
    N --> O[catalog-data-enricher resumes pipeline]
```

---

## Detailed Sequence

```mermaid
sequenceDiagram
    participant Enricher as catalog-data-enricher
    participant DB as enrichment_job table
    participant AI as ai-orchestrator
    participant Model as Local AI model
    participant API as catalog-api-service

    Enricher->>DB: create enrichment_job
    Enricher->>DB: set status pending_ai_processing

    AI->>DB: fetch job
    AI->>DB: set status running_ai_workflow

    AI->>Model: send prompt with attribute context
    Model-->>AI: AI response

    alt AI requests external lookup
        AI->>API: lookup characters/series/etc
        API-->>AI: return lookup results
        AI->>Model: second AI call with additional context
        Model-->>AI: final response
    end

    AI->>DB: store structured result
    AI->>DB: set status awaiting_enricher_review

    Enricher->>DB: read job result
    Enricher->>Enricher: apply merge policy
    Enricher->>Catalog: update ingest_item.enriched_payload
```

---

## Internal AI Workflow

```mermaid
flowchart TD
    A[Load enrichment_job] --> B[Select scenario]
    B --> C[Build AI prompt context]
    C --> D[Call AI model]
    D --> E{AI response type}

    E -->|final| F[Validate structured output]
    F --> G[Save result]

    E -->|request_action| H[Validate requested command]
    H --> I[Execute external lookup]
    I --> J[Add lookup result to context]
    J --> D
```

---

## Multi-Step AI Reasoning Loop

```mermaid
flowchart TD
    A[First AI Call] --> B{Response Type}

    B -->|final| C[Store result]
    B -->|request_action| D[Parse requested command]

    D --> E[Call external service]
    E --> F[Receive context result]

    F --> G[Second AI Call]

    G --> H{Final?}

    H -->|Yes| C
    H -->|No| I[Loop until max reasoning steps]
```

---

## External Lookup Example

AI identifies potential characters but requires validation.

```mermaid
sequenceDiagram
    participant AI
    participant Model
    participant CatalogAPI

    AI->>Model: analyze release description
    Model-->>AI: request_action lookup_characters

    AI->>CatalogAPI: lookup characters by name
    CatalogAPI-->>AI: return existing characters

    AI->>Model: re-run analysis with lookup context
    Model-->>AI: final structured result
```

---

## Database Schema

The AI Orchestrator owns its own database schema.

```mermaid
erDiagram

    enrichment_job ||--o{ ai_enrichment_call : has
    enrichment_job ||--o{ enrichment_job_action_log : has

    enrichment_job {
        uuid id
        uuid ingest_item_id
        text attribute_name
        text scenario_type
        text status
        json input_context
        json result_payload
        json suggested_value
        float confidence
        timestamp created_at
        timestamp started_at
        timestamp finished_at
    }

    ai_enrichment_call {
        uuid id
        uuid enrichment_job_id
        text model_name
        json request_payload
        json response_payload
        int input_tokens
        int output_tokens
        int latency_ms
        timestamp created_at
    }

    enrichment_job_action_log {
        uuid id
        uuid enrichment_job_id
        text action_name
        json action_params
        text target_service
        json response_payload
        int latency_ms
        timestamp created_at
    }
```

---

## Job State Machine

```mermaid
stateDiagram-v2
    [*] --> pending_ai_processing
    pending_ai_processing --> running_ai_workflow
    running_ai_workflow --> awaiting_enricher_review
    running_ai_workflow --> completed_no_suggestion
    running_ai_workflow --> failed
    awaiting_enricher_review --> consumed_by_enricher
```

---

## Action Request Contract

When the model requires additional information it returns:

```json
{
  "status": "request_action",
  "is_final": false,
  "requested_action": {
    "command_name": "lookup_characters_by_names",
    "command_params": {
      "character_names": [
        "Draculaura",
        "Clawdeen Wolf"
      ]
    }
  }
}
```

The orchestrator then:

1. validates the command against the allowlist
2. calls the corresponding API service
3. adds the result to the AI context
4. executes the next reasoning step

---

## Final AI Result Example

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
    "confidence": 0.96
  }
}
```

The result is saved in `ai_orchestrator.enrichment_job.result_payload`
and the job status becomes `awaiting_enricher_review`.

---

## Responsibility Boundaries

| Component | Responsibility |
|---|---|
| `catalog-data-enricher` | decides when enrichment is needed |
| `catalog-data-enricher` | applies final merge decision |
| `ai-orchestrator` | executes AI workflow |
| `ai-orchestrator` | logs AI calls |
| `ai-orchestrator` | performs controlled external lookups |
| `catalog-api-service` | provides domain lookup data |

---

## Key Design Principles

1. **One job = one attribute**
2. **AI Orchestrator owns only its domain**
3. **External data only through API services**
4. **Every AI call is logged**
5. **Multi-step reasoning supported but limited**
6. **Final merge decision happens outside the service**
