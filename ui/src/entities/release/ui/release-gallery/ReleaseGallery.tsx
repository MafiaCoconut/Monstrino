import * as React from "react";
import { Box, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";

export interface ReleaseGalleryProps {
  activeImage?: string;
  onSelect?: (src: string) => void;
  images?: string[];
  mainHeight?: number;
  thumbSize?: number;
  ariaLabel?: string;
}

const mainImageSx = {
  width: "100%",
  objectFit: "contain",
  borderRadius: 2,
  background: uiTokens.surfaceImage,
  border: `1px solid ${uiTokens.borderSoft}`,
} as const;

const thumbStripSx = {
  mt: 2,
  display: "flex",
  gap: 1,
  overflowX: "auto",
  pb: 0.75,
  scrollSnapType: "x mandatory",
  "&::-webkit-scrollbar": { height: 6 },
  "&::-webkit-scrollbar-thumb": {
    background: uiTokens.scrollbarThumb,
    borderRadius: 99,
  },
} as const;

const thumbBaseSx = {
  flex: "0 0 auto",
  borderRadius: 2,
  cursor: "pointer",
  position: "relative",
  scrollSnapAlign: "start",
  background: uiTokens.surfaceBase,
  border: `1px solid ${uiTokens.borderSoft}`,
  transition: "transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease",
  "&:hover": {
    transform: "translateY(-1px)",
    borderColor: uiTokens.accentBorderHover,
    boxShadow: uiTokens.accentGlowHover,
  },
  "&:focus-visible": {
    outline: uiTokens.focusRing,
    outlineOffset: 2,
  },
} as const;

const thumbSelectedSx = {
  border: `1px solid ${uiTokens.accentBorderSelected}`,
  boxShadow: uiTokens.accentGlowSelected,
} as const;

const placeholderSx = {
  width: "100%",
  height: "100%",
  display: "grid",
  placeItems: "center",
  color: uiTokens.textDim,
} as const;

/**
 * Image gallery with thumbnails and keyboard support.
 */
export function ReleaseGallery({
  activeImage,
  onSelect,
  images = [],
  mainHeight = 520,
  thumbSize = 76,
  ariaLabel = "Release image gallery",
}: ReleaseGalleryProps) {
  const safeImages = React.useMemo(() => images.filter(Boolean), [images]);
  const displayImage = activeImage || safeImages[0] || "";

  const handleSelect = React.useCallback(
    (src: string) => {
      if (onSelect) onSelect(src);
    },
    [onSelect]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, src: string) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelect(src);
      }
    },
    [handleSelect]
  );

  return (
    <Box aria-label={ariaLabel} role="region">
      <Box sx={{ ...mainImageSx, height: mainHeight }}>
        {displayImage ? (
          <Box component="img" src={displayImage} alt="Selected release image" sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <Box sx={placeholderSx} role="img" aria-label="No image available">
            <Typography variant="caption">No image</Typography>
          </Box>
        )}
      </Box>

      {safeImages.length ? (
        <Box sx={thumbStripSx} aria-label="Release thumbnails">
          {safeImages.map((src, idx) => {
            const selected = src === displayImage;
            return (
              <Box
                key={`${src}-${idx}`}
                role="button"
                tabIndex={0}
                aria-label={`Select image ${idx + 1}`}
                onClick={() => handleSelect(src)}
                onKeyDown={(event) => handleKeyDown(event, src)}
                sx={{
                  ...thumbBaseSx,
                  ...(selected ? thumbSelectedSx : null),
                  width: thumbSize,
                  height: thumbSize,
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  sx={{ width: "100%", height: "100%", objectFit: "contain", opacity: selected ? 1 : 0.88 }}
                />
              </Box>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
}
