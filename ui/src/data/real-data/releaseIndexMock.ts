import type {
  Release,
  ReleaseId,
  ReleasePriceHistory,
  ReleasePricing,
  ReleasePricingRegion,
  ReleaseReview,
  ReleaseStockStatus,
  ReleaseVariant,
} from '@/pages/release-hub/entities';
import { characterMock } from '@/data/real-data/characterMock';
import { characterRoleMock } from '@/data/real-data/characterRoleMock';
import { exclusiveVendorMock } from '@/data/real-data/exclusiveVendorMock';
import { petMock } from '@/data/real-data/petMock';
import { releaseCharacterMock } from '@/data/real-data/releaseCharacterMock';
import { releaseExclusiveLinkMock } from '@/data/real-data/releaseExclusiveLinkMock';
import { releaseImageMock } from '@/data/real-data/releaseImageMock';
import { releaseMock } from '@/data/real-data/releaseMock';
import { releasePetMock } from '@/data/real-data/releasePetMock';
import { releaseSeriesLinkMock } from '@/data/real-data/releaseSeriesLinkMock';
import { releaseTypeLinkMock } from '@/data/real-data/releaseTypeLinkMock';
import { releaseTypeMock } from '@/data/real-data/releaseTypeMock';
import { seriesMock } from '@/data/real-data/seriesMock';

const PLACEHOLDER_IMAGE = '/placeholder.svg';

const toReleaseId = (value: string | number): ReleaseId => `${value}` as ReleaseId;

type CharacterRecord = (typeof characterMock)[number];
type ReleaseRecord = (typeof releaseMock)[number];
type ReleaseCharacterRecord = (typeof releaseCharacterMock)[number];
type ReleaseSeriesLinkRecord = (typeof releaseSeriesLinkMock)[number];
type ReleasePetRecord = (typeof releasePetMock)[number];
type ReleaseImageRecord = (typeof releaseImageMock)[number];
type ReleaseExclusiveLinkRecord = (typeof releaseExclusiveLinkMock)[number];
type ReleaseTypeLinkRecord = (typeof releaseTypeLinkMock)[number];
type ReleaseTypeRecord = (typeof releaseTypeMock)[number];
type SeriesRecord = (typeof seriesMock)[number];
type VendorRecord = (typeof exclusiveVendorMock)[number];
type PetRecord = (typeof petMock)[number];

const characterById = new Map<number, CharacterRecord>(characterMock.map((item) => [item.id, item]));
const seriesById = new Map<number, SeriesRecord>(seriesMock.map((item) => [item.id, item]));
const petById = new Map<number, PetRecord>(petMock.map((item) => [item.id, item]));
const vendorById = new Map<number, VendorRecord>(exclusiveVendorMock.map((item) => [item.id, item]));
const releaseTypeById = new Map<number, ReleaseTypeRecord>(releaseTypeMock.map((item) => [item.id, item]));
const roleIdByName = new Map<string, number>(characterRoleMock.map((item) => [item.name, item.id]));

const groupByReleaseId = <T extends { release_id: number }>(items: T[]) => {
  const map = new Map<number, T[]>();
  for (const item of items) {
    const list = map.get(item.release_id) ?? [];
    list.push(item);
    map.set(item.release_id, list);
  }
  return map;
};

const releaseCharactersByReleaseId = groupByReleaseId(releaseCharacterMock);
const releaseSeriesByReleaseId = groupByReleaseId(releaseSeriesLinkMock);
const releasePetsByReleaseId = groupByReleaseId(releasePetMock);
const releaseImagesByReleaseId = groupByReleaseId(releaseImageMock);
const releaseExclusivesByReleaseId = groupByReleaseId(releaseExclusiveLinkMock);
const releaseTypeLinksByReleaseId = groupByReleaseId(releaseTypeLinkMock);

const badgePalette = ['#ec4899', '#3b82f6', '#a855f7', '#f97316'];
const rarityPalette = ['Common', 'Rare', 'Exclusive', 'Legendary'];
const releaseRarities = ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Grail'];

const pickByRelease = <T,>(releaseId: number, values: T[]): T => values[releaseId % values.length];

const buildStockStatus = (release: ReleaseRecord): ReleaseStockStatus => {
  const statuses: ReleaseStockStatus[] = ['in_stock', 'out_of_stock', 'preorder', 'limited'];
  return statuses[release.id % statuses.length];
};

const buildStockStatusLabel = (status: ReleaseStockStatus): string => {
  if (status === 'in_stock') return 'In Stock';
  if (status === 'out_of_stock') return 'Out of Stock';
  if (status === 'preorder') return 'Preorder';
  if (status === 'limited') return 'Limited';
  return 'Unknown';
};

const truncate = (value: string, max = 60): string => {
  if (value.length <= max) return value;
  return `${value.slice(0, Math.max(0, max - 3))}...`;
};

const buildPricing = (release: ReleaseRecord): ReleasePricing => {
  const base = 45 + ((release.year ?? 2024) % 10) * 4 + (release.id % 7) * 3;
  const regions: ReleasePricingRegion[] = [
    { code: 'US', currency: '$', msrp: base, market: Math.round(base * 1.45), flag: '🇺🇸', msrpNote: 'Official MSRP', marketNote: 'Recent sales avg', recentSalesCount: 20 + (release.id % 40) },
    { code: 'EU', currency: '€', msrp: Math.round(base * 1.1), market: Math.round(base * 1.55), flag: '🇪🇺', msrpNote: 'Official MSRP', marketNote: 'Recent sales avg', recentSalesCount: 20 + (release.id % 40) },
    { code: 'JP', currency: '¥', msrp: Math.round(base * 120), market: Math.round(base * 180), flag: '🇯🇵', msrpNote: 'Official MSRP', marketNote: 'Recent sales avg', recentSalesCount: 20 + (release.id % 40) },
    { code: 'UK', currency: '£', msrp: Math.round(base * 0.9), market: Math.round(base * 1.35), flag: '🇬🇧', msrpNote: 'Official MSRP', marketNote: 'Recent sales avg', recentSalesCount: 20 + (release.id % 40) },
    { code: 'CA', currency: 'C$', msrp: Math.round(base * 1.15), market: Math.round(base * 1.6), flag: '🇨🇦', msrpNote: 'Official MSRP', marketNote: 'Recent sales avg', recentSalesCount: 15 + (release.id % 30) },
    { code: 'AU', currency: 'A$', msrp: Math.round(base * 1.25), market: Math.round(base * 1.75), flag: '🇦🇺', msrpNote: 'Official MSRP', marketNote: 'Recent sales avg', recentSalesCount: 12 + (release.id % 25) },
    { code: 'MX', currency: 'MXN', msrp: Math.round(base * 18), market: Math.round(base * 26), flag: '🇲🇽', msrpNote: 'Official MSRP', marketNote: 'Recent sales avg', recentSalesCount: 10 + (release.id % 20) },
    { code: 'BR', currency: 'R$', msrp: Math.round(base * 5), market: Math.round(base * 7.5), flag: '🇧🇷', msrpNote: 'Official MSRP', marketNote: 'Recent sales avg', recentSalesCount: 8 + (release.id % 15) },
  ];

  return { regions };
};

const buildPriceHistory = (release: ReleaseRecord): ReleasePriceHistory => {
  const base = 55 + ((release.year ?? 2024) % 10) * 5 + (release.id % 6) * 4;
  const buildSeries = (multiplier: number) =>
    Array.from({ length: 15 }, (_, index) =>
      Math.round((base * multiplier) * (0.85 + (index / 14) * 0.35) + (index % 2 === 0 ? -2 : 2))
    );

  return {
    regions: [
      { code: 'US', flag: 'US', data: buildSeries(1) },
      { code: 'EU', flag: 'EU', data: buildSeries(1.2) },
      { code: 'JP', flag: 'JP', data: buildSeries(120) },
    ],
    periods: ['7D', '30D', '90D', '1Y', 'ALL'],
  };
};

const buildBadges = (release: ReleaseRecord, vendors: VendorRecord[], releaseTypes: ReleaseTypeRecord[]) => {
  const badges: ReleaseBadge[] = [];
  if (vendors.length > 0) {
    badges.push({
      label: 'Exclusive',
      variant: 'solid',
      color: badgePalette[release.id % badgePalette.length],
    });
  }

  if (releaseTypes.length > 0) {
    const primaryType = releaseTypes[0];
    badges.push({
      label: primaryType.display_name,
      variant: 'outlined',
      color: badgePalette[(release.id + 1) % badgePalette.length],
    });
  }

  return badges;
};

const buildVariants = (release: ReleaseRecord): ReleaseVariant[] => [
  {
    type: 'Original',
    name: release.display_name ?? release.name ?? 'Untitled Release',
    year: release.year ?? undefined,
    status: 'current',
    sku: release.mpn ?? undefined,
  },
];

const buildMedia = (images: ReleaseImageRecord[], fallbackImage: string): ReleaseMediaCategory[] => {
  const mediaImages = (images.length > 0 ? images : [{ image_url: fallbackImage } as ReleaseImageRecord])
    .map((image, index) => ({
      src: image.image_url ?? fallbackImage,
      caption: `Official image ${index + 1}`,
    }));

  return [
    {
      label: 'Promo',
      images: mediaImages,
    },
  ];
};

const buildReviews = (release: ReleaseRecord, characterName: string): ReleaseReview[] => {
  const description = release.description ?? '';
  const sentences = description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const fallbackText = `Collectors appreciate the detailing on ${characterName} releases.`;
  const baseText = sentences.length > 0 ? sentences[0] : fallbackText;

  return [
    {
      user: `${characterName.replace(/\s+/g, '')}Fan`,
      avatar: characterName.charAt(0) || 'M',
      rating: 4,
      date: release.year ? `${release.year}` : '2024',
      text: truncate(baseText, 140),
      helpfulCount: 12 + (release.id % 40),
    },
    {
      user: 'CollectorGuild',
      avatar: 'C',
      rating: 5,
      date: release.year ? `${release.year}` : '2024',
      text: truncate(sentences[1] ?? baseText, 140),
      helpfulCount: 18 + (release.id % 55),
    },
  ];
};

const buildAccessories = (release: ReleaseRecord, characterName: string, imageUrl: string) => {
  const count = 2 + (release.id % 3);
  return Array.from({ length: count }, (_, index) => ({
    name: `${characterName} Accessory ${index + 1}`,
    category: 'Accessory',
    rarity: rarityPalette[index % rarityPalette.length],
    image: imageUrl,
  }));
};

const buildClothing = (release: ReleaseRecord, characterName: string, imageUrl: string) => {
  const count = 2 + (release.id % 2);
  return Array.from({ length: count }, (_, index) => ({
    name: `${characterName} Outfit ${index + 1}`,
    category: 'Outfit',
    rarity: rarityPalette[(index + 1) % rarityPalette.length],
    image: imageUrl,
  }));
};

const buildMarketOffers = (release: ReleaseRecord, basePrice: number) => {
  const price = (value: number) => `$${value.toFixed(2)}`;
  return [
    {
      seller: 'CollectorVault',
      condition: 'New',
      platform: 'Marketplace',
      shipping: 'Free shipping',
      price: price(basePrice * 1.4),
      verified: true,
      lastUpdated: '2h ago',
    },
    {
      seller: 'NightMarket',
      condition: 'Like New',
      platform: 'Marketplace',
      shipping: '$6.99 shipping',
      price: price(basePrice * 1.25),
      verified: true,
      lastUpdated: '6h ago',
    },
    {
      seller: 'VaultCollect',
      condition: 'New',
      platform: 'Marketplace',
      shipping: 'Local pickup',
      price: price(basePrice * 1.32),
      verified: false,
      lastUpdated: '1d ago',
    },
  ];
};

const buildRelease = (release: ReleaseRecord): Release => {
  const releaseCharacters = releaseCharactersByReleaseId.get(release.id) ?? [];
  const mainRoleId = roleIdByName.get('main');
  const mainCharacterLink = releaseCharacters.find((link) => link.role_id === mainRoleId) ?? releaseCharacters[0];
  const character = mainCharacterLink ? characterById.get(mainCharacterLink.character_id) : undefined;
  const characterName = character?.display_name ?? 'Unknown Character';

  const releaseSeries = releaseSeriesByReleaseId.get(release.id) ?? [];
  const primarySeriesLink = releaseSeries.find((link) => link.relation_type === 'primary') ?? releaseSeries[0];
  const series = primarySeriesLink ? seriesById.get(primarySeriesLink.series_id) : undefined;
  const seriesName = series?.display_name ?? 'Unknown Series';

  const releaseImages = releaseImagesByReleaseId.get(release.id) ?? [];
  const primaryImage = releaseImages.find((image) => image.is_primary) ?? releaseImages[0];
  const imageUrl = primaryImage?.image_url ?? character?.primary_image ?? PLACEHOLDER_IMAGE;

  const releasePets = releasePetsByReleaseId.get(release.id) ?? [];
  const petDetails = releasePets
    .map((petLink) => petById.get(petLink.pet_id))
    .filter((pet): pet is PetRecord => Boolean(pet))
    .map((pet) => ({
      id: pet.id,
      name: pet.display_name,
      category: 'Pet',
      rarity: rarityPalette[release.id % rarityPalette.length],
      image: pet.primary_image ?? PLACEHOLDER_IMAGE,
    }));

  const exclusives = releaseExclusivesByReleaseId.get(release.id) ?? [];
  const vendors = exclusives
    .map((link) => vendorById.get(link.vendor_id))
    .filter((vendor): vendor is VendorRecord => Boolean(vendor));

  const releaseTypeLinks = releaseTypeLinksByReleaseId.get(release.id) ?? [];
  const releaseTypes = releaseTypeLinks
    .map((link) => releaseTypeById.get(link.type_id))
    .filter((type): type is ReleaseTypeRecord => Boolean(type));

  const pricing = buildPricing(release);
  const basePrice = pricing.regions[0]?.market ?? 100;
  const stockStatus = buildStockStatus(release);

  return {
    id: toReleaseId(release.id),
    name: release.display_name ?? release.name ?? 'Untitled Release',
    subtitle: seriesName ? `${seriesName} Edition` : 'Collector Edition',
    characterName,
    seriesName,
    year: release.year ?? undefined,
    imageUrl,
    price: `$${Math.round(basePrice)}.00`,
    isExclusive: vendors.length > 0,
    releaseDateLabel: release.year ? `${release.year}` : 'TBD',
    sku: release.mpn ?? undefined,
    stockStatus,
    stockStatusLabel: buildStockStatusLabel(stockStatus),
    rating: {
      average: Number((3.8 + (release.id % 12) * 0.1).toFixed(1)),
      count: 20 + (release.id * 7) % 200,
    },
    badges: buildBadges(release, vendors, releaseTypes),
    pricing,
    variants: buildVariants(release),
    media: buildMedia(releaseImages, imageUrl),
    gallery: (releaseImages.length > 0 ? releaseImages : [{ image_url: imageUrl } as ReleaseImageRecord]).map((image) => ({
      src: image.image_url ?? imageUrl,
      thumbnailSrc: image.image_url ?? imageUrl,
      alt: release.display_name ?? release.name ?? 'Release image',
    })),
    infoSections: [
      {
        title: 'General Information',
        items: [
          { label: 'Series', value: seriesName },
          { label: 'Year', value: release.year ? `${release.year}` : 'Unknown' },
          { label: 'SKU', value: release.mpn ?? 'TBD' },
          { label: 'Exclusive', value: vendors[0]?.display_name ?? 'Standard' },
          { label: 'Type', value: releaseTypes[0]?.display_name ?? 'Doll' },
        ],
      },
      {
        title: 'Product Details',
        items: [
          { label: 'Doll Height', value: release.id % 3 === 0 ? '10.5 inches' : release.id % 3 === 1 ? '11 inches' : '10 inches' },
          { label: 'Articulation', value: `${9 + (release.id % 4)} points` },
          { label: 'Hair Type', value: release.id % 2 === 0 ? 'Nylon' : 'Saran' },
          { label: 'Stand Included', value: release.id % 5 !== 0 ? 'Yes' : 'No' },
          { label: 'Accessories', value: `${4 + (release.id % 5)} pieces` },
        ],
      },
    ],
    generalInfo: {
      title: 'General Info',
      columns: [
        {
          items: [
            { label: 'Series', value: seriesName },
            { label: 'Subline', value: '-' },
            { label: 'Wave', value: `Wave ${1 + (release.id % 3)}` },
            { label: 'Generation', value: release.name?.includes('generation-3') || (release.year ?? 0) >= 2023 ? 'G3' : 'G1' },
            { label: 'Year', value: release.year ? `${release.year}` : 'Unknown' },
            { label: 'SKU', value: release.mpn ?? 'TBD' },
          ],
        },
        {
          items: [
            { label: 'Exclusive', value: vendors.length > 0 ? vendors.map((vendor) => vendor.display_name).join(', ') : 'Standard' },
            { label: 'Multipack Type', value: pickByRelease(release.id, ['Single', '2-Pack', '3-Pack', '5-Pack']) },
            { label: 'Pack Type', value: pickByRelease(release.id, ['Standard', 'Deluxe', 'Collector', 'Budget']) },
            { label: 'Tier Type', value: pickByRelease(release.id, releaseRarities) },
            { label: 'Rarity', value: pickByRelease(release.id, releaseRarities) },
            { label: 'Age', value: pickByRelease(release.id, ['6+', '8+', '14+']) },
          ],
        },
      ],
    },
    productDetails: {
      title: 'Product Specs',
      sections: [
        {
          title: 'Doll Specs',
          items: [
            { label: 'Doll Height', value: pickByRelease(release.id, ['10 in', '10.5 in', '11 in', '12 in']) },
            { label: 'Weight', value: pickByRelease(release.id, ['0.35 kg', '0.4 kg', '0.45 kg', '0.5 kg']) },
            { label: 'Body Type', value: pickByRelease(release.id, ['Original', 'Articulated', 'Budget']) },
            { label: 'Articulation', value: `${9 + (release.id % 6)} points` },
            { label: 'Face Mold', value: pickByRelease(release.id, ['Classic', 'Soft Glam', 'Collector', 'Modern']) },
            { label: 'Eye Color', value: pickByRelease(release.id, ['Brown', 'Blue', 'Green', 'Hazel']) },
            { label: 'Skin Tone', value: pickByRelease(release.id, ['Fair', 'Medium', 'Tan', 'Deep']) },
            { label: 'Face Paint', value: pickByRelease(release.id, ['Soft Glam', 'Bold', 'Graphic', 'Classic']) },
            { label: 'Hair Type', value: pickByRelease(release.id, ['Nylon', 'Saran', 'Poly']) },
            { label: 'Hair Color', value: pickByRelease(release.id, ['Black', 'Brown', 'Blonde', 'Pink', 'Auburn']) },
            { label: 'Hair Style', value: pickByRelease(release.id, ['Straight', 'Wavy', 'Curly', 'Updo']) },
            { label: 'Hair Length', value: pickByRelease(release.id, ['Short', 'Medium', 'Long', 'Extra Long']) },
            { label: 'Rooted/Removable', value: pickByRelease(release.id, ['Rooted', 'Removable']) },
          ],
        },
        {
          title: 'Collectibility',
          items: [
            { label: 'Edition Type', value: pickByRelease(release.id, ['Limited Edition', 'Collector Edition', 'Standard Edition']) },
            { label: 'Certificate', value: release.id % 3 === 0 ? 'Yes' : 'No' },
            { label: 'Signed Edition', value: release.id % 7 === 0 ? 'Yes' : 'No' },
            { label: 'Designer/Artist', value: pickByRelease(release.id, ['Garrett Sander', 'Rebecca Shipman', 'Angel Kent', 'Team Design']) },
            { label: 'Collaboration', value: pickByRelease(release.id, ['Mattel Creations', 'SDCC', 'Barbie', 'None']) },
          ],
        },
        {
          title: 'Box Contents',
          items: [
            { label: 'Stand Included', value: release.id % 5 !== 0 ? 'Yes' : 'No' },
            { label: 'Accessories', value: `${4 + (release.id % 6)} pcs` },
            { label: 'Outfit Pieces', value: `${3 + (release.id % 4)} pcs` },
            { label: 'Removable Clothes', value: release.id % 4 === 0 ? 'Partial' : 'Yes' },
            { label: 'Shoes Type', value: pickByRelease(release.id, ['Heels', 'Boots', 'Sneakers', 'Sandals']) },
          ],
        },
        {
          title: 'Packaging',
          items: [
            { label: 'Package Type', value: pickByRelease(release.id, ['Coffin Box', 'Window Box', 'Book Box', 'Blister']) },
            { label: 'Package Dimensions', value: pickByRelease(release.id, ['12 x 4 x 14 in', '11 x 4 x 13 in', '10 x 3.5 x 12 in']) },
            { label: 'Display Window', value: release.id % 2 === 0 ? 'Yes' : 'No' },
            { label: 'Box Art Style', value: pickByRelease(release.id, ['Illustrated', 'Photo', 'Mixed Media', 'Minimal']) },
          ],
        },
      ],
    },
    physicalContents: [
      { name: 'Doll', count: 1 },
      { name: 'Stand', count: 1 },
      { name: 'Accessories', count: 4 + (release.id % 5) },
      { name: 'Clothing', count: 2 + (release.id % 4) },
      ...(petDetails.length > 0 ? [{ name: 'Pet', count: petDetails.length }] : []),
    ],
    accessories: buildAccessories(release, characterName, imageUrl),
    clothing: buildClothing(release, characterName, imageUrl),
    petsDetail: petDetails,
    priceHistory: buildPriceHistory(release),
    reviews: buildReviews(release, characterName),
    customs: [
      {
        title: `${characterName} Custom Repaint`,
        artist: '@customartist',
        type: 'Repaint',
        image: imageUrl,
        likes: 80 + (release.id % 150),
      },
      {
        title: `${characterName} OOAK`,
        artist: '@ooakstudio',
        type: 'OOAK',
        image: imageUrl,
        likes: 60 + (release.id % 120),
      },
    ],
    tutorials: [
      {
        title: `${characterName} Styling Tutorial`,
        creator: 'CollectorLab',
        type: 'Video',
        duration: '18:30',
        image: imageUrl,
      },
    ],
    creators: [
      {
        name: 'CollectorLab',
        followers: '24K',
        specialty: 'Customs',
        avatar: 'C',
      },
      {
        name: 'OOAK Studio',
        followers: '18K',
        specialty: 'Repaints',
        avatar: 'O',
      },
    ],
    communityCounts: {
      reviews: 20 + (release.id % 120),
      customs: 4 + (release.id % 12),
      tutorials: 2 + (release.id % 5),
    },
    marketOffers: buildMarketOffers(release, basePrice),
    marketOffersDisclaimer: 'Prices are aggregated from multiple marketplaces and may not reflect current availability.',
    tags: vendors.map((vendor) => vendor.display_name),
    characters: releaseCharacters
      .map((link) => characterById.get(link.character_id))
      .filter((item): item is CharacterRecord => Boolean(item))
      .map((item) => ({ id: `${item.id}`, name: item.display_name })),
    series: releaseSeries
      .map((link) => seriesById.get(link.series_id))
      .filter((item): item is SeriesRecord => Boolean(item))
      .map((item) => ({ id: `${item.id}`, name: item.display_name })),
    pets: petDetails.map((pet) => ({ id: pet.name, name: pet.name })),
  };
};

export const releaseIndexMock: Release[] = releaseMock.map(buildRelease);
