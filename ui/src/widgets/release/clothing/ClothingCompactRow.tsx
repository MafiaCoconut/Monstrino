import { Box, Paper, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";

export interface ClothingCompactRowProps {
  itemKey: string;
  name: string;
  category: string;
}

export function ClothingCompactRow({ itemKey, name, category }: ClothingCompactRowProps) {
  const src = itemKey ? `/demo/release/clothes/${itemKey}.png` : "";

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.75,
        borderRadius: 2.5,
        background: uiTokens.surfaceTile,
        border: `1px solid ${uiTokens.border}`,
        transition: "transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease",
        "&:hover": {
          transform: "translateY(-1px)",
          borderColor: uiTokens.accentBorderSoft,
          boxShadow: uiTokens.accentGlowHover,
        },
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          background: uiTokens.surfaceBase,
          border: `1px solid ${uiTokens.border}`,
          display: "grid",
          placeItems: "center",
          flex: "0 0 auto",
          overflow: "hidden",
        }}
      >
        {src ? (
          <Box component="img" src={src} alt={name || "Clothing item"} sx={{ width: "100%", height: "100%", objectFit: "contain", p: 1, opacity: 0.92 }} />
        ) : (
          <Typography variant="caption" sx={{ color: uiTokens.textDim }}>
            No image
          </Typography>
        )}
      </Box>

      <Box sx={{ minWidth: 0, flex: "1 1 auto" }}>
        <Typography sx={{ lineHeight: 1.1 }}>{name || "-"}</Typography>
        <Typography variant="caption" sx={{ opacity: 0.55, letterSpacing: 1.6, textTransform: "uppercase" }}>
          {category || "-"}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 10,
          height: 40,
          borderRadius: 99,
          background: uiTokens.rail,
          opacity: 0.35,
        }}
      />
    </Paper>
  );
}
