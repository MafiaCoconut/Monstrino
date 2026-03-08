---
title: LLM Enrichment Walkthrough
sidebar_position: 4
---

# LLM Enrichment Walkthrough

This document demonstrates, step by step, how the `catalog-data-enricher` pipeline works on a real release payload when enriching **characters** data through the `ai-orchestrator` service.

Unlike architecture pages that explain responsibilities at a high level, this page shows the actual operational flow using realistic input data, example requests, example AI responses, validation steps, and the final enrichment result.

---

# Goal of This Example

The goal of this walkthrough is to make the enrichment pipeline visually understandable.

This example focuses on one concrete scenario:

- the release is already discovered and parsed
- `catalog-data-enricher` receives incomplete structured data
- the `characters` field is still empty
- `catalog-data-enricher` calls `ai-orchestrator`
- AI analyzes the release description
- AI may request an additional lookup step
- the orchestrator continues the flow until a final structured response is produced
- `catalog-data-enricher` validates the result
- validated output is forwarded to downstream services

This example covers the **characters enrichment** scenario only. Other enrichment fields such as `pets`, `series`, `content_type`, or `tier_type` follow the same overall pattern but use different Use Cases and prompts.

---

# Initial Input Received by `catalog-data-enricher`

Below is a realistic example of the data that `catalog-data-enricher` may receive before enrichment.

```json
{
  "title": "Dawn of the Dance 3-Pack",
  "external_id": "dawn-of-the-dance-3-pack",
  "url": "https://mhcollector.com/dawn-of-the-dance-3-pack/",
  "mpn": "V7967",
  "type": null,
  "subtype": null,
  "language": null,
  "region": null,
  "gtin": null,
  "description": "This Walmart exclusive features Draculaura who is only available in this 3-pack. It also includes two previously released dolls, Clawdeen Wolf and Frankie Stein.\nDraculaura is wearing her black &amp; pink hair in a side ponytail. Her strapless dress is thin stripes of pink, white, gray, and black. It has pink ruffles at the top and white ruffles for the hem. She accentuates the dress with a pink ribbon-like shawl and black shoes with shiny pink heels in the shape of hearts.\nDraculaura accessorizes the outfit with a small white heart-shaped top hat, white cuffs &amp; collar, and pink dangle heart earrings. Her purse is a sparkly pink bow with a black strap.\nThe Clawdeen and Frankie reissues have the same hairstyles and outfits as the originals and also include their iCoffin phones. Extras for the group include a black brush, doll stand, and party photos.",
  "text_from_box": null,
  "content_description": null,
  "year": 2011,
  "year_raw": "2011",
  "gender": [],
  "characters": [],
  "pets": null,
  "series": [],
  "exclusive_vendor": [
    "Walmart"
  ],
  "reissue_of": [],
  "content_type": null,
  "pack_type": [],
  "tier_type": null,
  "primary_image_url": "https://mhcollector.com/wp-content/uploads/2015/03/Dawn-of-the-Dance-3-Pack.jpg",
  "images": [
    "https://mhcollector.com/wp-content/uploads/2015/03/Dawn-of-the-Dance-3-Pack-acc.jpg",
    "https://mhcollector.com/wp-content/uploads/2015/03/Dawn-of-the-Dance-3-Pack.jpg",
    "https://mhcollector.com/wp-content/uploads/2015/03/Dawn-of-the-Dance-3-Pack-box.jpg"
  ],
  "images_url": "https://mhcollector.com/image-gallery/?from=249",
  "raw_payload": null,
  "extra": null
}
```

At this stage, the release already contains useful source data, but the `characters` field is still empty and needs enrichment.

---

# Why Enrichment Is Needed

The release description contains clear textual hints about the included characters:

- Draculaura
- Clawdeen Wolf
- Frankie Stein

However, this information is still present only as unstructured text.

The goal of the characters enrichment flow is to convert this source description into a structured result that downstream services can use safely.

---

# Pipeline Overview

At a high level, the enrichment flow looks like this:

```text
Parsed release data
  -> catalog-data-enricher
  -> character enrichment Use Case
  -> AIOrchestratorApiClient
  -> ai-orchestrator
  -> character enrichment scenario
  -> final structured response
  -> validation in catalog-data-enricher
  -> forward to downstream processing
```

---

# Step 1: `catalog-data-enricher` Detects Missing Characters

The pipeline starts when `catalog-data-enricher` sees that:

- the release has a non-empty description
- the `characters` field is empty
- the release qualifies for characters enrichment

At this point, the service chooses the dedicated Use Case for **characters enrichment**.

This is important because `catalog-data-enricher` uses separate Use Cases for separate fields. Characters, pets, series, and other enrichment targets are not handled by one generic enrichment class.

---

# Step 2: Request Sent to `ai-orchestrator`

`catalog-data-enricher` does not create prompts and does not talk to Ollama directly.

Instead, it sends structured input to `ai-orchestrator` through `AIOrchestratorApiClient`.

A simplified request payload can look like this:

```json
{
  "scenario_name": "enrich-release-characters",
  "payload": {
    "title": "Dawn of the Dance 3-Pack",
    "external_id": "dawn-of-the-dance-3-pack",
    "description": "This Walmart exclusive features Draculaura who is only available in this 3-pack. It also includes two previously released dolls, Clawdeen Wolf and Frankie Stein.",
    "year": 2011,
    "existing_characters": [],
    "images": [
      "https://mhcollector.com/wp-content/uploads/2015/03/Dawn-of-the-Dance-3-Pack.jpg"
    ]
  }
}
```

The important point is that the calling service sends **data**, not prompts.

The prompt logic is fully encapsulated inside `ai-orchestrator`.

---

# Step 3: `ai-orchestrator` Runs the Characters Scenario

Inside `ai-orchestrator`, the corresponding Job starts the characters enrichment scenario.

That internal flow looks like this:

```text
API Route
  -> Job
  -> configured AI Client
  -> characters enrichment Use Case
  -> prompt loading
  -> model request
```

The Use Case loads its prompt templates from the service’s prompt directories and constructs the model request using the release data.

The AI model receives the release description and is instructed to return only the structured orchestration contract.

---

# Step 4: First AI Response Requests More Information

In some cases, the first AI response is not final.

For this example, we assume the model identifies likely characters but requests an additional verification step before returning the final result.

An example response can look like this:

```json
{
  "status": "request_action",
  "is_final": false,
  "requested_action": {
    "command_name": "get_more_info_about_characters",
    "command_params": {
      "character_names": [
        "Draculaura",
        "Clawdeen Wolf",
        "Frankie Stein"
      ]
    }
  },
  "message": "Potential characters detected from release description. Additional lookup is required to validate canonical character names.",
  "metadata": {
    "reasoning_stage": "character_lookup_requested"
  }
}
```

This response does **not** mean that AI can call another service on its own.

It only means that AI is asking the orchestrator to perform the next controlled step.

---

# Step 5: Orchestrator Executes the Requested Action

The orchestrator receives the `request_action` response and passes control back into the Use Case.

The Use Case then validates:

- whether the command name is supported
- whether required parameters are present
- whether the request is safe and expected for this scenario

Once validated, the Use Case performs the lookup through a backend integration such as `catalog-api-service`.

A simplified example of the lookup request:

```json
{
  "lookup_type": "characters_by_names",
  "character_names": [
    "Draculaura",
    "Clawdeen Wolf",
    "Frankie Stein"
  ]
}
```

A simplified example of the lookup result:

```json
{
  "characters": [
    {
      "slug": "draculaura",
      "display_name": "Draculaura"
    },
    {
      "slug": "clawdeen-wolf",
      "display_name": "Clawdeen Wolf"
    },
    {
      "slug": "frankie-stein",
      "display_name": "Frankie Stein"
    }
  ]
}
```

This additional data is then appended to the AI conversation context.

---

# Step 6: Second AI Response Returns Final Structured Result

After the extra lookup data is added, the Use Case calls the model again.

This time the model returns a final orchestration response.

Example:

```json
{
  "status": "final",
  "is_final": true,
  "final_payload": {
    "data": {
      "characters": [
        {
          "name": "Draculaura",
          "slug": "draculaura"
        },
        {
          "name": "Clawdeen Wolf",
          "slug": "clawdeen-wolf"
        },
        {
          "name": "Frankie Stein",
          "slug": "frankie-stein"
        }
      ],
      "matched_characters_count": 3,
      "confidence": 0.96
    }
  },
  "message": "Final structured result is ready.",
  "metadata": {
    "reasoning_stage": "completed"
  }
}
```

At this stage, the orchestration flow is complete.

---

# Step 7: Response Validation in `catalog-data-enricher`

The final AI response is not accepted blindly.

`catalog-data-enricher` validates the returned result before passing it downstream.

The validation layer checks that:

- the response is valid JSON in the expected format
- the orchestration contract is structurally correct
- the final payload is not empty
- the characters list is meaningful
- the response is not plain uncontrolled prose
- the content does not look nonsensical or malformed

If validation fails:

- the issue is logged
- the enrichment step is marked as failed
- the administrator is notified

This is a critical boundary in the system. AI is allowed to suggest data, but it is not allowed to inject arbitrary content into the catalog flow.

---

# Step 8: Result Forwarded to Downstream Services

If the result passes validation, `catalog-data-enricher` prepares the enriched payload for the next service.

Object creation does **not** happen inside `catalog-data-enricher`.

That responsibility belongs to `catalog-importer`.

So the flow becomes:

```text
Validated enrichment result
  -> catalog-data-enricher output
  -> catalog-importer
  -> object creation / update
```

This separation is intentional:

- `catalog-data-enricher` enriches and validates
- `catalog-importer` creates or updates structured catalog objects

---

# Final Enrichment Result for This Example

The expected final business result for this release is:

```json
{
  "title": "Dawn of the Dance 3-Pack",
  "mpn": "V7967",
  "characters": [
    {
      "name": "Draculaura",
      "slug": "draculaura"
    },
    {
      "name": "Clawdeen Wolf",
      "slug": "clawdeen-wolf"
    },
    {
      "name": "Frankie Stein",
      "slug": "frankie-stein"
    }
  ]
}
```

This transforms the release from a text-only source representation into a structured release record that can be matched, displayed, and processed elsewhere in the platform.

---

# Full Visual Flow

For quick reference, the full scenario looks like this:

```text
1. catalog-data-enricher receives parsed release
2. characters field is empty
3. characters enrichment Use Case is selected
4. request is sent to ai-orchestrator
5. AI analyzes description
6. AI requests additional character lookup
7. orchestrator validates and executes the lookup
8. lookup result is added to AI context
9. AI returns final structured response
10. catalog-data-enricher validates output
11. validated result is forwarded to catalog-importer
```

---

# What This Example Demonstrates

This walkthrough demonstrates several important architectural principles:

- enrichment is field-specific, not generic
- calling services send data, not prompts
- `ai-orchestrator` controls AI scenarios
- AI can request actions, but cannot execute them directly
- final outputs are validated before further processing
- object creation is delegated to downstream services

This is the core reason why the Monstrino enrichment pipeline remains controllable even while using non-deterministic AI components.

---

# Related Documents

This page works together with the following documentation:

- `docs/ai-features/ai-strategy.md`
- `docs/ai-features/ai-orchestrator.md`

If those pages explain the architectural design, this page explains how that design behaves on a real example.