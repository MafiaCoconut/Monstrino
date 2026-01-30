import * as React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { ReleaseBadges, ReleaseGallery } from "@/entities/release/ui";
import type { ReleaseStats } from "@/entities/release/model";
import { HeroDescription } from "./HeroDescription";
import { HeroKpis } from "./HeroKpis";

export interface ReleaseHeroSectionProps {
  title: string;
  description: string;
  gallery: string[];
  character: string;
  series: string;
  year: string;
  exclusive: string;
  modelNumber: string;
  stats?: ReleaseStats;
}

export function ReleaseHeroSection({
  title,
  description,
  gallery,
  character,
  series,
  year,
  exclusive,
  modelNumber,
  stats,
}: ReleaseHeroSectionProps) {
  const safeGallery = React.useMemo(() => gallery ?? [], [gallery]);
  const [activeImage, setActiveImage] = React.useState(safeGallery[0] ?? "");

  React.useEffect(() => {
    setActiveImage(safeGallery[0] ?? "");
  }, [safeGallery]);

  const heroHeight = 520 + 76 + 16 + 16;

  return (
    <Grid container spacing={6} sx={{ alignItems: "stretch" }}>
      <Grid item xs={12} md={5}>
        <ReleaseGallery
          activeImage={activeImage}
          onSelect={setActiveImage}
          images={safeGallery}
          mainHeight={520}
          thumbSize={76}
        />
      </Grid>

      <Grid item xs={12} md={7}>
        <Box sx={{ height: { xs: "auto", md: heroHeight }, display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" sx={{ lineHeight: 1.05, mb: 1.25 }}>
            {title || "-"}
          </Typography>

          <ReleaseBadges
            character={character}
            series={series}
            year={year}
            exclusive={exclusive}
            modelNumber={modelNumber}
          />

          <HeroKpis stats={stats} />

          <Divider sx={{ opacity: 0.1, mb: 2 }} />

          <HeroDescription description={description} maxHeight={heroHeight - 260} />
        </Box>
      </Grid>
    </Grid>
  );
}
