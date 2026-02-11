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
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { releaseImageMock } from '@/data/real-data/releaseImageMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { releaseSeriesLinkMock } from '@/data/real-data/releaseSeriesLinkMock';
import { seriesMock } from '@/data/real-data/seriesMock';
import { SeriesCard } from '../components/series-card';
import {
  GENERATIONS,
  SERIES_TYPES,
  type Generation,
  type Series,
  type SeriesId,
  type SeriesType,
} from '../entities';
import { useElementHeight } from './useElementHeight';


// ============================================
// DATA TRANSFORMATION (mock -> series models)
// ============================================

const PLACEHOLDER_IMAGE = '/placeholder.svg';
type ReleaseMockRecord = {
  id: number;
  year?: number | null;
  created_at?: string | null;
};

type SeriesMockRecord = {
  id: number;
  name: string;
  display_name?: string | null;
  description?: string | null;
  primary_image?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
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

const releaseMockData: ReadonlyArray<ReleaseMockRecord> = releaseMock;
const seriesMockData: ReadonlyArray<SeriesMockRecord> = seriesMock;
const releaseImageData: ReadonlyArray<ReleaseImageMockRecord> = releaseImageMock;
const releaseCharacterData: ReadonlyArray<ReleaseCharacterMockRecord> = releaseCharacterMock;
const releaseSeriesLinksData: ReadonlyArray<ReleaseSeriesLinkMockRecord> = releaseSeriesLinkMock;

const releaseById = new Map<number, ReleaseMockRecord>(
  releaseMockData.map((release) => [release.id, release])
);
const seriesById = new Map<number, SeriesMockRecord>(
  seriesMockData.map((entry) => [entry.id, entry])
);

const releaseImageByReleaseId = releaseImageData.reduce<Map<number, string>>((acc, image) => {
  if (!acc.has(image.release_id) || image.is_primary) {
    acc.set(image.release_id, image.image_url);
  }
  return acc;
}, new Map());

const charactersByReleaseId = releaseCharacterData.reduce<Map<number, Set<number>>>(
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

const getReleaseYear = (release: ReleaseMockRecord) =>
  release.year ?? parseYearFromDate(release.created_at);

const getReleaseImageUrl = (releaseId: number) => releaseImageByReleaseId.get(releaseId);

const inferSeriesType = (entry: SeriesMockRecord): SeriesType => {
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
releaseSeriesLinksData.forEach((link) => {
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

const seriesModels: Series[] = seriesMockData.map((entry) => {
  const stats = seriesStats.get(entry.id);
  const yearStart = stats?.min ?? parseYearFromDate(entry.created_at);
  const yearEnd = stats?.max && stats?.min && stats.max !== stats.min ? stats.max : undefined;
  const generation = inferGeneration(stats?.max ?? yearStart);
  const imageUrl =
    entry.primary_image ??
    stats?.imageUrl ??
    PLACEHOLDER_IMAGE;
  const description = entry.description ?? undefined;
  const createdAt = entry.created_at ?? undefined;
  const updatedAt = entry.updated_at ?? undefined;
  const yearLabel =
    yearStart ? (yearEnd ? `${yearStart} – ${yearEnd}` : `${yearStart} – Present`) : undefined;

  return {
    id: toSeriesId(entry.id),
    name: entry.display_name ?? entry.name,
    generation,
    releaseCount: stats?.count ?? 0,
    characterCount: stats?.characterIds.size ?? 0,
    seriesType: inferSeriesType(entry),
    ...(description ? { description } : {}),
    imageUrl,
    ...(createdAt ? { createdAt } : {}),
    ...(updatedAt ? { updatedAt } : {}),
    ...(yearStart ? { yearStart } : {}),
    ...(yearEnd ? { yearEnd } : {}),
    ...(yearLabel ? { yearLabel } : {}),
  };
});

const SERIES_TYPE_OPTIONS = SERIES_TYPES.filter((type) =>
  seriesModels.some((entry) => entry.seriesType === type)
);
const SERIES_TYPE_LIST = SERIES_TYPE_OPTIONS.length > 0 ? SERIES_TYPE_OPTIONS : SERIES_TYPES;

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
          px: { xs: 0, md: 0 },
          borderRadius: 1,
          transition: 'all 0.2s ease',
          '&:hover': { 
            backgroundColor: { xs: 'rgba(255,255,255,0.03)', md: 'transparent' },
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontSize: { xs: '0.75rem', md: '0.65rem', lg: '0.7rem' },
          }}
        >
          {title}
        </Typography>
        <IconButton 
          size="small" 
          sx={{ 
            color: 'text.secondary', 
            p: 0.5,
            transition: 'transform 0.2s ease',
          }}
        >
          {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Box sx={{ pt: 1.5, pb: 0.5 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

// ============================================
// WIDGET COMPONENTS
// ============================================

const CatalogHeader: React.FC = () => (
  <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
    <Typography 
      variant="h4" 
      sx={{ 
        fontWeight: 700, 
        letterSpacing: '-0.02em', 
        mb: 0.5,
        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' }
      }}
    >
      Series Catalog
    </Typography>
    {/* <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        fontSize: { xs: '0.8125rem', sm: '0.875rem' }
      }}
    >
      {totalSeries} series in the archive
    </Typography> */}
  </Box>
);

interface FiltersSidebarProps {
  activeFilterCount: number;
  clearAllFilters: () => void;
  selectedGenerations: string[];
  selectedSeriesTypes: string[];
  selectedYears: string[];
  setSelectedGenerations: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSeriesTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedYears: React.Dispatch<React.SetStateAction<string[]>>;
  toggleArrayFilter: (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  showMoreSeriesTypes: boolean;
  setShowMoreSeriesTypes: React.Dispatch<React.SetStateAction<boolean>>;
  yearOptions: number[];
  catalogHeight?: number | null;
  isMobile?: boolean;
  onClose?: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  activeFilterCount,
  clearAllFilters,
  selectedGenerations,
  selectedSeriesTypes,
  selectedYears,
  setSelectedGenerations,
  setSelectedSeriesTypes,
  setSelectedYears,
  toggleArrayFilter,
  showMoreSeriesTypes,
  setShowMoreSeriesTypes,
  yearOptions,
  catalogHeight,
  isMobile = false,
  onClose,
}) => (
  <Box
    sx={{
      width: isMobile ? '100%' : { md: 240, lg: 260 },
      flexShrink: 0,
      borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.06)',
      p: isMobile ? 0 : { md: 2, lg: 3 },
      display: isMobile ? 'block' : { xs: 'none', md: 'block' },
      height: isMobile ? '100%' : catalogHeight ? `${catalogHeight}px` : 'auto',
      maxHeight: isMobile ? '100vh' : catalogHeight ? `${catalogHeight}px` : 'none',
      overflowY: 'auto',
      overflowX: 'hidden',
      backgroundColor: isMobile ? 'background.paper' : 'transparent',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(255,255,255,0.02)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.25)',
        },
      },
    }}
  >
    {/* Mobile Header */}
    {isMobile && (
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          px: 3,
          py: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <FilterListIcon sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontSize: '1.125rem',
                letterSpacing: '-0.01em',
              }}
            >
              Filters
            </Typography>
            {activeFilterCount > 0 && (
              <Chip
                label={activeFilterCount}
                size="small"
                sx={{
                  height: 22,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  px: 0.5,
                }}
              />
            )}
          </Box>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        {activeFilterCount > 0 && (
          <Button
            onClick={clearAllFilters}
            size="small"
            sx={{
              mt: 1.5,
              fontSize: '0.8125rem',
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 500,
              px: 0,
              minWidth: 'auto',
              '&:hover': { 
                color: 'primary.main',
                backgroundColor: 'transparent',
              },
            }}
          >
            Clear all filters
          </Button>
        )}
      </Box>
    )}

    {/* Desktop Header */}
    {!isMobile && (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: { md: 2, lg: 3 },
        }}
      >
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.primary',
            fontSize: { md: '0.8125rem', lg: '0.875rem' }
          }}
        >
          Filters
          {activeFilterCount > 0 && (
            <Chip
              label={activeFilterCount}
              size="small"
              sx={{
                ml: 1,
                height: { md: 18, lg: 20 },
                backgroundColor: 'primary.main',
                color: 'white',
                fontSize: { md: '0.65rem', lg: '0.7rem' },
              }}
            />
          )}
        </Typography>
        {activeFilterCount > 0 && (
          <Button
            onClick={clearAllFilters}
            size="small"
            sx={{
              fontSize: { md: '0.65rem', lg: '0.7rem' },
              color: 'text.secondary',
              textTransform: 'none',
              p: { md: '2px 6px', lg: '4px 8px' },
              minWidth: 'auto',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Clear All
          </Button>
        )}
      </Box>
    )}

    <Box sx={{ px: isMobile ? 3 : 0, py: isMobile ? 2 : 0 }}>
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

      <FilterSection title="Year Range">
        <FormGroup>
          {yearOptions.map((year) => (
            <FormControlLabel
              key={year}
              control={
                <Checkbox
                  checked={selectedYears.includes(String(year))}
                  onChange={() => toggleArrayFilter(String(year), setSelectedYears)}
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
                    color: selectedYears.includes(String(year)) ? 'text.primary' : 'text.secondary',
                    transition: 'color 0.2s',
                  }}
                >
                  {year}
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

      <FilterSection title="Series Type">
        <FormGroup>
          {(showMoreSeriesTypes ? SERIES_TYPE_LIST : SERIES_TYPE_LIST.slice(0, 8)).map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={selectedSeriesTypes.includes(type)}
                  onChange={() => toggleArrayFilter(type, setSelectedSeriesTypes)}
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
                    color: selectedSeriesTypes.includes(type) ? 'text.primary' : 'text.secondary',
                    transition: 'color 0.2s',
                  }}
                >
                  {type}
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
        {SERIES_TYPE_LIST.length > 8 && (
          <Button
            onClick={() => setShowMoreSeriesTypes(!showMoreSeriesTypes)}
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
            {showMoreSeriesTypes ? 'Show less' : `Show more (${SERIES_TYPE_LIST.length - 8})`}
          </Button>
        )}
      </FilterSection>

      {/* Bottom Spacing for Mobile */}
      {isMobile && <Box sx={{ height: 24 }} />}
    </Box>
  </Box>
);

interface ResultsToolbarProps {
  resultCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
  onFiltersClick?: () => void;
  activeFilterCount?: number;
}

const ResultsToolbar: React.FC<ResultsToolbarProps> = ({
  resultCount,
  sortBy,
  onSortChange,
  onFiltersClick,
  activeFilterCount = 0,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: { xs: 1.5, sm: 2 },
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { xs: 1.5, sm: 0 },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
      {/* Mobile Filters Button */}
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={onFiltersClick}
        sx={{
          display: { xs: 'flex', md: 'none' },
          textTransform: 'none',
          flex: { xs: 1, sm: 'none' },
        }}
      >
        Filters
        {activeFilterCount > 0 && (
          <Chip
            label={activeFilterCount}
            size="small"
            sx={{
              ml: 1,
              height: 18,
              backgroundColor: 'primary.main',
              color: 'white',
              fontSize: '0.65rem',
            }}
          />
        )}
      </Button>

      <Typography 
        variant="body2" 
        sx={{ 
          color: 'text.secondary',
          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          display: { xs: 'none', sm: 'block' }
        }}
      >
        {resultCount} result{resultCount !== 1 ? 's' : ''}
      </Typography>
    </Box>

    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 160 }, flex: { xs: 1, sm: 'none' } }}>
      <InputLabel sx={{ fontSize: { xs: '0.8125rem', sm: '0.85rem' } }}>Sort By</InputLabel>
      <Select
        value={sortBy}
        label="Sort By"
        onChange={(e) => onSortChange(e.target.value)}
        sx={{ 
          '& .MuiSelect-select': { 
            py: { xs: 0.75, sm: 1 },
            fontSize: { xs: '0.8125rem', sm: '0.875rem' }
          } 
        }}
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
  <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
    {series.map((entry) => (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={entry.id}>
        <SeriesCard {...entry} />
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
      No series found
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

interface CatalogPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CatalogPagination: React.FC<CatalogPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, sm: 4 } }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        size="medium"
        siblingCount={isMobile ? 0 : 1}
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'text.secondary',
            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            minWidth: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
            },
          },
        }}
      />
    </Box>
  );
};

// ============================================
// MAIN SERIES CATALOG COMPONENT
// ============================================

const SeriesCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const yearOptions = useMemo(() => {
    const years = new Set<number>();
    seriesModels.forEach((series) => {
      const start = series.yearStart;
      if (!start) return;
      const end = series.yearEnd ?? start;
      for (let year = start; year <= end; year += 1) {
        years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, []);
  const { ref: catalogRef, height: catalogHeight } = useElementHeight<HTMLDivElement>();

  // Filter state
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedSeriesTypes, setSelectedSeriesTypes] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  // Show more state for each filter
  const [showMoreSeriesTypes, setShowMoreSeriesTypes] = useState(false);

  // Mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sort & pagination
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenerations, selectedSeriesTypes, selectedYears]);

  // Toggle helpers
  const toggleArrayFilter = (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedGenerations([]);
    setSelectedSeriesTypes([]);
    setSelectedYears([]);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenerations.length > 0) count++;
    if (selectedSeriesTypes.length > 0) count++;
    if (selectedYears.length > 0) count++;
    if (searchQuery) count++;
    return count;
  }, [selectedGenerations, selectedSeriesTypes, selectedYears, searchQuery]);

  // Filter & sort series
  const filteredSeries = useMemo(() => {
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

      // Year (exact)
      if (selectedYears.length > 0) {
        if (!series.yearStart) return false;
        const seriesEnd = series.yearEnd ?? series.yearStart;
        const matchesYear = selectedYears.some((value) => {
          const year = Number.parseInt(value, 10);
          return year >= series.yearStart! && year <= seriesEnd;
        });
        if (!matchesYear) return false;
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
  }, [searchQuery, selectedGenerations, selectedSeriesTypes, selectedYears, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredSeries.length / itemsPerPage);
  const paginatedSeries = filteredSeries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box
      sx={{
        backgroundColor: '#0B0D11',
        backgroundImage:
          'radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%), radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%), linear-gradient(180deg, #0B0D11 0%, #121622 100%)',
      }}
    >
      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: { xs: '90%', sm: 380 },
            maxWidth: '100%',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          },
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <FiltersSidebar
          activeFilterCount={activeFilterCount}
          clearAllFilters={clearAllFilters}
          selectedGenerations={selectedGenerations}
          selectedSeriesTypes={selectedSeriesTypes}
          selectedYears={selectedYears}
          setSelectedGenerations={setSelectedGenerations}
          setSelectedSeriesTypes={setSelectedSeriesTypes}
          setSelectedYears={setSelectedYears}
          toggleArrayFilter={toggleArrayFilter}
          showMoreSeriesTypes={showMoreSeriesTypes}
          setShowMoreSeriesTypes={setShowMoreSeriesTypes}
          yearOptions={yearOptions}
          catalogHeight={catalogHeight}
          isMobile={true}
          onClose={() => setMobileFiltersOpen(false)}
        />
      </Drawer>

      <Box sx={{ display: 'flex', maxWidth: 1600, mx: 'auto', px: { xs: 1.5, sm: 2, md: 4 }, pt: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Desktop Filters */}
        <FiltersSidebar
          activeFilterCount={activeFilterCount}
          clearAllFilters={clearAllFilters}
          selectedGenerations={selectedGenerations}
          selectedSeriesTypes={selectedSeriesTypes}
          selectedYears={selectedYears}
          setSelectedGenerations={setSelectedGenerations}
          setSelectedSeriesTypes={setSelectedSeriesTypes}
          setSelectedYears={setSelectedYears}
          toggleArrayFilter={toggleArrayFilter}
          showMoreSeriesTypes={showMoreSeriesTypes}
          setShowMoreSeriesTypes={setShowMoreSeriesTypes}
          yearOptions={yearOptions}
          catalogHeight={catalogHeight}
        />

        <Box ref={catalogRef} sx={{ flex: 1, p: { xs: 1, sm: 1.5, md: 2 } }}>
          <CatalogHeader />

          <ResultsToolbar
            resultCount={filteredSeries.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onFiltersClick={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
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
