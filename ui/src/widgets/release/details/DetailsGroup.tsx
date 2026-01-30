import type { ReactNode } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";

export type DetailsAccent = "purple" | "pink" | "green" | "red" | "gradient";

export interface DetailsGroupProps {
  title: string;
  accent?: DetailsAccent;
  children: ReactNode;
}

export function DetailsGroup({ title, accent = "purple", children }: DetailsGroupProps) {
  const accentColor =
    accent === "gradient"
      ? uiTokens.rail
      : accent === "pink"
        ? uiTokens.accentPink
        : accent === "green"
          ? uiTokens.accentGreen
          : accent === "red"
            ? uiTokens.accentRed
            : uiTokens.accentPurple;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        background: uiTokens.surfaceTile,
        border: `1px solid ${uiTokens.border}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box aria-hidden sx={{ height: 6, background: accentColor, opacity: 0.9 }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="overline" sx={{ letterSpacing: 2.8, opacity: 0.75 }}>
          {title}
        </Typography>
        <Divider sx={{ my: 1.75, opacity: 0.1 }} />
        {children}
      </Box>
    </Paper>
  );
}
