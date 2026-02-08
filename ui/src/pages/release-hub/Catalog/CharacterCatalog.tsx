import React, { useMemo, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { characterMock } from '@/data/real-data/characterMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { releaseImageMock } from '@/data/real-data/releaseImageMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { releaseSeriesLinkMock } from '@/data/real-data/releaseSeriesLinkMock';
import { seriesMock } from '@/data/real-data/seriesMock';
import {
  GENERATIONS,
  type Character,
  type CharacterId,
  type CharacterTag,
  type Generation,
} from '../entities';

// ============================================
// DATA TRANSFORMATION (mock -> character models)
// ============================================

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const ACCENT_COLORS = ['#00D4FF', '#FF1493', '#9B59B6', '#14B8A6', '#F59E0B', '#6366F1'] as const;

const toCharacterId = (value: string | number): CharacterId => `${value}` as CharacterId;

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

const releaseById = new Map(releaseMock.map((release) => [release.id, release]));
const seriesById = new Map(seriesMock.map((series) => [series.id, series]));

const releaseSeriesNamesByReleaseId = releaseSeriesLinkMock.reduce<Map<number, string[]>>(
  (acc, link) => {
    const series = seriesById.get(link.series_id);
    if (!series) return acc;
    const list = acc.get(link.release_id) ?? [];
    const name = series.display_name ?? series.name;
    if (name) list.push(name);
    acc.set(link.release_id, list);
    return acc;
  },
  new Map()
);

const releaseImageByReleaseId = releaseImageMock.reduce<Map<number, string>>((acc, image) => {
  if (!acc.has(image.release_id) || image.is_primary) {
    acc.set(image.release_id, image.image_url);
  }
  return acc;
}, new Map());

const getReleaseImageUrl = (releaseId: number) =>
  releaseImageByReleaseId.get(releaseId) ?? PLACEHOLDER_IMAGE;

const characterReleaseCounts = releaseCharacterMock.reduce<Record<number, number>>((acc, link) => {
  acc[link.character_id] = (acc[link.character_id] ?? 0) + 1;
  return acc;
}, {});

const characterStats = new Map<number, { generations: Set<Generation>; series: Set<string>; imageUrl?: string }>();

releaseCharacterMock.forEach((link) => {
  const release = releaseById.get(link.release_id);
  if (!release) return;
  const generation = inferGeneration(release.year ?? undefined);
  const seriesNames = releaseSeriesNamesByReleaseId.get(link.release_id) ?? [];
  const releaseImage = getReleaseImageUrl(link.release_id);

  const entry = characterStats.get(link.character_id) ?? {
    generations: new Set<Generation>(),
    series: new Set<string>(),
    imageUrl: undefined,
  };
  entry.generations.add(generation);
  seriesNames.forEach((name) => entry.series.add(name));
  if (!entry.imageUrl && releaseImage) {
    entry.imageUrl = releaseImage;
  }
  characterStats.set(link.character_id, entry);
});

const characterModels: Character[] = characterMock.map((character, index) => {
  const stats = characterStats.get(character.id);
  const generations = stats?.generations.size ? Array.from(stats.generations) : [GENERATIONS[0]];
  const seriesAppearances = stats ? Array.from(stats.series) : [];
  const releaseCount = characterReleaseCounts[character.id] ?? 0;
  const tags: CharacterTag[] = [];

  const resolvedImageUrl = character.primary_image ?? stats?.imageUrl ?? PLACEHOLDER_IMAGE;

  return {
    id: toCharacterId(character.id),
    name: character.display_name ?? character.name,
    species: formatLabel(character.gender ?? undefined),
    releaseCount,
    imageUrl: resolvedImageUrl,
    accentColor: ACCENT_COLORS[index % ACCENT_COLORS.length],
    origin: undefined,
    generations,
    seriesAppearances,
    tags,
  };
});

const SPECIES_LIST = Array.from(new Set(characterModels.map((character) => character.species))).sort();
const TAGS = Array.from(new Set(characterModels.flatMap((character) => character.tags ?? []))).sort();

// ============================================
// FILTER SECTION COMPONENT
// ============================================

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 1,
          '&:hover': { opacity: 0.8 },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '0.7rem',
          }}
        >
          {title}
        </Typography>
        <IconButton size="small" sx={{ color: 'text.secondary', p: 0 }}>
          {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Box sx={{ pt: 1 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

// ============================================
// CHARACTER CARD COMPONENT
// ============================================

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const generations = character.generations ?? [];
  const releaseCount = character.releaseCount ?? 0;

  return (
    <Box
      component={RouterLink}
      to={`/catalog/c/${character.id}`}
      aria-label={`${character.name} character`}
      sx={{
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
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '150%',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
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

      <Box sx={{ p: 2 }}>
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
  );
};

// ============================================
// WIDGET COMPONENTS
// ============================================

interface CatalogHeaderProps {
  totalCharacters: number;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({ totalCharacters }) => (
  <Box
    sx={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      px: { xs: 2, md: 4 },
      py: 3,
    }}
  >
    <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 0.5 }}>
        Character Catalog
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {totalCharacters} characters in the archive
      </Typography>
    </Box>
  </Box>
);

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
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
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
}) => (
  <Box
    sx={{
      width: 260,
      flexShrink: 0,
      borderRight: '1px solid rgba(255,255,255,0.06)',
      p: 3,
      display: { xs: 'none', lg: 'block' },
      maxHeight: 'calc(100vh - 180px)',
      overflowY: 'auto',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
        Filters
        {activeFilterCount > 0 && (
          <Chip
            label={activeFilterCount}
            size="small"
            sx={{
              ml: 1,
              height: 20,
              backgroundColor: 'primary.main',
              color: 'white',
              fontSize: '0.7rem',
            }}
          />
        )}
      </Typography>
      {activeFilterCount > 0 && (
        <Button
          onClick={clearAllFilters}
          size="small"
          sx={{
            fontSize: '0.7rem',
            color: 'text.secondary',
            textTransform: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          Clear All
        </Button>
      )}
    </Box>

    <FilterSection title="Generation">
      <FormGroup>
        {GENERATIONS.map((gen) => (
          <FormControlLabel
            key={gen}
            control={
              <Checkbox
                checked={selectedGenerations.includes(gen)}
                onChange={() => toggleArrayFilter(gen, selectedGenerations, setSelectedGenerations)}
                size="small"
              />
            }
            label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{gen}</Typography>}
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    <FilterSection title="Species" defaultOpen={false}>
      <FormGroup>
        {SPECIES_LIST.map((species) => (
          <FormControlLabel
            key={species}
            control={
              <Checkbox
                checked={selectedSpecies.includes(species)}
                onChange={() => toggleArrayFilter(species, selectedSpecies, setSelectedSpecies)}
                size="small"
              />
            }
            label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{species}</Typography>}
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    {TAGS.length > 0 && (
      <FilterSection title="Tags" defaultOpen={false}>
        <FormGroup>
          {TAGS.map((tag) => (
            <FormControlLabel
              key={tag}
              control={
                <Checkbox
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleArrayFilter(tag, selectedTags, setSelectedTags)}
                  size="small"
                />
              }
              label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{tag}</Typography>}
              sx={{ mb: -0.5 }}
            />
          ))}
        </FormGroup>
      </FilterSection>
    )}
  </Box>
);

interface ResultsToolbarProps {
  resultCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const ResultsToolbar: React.FC<ResultsToolbarProps> = ({
  resultCount,
  sortBy,
  onSortChange,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 3,
    }}
  >
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {resultCount} result{resultCount !== 1 ? 's' : ''}
    </Typography>

    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel sx={{ fontSize: '0.85rem' }}>Sort By</InputLabel>
      <Select
        value={sortBy}
        label="Sort By"
        onChange={(e) => onSortChange(e.target.value)}
        sx={{ '& .MuiSelect-select': { py: 1 } }}
      >
        <MenuItem value="name">Name (A-Z)</MenuItem>
        <MenuItem value="releaseCount">Most Releases</MenuItem>
        <MenuItem value="species">Species</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => (
  <Grid container spacing={2.5}>
    {characters.map((character) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={character.id}>
        <CharacterCard character={character} />
      </Grid>
    ))}
  </Grid>
);

const EmptyResults: React.FC = () => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
      No characters found
    </Typography>
    <Typography variant="body2" sx={{ color: '#6B7280' }}>
      Try adjusting your filters or search query
    </Typography>
  </Box>
);

interface CatalogPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CatalogPagination: React.FC<CatalogPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      sx={{
        '& .MuiPaginationItem-root': {
          color: 'text.secondary',
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        },
      }}
    />
  </Box>
);

// ============================================
// MAIN CHARACTER CATALOG COMPONENT
// ============================================

const CharacterCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([...GENERATIONS]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const toggleArrayFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const clearAllFilters = () => {
    setSelectedGenerations([...GENERATIONS]);
    setSelectedSpecies([]);
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenerations.length !== GENERATIONS.length) count++;
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
    <Box>
      <CatalogHeader totalCharacters={characterModels.length} />

      <Box sx={{ display: 'flex', maxWidth: 1600, mx: 'auto' }}>
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
        />

        <Box sx={{ flex: 1, p: 3 }}>
          <ResultsToolbar
            resultCount={filteredCharacters.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
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
      </Box>
    </Box>
  );
};

export default CharacterCatalog;
