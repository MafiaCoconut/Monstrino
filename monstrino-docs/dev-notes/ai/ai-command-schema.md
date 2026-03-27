---
id: ai-command-schema
title: AI Action Request Schema
sidebar_label: AI Action Request Schema
sidebar_position: 3
description: Schema and conventions for the structured action responses returned by the AI orchestrator during multi-step reasoning.
---

# AI Action Request Schema

:::info
This document describes the structured response format used when AI models request intermediate actions rather than returning a final result.
:::

---

## Motivation

AI responses in Monstrino may request controlled lookups before returning a final result.

Instead of returning plain text that consuming services must interpret ad hoc, the model returns a **structured response** describing the next action. The orchestrator's Use Case validates the action name against an allowlist, executes the lookup, and injects the result back into the conversation context.

---

## Response Schema — Action Request

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

## Response Schema — Final Result

```json
{
  "status": "final",
  "is_final": true,
  "final_payload": {
    "characters": [
      { "name": "Draculaura", "slug": "draculaura" }
    ],
    "confidence": 0.96,
    "reasoning_summary": "Matched extracted names against catalog lookup results."
  }
}
```

---

## Fields

| Field | Type | Description |
|---|---|---|
| `status` | `string` | `"request_action"` or `"final"` |
| `is_final` | `boolean` | whether this is the last step or more steps follow |
| `requested_action.action_name` | `string` | the lookup operation being requested (must be in scenario allowlist) |
| `requested_action.action_params` | `object` | parameters for that lookup |
| `final_payload` | `object` | present only when `status = "final"` — the resolved result |

---

## The `is_final` Flag

:::note
`is_final` enables **multi-step reasoning pipelines**.

When `is_final: false`, the Use Case executes the requested action, injects the result into context, and calls the model again.
When `is_final: true`, processing is complete and the result is written to the modality row.
:::

A maximum of **4 action calls** are permitted per job. Exceeding this limit sets `failure_code = max_steps_exceeded` and terminates the job.

---

## Multi-Step Flow Example

```
Model returns:  { "status": "request_action", "requested_action": { "action_name": "catalog_search_characters", ... } }
    → Use Case validates action_name is in allowlist
    → calls catalog-api-service
    → result injected into conversation context

Model returns:  { "status": "final", "final_payload": { "characters": [...], "confidence": 0.96 } }
    → Use Case validates structured output
    → result written to ai_text_job, orchestration_status = completed
```

---

## Benefits

| Benefit | Notes |
|---|---|
| **AI-driven orchestration** | the model controls the processing flow, not just data |
| **Multi-step reasoning pipelines** | allows the model to inspect intermediate results |
| **Universal command interface** | one schema for all AI-powered operations |
| **Testability** | command responses can be mocked and unit-tested independently |

---

## Related Documents

- [AI Orchestrator Architecture](./ai-orchestrator-architecture) - the service that interprets these commands,
- [AI Data Enrichment Strategy](./ai-data-enrichment) - concrete use cases for command execution.
