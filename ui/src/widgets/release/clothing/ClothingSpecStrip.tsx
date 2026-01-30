import { Box, Grid, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";

export interface ClothingSpecStripProps {
  items: Array<{ label: string; value: string }>;
}

export function ClothingSpecStrip({ items }: ClothingSpecStripProps) {
  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        borderRadius: 3,
        background: uiTokens.softBg,
        border: `1px solid ${uiTokens.border}`,
      }}
    >
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={6} md={3} key={item.label}>
            <Typography variant="caption" sx={{ letterSpacing: 2.2, textTransform: "uppercase", opacity: 0.55 }}>
              {item.label}
            </Typography>
            <Typography sx={{ mt: 0.5, opacity: 0.9 }}>{item.value || "-"}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
