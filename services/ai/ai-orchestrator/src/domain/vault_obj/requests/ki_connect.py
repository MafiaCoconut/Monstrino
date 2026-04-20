from __future__ import annotations

from typing import Any, Optional, Union, Literal

from pydantic import BaseModel, Field, ConfigDict

from .base_llm_text_client_request import BaseLLMClientRequest


class FunctionCallData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: Optional[str] = None
    arguments: Optional[str] = None


class ToolCallData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: Optional[str] = None
    type: Optional[str] = None
    function: Optional[FunctionCallData] = None


class ChatMessageData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    role: str
    content: Optional[Union[str, list[dict[str, Any]]]] = None
    name: Optional[str] = None
    tool_call_id: Optional[str] = None
    tool_calls: Optional[list[ToolCallData]] = None


class ToolChoiceData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    mode: Optional[str] = None
    type: Optional[str] = None
    functionName: Optional[str] = None


class ToolFunctionDefinitionData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    description: Optional[str] = None
    parameters: Optional[dict[str, Any]] = None
    strict: Optional[bool] = None


class ToolDefinitionData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    type: str
    function: ToolFunctionDefinitionData


class ResponseFormatJsonSchemaData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    description: Optional[str] = None
    schema: Optional[dict[str, Any]] = None
    strict: Optional[bool] = None


class ResponseFormatData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    type: str
    json_schema: Optional[ResponseFormatJsonSchemaData] = None


class StreamOptionsData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    include_usage: Optional[bool] = None


class PredictionData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    type: Optional[str] = None
    content: Optional[Union[str, list[dict[str, Any]]]] = None


class KIConnectClientRequest(BaseLLMClientRequest):
    model_config = ConfigDict(extra="forbid")

    messages: list[ChatMessageData] = Field(min_length=1)
    model: Optional[str]

    frequency_penalty: Optional[float] = None
    logit_bias: Optional[dict[str, float]] = None
    logprobs: Optional[bool] = None
    max_completion_tokens: Optional[int] = None
    metadata: Optional[dict[str, Any]] = None
    parallel_tool_calls: Optional[bool] = None
    prediction: Optional[PredictionData] = None
    presence_penalty: Optional[float] = None
    reasoning_effort: Optional[str] = None
    response_format: Optional[ResponseFormatData] = None

    seed: Optional[int] = None
    stop: Optional[Union[list[str], str]] = None
    stream: Optional[bool] = None
    stream_options: Optional[StreamOptionsData] = None
    temperature: Optional[float] = None
    tool_choice: Optional[ToolChoiceData] = None
    tools: Optional[list[ToolDefinitionData]] = None
    top_logprobs: Optional[int] = None
    top_p: Optional[float] = None


# example_request = KIConnectClientRequest(
#     model="gpt-4.1",
#     messages=[
#         ChatMessageData(
#             role="system",
#             content="You are a precise assistant. Always return valid JSON only."
#         ),
#         ChatMessageData(
#             role="user",
#             content="Find Berlin weather and summarize it in JSON."
#         ),
#         ChatMessageData(
#             role="assistant",
#             content=None,
#             tool_calls=[
#                 ToolCallData(
#                     id="call_weather_001",
#                     type="function",
#                     function=FunctionCallData(
#                         name="get_weather",
#                         arguments='{"city":"Berlin","unit":"celsius"}'
#                     )
#                 )
#             ]
#         ),
#         ChatMessageData(
#             role="tool",
#             tool_call_id="call_weather_001",
#             content='{"city":"Berlin","temp":18,"condition":"cloudy"}'
#         )
#     ],
#     frequency_penalty=0.1,
#     logit_bias={
#         "50256": -100.0
#     },
#     logprobs=True,
#     max_completion_tokens=500,
#     metadata={
#         "request_id": "req-123456",
#         "tenant": "demo",
#         "feature": "weather-summary"
#     },
#     parallel_tool_calls=False,
#     prediction=PredictionData(
#         type="content",
#         content="!!!json\n{\"city\":\"Berlin\",\"summary\":\"...\"}\n!!!"
#     ),
#     presence_penalty=0.2,
#     reasoning_effort="medium",
#     response_format=ResponseFormatData(
#         type="json_schema",
#         json_schema=ResponseFormatJsonSchemaData(
#             name="weather_summary",
#             description="Structured weather summary",
#             schema={
#                 "type": "object",
#                 "properties": {
#                     "city": {"type": "string"},
#                     "temperature": {"type": "number"},
#                     "condition": {"type": "string"},
#                     "summary": {"type": "string"}
#                 },
#                 "required": ["city", "temperature", "condition", "summary"],
#                 "additionalProperties": False
#             },
#             strict=True
#         )
#     ),
#     seed=42,
#     stop=["<END>", "STOP_HERE"],
#     stream=True,
#     stream_options=StreamOptionsData(
#         include_usage=True
#     ),
#     temperature=0.7,
#     tool_choice=ToolChoiceData(
#         mode="auto",
#         type="function",
#         functionName="get_weather"
#     ),
#     tools=[
#         ToolDefinitionData(
#             type="function",
#             function=ToolFunctionDefinitionData(
#                 name="get_weather",
#                 description="Get current weather by city",
#                 parameters={
#                     "type": "object",
#                     "properties": {
#                         "city": {"type": "string"},
#                         "unit": {
#                             "type": "string",
#                             "enum": ["celsius", "fahrenheit"]
#                         }
#                     },
#                     "required": ["city"],
#                     "additionalProperties": False
#                 },
#                 strict=True
#             )
#         ),
#         ToolDefinitionData(
#             type="function",
#             function=ToolFunctionDefinitionData(
#                 name="get_timezone",
#                 description="Get timezone by city",
#                 parameters={
#                     "type": "object",
#                     "properties": {
#                         "city": {"type": "string"}
#                     },
#                     "required": ["city"],
#                     "additionalProperties": False
#                 },
#                 strict=False
#             )
#         )
#     ],
#     top_logprobs=5,
#     top_p=0.95
# )
#
# payload_dict = example_request.model_dump(exclude_none=True)
# payload_json = example_request.model_dump_json(exclude_none=True, indent=2)
#
# print(payload_json)