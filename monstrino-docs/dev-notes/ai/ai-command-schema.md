---
id: ai-command-schema
title: AI Command Execution Schema
sidebar_label: AI Command Execution Schema
sidebar_position: 3
description: Schema and conventions for the structured command responses returned by the AI orchestrator.
---

# AI Command Execution Schema

:::info
This document describes the structured response format used when AI models return actionable commands rather than plain text.
:::

---

## Motivation

AI responses in Monstrino may trigger internal actions in the system.

Instead of returning plain text that consuming services must interpret ad hoc, the model returns a **structured response** describing the requested operation. This creates a stable, machine-readable interface between the AI layer and the rest of the platform.

---

## Response Schema

```json
{
  "command": "extract_entities",
  "params": {
    "text": "..."
  },
  "is_final": false
}
```

---

## Fields

| Field | Type | Description |
|---|---|---|
| `command` | `string` | the operation the model is requesting to execute |
| `params` | `object` | parameters required for that operation |
| `is_final` | `boolean` | whether this is the last step or more steps follow |

---

## The `is_final` Flag

:::note
`is_final` enables **multi-step reasoning pipelines**.

When `is_final: false`, the orchestrator should execute the command, observe the result, and continue the conversation with the model.  
When `is_final: true`, processing is complete and the result can be passed to the consumer.
:::

---

## Multi-Step Flow Example

```
Model returns:  { "command": "extract_entities", "params": {...}, "is_final": false }
    → orchestrator executes extract_entities
    → result is passed back to the model as context

Model returns:  { "command": "validate_fields", "params": {...}, "is_final": false }
    → orchestrator executes validate_fields
    → result is passed back to the model as context

Model returns:  { "command": "finalize", "params": { "result": {...} }, "is_final": true }
    → orchestrator returns final result to the caller
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

- [AI Orchestrator Architecture](./ai-orchestrator-architecture) — the service that interprets these commands,
- [AI Data Enrichment Strategy](./ai-data-enrichment) — concrete use cases for command execution.
