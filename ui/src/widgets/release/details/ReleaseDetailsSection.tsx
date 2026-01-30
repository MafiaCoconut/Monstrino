import { Box, Grid, Typography } from "@mui/material";
import type { ReleaseDetailsItem } from "@/entities/release/model";
import { AccentPanel } from "@/shared/ui/accent-panel";
import { BadgePill } from "@/shared/ui/badge-pill";
import { Section } from "@/shared/ui/section";
import { DetailsGrid } from "./DetailsGrid";
import { DetailsGroup } from "./DetailsGroup";

export interface ReleaseDetailsSectionProps {
  general?: ReleaseDetailsItem[];
  product?: ReleaseDetailsItem[];
  physical?: ReleaseDetailsItem[];
  emptyLabel?: string;
}

export function ReleaseDetailsSection({
  general = [],
  product = [],
  physical = [],
  emptyLabel = "No details available",
}: ReleaseDetailsSectionProps) {
  const isEmpty = !general.length && !product.length && !physical.length;

  return (
    <Section title="Details">
      <AccentPanel
        title="DETAILS"
        subtitle="General, product and physical attributes"
        accent="purple"
        rightSlot={
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <BadgePill text={`${general.length} General`} tone="neutral" size="sm" />
            <BadgePill text={`${product.length} Product`} tone="neutral" size="sm" />
            <BadgePill text={`${physical.length} Physical`} tone="neutral" size="sm" />
          </Box>
        }
      >
        {isEmpty ? (
          <Typography sx={{ opacity: 0.7 }}>{emptyLabel}</Typography>
        ) : (
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={4}>
              <DetailsGroup title="GENERAL" accent="purple">
                <DetailsGrid items={general} />
              </DetailsGroup>
            </Grid>

            <Grid item xs={12} md={4}>
              <DetailsGroup title="PRODUCT" accent="purple">
                <DetailsGrid items={product} />
              </DetailsGroup>
            </Grid>

            <Grid item xs={12} md={4}>
              <DetailsGroup title="PHYSICAL" accent="purple">
                <DetailsGrid items={physical} />
              </DetailsGroup>
            </Grid>
          </Grid>
        )}
      </AccentPanel>
    </Section>
  );
}
