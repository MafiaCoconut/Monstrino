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
import { characterPetOwnershipMock } from '@/data/real-data/characterPetOwnershipMock';
import { petMock } from '@/data/real-data/petMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { useElementHeight } from './useElementHeight';
import { PetCardCatalog } from '../components/pet-card';
import { releaseMock } from '@/data/real-data/releaseMock';
import { GENERATIONS, type Generation, type Pet, type PetId } from '../entities';

// ============================================
// DATA TRANSFORMATION (mock -> pet models)
// ============================================

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const DEFAULT_SPECIES = 'Companion';

const SPECIES_OVERRIDES = new Map<string, string>([
  ['count fabulous', 'Bat'],
  ['watzit', 'Dog'],
  ['watzie', 'Dog'],
  ['crescent', 'Cat'],
  ['hissette', 'Snake'],
  ['hisette', 'Snake'],
  ['neptuna', 'Piranha'],
  ['sir hoots-a-lot', 'Owl'],
  ['sir hoots a lot', 'Owl'],
  ['rhuen', 'Ghost Ferret'],
  ['shiver', 'Mammoth'],
  ['memphis', 'Scarab'],
  ['webby', 'Spider'],
]);

const toPetId = (value: string | number): PetId => `${value}` as PetId;

const normalizeName = (value: string) => value.trim().toLowerCase();

type CharacterMockRecord = {
  id: number;
  name: string;
  display_name?: string | null;
};

type ReleaseMockRecord = {
  id: number;
  year?: number | null;
};

type ReleaseCharacterMockRecord = {
  release_id: number;
  character_id: number;
};

type CharacterPetOwnershipMockRecord = {
  pet_id: number;
  character_id: number;
};

type PetMockRecord = {
  id: number;
  name: string;
  display_name?: string | null;
  primary_image?: string | null;
};

const characterMockData: ReadonlyArray<CharacterMockRecord> = characterMock;
const releaseMockData: ReadonlyArray<ReleaseMockRecord> = releaseMock;
const releaseCharacterData: ReadonlyArray<ReleaseCharacterMockRecord> = releaseCharacterMock;
const petOwnershipData: ReadonlyArray<CharacterPetOwnershipMockRecord> = characterPetOwnershipMock;
const petMockData: ReadonlyArray<PetMockRecord> = petMock;

const inferGeneration = (year?: number): Generation => {
  if (!year) return GENERATIONS[0];
  if (year >= 2022) return 'G3';
  if (year >= 2016) return 'G2';
  return 'G1';
};

const characterNameById = new Map<number, string>(
  characterMockData.map((character) => [
    character.id,
    character.display_name ?? character.name,
  ])
);

const releaseById = new Map<number, ReleaseMockRecord>(
  releaseMockData.map((release) => [release.id, release])
);
const characterGenerations = new Map<number, Set<Generation>>();
releaseCharacterData.forEach((link) => {
  const release = releaseById.get(link.release_id);
  if (!release) return;
  const generation = inferGeneration(release.year ?? undefined);
  const bucket = characterGenerations.get(link.character_id) ?? new Set<Generation>();
  bucket.add(generation);
  characterGenerations.set(link.character_id, bucket);
});

const ownershipByPetId = new Map<number, number[]>();
petOwnershipData.forEach((entry) => {
  const owners = ownershipByPetId.get(entry.pet_id) ?? [];
  owners.push(entry.character_id);
  ownershipByPetId.set(entry.pet_id, owners);
});

const pickGeneration = (owners: number[]): Generation | undefined => {
  const genOrder: Generation[] = ['G1', 'G2', 'G3'];
  const generations = owners.flatMap((ownerId) =>
    Array.from(characterGenerations.get(ownerId) ?? [])
  );
  if (generations.length === 0) return undefined;
  return generations.sort((a, b) => genOrder.indexOf(a) - genOrder.indexOf(b))[0];
};

const petModels: Pet[] = petMockData.map((pet) => {
  const ownerIds = ownershipByPetId.get(pet.id) ?? [];
  const ownerNames = ownerIds
    .map((ownerId) => characterNameById.get(ownerId))
    .filter(Boolean) as string[];
  const ownerName = ownerNames[0] ?? 'Unknown';
  const generation = pickGeneration(ownerIds) ?? GENERATIONS[0];
  const normalized = normalizeName(pet.name);
  const species = SPECIES_OVERRIDES.get(normalized) ?? DEFAULT_SPECIES;

  return {
    id: toPetId(pet.id),
    name: pet.display_name ?? pet.name,
    species,
    generation,
    imageUrl: pet.primary_image ?? PLACEHOLDER_IMAGE,
    ownerName,
    owners: ownerIds.map((ownerId) => ({
      id: `${ownerId}`,
      name: characterNameById.get(ownerId) ?? 'Unknown',
      role: 'primary',
    })),
  };
});

const OWNERS = Array.from(
  new Set(petModels.map((pet) => pet.ownerName).filter((owner): owner is string => Boolean(owner)))
).sort();
const PET_SPECIES = Array.from(new Set(petModels.map((pet) => pet.species))).sort();

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
      Pets Catalog
    </Typography>
    {/* <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        fontSize: { xs: '0.8125rem', sm: '0.875rem' }
      }}
    >
      {totalPets} pets in the archive
    </Typography> */}
  </Box>
);

interface FiltersSidebarProps {
  activeFilterCount: number;
  clearAllFilters: () => void;
  selectedGenerations: string[];
  selectedOwners: string[];
  selectedSpecies: string[];
  setSelectedGenerations: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedOwners: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSpecies: React.Dispatch<React.SetStateAction<string[]>>;
  toggleArrayFilter: (
    value: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  showMoreOwners: boolean;
  showMoreSpecies: boolean;
  setShowMoreOwners: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMoreSpecies: React.Dispatch<React.SetStateAction<boolean>>;
  catalogHeight?: number | null;
  isMobile?: boolean;
  onClose?: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  activeFilterCount,
  clearAllFilters,
  selectedGenerations,
  selectedOwners,
  selectedSpecies,
  setSelectedGenerations,
  setSelectedOwners,
  setSelectedSpecies,
  toggleArrayFilter,
  showMoreOwners,
  showMoreSpecies,
  setShowMoreOwners,
  setShowMoreSpecies,
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

      <FilterSection title="Owner">
        <FormGroup>
          {(showMoreOwners ? OWNERS : OWNERS.slice(0, 8)).map((owner) => (
            <FormControlLabel
              key={owner}
              control={
                <Checkbox
                  checked={selectedOwners.includes(owner)}
                  onChange={() => toggleArrayFilter(owner, setSelectedOwners)}
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
                    color: selectedOwners.includes(owner) ? 'text.primary' : 'text.secondary',
                    transition: 'color 0.2s',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 160,
                  }}
                >
                  {owner}
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
        {OWNERS.length > 8 && (
          <Button
            onClick={() => setShowMoreOwners(!showMoreOwners)}
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
            {showMoreOwners ? 'Show less' : `Show more (${OWNERS.length - 8})`}
          </Button>
        )}
      </FilterSection>

      <FilterSection title="Species">
        <FormGroup>
          {(showMoreSpecies ? PET_SPECIES : PET_SPECIES.slice(0, 8)).map((species) => (
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
        {PET_SPECIES.length > 8 && (
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
            {showMoreSpecies ? 'Show less' : `Show more (${PET_SPECIES.length - 8})`}
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
        <MenuItem value="owner">Owner</MenuItem>
        <MenuItem value="species">Species</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

interface PetGridProps {
  pets: Pet[];
}

const PetGrid: React.FC<PetGridProps> = ({ pets }) => (
  <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
    {pets.map((pet) => (
      <Grid size={{ xs: 6, sm: 4, md: 4, lg: 3 }} key={pet.id}>
        <PetCardCatalog pet={pet} />
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
      No pets found
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
// MAIN PETS CATALOG COMPONENT
// ============================================

const PetsCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { ref: catalogRef, height: catalogHeight } = useElementHeight<HTMLDivElement>();

  // Filter state
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);

  // Show more state for each filter
  const [showMoreOwners, setShowMoreOwners] = useState(false);
  const [showMoreSpecies, setShowMoreSpecies] = useState(false);

  // Mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sort & pagination
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset page to 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenerations, selectedOwners, selectedSpecies]);

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
    setSelectedOwners([]);
    setSelectedSpecies([]);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenerations.length > 0) count++;
    if (selectedOwners.length > 0) count++;
    if (selectedSpecies.length > 0) count++;
    if (searchQuery) count++;
    return count;
  }, [selectedGenerations, selectedOwners, selectedSpecies, searchQuery]);

  // Filter & sort pets
  const filteredPets = useMemo(() => {
    let results = petModels.filter((pet) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          pet.name.toLowerCase().includes(query) ||
          (pet.ownerName ?? '').toLowerCase().includes(query) ||
          pet.species.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Generation - if none selected, show all
      if (
        selectedGenerations.length > 0 &&
        (!pet.generation || !selectedGenerations.includes(pet.generation))
      ) {
        return false;
      }

      // Owner
      if (selectedOwners.length > 0 && !selectedOwners.includes(pet.ownerName ?? '')) {
        return false;
      }

      // Species
      if (selectedSpecies.length > 0 && !selectedSpecies.includes(pet.species)) {
        return false;
      }

      return true;
    });

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'owner':
          return (a.ownerName ?? '').localeCompare(b.ownerName ?? '');
        case 'species':
          return a.species.localeCompare(b.species);
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, selectedGenerations, selectedOwners, selectedSpecies, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
  const paginatedPets = filteredPets.slice(
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
          selectedOwners={selectedOwners}
          selectedSpecies={selectedSpecies}
          setSelectedGenerations={setSelectedGenerations}
          setSelectedOwners={setSelectedOwners}
          setSelectedSpecies={setSelectedSpecies}
          toggleArrayFilter={toggleArrayFilter}
          showMoreOwners={showMoreOwners}
          showMoreSpecies={showMoreSpecies}
          setShowMoreOwners={setShowMoreOwners}
          setShowMoreSpecies={setShowMoreSpecies}
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
          selectedOwners={selectedOwners}
          selectedSpecies={selectedSpecies}
          setSelectedGenerations={setSelectedGenerations}
          setSelectedOwners={setSelectedOwners}
          setSelectedSpecies={setSelectedSpecies}
          toggleArrayFilter={toggleArrayFilter}
          showMoreOwners={showMoreOwners}
          showMoreSpecies={showMoreSpecies}
          setShowMoreOwners={setShowMoreOwners}
          setShowMoreSpecies={setShowMoreSpecies}
          catalogHeight={catalogHeight}
        />

        <Box ref={catalogRef} sx={{ flex: 1, p: { xs: 1, sm: 1.5, md: 2 } }}>
          <CatalogHeader />

          <ResultsToolbar
            resultCount={filteredPets.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onFiltersClick={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          {/* Pet Grid */}
          <PetGrid pets={paginatedPets} />

          {/* Empty State */}
          {filteredPets.length === 0 && <EmptyResults />}

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

export default PetsCatalog;
