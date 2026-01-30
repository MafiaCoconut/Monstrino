import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";

export interface ClothingSummaryCardProps {
  primaryOutfit: string;
  secondaryPiece: string;
  accessoriesText: string;
  footwearText: string;
}

export function ClothingSummaryCard({
  primaryOutfit,
  secondaryPiece,
  accessoriesText,
  footwearText,
}: ClothingSummaryCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        p: 2.5,
        background: uiTokens.panelBg,
        border: `1px solid ${uiTokens.border}`,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: uiTokens.haloCorner,
          pointerEvents: "none",
          opacity: 0.9,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="overline" sx={{ letterSpacing: 2.6, opacity: 0.75 }}>
          OUTFIT SUMMARY
        </Typography>
        <Divider sx={{ my: 2, opacity: 0.1 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="caption" sx={{ letterSpacing: 1.8, textTransform: "uppercase", opacity: 0.55 }}>
              Primary Outfit
            </Typography>
            <Typography sx={{ mt: 0.75, opacity: 0.9, lineHeight: 1.25 }}>
              {primaryOutfit || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption" sx={{ letterSpacing: 1.8, textTransform: "uppercase", opacity: 0.55 }}>
              Secondary Piece
            </Typography>
            <Typography sx={{ mt: 0.75, opacity: 0.9, lineHeight: 1.25 }}>
              {secondaryPiece || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ letterSpacing: 1.8, textTransform: "uppercase", opacity: 0.55 }}>
              Accessories
            </Typography>
            <Typography sx={{ mt: 0.75, opacity: 0.9, lineHeight: 1.25 }}>
              {accessoriesText || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ letterSpacing: 1.8, textTransform: "uppercase", opacity: 0.55 }}>
              Footwear
            </Typography>
            <Typography sx={{ mt: 0.75, opacity: 0.9, lineHeight: 1.25 }}>
              {footwearText || "-"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
