import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import type { SeriesSummary } from "../../entities";

interface SeriesCardProps extends SeriesSummary {
  cardSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

export const SeriesCard = ({
  id,
  name,
  yearLabel,
  releaseCount,
  characterCount,
  imageUrl,
  description,
  cardSx,
  contentSx,
}: SeriesCardProps) => {
  return (
    <Card
      component={RouterLink}
      to={`/catalog/s/${id}`}
      sx={[{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        position: "relative",
      }, cardSx]}
    >
      <CardContent sx={[{ flex: 1, display: "flex", flexDirection: "column", pb: 1 }, contentSx]}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>
          <Chip
            label={yearLabel ?? "—"}
            size="small"
            sx={{
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              fontWeight: 600,
              fontSize: "0.7rem",
              ml: 1,
              flexShrink: 0,
            }}
          />
        </Box>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ mt: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              {characterCount ?? 0} characters
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {releaseCount ?? 0} releases
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
