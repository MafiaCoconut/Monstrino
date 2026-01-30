import { Box, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";

export interface HeroDescriptionProps {
  description: string;
  maxHeight?: number;
  scrollOnDesktop?: boolean;
}

export function HeroDescription({
  description,
  maxHeight,
  scrollOnDesktop = true,
}: HeroDescriptionProps) {
  return (
    <Box
      sx={{
        flex: "1 1 auto",
        minHeight: 0,
        pr: { xs: 0, md: 1 },
        maxHeight: maxHeight ? { xs: "none", md: maxHeight } : undefined,
        overflowY: scrollOnDesktop ? { xs: "visible", md: "auto" } : "visible",
        "&::-webkit-scrollbar": { width: 8 },
        "&::-webkit-scrollbar-thumb": {
          background: uiTokens.scrollbarThumb,
          borderRadius: 99,
        },
      }}
    >
      <Typography sx={{ fontSize: 18, opacity: 0.82, whiteSpace: "pre-line" }}>
        {description || "-"}
      </Typography>
    </Box>
  );
}
