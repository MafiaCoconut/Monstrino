import type { ReactNode } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { uiTokens } from "../tokens";

export type SectionSize = "sm" | "md";

export interface SectionProps {
  title: string;
  children: ReactNode;
  size?: SectionSize;
  rightSlot?: ReactNode;
  showDivider?: boolean;
}

/**
 * Page section wrapper with standardized header.
 * Generic, non-domain specific component.
 */
export function Section({
  title,
  children,
  size = "md",
  rightSlot,
  showDivider = true,
}: SectionProps) {
  const marginTop = size === "sm" ? { xs: 4, md: 6 } : { xs: 6, md: 8 };

  return (
    <Box sx={{ mt: marginTop }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            aria-hidden
            sx={{
              width: 10,
              height: 40,
              borderRadius: 99,
              background: uiTokens.rail,
              boxShadow: uiTokens.railGlow,
              opacity: 0.9,
            }}
          />
          <Box>
            <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.55 }}>
              SECTION
            </Typography>
            <Typography variant="h5" sx={{ lineHeight: 1.05, letterSpacing: 0.2 }}>
              {title || "-"}
            </Typography>
          </Box>
        </Box>

        {rightSlot ? <Box>{rightSlot}</Box> : null}
      </Box>

      {showDivider ? <Divider sx={{ opacity: 0.1, mb: 3 }} /> : null}

      {children}
    </Box>
  );
}
