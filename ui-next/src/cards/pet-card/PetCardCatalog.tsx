'use client';

import { Box, Chip, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Link as RouterLink } from "@/shared/router";
import { mergeSx } from "@/shared/ui/mergeSx";
import type { Pet } from "@/release-hub/entities";

interface PetCardCatalogProps {
  pet: Pet;
  cardSx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

export const PetCardCatalog = ({
  pet,
  cardSx,
  imageSx,
  contentSx,
}: PetCardCatalogProps) => {
  const ownerName = pet.ownerName ?? "Unknown";
  const generationLabel = pet.generation ?? "Unknown";

  return (
    <Box
      component={RouterLink}
      to={`/catalog/p/${pet.id}`}
      aria-label={`${pet.name} pet`}
      sx={mergeSx(
        {
          backgroundColor: "background.paper",
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          textDecoration: "none",
          color: "inherit",
          display: "block",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 40px rgba(139, 92, 246, 0.15)",
          },
        },
        cardSx
      )}
    >
      {/* Portrait Image Container - ~1:1.5 aspect ratio */}
      <Box
        sx={mergeSx(
          {
            position: "relative",
            width: "100%",
            paddingTop: "150%", // ~1:1.5 aspect ratio
            backgroundColor: "#ffffff",
            overflow: "hidden",
          },
          imageSx
        )}
      >
        <Box
          component="img"
          src={pet.imageUrl}
          alt={pet.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </Box>

      {/* Card Content */}
      <Box sx={mergeSx({ p: 2 }, contentSx)}>
        {/* Pet Name */}
        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 0.5,
          }}
        >
          {pet.name}
        </Typography>

        {/* Owner */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.85rem",
            mb: 1,
          }}
        >
          Owner: {ownerName}
        </Typography>

        {/* Species + Generation inline */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.75rem" }}>
            {pet.species}
          </Typography>
          <Typography sx={{ color: "#4B5563" }}>•</Typography>
          <Chip
            label={generationLabel}
            size="small"
            sx={{
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              color: "#A78BFA",
              fontSize: "0.6rem",
              height: "18px",
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
