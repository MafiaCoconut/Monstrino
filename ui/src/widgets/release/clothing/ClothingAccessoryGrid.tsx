import { Box, Grid, Paper, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";
import { ClothingCompactRow } from "./ClothingCompactRow";

interface AccessoryTileProps {
  itemKey: string;
  name: string;
  category: string;
}

function AccessoryTile({ itemKey, name, category }: AccessoryTileProps) {
  const src = itemKey ? `/demo/release/clothes/${itemKey}.png` : "";

  return (
    <Paper
      elevation={0}
      sx={{
        height: 160,
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
      {src ? (
        <Box
          component="img"
          src={src}
          alt={name || "Accessory"}
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", p: 2, opacity: 0.92 }}
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

      <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, p: 1.5, background: uiTokens.overlayGradientBottom }}>
        <Typography sx={{ lineHeight: 1.1 }}>{name || "-"}</Typography>
        <Typography variant="caption" sx={{ opacity: 0.55, letterSpacing: 1.6, textTransform: "uppercase" }}>
          {category || "-"}
        </Typography>
      </Box>
    </Paper>
  );
}

export interface ClothingAccessoryGridProps {
  accessories: string[];
  accessoryIsLong: boolean;
  getName: (key: string) => string;
  getCategory: (key: string) => string;
}

export function ClothingAccessoryGrid({
  accessories,
  accessoryIsLong,
  getName,
  getCategory,
}: ClothingAccessoryGridProps) {
  if (!accessories.length) {
    return <Typography sx={{ opacity: 0.7 }}>No accessories</Typography>;
  }

  if (accessoryIsLong) {
    return (
      <Box sx={{ display: "grid", gap: 1.5 }}>
        {accessories.map((itemKey) => (
          <ClothingCompactRow
            key={itemKey}
            itemKey={itemKey}
            name={getName(itemKey)}
            category={getCategory(itemKey)}
          />
        ))}
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {accessories.map((itemKey) => (
        <Grid item xs={12} sm={6} key={itemKey}>
          <AccessoryTile itemKey={itemKey} name={getName(itemKey)} category={getCategory(itemKey)} />
        </Grid>
      ))}
    </Grid>
  );
}
