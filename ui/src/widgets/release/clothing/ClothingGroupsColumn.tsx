import { Box, Divider, Paper, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";
import { ClothingAccessoryGrid } from "./ClothingAccessoryGrid";
import { ClothingCompactRow } from "./ClothingCompactRow";
import { ClothingImageCard } from "./ClothingImageCard";

interface ClothingGroups {
  layer: string[];
  footwear: string[];
  accessory: string[];
  other: string[];
}

export interface ClothingGroupsColumnProps {
  groups: ClothingGroups;
  accessoryIsLong: boolean;
  getName: (key: string) => string;
  getCategory: (key: string) => string;
}

function GroupHeader({ title }: { title: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography variant="overline" sx={{ letterSpacing: 2.6, opacity: 0.7 }}>
        {title}
      </Typography>
      <Box aria-hidden sx={{ flex: "1 1 auto", height: 1, ml: 2, background: uiTokens.overlayStripe }} />
    </Box>
  );
}

export function ClothingGroupsColumn({
  groups,
  accessoryIsLong,
  getName,
  getCategory,
}: ClothingGroupsColumnProps) {
  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      {groups.layer.length ? (
        <Box>
          <GroupHeader title="LAYER" />
          <Box sx={{ mt: 2, display: "grid", gap: 2 }}>
            {groups.layer.slice(0, 3).map((key) => (
              <ClothingImageCard
                key={key}
                itemKey={key}
                height={220}
                name={getName(key)}
                category={getCategory(key)}
              />
            ))}
            {groups.layer.length > 3 ? (
              <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 1.2 }}>
                +{groups.layer.length - 3} more layer pieces
              </Typography>
            ) : null}
          </Box>
        </Box>
      ) : null}

      {groups.footwear.length ? (
        <Box>
          <GroupHeader title="FOOTWEAR" />
          <Box sx={{ mt: 2, display: "grid", gap: 2 }}>
            {groups.footwear.slice(0, 3).map((key) => (
              <ClothingImageCard
                key={key}
                itemKey={key}
                height={220}
                name={getName(key)}
                category={getCategory(key)}
              />
            ))}
            {groups.footwear.length > 3 ? (
              <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 1.2 }}>
                +{groups.footwear.length - 3} more footwear items
              </Typography>
            ) : null}
          </Box>
        </Box>
      ) : null}

      {groups.accessory.length ? (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            p: 2.25,
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
            <GroupHeader title="ACCESSORIES" />
            <Divider sx={{ my: 2, opacity: 0.1 }} />
            <ClothingAccessoryGrid
              accessories={groups.accessory}
              accessoryIsLong={accessoryIsLong}
              getName={getName}
              getCategory={getCategory}
            />
          </Box>
        </Paper>
      ) : null}

      {groups.other.length ? (
        <Box>
          <GroupHeader title="OTHER" />
          <Box sx={{ mt: 2, display: "grid", gap: 1.5 }}>
            {groups.other.map((key) => (
              <ClothingCompactRow
                key={key}
                itemKey={key}
                name={getName(key)}
                category={getCategory(key)}
              />
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
