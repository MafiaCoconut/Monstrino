import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import type { ReleaseDetailsItem } from "@/entities/release/model";
import { Section } from "@/shared/ui/section";
import { ClothingGroupsColumn } from "./ClothingGroupsColumn";
import { ClothingPrimaryColumn } from "./ClothingPrimaryColumn";
import { ClothingSpecStrip } from "./ClothingSpecStrip";
import { buildClothingModel, getClothingCategory, getClothingDisplayName } from "./model";

export interface ClothingSectionProps {
  clothing?: string[];
  productDetails?: ReleaseDetailsItem[];
}

export function ClothingSection({ clothing = [], productDetails = [] }: ClothingSectionProps) {
  const model = React.useMemo(() => buildClothingModel(clothing, productDetails), [clothing, productDetails]);

  if (!model.ordered.length) {
    return (
      <Section title="Clothing">
        <Typography sx={{ opacity: 0.7 }}>No clothing items</Typography>
      </Section>
    );
  }

  return (
    <Section title="Clothing">
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.6 }}>
          OUTFIT BREAKDOWN
        </Typography>
        <Typography sx={{ mt: 0.75, opacity: 0.85, maxWidth: 860 }}>
          Catalog-ready view of outfit components grouped by function.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ alignItems: "start" }}>
        <Grid item xs={12} md={6}>
          <ClothingPrimaryColumn
            primaryKey={model.primary}
            primaryHeight={540}
            getName={getClothingDisplayName}
            getCategory={getClothingCategory}
            summary={model.summary}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ClothingGroupsColumn
            groups={model.groups}
            accessoryIsLong={model.accessoryIsLong}
            getName={getClothingDisplayName}
            getCategory={getClothingCategory}
          />
        </Grid>
      </Grid>

      <ClothingSpecStrip items={model.specStrip} />
    </Section>
  );
}
