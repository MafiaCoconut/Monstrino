import { Box, Typography } from "@mui/material";
import { uiTokens } from "@/shared/ui/tokens";
import { ClothingImageCard } from "./ClothingImageCard";
import { ClothingSummaryCard } from "./ClothingSummaryCard";

export interface ClothingPrimaryColumnProps {
  primaryKey: string;
  primaryHeight: number;
  getName: (key: string) => string;
  getCategory: (key: string) => string;
  summary: {
    primaryOutfit: string;
    secondaryPiece: string;
    accessoriesText: string;
    footwearText: string;
  };
}

export function ClothingPrimaryColumn({
  primaryKey,
  primaryHeight,
  getName,
  getCategory,
  summary,
}: ClothingPrimaryColumnProps) {
  if (!primaryKey) {
    return (
      <Box sx={{ p: 3, borderRadius: 3, border: `1px dashed ${uiTokens.borderSoft}` }}>
        <Typography sx={{ opacity: 0.7 }}>No primary item</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <ClothingImageCard
        itemKey={primaryKey}
        height={primaryHeight}
        name={getName(primaryKey)}
        category={getCategory(primaryKey)}
      />
      <ClothingSummaryCard
        primaryOutfit={summary.primaryOutfit}
        secondaryPiece={summary.secondaryPiece}
        accessoriesText={summary.accessoriesText}
        footwearText={summary.footwearText}
      />
    </Box>
  );
}
