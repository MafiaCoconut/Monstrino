import { Box, Typography } from "@mui/material";
import { getToneColor, uiTokens } from "../tokens";
import type { BadgeTone } from "../tokens";

export type KpiVariant = "soft" | "outline";
export type KpiSize = "sm" | "md";

export interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: Exclude<BadgeTone, "red">;
  variant?: KpiVariant;
  size?: KpiSize;
}

/**
 * Key-value metric card.
 * Generic, non-domain specific component.
 */
export function KpiCard({
  label,
  value,
  hint,
  tone = "neutral",
  variant = "soft",
  size = "md",
}: KpiCardProps) {
  const toneColor = tone === "neutral" ? "inherit" : getToneColor(tone);
  const padding = size === "sm" ? 1.5 : 2;
  const background = variant === "outline" ? "transparent" : uiTokens.softBg;

  return (
    <Box
      sx={{
        p: padding,
        borderRadius: 2.5,
        background,
        border: `1px solid ${uiTokens.border}`,
      }}
    >
      <Typography variant="caption" sx={{ letterSpacing: 2.2, textTransform: "uppercase", opacity: 0.55 }}>
        {label || "-"}
      </Typography>
      <Typography sx={{ mt: 0.8, fontSize: 18, lineHeight: 1.1, color: toneColor, opacity: 0.95 }}>
        {value || "-"}
      </Typography>
      {hint ? (
        <Typography variant="caption" sx={{ mt: 0.6, display: "block", opacity: 0.65 }}>
          {hint}
        </Typography>
      ) : null}
    </Box>
  );
}
