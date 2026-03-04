"""Segmentation service using GroundingDINO + SAM2."""

import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Literal, Optional

import cv2
import numpy as np
import torch
from PIL import Image

from app.config import settings
from app.core.exceptions import DetectionError, ModelLoadError, SegmentationError
from app.core.logging import get_logger
from app.services.model_loader import (
    device_manager,
    get_groundingdino_checkpoint,
    get_sam2_checkpoint,
)

logger = get_logger(__name__)


@dataclass
class DetectionResult:
    """Result from object detection."""

    bbox: tuple[int, int, int, int]  # x1, y1, x2, y2
    score: float
    label: str


@dataclass
class SegmentationResult:
    """Result from segmentation."""

    mask: np.ndarray  # Binary mask (H, W) with values 0 or 255
    bbox: tuple[int, int, int, int]  # x1, y1, x2, y2
    score: float
    label: str
    inference_time_ms: float


class SegmentationService:
    """Service for object detection and segmentation."""

    def __init__(self) -> None:
        self._detector: Optional[Any] = None
        self._sam2: Optional[Any] = None
        self._detection_model_loaded = False
        self._sam_model_loaded = False

    def _load_grounding_dino(self) -> Any:
        """Load GroundingDINO model.

        Returns:
            GroundingDINO model
        """
        if self._detector is not None and self._detection_model_loaded:
            return self._detector

        try:
            logger.info("loading_groundingdino")
            start_time = time.time()

            # Import GroundingDINO
            try:
                from groundingdino.models import build_model
                from groundingdino.util.slconfig import SLConfig
                from groundingdino.util.utils import clean_state_dict
            except ImportError as e:
                raise ModelLoadError(
                    "GroundingDINO not installed. Install with: "
                    "pip install git+https://github.com/IDEA-Research/GroundingDINO.git"
                ) from e

            # Get checkpoint
            checkpoint_path = get_groundingdino_checkpoint()

            # Load config (using default config from GroundingDINO)
            config_path = Path(__file__).parent.parent.parent / \
                "configs" / "groundingdino_config.py"
            if not config_path.exists():
                # Use embedded minimal config
                config_dict = self._get_default_groundingdino_config()
                args = SLConfig(config_dict)
            else:
                args = SLConfig.fromfile(str(config_path))

            # Build model
            model = build_model(args)
            checkpoint = torch.load(str(checkpoint_path), map_location="cpu")
            model.load_state_dict(clean_state_dict(
                checkpoint["model"]), strict=False)
            model.eval()

            # Force CPU for GroundingDINO (ROCm compatibility issue)
            # GroundingDINO uses CUDA-specific ops that don't work with ROCm
            model = model.to(torch.device("cpu"))

            load_time = (time.time() - start_time) * 1000
            logger.info("groundingdino_loaded",
                        load_time_ms=load_time, device="cpu (forced)")

            self._detector = model
            self._detection_model_loaded = True
            return model

        except Exception as e:
            logger.error("groundingdino_load_failed", error=str(e))
            raise ModelLoadError(f"Failed to load GroundingDINO: {e}") from e

    def _load_sam2(self) -> Any:
        """Load SAM2 model.

        Returns:
            SAM2 predictor
        """
        if self._sam2 is not None and self._sam_model_loaded:
            return self._sam2

        try:
            logger.info("loading_sam2")
            start_time = time.time()

            # Import SAM2
            try:
                from sam2.build_sam import build_sam2
                from sam2.sam2_image_predictor import SAM2ImagePredictor
            except ImportError as e:
                raise ModelLoadError(
                    "SAM2 not installed. Install with: "
                    "pip install git+https://github.com/facebookresearch/segment-anything-2.git"
                ) from e

            # Get checkpoint
            checkpoint_path = get_sam2_checkpoint(model_size="small")

            # Load model
            sam2_model = build_sam2(
                config_file="sam2_hiera_s.yaml",
                ckpt_path=str(checkpoint_path),
                device=device_manager.device,
            )
            predictor = SAM2ImagePredictor(sam2_model)

            load_time = (time.time() - start_time) * 1000
            logger.info("sam2_loaded", load_time_ms=load_time,
                        device=device_manager.device)

            self._sam2 = predictor
            self._sam_model_loaded = True
            return predictor

        except Exception as e:
            logger.error("sam2_load_failed", error=str(e))
            raise ModelLoadError(f"Failed to load SAM2: {e}") from e

    def _get_default_groundingdino_config(self) -> dict[str, Any]:
        """Get default GroundingDINO config."""
        return {
            "modelname": "groundingdino",
            "backbone": "swin_T_224_1k",
            "position_embedding": "sine",
            "pe_temperatureH": 20,
            "pe_temperatureW": 20,
            "return_interm_indices": [1, 2, 3],
            "backbone_freeze_keywords": None,
            "enc_layers": 6,
            "dec_layers": 6,
            "pre_norm": False,
            "dim_feedforward": 2048,
            "hidden_dim": 256,
            "dropout": 0.0,
            "nheads": 8,
            "num_queries": 900,
            "query_dim": 4,
            "num_patterns": 0,
            "num_feature_levels": 4,
            "enc_n_points": 4,
            "dec_n_points": 4,
            "two_stage_type": "standard",
            "two_stage_bbox_embed_share": False,
            "two_stage_class_embed_share": False,
            "transformer_activation": "relu",
            "dec_pred_bbox_embed_share": True,
            "dn_box_noise_scale": 1.0,
            "dn_label_noise_ratio": 0.5,
            "dn_label_coef": 1.0,
            "dn_bbox_coef": 1.0,
            "embed_init_tgt": True,
            "dn_labelbook_size": 2000,
            "max_text_len": 256,
            "text_encoder_type": "bert-base-uncased",
            "use_text_enhancer": True,
            "use_fusion_layer": True,
            "use_checkpoint": True,
            "use_transformer_ckpt": True,
            "use_text_cross_attention": True,
            "text_dropout": 0.0,
            "fusion_dropout": 0.0,
            "fusion_droppath": 0.1,
            "sub_sentence_present": True,
        }

    def detect_objects(
        self,
        image: np.ndarray,
        prompt: str,
        box_threshold: Optional[float] = None,
        text_threshold: Optional[float] = None,
    ) -> list[DetectionResult]:
        """Detect objects in image based on text prompt.

        Args:
            image: Input image (RGB, numpy array)
            prompt: Text description of objects to detect
            box_threshold: Confidence threshold for boxes
            text_threshold: Confidence threshold for text matching

        Returns:
            List of detected objects

        Raises:
            DetectionError: If detection fails
        """
        try:
            model = self._load_grounding_dino()

            box_thr = box_threshold or settings.box_threshold
            text_thr = text_threshold or settings.text_threshold

            # Prepare image
            from groundingdino.util.inference import preprocess_caption
            from groundingdino.util.utils import get_phrases_from_posmap

            caption = preprocess_caption(caption=prompt)

            # Convert to tensor
            # Force CPU for GroundingDINO (ROCm compatibility)
            image_tensor = torch.from_numpy(
                image).permute(2, 0, 1).float() / 255.0
            image_tensor = image_tensor.unsqueeze(0).to(torch.device("cpu"))

            # Run detection
            with torch.no_grad():
                outputs = model(image_tensor, captions=[caption])

            # Process outputs
            # (num_queries, num_classes)
            logits = outputs["pred_logits"].sigmoid()[0]
            boxes = outputs["pred_boxes"][0]  # (num_queries, 4)

            # Filter by threshold
            max_logits = logits.max(dim=1)[0]

            # Log detection statistics
            if len(max_logits) > 0:
                top_confidences = max_logits.topk(min(5, len(max_logits)))[
                    0].cpu().numpy()
                logger.info(
                    "detection_confidences",
                    top_5_scores=top_confidences.tolist(),
                    threshold=box_thr,
                    prompt=prompt
                )

            mask = max_logits > box_thr

            logits = logits[mask]
            boxes = boxes[mask]

            # Convert boxes to pixel coordinates
            h, w = image.shape[:2]
            boxes = boxes.cpu().numpy()
            boxes[:, [0, 2]] *= w
            boxes[:, [1, 3]] *= h

            # Convert from center format to corner format
            boxes_xyxy = np.zeros_like(boxes)
            boxes_xyxy[:, 0] = boxes[:, 0] - boxes[:, 2] / 2  # x1
            boxes_xyxy[:, 1] = boxes[:, 1] - boxes[:, 3] / 2  # y1
            boxes_xyxy[:, 2] = boxes[:, 0] + boxes[:, 2] / 2  # x2
            boxes_xyxy[:, 3] = boxes[:, 1] + boxes[:, 3] / 2  # y2

            # Get labels
            tokenizer = model.tokenizer
            tokenized = tokenizer(caption)

            results = []
            for idx, (box, logit) in enumerate(zip(boxes_xyxy, logits.cpu().numpy())):
                score = float(logit.max())
                if score < text_thr:
                    continue

                label_idx = int(logit.argmax())
                phrases = get_phrases_from_posmap(
                    logit > text_thr,
                    tokenized,
                    tokenizer,
                )
                label = phrases[0] if phrases else prompt

                results.append(
                    DetectionResult(
                        bbox=(int(box[0]), int(box[1]),
                              int(box[2]), int(box[3])),
                        score=score,
                        label=label,
                    )
                )

            logger.info("detection_complete", prompt=prompt,
                        num_detections=len(results))
            return results

        except Exception as e:
            logger.error("detection_failed", prompt=prompt, error=str(e))
            raise DetectionError(f"Object detection failed: {e}") from e

    def segment_object(
        self,
        image: np.ndarray,
        detection: DetectionResult,
    ) -> np.ndarray:
        """Segment object using SAM2 based on detection bbox.

        Args:
            image: Input image (RGB, numpy array)
            detection: Detection result with bbox

        Returns:
            Binary mask (H, W) with values 0 or 255

        Raises:
            SegmentationError: If segmentation fails
        """
        try:
            predictor = self._load_sam2()

            # Set image
            predictor.set_image(image)

            # Prepare bbox (SAM2 expects [x1, y1, x2, y2])
            bbox = np.array(detection.bbox)

            # Predict mask
            masks, scores, _ = predictor.predict(
                point_coords=None,
                point_labels=None,
                box=bbox[None, :],
                multimask_output=False,
            )

            # Get best mask
            mask = masks[0]  # (H, W) boolean

            # Convert to uint8
            mask_uint8 = (mask.astype(np.uint8) * 255)

            logger.debug("segmentation_complete", mask_shape=mask_uint8.shape)
            return mask_uint8

        except Exception as e:
            logger.error("segmentation_failed", error=str(e))
            raise SegmentationError(f"Segmentation failed: {e}") from e

    def process(
        self,
        image: np.ndarray,
        prompt: str,
        mode: Literal["best", "largest", "all"] = "best",
    ) -> list[SegmentationResult]:
        """Full pipeline: detect + segment objects.

        Args:
            image: Input image (RGB, numpy array)
            prompt: Text description of objects to detect
            mode: Object selection mode
                - "best": Return highest confidence detection
                - "largest": Return largest detected object
                - "all": Return all detections

        Returns:
            List of segmentation results
        """
        start_time = time.time()

        # Detect objects
        detections = self.detect_objects(image, prompt)

        if not detections:
            logger.warning("no_objects_detected", prompt=prompt)
            return []

        # Select detections based on mode
        if mode == "best":
            detections = [max(detections, key=lambda d: d.score)]
        elif mode == "largest":
            detections = [
                max(
                    detections,
                    key=lambda d: (d.bbox[2] - d.bbox[0]) *
                    (d.bbox[3] - d.bbox[1]),
                )
            ]
        # For "all", keep all detections

        # Segment each detection
        results = []
        for detection in detections:
            mask = self.segment_object(image, detection)

            inference_time = (time.time() - start_time) * 1000

            results.append(
                SegmentationResult(
                    mask=mask,
                    bbox=detection.bbox,
                    score=detection.score,
                    label=detection.label,
                    inference_time_ms=inference_time,
                )
            )

        logger.info(
            "segmentation_pipeline_complete",
            prompt=prompt,
            mode=mode,
            num_results=len(results),
            total_time_ms=inference_time,
        )

        return results


# Global segmentation service instance
segmentation_service = SegmentationService()
