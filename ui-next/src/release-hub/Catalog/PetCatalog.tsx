'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from '@/shared/router';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Chip,
  Button,
  Grid,
} from '@mui/material';
import { characterMock } from '@/data/real-data/characterMock';
import { characterPetOwnershipMock } from '@/data/real-data/characterPetOwnershipMock';
import { petMock } from '@/data/real-data/petMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { useElementHeight } from './useElementHeight';
import { PetCardCatalog } from '@cards/pet-card';
import { releaseMock } from '@/data/real-data/releaseMock';
import { GENERATIONS, type Generation, type Pet, type PetId } from '../entities';
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
// WIDGET COMPONENTS
// ============================================

const CATALOG_SORT_OPTIONS: CatalogSortOption[] = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'owner', label: 'Owner' },
  { value: 'species', label: 'Species' },
];

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
  </CatalogFiltersShell>
);

interface PetGridProps {
  pets: Pet[];
}

const petCatalogCardLayout = {
  cardSx: { height: '100%', maxWidth: 320, margin: '0 auto' },
  imageSx: { paddingTop: { xs: '145%', sm: '140%' } },
  contentSx: { p: { xs: 1.5, md: 2 } },
};

const PetGrid: React.FC<PetGridProps> = ({ pets }) => (
  <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
    {pets.map((pet) => (
      <Grid size={{ xs: 6, sm: 4, md: 4, lg: 3 }} key={pet.id}>
        <PetCardCatalog
          pet={pet}
          cardSx={petCatalogCardLayout.cardSx}
          imageSx={petCatalogCardLayout.imageSx}
          contentSx={petCatalogCardLayout.contentSx}
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
    <CatalogPage minHeight="100vh">
      <CatalogFiltersDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
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
      </CatalogFiltersDrawer>

      <CatalogLayout
        sidebar={
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
        }
      >
        <Box ref={catalogRef} sx={{ flex: 1, p: { xs: 1, sm: 1.5, md: 2 } }}>
          <CatalogHeader title="Pets Catalog" />

          <CatalogResultsToolbar
            resultCount={filteredPets.length}
            sortBy={sortBy}
            sortOptions={CATALOG_SORT_OPTIONS}
            onSortChange={setSortBy}
            onFiltersClick={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          <PetGrid pets={paginatedPets} />

          {filteredPets.length === 0 && <EmptyResults />}

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

export default PetsCatalog;
