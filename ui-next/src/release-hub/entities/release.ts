import type {
  BrandedId,
  EntityAudit,
  EntityRef,
  Generation,
  HexColor,
  ISODateString,
  UrlString,
} from "./shared";

export type ReleaseId = BrandedId<"ReleaseId">;

export const RELEASE_TYPES = [
  "Basic",
  "Signature",
  "Collector",
  "Skullector",
  "Playset",
  "Multipack",
  "Fashion Pack",
  "Vehicle",
  "SDCC Exclusive",
  "Creeproduction",
] as const;
export type ReleaseType = (typeof RELEASE_TYPES)[number];

export const RELEASE_RARITIES = ["Common", "Uncommon", "Rare", "Ultra Rare", "Grail"] as const;
export type ReleaseRarity = (typeof RELEASE_RARITIES)[number];

export type ReleaseTag =
  | "Exclusive"
  | "SDCC"
  | "Limited"
  | "Reboot"
  | "Anniversary"
  | "Collab"
  | string;

export type ReleaseStockStatus = "in_stock" | "out_of_stock" | "preorder" | "limited" | "unknown";

export type ReleaseVariantStatus = "current" | "available" | "upcoming" | "discontinued" | string;

export interface ReleaseBadge {
  label: string;
  variant?: "solid" | "outlined";
  color?: HexColor;
}

export interface ReleaseRatingSummary {
  average: number;
  count: number;
}

export interface ReleasePricingRegion {
  code: string;
  currency: string;
  msrp: number;
  market: number;
  flag?: string;
  msrpNote?: string;
  marketNote?: string;
  recentSalesCount?: number;
}

export interface ReleasePricing {
  regions: ReleasePricingRegion[];
}

export interface ReleaseVariant {
  type: string;
  name: string;
  year?: number | string;
  status: ReleaseVariantStatus;
  sku?: string;
}

export interface ReleaseMediaImage {
  src: UrlString;
  caption?: string;
}

export interface ReleaseMediaCategory {
  label: string;
  images: ReleaseMediaImage[];
}

export interface ReleaseGalleryImage {
  src: UrlString;
  thumbnailSrc?: UrlString;
  alt?: string;
}

export interface ReleaseInfoItem {
  label: string;
  value: string;
}

export interface ReleaseInfoSection {
  title: string;
  items: ReleaseInfoItem[];
}

export interface ReleaseInfoColumn {
  items: ReleaseInfoItem[];
}

export interface ReleaseGeneralInfo {
  title: string;
  columns: ReleaseInfoColumn[];
}

export interface ReleaseProductDetails {
  title: string;
  sections: ReleaseInfoSection[];
}

export interface ReleasePhysicalContent {
  name: string;
  count: number;
}

export interface ReleaseAccessory {
  name: string;
  category: string;
  rarity?: string;
  image: UrlString;
}

export interface ReleasePet {
  id: string | number;
  name: string;
  category?: string;
  rarity?: string;
  image: UrlString;
}

export interface ReleasePriceHistoryRegion {
  code: string;
  flag?: string;
  data: number[];
}

export interface ReleasePriceHistory {
  regions: ReleasePriceHistoryRegion[];
  periods?: string[];
}

export interface ReleaseReview {
  user: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  helpfulCount?: number;
}

export interface ReleaseCustom {
  title: string;
  artist: string;
  type: string;
  image: UrlString;
  likes?: number;
}

export interface ReleaseTutorial {
  title: string;
  creator: string;
  type: string;
  duration?: string;
  image: UrlString;
}

export interface ReleaseCreator {
  name: string;
  followers?: string;
  specialty?: string;
  avatar?: string;
}

export interface ReleaseCommunityCounts {
  reviews?: number;
  customs?: number;
  tutorials?: number;
}

export interface ReleaseMarketOffer {
  seller: string;
  condition: string;
  platform: string;
  shipping: string;
  price: string;
  verified?: boolean;
  lastUpdated?: string;
}

export interface ReleaseSummary {
  id: ReleaseId;
  name: string;
  characterName: string;
  seriesName: string;
  year?: number;
  imageUrl?: UrlString;
  price?: string;
  isExclusive?: boolean;
}

export interface Release extends ReleaseSummary, EntityAudit {
  generation?: Generation;
  releaseDate?: ISODateString;
  releaseTypes?: ReleaseType[];
  packSize?: number;
  rarity?: ReleaseRarity;
  tags?: ReleaseTag[];
  subtitle?: string;
  sku?: string;
  releaseDateLabel?: string;
  stockStatus?: ReleaseStockStatus;
  stockStatusLabel?: string;
  rating?: ReleaseRatingSummary;
  badges?: ReleaseBadge[];
  pricing?: ReleasePricing;
  variants?: ReleaseVariant[];
  media?: ReleaseMediaCategory[];
  gallery?: ReleaseGalleryImage[];
  infoSections?: ReleaseInfoSection[];
  generalInfo?: ReleaseGeneralInfo;
  productDetails?: ReleaseProductDetails;
  physicalContents?: ReleasePhysicalContent[];
  accessories?: ReleaseAccessory[];
  clothing?: ReleaseAccessory[];
  petsDetail?: ReleasePet[];
  priceHistory?: ReleasePriceHistory;
  reviews?: ReleaseReview[];
  customs?: ReleaseCustom[];
  tutorials?: ReleaseTutorial[];
  creators?: ReleaseCreator[];
  communityCounts?: ReleaseCommunityCounts;
  marketOffers?: ReleaseMarketOffer[];
  marketOffersDisclaimer?: string;

  characters?: EntityRef[];
  series?: EntityRef[];
  pets?: EntityRef[];
}

export interface ReleaseFilters {
  generations?: Generation[];
  releaseTypes?: ReleaseType[];
  rarities?: ReleaseRarity[];
  tags?: ReleaseTag[];
}
