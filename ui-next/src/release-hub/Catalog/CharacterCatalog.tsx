'use client';

import React, { useMemo, useState } from 'react';
import { Link as RouterLink, useSearchParams } from '@/shared/router';
import { mergeSx } from '@/shared/ui/mergeSx';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { characterMock } from '@/data/real-data/characterMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { releaseImageMock } from '@/data/real-data/releaseImageMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { useElementHeight } from './useElementHeight';
import { releaseSeriesLinkMock } from '@/data/real-data/releaseSeriesLinkMock';
import { seriesMock } from '@/data/real-data/seriesMock';
import {
  GENERATIONS,
  type Character,
  type CharacterId,
  type CharacterTag,
  type Generation,
} from '../entities';
import {
  CatalogFiltersDrawer,
  CatalogFiltersShell,
  CatalogHeader,
  CatalogLayout,
  CatalogPage,
  CatalogPagination,
  CatalogResultsToolbar,
  FilterSection,
  type CatalogSortOption,
} from '@/widgets/catalog';

// ============================================
// DATA TRANSFORMATION (mock -> character models)
// ============================================

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const ACCENT_COLORS = ['#00D4FF', '#FF1493', '#9B59B6', '#14B8A6', '#F59E0B', '#6366F1'] as const;

const toCharacterId = (value: string | number): CharacterId => `${value}` as CharacterId;

type CharacterMockRecord = {
  id: number;
  name: string;
  display_name?: string | null;
  gender?: string | null;
  primary_image?: string | null;
};

type ReleaseMockRecord = {
  id: number;
  year?: number | null;
};

type ReleaseImageMockRecord = {
  release_id: number;
  image_url: string;
  is_primary?: boolean | null;
};

type ReleaseCharacterMockRecord = {
  release_id: number;
  character_id: number;
};

type ReleaseSeriesLinkMockRecord = {
  release_id: number;
  series_id: number;
};

type SeriesMockRecord = {
  id: number;
  name: string;
  display_name?: string | null;
};

const releaseMockData: ReadonlyArray<ReleaseMockRecord> = releaseMock;
const seriesMockData: ReadonlyArray<SeriesMockRecord> = seriesMock;
const releaseSeriesLinksData: ReadonlyArray<ReleaseSeriesLinkMockRecord> = releaseSeriesLinkMock;
const releaseImageData: ReadonlyArray<ReleaseImageMockRecord> = releaseImageMock;
const releaseCharacterData: ReadonlyArray<ReleaseCharacterMockRecord> = releaseCharacterMock;
const characterMockData: ReadonlyArray<CharacterMockRecord> = characterMock;

const formatLabel = (value?: string | null) => {
  if (!value) return 'Unknown';
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

const inferGeneration = (year?: number): Generation => {
  if (!year) return GENERATIONS[0];
  if (year >= 2022) return 'G3';
  if (year >= 2016) return 'G2';
  return 'G1';
};

const releaseById = new Map<number, ReleaseMockRecord>(
  releaseMockData.map((release) => [release.id, release])
);
const seriesById = new Map<number, SeriesMockRecord>(
  seriesMockData.map((series) => [series.id, series])
);

const releaseSeriesNamesByReleaseId = releaseSeriesLinksData.reduce<Map<number, string[]>>((acc, link) => {
  const series = seriesById.get(link.series_id);
  if (!series) return acc;
  const list = acc.get(link.release_id) ?? [];
  const name = series.display_name ?? series.name;
  if (name) list.push(name);
  acc.set(link.release_id, list);
  return acc;
}, new Map());

const releaseImageByReleaseId = releaseImageData.reduce<Map<number, ReleaseImageMockRecord["image_url"]>>(
  (acc, image) => {
    if (!acc.has(image.release_id) || image.is_primary) {
      acc.set(image.release_id, image.image_url);
    }
    return acc;
  },
  new Map()
);

const getReleaseImageUrl = (releaseId: number) =>
  releaseImageByReleaseId.get(releaseId) ?? PLACEHOLDER_IMAGE;

const characterReleaseCounts = releaseCharacterData.reduce<Record<number, number>>((acc, link) => {
    acc[link.character_id] = (acc[link.character_id] ?? 0) + 1;
    return acc;
  }, {});

const characterStats = new Map<number, { generations: Set<Generation>; series: Set<string>; imageUrl?: string }>();

releaseCharacterData.forEach((link) => {
  const release = releaseById.get(link.release_id);
  if (!release) return;
  const generation = inferGeneration(release.year ?? undefined);
  const seriesNames = releaseSeriesNamesByReleaseId.get(link.release_id) ?? [];
  const releaseImage = getReleaseImageUrl(link.release_id);

  const entry = characterStats.get(link.character_id) ?? {
    generations: new Set<Generation>(),
    series: new Set<string>(),
  };
  entry.generations.add(generation);
  seriesNames.forEach((name) => entry.series.add(name));
  if (!entry.imageUrl && releaseImage) {
    entry.imageUrl = releaseImage;
  }
  characterStats.set(link.character_id, entry);
});

const characterModels: Character[] = characterMockData.map((character, index) => {
  const stats = characterStats.get(character.id);
  const generations = stats?.generations.size ? Array.from(stats.generations) : [GENERATIONS[0]];
  const seriesAppearances = stats ? Array.from(stats.series) : [];
  const releaseCount = characterReleaseCounts[character.id] ?? 0;
  const tags: CharacterTag[] = [];

  const resolvedImageUrl = character.primary_image ?? stats?.imageUrl ?? PLACEHOLDER_IMAGE;
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length] ?? ACCENT_COLORS[0];

  return {
    id: toCharacterId(character.id),
    name: character.display_name ?? character.name,
    species: formatLabel(character.gender ?? undefined),
    releaseCount,
    imageUrl: resolvedImageUrl,
    accentColor,
    generations,
    seriesAppearances,
    tags,
  };
});

const SPECIES_LIST = Array.from(new Set(characterModels.map((character) => character.species))).sort();
const TAGS = Array.from(new Set(characterModels.flatMap((character) => character.tags ?? []))).sort();

// ============================================
// CHARACTER CARD COMPONENT
// ============================================

interface CharacterCardProps {
  character: Character;
  cardSx?: React.ComponentProps<typeof Box>['sx'];
  imageSx?: React.ComponentProps<typeof Box>['sx'];
  contentSx?: React.ComponentProps<typeof Box>['sx'];
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  cardSx,
  imageSx,
  contentSx,
}) => {
  const generations = character.generations ?? [];
  const releaseCount = character.releaseCount ?? 0;

  return (
    <RouterLink
      to={`/catalog/c/${character.id}`}
      aria-label={`${character.name} character`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <Box
        sx={mergeSx(
          {
            backgroundColor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(139, 92, 246, 0.15)',
            },
          },
          cardSx
        )}
      >
      <Box
        sx={mergeSx(
          {
            position: 'relative',
            width: '100%',
            paddingTop: '150%',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
          },
          imageSx
        )}
      >
        <Box
          component="img"
          src={character.imageUrl}
          alt={character.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </Box>

      <Box sx={mergeSx({ p: 2 }, contentSx)}>
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: 1.3,
            mb: 0.5,
          }}
        >
          {character.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            mb: 1,
          }}
        >
          {character.species}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {generations.map((gen) => (
            <Chip
              key={gen}
              label={gen}
              size="small"
              sx={{
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                color: '#A78BFA',
                fontSize: '0.6rem',
                height: '18px',
                fontWeight: 600,
              }}
            />
          ))}
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.75rem' }}>
            {releaseCount} release{releaseCount !== 1 ? 's' : ''}
          </Typography>
        </Box>
      </Box>
      </Box>
    </RouterLink>
  );
};

// ============================================
// WIDGET COMPONENTS
// ============================================

const CATALOG_SORT_OPTIONS: CatalogSortOption[] = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'releaseCount', label: 'Most Releases' },
  { value: 'species', label: 'Gender' },
];

interface FiltersSidebarProps {
  activeFilterCount: number;
  clearAllFilters: () => void;
  selectedGenerations: string[];
  selectedSpecies: string[];
  selectedTags: string[];
  setSelectedGenerations: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSpecies: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  toggleArrayFilter: (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  showMoreSpecies: boolean;
  showMoreTags: boolean;
  setShowMoreSpecies: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMoreTags: React.Dispatch<React.SetStateAction<boolean>>;
  catalogHeight?: number | null;
  isMobile?: boolean;
  onClose?: () => void;
}


const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  activeFilterCount,
  clearAllFilters,
  selectedGenerations,
  selectedSpecies,
  selectedTags,
  setSelectedGenerations,
  setSelectedSpecies,
  setSelectedTags,
  toggleArrayFilter,
  showMoreSpecies,
  showMoreTags,
  setShowMoreSpecies,
  setShowMoreTags,
  catalogHeight,
  isMobile = false,
  onClose,
}) => (
  <CatalogFiltersShell
    activeFilterCount={activeFilterCount}
    onClearAll={clearAllFilters}
    height={catalogHeight}
    isMobile={isMobile}
    onClose={onClose}
  >
    <FilterSection title="Generation">
      <FormGroup>
        {GENERATIONS.map((gen) => (
          <FormControlLabel
            key={gen}
            control={
              <Checkbox
                checked={selectedGenerations.includes(gen)}
                onChange={() => toggleArrayFilter(gen, setSelectedGenerations)}
                size="small"
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.9375rem', md: '0.8rem', lg: '0.85rem' },
                  fontWeight: 500,
                  color: selectedGenerations.includes(gen) ? 'text.primary' : 'text.secondary',
                  transition: 'color 0.2s',
                }}
              >
                {gen}
              </Typography>
            }
            sx={{
              mb: 0.25,
              ml: -0.5,
              py: 0.5,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.03)',
              },
            }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    <FilterSection title="Gender">
      <FormGroup>
        {(showMoreSpecies ? SPECIES_LIST : SPECIES_LIST.slice(0, 8)).map((species) => (
          <FormControlLabel
            key={species}
            control={
              <Checkbox
                checked={selectedSpecies.includes(species)}
                onChange={() => toggleArrayFilter(species, setSelectedSpecies)}
                size="small"
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.9375rem', md: '0.8rem', lg: '0.85rem' },
                    fontWeight: 500,
                    color: selectedSpecies.includes(species) ? 'text.primary' : 'text.secondary',
                    transition: 'color 0.2s',
                  }}
                >
                  {species}
                </Typography>
                {(species.toLowerCase() === 'ghoul' || species.toLowerCase() === 'manster') && (
                  <Tooltip
                    title={
                      species.toLowerCase() === 'ghoul'
                        ? 'Ghoul refers to a female character.'
                        : 'Manster refers to a male character.'
                    }
                    arrow
                  >
                    <Box
                      component="span"
                      onClick={(event) => event.stopPropagation()}
                      onMouseDown={(event) => event.stopPropagation()}
                      sx={{ display: 'inline-flex', color: 'text.secondary' }}
                    >
                      <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                    </Box>
                  </Tooltip>
                )}
              </Box>
            }
            sx={{
              mb: 0.25,
              ml: -0.5,
              py: 0.5,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.03)',
              },
            }}
          />
        ))}
      </FormGroup>
      {SPECIES_LIST.length > 8 && (
        <Button
          onClick={() => setShowMoreSpecies(!showMoreSpecies)}
          size="small"
          sx={{
            mt: 1,
            fontSize: { xs: '0.8125rem', md: '0.75rem', lg: '0.8rem' },
            color: 'primary.main',
            textTransform: 'none',
            fontWeight: 500,
            px: 0,
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          {showMoreSpecies ? 'Show less' : `Show more (${SPECIES_LIST.length - 8})`}
        </Button>
      )}
    </FilterSection>

    {TAGS.length > 0 && (
      <FilterSection title="Tags">
        <FormGroup>
          {(showMoreTags ? TAGS : TAGS.slice(0, 8)).map((tag) => (
            <FormControlLabel
              key={tag}
              control={
                <Checkbox
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleArrayFilter(tag, setSelectedTags)}
                  size="small"
                  sx={{
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.9375rem', md: '0.8rem', lg: '0.85rem' },
                    fontWeight: 500,
                    color: selectedTags.includes(tag) ? 'text.primary' : 'text.secondary',
                    transition: 'color 0.2s',
                  }}
                >
                  {tag}
                </Typography>
              }
              sx={{
                mb: 0.25,
                ml: -0.5,
                py: 0.5,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.03)',
                },
              }}
            />
          ))}
        </FormGroup>
        {TAGS.length > 8 && (
          <Button
            onClick={() => setShowMoreTags(!showMoreTags)}
            size="small"
            sx={{
              mt: 1,
              fontSize: { xs: '0.8125rem', md: '0.75rem', lg: '0.8rem' },
              color: 'primary.main',
              textTransform: 'none',
              fontWeight: 500,
              px: 0,
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            {showMoreTags ? 'Show less' : `Show more (${TAGS.length - 8})`}
          </Button>
        )}
      </FilterSection>
    )}
  </CatalogFiltersShell>
);

interface CharacterGridProps {
  characters: Character[];
}

const characterCatalogCardLayout = {
  cardSx: { height: '100%' },
  imageSx: { paddingTop: '150%' },
  contentSx: { p: 2 },
};

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => (
  <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
    {characters.map((character) => (
      <Grid size={{ xs: 6, sm: 4, md: 4, lg: 3 }} key={character.id}>
        <CharacterCard
          character={character}
          cardSx={characterCatalogCardLayout.cardSx}
          imageSx={characterCatalogCardLayout.imageSx}
          contentSx={characterCatalogCardLayout.contentSx}
        />
      </Grid>
    ))}
  </Grid>
);

const EmptyResults: React.FC = () => (
  <Box sx={{ textAlign: 'center', py: { xs: 6, sm: 8 } }}>
    <Typography 
      variant="h6" 
      sx={{ 
        color: 'text.secondary', 
        mb: 1,
        fontSize: { xs: '1rem', sm: '1.25rem' }
      }}
    >
      No characters found
    </Typography>
    <Typography 
      variant="body2" 
      sx={{ 
        color: '#6B7280',
        fontSize: { xs: '0.8125rem', sm: '0.875rem' }
      }}
    >
      Try adjusting your filters or search query
    </Typography>
  </Box>
);

// ============================================
// MAIN CHARACTER CATALOG COMPONENT
// ============================================

const CharacterCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { ref: catalogRef, height: catalogHeight } = useElementHeight<HTMLDivElement>();

  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Show more state for each filter
  const [showMoreSpecies, setShowMoreSpecies] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);

  // Mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenerations, selectedSpecies, selectedTags]);

  const toggleArrayFilter = (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const clearAllFilters = () => {
    setSelectedGenerations([]);
    setSelectedSpecies([]);
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenerations.length > 0) count++;
    if (selectedSpecies.length > 0) count++;
    if (selectedTags.length > 0) count++;
    if (searchQuery) count++;
    return count;
  }, [selectedGenerations, selectedSpecies, selectedTags, searchQuery]);

  const filteredCharacters = useMemo(() => {
    let results = characterModels.filter((character) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          character.name.toLowerCase().includes(query) ||
          character.species.toLowerCase().includes(query) ||
          (character.seriesAppearances ?? []).some((series) => series.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Generation - if none selected, show all
      if (
        selectedGenerations.length > 0 &&
        (!character.generations || !character.generations.some((gen) => selectedGenerations.includes(gen)))
      ) {
        return false;
      }

      if (selectedSpecies.length > 0 && !selectedSpecies.includes(character.species)) {
        return false;
      }

      if (selectedTags.length > 0) {
        const tags = character.tags ?? [];
        const hasTag = selectedTags.some((tag) => tags.includes(tag));
        if (!hasTag) return false;
      }

      return true;
    });

    results.sort((a, b) => {
      const aHasImage = Boolean(a.imageUrl && a.imageUrl !== PLACEHOLDER_IMAGE);
      const bHasImage = Boolean(b.imageUrl && b.imageUrl !== PLACEHOLDER_IMAGE);
      if (aHasImage !== bHasImage) {
        return aHasImage ? -1 : 1;
      }

      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'releaseCount':
          return (b.releaseCount ?? 0) - (a.releaseCount ?? 0);
        case 'species':
          return a.species.localeCompare(b.species);
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, selectedGenerations, selectedSpecies, selectedTags, sortBy]);

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <CatalogPage minHeight="100vh">
      <CatalogFiltersDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <FiltersSidebar
          activeFilterCount={activeFilterCount}
          clearAllFilters={clearAllFilters}
          selectedGenerations={selectedGenerations}
          selectedSpecies={selectedSpecies}
          selectedTags={selectedTags}
          setSelectedGenerations={setSelectedGenerations}
          setSelectedSpecies={setSelectedSpecies}
          setSelectedTags={setSelectedTags}
          toggleArrayFilter={toggleArrayFilter}
          showMoreSpecies={showMoreSpecies}
          showMoreTags={showMoreTags}
          setShowMoreSpecies={setShowMoreSpecies}
          setShowMoreTags={setShowMoreTags}
          catalogHeight={catalogHeight}
          isMobile={true}
          onClose={() => setMobileFiltersOpen(false)}
        />
      </CatalogFiltersDrawer>

      <CatalogLayout
        sidebar={
          <FiltersSidebar
            activeFilterCount={activeFilterCount}
            clearAllFilters={clearAllFilters}
            selectedGenerations={selectedGenerations}
            selectedSpecies={selectedSpecies}
            selectedTags={selectedTags}
            setSelectedGenerations={setSelectedGenerations}
            setSelectedSpecies={setSelectedSpecies}
            setSelectedTags={setSelectedTags}
            toggleArrayFilter={toggleArrayFilter}
            showMoreSpecies={showMoreSpecies}
            showMoreTags={showMoreTags}
            setShowMoreSpecies={setShowMoreSpecies}
            setShowMoreTags={setShowMoreTags}
            catalogHeight={catalogHeight}
          />
        }
      >
        <Box ref={catalogRef} sx={{ flex: 1, p: { xs: 1, sm: 1.5, md: 2 } }}>
          <CatalogHeader title="Characters Catalog" />

          <CatalogResultsToolbar
            resultCount={filteredCharacters.length}
            sortBy={sortBy}
            sortOptions={CATALOG_SORT_OPTIONS}
            onSortChange={setSortBy}
            onFiltersClick={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          <CharacterGrid characters={paginatedCharacters} />

          {filteredCharacters.length === 0 && <EmptyResults />}

          {totalPages > 1 && (
            <CatalogPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </Box>
      </CatalogLayout>
    </CatalogPage>
  );
};

export default CharacterCatalog;
