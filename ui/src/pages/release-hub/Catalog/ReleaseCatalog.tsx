import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Collapse,
  IconButton,
  Button,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { characterMock } from '@/data/real-data/characterMock';
import { exclusiveVendorMock } from '@/data/real-data/exclusiveVendorMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { releaseExclusiveLinkMock } from '@/data/real-data/releaseExclusiveLinkMock';
import { releaseImageMock } from '@/data/real-data/releaseImageMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { releaseSeriesLinkMock } from '@/data/real-data/releaseSeriesLinkMock';
import { seriesMock } from '@/data/real-data/seriesMock';
import {
  GENERATIONS,
  RELEASE_RARITIES,
  RELEASE_TYPES,
  type Generation,
  type Release,
  type ReleaseId,
  type ReleaseRarity,
  type ReleaseTag,
  type ReleaseType,
} from '../entities';
import ReleaseCard from '../components/release-cards/ReleaseCard';

// ============================================
// DATA TRANSFORMATION (mock -> release models)
// ============================================

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const releases = releaseMock;

const toReleaseId = (value: string | number): ReleaseId => `${value}` as ReleaseId;

type SeriesRecord = (typeof seriesMock)[number];
type ExclusiveVendorRecord = (typeof exclusiveVendorMock)[number];
type ReleaseImageRecord = (typeof releaseImageMock)[number];
type ReleaseCharacterRecord = (typeof releaseCharacterMock)[number];
type ReleaseSeriesLinkRecord = (typeof releaseSeriesLinkMock)[number];
type ReleaseExclusiveLinkRecord = (typeof releaseExclusiveLinkMock)[number];

const seriesById = new Map(seriesMock.map((series) => [series.id, series]));
const vendorById = new Map(exclusiveVendorMock.map((vendor) => [vendor.id, vendor]));

const characterNameById = new Map<number, string>(
  characterMock.map((character) => [character.id, character.display_name ?? character.name])
);

const releaseImagesByReleaseId = releaseImageMock.reduce<Map<number, ReleaseImageRecord[]>>(
  (acc, image) => {
    const list = acc.get(image.release_id) ?? [];
    list.push(image);
    acc.set(image.release_id, list);
    return acc;
  },
  new Map()
);

const releaseCharactersByReleaseId = releaseCharacterMock.reduce<Map<number, ReleaseCharacterRecord[]>>(
  (acc, link) => {
    const list = acc.get(link.release_id) ?? [];
    list.push(link);
    acc.set(link.release_id, list);
    return acc;
  },
  new Map()
);

const releaseSeriesByReleaseId = releaseSeriesLinkMock.reduce<Map<number, ReleaseSeriesLinkRecord[]>>(
  (acc, link) => {
    const list = acc.get(link.release_id) ?? [];
    list.push(link);
    acc.set(link.release_id, list);
    return acc;
  },
  new Map()
);

const releaseExclusivesByReleaseId = releaseExclusiveLinkMock.reduce<
  Map<number, ReleaseExclusiveLinkRecord[]>
>((acc, link) => {
  const list = acc.get(link.release_id) ?? [];
  list.push(link);
  acc.set(link.release_id, list);
  return acc;
}, new Map());


const normalizeName = (value: string) => value.trim().toLowerCase();

const getReleaseImageUrl = (releaseId: number) => {
  const images = releaseImagesByReleaseId.get(releaseId) ?? [];
  const primary = images.find((image) => image.is_primary);
  return primary?.image_url ?? images[0]?.image_url ?? PLACEHOLDER_IMAGE;
};

const getReleaseCharacterLinks = (releaseId: number) => {
  const links = releaseCharactersByReleaseId.get(releaseId) ?? [];
  return [...links].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
};

const getReleaseCharacterNames = (releaseId: number) => {
  const names = getReleaseCharacterLinks(releaseId)
    .map((link) => characterNameById.get(link.character_id))
    .filter(Boolean) as string[];
  return Array.from(new Set(names));
};

const getReleaseSeriesRefs = (releaseId: number) => {
  const links = releaseSeriesByReleaseId.get(releaseId) ?? [];
  const sorted = [...links].sort((a, b) => {
    const aPrimary = a.relation_type === 'primary' ? 0 : 1;
    const bPrimary = b.relation_type === 'primary' ? 0 : 1;
    return aPrimary - bPrimary;
  });
  return sorted
    .map((link) => seriesById.get(link.series_id))
    .filter((series): series is SeriesRecord => Boolean(series))
    .map((series) => ({ id: `${series.id}`, name: series.display_name ?? series.name }));
};

const getReleaseExclusives = (releaseId: number): ExclusiveVendorRecord[] => {
  const links = releaseExclusivesByReleaseId.get(releaseId) ?? [];
  return links
    .map((link) => vendorById.get(link.vendor_id))
    .filter((vendor): vendor is ExclusiveVendorRecord => Boolean(vendor));
};


const inferGeneration = (year?: number): Generation => {
  if (!year) return GENERATIONS[0];
  if (year >= 2022) return 'G3';
  if (year >= 2016) return 'G2';
  return 'G1';
};

const inferReleaseTypes = (
  release: (typeof releases)[number],
  seriesNames: string[]
): ReleaseType[] => {
  const text = normalizeName(
    [release.display_name, release.name, ...seriesNames].filter(Boolean).join(' ')
  );
  const matches = new Set<ReleaseType>();
  if (/skullector/.test(text)) matches.add('Skullector');
  if (/creeproduction/.test(text)) matches.add('Creeproduction');
  if (/(sdcc|comic-con|san diego comic)/.test(text)) matches.add('SDCC Exclusive');
  if (/collector/.test(text)) matches.add('Collector');
  if (/signature/.test(text)) matches.add('Signature');
  if (/\bbasic\b/.test(text)) matches.add('Basic');
  if (/playset/.test(text)) matches.add('Playset');
  if (/(multipack|2-pack|3-pack|4-pack|5-pack)/.test(text)) matches.add('Multipack');
  if (/fashion pack/.test(text)) matches.add('Fashion Pack');
  if (/vehicle|mobile|car/.test(text)) matches.add('Vehicle');
  return Array.from(matches);
};

const buildTags = (exclusiveVendors: ReturnType<typeof getReleaseExclusives>) => {
  const tags = new Set<ReleaseTag>();
  if (exclusiveVendors.length > 0) {
    tags.add('Exclusive');
  }

  const hasSdccExclusive = exclusiveVendors.some((exclusive) => {
    const haystack = normalizeName(`${exclusive.display_name ?? ''} ${exclusive.name ?? ''}`);
    return haystack.includes('comic-con') || haystack.includes('sdcc');
  });
  if (hasSdccExclusive) {
    tags.add('SDCC');
  }

  return Array.from(tags);
};

const inferRarity = (
  exclusiveVendors: ReturnType<typeof getReleaseExclusives>,
  releaseTypes: ReleaseType[]
): ReleaseRarity => {
  const exclusiveCount = exclusiveVendors.length;
  const hasSdccExclusive = exclusiveVendors.some((exclusive) => {
    const haystack = normalizeName(`${exclusive.display_name ?? ''} ${exclusive.name ?? ''}`);
    return haystack.includes('comic-con') || haystack.includes('sdcc');
  });

  if (hasSdccExclusive) return 'Grail';
  if (exclusiveCount > 0) return 'Ultra Rare';
  if (releaseTypes.includes('Skullector') || releaseTypes.includes('Collector')) return 'Rare';
  return 'Common';
};

const toReleaseDate = (release: (typeof releases)[number]) => {
  if (release.year) return `${release.year}-01-01`;
  if (release.created_at) return release.created_at.split(' ')[0];
  return '2000-01-01';
};

const releaseModels: Release[] = releases.map((release) => {
  const seriesRefs = getReleaseSeriesRefs(release.id);
  const seriesNames = seriesRefs.map((series) => series.name);
  const characterNames = getReleaseCharacterNames(release.id);
  const characterName = characterNames.join(' & ') || 'Unknown';
  const seriesName = seriesNames[0] ?? 'Unknown';
  const releaseTypes = inferReleaseTypes(release, seriesNames);
  const exclusiveVendors = getReleaseExclusives(release.id);
  const tags = buildTags(exclusiveVendors);
  const characterLinks = getReleaseCharacterLinks(release.id);

  return {
    id: toReleaseId(release.id),
    name: release.display_name ?? release.name ?? 'Untitled Release',
    characterName,
    seriesName,
    year: release.year ?? undefined,
    imageUrl: getReleaseImageUrl(release.id),
    isExclusive: exclusiveVendors.length > 0,
    generation: inferGeneration(release.year),
    releaseDate: toReleaseDate(release),
    releaseTypes,
    packSize: Math.max(1, characterLinks.length || 1),
    rarity: inferRarity(exclusiveVendors, releaseTypes),
    tags,
    createdAt: release.created_at ?? undefined,
    updatedAt: release.updated_at ?? undefined,
    characters: characterLinks.map((link) => ({
      id: `${link.character_id}`,
      name: characterNameById.get(link.character_id) ?? 'Unknown',
    })),
    series: seriesRefs,
  };
});

const SERIES_LIST = Array.from(new Set(releaseModels.map((release) => release.seriesName))).sort();
const CHARACTERS = Array.from(
  new Set(
    releaseModels.flatMap((release) => {
      const names = release.characters?.map((character) => character.name) ?? [];
      return names.length > 0 ? names : [release.characterName];
    })
  )
).sort();

const RELEASE_TYPE_OPTIONS = RELEASE_TYPES.filter((type) =>
  releaseModels.some((release) => release.releaseTypes?.includes(type))
);
const RELEASE_TYPE_LIST = RELEASE_TYPE_OPTIONS.length > 0 ? RELEASE_TYPE_OPTIONS : RELEASE_TYPES;

const TAGS = Array.from(
  new Set(releaseModels.flatMap((release) => release.tags ?? []))
).sort();

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
// WIDGET COMPONENTS
// ============================================

interface CatalogHeaderProps {
  totalReleases: number;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({ totalReleases }) => (
  <Box
    sx={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      px: { xs: 2, md: 4 },
      py: 3,
    }}
  >
    <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 0.5 }}
      >
        Release Catalog
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {totalReleases} releases in the archive
      </Typography>
    </Box>
  </Box>
);

interface FiltersSidebarProps {
  activeFilterCount: number;
  clearAllFilters: () => void;
  selectedGenerations: string[];
  selectedSeries: string[];
  selectedCharacters: string[];
  selectedReleaseTypes: string[];
  selectedRarities: string[];
  selectedTags: string[];
  setSelectedGenerations: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSeries: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCharacters: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedReleaseTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedRarities: React.Dispatch<React.SetStateAction<string[]>>;
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
  selectedSeries,
  selectedCharacters,
  selectedReleaseTypes,
  selectedRarities,
  selectedTags,
  setSelectedGenerations,
  setSelectedSeries,
  setSelectedCharacters,
  setSelectedReleaseTypes,
  setSelectedRarities,
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
    {/* Clear Filters */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, color: 'text.primary' }}
      >
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

    {/* Generation */}
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
            label={
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                {gen}
              </Typography>
            }
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    {/* Series */}
    <FilterSection title="Series">
      <FormGroup>
        {SERIES_LIST.slice(0, 8).map((series) => (
          <FormControlLabel
            key={series}
            control={
              <Checkbox
                checked={selectedSeries.includes(series)}
                onChange={() => toggleArrayFilter(series, selectedSeries, setSelectedSeries)}
                size="small"
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.85rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 160,
                }}
              >
                {series}
              </Typography>
            }
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    {/* Characters */}
    <FilterSection title="Character" defaultOpen={false}>
      <FormGroup>
        {CHARACTERS.slice(0, 8).map((char) => (
          <FormControlLabel
            key={char}
            control={
              <Checkbox
                checked={selectedCharacters.includes(char)}
                onChange={() => toggleArrayFilter(char, selectedCharacters, setSelectedCharacters)}
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                {char}
              </Typography>
            }
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    {/* Release Type */}
    <FilterSection title="Release Type" defaultOpen={false}>
      <FormGroup>
        {RELEASE_TYPE_LIST.map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={selectedReleaseTypes.includes(type)}
                onChange={() =>
                  toggleArrayFilter(type, selectedReleaseTypes, setSelectedReleaseTypes)
                }
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                {type}
              </Typography>
            }
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    {/* Rarity */}
    <FilterSection title="Rarity" defaultOpen={false}>
      <FormGroup>
        {RELEASE_RARITIES.map((rarity) => (
          <FormControlLabel
            key={rarity}
            control={
              <Checkbox
                checked={selectedRarities.includes(rarity)}
                onChange={() => toggleArrayFilter(rarity, selectedRarities, setSelectedRarities)}
                size="small"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                {rarity}
              </Typography>
            }
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    {/* Tags */}
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
            label={
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                {tag}
              </Typography>
            }
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>
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

    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel sx={{ fontSize: '0.85rem' }}>Sort By</InputLabel>
      <Select
        value={sortBy}
        label="Sort By"
        onChange={(e) => onSortChange(e.target.value)}
        sx={{ '& .MuiSelect-select': { py: 1 } }}
      >
        <MenuItem value="releaseDate">Release Date</MenuItem>
        <MenuItem value="name">Name (A-Z)</MenuItem>
        <MenuItem value="rarity">Rarity</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

interface ReleaseGridProps {
  releases: Release[];
}

const ReleaseGrid: React.FC<ReleaseGridProps> = ({ releases }) => (
  <Grid container spacing={2.5}>
    {releases.map((release) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={release.release_id}>
        <ReleaseCard release={release} />
      </Grid>
    ))}
  </Grid>
);

const EmptyResults: React.FC = () => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
      No releases found
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
// MAIN CATALOG COMPONENT
// ============================================

const ReleaseCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // Filter state
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([...GENERATIONS]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [selectedReleaseTypes, setSelectedReleaseTypes] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Sort & pagination
  const [sortBy, setSortBy] = useState('releaseDate');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Toggle helpers
  const toggleArrayFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedGenerations([...GENERATIONS]);
    setSelectedSeries([]);
    setSelectedCharacters([]);
    setSelectedReleaseTypes([]);
    setSelectedRarities([]);
    setSelectedTags([]);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenerations.length !== GENERATIONS.length) count++;
    if (selectedSeries.length > 0) count++;
    if (selectedCharacters.length > 0) count++;
    if (selectedReleaseTypes.length > 0) count++;
    if (selectedRarities.length > 0) count++;
    if (selectedTags.length > 0) count++;
    if (searchQuery) count++;
    return count;
  }, [
    selectedGenerations,
    selectedSeries,
    selectedCharacters,
    selectedReleaseTypes,
    selectedRarities,
    selectedTags,
    searchQuery,
  ]);

  // Filter & sort releases
  const filteredReleases = useMemo(() => {
    let results = releaseModels.filter((release) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          release.characterName.toLowerCase().includes(query) ||
          release.seriesName.toLowerCase().includes(query) ||
          (release.tags ?? []).some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Generation
      if (selectedGenerations.length > 0 && !selectedGenerations.includes(release.generation)) {
        return false;
      }

      // Series
      if (selectedSeries.length > 0 && !selectedSeries.includes(release.seriesName)) {
        return false;
      }

      // Characters
      if (selectedCharacters.length > 0) {
        const matchesChar = selectedCharacters.some((char) =>
          release.characterName.toLowerCase().includes(char.toLowerCase())
        );
        if (!matchesChar) return false;
      }

      // Release Types
      if (selectedReleaseTypes.length > 0) {
        const hasType = (release.releaseTypes ?? []).some((type) =>
          selectedReleaseTypes.includes(type)
        );
        if (!hasType) return false;
      }

      // Rarity
      if (selectedRarities.length > 0 && !selectedRarities.includes(release.rarity ?? '')) {
        return false;
      }

      // Tags
      if (selectedTags.length > 0) {
        const hasTag = (release.tags ?? []).some((tag) => selectedTags.includes(tag));
        if (!hasTag) return false;
      }

      return true;
    });

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'releaseDate':
          return (
            new Date(b.releaseDate ?? '1970-01-01').getTime() -
            new Date(a.releaseDate ?? '1970-01-01').getTime()
          );
        case 'name':
          return a.characterName.localeCompare(b.characterName);
        case 'rarity':
          const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Grail'];
          return (
            rarityOrder.indexOf(b.rarity ?? 'Common') -
            rarityOrder.indexOf(a.rarity ?? 'Common')
          );
        default:
          return 0;
      }
    });

    return results;
  }, [
    searchQuery,
    selectedGenerations,
    selectedSeries,
    selectedCharacters,
    selectedReleaseTypes,
    selectedRarities,
    selectedTags,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredReleases.length / itemsPerPage);
  const paginatedReleases = filteredReleases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box>
      <CatalogHeader totalReleases={releaseModels.length} />

      {/* Main Content */}
      <Box sx={{ display: 'flex', maxWidth: 1600, mx: 'auto' }}>
        {/* Left Sidebar - Filters */}
        <FiltersSidebar
          activeFilterCount={activeFilterCount}
          clearAllFilters={clearAllFilters}
          selectedGenerations={selectedGenerations}
          selectedSeries={selectedSeries}
          selectedCharacters={selectedCharacters}
          selectedReleaseTypes={selectedReleaseTypes}
          selectedRarities={selectedRarities}
          selectedTags={selectedTags}
          setSelectedGenerations={setSelectedGenerations}
          setSelectedSeries={setSelectedSeries}
          setSelectedCharacters={setSelectedCharacters}
          setSelectedReleaseTypes={setSelectedReleaseTypes}
          setSelectedRarities={setSelectedRarities}
          setSelectedTags={setSelectedTags}
          toggleArrayFilter={toggleArrayFilter}
        />

        {/* Main Grid Area */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Results Count & Sort */}
          <ResultsToolbar
            resultCount={filteredReleases.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Release Grid */}
          <ReleaseGrid releases={paginatedReleases} />

          {/* Empty State */}
          {filteredReleases.length === 0 && <EmptyResults />}

          {/* Pagination */}
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

export default ReleaseCatalog;
