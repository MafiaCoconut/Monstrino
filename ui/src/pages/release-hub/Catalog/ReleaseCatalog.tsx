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
import { characterMock } from '@/data/real-data/characterMock';
import { exclusiveVendorMock } from '@/data/real-data/exclusiveVendorMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { releaseExclusiveLinkMock } from '@/data/real-data/releaseExclusiveLinkMock';
import { releaseImageMock } from '@/data/real-data/releaseImageMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { releaseSeriesLinkMock } from '@/data/real-data/releaseSeriesLinkMock';
import { seriesMock } from '@/data/real-data/seriesMock';
import { useElementHeight } from './useElementHeight';
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
import ReleaseCardCatalog from '../components/release-cards/ReleaseCardCatalog';

// ============================================
// DATA TRANSFORMATION (mock -> release models)
// ============================================

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const toReleaseId = (value: string | number): ReleaseId => `${value}` as ReleaseId;

type ReleaseMockRecord = {
  id: number;
  name?: string | null;
  display_name?: string | null;
  year?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type SeriesRecord = {
  id: number;
  name: string;
  display_name?: string | null;
};

type ExclusiveVendorRecord = {
  id: number;
  name?: string | null;
  display_name?: string | null;
};

type ReleaseImageRecord = {
  release_id: number;
  image_url: string;
  is_primary?: boolean | null;
  position?: number | null;
};

type ReleaseCharacterRecord = {
  release_id: number;
  character_id: number;
  position?: number | null;
};

type ReleaseSeriesLinkRecord = {
  release_id: number;
  series_id: number;
  relation_type?: string | null;
};

type ReleaseExclusiveLinkRecord = {
  release_id: number;
  vendor_id: number;
};

type CharacterMockRecord = {
  id: number;
  name: string;
  display_name?: string | null;
};

const releases: ReadonlyArray<ReleaseMockRecord> = releaseMock;
const seriesMockData: ReadonlyArray<SeriesRecord> = seriesMock;
const exclusiveVendorData: ReadonlyArray<ExclusiveVendorRecord> = exclusiveVendorMock;
const releaseImagesData: ReadonlyArray<ReleaseImageRecord> = releaseImageMock;
const releaseCharactersData: ReadonlyArray<ReleaseCharacterRecord> = releaseCharacterMock;
const releaseSeriesLinksData: ReadonlyArray<ReleaseSeriesLinkRecord> = releaseSeriesLinkMock;
const releaseExclusiveLinksData: ReadonlyArray<ReleaseExclusiveLinkRecord> = releaseExclusiveLinkMock;
const characterMockData: ReadonlyArray<CharacterMockRecord> = characterMock;

const seriesById = new Map<number, SeriesRecord>(
  seriesMockData.map((series) => [series.id, series])
);
const vendorById = new Map<number, ExclusiveVendorRecord>(
  exclusiveVendorData.map((vendor) => [vendor.id, vendor])
);

const characterNameById = new Map<number, string>(
  characterMockData.map((character) => [character.id, character.display_name ?? character.name])
);

const releaseImagesByReleaseId = releaseImagesData.reduce<Map<number, ReleaseImageRecord[]>>(
  (acc, image) => {
    const list = acc.get(image.release_id) ?? [];
    list.push(image);
    acc.set(image.release_id, list);
    return acc;
  },
  new Map()
);

const releaseCharactersByReleaseId = releaseCharactersData.reduce<Map<number, ReleaseCharacterRecord[]>>(
  (acc, link) => {
    const list = acc.get(link.release_id) ?? [];
    list.push(link);
    acc.set(link.release_id, list);
    return acc;
  },
  new Map()
);

const releaseSeriesByReleaseId = releaseSeriesLinksData.reduce<Map<number, ReleaseSeriesLinkRecord[]>>(
  (acc, link) => {
    const list = acc.get(link.release_id) ?? [];
    list.push(link);
    acc.set(link.release_id, list);
    return acc;
  },
  new Map()
);

const releaseExclusivesByReleaseId = releaseExclusiveLinksData.reduce<
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

const inferReleaseTypes = (release: ReleaseMockRecord, seriesNames: string[]): ReleaseType[] => {
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

const toReleaseDate = (release: ReleaseMockRecord): string => {
  if (release.year) return `${release.year}-01-01`;
  if (release.created_at) return release.created_at.split(' ')[0] ?? '2000-01-01';
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
  const releaseYear = release.year ?? undefined;
  const createdAt = release.created_at ?? undefined;
  const updatedAt = release.updated_at ?? undefined;

  return {
    id: toReleaseId(release.id),
    name: release.display_name ?? release.name ?? 'Untitled Release',
    characterName,
    seriesName,
    imageUrl: getReleaseImageUrl(release.id),
    isExclusive: exclusiveVendors.length > 0,
    generation: inferGeneration(release.year ?? undefined),
    releaseDate: toReleaseDate(release),
    releaseTypes,
    packSize: Math.max(1, characterLinks.length || 1),
    rarity: inferRarity(exclusiveVendors, releaseTypes),
    tags,
    ...(releaseYear ? { year: releaseYear } : {}),
    ...(createdAt ? { createdAt } : {}),
    ...(updatedAt ? { updatedAt } : {}),
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
            transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
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
      Releases Catalog
    </Typography>
    {/* <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
      {totalReleases} releases in the archive
    </Typography> */}
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
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  showMoreSeries: boolean;
  showMoreCharacters: boolean;
  showMoreReleaseTypes: boolean;
  showMoreRarities: boolean;
  showMoreTags: boolean;
  setShowMoreSeries: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMoreCharacters: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMoreReleaseTypes: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMoreRarities: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMoreTags: React.Dispatch<React.SetStateAction<boolean>>;
  catalogHeight?: number | null;
  isMobile?: boolean;
  onClose?: () => void;
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
  showMoreSeries,
  showMoreCharacters,
  showMoreReleaseTypes,
  showMoreRarities,
  showMoreTags,
  setShowMoreSeries,
  setShowMoreCharacters,
  setShowMoreReleaseTypes,
  setShowMoreRarities,
  setShowMoreTags,
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

    {/* Clear Filters */}
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
          sx={{ fontWeight: 600, color: 'text.primary', fontSize: { md: '0.8125rem', lg: '0.875rem' } }}
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

    {/* Filters Content */}
    <Box sx={{ px: isMobile ? 3 : 0, py: isMobile ? 2 : 0 }}>
      {/* Generation */}
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

      {/* Series */}
      <FilterSection title="Series">
        <FormGroup>
          {(showMoreSeries ? SERIES_LIST : SERIES_LIST.slice(0, 8)).map((series) => (
            <FormControlLabel
              key={series}
              control={
                <Checkbox
                  checked={selectedSeries.includes(series)}
                  onChange={() => toggleArrayFilter(series, setSelectedSeries)}
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
                    color: selectedSeries.includes(series) ? 'text.primary' : 'text.secondary',
                    transition: 'color 0.2s',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: { xs: '100%', md: 140, lg: 160 },
                  }}
                >
                  {series}
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
        {SERIES_LIST.length > 8 && (
          <Button
            onClick={() => setShowMoreSeries(!showMoreSeries)}
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
            {showMoreSeries ? 'Show less' : `Show more (${SERIES_LIST.length - 8})`}
          </Button>
        )}
      </FilterSection>

      {/* Characters */}
      <FilterSection title="Character" defaultOpen={false}>
        <FormGroup>
          {(showMoreCharacters ? CHARACTERS : CHARACTERS.slice(0, 8)).map((char) => (
            <FormControlLabel
              key={char}
              control={
                <Checkbox
                  checked={selectedCharacters.includes(char)}
                  onChange={() => toggleArrayFilter(char, setSelectedCharacters)}
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
                    color: selectedCharacters.includes(char) ? 'text.primary' : 'text.secondary',
                    transition: 'color 0.2s',
                  }}
                >
                  {char}
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
        {CHARACTERS.length > 8 && (
          <Button
            onClick={() => setShowMoreCharacters(!showMoreCharacters)}
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
            {showMoreCharacters ? 'Show less' : `Show more (${CHARACTERS.length - 8})`}
          </Button>
        )}
      </FilterSection>

      {/* Release Type */}
      <FilterSection title="Release Type" defaultOpen={false}>
        <FormGroup>
          {(showMoreReleaseTypes ? RELEASE_TYPE_LIST : RELEASE_TYPE_LIST.slice(0, 8)).map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={selectedReleaseTypes.includes(type)}
                  onChange={() => toggleArrayFilter(type, setSelectedReleaseTypes)}
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
                    color: selectedReleaseTypes.includes(type) ? 'text.primary' : 'text.secondary',
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
        {RELEASE_TYPE_LIST.length > 8 && (
          <Button
            onClick={() => setShowMoreReleaseTypes(!showMoreReleaseTypes)}
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
            {showMoreReleaseTypes ? 'Show less' : `Show more (${RELEASE_TYPE_LIST.length - 8})`}
          </Button>
        )}
      </FilterSection>

      {/* Rarity */}
      <FilterSection title="Rarity" defaultOpen={false}>
        <FormGroup>
          {(showMoreRarities ? RELEASE_RARITIES : RELEASE_RARITIES.slice(0, 8)).map((rarity) => (
            <FormControlLabel
              key={rarity}
              control={
                <Checkbox
                  checked={selectedRarities.includes(rarity)}
                  onChange={() => toggleArrayFilter(rarity, setSelectedRarities)}
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
                    color: selectedRarities.includes(rarity) ? 'text.primary' : 'text.secondary',
                    transition: 'color 0.2s',
                  }}
                >
                  {rarity}
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
        {RELEASE_RARITIES.length > 8 && (
          <Button
            onClick={() => setShowMoreRarities(!showMoreRarities)}
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
            {showMoreRarities ? 'Show less' : `Show more (${RELEASE_RARITIES.length - 8})`}
          </Button>
        )}
      </FilterSection>

      {/* Tags */}
      <FilterSection title="Tags" defaultOpen={false}>
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
      mb: { xs: 1.5, sm: 1 },
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

    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 }, flex: { xs: 1, sm: 'none' } }}>
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
  <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
    {releases.map((release) => (
      <Grid size={{ xs: 6, sm: 4, md: 4, lg: 3 }} key={release.id}>
        <ReleaseCardCatalog release={release} />
      </Grid>
    ))}
  </Grid>
);

const EmptyResults: React.FC = () => (
  <Box sx={{ textAlign: 'center', py: { xs: 6, sm: 8 } }}>
    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
      No releases found
    </Typography>
    <Typography variant="body2" sx={{ color: '#6B7280', fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
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
// MAIN CATALOG COMPONENT
// ============================================

const ReleaseCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { ref: catalogRef, height: catalogHeight } = useElementHeight<HTMLDivElement>();

  // Filter state
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [selectedReleaseTypes, setSelectedReleaseTypes] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Show more state for each filter
  const [showMoreSeries, setShowMoreSeries] = useState(false);
  const [showMoreCharacters, setShowMoreCharacters] = useState(false);
  const [showMoreReleaseTypes, setShowMoreReleaseTypes] = useState(false);
  const [showMoreRarities, setShowMoreRarities] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);

  // Mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sort & pagination
  const [sortBy, setSortBy] = useState('releaseDate');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedGenerations,
    selectedSeries,
    selectedCharacters,
    selectedReleaseTypes,
    selectedRarities,
    selectedTags,
  ]);

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
    if (selectedGenerations.length > 0) count++;
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

      // Generation - if none selected, show all
      if (
        selectedGenerations.length > 0 &&
        (!release.generation || !selectedGenerations.includes(release.generation))
      ) {
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
    <Box
      sx={{
        minHeight: '100vh',
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
          showMoreSeries={showMoreSeries}
          showMoreCharacters={showMoreCharacters}
          showMoreReleaseTypes={showMoreReleaseTypes}
          showMoreRarities={showMoreRarities}
          showMoreTags={showMoreTags}
          setShowMoreSeries={setShowMoreSeries}
          setShowMoreCharacters={setShowMoreCharacters}
          setShowMoreReleaseTypes={setShowMoreReleaseTypes}
          setShowMoreRarities={setShowMoreRarities}
          setShowMoreTags={setShowMoreTags}
          catalogHeight={catalogHeight}
          isMobile={true}
          onClose={() => setMobileFiltersOpen(false)}
        />
      </Drawer>

      {/* Main Content */}
      <Box sx={{ display: 'flex', maxWidth: 1600, mx: 'auto', px: { xs: 1.5, sm: 2, md: 4 }, pt: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Left Sidebar - Desktop Filters */}
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
          showMoreSeries={showMoreSeries}
          showMoreCharacters={showMoreCharacters}
          showMoreReleaseTypes={showMoreReleaseTypes}
          showMoreRarities={showMoreRarities}
          showMoreTags={showMoreTags}
          setShowMoreSeries={setShowMoreSeries}
          setShowMoreCharacters={setShowMoreCharacters}
          setShowMoreReleaseTypes={setShowMoreReleaseTypes}
          setShowMoreRarities={setShowMoreRarities}
          setShowMoreTags={setShowMoreTags}
          catalogHeight={catalogHeight}
        />

        {/* Main Grid Area */}
        <Box ref={catalogRef} sx={{ flex: 1, p: { xs: 1, sm: 1.5, md: 2 } }}>
          <CatalogHeader />

          {/* Results Count & Sort */}
          <ResultsToolbar
            resultCount={filteredReleases.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onFiltersClick={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
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
