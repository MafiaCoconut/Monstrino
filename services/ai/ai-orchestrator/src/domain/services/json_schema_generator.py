class JsonSchemaGenerator:
    @staticmethod
    def guess_json_type(value):
        if value is None:
            return {"type": ["null"]}
        if isinstance(value, bool):
            return {"type": "boolean"}
        if isinstance(value, int):
            return {"type": "integer"}
        if isinstance(value, float):
            return {"type": "number"}
        if isinstance(value, str):
            return {"type": "string"}
        if isinstance(value, list):
            # Тип элементов неизвестен, можно разрешить любой
            return {
                "type": "array",
                "items": {}
            }
        if isinstance(value, dict):
            return JsonSchemaGenerator.make_schema_from_dict(value)

        # На случай неизвестных типов
        return {"type": "string"}

    @staticmethod
    def make_schema_from_dict(d: dict):
        return {
            "type": "object",
            "properties": {
                key: JsonSchemaGenerator.guess_json_type(value)
                for key, value in d.items()
            },
            "required": list(d.keys())
        }
