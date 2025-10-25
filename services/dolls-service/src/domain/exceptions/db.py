class RepositoryError(Exception):
    """Base repository exception."""

class EntityNotFound(RepositoryError):
    """Raised when an entity is not found in the database."""

class UniqueConstraintViolation(RepositoryError):
    """Raised when insert/update violates unique constraint."""

class DBConnectionError(RepositoryError):
    """Raised when database connection fails."""
