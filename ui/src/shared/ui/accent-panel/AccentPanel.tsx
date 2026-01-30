import type { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { uiTokens } from "../tokens";

export type PanelAccent = "gradient" | "pink" | "purple" | "green" | "red";
export type PanelDensity = "comfortable" | "compact";

export interface AccentPanelProps {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  accent?: PanelAccent;
  density?: PanelDensity;
  children: ReactNode;
}

/**
 * Section wrapper with accent rail and header area.
 * Generic, non-domain specific component.
 */
export function AccentPanel({
  title,
  subtitle,
  rightSlot,
  accent = "gradient",
  density = "comfortable",
  children,
}: AccentPanelProps) {
  const rail =
    accent === "pink"
      ? uiTokens.accentPink
      : accent === "purple"
        ? uiTokens.accentPurple
        : accent === "green"
          ? uiTokens.accentGreen
          : accent === "red"
            ? uiTokens.accentRed
            : uiTokens.rail;

  const padding = density === "compact" ? { xs: 1.5, md: 2 } : { xs: 2, md: 3 };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        background: uiTokens.panelBg,
        border: `1px solid ${uiTokens.border}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "stretch" }}>
        <Box aria-hidden sx={{ width: 10, background: rail, opacity: 0.9 }} />

        <Box sx={{ flex: "1 1 auto", p: padding }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 2,
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: 2.8, opacity: 0.7 }}>
                {title || "-"}
              </Typography>
              {subtitle ? (
                <Typography sx={{ mt: 0.5, opacity: 0.82 }}>{subtitle}</Typography>
              ) : null}
            </Box>

            {rightSlot ? <Box sx={{ display: "flex", gap: 1 }}>{rightSlot}</Box> : null}
          </Box>

          {children}
        </Box>
      </Box>
    </Paper>
  );
}
