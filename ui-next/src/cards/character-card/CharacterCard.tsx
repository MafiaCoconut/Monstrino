'use client';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Link as RouterLink } from "@/shared/router";
import { mergeSx } from "@/shared/ui/mergeSx";
import type { CharacterSummary } from "@/release-hub/entities";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface CharacterCardProps extends CharacterSummary {
  cardSx?: SxProps<Theme>;
  mediaSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

export const CharacterCard = ({
  id,
  name,
  species,
  releaseCount,
  imageUrl,
  accentColor = "#FF1493",
  cardSx,
  mediaSx,
  contentSx,
}: CharacterCardProps) => {
  return (
    <Card
      component={RouterLink}
      to={`/catalog/c/${id}`}
      sx={mergeSx(
        {
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          maxWidth: 220,
          margin: "0 auto",
          textDecoration: "none",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: { xs: "none", md: "translateY(-4px)" },
            boxShadow: { xs: "none", md: "0 8px 24px rgba(236, 72, 153, 0.15)" },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${accentColor} 0%, transparent 100%)`,
            zIndex: 1,
          },
        },
        cardSx
      )}
    >
      <CardMedia
        component="div"
        sx={mergeSx(
          {
            height: 170,
            backgroundColor: "background.default",
            backgroundImage: `url(${imageUrl ?? PLACEHOLDER_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(to top, rgba(20, 20, 32, 1) 0%, transparent 100%)",
            },
          },
          mediaSx
        )}
      />

      <CardContent sx={mergeSx({ pt: 0, mt: -3, position: "relative", zIndex: 2 }, contentSx)}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "text.primary",
            mb: 0.5,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1.5,
            fontStyle: "italic",
          }}
        >
          {species}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={`${releaseCount ?? 0} releases`}
            size="small"
            sx={{
              backgroundColor: accentColor,
              color: "#000",
              fontWeight: 600,
              fontSize: "0.65rem",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
