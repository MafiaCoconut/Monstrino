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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { characterMock } from '@/data/real-data/characterMock';
import { characterPetOwnershipMock } from '@/data/real-data/characterPetOwnershipMock';
import { petMock } from '@/data/real-data/petMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
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

const inferGeneration = (year?: number): Generation => {
  if (!year) return GENERATIONS[0];
  if (year >= 2022) return 'G3';
  if (year >= 2016) return 'G2';
  return 'G1';
};

const characterNameById = new Map<number, string>(
  characterMock.map((character) => [
    character.id,
    character.display_name ?? character.name,
  ])
);

const releaseById = new Map(releaseMock.map((release) => [release.id, release]));
const characterGenerations = new Map<number, Set<Generation>>();
releaseCharacterMock.forEach((link) => {
  const release = releaseById.get(link.release_id);
  if (!release) return;
  const generation = inferGeneration(release.year ?? undefined);
  const bucket = characterGenerations.get(link.character_id) ?? new Set<Generation>();
  bucket.add(generation);
  characterGenerations.set(link.character_id, bucket);
});

const ownershipByPetId = new Map<number, number[]>();
characterPetOwnershipMock.forEach((entry) => {
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

const petModels: Pet[] = petMock.map((pet) => {
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
  new Set(petModels.map((pet) => pet.ownerName).filter(Boolean))
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
// PET CARD COMPONENT
// ============================================

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const ownerName = pet.ownerName ?? 'Unknown';
  const generationLabel = pet.generation ?? 'Unknown';

  return (
    <Box
      component={RouterLink}
      to={`/catalog/p/${pet.id}`}
      aria-label={`${pet.name} pet`}
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
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '150%', // ~1:1.5 aspect ratio
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={pet.imageUrl}
          alt={pet.name}
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

      {/* Card Content */}
      <Box sx={{ p: 2 }}>
        {/* Pet Name */}
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
          {pet.name}
        </Typography>

        {/* Owner */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.85rem',
            mb: 1,
          }}
        >
          Owner: {ownerName}
        </Typography>

        {/* Species + Generation inline */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: '#6B7280', fontSize: '0.75rem' }}
          >
            {pet.species}
          </Typography>
          <Typography sx={{ color: '#4B5563' }}>•</Typography>
          <Chip
            label={generationLabel}
            size="small"
            sx={{
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              color: '#A78BFA',
              fontSize: '0.6rem',
              height: '18px',
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// ============================================
// WIDGET COMPONENTS
// ============================================

interface CatalogHeaderProps {
  totalPets: number;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({ totalPets }) => (
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
        Pets Catalog
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {totalPets} pets in the archive
      </Typography>
    </Box>
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
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
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

    {/* Owner */}
    <FilterSection title="Owner">
      <FormGroup>
        {OWNERS.map((owner) => (
          <FormControlLabel
            key={owner}
            control={
              <Checkbox
                checked={selectedOwners.includes(owner)}
                onChange={() => toggleArrayFilter(owner, selectedOwners, setSelectedOwners)}
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
                {owner}
              </Typography>
            }
            sx={{ mb: -0.5 }}
          />
        ))}
      </FormGroup>
    </FilterSection>

    {/* Species */}
    <FilterSection title="Species" defaultOpen={false}>
      <FormGroup>
        {PET_SPECIES.map((species) => (
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
  <Grid container spacing={2.5}>
    {pets.map((pet) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pet.id}>
        <PetCard pet={pet} />
      </Grid>
    ))}
  </Grid>
);

const EmptyResults: React.FC = () => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
      No pets found
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
// MAIN PETS CATALOG COMPONENT
// ============================================

const PetsCatalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // Filter state
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([...GENERATIONS]);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);

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
    setSelectedOwners([]);
    setSelectedSpecies([]);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedGenerations.length !== GENERATIONS.length) count++;
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

      // Generation
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
    <Box>
      <CatalogHeader totalPets={petModels.length} />

      {/* Main Content */}
      <Box sx={{ display: 'flex', maxWidth: 1600, mx: 'auto' }}>
        {/* Left Sidebar - Filters */}
           {/* </Typography> */}
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
        />

        {/* Main Grid Area */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Results Count & Sort */}
          <ResultsToolbar
            resultCount={filteredPets.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
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
