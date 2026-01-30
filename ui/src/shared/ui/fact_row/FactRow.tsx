import { Typography, Box } from "@mui/material";
import { uiTokens } from "../tokens";

export function FactRow({
  label,
  value,
  accent = "purple",
}: {
  label: string;
  value: string;
  accent?: "purple" | "neutral";
}) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box
        aria-hidden
        sx={{
          width: 4,
          borderRadius: 99,
          background: accent === "purple" ? uiTokens.accentPurple : uiTokens.railDotDim,
          opacity: 0.9,
        }}
      />
      <Box>
        <Typography
          variant="caption"
          sx={{ letterSpacing: 2.4, textTransform: "uppercase", opacity: 0.55 }}
        >
          {label}
        </Typography>
        <Typography sx={{ mt: 0.5, opacity: 0.9, lineHeight: 1.35 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
