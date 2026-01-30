import { Box, Grid, Paper, Typography } from "@mui/material";
import { KpiCard } from "@/shared/ui/kpi-card";
import { formatMoney, parseMoney } from "@/shared/lib";
import { uiTokens } from "@/shared/ui/tokens";

export interface PriceSummaryPanelProps {
  msrpRaw: string;
  marketRaw: string;
  trend: "up" | "down" | "flat" | string;
  deltaPct: number;
}

export function PriceSummaryPanel({ msrpRaw, marketRaw, trend, deltaPct }: PriceSummaryPanelProps) {
  const msrp = parseMoney(msrpRaw);
  const market = parseMoney(marketRaw);
  const ath = Math.max(market * 1.18, market + 6);
  const atl = Math.max(0, msrp * 0.85);

  const trendTone = trend === "up" ? "pink" : trend === "down" ? "green" : "neutral";
  const trendLabel = trend === "up" ? "Up" : trend === "down" ? "Down" : "Flat";
  const pctText = trend === "flat" ? "0%" : `${trend === "down" ? "-" : "+"}${Math.abs(deltaPct).toFixed(1)}%`;

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      <KpiCard label="Current Market Value" value={marketRaw || "-"} tone="purple" />
      <KpiCard label="Original MSRP" value={msrpRaw || "-"} />

      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <KpiCard label="All-Time High" value={formatMoney(ath)} />
        </Grid>
        <Grid item xs={6}>
          <KpiCard label="All-Time Low" value={formatMoney(atl)} />
        </Grid>
      </Grid>

      <Box
        sx={{
          p: 2,
          borderRadius: 2.5,
          background: uiTokens.softBg,
          border: `1px solid ${uiTokens.border}`,
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: 2.2, textTransform: "uppercase", opacity: 0.55 }}>
          Trend (demo)
        </Typography>

        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 2, mt: 0.9 }}>
          <Typography sx={{ opacity: 0.9 }}>{trendLabel}</Typography>
          <Typography
            sx={{
              fontWeight: 700,
              color:
                trendTone === "pink"
                  ? uiTokens.accentPink
                  : trendTone === "green"
                    ? uiTokens.accentGreen
                  : uiTokens.textMuted,
            }}
          >
            {pctText}
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2.5,
          p: 2,
        background: uiTokens.surfaceMuted,
          border: `1px solid ${uiTokens.border}`,
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: 2.6, opacity: 0.7 }}>
          INSIGHT
        </Typography>
        <Typography sx={{ mt: 0.8, opacity: 0.82, lineHeight: 1.3 }}>
          Keep one "purple anchor" (market value) and one "trend color" (up/down) - it makes this readable at a glance.
        </Typography>
      </Paper>
    </Box>
  );
}
