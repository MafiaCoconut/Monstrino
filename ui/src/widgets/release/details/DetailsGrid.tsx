import { Box, Typography } from "@mui/material";
import type { ReleaseDetailsItem } from "@/entities/release/model";
import { uiTokens } from "@/shared/ui/tokens";

export interface DetailsGridProps {
  items: ReleaseDetailsItem[];
  emptyLabel?: string;
}

export function DetailsGrid({ items, emptyLabel = "No details" }: DetailsGridProps) {
  if (!items.length) {
    return <Typography sx={{ opacity: 0.7 }}>{emptyLabel}</Typography>;
  }

  return (
    <Box sx={{ display: "grid", gap: 1.25 }}>
      {items.map((item) => (
        <Box
          key={item.key}
          sx={{
            p: 1.5,
            borderRadius: 2.25,
            background: uiTokens.overlayTile,
            border: `1px solid ${uiTokens.borderFaint}`,
          }}
        >
          <Typography variant="caption" sx={{ letterSpacing: 2.1, textTransform: "uppercase", opacity: 0.55 }}>
            {item.label}
          </Typography>
          <Typography sx={{ mt: 0.6, opacity: 0.9, lineHeight: 1.25 }}>
            {item.value || "-"}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
