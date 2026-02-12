// @ts-nocheck
import type { Series, SeriesId } from '@/release-hub/entities';
import { characterMock } from '@/data/real-data/characterMock';
import { exclusiveVendorMock } from '@/data/real-data/exclusiveVendorMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { releaseExclusiveLinkMock } from '@/data/real-data/releaseExclusiveLinkMock';
import { releaseImageMock } from '@/data/real-data/releaseImageMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { releaseSeriesLinkMock } from '@/data/real-data/releaseSeriesLinkMock';
import { seriesMock } from '@/data/real-data/seriesMock';

const toSeriesId = (value: string | number): SeriesId => `${value}` as SeriesId;

const DEFAULT_FASHION_SETS = [
  ['Gothic Glam', 'Pastel Punk', 'Monster Chic', 'Dark Academia'],
  ['Neon Streetwear', 'Victorian Lace', 'Retro Pop', 'Midnight Elegance'],
  ['Haunted Couture', 'Academic Noir', 'Moonlit Romance', 'Spooky Street'],
  ['Classic Campus', 'Fang Club', 'Crystal Goth', 'Shadow Pop'],
];

const DEFAULT_COLORS = [
  { hex: '#9B7BB8', name: 'Phantom Purple' },
  { hex: '#D4A5B9', name: 'Ghoul Pink' },
  { hex: '#2D2D3A', name: 'Midnight' },
  { hex: '#4ECDC4', name: 'Creature Teal' },
  { hex: '#F7DC6F', name: 'Bolt Gold' },
];

const DEFAULT_DISTRIBUTION = {
  targetMarket: ['Collectors (18-35)', 'Kids (6-12)', 'Monster High Fans'],
  channels: ['Mass Retail', 'Online', 'Specialty Toy Stores'],
  regions: ['North America', 'Europe', 'Latin America', 'Australia'],
};

const characterById = new Map(characterMock.map((character) => [character.id, character]));
const releaseById = new Map(releaseMock.map((release) => [release.id, release]));
const vendorById = new Map(exclusiveVendorMock.map((vendor) => [vendor.id, vendor]));
const releaseImagesByReleaseId = new Map<number, (typeof releaseImageMock)[number][]>();
releaseImageMock.forEach((image) => {
  const list = releaseImagesByReleaseId.get(image.release_id) ?? [];
  list.push(image);
  releaseImagesByReleaseId.set(image.release_id, list);
});

const groupBySeriesId = <T extends { series_id: number }>(items: T[]) => {
  const map = new Map<number, T[]>();
  for (const item of items) {
    const list = map.get(item.series_id) ?? [];
    list.push(item);
    map.set(item.series_id, list);
  }
  return map;
};

const groupByReleaseId = <T extends { release_id: number }>(items: T[]) => {
  const map = new Map<number, T[]>();
  for (const item of items) {
    const list = map.get(item.release_id) ?? [];
    list.push(item);
    map.set(item.release_id, list);
  }
  return map;
};

const releaseLinksBySeriesId = groupBySeriesId(releaseSeriesLinkMock);
const releaseCharactersByReleaseId = groupByReleaseId(releaseCharacterMock);
const exclusivesByReleaseId = groupByReleaseId(releaseExclusiveLinkMock);

const normalizeName = (value: string) => value.trim().toLowerCase();

const inferGeneration = (year?: number): Series['generation'] => {
  if (!year) return 'G1';
  if (year >= 2022) return 'G3';
  if (year >= 2016) return 'G2';
  return 'G1';
};

const formatReleaseYears = (years: number[]): string => {
  if (years.length === 0) return 'Unknown';
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  return minYear === maxYear ? `${minYear}` : `${minYear}-${maxYear}`;
};

const buildStatus = (maxYear?: number): Series['status'] => {
  if (!maxYear) return 'Completed';
  if (maxYear >= 2024) return 'Ongoing';
  if (maxYear <= 2010) return 'Archived';
  return 'Completed';
};

const getFashionStyles = (seriesId: number) =>
  DEFAULT_FASHION_SETS[seriesId % DEFAULT_FASHION_SETS.length];

const getColorPalette = (seriesId: number) => {
  const offset = seriesId % DEFAULT_COLORS.length;
  return [...DEFAULT_COLORS.slice(offset), ...DEFAULT_COLORS.slice(0, offset)].slice(0, 5);
};

const truncate = (value: string, max = 120): string => {
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 3))}...`;
};

const inferRarity = (releaseName: string): string => {
  const normalized = normalizeName(releaseName);
  if (normalized.includes('skullector') || normalized.includes('collector') || normalized.includes('sdcc')) {
    return 'Ultra Rare';
  }
  if (normalized.includes('exclusive') || normalized.includes('limited')) {
    return 'Rare';
  }
  return 'Common';
};

const toPrice = (value: number) => `$${value.toFixed(2)}`;

const buildPricing = (msrps: number[]) => {
  if (msrps.length === 0) {
    return {
      msrpRange: '$24.99 - $34.99',
      currentMarketRange: '$35 - $120',
      rarityDistribution: { common: 50, rare: 35, ultraRare: 15 },
      demandLevel: 'Medium',
    };
  }
  const min = Math.min(...msrps);
  const max = Math.max(...msrps);
  const marketMin = Math.round(min * 1.4);
  const marketMax = Math.round(max * 3.2);

  return {
    msrpRange: `${toPrice(min)} - ${toPrice(max)}`,
    currentMarketRange: `$${marketMin} - $${marketMax}`,
    rarityDistribution: { common: 0, rare: 0, ultraRare: 0 },
    demandLevel: max >= 35 ? 'High' : 'Medium',
  };
};

const buildRarityDistribution = (rarities: string[]) => {
  if (rarities.length === 0) return { common: 50, rare: 35, ultraRare: 15 };
  const counts = rarities.reduce(
    (acc, rarity) => {
      if (rarity === 'Ultra Rare') acc.ultraRare += 1;
      else if (rarity === 'Rare') acc.rare += 1;
      else acc.common += 1;
      return acc;
    },
    { common: 0, rare: 0, ultraRare: 0 }
  );
  const total = rarities.length;
  return {
    common: Math.round((counts.common / total) * 100),
    rare: Math.round((counts.rare / total) * 100),
    ultraRare: Math.max(0, 100 - Math.round((counts.common / total) * 100) - Math.round((counts.rare / total) * 100)),
  };
};

const buildSeries = (series: (typeof seriesMock)[number]): Series => {
  const releaseLinks = releaseLinksBySeriesId.get(series.id) ?? [];
  const releases = releaseLinks
    .map((link) => releaseById.get(link.release_id))
    .filter((release): release is (typeof releaseMock)[number] => Boolean(release));

  const years = releases.map((release) => release.year).filter((year): year is number => Boolean(year));
  const yearStart = years.length > 0 ? Math.min(...years) : undefined;
  const yearEnd = years.length > 0 ? Math.max(...years) : undefined;
  const generation = inferGeneration(yearEnd ?? yearStart);

  const dolls = releases.map((release) => {
    const releaseCharacters = releaseCharactersByReleaseId.get(release.id) ?? [];
    const mainCharacter = releaseCharacters[0]
      ? characterById.get(releaseCharacters[0].character_id)
      : undefined;
    const characterName = mainCharacter?.display_name ?? mainCharacter?.name ?? 'Unknown';
    const msrpValue = 24.99 + (release.id % 7) * 2;
    const images = releaseImagesByReleaseId.get(release.id) ?? [];
    const primaryImage = images.find((image) => image.is_primary) ?? images[0];
    return {
      id: release.id,
      releaseId: release.id,
      character: characterName,
      variant: release.display_name ?? release.name ?? 'Release',
      rarity: inferRarity(release.display_name ?? release.name ?? ''),
      year: release.year ?? yearEnd ?? yearStart,
      msrp: toPrice(msrpValue),
      imageUrl: primaryImage?.image_url ?? undefined,
    };
  });

  const uniqueCharacters = new Map<number, (typeof characterMock)[number]>();
  releases.forEach((release) => {
    const releaseCharacters = releaseCharactersByReleaseId.get(release.id) ?? [];
    releaseCharacters.forEach((link) => {
      const character = characterById.get(link.character_id);
      if (!character) return;
      uniqueCharacters.set(character.id, character);
    });
  });

  const palette = getColorPalette(series.id);
  const characters = Array.from(uniqueCharacters.values()).map((character, index) => ({
    id: character.id,
    name: character.display_name ?? character.name,
    species: character.species ?? 'Monster',
    releaseCount: releases.filter((release) => {
      const releaseCharacters = releaseCharactersByReleaseId.get(release.id) ?? [];
      return releaseCharacters.some((link) => link.character_id === character.id);
    }).length,
    imageUrl: character.primary_image ?? undefined,
    accentColor: palette[index % palette.length].hex,
  }));

  const exclusives = releases.flatMap((release) => {
    const links = exclusivesByReleaseId.get(release.id) ?? [];
    return links
      .map((link) => vendorById.get(link.vendor_id))
      .filter((vendor): vendor is (typeof exclusiveVendorMock)[number] => Boolean(vendor))
      .map((vendor) => ({
        doll: release.display_name ?? release.name ?? 'Release',
        type: vendor.display_name.includes('Comic-Con') ? 'Convention Exclusive' : 'Retailer Exclusive',
        region: vendor.display_name,
        year: release.year ? `${release.year}` : undefined,
      }));
  });

  const relatedSeries = seriesMock
    .filter((item) => item.id !== series.id && (item.parent_id === series.parent_id || item.series_type === series.series_type))
    .slice(0, 3)
    .map((item) => {
      const relatedReleaseLinks = releaseLinksBySeriesId.get(item.id) ?? [];
      const relatedReleases = relatedReleaseLinks
        .map((link) => releaseById.get(link.release_id))
        .filter((release): release is (typeof releaseMock)[number] => Boolean(release));
      const relatedYears = relatedReleases.map((release) => release.year).filter((year): year is number => Boolean(year));
      const relatedGeneration = inferGeneration(relatedYears.length > 0 ? Math.max(...relatedYears) : undefined);
      return {
        title: item.display_name ?? item.name,
        generation: relatedGeneration,
        relationship: item.series_type === series.series_type ? 'Connected Line' : 'Spin-off',
      };
    });

  const releaseYears = formatReleaseYears(years);
  const status = buildStatus(yearEnd);
  const msrps = dolls
    .map((doll) => Number(String(doll.msrp ?? '').replace(/[^0-9.]/g, '')))
    .filter((value) => !Number.isNaN(value));
  const pricing = buildPricing(msrps);
  pricing.rarityDistribution = buildRarityDistribution(dolls.map((doll) => doll.rarity ?? 'Common'));

  const description = series.description ?? `${series.display_name ?? series.name} expands the Monster High universe.`;

  return {
    id: toSeriesId(series.id),
    name: series.display_name ?? series.name,
    imageUrl: series.primary_image ?? undefined,
    releaseCount: releases.length,
    characterCount: characters.length,
    yearLabel: releaseYears,
    generation,
    yearStart,
    yearEnd,
    seriesType: series.series_type === 'primary' ? 'Mainline' : 'Special',
    description,
    releaseYears,
    status,
    concept: description,
    canonicalPlacement: `${generation} ${series.series_type === 'primary' ? 'Core' : 'Special'} Collection`,
    fashionStyles: getFashionStyles(series.id),
    colorPalette: palette,
    themeDescription: truncate(description, 120),
    dolls,
    characters,
    exclusives,
    distribution: DEFAULT_DISTRIBUTION,
    relatedSeries,
    relatedMedia: [
      {
        title: `${series.display_name ?? series.name} Lookbook`,
        type: 'Promo',
        year: yearEnd ? `${yearEnd}` : undefined,
      },
      {
        title: `${series.display_name ?? series.name} Behind the Scenes`,
        type: 'Feature',
        year: yearEnd ? `${yearEnd}` : undefined,
      },
    ],
    pricing,
    facts: [
      {
        title: 'Series Highlight',
        content: truncate(description, 160),
      },
      {
        title: 'Collector Notes',
        content: `Featuring ${releases.length || 1} release${releases.length === 1 ? '' : 's'} across ${releaseYears}.`,
      },
    ],
    community: {
      quotes: [
        { text: `${series.display_name ?? series.name} remains a fan favorite for collectors.`, author: '@MonsterCollector' },
        { text: `Collectors appreciate the styling and themes of ${series.display_name ?? series.name}.`, author: '@DollArchive' },
      ],
      legacySummary: `${series.display_name ?? series.name} is remembered for its distinctive styling and impact on the Monster High lineup.`,
      rating: Number((3.8 + (series.id % 10) * 0.1).toFixed(1)),
    },
  };
};

const seriesIndexByNumericId = new Map<string, Series>();
export const seriesIndexMock: Series[] = seriesMock.map((series) => {
  const model = buildSeries(series);
  seriesIndexByNumericId.set(`${series.id}`, model);
  return model;
});

export { seriesIndexByNumericId };
