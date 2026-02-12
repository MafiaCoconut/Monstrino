// @ts-nocheck
import type { Pet, PetExclusivity, PetId, PetRarity } from '@/release-hub/entities';
import { characterMock } from '@/data/real-data/characterMock';
import { characterPetOwnershipMock } from '@/data/real-data/characterPetOwnershipMock';
import { petMock } from '@/data/real-data/petMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { releasePetMock } from '@/data/real-data/releasePetMock';

const PLACEHOLDER_IMAGE = '/placeholder.svg';
const DEFAULT_SPECIES = 'Companion';

const SPECIES_OVERRIDES = new Map<string, string>([
  ['count fabulous', 'Vampire Bat'],
  ['crescent', 'Cat'],
  ['hissette', 'Snake'],
  ['hisette', 'Snake'],
  ['neptuna', 'Piranha'],
  ['sir hoots-a-lot', 'Owl'],
  ['sir hoots a lot', 'Owl'],
  ['shiver', 'Mammoth'],
  ['memphis', 'Scarab'],
  ['dustin', 'Dust Bunny'],
  ['chewlian', 'Venus Flytrap'],
]);

const toPetId = (value: string | number): PetId => `${value}` as PetId;

const normalizeName = (value: string) => value.trim().toLowerCase();

const groupByPetId = <T extends { pet_id: number }>(items: T[]) => {
  const map = new Map<number, T[]>();
  for (const item of items) {
    const list = map.get(item.pet_id) ?? [];
    list.push(item);
    map.set(item.pet_id, list);
  }
  return map;
};

type PetRecord = (typeof petMock)[number];
type ReleaseRecord = (typeof releaseMock)[number];
type CharacterRecord = (typeof characterMock)[number];

type OwnershipRecord = (typeof characterPetOwnershipMock)[number];
type PetReleaseRecord = (typeof releasePetMock)[number];

const characterById = new Map<number, CharacterRecord>(
  characterMock.map((character) => [character.id, character])
);
const releaseById = new Map<number, ReleaseRecord>(
  releaseMock.map((release) => [release.id, release])
);

const ownershipByPetId = groupByPetId(characterPetOwnershipMock as OwnershipRecord[]);
const releasesByPetId = groupByPetId(releasePetMock as PetReleaseRecord[]);

const inferSpecies = (pet: PetRecord): string => {
  const normalized = normalizeName(pet.display_name ?? pet.name ?? '');
  const override = SPECIES_OVERRIDES.get(normalized);
  if (override) return override;

  const description = pet.description ?? '';
  const match = description.match(/\bis an? ([^.,\n]+?)(?:\.|,| and| who| that| with|$)/i);
  if (match?.[1]) {
    return match[1].trim().replace(/^the\s+/i, '');
  }

  return DEFAULT_SPECIES;
};

const truncate = (value: string, max = 60): string => {
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 3))}...`;
};

const buildRarity = (releaseCount: number): PetRarity => {
  if (releaseCount <= 1) return 'exclusive';
  if (releaseCount <= 2) return 'rare';
  if (releaseCount <= 4) return 'common';
  return 'common';
};

const buildExclusivity = (ownerCount: number, releaseCount: number): PetExclusivity => {
  if (ownerCount > 1) return 'shared';
  if (releaseCount <= 1) return 'limited';
  return 'exclusive';
};

const buildExclusivityNote = (exclusivity: PetExclusivity, owners: string[], releaseCount: number): string => {
  if (exclusivity === 'exclusive') {
    return owners.length > 0
      ? `Exclusive companion to ${owners[0]}`
      : 'Exclusive companion featured in select releases';
  }
  if (exclusivity === 'limited') {
    return `Limited appearance across ${releaseCount} release${releaseCount === 1 ? '' : 's'}`;
  }
  return owners.length > 1
    ? `Shared across ${owners.length} owners in the collection`
    : 'Shared companion across multiple releases';
};

const buildOfficialImages = (imageUrl: string | null | undefined): string[] => {
  const safeUrl = imageUrl ?? PLACEHOLDER_IMAGE;
  return [safeUrl];
};

const buildFanArt = (pet: PetRecord) => {
  const baseId = pet.name ?? pet.id;
  return [
    { id: `${baseId}-fan-1`, artist: 'GhoulArtist' },
    { id: `${baseId}-fan-2`, artist: 'MonsterFan' },
    { id: `${baseId}-fan-3` },
  ];
};

const buildPet = (pet: PetRecord): Pet => {
  const ownership = ownershipByPetId.get(pet.id) ?? [];
  const ownerIds = ownership.map((entry) => entry.character_id);
  const owners = ownerIds
    .map((ownerId, index) => {
      const owner = characterById.get(ownerId);
      if (!owner) return null;
      return {
        id: `${ownerId}`,
        name: owner.display_name ?? owner.name,
        role: index === 0 ? 'primary' : 'shared',
        imageUrl: owner.primary_image ?? undefined,
      } as const;
    })
    .filter((owner): owner is NonNullable<typeof owner> => Boolean(owner));

  const ownerNames = owners.map((owner) => owner.name);

  const releaseLinks = releasesByPetId.get(pet.id) ?? [];
  const releases = releaseLinks
    .map((link) => releaseById.get(link.release_id))
    .filter((release): release is ReleaseRecord => Boolean(release))
    .map((release) => ({
      id: `${release.id}`,
      name: release.display_name ?? release.name ?? 'Release',
      year: release.year ?? undefined,
    }))
    .sort((a, b) => (a.year ?? 0) - (b.year ?? 0));

  const releaseCount = releases.length;
  const species = inferSpecies(pet);
  const subtype = species !== DEFAULT_SPECIES ? species : undefined;
  const type = 'Pet';

  const rarity = buildRarity(releaseCount);
  const exclusivity = buildExclusivity(owners.length, releaseCount);
  const exclusivityNote = buildExclusivityNote(exclusivity, ownerNames, releaseCount);

  const description = pet.description ??
    `${pet.display_name ?? pet.name} is a companion known throughout Monster High.`;

  const imageUrl = pet.primary_image ?? PLACEHOLDER_IMAGE;

  const facts = [
    {
      label: 'First Appearance',
      value: releases[0]
        ? `${releases[0].name}${releases[0].year ? ` (${releases[0].year})` : ''}`
        : 'Unknown',
    },
    { label: 'Species', value: species },
    { label: 'Owner', value: ownerNames[0] ?? 'Unknown' },
    { label: 'Release Count', value: `${releaseCount || 1}` },
  ];

  return {
    id: toPetId(pet.id),
    name: pet.display_name ?? pet.name,
    species,
    imageUrl,
    ownerName: ownerNames[0],
    ownerImageUrl: owners[0]?.id
      ? characterById.get(Number(owners[0].id))?.primary_image ?? undefined
      : undefined,
    type,
    subtype,
    rarity,
    exclusivity,
    exclusivityNote,
    owners,
    releases,
    description,
    facts,
    officialImages: buildOfficialImages(pet.primary_image),
    fanArt: buildFanArt(pet),
  };
};

const petIndexByNumericId = new Map<string, Pet>();
export const petIndexMock: Pet[] = petMock.map((pet) => {
  const model = buildPet(pet);
  petIndexByNumericId.set(`${pet.id}`, model);
  return model;
});

export { petIndexByNumericId };
