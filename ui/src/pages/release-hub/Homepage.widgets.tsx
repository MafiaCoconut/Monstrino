import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Link as MuiLink,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CategoryIcon from "@mui/icons-material/Category";
import CollectionsIcon from "@mui/icons-material/Collections";
import PeopleIcon from "@mui/icons-material/People";
import PetsIcon from "@mui/icons-material/Pets";

import heroBanner from "@/assets/hero-banner.jpg";
import { releaseMockData } from "@/data/release.mock";
import { characterMock } from "@/data/real-data/characterMock";
import { releaseImageMock } from "@/data/real-data/releaseImageMock";
import { releaseMock } from "@/data/real-data/releaseMock";
import type {
  Character,
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
import { ReleaseCardHome } from "./components/release-cards";

// ============================================
// DATA TRANSFORMATION (mock -> enterprise models)
// ============================================

const PLACEHOLDER_IMAGE = "/placeholder.svg";
const ACCENT_COLORS = ["#00D4FF", "#FF1493", "#9B59B6", "#14B8A6", "#F59E0B", "#6366F1"] as const;

const toReleaseId = (value: string | number): ReleaseId => `${value}` as ReleaseId;
const toCharacterId = (value: string | number): CharacterId => `${value}` as CharacterId;
const toSeriesId = (value: string | number): SeriesId => `${value}` as SeriesId;
const toPetId = (value: string | number): PetId => `${value}` as PetId;

const { releases, series, links, meta, mockCharactersAndPets } = releaseMockData;

const releaseIdBySlug = new Map<string, number>(
  releaseMock.map((release) => [release.name.trim().toLowerCase(), release.id])
);
const releaseIdByName = new Map<string, number>(
  releaseMock.map((release) => [
    (release.display_name ?? release.name ?? "").trim().toLowerCase(),
    release.id,
  ])
);
const releaseImageById = new Map<number, string>();
releaseImageMock.forEach((image) => {
  if (!image.image_url) return;
  if (image.is_primary || !releaseImageById.has(image.release_id)) {
    releaseImageById.set(image.release_id, image.image_url);
  }
});
const characterSlugByName = new Map<string, string>(
  characterMock.map((character) => [
    (character.display_name ?? character.name).trim().toLowerCase(),
    character.name,
  ])
);
const characterSlugBySlug = new Map<string, string>(
  characterMock.map((character) => [character.name.trim().toLowerCase(), character.name])
);

const characterNameById = new Map<number, string>(
  mockCharactersAndPets.characters.map((character) => [character.id, character.name])
);

const characterReleaseCounts = links.releaseCharacterLinks.reduce<Record<number, number>>((acc, link) => {
  acc[link.characterId] = (acc[link.characterId] ?? 0) + 1;
  return acc;
}, {});

const getReleaseImageUrl = (release: (typeof releases)[number]) => {
  const direct =
    release.imageUrl ?? release.imageUrls?.find((image) => image.isPrimary)?.url ?? release.imageUrls?.[0]?.url;
  if (direct) return direct;
  const slug = (release.slug ?? "").trim().toLowerCase();
  const resolvedId =
    releaseIdBySlug.get(slug) ?? releaseIdByName.get((release.name ?? "").trim().toLowerCase());
  if (!resolvedId) return undefined;
  return releaseImageById.get(resolvedId);
};

const resolveReleaseImage = (release: (typeof releases)[number]) => {
  return getReleaseImageUrl(release) ?? PLACEHOLDER_IMAGE;
};

const normalizeName = (value: string) => value.trim().toLowerCase();

const characterImageByName = new Map<string, string>();
releases.forEach((release) => {
  const imageUrl = getReleaseImageUrl(release);
  if (!imageUrl) return;

  release.characters?.forEach((character) => {
    const name =
      character.character?.name ??
      (character.characterId ? characterNameById.get(character.characterId) : undefined);
    if (!name) return;
    const key = normalizeName(name);
    if (!characterImageByName.has(key)) {
      characterImageByName.set(key, imageUrl);
    }
  });
});

const releaseTitleImages = releases
  .map((release) => ({
    title: release.name?.toLowerCase() ?? "",
    imageUrl: getReleaseImageUrl(release),
  }))
  .filter((entry): entry is { title: string; imageUrl: string } => Boolean(entry.imageUrl));

const getCharacterImageUrl = (name: string) => {
  const key = normalizeName(name);
  const direct = characterImageByName.get(key);
  if (direct) return direct;

  const titleMatch = releaseTitleImages.find((entry) => entry.title.includes(key));
  return titleMatch?.imageUrl;
};

const seriesYearStats = new Map<number, { min: number; max: number; count: number }>();
const seriesCharacterIds = new Map<number, Set<number>>();
releases.forEach((release) => {
  if (!release.releaseYear) return;
  release.series?.forEach((seriesRef) => {
    const current = seriesYearStats.get(seriesRef.id) ?? {
      min: release.releaseYear,
      max: release.releaseYear,
      count: 0,
    };
    current.min = Math.min(current.min, release.releaseYear);
    current.max = Math.max(current.max, release.releaseYear);
    current.count += 1;
    seriesYearStats.set(seriesRef.id, current);

    const characterSet = seriesCharacterIds.get(seriesRef.id) ?? new Set<number>();
    release.characters?.forEach((character) => characterSet.add(character.characterId));
    seriesCharacterIds.set(seriesRef.id, characterSet);
  });
});

const releaseModels: Release[] = releases.map((release) => {
  const primaryCharacter = release.characters?.[0];
  const characterName =
    primaryCharacter?.character?.name ??
    (primaryCharacter?.characterId ? characterNameById.get(primaryCharacter.characterId) : undefined) ??
    "Unknown";
  const seriesName = release.series?.[0]?.name ?? "Unknown";
  const slug = (release.slug ?? "").trim().toLowerCase();
  const resolvedReleaseId =
    releaseIdBySlug.get(slug) ??
    releaseIdByName.get((release.name ?? "").trim().toLowerCase()) ??
    release.id;

  return {
    id: toReleaseId(resolvedReleaseId),
    name: release.name,
    characterName,
    seriesName,
    year: release.releaseYear ?? undefined,
    imageUrl: getReleaseImageUrl(release),
    isExclusive: (release.exclusives?.length ?? 0) > 0,
    createdAt: release.createdAt,
    updatedAt: release.updatedAt,
    characters: release.characters?.map((character) => ({
      id: `${character.characterId}`,
      name:
        character.character?.name ??
        (character.characterId ? characterNameById.get(character.characterId) : undefined) ??
        "Unknown",
    })),
    series: release.series?.map((entry) => ({
      id: `${entry.id}`,
      name: entry.name,
    })),
  };
});

const characterModels: Character[] = mockCharactersAndPets.characters.map((character, index) => {
  const genderLabel = character.gender
    ? `${character.gender.charAt(0).toUpperCase()}${character.gender.slice(1)}`
    : "Unknown";
  const normalizedName = normalizeName(character.name);
  const normalizedSlug = normalizeName(character.slug ?? "");
  const resolvedSlug =
    characterSlugBySlug.get(normalizedSlug) ??
    characterSlugByName.get(normalizedName) ??
    character.slug ??
    character.id;

  return {
    id: toCharacterId(resolvedSlug),
    name: character.name,
    species: genderLabel,
    releaseCount: characterReleaseCounts[character.id] ?? 0,
    imageUrl: getCharacterImageUrl(character.name),
    accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length],
  };
});

const seriesModels: Series[] = series.map((entry) => {
  const stats = seriesYearStats.get(entry.id);
  const yearLabel = stats
    ? stats.min === stats.max
      ? `${stats.min}`
      : `${stats.min}–${stats.max}`
    : undefined;
  const bannerUrl = typeof entry.bannerUrl === "string" && entry.bannerUrl.startsWith("/")
    ? entry.bannerUrl
    : undefined;

  return {
    id: toSeriesId(entry.slug ?? entry.id),
    name: entry.name,
    description: entry.description ?? undefined,
    yearLabel,
    releaseCount: stats?.count,
    characterCount: seriesCharacterIds.get(entry.id)?.size,
    imageUrl: entry.imageUrl ?? bannerUrl ?? PLACEHOLDER_IMAGE,
  };
});

const petOwnerByPetId = new Map<number, string>();
mockCharactersAndPets.ownership.forEach((link) => {
  const ownerName = characterNameById.get(link.characterId);
  if (ownerName) {
    petOwnerByPetId.set(link.petId, ownerName);
  }
});

const petModels: Pet[] = mockCharactersAndPets.pets.map((pet) => ({
  id: toPetId(pet.slug ?? pet.id),
  name: pet.name,
  species: "Unknown",
  ownerName: petOwnerByPetId.get(pet.id) ?? "Unknown",
  imageUrl: pet.imageUrl ?? PLACEHOLDER_IMAGE,
}));

const stats = {
  totalReleases: meta.counts.releases ?? releaseModels.length,
  totalCharacters: mockCharactersAndPets.meta.counts.characters ?? characterModels.length,
  totalSeries: meta.counts.series ?? seriesModels.length,
  totalPets: mockCharactersAndPets.meta.counts.pets ?? petModels.length,
};

const featuredReleases: ReleaseSummary[] = [...releaseModels]
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
  .slice(0, 6);

const popularCharacterOrder = [
  "Draculaura",
  "Frankie Stein",
  "Venus McFlytrap",
  "Abbey Bominable",
  "Skelita Calaveras",
  "Operetta",
];

const popularCharacters: CharacterSummary[] = popularCharacterOrder
  .map((name) =>
    characterModels.find((character) => normalizeName(character.name) === normalizeName(name))
  )
  .filter((character): character is CharacterSummary => Boolean(character?.imageUrl));

const seriesCollection: SeriesSummary[] = [...seriesModels]
  .sort((a, b) => (b.releaseCount ?? 0) - (a.releaseCount ?? 0))
  .slice(0, 6);

const monsterPets: PetSummary[] = [...petModels].slice(0, 6);

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
          backgroundImage: `url(${heroBanner})`,
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
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 8 }}>
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
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/releases"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Explore Catalog
            </Button>
            <Button
              component={Link}
              to="/characters"
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
    <Container maxWidth="xl" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
      <Grid container spacing={3}>
        {[
          { icon: <CollectionsIcon />, value: stats.totalReleases, label: "Releases", color: "#FF1493" },
          { icon: <PeopleIcon />, value: stats.totalCharacters, label: "Characters", color: "#00D4FF" },
          { icon: <CategoryIcon />, value: stats.totalSeries, label: "Series", color: "#9B59B6" },
          { icon: <PetsIcon />, value: stats.totalPets, label: "Pets", color: "#14B8A6" },
        ].map((stat) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                background: "linear-gradient(135deg, rgba(20, 20, 32, 0.9) 0%, rgba(30, 30, 50, 0.9) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {stat.icon}
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
                {stat.value.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const SectionHeader = ({ kicker, title, action }: { kicker: string; title: string; action?: string }) => {
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

      <MuiLink
        href="#"
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
    </Stack>
  );
};

type CharacterCardProps = CharacterSummary;

type SeriesCardProps = SeriesSummary;

type PetCardProps = PetSummary;

const CharacterCard = ({ id, name, species, releaseCount, imageUrl, accentColor = "#FF1493" }: CharacterCardProps) => {
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

const SeriesCard = ({ id, name, yearLabel, releaseCount, characterCount, imageUrl, description }: SeriesCardProps) => {
  return (
    <Card
      component={RouterLink}
      to={`/catalog/s/${id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        position: "relative",
      }}
    >
      {/* <CardMedia
        component="div"
        sx={{
          height: 200,
          backgroundColor: "background.default",
          backgroundImage: `url(${imageUrl ?? PLACEHOLDER_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255, 20, 147, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)",
          },
        }}
      /> */}

      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {characterCount ?? 0} characters
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {releaseCount ?? 0} releases
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, ((releaseCount ?? 0) / 20) * 100)}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 2,
                background: "linear-gradient(90deg, #FF1493 0%, #00D4FF 100%)",
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const PetCard = ({ id, name, species, ownerName, ownerImageUrl, imageUrl }: PetCardProps) => {
  return (
    <Card
      component={RouterLink}
      to={`/catalog/p/${id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        position: "relative",
      }}
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
        sx={{
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
        }}
      />

      <CardContent>
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
            color: "secondary.main",
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
  );
};

export const FeaturedReleasesSection = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <SectionHeader kicker="Latest Drops" title="Featured Releases" />
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
            <ReleaseCardHome {...item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const PopularCharactersSection = () => {
  return (
    <Box sx={{ mt: 7 }}>
      <SectionHeader kicker="Monster High Icons" title="Popular Characters" />
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
            <CharacterCard {...character} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const ExploreSeriesSection = () => {
  return (
    <Box sx={{ mt: 7 }}>
      <SectionHeader kicker="Collections" title="Explore Series" />
      <Grid container spacing={2.2}>
        {seriesCollection.map((entry) => (
          <Grid key={entry.id} size={{ xs: 12, md: 4 }}>
            <SeriesCard {...entry} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const MonsterPetsSection = () => {
  return (
    <Box sx={{ mt: 7 }}>
      <SectionHeader kicker="Creepy Companions" title="Monster Pets" />
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
            <PetCard {...pet} />
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
      <CommunityCtaSection />
    </Container>
  );
};
