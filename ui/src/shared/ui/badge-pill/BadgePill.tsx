import { Box, Typography } from "@mui/material";
import { getToneColor, uiTokens } from "../tokens";
import type { BadgeTone } from "../tokens";

export type BadgePillSize = "sm" | "md";
export type BadgePillVariant = "soft" | "outline" | "solid";

export interface BadgePillProps {
  text: string;
  tone?: BadgeTone;
  size?: BadgePillSize;
  variant?: BadgePillVariant;
}

/**
 * Small badge label with color dot.
 * Generic, non-domain specific component.
 */
export function BadgePill({
  text,
  tone = "neutral",
  size = "md",
  variant = "soft",
}: BadgePillProps) {
  const dotColor = getToneColor(tone);
  const padding = size === "sm" ? { px: 1, py: 0.45 } : { px: 1.25, py: 0.55 };

  const background =
    variant === "solid"
      ? dotColor
      : variant === "outline"
        ? "transparent"
        : uiTokens.overlayGlass;

  const borderColor =
    variant === "solid" ? "transparent" : uiTokens.borderSoft;

  const textColor = variant === "solid" ? uiTokens.textOnAccent : "inherit";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        borderRadius: 99,
        border: `1px solid ${borderColor}`,
        background,
        backdropFilter: variant === "soft" ? "blur(6px)" : "none",
        ...padding,
      }}
    >
      <Box sx={{ width: 6, height: 6, borderRadius: 99, background: dotColor, opacity: 0.9 }} />
      <Typography
        variant="caption"
        sx={{ letterSpacing: 2.0, textTransform: "uppercase", opacity: 0.88, color: textColor }}
      >
        {text || "-"}
      </Typography>
    </Box>
  );
}
