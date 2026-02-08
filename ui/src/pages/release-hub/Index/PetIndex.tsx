import { useParams } from "react-router-dom";
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
}) => (
  <Link
    href={to}
    onClick={(e) => {
      e.preventDefault();
      window.history.pushState({}, "", to);
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

// Navigation Header

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
  const sectionStyle: CSSProperties = {
    marginBottom: "3rem",
    display: "grid",
    gap: "2rem",
  };

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
    <Box component="section" sx={sectionStyle} className="hero-grid">
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
        <Typography variant="h1" sx={titleStyle} className="hero-title">
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
      <style>{`
        .hero-grid {
          grid-template-columns: 1fr;
        }
        .hero-title {
          font-size: 2.25rem;
        }
        @media (min-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
          .hero-title {
            font-size: 3.75rem;
          }
        }
      `}</style>
    </Box>
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

  const containerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  };

  const cardStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    borderRadius: "0.75rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
    padding: "1rem",
    transition: "border-color 0.2s, background-color 0.2s",
  };

  const avatarStyle: CSSProperties = {
    display: "flex",
    height: "3rem",
    width: "3rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9999px",
    backgroundColor: tokens.colors.muted,
  };

  const nameStyle: CSSProperties = {
    fontWeight: 500,
    color: tokens.colors.foreground,
  };

  const roleStyle: CSSProperties = {
    fontSize: "0.875rem",
    textTransform: "capitalize",
    color: tokens.colors.mutedForeground,
  };

  const arrowStyle: CSSProperties = {
    marginLeft: "1rem",
    opacity: 0,
    transition: "opacity 0.2s, transform 0.2s",
    color: tokens.colors.mutedForeground,
  };

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h2" sx={titleStyle}>Ownership</Typography>
      <Box sx={containerStyle}>
        {safeOwners.map((owner) => (
          <StyledLink
            key={owner.id}
            to={`/catalog/c/${owner.id}`}
            style={cardStyle}
          >
            <Avatar sx={avatarStyle}>
              <UserIcon size="1.5rem" />
            </Avatar>
            <Box>
              <Typography sx={nameStyle}>{owner.name}</Typography>
              <Typography sx={roleStyle}>{owner.role} Owner</Typography>
            </Box>
            <Box component="span" sx={arrowStyle} className="owner-arrow">
              <ArrowRight />
            </Box>
          </StyledLink>
        ))}
      </Box>
      <style>{`
        a:hover .owner-arrow {
          opacity: 1;
          transform: translateX(0.25rem);
        }
      `}</style>
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

  const gridStyle: CSSProperties = {
    display: "grid",
    gap: "0.75rem",
  };

  const cardStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "0.5rem",
    border: `1px solid ${tokens.colors.border}`,
    backgroundColor: tokens.colors.card,
    padding: "0.75rem 1rem",
    transition: "border-color 0.2s, background-color 0.2s",
  };

  const nameStyle: CSSProperties = {
    fontWeight: 500,
    color: tokens.colors.foreground,
  };

  const yearStyle: CSSProperties = {
    fontSize: "0.875rem",
    color: tokens.colors.mutedForeground,
  };

  const arrowStyle: CSSProperties = {
    opacity: 0,
    transition: "opacity 0.2s, transform 0.2s",
    color: tokens.colors.mutedForeground,
  };

  return (
    <Box component="section" sx={sectionStyle}>
      <Typography variant="h2" sx={titleStyle}>Appearances</Typography>
      <Box sx={gridStyle} className="releases-grid">
        {safeReleases.map((release) => (
          <StyledLink key={release.id} to={`/releases/${release.id}`} style={cardStyle}>
            <Box>
              <Typography sx={nameStyle}>{release.name}</Typography>
              <Typography sx={yearStyle}>{release.year}</Typography>
            </Box>
            <Box component="span" sx={arrowStyle} className="release-arrow">
              <ArrowRight />
            </Box>
          </StyledLink>
        ))}
      </Box>
      <style>{`
        .releases-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .releases-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .releases-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        a:hover .release-arrow {
          opacity: 1;
          transform: translateX(0.25rem);
        }
      `}</style>
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

  const gridStyle: CSSProperties = {
    display: "grid",
    gap: "0.75rem",
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
      <Box sx={gridStyle} className="facts-grid">
        {safeFacts.map((fact, index) => (
          <Box key={index} sx={cardStyle}>
            <Typography sx={labelStyle}>{fact.label}</Typography>
            <Typography sx={valueStyle}>{fact.value}</Typography>
          </Box>
        ))}
      </Box>
      <style>{`
        .facts-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .facts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .facts-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
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

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
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
      <Box sx={gridStyle} className="gallery-grid">
        {safeImages.map((imageUrl, index) => (
          <Box key={index} sx={cardStyle} className="gallery-item">
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
      </Box>
      <style>{`
        .gallery-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .gallery-item:hover {
          border-color: hsla(270, 60%, 55%, 0.5);
        }
        .gallery-item:hover > div {
          background-color: hsla(0, 0%, 15%, 0.5);
        }
      `}</style>
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

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
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
      <Box sx={gridStyle} className="fanart-grid">
        {safeFanArt.map((art) => (
          <Box key={art.id} sx={cardStyle} className="fanart-item">
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
      </Box>
      <style>{`
        .fanart-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .fanart-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .fanart-item:hover {
          border-color: hsla(330, 70%, 55%, 0.5);
        }
        .fanart-item:hover > div {
          background-color: hsla(0, 0%, 15%, 0.4);
        }
        .fanart-item:hover .artist-overlay {
          opacity: 1;
        }
      `}</style>
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

  const containerStyle: CSSProperties = {
    maxWidth: tokens.container.maxWidth,
    margin: "0 auto",
    padding: `2rem ${tokens.container.padding}`,
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

  const contentGridStyle: CSSProperties = {
    display: "grid",
    gap: "2rem",
  };

  if (!pet) {
    return (
      <Box sx={pageStyle}>
        <Box component="main" sx={containerStyle}>
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
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={pageStyle}>
      <Box component="main" sx={containerStyle} className="main-container">
        <Breadcrumbs petName={pet.name} />
        <PetHero pet={pet} />
        <Box sx={contentGridStyle} className="content-grid">
          <Box>
            <OwnershipSection owners={pet.owners} />
            <ReleasesSection releases={pet.releases} />
            <FactsSection facts={pet.facts} />
          </Box>
          <Box>
            <ExclusivitySection exclusivity={pet.exclusivity} note={pet.exclusivityNote} />
          </Box>
        </Box>
        <ImageGallery images={pet.officialImages} title="Official Gallery" />
        <FanArtSection fanArt={pet.fanArt} />
      </Box>
      <Box component="footer" sx={footerStyle}>
        <Box sx={footerInnerStyle}>
          <Typography>© 2024 Monstrino — The Monster High Collector Archive</Typography>
        </Box>
      </Box>
      <style>{`
        .main-container {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .main-container {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
        .content-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .content-grid {
            grid-template-columns: 2fr 1fr;
          }
        }
      `}</style>
    </Box>
  );
};

export default PetIndex;
