import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface PetOwnerCardProps {
  id: string;
  name: string;
  role?: string;
  imageUrl?: string;
  accentColor?: string;
  cardSx?: SxProps<Theme>;
  mediaSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

export const PetOwnerCard = ({
  id,
  name,
  role,
  imageUrl,
  accentColor = "#FF1493",
  cardSx,
  mediaSx,
  contentSx,
}: PetOwnerCardProps) => {
  return (
    <Card
      component={RouterLink}
      to={`/catalog/c/${id}`}
      sx={[{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        maxWidth: 200,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accentColor} 0%, transparent 100%)`,
          zIndex: 1,
        },
      }, cardSx]}
    >
      <CardMedia
        component="div"
        sx={[{
          height: 200,
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
            height: "40%",
            background: "linear-gradient(to top, rgba(20, 20, 32, 1) 0%, transparent 100%)",
          },
        }, mediaSx]}
      />

      <CardContent sx={[{ pt: 0, mt: -3, position: "relative", zIndex: 2, pb: 2 }, contentSx]}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 0.5,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            fontSize: "0.9rem",
          }}
        >
          {name}
        </Typography>
        {role && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
              fontSize: "0.75rem",
              textTransform: "capitalize",
            }}
          >
            {role}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
