import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { CharacterSummary } from "../../entities";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

type CharacterCardProps = CharacterSummary;

export const CharacterCard = ({
  id,
  name,
  species,
  releaseCount,
  imageUrl,
  accentColor = "#FF1493"
}: CharacterCardProps) => {
  return (
    <Card
      component={RouterLink}
      to={`/catalog/c/${id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
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
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: 320,
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
        }}
      />

      <CardContent sx={{ pt: 0, mt: -4, position: "relative", zIndex: 2 }}>
        <Typography
          variant="h5"
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
            mb: 2,
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
              fontSize: "0.7rem",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
