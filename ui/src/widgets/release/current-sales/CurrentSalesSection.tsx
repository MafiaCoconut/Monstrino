import * as React from "react";
import { Box, Typography } from "@mui/material";
import type { ReleaseListing } from "@/entities/release/model";
import { formatMoney, parseMoney } from "@/shared/lib";
import { Section } from "@/shared/ui/section";
import { CurrentSalesKpis } from "./CurrentSalesKpis";
import { ListingsCarousel } from "./ListingsCarousel";

export interface CurrentSalesSectionProps {
  listings?: ReleaseListing[];
}

export function CurrentSalesSection({ listings = [] }: CurrentSalesSectionProps) {
  const stats = React.useMemo(() => {
    const prices = listings.map((listing) => parseMoney(listing.price)).filter((value) => value > 0);
    if (!prices.length) {
      return { low: 0, high: 0, average: 0 };
    }
    const low = Math.min(...prices);
    const high = Math.max(...prices);
    const average = prices.reduce((sum, value) => sum + value, 0) / prices.length;
    return { low, high, average };
  }, [listings]);

  return (
    <Section title="Current Sales">
      <Box sx={{ display: "grid", gap: 2.5 }}>
        <Box>
          <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.6 }}>
            ACTIVE MARKET
          </Typography>
          <Typography sx={{ mt: 0.75, opacity: 0.85, maxWidth: 860 }}>
            Live listings snapshot with price range and seller mix.
          </Typography>
        </Box>

        <CurrentSalesKpis
          count={listings.length}
          low={formatMoney(stats.low)}
          high={formatMoney(stats.high)}
          average={formatMoney(stats.average)}
        />

        <ListingsCarousel listings={listings} />
      </Box>
    </Section>
  );
}
