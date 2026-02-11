import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";
import { Link as RouterLink } from "react-router-dom";

const PLACEHOLDER_IMAGE = "/placeholder.svg";

interface PetCardSimpleProps {
  name: string;
  species: string;
  imageUrl?: string | undefined;
  link?: string;
  to?: string;
  rarity?: string;
  cardSx?: SxProps<Theme>;
  mediaSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

export const PetCardSimple = ({
  name,
  species,
  imageUrl,
  link = "#",
  to,
  rarity,
  cardSx,
  mediaSx,
  contentSx,
}: PetCardSimpleProps) => {
  const isRouterLink = Boolean(to);

  return (
    <Card
      component={isRouterLink ? RouterLink : "a"}
      {...(isRouterLink ? { to } : { href: link })}
      sx={[{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        position: "relative",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: { xs: "none", md: "translateY(-4px)" },
          boxShadow: { xs: "none", md: "0 8px 24px rgba(236, 72, 153, 0.15)" },
        }
      }, cardSx]}
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
        sx={[{
          height: 180,
          backgroundColor: "#FFFFFF",
          backgroundImage: `url(${imageUrl ?? PLACEHOLDER_IMAGE})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
        }, mediaSx]}
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Chip
            label={species}
            size="small"
            sx={{
              backgroundColor: "rgba(0, 212, 255, 0.15)",
              color: "text.primary",
              fontWeight: 500,
              fontSize: "0.7rem",
            }}
          />
          {rarity && (
            <Chip
              label={rarity}
              size="small"
              sx={{
                backgroundColor: "rgba(249, 115, 22, 0.2)",
                color: "#f97316",
                fontWeight: 500,
                fontSize: "0.7rem",
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
