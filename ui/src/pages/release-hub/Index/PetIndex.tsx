import { useParams, useNavigate } from "react-router-dom";
import { CSSProperties, ReactNode, useMemo } from "react";
import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  Chip,
  Card,
  CardMedia,
  Avatar,
  Stack,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import ImageIconMui from "@mui/icons-material/Image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Pet } from "../entities/pet";
import { petIndexMock, petIndexByNumericId } from "@/data/real-data/petIndexMock";
import { releaseIndexMock } from "@/data/real-data/releaseIndexMock";
import { ReleaseCardHome } from "../components/release-cards";
import { PetOwnerCard } from "../components/PetOwnerCard";

// ==================== DESIGN TOKENS ====================
const tokens = {
  colors: {
    background: "hsl(0, 0%, 5%)",
    foreground: "hsl(0, 0%, 100%)",
    card: "hsl(0, 0%, 10%)",
    cardForeground: "hsl(0, 0%, 100%)",
    primary: "hsl(270, 60%, 55%)",
    primaryForeground: "hsl(0, 0%, 100%)",
    secondary: "hsl(330, 70%, 55%)",
    secondaryForeground: "hsl(0, 0%, 100%)",
    muted: "hsl(0, 0%, 15%)",
    mutedForeground: "hsl(0, 0%, 65%)",
    border: "hsl(0, 0%, 20%)",
  },
  radius: "0.5rem",
  container: {
    center: true,
    padding: "2rem",
    maxWidth: "1400px",
  },
};

// ==================== RELEASE MAP ====================
const releaseById = new Map(releaseIndexMock.map((release) => [release.id, release]));

// ==================== TYPES ====================
type PetOwner = NonNullable<Pet["owners"]>[number];
type PetRelease = NonNullable<Pet["releases"]>[number];
type PetFact = NonNullable<Pet["facts"]>[number];
type PetFanArt = NonNullable<Pet["fanArt"]>[number];

// ==================== STYLED LINK STUB ====================
const StyledLink = ({
  to,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
}: {
  to: string;
  children: ReactNode;
  style?: CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Link
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      sx={{
        textDecoration: "none",
        color: "inherit",
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
};

// ==================== ICONS (Inline SVGs) ====================
const MonstrinoLogo = () => (
  <svg viewBox="0 0 32 32" style={{ height: "2rem", width: "2rem" }} fill="none">
    <path
      d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
      fill={tokens.colors.primary}
    />
    <path
      d="M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      fill={tokens.colors.background}
    />
    <path
      d="M16 24c3.5 0 6-2 6-4H10c0 2 2.5 4 6 4z"
      fill={tokens.colors.background}
    />
  </svg>
);

const ChevronRight = ({ size = "1rem" }: { size?: string }) => (
  <ChevronRightIcon style={{ height: size, width: size }} />
);

const ArrowRight = ({ size = "1rem" }: { size?: string }) => (
  <ArrowForwardIcon style={{ height: size, width: size }} />
);

const UserIcon = ({ size = "1.25rem" }: { size?: string }) => (
  <PersonIcon style={{ height: size, width: size }} />
);

const ImageIcon = ({ size = "2rem" }: { size?: string }) => (
  <ImageIconMui style={{ height: size, width: size }} />
);

const HeartIcon = ({ size = "1rem" }: { size?: string }) => (
  <FavoriteIcon style={{ height: size, width: size }} />
);

// ==================== COMPONENTS ====================


// Breadcrumb Navigation
const Breadcrumbs = ({ petName }: { petName: string }) => {
  const navStyle: CSSProperties = {
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    color: tokens.colors.mutedForeground,
  };

  const linkStyle: CSSProperties = {
    transition: "color 0.2s",
  };

  const chevronStyle: CSSProperties = {
    height: "0.75rem",
    width: "0.75rem",
  };

  return (
    <Box component="nav" sx={navStyle}>
      <StyledLink to="/" style={linkStyle}>
        Home
      </StyledLink>
      <Box component="span" sx={chevronStyle}>
        <ChevronRight size="0.75rem" />
      </Box>
      <StyledLink to="/pets" style={linkStyle}>
        Pets
      </StyledLink>
      <Box component="span" sx={chevronStyle}>
        <ChevronRight size="0.75rem" />
      </Box>
      <Box component="span" sx={{ color: tokens.colors.foreground }}>{petName}</Box>
    </Box>
  );
};

// Badge Component
const Badge = ({
  variant = "default",
  children,
}: {
  variant?: "default" | "secondary" | "outline";
  children: ReactNode;
}) => {
  const variants: Record<string, any> = {
    default: {
      backgroundColor: "hsla(270, 60%, 55%, 0.2)",
      color: tokens.colors.primary,
      borderColor: "hsla(270, 60%, 55%, 0.3)",
    },
    secondary: {
      backgroundColor: "hsla(330, 70%, 55%, 0.2)",
      color: tokens.colors.secondary,
      borderColor: "hsla(330, 70%, 55%, 0.3)",
    },
    outline: {
      backgroundColor: "transparent",
      color: tokens.colors.mutedForeground,
      borderColor: tokens.colors.border,
    },
  };

  return (
    <Chip
      label={children}
      sx={{
        ...variants[variant],
        border: "1px solid",
        fontSize: "0.75rem",
        fontWeight: 500,
      }}
    />
  );
};

// Pet Hero Section
const PetHero = ({ pet }: { pet: Pet }) => {
  const badgesStyle: CSSProperties = {
    marginBottom: "1rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.75rem",
  };

  const titleStyle: CSSProperties = {
    marginBottom: "1rem",
    fontSize: "2.25rem",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    color: tokens.colors.foreground,
  };

  const descStyle: CSSProperties = {
    fontSize: "1.125rem",
    color: tokens.colors.mutedForeground,
  };

  const imageContainerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageBoxStyle: CSSProperties = {
    aspectRatio: "1",
    width: "100%",
    maxWidth: "28rem",
    overflow: "hidden",
    borderRadius: "1rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
  };

  const imagePlaceholderStyle: CSSProperties = {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsla(0, 0%, 15%, 0.3)",
  };

  const placeholderTextStyle: CSSProperties = {
    textAlign: "center",
    color: tokens.colors.mutedForeground,
  };

  return (
    <Grid container spacing={2} component="section" sx={{
      marginBottom: "3rem",
      gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
      gap: { xs: "2rem", lg: "3rem" },
      display: "grid",
    }}>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box sx={badgesStyle}>
          <Badge>{pet.type ?? "Pet"}</Badge>
          {pet.subtype && <Badge variant="outline">{pet.subtype}</Badge>}
          {pet.rarity && pet.rarity !== "common" && (
            <Badge variant="secondary">
              <Box component="span" sx={{ marginRight: "0.25rem", display: "flex" }}>
                <HeartIcon size="0.75rem" />
              </Box>
              {pet.rarity.charAt(0).toUpperCase() + pet.rarity.slice(1)}
            </Badge>
          )}
        </Box>
        <Typography variant="h1" sx={{
          ...titleStyle,
          fontSize: { xs: "2.25rem", md: "3rem", lg: "3.75rem" },
        }}>
          {pet.name}
        </Typography>
        <Typography sx={descStyle}>{pet.description ?? ""}</Typography>
      </Box>
      <Box sx={imageContainerStyle}>
        <Box sx={imageBoxStyle}>
          {pet.imageUrl ? (
            <Box component="img" src={pet.imageUrl} alt={pet.name} sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
            }} />
          ) : (
            <Box sx={imagePlaceholderStyle}>
              <Box sx={placeholderTextStyle}>
                <Box sx={{ margin: "0 auto 0.5rem", opacity: 0.5 }}>
                  <ImageIcon size="4rem" />
                </Box>
                <Typography sx={{ fontSize: "0.875rem" }}>Pet Image</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

// Ownership Section
const OwnershipSection = ({ owners }: { owners?: PetOwner[] }) => {
  const safeOwners = owners ?? [];
  const sectionStyle: CSSProperties = {
    marginBottom: "2.5rem",
  };

  const titleStyle: CSSProperties = {
    marginBottom: "1rem",
    fontSize: "1.125rem",
    fontWeight: 600,
    color: tokens.colors.foreground,
  };

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h2" sx={titleStyle}>Ownership</Typography>
      <Grid container spacing={2} sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        {safeOwners.map((owner) => (
          <PetOwnerCard
            key={owner.id}
            id={owner.id}
            name={owner.name}
            role={`${owner.role} owner`}
            imageUrl={owner.imageUrl}
          />
        ))}
      </Grid>
    </Box>
  );
};

// Releases Section
const ReleasesSection = ({ releases }: { releases?: PetRelease[] }) => {
  const safeReleases = releases ?? [];
  const sectionStyle: CSSProperties = {
    marginBottom: "2.5rem",
  };

  const titleStyle: CSSProperties = {
    marginBottom: "1rem",
    fontSize: "1.125rem",
    fontWeight: 600,
    color: tokens.colors.foreground,
  };

  // Get full release data from releaseById map
  const fullReleases = safeReleases
    .map((petRelease) => releaseById.get(petRelease.id))
    .filter((release): release is NonNullable<typeof release> => release !== undefined);

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h2" sx={titleStyle}>Appearances</Typography>
      <Grid container spacing={2} sx={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
      }}>
        {fullReleases.map((release) => (
          <ReleaseCardHome key={release.id} {...release} />
        ))}
      </Grid>
    </Box>
  );
};

// Exclusivity Section
const ExclusivitySection = ({
  exclusivity,
  note,
}: {
  exclusivity?: Pet["exclusivity"];
  note?: string;
}) => {
  const statusConfig = {
    exclusive: { label: "Exclusive", variant: "secondary" as const },
    shared: { label: "Shared", variant: "default" as const },
    limited: { label: "Limited Edition", variant: "secondary" as const },
  };

  const resolvedExclusivity = exclusivity ?? "shared";
  const config = statusConfig[resolvedExclusivity];

  const sectionStyle: CSSProperties = {
    marginBottom: "2.5rem",
  };

  const titleStyle: CSSProperties = {
    marginBottom: "1rem",
    fontSize: "1.125rem",
    fontWeight: 600,
    color: tokens.colors.foreground,
  };

  const cardStyle: CSSProperties = {
    borderRadius: "0.75rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
    padding: "1.25rem",
  };

  const innerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  const noteStyle: CSSProperties = {
    color: tokens.colors.mutedForeground,
  };

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h2" sx={titleStyle}>Availability</Typography>
      <Box sx={cardStyle}>
        <Box sx={innerStyle}>
          <Badge variant={config.variant}>{config.label}</Badge>
          <Typography sx={noteStyle}>{note ?? "Availability varies across releases."}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Facts Section
const FactsSection = ({ facts }: { facts?: PetFact[] }) => {
  const safeFacts = facts ?? [];
  const sectionStyle: CSSProperties = {
    marginBottom: "2.5rem",
  };

  const titleStyle: CSSProperties = {
    marginBottom: "1rem",
    fontSize: "1.125rem",
    fontWeight: 600,
    color: tokens.colors.foreground,
  };

  const cardStyle: CSSProperties = {
    borderRadius: "0.5rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
    padding: "1rem",
  };

  const labelStyle: CSSProperties = {
    marginBottom: "0.25rem",
    fontSize: "0.75rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: tokens.colors.mutedForeground,
  };

  const valueStyle: CSSProperties = {
    fontWeight: 500,
    color: tokens.colors.foreground,
  };

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h2" sx={titleStyle}>Facts & Details</Typography>
      <Grid container spacing={2} sx={{
        display: "grid",
        gap: "0.75rem",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
      }}>
        {safeFacts.map((fact, index) => (
          <Box key={index} sx={cardStyle}>
            <Typography sx={labelStyle}>{fact.label}</Typography>
            <Typography sx={valueStyle}>{fact.value}</Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

// Image Gallery
const ImageGallery = ({ images, title }: { images?: string[]; title: string }) => {
  const safeImages = images ?? [];
  const sectionStyle: CSSProperties = {
    marginBottom: "2.5rem",
  };

  const titleStyle: CSSProperties = {
    marginBottom: "1rem",
    fontSize: "1.125rem",
    fontWeight: 600,
    color: tokens.colors.foreground,
  };

  const cardStyle: CSSProperties = {
    aspectRatio: "1",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "0.5rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
    transition: "border-color 0.2s",
  };

  const placeholderStyle: CSSProperties = {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsla(0, 0%, 15%, 0.3)",
    transition: "background-color 0.2s",
  };

  const iconStyle: CSSProperties = {
    opacity: 0.5,
    color: tokens.colors.mutedForeground,
  };

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h2" sx={titleStyle}>{title}</Typography>
      <Grid container spacing={2} sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
        gap: "1rem",
      }}>
        <Box component="img" src={safeImages[0]} alt={`${title} 1`} sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }} />

        {/* {safeImages.map((imageUrl, index) => (
          <Box key={index} sx={{
            ...cardStyle,
            "&:hover": {
              borderColor: "hsla(270, 60%, 55%, 0.5)",
              "& > div": {
                backgroundColor: "hsla(0, 0%, 15%, 0.5)",
              }
            }
          }}>
            {imageUrl ? (
              <Box component="img" src={imageUrl} alt={`${title} ${index + 1}`} sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }} />
            ) : (
              <Box sx={placeholderStyle}>
                <Box component="span" sx={iconStyle}>
                  <ImageIcon />
                </Box>
              </Box>
            )}
          </Box>
        ))} */}
      </Grid>
    </Box>
  );
};

// Fan Art Section
const FanArtSection = ({ fanArt }: { fanArt?: PetFanArt[] }) => {
  const safeFanArt = fanArt ?? [];
  const sectionStyle: CSSProperties = {
    marginBottom: "2.5rem",
  };

  const headerStyle: CSSProperties = {
    marginBottom: "1rem",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  };

  const titleStyle: CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: tokens.colors.foreground,
  };

  const disclaimerStyle: CSSProperties = {
    fontSize: "0.75rem",
    color: tokens.colors.mutedForeground,
  };

  const cardStyle: CSSProperties = {
    aspectRatio: "4/3",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "0.5rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
    transition: "border-color 0.2s",
  };

  const innerStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsla(0, 0%, 15%, 0.2)",
    transition: "background-color 0.2s",
  };

  const iconStyle: CSSProperties = {
    opacity: 0.5,
    color: tokens.colors.mutedForeground,
  };

  const artistOverlayStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, hsla(0, 0%, 5%, 0.9), transparent)",
    padding: "0.75rem",
    opacity: 0,
    transition: "opacity 0.2s",
  };

  const artistTextStyle: CSSProperties = {
    fontSize: "0.75rem",
    color: tokens.colors.mutedForeground,
  };

  return (
    <Box component="section" sx={sectionStyle}>
      <Box sx={headerStyle}>
        <Typography variant="h2" sx={titleStyle}>Community Creations</Typography>
        <Box component="span" sx={disclaimerStyle}>Fan content — not official</Box>
      </Box>
      <Grid container spacing={2} sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        gap: "1rem",
      }}>
        {safeFanArt.map((art) => (
          <Box key={art.id} sx={{
            ...cardStyle,
            "&:hover": {
              borderColor: "hsla(330, 70%, 55%, 0.5)",
              "& > div": {
                backgroundColor: "hsla(0, 0%, 15%, 0.4)",
              },
              "& .artist-overlay": {
                opacity: 1,
              }
            }
          }}>
            <Box sx={innerStyle}>
              <Box component="span" sx={iconStyle}>
                <ImageIcon />
              </Box>
              {art.artist && (
                <Box sx={artistOverlayStyle} className="artist-overlay">
                  <Typography sx={artistTextStyle}>by {art.artist}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

// ==================== MAIN PAGE ====================
const PetIndex = () => {
  const { internal_id, petId, id } = useParams();
  const resolvedId = internal_id ?? petId ?? id ?? "";
  const pet = useMemo<Pet | null>(() => {
    if (!resolvedId) {
      return petIndexMock[0] ?? null;
    }
    const byNumeric = petIndexByNumericId.get(resolvedId);
    if (byNumeric) return byNumeric;
    const byId = petIndexMock.find((item) => item.id === resolvedId);
    return byId ?? null;
  }, [resolvedId]);

  const pageStyle: CSSProperties = {
    minHeight: "100vh",
    backgroundColor: tokens.colors.background,
    color: tokens.colors.foreground,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  const footerStyle: CSSProperties = {
    borderTop: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.background,
    padding: "2rem 0",
  };

  const footerInnerStyle: CSSProperties = {
    maxWidth: tokens.container.maxWidth,
    margin: "0 auto",
    textAlign: "center",
    fontSize: "0.875rem",
    color: tokens.colors.mutedForeground,
  };

  if (!pet) {
    return (
      <Box sx={pageStyle}>
        <Container component="main" maxWidth="lg" sx={{
          py: { xs: 4, md: 6 }
        }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                marginBottom: "1rem",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: tokens.colors.foreground,
              }}
            >
              Pet Not Found
            </Typography>
            <Typography sx={{ color: tokens.colors.mutedForeground }}>
              The pet you're looking for doesn't exist in our archives.
            </Typography>
            <StyledLink
              to="/pets"
              style={{
                marginTop: "1.5rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: tokens.colors.primary,
              }}
            >
              <Box component="span" sx={{ transform: "rotate(180deg)" }}>
                <ArrowRight />
              </Box>
              Back to all pets
            </StyledLink>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={pageStyle}>
      <Container component="main" maxWidth="lg" sx={{
        py: { xs: 4, md: 6 }
      }}>
        <Breadcrumbs petName={pet.name} />
        <PetHero pet={pet} />
        <Box>
          {(pet.owners && pet.owners.length > 0) || (pet.releases && pet.releases.length > 0) ? (
            <Grid container spacing={2} sx={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: {
                xs: "1fr",
                md: (pet.owners && pet.owners.length > 0) && (pet.releases && pet.releases.length > 0)
                  ? "1fr 1fr"
                  : "1fr"
              },
              mb: "2rem",
            }}>
              {pet.owners && pet.owners.length > 0 && <OwnershipSection owners={pet.owners} />}
              {pet.releases && pet.releases.length > 0 && <ReleasesSection releases={pet.releases} />}
            </Grid>
          ) : null}
          <FactsSection facts={pet.facts} />
        </Box>
        <ImageGallery images={pet.officialImages} title="Official Gallery" />
        {/* <FanArtSection fanArt={pet.fanArt} /> */}
      </Container>
      <Box component="footer" sx={footerStyle}>
        <Box sx={footerInnerStyle}>
          <Typography>© 2024 Monstrino — The Monster High Collector Archive</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PetIndex;
