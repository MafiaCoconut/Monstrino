// src/entities/release/model/types.ts

export type ReleaseId = string;

export interface ReleaseImageDTO {
  id?: number;
  url: string;
  width?: number;
  height?: number;
  kind?: string;
  is_primary?: boolean;
}

export interface ReleaseDTO {
  id: ReleaseId;

  name: string;
  mpn?: string | null;
  year?: number | null;

  description?: string | null;
  text_from_box?: string | null;

  images?: ReleaseImageDTO[] | null;
  primary_image?: ReleaseImageDTO | null;

  reissue_of?: ReleaseId | null;
  rerelease_of?: ReleaseId | null;

  content_type?: string | null;
  tier_type?: string | null;
  pack_type?: string | null;

  exclusive_of?: Array<{ id?: string; name: string }> | null;

  release_characters?: Array<{ id?: string; name: string }> | null;
  release_pets?: Array<{ id?: string; name: string }> | null;
  release_series?: Array<{ id?: string; name: string }> | null;
}

export type ReleaseSortKey = "newest" | "oldest" | "name_asc" | "name_desc";

export interface ReleaseListQuery {
  query?: string;
  year?: number;
  character?: string; // character name or id (your choice)
  series?: string;    // series name or id (your choice)
  page: number;
  page_size: number;
  sort: ReleaseSortKey;
}

export interface ReleaseListResponse {
  items: ReleaseDTO[];
  page: number;
  page_size: number;
  total: number;
}

/** Demo-only market movement direction. */
export type ReleaseMarketTrend = "up" | "down" | "flat";

/** Pricing and market snapshot used across the release page. */
export interface ReleaseStats {
  releaseDate: string;
  rarity: string;
  originalMsrp: string;
  marketValue: string;
  marketTrend?: ReleaseMarketTrend;
  marketDeltaPct?: number;
}

/** Key-value detail row for release specifications. */
export interface ReleaseDetailsItem {
  key: string;
  label: string;
  value: string;
}

/** Grouped specification sections. */
export interface ReleaseDetailsGroups {
  general: ReleaseDetailsItem[];
  product: ReleaseDetailsItem[];
  physical: ReleaseDetailsItem[];
}

/** Design-only listing data for current sales. */
export interface ReleaseListing {
  id: string;
  title: string;
  seller: string;
  condition: string;
  price: string;
  shipping: string;
  image: string;
  source: string;
}

/**
 * Demo release domain object for the release index page.
 * DESIGN-ONLY: placeholder data until real API data is wired.
 */
export interface Release {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  gallery: string[];
  character: string;
  series: string;
  year: string;
  exclusive: string;
  modelNumber: string;
  stats: ReleaseStats;
  details: ReleaseDetailsGroups;
  clothing: string[];
  items: string[];
  listings: ReleaseListing[];
}
