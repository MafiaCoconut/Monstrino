import { Grid } from "@mui/material";
import { KpiCard } from "@/shared/ui/kpi-card";

export interface CurrentSalesKpisProps {
  count: number;
  low: string;
  high: string;
  average: string;
  size?: "sm" | "md";
}

export function CurrentSalesKpis({ count, low, high, average, size = "md" }: CurrentSalesKpisProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard label="Active Listings" value={String(count)} size={size} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard label="Lowest" value={low || "-"} size={size} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard label="Highest" value={high || "-"} size={size} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <KpiCard label="Average" value={average || "-"} tone="purple" size={size} />
      </Grid>
    </Grid>
  );
}
