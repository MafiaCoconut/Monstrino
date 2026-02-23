'use client';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Link as RouterLink } from "@/shared/router";
import PetsIcon from "@mui/icons-material/Pets";
import { mergeSx } from "@/shared/ui/mergeSx";
import type { PetSummary } from "@/release-hub/entities";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface PetCardProps extends PetSummary {
  containerSx?: SxProps<Theme>;
  cardSx?: SxProps<Theme>;
  mediaSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

export const PetCard = ({
  id,
  name,
  species,
  ownerName,
  ownerImageUrl,
  imageUrl,
  containerSx,
  cardSx,
  mediaSx,
  contentSx,
}: PetCardProps) => {
  return (
    <Box
      component={RouterLink}
      to={`/catalog/p/${id}`}
      aria-label={`${name} pet`}
      sx={mergeSx(
        {
          display: "block",
          textDecoration: "none",
          color: "inherit",
          height: "100%",
        },
        containerSx
      )}
    >
      <Card
        sx={mergeSx(
          {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
          },
          cardSx
        )}
      >
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "rgba(0, 212, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <PetsIcon sx={{ fontSize: 16, color: "secondary.main" }} />
      </Box>

      <CardMedia
        component="div"
        sx={mergeSx(
          {
            height: 220,
            backgroundColor: "background.default",
            backgroundImage: `url(${imageUrl ?? PLACEHOLDER_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, rgba(20, 20, 32, 0.9) 0%, transparent 100%)",
            },
          },
          mediaSx
        )}
      />

      <CardContent sx={contentSx}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 0.5,
          }}
        >
          {name}
        </Typography>
        <Chip
          label={species}
          size="small"
          sx={{
            backgroundColor: "rgba(0, 212, 255, 0.15)",
            color: "text.primary",
            fontWeight: 500,
            fontSize: "0.7rem",
            mb: 2,
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={ownerImageUrl}
            sx={{ width: 24, height: 24, border: "1px solid", borderColor: "primary.main" }}
          />
          <Typography variant="body2" color="text.secondary">
            Owner: <Box component="span" sx={{ color: "primary.main", fontWeight: 500 }}>{ownerName ?? "Unknown"}</Box>
          </Typography>
        </Box>
      </CardContent>
      </Card>
    </Box>
  );
};
