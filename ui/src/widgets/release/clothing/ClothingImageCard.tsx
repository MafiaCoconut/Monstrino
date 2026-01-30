import type { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";

interface CardBaseProps {
  height?: number;
  children: ReactNode;
}

function CardBase({ height, children }: CardBaseProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: height ?? "auto",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        background: uiTokens.surfaceBase,
        border: `1px solid ${uiTokens.border}`,
        transition: "transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: uiTokens.accentBorderSoft,
          boxShadow: uiTokens.cardHoverShadowStrong,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        background: uiTokens.vignetteGradient,
          opacity: 0.85,
        }}
      />
      {children}
    </Paper>
  );
}

export interface ClothingImageCardProps {
  itemKey: string;
  height: number;
  name: string;
  category: string;
}

export function ClothingImageCard({ itemKey, height, name, category }: ClothingImageCardProps) {
  const src = itemKey ? `/demo/release/clothes/${itemKey}.png` : "";

  return (
    <CardBase height={height}>
      {src ? (
        <Box
          component="img"
          src={src}
          alt={name || "Clothing item"}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            px: 3,
            py: 3,
            opacity: 0.92,
            transition: "opacity 140ms ease",
          }}
        />
      ) : (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            color: uiTokens.textDim,
          }}
        >
          <Typography variant="caption">No image</Typography>
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          left: 14,
          top: 14,
          px: 1.25,
          py: 0.5,
          borderRadius: 99,
          background: uiTokens.overlayGlassStrong,
          border: `1px solid ${uiTokens.borderSoft}`,
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: 2.2, textTransform: "uppercase", opacity: 0.85 }}>
          {category || "-"}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          p: 2,
          background: uiTokens.overlayGradientBottom,
        }}
      >
        <Typography sx={{ fontSize: 18, lineHeight: 1.1 }}>{name || "-"}</Typography>
        <Typography variant="caption" sx={{ opacity: 0.55, letterSpacing: 1.6 }}>
          CLOTHING PIECE
        </Typography>
      </Box>
    </CardBase>
  );
}
