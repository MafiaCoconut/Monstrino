"""Custom exceptions for the application."""


class BackgroundRemovalError(Exception):
    """Base exception for background removal service."""

    pass


class ModelLoadError(BackgroundRemovalError):
    """Exception raised when model loading fails."""

    pass


class ImageProcessingError(BackgroundRemovalError):
    """Exception raised during image processing."""

    pass


class DetectionError(BackgroundRemovalError):
    """Exception raised when object detection fails."""

    pass


class SegmentationError(BackgroundRemovalError):
    """Exception raised when segmentation fails."""

    pass


class InvalidInputError(BackgroundRemovalError):
    """Exception raised for invalid input data."""

    pass
