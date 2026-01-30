import { Box, Container } from "@mui/material";
import { demoRelease } from "@/entities/release";
import { uiTokens } from "@/shared/ui/tokens";
import {
  ClothingSection,
  CurrentSalesSection,
  ItemsSection,
  PriceHistorySection,
  ReleaseDetailsSection,
  ReleaseHeroSection,
} from "@/widgets/release";

export function ReleaseIndexPage() {
  // DESIGN-ONLY: demo data for layout and styling until API wiring.
  const release = demoRelease;

  return (
    <Box sx={{ bgcolor: uiTokens.pageBg, color: uiTokens.pageText, minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ReleaseHeroSection
          title={release.title}
          description={release.description}
          gallery={release.gallery}
          character={release.character}
          series={release.series}
          year={release.year}
          exclusive={release.exclusive}
          modelNumber={release.modelNumber}
          stats={release.stats}
        />

        <ReleaseDetailsSection
          general={release.details.general}
          product={release.details.product}
          physical={release.details.physical}
        />
        <ClothingSection clothing={release.clothing} productDetails={release.details.product} />
        <ItemsSection items={release.items} />
        <PriceHistorySection stats={release.stats} />
        <CurrentSalesSection listings={release.listings} />
      </Container>
    </Box>
  );
}
