import { Box, Paper, Typography } from "@mui/material";
import { BadgePill } from "@/shared/ui/badge-pill";
import { uiTokens } from "@/shared/ui/tokens";
import type { ReleaseListing } from "@/entities/release/model";

export interface ListingCardProps {
  listing: ReleaseListing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 320,
        height: 240,
        flex: "0 0 auto",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        background: uiTokens.surfaceBase,
        border: `1px solid ${uiTokens.border}`,
        scrollSnapAlign: "start",
        transition: "transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: uiTokens.accentBorderSoft,
          boxShadow: uiTokens.glow,
        },
      }}
    >
      {listing.image ? (
        <Box
          component="img"
          src={listing.image}
          alt={listing.title || "Listing"}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", p: 2.5, opacity: 0.92 }}
        />
      ) : (
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: uiTokens.textDim }}>
          <Typography variant="caption">No image</Typography>
        </Box>
      )}

      <Box sx={{ position: "absolute", left: 14, top: 14 }}>
        <BadgePill text={listing.source || "-"} tone="purple" />
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          p: 2,
          background: uiTokens.overlayGradientBottomStrong,
        }}
      >
        <Typography sx={{ fontSize: 16, lineHeight: 1.15 }}>{listing.title || "-"}</Typography>
        <Typography variant="caption" sx={{ opacity: 0.72, letterSpacing: 1.1, display: "block", mt: 0.4 }}>
          {(listing.seller || "-") + " - " + (listing.condition || "-")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.8 }}>
          <Typography sx={{ fontWeight: 600 }}>{listing.price || "-"}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            {listing.shipping || "-"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
