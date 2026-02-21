from typing import Type, Any

from pydantic import BaseModel


class PydanticSchemaFactory:
    """
    Build a JSON Schema (as dict) suitable for Ollama `format`.
    Goal: produce a schema WITHOUT $ref / $defs (inlined), and with additionalProperties=false everywhere.

    Usage:
        schema = OllamaJsonSchemaFactory.for_model(GetCharacterSeriesFromReleaseTitleResponse)
        # then pass `schema` into Ollama request as `format=schema`
    """

    @classmethod
    def for_model(cls, model: Type[BaseModel]) -> dict[str, Any]:
        schema = model.model_json_schema()  # Pydantic v2 schema
        defs = schema.get("$defs", {})

        # Inline $ref everywhere to avoid Ollama incompatibilities with references.
        schema = cls._inline_refs(schema, defs)

        # Drop defs (now unused) + harden: additionalProperties=false
        schema.pop("$defs", None)
        cls._enforce_no_additional_properties(schema)

        # Optional: remove titles/description noise if you want smaller payload
        # cls._strip_metadata(schema)

        return schema

    @classmethod
    def _inline_refs(cls, node: Any, defs: dict[str, Any]) -> Any:
        if isinstance(node, dict):
            # Resolve $ref of shape "#/$defs/Name"
            if "$ref" in node:
                ref = node["$ref"]
                prefix = "#/$defs/"
                if ref.startswith(prefix):
                    name = ref[len(prefix) :]
                    if name not in defs:
                        raise KeyError(f"Unknown $defs ref: {ref}")
                    # Inline definition, and merge sibling keys (rare but possible)
                    resolved = cls._inline_refs(defs[name], defs)
                    siblings = {k: v for k, v in node.items() if k != "$ref"}
                    if siblings:
                        if isinstance(resolved, dict):
                            merged = dict(resolved)
                            merged.update(cls._inline_refs(siblings, defs))
                            return merged
                        # if resolved isn't a dict, siblings don't make sense; ignore
                    return resolved

            return {k: cls._inline_refs(v, defs) for k, v in node.items()}

        if isinstance(node, list):
            return [cls._inline_refs(x, defs) for x in node]

        return node

    @classmethod
    def _enforce_no_additional_properties(cls, node: Any) -> None:
        """
        Recursively set additionalProperties=false for all object schemas.
        """
        if isinstance(node, dict):
            if node.get("type") == "object":
                node.setdefault("additionalProperties", False)

            for v in node.values():
                cls._enforce_no_additional_properties(v)

        elif isinstance(node, list):
            for x in node:
                cls._enforce_no_additional_properties(x)

    @classmethod
    def _strip_metadata(cls, node: Any) -> None:
        """
        Optional: remove human-facing keys to reduce schema size.
        """
        if isinstance(node, dict):
            node.pop("title", None)
            node.pop("description", None)
            for v in node.values():
                cls._strip_metadata(v)
        elif isinstance(node, list):
            for x in node:
                cls._strip_metadata(x)
