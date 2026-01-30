import { Box, Grid, Paper, Typography } from "@mui/material";
import type { ReleaseStats } from "@/entities/release/model";
import { uiTokens } from "@/shared/ui/tokens";

export interface HeroKpisProps {
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

const cardBaseSx = {
  p: 2,
  borderRadius: 2,
  position: "relative",
  overflow: "hidden",
  background: uiTokens.surfaceBase,
  border: `1px solid ${uiTokens.border}`,
  transition: "transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease",
  "&:hover": {
    transform: "translateY(-1px)",
    borderColor: uiTokens.accentBorderSoft,
    boxShadow: uiTokens.cardHoverShadow,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: uiTokens.highlightGradient,
    opacity: 0.9,
    pointerEvents: "none",
  },
} as const;

function StatBlock({ label, value }: { label: string; value: string }) {
  const rarityKey = String(value ?? "").toLowerCase();
  const isSpecialRarity =
    label === "RARITY" &&
    (rarityKey.includes("exclusive") || rarityKey.includes("skullector") || rarityKey.includes("fangclub"));

  return (
    <Paper
      elevation={0}
      sx={{
        ...cardBaseSx,
        ...(isSpecialRarity
          ? {
              borderColor: uiTokens.accentBorderStrong,
              boxShadow: uiTokens.cardHoverShadowStrong,
              "&:before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: uiTokens.highlightGradientStrong,
                opacity: 1,
                pointerEvents: "none",
              },
              "&:after": {
                content: '""',
                position: "absolute",
                inset: -2,
                background: uiTokens.haloGradient,
                opacity: 1,
                pointerEvents: "none",
              },
            }
          : null),
      }}
    >
      <Typography
        variant="caption"
        sx={{ position: "relative", zIndex: 1, opacity: 0.65, letterSpacing: 1.2 }}
      >
        {label}
      </Typography>
      <Typography sx={{ position: "relative", zIndex: 1, mt: 0.5, fontSize: 18, lineHeight: 1.15 }}>
        {value || "-"}
      </Typography>
    </Paper>
  );
}

function MarketValueCard({
  marketValue,
  trend,
  deltaPct,
}: {
  marketValue: string;
  trend?: "up" | "down" | "flat";
  deltaPct?: number;
}) {
  const showTrend = trend && trend !== "flat" && typeof deltaPct === "number";
  const trendText =
    showTrend && deltaPct !== undefined
      ? `${deltaPct > 0 ? "+" : ""}${deltaPct.toFixed(1)}%`
      : "";

  const trendTone = trend === "up" ? "pink" : trend === "down" ? "green" : "neutral";
  const trendColor =
    trendTone === "neutral"
      ? uiTokens.textDim
      : trendTone === "pink"
        ? uiTokens.accentPink
        : uiTokens.accentGreen;

  const trendArrow = trend === "up" ? "^" : trend === "down" ? "v" : "-";

  return (
    <Paper elevation={0} sx={cardBaseSx}>
      <Typography
        variant="caption"
        sx={{ position: "relative", zIndex: 1, opacity: 0.65, letterSpacing: 1.2 }}
      >
        MARKET VALUE
      </Typography>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 2,
          mt: 0.5,
        }}
      >
        <Typography sx={{ fontSize: 18, lineHeight: 1.15 }}>{marketValue || "-"}</Typography>
        {showTrend ? (
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}>
            <Typography sx={{ fontSize: 14, lineHeight: 1, color: trendColor, opacity: 0.95 }}>
              {trendArrow}
            </Typography>
            <Typography
              sx={{ fontSize: 14, lineHeight: 1, color: trendColor, fontWeight: 600, letterSpacing: 0.2 }}
            >
              {trendText}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
}

export function HeroKpis({ stats }: HeroKpisProps) {
  const safeStats = stats ?? emptyStats;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6}>
        <StatBlock label="RELEASE DATE" value={safeStats.releaseDate} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StatBlock label="ORIGINAL MSRP" value={safeStats.originalMsrp} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StatBlock label="RARITY" value={safeStats.rarity} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MarketValueCard
          marketValue={safeStats.marketValue}
          trend={safeStats.marketTrend}
          deltaPct={safeStats.marketDeltaPct}
        />
      </Grid>
    </Grid>
  );
}
