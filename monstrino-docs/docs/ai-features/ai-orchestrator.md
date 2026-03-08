---
title: AI Orchestrator
sidebar_position: 2
---

# AI Orchestrator

This document describes the purpose, architecture, and responsibilities of the `ai-orchestrator` service in Monstrino.

The AI Orchestrator is the centralized execution layer for AI-powered scenarios. It encapsulates prompt logic, model configuration, structured response handling, and multi-step interaction flows so that other services in the platform do not need to know how AI is implemented.

---

# Purpose

Monstrino uses AI for tasks such as text enrichment, entity classification, and image understanding. These tasks require prompts, model-specific settings, response parsing, validation, and controlled execution logic.

Instead of embedding this logic directly into multiple services, Monstrino centralizes it in a dedicated service:

`services/platform/ai-orchestrator`

This design keeps the rest of the platform AI-agnostic and allows AI-related changes to remain isolated within one bounded context.

---

# Why a Dedicated AI Service Exists

The AI Orchestrator exists to solve several architectural problems at once:

- centralize all AI scenarios in one place
- isolate prompt logic from business services
- prevent AI-specific implementation details from spreading across the platform
- provide a single operational point for monitoring AI-related failures
- allow AI clients and models to change without rewriting enrichment services
- keep AI execution controlled and scenario-based rather than fully dynamic

In practice, this means that services like `catalog-data-enricher` do not build prompts, configure models, or talk to Ollama directly. They only send domain input to the AI Orchestrator and receive the resulting structured output.

---

# High-Level Role in the Platform

The AI Orchestrator acts as an internal platform service.

A calling service, such as `catalog-data-enricher`, sends a request through a dedicated infrastructure client. Inside the AI Orchestrator, an API route delegates execution to a predefined Job. That Job initializes the correct AI client, applies the proper model settings, constructs the correct Use Case, and then runs the scenario.

This creates a controlled execution chain:

```text
Caller Service
  -> AIOrchestratorApiClient
  -> ai-orchestrator API route
  -> Job
  -> Use Case
  -> AI Client
  -> AI model
```

This chain is intentional. API routes do not directly create and configure Use Cases. Jobs are responsible for wiring the correct execution flow.
![Platform level](/img/ai-features/ai-orchestrator-platform-level.jpg)

---

# How Other Services Call It

The AI Orchestrator is not called directly by arbitrary services.

It is accessed through a dedicated client located in the infrastructure package:

`monstrino-infra -> AIOrchestratorApiClient`

This provides a stable integration point and keeps platform services decoupled from the internal structure of `ai-orchestrator`.

For example, when `catalog-data-enricher` needs AI-based enrichment, it sends release-related data through `AIOrchestratorApiClient`. The orchestrator then selects the corresponding scenario and executes it internally.

This means that if prompt logic or AI model settings change, only the AI Orchestrator needs to be updated. The calling service remains unchanged.

<!-- INSERT DIAGRAM: AI Scenario Lifecycle -->

---

# Scenario-Based Execution

The AI Orchestrator exposes predefined AI scenarios instead of generic prompt execution.

This is a key architectural decision.

Other services do not send arbitrary prompts like:

- “generate text”
- “run model”
- “ask AI something”

Instead, they call concrete scenarios such as:

- release enrichment
- character enrichment
- series enrichment
- image-based recognition
- accessory identification
- classification workflows

This keeps the service contract business-oriented and stable.

It also prevents prompt design from leaking into unrelated services.

---

# Internal Execution Model

Inside the service, AI execution follows a structured composition model:

```text
API Route
  -> Job
  -> Use Case (initialized with AIClient)
  -> AI Client
  -> AI model
  -> raw response
  -> Use Case parsing
  -> Pydantic response model
```

Each part has a clear role:

## Job

A Job is responsible for controlled orchestration of a specific scenario.

It decides:

- which AI client should be used
- which model settings should be applied
- which Use Case should be instantiated
- which input should be passed into execution

Jobs exist to ensure that API routes cannot freely assemble AI execution logic on their own.

## AI Client

The AI client is responsible only for talking to a model provider.

For example, `OllamaClient` knows:

- how to connect to Ollama
- which endpoint to call
- how to send requests
- how to receive raw responses

It does not know business rules, domain logic, or enrichment strategy.

## Use Case

A Use Case contains the scenario logic.

It knows:

- which prompts to use
- how to structure the interaction
- how to validate AI output
- how to convert raw model responses into typed result models
- how to request more information if the scenario requires multiple steps

The Use Case is where scenario intelligence lives.
![](/img/ai-features/ai-orchestrator-internal-execution-flow.jpg)
<!-- INSERT DIAGRAM: Internal Execution Flow -->

---

# Why Jobs Are Used

Jobs provide an additional control layer between API routes and Use Cases.

Without Jobs, an API route could become responsible for too much:

- choosing prompts
- configuring models
- instantiating AI clients
- selecting Use Cases
- controlling execution details

That would make API routes fragile and inconsistent.

With Jobs, API routes stay thin and predictable. They only delegate execution to a controlled internal workflow.

This improves maintainability and reduces the risk of accidental architectural drift.

---

# AI Client Abstractions

The AI Orchestrator defines abstract contracts for AI clients in:

`src/ports`

These abstractions ensure that different AI providers can be used without changing Use Case logic.

Example abstraction:

```python
class LLMClientInterface(Protocol):
    async def generate(self, llm_client_request: BaseLLMClientRequest) -> str:
        ...
```

This means that a Use Case depends on a stable interface rather than on a concrete provider implementation.

As a result, the same Use Case can work with:

- `OllamaClient`
- future local LLM clients
- future cloud LLM clients
- future vision-capable model clients

as long as they implement the required contract.

This follows the same architectural principle used elsewhere in Monstrino: domain and application logic depend on ports, while infrastructure provides adapters.

![](/img/ai-features/ai-orchestrator-client-abstraction.jpg)
<!-- INSERT DIAGRAM: Client Abstraction Diagram -->

---

# Prompt Organization

Prompt logic is stored inside the service rather than inside individual Use Case classes.

Prompt files are located in:

- `src/domain/prompts/`
- `src/domain/system-prompts/`

This is intentional.

Prompts are often large, evolve independently, and would make Use Cases noisy if embedded inline. Keeping them in dedicated domain folders makes them easier to manage, compare, and version.

It also supports a cleaner separation of responsibilities:

- Use Cases define the execution logic
- prompt files define the AI instructions
- clients handle transport to the model

---

# Structured Output Handling

AI clients always return raw text.

They do not parse responses into business models.

Each Use Case is responsible for:

- receiving the raw string response
- interpreting it according to the scenario
- converting it into a Pydantic response model
- validating that the structure is correct

This design keeps the AI client generic while allowing each scenario to define its own response schema.

In practice, the flow looks like this:

```text
AI model response (str)
  -> Use Case parsing
  -> Pydantic validation
  -> typed scenario result
```

This is important because different AI scenarios return different structures. A release enrichment result, an image analysis result, and a classification result should not be forced into one generic response model.

---

# Multi-Step AI Scenarios

The AI Orchestrator supports multi-step interaction flows.

In some scenarios, the first AI response is not the final answer. Instead, the model may indicate that additional information is needed.

For example, AI may analyze a release and return a structured command saying that more information about certain characters is required.

The flow then becomes:

```text
AI response
  -> command returned by model
  -> Use Case interprets command
  -> Use Case calls external service
  -> new context is added
  -> AI interaction continues
```

A concrete example:

1. AI analyzes a release.
2. AI infers that the release likely contains two characters.
3. AI returns a command requesting more information about those characters.
4. The Use Case calls `catalog-api-service`.
5. The Use Case sends the additional context back into the model conversation.
6. The AI continues reasoning until it can return a final structured result.

This pattern allows AI to participate in controlled iterative workflows without giving the model direct access to system services.
![](/img/ai-features/ai-orchestrator-multi-step-command-loop.jpg)
<!-- INSERT DIAGRAM: Multi-Step AI Command Loop -->

---

# AI Cannot Call Services Directly

A critical rule in Monstrino is that AI models cannot call backend services directly.

If a model needs additional information, it must return a structured command. The Use Case then decides whether that command is valid, which service should be called, and how the returned data should be incorporated.

This keeps all side effects and service-to-service communication in deterministic backend code.

AI remains a reasoning component, not an autonomous system actor.

---

# Vision and Image Processing Support

The AI Orchestrator also supports scenarios that require images.

For such cases, requests can include image payloads in addition to text input. This allows the service to run image-aware scenarios such as:

- identifying visible accessories
- detecting release contents
- classifying items from a product image
- assisting future image recognition features

This makes the orchestrator suitable not only for text enrichment but also for future vision-driven workflows.

---

# Why Centralization Matters

Centralizing AI in one service is not only a design preference. It is an operational and architectural strategy.

It provides:

- one source of truth for AI scenario execution
- one place to monitor failures and inconsistencies
- one place to update prompts and model settings
- one place to change AI providers
- one place to enforce execution boundaries

If an AI request breaks, the issue can be investigated in one service instead of being spread across the platform.

This is especially important in Monstrino because AI behavior is non-deterministic and operationally more fragile than standard business logic.

---

# Boundaries of Responsibility

The AI Orchestrator is an execution service, not a domain owner.

It should not:

- read the database directly
- write to the database directly
- own canonical business state
- make final business decisions
- silently modify platform data

If additional information is required, the orchestrator must request it through controlled Use Case logic and approved service integrations.

This boundary keeps AI useful without letting it become a hidden source of platform complexity.

---

# Benefits of This Architecture

This design gives Monstrino several important advantages:

- AI changes stay isolated in one service
- calling services remain simple
- prompts can evolve without changing consumers
- models can be replaced behind stable interfaces
- structured outputs can be validated per scenario
- multi-step workflows remain controlled by backend code
- AI stays assistive rather than autonomous

Overall, the AI Orchestrator makes AI usable in production-like workflows without allowing AI logic to leak into the rest of the platform.

---

# Summary

The `ai-orchestrator` service is Monstrino’s centralized AI execution layer.

It exists to provide:

- scenario-based AI workflows
- stable internal APIs for calling services
- model abstraction through client interfaces
- prompt isolation
- typed result parsing
- controlled multi-step execution

Most importantly, it ensures that Monstrino can use AI in a powerful way while keeping the rest of the platform deterministic, maintainable, and operationally understandable.