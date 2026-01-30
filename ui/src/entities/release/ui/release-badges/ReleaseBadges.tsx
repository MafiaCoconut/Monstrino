import * as React from "react";
import { Box } from "@mui/material";
import { BadgePill } from "@/shared/ui/badge-pill";
import type { BadgePillSize, BadgePillVariant } from "@/shared/ui/badge-pill";

export type ReleaseBadgesDensity = "compact" | "comfortable";

export interface ReleaseBadgesProps {
  character?: string;
  series?: string;
  year?: string;
  exclusive?: string;
  modelNumber?: string;
  size?: BadgePillSize;
  variant?: BadgePillVariant;
  density?: ReleaseBadgesDensity;
}

/**
 * Display-only release metadata badges.
 */
export function ReleaseBadges({
  character,
  series,
  year,
  exclusive,
  modelNumber,
  size = "md",
  variant = "soft",
  density = "comfortable",
}: ReleaseBadgesProps) {
  const badges = React.useMemo(() => {
    const entries = [
      { label: character, tone: "neutral" as const },
      { label: series, tone: "neutral" as const },
      { label: year, tone: "neutral" as const },
      { label: exclusive, tone: "pink" as const },
      { label: modelNumber ? `Model ${modelNumber}` : undefined, tone: "neutral" as const },
    ].filter((item) => item.label && item.label.trim().length > 0);

    if (!entries.length) {
      return [{ label: "-", tone: "neutral" as const }];
    }

    return entries;
  }, [character, series, year, exclusive, modelNumber]);

  const gap = density === "compact" ? 0.75 : 1;
  const rowGap = density === "compact" ? 0.5 : 0.75;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap, rowGap, mb: 3 }}>
      {badges.map((badge) => (
        <BadgePill key={badge.label} text={badge.label} tone={badge.tone} size={size} variant={variant} />
      ))}
    </Box>
  );
}
