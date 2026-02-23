'use client';

import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { Link } from "@/shared/router";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CategoryIcon from "@mui/icons-material/Category";
import CollectionsIcon from "@mui/icons-material/Collections";
import PeopleIcon from "@mui/icons-material/People";
import PetsIcon from "@mui/icons-material/Pets";

import heroBanner from "@/assets/hero-banner.jpg";
import { releaseIndexMock } from "@/data/real-data/releaseIndexMock";
import { seriesIndexMock } from "@/data/real-data/seriesIndexMock";
import { characterIndexMocks, characterIndexMockById } from "@/data/real-data/CharacterIndexMock";
import { characterMock } from "@/data/real-data/characterMock";
import { petIndexMock } from "@/data/real-data/petIndexMock";
import type {
  CharacterId,
  CharacterSummary,
  Pet,
  PetId,
  PetSummary,
  Release,
  ReleaseId,
  ReleaseSummary,
  Series,
  SeriesId,
  SeriesSummary,
} from "./entities";
import { ReleaseCardSpotlight } from "@cards/release-card";
import { CharacterCard } from "@cards/character-card";
import { SeriesCard } from "@cards/series-card";
import { PetCard } from "@cards/pet-card";

// ============================================
// DATA FROM real-data INDEX MOCKS
// ============================================

const ACCENT_COLORS = ["#00D4FF", "#FF1493", "#9B59B6", "#14B8A6", "#F59E0B", "#6366F1"] as const;

// Helper function for name normalization
const normalizeName = (value: string) => value.trim().toLowerCase();

// Create slug -> numeric ID mapping from characterMock
const characterSlugToNumericId = new Map<string, number>(
  characterMock.map((char) => [char.name, char.id])
);

// Use pre-built index mocks directly from real-data
const releaseModels: Release[] = releaseIndexMock;
const seriesModels: Series[] = seriesIndexMock;
const petModels: Pet[] = petIndexMock;

// Map CharacterIndexData to CharacterSummary format for display
const characterModels: CharacterSummary[] = characterIndexMocks.map((char, index) => ({
  id: char.id ?? (char.name as CharacterId),
  name: char.name,
  species: char.species,
  releaseCount: char.releaseCount,
  imageUrl: char.heroImage,
  accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length],
}));

const stats = {
  totalReleases: "1000+",
  totalCharacters: 127,
  totalSeries: seriesModels.length,
  totalPets: petModels.length,
};

const featuredReleases: ReleaseSummary[] = [...releaseModels]
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
  .slice(0, 6);

// Popular characters - the iconic "Main 6" from Monster High G1 lineup
const popularCharacterSlugs = [
  "draculaura",
  "frankie-stein",
  "clawdeen-wolf",
  "cleo-de-nile",
  "lagoona-blue",
  "ghoulia-yelps",
];

const popularCharacters: CharacterSummary[] = popularCharacterSlugs.flatMap((slug, index) => {
  const charData = characterIndexMockById(slug);
  const numericId = characterSlugToNumericId.get(slug);

  if (!numericId || !charData?.heroImage) {
    return [];
  }

  return [
    {
      id: String(numericId) as CharacterId, // Use numeric ID for URL routing
      name: charData.name,
      species: charData.species,
      releaseCount: charData.releaseCount,
      imageUrl: charData.heroImage,
      accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length],
    },
  ];
});

const seriesCollection: SeriesSummary[] = [...seriesModels]
  .sort((a, b) => (b.releaseCount ?? 0) - (a.releaseCount ?? 0))
  .slice(0, 6);

const monsterPets: PetSummary[] = [...petModels].slice(0, 6);

const homepageCardLayout = {
  spotlight: {
    cardSx: { width: "100%", maxWidth: 260 },
    mediaSx: { height: 300 },
    contentSx: { pt: 1.5 },
  },
  character: {
    cardSx: { width: "100%", maxWidth: 240, margin: "0 auto" },
    mediaSx: { height: 180 },
    contentSx: { pb: 2 },
  },
  series: {
    cardSx: { height: "100%", minHeight: 200 },
    contentSx: { p: { xs: 1.5, md: 2 } },
  },
  pet: {
    containerSx: { width: "100%" },
    cardSx: { width: "100%", maxWidth: 240, margin: "0 auto" },
    mediaSx: { height: 190 },
    contentSx: { pb: 2 },
  },
};

// ============================================
// SECTIONS
// ============================================

export const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${heroBanner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10, 10, 15, 0.3) 0%, rgba(10, 10, 15, 0.95) 90%)",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 8, pb: { xs: 10, sm: 8 } }}>
        <Box sx={{ maxWidth: 800 }}>
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            label="The Ultimate Monster High Catalog"
            sx={{
              mb: 3,
              backgroundColor: "rgba(255, 20, 147, 0.15)",
              color: "primary.main",
              fontWeight: 600,
              border: "1px solid",
              borderColor: "primary.main",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              background: "linear-gradient(135deg, #FFFFFF 0%, #C0C0D0 50%, #FF69B4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Discover Every<br />
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #FF1493 0%, #00D4FF 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Monster High
            </Box>{" "}
            Release
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              mb: 4,
              fontWeight: 400,
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            The most comprehensive catalog for Monster High collectors. Track releases, compare prices, and connect with the community.
          </Typography>
          <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 2 }, flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/catalog/r"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Explore Catalog
            </Button>
            <Button
              component={Link}
              to="/catalog/c"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(255, 20, 147, 0.1)",
                },
              }}
            >
              Meet Characters
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export const StatsSection = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: -4, sm: -8 },
        position: "relative",
        zIndex: 2,
      }}
    >
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }}>
        {[
          { icon: <CollectionsIcon />, value: stats.totalReleases, label: "Releases", color: "#FF1493" },
          { icon: <PeopleIcon />, value: stats.totalCharacters, label: "Characters", color: "#00D4FF" },
          { icon: <CategoryIcon />, value: stats.totalSeries, label: "Series", color: "#9B59B6" },
          { icon: <PetsIcon />, value: stats.totalPets, label: "Pets", color: "#14B8A6" },
        ].map((stat) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
            <Card
              sx={{
                p: { xs: 1.5, sm: 2.25 },
                textAlign: { xs: "left", sm: "center" },
                display: { xs: "flex", sm: "block" },
                alignItems: { xs: "center", sm: "initial" },
                gap: { xs: 1.25, sm: 0 },
                background: "linear-gradient(135deg, rgba(20, 20, 32, 0.9) 0%, rgba(30, 30, 50, 0.9) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Box
                sx={{
                  width: { xs: 30, sm: 40 },
                  height: { xs: 30, sm: 40 },
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                  mx: { xs: 0, sm: "auto" },
                  mb: { xs: 0, sm: 1.5 },
                  flexShrink: 0,
                  "& svg": {
                    fontSize: { xs: 18, sm: 24 },
                  },
                }}
              >
                {stat.icon}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 0.25, sm: 0 } }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, color: "text.primary", mb: { xs: 0, sm: 0.25 }, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                >
                  {stat.value.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
                  {stat.label}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const SectionHeader = ({
  kicker,
  title,
  action,
  actionLink,
}: {
  kicker: string;
  title: string;
  action?: string;
  actionLink?: string;
}) => {
  return (
    <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mb: 2 }}>
      <Box>
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 2,
            fontWeight: 800,
            color: alpha("#31d3ff", 0.9),
          }}
        >
          {kicker.toUpperCase()}
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5 }}>
          {title}
        </Typography>
      </Box>

      {actionLink ? (
        <MuiLink
          component={Link}
          to={actionLink}
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: alpha("#fff", 0.7),
            fontWeight: 700,
            "&:hover": { color: "#fff" },
          }}
        >
          {action ?? "View All"}
          <ArrowForwardIcon fontSize="small" />
        </MuiLink>
      ) : null}
    </Stack>
  );
};


export const FeaturedReleasesSection = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <SectionHeader kicker="Latest Drops" title="Featured Releases" actionLink="/catalog/r" />
      <Box
        sx={{
          display: "flex",
          gap: 2.2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha("#ffffff", 0.12),
            borderRadius: 999,
          },
        }}
      >
        {featuredReleases.map((item) => (
          <Box key={item.id} sx={{ minWidth: 260, maxWidth: 260 }}>
            <ReleaseCardSpotlight
              {...item}
              cardSx={homepageCardLayout.spotlight.cardSx}
              mediaSx={homepageCardLayout.spotlight.mediaSx}
              contentSx={homepageCardLayout.spotlight.contentSx}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const PopularCharactersSection = () => {
  return (
    <Box sx={{ mt: 7 }}>
      <SectionHeader kicker="Monster High Icons" title="Popular Characters" actionLink="/catalog/c" />
      <Box
        sx={{
          display: "flex",
          gap: 2.2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha("#ffffff", 0.12),
            borderRadius: 999,
          },
        }}
      >
        {popularCharacters.map((character) => (
          <Box key={character.id} sx={{ minWidth: 240, maxWidth: 240 }}>
            <CharacterCard
              {...character}
              cardSx={homepageCardLayout.character.cardSx}
              mediaSx={homepageCardLayout.character.mediaSx}
              contentSx={homepageCardLayout.character.contentSx}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const ExploreSeriesSection = () => {
  return (
    <Box sx={{ mt: 7 }}>
      <SectionHeader kicker="Collections" title="Explore Series" actionLink="/catalog/s" />
      <Grid container spacing={2.2}>
        {seriesCollection.map((entry) => (
          <Grid key={entry.id} size={{ xs: 12, md: 4 }}>
            <SeriesCard
              {...entry}
              cardSx={homepageCardLayout.series.cardSx}
              contentSx={homepageCardLayout.series.contentSx}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const MonsterPetsSection = () => {
  return (
    <Box sx={{ mt: 7 }}>
      <SectionHeader kicker="Creepy Companions" title="Monster Pets" actionLink="/catalog/p" />
      <Box
        sx={{
          display: "flex",
          gap: 2.2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha("#ffffff", 0.12),
            borderRadius: 999,
          },
        }}
      >
        {monsterPets.map((pet) => (
          <Box key={pet.id} sx={{ minWidth: 240, maxWidth: 240 }}>
            <PetCard
              {...pet}
              containerSx={homepageCardLayout.pet.containerSx}
              cardSx={homepageCardLayout.pet.cardSx}
              mediaSx={homepageCardLayout.pet.mediaSx}
              contentSx={homepageCardLayout.pet.contentSx}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const CommunityCtaSection = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Card
        sx={{
          backgroundColor: alpha("#0f1222", 0.6),
          border: `1px solid ${alpha("#ff2bb6", 0.18)}`,
          boxShadow: `0 24px 90px ${alpha("#000", 0.55)}`,
          backdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            px: { xs: 3, md: 7 },
            py: { xs: 5, md: 6 },
            textAlign: "center",
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: -2,
              background:
                "radial-gradient(500px 200px at 50% 30%, rgba(255,45,182,.16), transparent 70%)," +
                "radial-gradient(500px 260px at 65% 55%, rgba(49,211,255,.12), transparent 70%)",
              zIndex: 0,
            }}
          />
          <Stack spacing={1.4} alignItems="center" sx={{ position: "relative" }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "16px",
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg, rgba(255,45,182,.85), rgba(49,211,255,.65))",
                boxShadow: `0 18px 45px ${alpha("#ff2bb6", 0.22)}`,
              }}
            >
              <AutoAwesomeIcon />
            </Box>

            <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 34 } }}>
              Join the Community
            </Typography>

            <Typography sx={{ color: "text.secondary", maxWidth: 520 }}>
              Create your collection, track your wishlist, and connect with fellow Monster High collectors around the world.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 1.4 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  px: 3.2,
                  py: 1.2,
                  borderRadius: 999,
                  boxShadow: `0 18px 45px ${alpha("#ff2bb6", 0.25)}`,
                }}
              >
                Create Account
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  px: 3.2,
                  py: 1.2,
                  borderRadius: 999,
                  borderColor: alpha("#31d3ff", 0.35),
                  backgroundColor: alpha("#0b0d19", 0.25),
                  "&:hover": {
                    borderColor: alpha("#31d3ff", 0.55),
                    backgroundColor: alpha("#0b0d19", 0.38),
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export const HomepageContent = () => {
  return (
    <Container maxWidth="lg" sx={{ pb: 10 }}>
      <FeaturedReleasesSection />
      <PopularCharactersSection />
      <ExploreSeriesSection />
      <MonsterPetsSection />
      {/* <CommunityCtaSection /> */}
    </Container>
  );
};
