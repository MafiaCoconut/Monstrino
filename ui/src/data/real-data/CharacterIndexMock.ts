import { characterMock } from "@/data/real-data/characterMock";
import { characterPetOwnershipMock } from "@/data/real-data/characterPetOwnershipMock";
import { petMock } from "@/data/real-data/petMock";
import { releaseCharacterMock } from "@/data/real-data/releaseCharacterMock";
import { releaseImageMock } from "@/data/real-data/releaseImageMock";
import { releaseMock } from "@/data/real-data/releaseMock";
import { releaseSeriesLinkMock } from "@/data/real-data/releaseSeriesLinkMock";
import { seriesMock } from "@/data/real-data/seriesMock";
import type { CharacterId } from "@/pages/release-hub/entities";
import type { CharacterIndexData } from "@/pages/release-hub/entities/character-index";

const baseCharacterIndexMock: CharacterIndexData = {
  id: "draculaura" as CharacterId,
  name: "Draculaura",
  alternativeNames: ["Ula D", "Draculoura (FR)", "ドラキュローラ (JP)"],
  tagline: "Fangtastic fashionista with a heart of gold",
  generations: ["G1", "G2", "G3"],
  species: "Vampire",
  age: "1,600 years old (looks 16)",
  birthday: "February 14th (Valentine's Day)",
  debutYear: 2025,
  releaseCount: 47,
  signatureColors: ["Pink", "Black", "White"],
  motifs: ["Hearts", "Bats", "Polka Dots"],
  heroImage: "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
  officialDescription:
    "Draculaura is the adopted daughter of Count Dracula and one of the most beloved ghouls at Monster High. Despite being a vampire, she's a strict vegan who faints at the sight of blood. Her bright personality and love for the color pink make her stand out in any crowd.",
  biography:
    "Born in the Carpathian Mountains over 1,600 years ago, Draculaura has witnessed countless eras of monster and normie history. She was adopted by Dracula when she was just a young vampire, and he has been her loving father ever since.\n\nShe transferred to Monster High in 2010 and quickly became one of the school's most popular students. Her optimistic outlook and genuine kindness have helped bridge gaps between different monster species. \n\nDraculaura is passionate about fashion, romance novels, and spreading positivity. She runs a popular blog called \"Party Planning with Draculaura\" and dreams of one day opening her own freaky-fab fashion boutique.",
  easterEggs: [
    { icon: "💕", text: "Her birthday on Valentine's Day reflects her romantic and loving nature" },
    { icon: "🦇", text: "The name 'Draculaura' is a portmanteau of 'Dracula' and 'Laura'" },
    { icon: "🩸", text: "Being a vegetarian vampire is inspired by classic comedy tropes" },
  ],
  releases: [
    {
      id: 1,
      name: "Basic Draculaura",
      year: 2010,
      series: "Original Ghouls",
      edition: "main",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=280&fit=crop",
    },
    {
      id: 2,
      name: "Dawn of the Dance",
      year: 2010,
      series: "Dawn of the Dance",
      edition: "main",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=280&fit=crop",
    },
    {
      id: 3,
      name: "Gloom Beach",
      year: 2011,
      series: "Gloom Beach",
      edition: "main",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=280&fit=crop",
    },
    {
      id: 4,
      name: "Sweet 1600",
      year: 2011,
      series: "Sweet 1600",
      edition: "special",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=280&fit=crop",
    },
    {
      id: 5,
      name: "Scaris City of Frights",
      year: 2012,
      series: "Scaris",
      edition: "main",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=280&fit=crop",
    },
    {
      id: 6,
      name: "SDCC Exclusive",
      year: 2013,
      series: "San Diego Comic-Con",
      edition: "special",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=280&fit=crop",
    },
    {
      id: 7,
      name: "Haunt Couture",
      year: 2022,
      series: "Collector",
      edition: "special",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=280&fit=crop",
    },
    {
      id: 8,
      name: "Skullector Dracula",
      year: 2023,
      series: "Skullector",
      edition: "special",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=200&h=280&fit=crop",
    },
  ],
  variants: [
    { id: 1, name: "School Look", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=150&h=200&fit=crop" },
    { id: 2, name: "Party Outfit", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=200&fit=crop" },
    { id: 3, name: "Sleepover", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=150&h=200&fit=crop" },
    { id: 4, name: "Scaris Fashion", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=200&fit=crop" },
    { id: 5, name: "G3 Redesign", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=150&h=200&fit=crop" },
  ],
  relationships: {
    family: [{ name: "Count Dracula", role: "Father (Adoptive)", link: "#" }],
    friends: [
      { name: "Clawdeen Wolf", role: "Best Friend", link: "#" },
      { name: "Frankie Stein", role: "Best Friend", link: "#" },
      { name: "Cleo de Nile", role: "Close Friend", link: "#" },
      { name: "Lagoona Blue", role: "Friend", link: "#" },
    ],
    romantic: [
      { name: "Clawd Wolf", role: "Boyfriend (G1)", link: "#" },
      { name: "Valentine", role: "Ex-boyfriend", link: "#" },
    ],
    pets: [{ name: "Count Fabulous", species: "Bat", link: "/catalog/p/27", image: "/demo/pets/count-fabulous/main-image.png" }],
  },
  timeline: [
    { year: 2010, event: "First appearance in Monster High toy line and webisodes" },
    { year: 2010, event: "Featured in 'New Ghoul @ School' TV special" },
    { year: 2011, event: "Sweet 1600 special release celebrating her birthday" },
    { year: 2012, event: "Lead role in 'Ghouls Rule' movie" },
    { year: 2016, event: "G2 reboot with updated design" },
    { year: 2022, event: "G3 revival with new origin story" },
    { year: 2022, event: "Live-action movie casting announced" },
    { year: 2023, event: "Skullector collaboration with Dracula" },
  ],
  trivia: [
    {
      category: "Design",
      text: "Her signature pink and black color scheme was inspired by classic goth fashion mixed with preppy aesthetics.",
      source: "Garrett Sander, Lead Designer",
    },
    {
      category: "Cultural Reference",
      text: "The character draws inspiration from the daughter of Dracula trope popularized in various vampire media.",
    },
    {
      category: "Production",
      text: "Draculaura was one of the original 8 characters developed for the Monster High launch in 2010.",
    },
    {
      category: "Voice Acting",
      text: "She has been voiced by multiple actresses including Debi Derryberry and Cassie Simone.",
    },
  ],
  communityContent: [
    { type: "Fan Art", title: "Gothic Princess Collection", count: 2340, link: "#" },
    { type: "Cosplay", title: "Convention Highlights", count: 156, link: "#" },
    { type: "OOAK/Repaint", title: "Custom Creations", count: 892, link: "#" },
    { type: "Reroot", title: "Hair Transformations", count: 234, link: "#" },
  ],
};

const replaceName = (value: string, from: string, to: string) => value.replace(from, to);

const buildMock = (overrides: Partial<CharacterIndexData>): CharacterIndexData => ({
  ...baseCharacterIndexMock,
  ...overrides,
  alternativeNames: overrides.alternativeNames ?? baseCharacterIndexMock.alternativeNames,
  generations: overrides.generations ?? baseCharacterIndexMock.generations,
  signatureColors: overrides.signatureColors ?? baseCharacterIndexMock.signatureColors,
  motifs: overrides.motifs ?? baseCharacterIndexMock.motifs,
  easterEggs: overrides.easterEggs ?? baseCharacterIndexMock.easterEggs,
  releases: overrides.releases ?? baseCharacterIndexMock.releases,
  variants: overrides.variants ?? baseCharacterIndexMock.variants,
  relationships: overrides.relationships ?? baseCharacterIndexMock.relationships,
  timeline: overrides.timeline ?? baseCharacterIndexMock.timeline,
  trivia: overrides.trivia ?? baseCharacterIndexMock.trivia,
  communityContent: overrides.communityContent ?? baseCharacterIndexMock.communityContent,
});

type CharacterRecord = (typeof characterMock)[number];

const characterRecordBySlug = new Map<string, CharacterRecord>(
  characterMock.map((record) => [record.name, record])
);

type ReleaseRecord = (typeof releaseMock)[number];
type ReleaseCharacterRecord = (typeof releaseCharacterMock)[number];
type ReleaseImageRecord = (typeof releaseImageMock)[number];
type ReleaseSeriesLinkRecord = (typeof releaseSeriesLinkMock)[number];
type SeriesRecord = (typeof seriesMock)[number];

const releaseById = new Map<number, ReleaseRecord>(releaseMock.map((record) => [record.id, record]));
const seriesById = new Map<number, SeriesRecord>(seriesMock.map((record) => [record.id, record]));

const groupByReleaseId = <T extends { release_id: number }>(items: T[]) => {
  const map = new Map<number, T[]>();
  items.forEach((item) => {
    const list = map.get(item.release_id) ?? [];
    list.push(item);
    map.set(item.release_id, list);
  });
  return map;
};

const releaseCharactersByReleaseId = groupByReleaseId(releaseCharacterMock);

type PetRecord = (typeof petMock)[number];
type CharacterPetOwnershipRecord = (typeof characterPetOwnershipMock)[number];

const petById = new Map<number, PetRecord>(petMock.map((record) => [record.id, record]));

const extractPetSpecies = (description: string | null): string => {
  if (!description) return "Pet";
  
  // Common pet types to look for
  const patterns = [
    /is a ([a-z\s]+) (?:and|that|with|who|adorned)/i,
    /is a ([a-z\s]+)\./i,
    /is an? ([a-z\s]+) (?:and|that|with|who|adorned)/i,
  ];
  
  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      const species = match[1].trim();
      // Capitalize first letter
      return species.charAt(0).toUpperCase() + species.slice(1);
    }
  }
  
  return "Pet";
};

const buildPetsForCharacter = (characterId: number): CharacterIndexData["relationships"]["pets"] => {
  const petOwnerships = characterPetOwnershipMock.filter((link: CharacterPetOwnershipRecord) => link.character_id === characterId);
  
  return petOwnerships
    .map((ownership) => {
      const pet = petById.get(ownership.pet_id);
      if (!pet) return null;
      
      const displayName = pet.display_name ?? toTitleCase(pet.name);
      const species = extractPetSpecies(pet.description);
      
      return {
        name: displayName,
        species,
        link: `/catalog/p/${pet.id}`,
        image: pet.primary_image ?? undefined,
      };
    })
    .filter(Boolean) as CharacterIndexData["relationships"]["pets"];
};
const releaseImagesByReleaseId = groupByReleaseId(releaseImageMock);
const releaseSeriesByReleaseId = groupByReleaseId(releaseSeriesLinkMock);

const getReleaseImage = (releaseId: number) => {
  const images = releaseImagesByReleaseId.get(releaseId) ?? [];
  const primary = images.find((image) => image.is_primary);
  return primary?.image_url ?? images[0]?.image_url;
};

const getReleaseSeriesName = (releaseId: number) => {
  const links = releaseSeriesByReleaseId.get(releaseId) ?? [];
  const first = links[0];
  if (!first) return "Unknown";
  return seriesById.get(first.series_id)?.display_name ?? "Unknown";
};

const inferEdition = (releaseName: string, seriesName: string): "main" | "special" => {
  const text = `${releaseName} ${seriesName}`.toLowerCase();
  if (
    text.includes("skullector") ||
    text.includes("sdcc") ||
    text.includes("comic-con") ||
    text.includes("collector") ||
    text.includes("haunt couture") ||
    text.includes("exclusive")
  ) {
    return "special";
  }
  return "main";
};

const buildReleasesForCharacter = (characterId: number) => {
  const releaseIds = new Set<number>();
  releaseCharacterMock.forEach((link: ReleaseCharacterRecord) => {
    if (link.character_id === characterId) {
      releaseIds.add(link.release_id);
    }
  });

  const releases = Array.from(releaseIds)
    .map((releaseId) => {
      const release = releaseById.get(releaseId);
      if (!release) return null;
      const seriesName = getReleaseSeriesName(releaseId);
      const displayName = release.display_name ?? release.name;
      const imageUrl = getReleaseImage(releaseId);
      return {
        id: releaseId,
        name: displayName,
        year: release.year ?? parseYearFromDate(release.created_at) ?? baseCharacterIndexMock.debutYear,
        series: seriesName,
        edition: inferEdition(displayName, seriesName),
        image: imageUrl ?? baseCharacterIndexMock.heroImage,
      };
    })
    .filter(Boolean) as CharacterIndexData["releases"];

  return releases.sort((a, b) => a.year - b.year);
};

const toTitleCase = (value: string) =>
  value
    .split(/[\s-]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const parseYearFromDate = (value?: string | null) => {
  if (!value) return undefined;
  const year = Number.parseInt(value.slice(0, 4), 10);
  return Number.isNaN(year) ? undefined : year;
};

const buildFallback = (record: CharacterRecord): CharacterIndexData => {
  const displayName = record.display_name ?? toTitleCase(record.name);
  const debutYear = parseYearFromDate(record.created_at) ?? baseCharacterIndexMock.debutYear;
  const description = record.description ?? "Biography is still being curated.";
  const releases = buildReleasesForCharacter(record.id);
  const pets = buildPetsForCharacter(record.id);

  return {
    ...baseCharacterIndexMock,
    id: record.name as CharacterId,
    name: displayName,
    alternativeNames: record.alt_names ? [record.alt_names] : [],
    tagline: "Character profile in progress",
    species: record.gender ? record.gender.charAt(0).toUpperCase() + record.gender.slice(1) : baseCharacterIndexMock.species,
    age: "Unknown",
    birthday: "Unknown",
    debutYear,
    releaseCount: releases.length,
    heroImage: record.primary_image ?? baseCharacterIndexMock.heroImage,
    officialDescription: description,
    biography: description,
    easterEggs: [],
    releases,
    variants: [],
    relationships: {
      family: [],
      friends: [],
      romantic: [],
      pets,
    },
    timeline: [],
    trivia: [],
    communityContent: [],
  };
};

const frankieReleases = baseCharacterIndexMock.releases.map((release) => ({
  ...release,
  name: replaceName(release.name, "Draculaura", "Frankie Stein"),
}));

const frankieVariants = baseCharacterIndexMock.variants.map((variant) => ({
  ...variant,
  name: replaceName(variant.name, "G3 Redesign", "G3 Volt Look"),
}));

export const characterIndexMocks: CharacterIndexData[] = [
  baseCharacterIndexMock,
  buildMock({
    id: "frankie-stein" as CharacterId,
    name: "Frankie Stein",
    alternativeNames: ["Frankie", "フランキー (JP)"],
    tagline: "Electric style icon stitched with optimism",
    species: "Frankenstein",
    age: "16 days old (forever 15)",
    birthday: "June 18th",
    debutYear: 2010,
    releaseCount: 45,
    signatureColors: ["Blue", "Black", "White"],
    motifs: ["Lightning Bolts", "Stitches", "Plaid"],
    heroImage: "/demo/releases/2025/scullector-frankie-barbie/main-image.png",
    officialDescription:
      "Frankie Stein is the daughter of Frankenstein's monster, a curious and kind-hearted ghoul who embraces her unique look with electric confidence.",
    biography:
      "Awakened in a flash of lightning, Frankie Stein arrived at Monster High full of questions, optimism, and a knack for making new friends.\n\nHer stitched-together style and bold experiments in fashion make her one of the most recognizable faces of the school.",
    easterEggs: [
      { icon: "⚡", text: "Frankie's bolts power their signature electric personality" },
      { icon: "🧵", text: "Their patchwork look nods to classic Frankenstein lore" },
    ],
    releases: frankieReleases,
    variants: frankieVariants,
    relationships: {
      family: [{ name: "Viktor Stein", role: "Father (Creator)", link: "#" }],
      friends: [
        { name: "Draculaura", role: "Best Friend", link: "#" },
        { name: "Clawdeen Wolf", role: "Best Friend", link: "#" },
      ],
      romantic: [{ name: "Jackson Jekyll", role: "Boyfriend (G1)", link: "#" }],
      pets: [{ name: "Watzit", species: "Dog", link: "/catalog/p/43", image: "/demo/pets/watzit/main-image.png" }],
    },
    timeline: [
      { year: 2010, event: "First appearance in Monster High toy line and webisodes" },
      { year: 2011, event: "Introduced with signature lightning-charged fashion" },
      { year: 2016, event: "G2 reboot with refreshed style" },
      { year: 2022, event: "G3 revival with updated origin story" },
    ],
    trivia: [
      { category: "Design", text: "Frankie's blue palette is inspired by classic monster cinema." },
      { category: "Production", text: "Frankie was part of the original Monster High launch lineup." },
    ],
  }),
];

export const characterIndexMockById = (id?: string | null): CharacterIndexData => {
  if (!id) return characterIndexMocks[0];
  const direct = characterIndexMocks.find((item) => item.id === id);
  if (direct) {
    const record = characterRecordBySlug.get(id);
    if (record) {
      const releases = buildReleasesForCharacter(record.id);
      if (releases.length > 0) {
        return {
          ...direct,
          releases,
          releaseCount: releases.length,
        };
      }
    }
    return direct;
  }
  const record = characterRecordBySlug.get(id);
  if (record) return buildFallback(record);
  const numericId = Number.parseInt(id, 10);
  if (!Number.isNaN(numericId)) {
    const byId = characterMock.find((item) => item.id === numericId);
    if (byId) return buildFallback(byId);
  }
  return characterIndexMocks[0];
};
