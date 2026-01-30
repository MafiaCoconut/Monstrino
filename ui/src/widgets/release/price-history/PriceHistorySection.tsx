import { Grid } from "@mui/material";
import type { ReleaseStats } from "@/entities/release/model";
import { Section } from "@/shared/ui/section";
import { PriceChartPanel } from "./PriceChartPanel";
import { PriceSummaryPanel } from "./PriceSummaryPanel";

export interface PriceHistorySectionProps {
  stats?: ReleaseStats;
}

const emptyStats: ReleaseStats = {
  releaseDate: "-",
  rarity: "-",
  originalMsrp: "-",
  marketValue: "-",
  marketTrend: "flat",
  marketDeltaPct: 0,
};

export function PriceHistorySection({ stats }: PriceHistorySectionProps) {
  const safeStats = stats ?? emptyStats;

  return (
    <Section title="Price History">
      <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
        <Grid item xs={12} md={8}>
          <PriceChartPanel />
        </Grid>
        <Grid item xs={12} md={4}>
          <PriceSummaryPanel
            msrpRaw={safeStats.originalMsrp}
            marketRaw={safeStats.marketValue}
            trend={safeStats.marketTrend ?? "flat"}
            deltaPct={typeof safeStats.marketDeltaPct === "number" ? safeStats.marketDeltaPct : 0}
          />
        </Grid>
      </Grid>
    </Section>
  );
}
