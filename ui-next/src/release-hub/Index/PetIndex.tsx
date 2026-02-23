'use client';

import { useParams } from "@/shared/router";
import { useMemo, useState, useEffect } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ImageIconMui from "@mui/icons-material/Image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Pet } from "../entities/pet";
import { petIndexMock, petIndexByNumericId } from "@/data/real-data/petIndexMock";
import { releaseIndexMock } from "@/data/real-data/releaseIndexMock";
import { ReleaseCardMinimal } from "@cards/release-card";
import { PetOwnerCard } from "@cards/pet-owner-card";
import { ReleaseBreadcrumb } from "@/widgets/navigation/breadcrumb";
import { StyledLink } from "@/widgets/navigation/styled-link";
import { Badge, SurfaceCard, SectionTitle } from "@/shared/ui/release-hub";

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
    paddingMobile: "1rem",
    maxWidth: "1400px",
  },
};

const borderColor = "rgba(255,255,255,0.08)";

const sectionTitleSx = { fontSize: { xs: "1.2rem", md: "1.35rem" } };

const releaseCardLayout = {
  gridSx: {
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(auto-fit, minmax(150px, 1fr))",
      sm: "repeat(2, minmax(0, 1fr))",
      md: "repeat(3, minmax(0, 1fr))",
      lg: "repeat(4, minmax(0, 1fr))",
    },
    gap: { xs: "0.5rem", sm: "0.75rem", md: "1rem" },
  },
  containerSx: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    minWidth: 0,
  },
  cardSx: {
    width: "100%",
    maxWidth: { xs: 180, sm: 220, md: 210, lg: 200 },
    minWidth: { xs: 0, sm: 180 },
  },
  imageSx: { paddingTop: { xs: "150%", md: "145%", lg: "140%" } },
  contentSx: { p: { xs: "0.6rem", md: "0.75rem" } },
};

const ownerCardLayout = {
  cardSx: { width: "100%", maxWidth: { xs: 160, md: 180 }, margin: "0 auto" },
  mediaSx: { height: { xs: 160, md: 180 } },
  contentSx: { pb: 1.5 },
};

// ==================== RELEASE MAP ====================
const releaseById = new Map<string, (typeof releaseIndexMock)[number]>(
  releaseIndexMock.map((release) => [release.id, release])
);

// ==================== TYPES ====================
type PetRelease = NonNullable<Pet["releases"]>[number];
type PetFact = NonNullable<Pet["facts"]>[number];

const ArrowRight = ({ size = "1rem" }: { size?: string }) => (
  <ArrowForwardIcon style={{ height: size, width: size }} />
);

const ImageIcon = ({ size = "2rem" }: { size?: string }) => (
  <ImageIconMui style={{ height: size, width: size }} />
);

const HeartIcon = ({ size = "1rem" }: { size?: string }) => (
  <FavoriteIcon style={{ height: size, width: size }} />
);

// ==================== COMPONENTS ====================

// Badge Component
const badgeVariantSx = {
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
} as const;
const badgeBaseSx = { border: "1px solid", fontSize: "0.75rem", fontWeight: 500 };

// Pet Hero Section
const PetHero = ({ pet }: { pet: Pet }) => {
  const owners = pet.owners ?? [];
  
  const badgesStyle = {
    marginBottom: { xs: "0.75rem", md: "1rem" },
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { xs: "0.5rem", md: "0.75rem" },
  };

  const titleStyle = {
    marginBottom: { xs: "0.75rem", md: "1rem" },
    fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem", lg: "3.75rem" },
    fontWeight: 700,
    letterSpacing: "-0.025em",
    color: tokens.colors.foreground,
    lineHeight: 1.2,
  };

  const descStyle = {
    fontSize: { xs: "1rem", md: "1.125rem" },
    color: tokens.colors.mutedForeground,
    lineHeight: 1.6,
  };

  const imageContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageBoxStyle = {
    aspectRatio: "1",
    width: "100%",
    maxWidth: { xs: "100%", md: "28rem" },
    overflow: "hidden",
    borderRadius: { xs: "0.75rem", md: "1rem" },
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: "#ffffff",
  };

  const imagePlaceholderStyle = {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsla(0, 0%, 15%, 0.3)",
  };

  const placeholderTextStyle = {
    textAlign: "center",
    color: tokens.colors.mutedForeground,
  };

  return (
    <Grid container spacing={2} component="section" sx={{
      marginBottom: { xs: "2rem", md: "3rem" },
      gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr", lg: "1fr 1fr" },
      gap: { xs: "1.5rem", md: "2rem", lg: "3rem" },
      display: "grid",
    }}>
      <Box sx={{ display: "flex", flexDirection: "column", order: { xs: 2, sm: 2, md: 1, lg: 1 } }}>
        <Typography variant="h1" sx={titleStyle}>
          {pet.name}
        </Typography>
        <Box sx={badgesStyle}>
          <Badge variantSx={badgeVariantSx} baseSx={badgeBaseSx}>
            {pet.type ?? "Pet"}
          </Badge>
          {pet.subtype && (
            <Badge variant="outline" variantSx={badgeVariantSx} baseSx={badgeBaseSx}>
              {pet.subtype}
            </Badge>
          )}
          {pet.rarity && pet.rarity !== "common" && (
            <Badge variant="secondary" variantSx={badgeVariantSx} baseSx={badgeBaseSx}>
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                <HeartIcon size="0.75rem" />
                {pet.rarity.charAt(0).toUpperCase() + pet.rarity.slice(1)}
              </Box>
            </Badge>
          )}
        </Box>
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: owners.length > 0 ? { xs: "1fr", md: "1fr 3fr" } : "1fr",
          gap: { xs: 2, md: 3 },
          alignItems: "start"
        }}>
          {owners.length === 1 && (
            <Box sx={{ mt: { xs: 2, md: 0 } }}>
              <Typography variant="h2" sx={{ mb: { xs: 1, md: 1.5 }, fontSize: { xs: "1.1rem", md: "1.3rem" }, fontWeight: 600, color: tokens.colors.foreground }}>
                Ownership
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: "0.75rem", md: "1rem" } }}>
                {owners.map((owner) => (
                  <PetOwnerCard
                    key={owner.id}
                    id={owner.id}
                    name={owner.name}
                    role={`${owner.role} owner`}
                    {...(owner.imageUrl ? { imageUrl: owner.imageUrl } : {})}
                    cardSx={ownerCardLayout.cardSx}
                    mediaSx={ownerCardLayout.mediaSx}
                    contentSx={ownerCardLayout.contentSx}
                  />
                ))}
              </Box>
            </Box>
          )}
          <Box sx={{ pl: { xs: 0, md: 3, lg: 4 } }}>
            <Typography variant="h2" sx={{ mb: { xs: 1, md: 1.5 }, fontSize: { xs: "1.1rem", md: "1.3rem" }, fontWeight: 600, color: tokens.colors.foreground }}>
              About
            </Typography>
            <Typography sx={descStyle}>{pet.description ?? ""}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ ...imageContainerStyle, order: { xs: 1, sm: 1, md: 2, lg: 2 } }}>
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

// Releases Section
const ReleasesSection = ({ releases }: { releases?: PetRelease[] }) => {
  const safeReleases = releases ?? [];
  const [hoveredReleaseId, setHoveredReleaseId] = useState<string | number | null>(null);
  const sectionStyle = {
    marginBottom: { xs: "1.5rem", md: "2.5rem" },
  };

  const titleStyle = {
    marginBottom: { xs: "0.75rem", md: "1rem" },
    fontSize: { xs: "1.1rem", md: "1.3rem" },
    fontWeight: 600,
    color: tokens.colors.foreground,
  };

  // Get full release data from releaseById map
  const fullReleases = safeReleases
    .map((petRelease) => releaseById.get(`${petRelease.id}`))
    .filter((release): release is NonNullable<typeof release> => release !== undefined);

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h2" sx={titleStyle}>Appearances</Typography>
      <Box sx={releaseCardLayout.gridSx}>
        {fullReleases.map((release) => (
          <ReleaseCardMinimal
            key={release.id}
            doll={{
              id: release.id,
              releaseId: release.id,
              character: release.characterName ?? "Unknown",
              variant: release.name,
              ...(release.imageUrl !== undefined ? { imageUrl: release.imageUrl } : {}),
              rarity: release.rarity ?? (release.isExclusive ? "Rare" : "Common"),
              ...(release.year !== undefined ? { year: release.year } : {}),
            }}
            isHovered={hoveredReleaseId === release.id}
            onMouseEnter={() => setHoveredReleaseId(release.id)}
            onMouseLeave={() => setHoveredReleaseId(null)}
            size="compact"
            enableHoverLift
            containerSx={releaseCardLayout.containerSx}
            cardSx={releaseCardLayout.cardSx}
            imageSx={releaseCardLayout.imageSx}
            contentSx={releaseCardLayout.contentSx}
          />
        ))}
      </Box>
    </Box>
  );
};

// Facts Section
const FactsSection = ({ facts }: { facts?: PetFact[] }) => {
  const safeFacts = facts ?? [];
  
  return (
    <Box component="section" sx={{ marginBottom: { xs: "1.5rem", md: "2.5rem" } }}>
      <SectionTitle title="Facts & Details" titleSx={sectionTitleSx} />
      <SurfaceCard>
        {safeFacts.map((fact, index) => (
          <Box
            key={fact.label}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: { xs: 0.5, sm: 2 },
              py: 1.5,
              borderBottom: index < safeFacts.length - 1 ? `1px solid ${borderColor}` : "none",
            }}
          >
            <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>{fact.label}</Typography>
            <Typography
              sx={{
                fontWeight: 600,
                textAlign: { xs: "left", sm: "right" },
                maxWidth: { xs: "100%", sm: 480 },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {fact.value}
            </Typography>
          </Box>
        ))}
      </SurfaceCard>
    </Box>
  );
};

// Image Gallery
const ImageGallery = ({ images, title }: { images?: string[]; title: string }) => {
  const safeImages = images ?? [];
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    setIsExpanded(safeImages.length > 1);
  }, [safeImages.length]);
  
  const sectionStyle = {
    marginBottom: { xs: "1.5rem", md: "2.5rem" },
  };

  const titleStyle = {
    marginBottom: { xs: "0.75rem", md: "1rem" },
    fontSize: { xs: "1rem", md: "1.125rem" },
    fontWeight: 600,
    color: tokens.colors.foreground,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
    transition: "all 0.2s",
    "&:hover": {
      borderColor: tokens.colors.primary,
      backgroundColor: "hsla(270, 60%, 55%, 0.1)",
    },
  };

  const cardStyle = {
    aspectRatio: "1",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "0.5rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
    transition: "border-color 0.2s",
  };

  const placeholderStyle = {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsla(0, 0%, 15%, 0.3)",
    transition: "background-color 0.2s",
  };

  const iconStyle = {
    opacity: 0.5,
    color: tokens.colors.mutedForeground,
  };

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography 
        variant="h2" 
        sx={titleStyle}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box component="span" sx={{ 
          transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
          display: "inline-flex",
        }}>
          ▶
        </Box>
        {title}
      </Typography>
      {isExpanded && (
        <Grid container spacing={2} sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
          gap: { xs: "0.5rem", md: "1rem" },
          marginTop: "1rem",
        }}>
          {safeImages.map((imageUrl, index) => (
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
          ))}
        </Grid>
      )}
    </Box>
  );
};

// ==================== MAIN PAGE ====================
const PetIndex = () => {
  const { internal_id, petId, id } = useParams();
  const resolveParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);
  const resolvedId = resolveParam(internal_id) ?? resolveParam(petId) ?? resolveParam(id) ?? "";
  const pet = useMemo<Pet | null>(() => {
    if (!resolvedId) {
      return petIndexMock[0] ?? null;
    }
    const byNumeric = petIndexByNumericId.get(resolvedId);
    if (byNumeric) return byNumeric;
    const byId = petIndexMock.find((item) => item.id === resolvedId);
    return byId ?? null;
  }, [resolvedId]);

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#0B0D11",
    backgroundImage:
      "radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%), radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%), linear-gradient(180deg, #0B0D11 0%, #121622 100%)",
    color: tokens.colors.foreground,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  if (!pet) {
    return (
      <Box sx={pageStyle}>
        <Container component="main" maxWidth="lg" sx={{
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 6 }
        }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                marginBottom: { xs: "0.75rem", md: "1rem" },
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                fontWeight: 700,
                color: tokens.colors.foreground,
              }}
            >
              Pet Not Found
            </Typography>
            <Typography sx={{ 
              color: tokens.colors.mutedForeground,
              fontSize: { xs: "0.875rem", md: "1rem" }
            }}>
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
        px: { xs: 2, md: 3 },
        pt: { xs: 1, md: 2 },
        pb: { xs: 3, md: 6 }
      }}>
        <ReleaseBreadcrumb 
          items={[
            { label: 'Pets', link: '/catalog/p' },
            { label: pet.name }
          ]} 
          colors={tokens.colors} 
        />
        <PetHero pet={pet} />
        <Box>
          <FactsSection {...(pet.facts ? { facts: pet.facts } : {})} />
          {pet.releases && pet.releases.length > 0 && <ReleasesSection releases={pet.releases} />}
        </Box>
        <ImageGallery title="Official Gallery" {...(pet.officialImages ? { images: pet.officialImages } : {})} />
        {/* <FanArtSection fanArt={pet.fanArt} /> */}
      </Container>
    </Box>
  );
};

export default PetIndex;
