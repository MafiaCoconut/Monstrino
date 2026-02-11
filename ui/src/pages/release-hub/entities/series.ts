import type { BrandedId, EntityAudit, Generation, HexColor, UrlString } from "./shared";
import type { CharacterSummary } from "./character";

export type SeriesId = BrandedId<"SeriesId">;

export const SERIES_TYPES = ["Mainline", "Special", "Convention", "Reboot", "Collector"] as const;
export type SeriesType = (typeof SERIES_TYPES)[number];

export interface SeriesSummary {
  id: SeriesId;
  name: string;
  releaseCount?: number;
  characterCount?: number;
  yearLabel?: string;
  imageUrl?: UrlString;
}

export type SeriesStatus = "Completed" | "Ongoing" | "Archived" | string;

export interface SeriesColor {
  hex: HexColor;
  name: string;
}

export interface SeriesDoll {
  id: string | number;
  releaseId?: string | number;
  character: string;
  variant?: string;
  rarity?: string;
  year?: string | number;
  msrp?: string;
  imageUrl?: UrlString;
}

export type SeriesCharacter = CharacterSummary;

export interface SeriesExclusive {
  doll: string;
  type: string;
  region?: string;
  year?: string;
}

export interface SeriesDistribution {
  targetMarket: string[];
  channels: string[];
  regions: string[];
}

export interface SeriesRelated {
  title: string;
  generation?: Generation | string;
  relationship?: string;
}

export interface SeriesMedia {
  title: string;
  type: string;
  year?: string;
}

export interface SeriesPricing {
  msrpRange: string;
  currentMarketRange: string;
  rarityDistribution: {
    common: number;
    rare: number;
    ultraRare: number;
  };
  demandLevel: string;
}

export interface SeriesFact {
  title: string;
  content: string;
}

export interface SeriesCommunityQuote {
  text: string;
  author?: string;
}

export interface SeriesCommunity {
  quotes: SeriesCommunityQuote[];
  legacySummary?: string;
  rating?: number;
}

export interface Series extends SeriesSummary, EntityAudit {
  generation?: Generation;
  yearStart?: number;
  yearEnd?: number;
  seriesType?: SeriesType;
  description?: string;
  releaseYears?: string;
  status?: SeriesStatus;
  concept?: string;
  canonicalPlacement?: string;
  fashionStyles?: string[];
  colorPalette?: SeriesColor[];
  themeDescription?: string;
  dolls?: SeriesDoll[];
  characters?: SeriesCharacter[];
  exclusives?: SeriesExclusive[];
  distribution?: SeriesDistribution;
  relatedSeries?: SeriesRelated[];
  relatedMedia?: SeriesMedia[];
  pricing?: SeriesPricing;
  facts?: SeriesFact[];
  community?: SeriesCommunity;
}
