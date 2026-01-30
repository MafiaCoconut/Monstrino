import { Box, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";

export interface ChartRangePillsProps {
  active?: "1M" | "6M" | "1Y" | "ALL";
}

function ChartRangePill({ label, active }: { label: string; active?: boolean }) {
  return (
    <Box
      sx={{
        px: 1.25,
        py: 0.6,
        borderRadius: 99,
        border: `1px solid ${uiTokens.borderSoft}`,
        background: active ? uiTokens.accentSoftFill : uiTokens.overlaySubtle,
        opacity: active ? 1 : 0.7,
      }}
    >
      <Typography variant="caption" sx={{ letterSpacing: 2.0, textTransform: "uppercase" }}>
        {label}
      </Typography>
    </Box>
  );
}

export function ChartRangePills({ active = "6M" }: ChartRangePillsProps) {
  return (
    <>
      <ChartRangePill label="1M" active={active === "1M"} />
      <ChartRangePill label="6M" active={active === "6M"} />
      <ChartRangePill label="1Y" active={active === "1Y"} />
      <ChartRangePill label="ALL" active={active === "ALL"} />
    </>
  );
}
