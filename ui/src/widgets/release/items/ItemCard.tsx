import { Box, Paper, Typography } from "@mui/material";
import { BadgePill } from "@/shared/ui/badge-pill";
import { uiTokens } from "@/shared/ui/tokens";
import type { BadgeTone } from "@/shared/ui/tokens";

export interface ItemCardProps {
  src?: string;
  name: string;
  category: string;
  note: string;
  tone: BadgeTone;
}

export function ItemCard({ src, name, category, note, tone }: ItemCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 340,
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
          borderColor: uiTokens.accentBorderHover,
          boxShadow: uiTokens.glow,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: uiTokens.haloCornerPurple,
          opacity: 0.9,
        }}
      />

      {src ? (
        <Box
          component="img"
          src={src}
          alt={name || "Item"}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            p: 2.5,
            opacity: 0.93,
          }}
        />
      ) : (
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: uiTokens.textDim }}>
          <Typography variant="caption">No image</Typography>
        </Box>
      )}

      <Box sx={{ position: "absolute", left: 14, top: 14 }}>
        <BadgePill text={category || "-"} tone={tone} />
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
        <Typography sx={{ fontSize: 16, lineHeight: 1.1 }}>{name || "-"}</Typography>
        <Typography variant="caption" sx={{ opacity: 0.72, letterSpacing: 1.1, display: "block", mt: 0.5 }}>
          {note || "-"}
        </Typography>
      </Box>
    </Paper>
  );
}
