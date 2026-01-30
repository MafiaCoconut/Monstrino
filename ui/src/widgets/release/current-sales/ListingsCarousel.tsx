import { Box, Typography } from "@mui/material";
import type { ReleaseListing } from "@/entities/release/model";
import { uiTokens } from "@/shared/ui/tokens";
import { ListingCard } from "./ListingCard";

export interface ListingsCarouselProps {
  listings: ReleaseListing[];
  ariaLabel?: string;
}

export function ListingsCarousel({ listings, ariaLabel = "Current listings" }: ListingsCarouselProps) {
  if (!listings.length) {
    return <Typography sx={{ opacity: 0.7 }}>No listings</Typography>;
  }

  return (
    <Box
      component="ul"
      aria-label={ariaLabel}
      sx={{
        listStyle: "none",
        display: "flex",
        gap: 2.5,
        m: 0,
        p: 0,
        overflowX: "auto",
        pb: 1.25,
        scrollSnapType: "x mandatory",
        "&::-webkit-scrollbar": { height: 10 },
        "&::-webkit-scrollbar-thumb": {
          background: uiTokens.scrollbarThumbSoft,
          borderRadius: 99,
        },
      }}
    >
      {listings.map((listing) => (
        <Box component="li" key={listing.id} sx={{ listStyle: "none" }}>
          <ListingCard listing={listing} />
        </Box>
      ))}
    </Box>
  );
}
