class InvalidUserData(Exception):
    def __init__(self, message: str, invalid_type_of_data: str) -> None:
        super().__init__(message, invalid_type_of_data)