import { Typography } from "@mui/material";
import { AccentPanel } from "@/shared/ui/accent-panel";
import { ChartRangePills } from "./ChartRangePills";
import { DemoLineChartSvg } from "./DemoLineChartSvg";

export function PriceChartPanel() {
  return (
    <AccentPanel
      title="MARKET VALUE"
      subtitle="Estimated movement over time (demo)"
      accent="purple"
      rightSlot={<ChartRangePills />}
    >
      {/* DESIGN-ONLY: chart rendering uses placeholder data. */}
      <DemoLineChartSvg />
      <Typography variant="caption" sx={{ mt: 2, display: "block", opacity: 0.55 }}>
        Demo chart panel - replace with real market data later.
      </Typography>
    </AccentPanel>
  );
}
