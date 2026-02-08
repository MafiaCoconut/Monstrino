import React, { useState, useMemo } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
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
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { releaseImageMock } from '@/data/real-data/releaseImageMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { releaseSeriesLinkMock } from '@/data/real-data/releaseSeriesLinkMock';
import { seriesMock } from '@/data/real-data/seriesMock';
import {
  GENERATIONS,
  SERIES_TYPES,
  type Generation,
  type Series,
  type SeriesId,
  type SeriesType,
} from '../entities';


// ============================================
// DATA TRANSFORMATION (mock -> series models)
// ============================================

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const releaseById = new Map(releaseMock.map((release) => [release.id, release]));
const seriesById = new Map(seriesMock.map((entry) => [entry.id, entry]));

const releaseImageByReleaseId = releaseImageMock.reduce<Map<number, string>>((acc, image) => {
  if (!acc.has(image.release_id) || image.is_primary) {
    acc.set(image.release_id, image.image_url);
  }
  return acc;
}, new Map());

const charactersByReleaseId = releaseCharacterMock.reduce<Map<number, Set<number>>>(
  (acc, link) => {
    const set = acc.get(link.release_id) ?? new Set<number>();
    set.add(link.character_id);
    acc.set(link.release_id, set);
    return acc;
  },
  new Map()
);

const toSeriesId = (value: string | number): SeriesId => `${value}` as SeriesId;

const normalizeName = (value: string) => value.trim().toLowerCase();

const parseYearFromDate = (value?: string | null) => {
  if (!value) return undefined;
  const year = Number.parseInt(value.slice(0, 4), 10);
  return Number.isNaN(year) ? undefined : year;
};

const inferGeneration = (year?: number): Generation => {
  if (!year) return GENERATIONS[0];
  if (year >= 2022) return 'G3';
  if (year >= 2016) return 'G2';
  return 'G1';
};

const getReleaseYear = (release: (typeof releaseMock)[number]) =>
  release.year ?? parseYearFromDate(release.created_at);

const getReleaseImageUrl = (releaseId: number) => releaseImageByReleaseId.get(releaseId);

const inferSeriesType = (entry: (typeof seriesMock)[number]): SeriesType => {
  const text = normalizeName(`${entry.display_name ?? ''} ${entry.name ?? ''}`);
  if (/(sdcc|comic|convention)/.test(text)) return 'Convention';
  if (/(skullector|collector|haunt couture)/.test(text)) return 'Collector';
  if (/(reboot|creeproduction|gen 3|g3)/.test(text)) return 'Reboot';
  if (/(basic|signature|mainline)/.test(text)) return 'Mainline';
  return 'Special';
};

type SeriesStats = {
  min?: number;
  max?: number;
  count: number;
  characterIds: Set<number>;
  imageUrl?: string;
};

const seriesStats = new Map<number, SeriesStats>();
releaseSeriesLinkMock.forEach((link) => {
  const release = releaseById.get(link.release_id);
  const seriesEntry = seriesById.get(link.series_id);
  if (!release || !seriesEntry) return;
  const year = getReleaseYear(release);
  const releaseImage = getReleaseImageUrl(link.release_id);

  const stats = seriesStats.get(link.series_id) ?? {
    count: 0,
    characterIds: new Set<number>(),
  };
  stats.count += 1;
  if (year) {
    stats.min = stats.min ? Math.min(stats.min, year) : year;
    stats.max = stats.max ? Math.max(stats.max, year) : year;
  }
  const characterIds = charactersByReleaseId.get(link.release_id);
  characterIds?.forEach((id) => stats.characterIds.add(id));
  if (!stats.imageUrl && releaseImage) {
    stats.imageUrl = releaseImage;
  }
  seriesStats.set(link.series_id, stats);
});

const seriesModels: Series[] = seriesMock.map((entry) => {
  const stats = seriesStats.get(entry.id);
  const yearStart = stats?.min ?? parseYearFromDate(entry.created_at);
  const yearEnd = stats?.max && stats?.min && stats.max !== stats.min ? stats.max : undefined;
  const generation = inferGeneration(stats?.max ?? yearStart);
  const imageUrl =
    entry.primary_image ??
    stats?.imageUrl ??
    PLACEHOLDER_IMAGE;

  return {
    id: toSeriesId(entry.id),
    name: entry.display_name ?? entry.name,
    generation,
    yearStart,
    yearEnd,
    yearLabel: yearStart ? (yearEnd ? `${yearStart} – ${yearEnd}` : `${yearStart} – Present`) : undefined,
    releaseCount: stats?.count ?? 0,
    characterCount: stats?.characterIds.size ?? 0,
    seriesType: inferSeriesType(entry),
    description: entry.description ?? undefined,
    imageUrl,
    createdAt: entry.created_at,
    updatedAt: entry.updated_at,
  };
});

const SERIES_TYPE_OPTIONS = SERIES_TYPES.filter((type) =>
  seriesModels.some((entry) => entry.seriesType === type)
);
const SERIES_TYPE_LIST = SERIES_TYPE_OPTIONS.length > 0 ? SERIES_TYPE_OPTIONS : SERIES_TYPES;

// ============================================
// YEAR PRESETS
// ============================================

const YEAR_PRESETS = [
  { label: 'All Years', value: 'all', start: null, end: null },
  { label: '2020s', value: '2020s', start: 2020, end: 2029 },
  { label: '2010s', value: '2010s', start: 2010, end: 2019 },
  { label: '2000s', value: '2000s', start: 2000, end: 2009 },
  { label: 'Custom', value: 'custom', start: null, end: null },
] as const;

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
// SERIES CARD COMPONENT
// ============================================

interface SeriesCardProps {
  series: Series;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series }) => {
  const yearRange =
    series.yearLabel ??
    (series.yearStart
      ? series.yearEnd
        ? `${series.yearStart} – ${series.yearEnd}`
        : `${series.yearStart} – Present`
      : 'Unknown');
  const generationLabel = series.generation ?? GENERATIONS[0];
  const releaseCount = series.releaseCount ?? 0;
  const seriesType = series.seriesType ?? 'Special';

  return (
    <Box
      component={RouterLink}
      to={`/catalog/s/${series.id}`}
      aria-label={`${series.name} series`}
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
      {/* Portrait Image Container - ~1:1.5 aspect ratio */}
      {/* <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '150%', // ~1:1.5 aspect ratio
          backgroundColor: '#1F1F23',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={series.imageUrl}
          alt={series.name}
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
      </Box> */}

      {/* Card Content */}
      <Box sx={{ p: 2 }}>
        {/* Series Name */}
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
          {series.name}
        </Typography>

        {/* Year Range */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            mb: 1.5,
          }}
        >
          {yearRange}
        </Typography>

        {/* Generation + Release Count */}
        <Typography
          variant="caption"
          sx={{
            color: '#6B7280',
            display: 'block',
            fontSize: '0.75rem',
            mb: 1.5,
          }}
        >
          {generationLabel} • {releaseCount} releases
        </Typography>

        {/* Series Type Badge */}
        <Chip
          label={seriesType}
          size="small"
          sx={{
            backgroundColor:
              seriesType === 'Collector'
                ? 'rgba(217, 70, 239, 0.15)'
                : seriesType === 'Convention'
                ? 'rgba(234, 179, 8, 0.15)'
                : 'rgba(139, 92, 246, 0.15)',
            color:
              seriesType === 'Collector'
                ? '#E879F9'
                : seriesType === 'Convention'
                ? '#FACC15'
                : '#A78BFA',
            fontSize: '0.65rem',
            height: '22px',
            fontWeight: 500,
          }}
        />
      </Box>
    </Box>
  );
};

// ============================================
// WIDGET COMPONENTS
// ============================================

interface CatalogHeaderProps {
  totalSeries: number;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({ totalSeries }) => (
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
        Series Catalog
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {totalSeries} series in the archive
      </Typography>
    </Box>
  </Box>
);

interface FiltersSidebarProps {
  activeFilterCount: number;
  clearAllFilters: () => void;
  selectedGenerations: string[];
  selectedSeriesTypes: string[];
  yearPreset: string;
  customYearStart: string;
  customYearEnd: string;
  setSelectedGenerations: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSeriesTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setYearPreset: React.Dispatch<React.SetStateAction<string>>;
  setCustomYearStart: React.Dispatch<React.SetStateAction<string>>;
  setCustomYearEnd: React.Dispatch<React.SetStateAction<string>>;
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
  selectedSeriesTypes,
  yearPreset,
  customYearStart,
  customYearEnd,
  setSelectedGenerations,
  setSelectedSeriesTypes,
  setYearPreset,
  setCustomYearStart,
  setCustomYearEnd,
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
            label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{gen}</Typography>}
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    {/* Year Range */}
    <FilterSection title="Year Range">
      <RadioGroup
        value={yearPreset}
        onChange={(e) => setYearPreset(e.target.value)}
      >
        {YEAR_PRESETS.map((preset) => (
          <FormControlLabel
            key={preset.value}
            value={preset.value}
            control={<Radio size="small" />}
            label={
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                {preset.label}
              </Typography>
            }
            sx={{ mb: -0.5 }}
          />
        ))}
      </RadioGroup>
      
      {/* Custom Year Inputs */}
      {yearPreset === 'custom' && (
        <Box sx={{ display: 'flex', gap: 1, mt: 1.5, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Start"
            type="number"
            value={customYearStart}
            onChange={(e) => setCustomYearStart(e.target.value)}
            sx={{
              width: 80,
              '& .MuiOutlinedInput-root': {
                '& input': { py: 0.75, fontSize: '0.85rem' },
              },
            }}
          />
          <Typography sx={{ color: 'text.secondary' }}>—</Typography>
          <TextField
            size="small"
            placeholder="End"
            type="number"
            value={customYearEnd}
            onChange={(e) => setCustomYearEnd(e.target.value)}
            sx={{
              width: 80,
              '& .MuiOutlinedInput-root': {
                '& input': { py: 0.75, fontSize: '0.85rem' },
              },
            }}
          />
        </Box>
      )}
    </FilterSection>

    {/* Series Type */}
    <FilterSection title="Series Type">
      <FormGroup>
        {SERIES_TYPE_LIST.map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={selectedSeriesTypes.includes(type)}
                onChange={() => toggleArrayFilter(type, selectedSeriesTypes, setSelectedSeriesTypes)}
                size="small"
              />
            }
            label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{type}</Typography>}
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

    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel sx={{ fontSize: '0.85rem' }}>Sort By</InputLabel>
      <Select
        value={sortBy}
        label="Sort By"
        onChange={(e) => onSortChange(e.target.value)}
        sx={{ '& .MuiSelect-select': { py: 1 } }}
      >
        <MenuItem value="name">Name (A-Z)</MenuItem>
        <MenuItem value="yearNewest">Year (Newest)</MenuItem>
        <MenuItem value="yearOldest">Year (Oldest)</MenuItem>
        <MenuItem value="releaseCount">Release Count</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

interface SeriesGridProps {
  series: Series[];
}

const SeriesGrid: React.FC<SeriesGridProps> = ({ series }) => (
  <Grid container spacing={2.5}>
    {series.map((entry) => (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={entry.id}>
        <SeriesCard series={entry} />
      </Grid>
    ))}
  </Grid>
);

const EmptyResults: React.FC = () => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
      No series found
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
// MAIN SERIES CATALOG COMPONENT
// ============================================

const SeriesCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // Filter state
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([...GENERATIONS]);
  const [selectedSeriesTypes, setSelectedSeriesTypes] = useState<string[]>([]);
  const [yearPreset, setYearPreset] = useState('all');
  const [customYearStart, setCustomYearStart] = useState('');
  const [customYearEnd, setCustomYearEnd] = useState('');

  // Sort & pagination
  const [sortBy, setSortBy] = useState('name');
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
    setSelectedSeriesTypes([]);
    setYearPreset('all');
    setCustomYearStart('');
    setCustomYearEnd('');
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenerations.length !== GENERATIONS.length) count++;
    if (selectedSeriesTypes.length > 0) count++;
    if (yearPreset !== 'all') count++;
    if (searchQuery) count++;
    return count;
  }, [selectedGenerations, selectedSeriesTypes, yearPreset, searchQuery]);

  // Get year range from preset or custom
  const getYearRange = (): { start: number | null; end: number | null } => {
    if (yearPreset === 'custom') {
      return {
        start: customYearStart ? parseInt(customYearStart) : null,
        end: customYearEnd ? parseInt(customYearEnd) : null,
      };
    }
    const preset = YEAR_PRESETS.find((p) => p.value === yearPreset);
    return { start: preset?.start ?? null, end: preset?.end ?? null };
  };

  // Filter & sort series
  const filteredSeries = useMemo(() => {
    const yearRange = getYearRange();

    let results = seriesModels.filter((series) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = series.name.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Generation
      if (
        selectedGenerations.length > 0 &&
        (!series.generation || !selectedGenerations.includes(series.generation))
      ) {
        return false;
      }

      // Series Type
      if (selectedSeriesTypes.length > 0 && !selectedSeriesTypes.includes(series.seriesType ?? '')) {
        return false;
      }

      // Year Range
      if (yearRange.start !== null || yearRange.end !== null) {
        if (!series.yearStart) return false;
        const seriesEnd = series.yearEnd ?? series.yearStart;
        if (yearRange.start !== null && seriesEnd < yearRange.start) return false;
        if (yearRange.end !== null && series.yearStart > yearRange.end) return false;
      }

      return true;
    });

    // Sort (series with releases first)
    results.sort((a, b) => {
      const aHasReleases = (a.releaseCount ?? 0) > 0;
      const bHasReleases = (b.releaseCount ?? 0) > 0;
      if (aHasReleases !== bHasReleases) {
        return aHasReleases ? -1 : 1;
      }

      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'yearNewest':
          return (b.yearStart ?? 0) - (a.yearStart ?? 0);
        case 'yearOldest':
          return (a.yearStart ?? 0) - (b.yearStart ?? 0);
        case 'releaseCount':
          return (b.releaseCount ?? 0) - (a.releaseCount ?? 0);
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, selectedGenerations, selectedSeriesTypes, yearPreset, customYearStart, customYearEnd, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredSeries.length / itemsPerPage);
  const paginatedSeries = filteredSeries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box>
      <CatalogHeader totalSeries={seriesModels.length} />

      {/* Main Content */}
      <Box sx={{ display: 'flex', maxWidth: 1600, mx: 'auto' }}>
        {/* Left Sidebar - Filters */}
        <FiltersSidebar
          activeFilterCount={activeFilterCount}
          clearAllFilters={clearAllFilters}
          selectedGenerations={selectedGenerations}
          selectedSeriesTypes={selectedSeriesTypes}
          yearPreset={yearPreset}
          customYearStart={customYearStart}
          customYearEnd={customYearEnd}
          setSelectedGenerations={setSelectedGenerations}
          setSelectedSeriesTypes={setSelectedSeriesTypes}
          setYearPreset={setYearPreset}
          setCustomYearStart={setCustomYearStart}
          setCustomYearEnd={setCustomYearEnd}
          toggleArrayFilter={toggleArrayFilter}
        />

        {/* Main Grid Area */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Results Count & Sort */}
          <ResultsToolbar
            resultCount={filteredSeries.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Series Grid */}
          <SeriesGrid series={paginatedSeries} />

          {/* Empty State */}
          {filteredSeries.length === 0 && <EmptyResults />}

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

export default SeriesCatalog;
