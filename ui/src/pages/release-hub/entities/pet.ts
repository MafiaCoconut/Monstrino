import type { BrandedId, EntityAudit, EntityRef, Generation, UrlString } from "./shared";
import type { CharacterId } from "./character";
import type { ReleaseId } from "./release";

export type PetId = BrandedId<"PetId">;

export type PetRarity = "common" | "rare" | "exclusive" | "limited";
export type PetExclusivity = "exclusive" | "shared" | "limited";

export interface PetOwnerRef extends EntityRef<CharacterId | string> {
  role?: "primary" | "shared";
  imageUrl?: UrlString;
}

export interface PetReleaseRef extends EntityRef<ReleaseId | string> {
  year?: number;
}

export interface PetFact {
  label: string;
  value: string;
}

export interface PetFanArt {
  id: string;
  artist?: string;
  imageUrl?: UrlString;
}

export interface PetSummary {
  id: PetId;
  name: string;
  species: string;
  generation?: Generation;
  imageUrl?: UrlString;
  ownerName?: string;
  ownerImageUrl?: UrlString;
}

export interface Pet extends PetSummary, EntityAudit {
  type?: string;
  subtype?: string;
  rarity?: PetRarity;
  exclusivity?: PetExclusivity;
  exclusivityNote?: string;

  owners?: PetOwnerRef[];
  releases?: PetReleaseRef[];
  description?: string;
  facts?: PetFact[];
  officialImages?: UrlString[];
  fanArt?: PetFanArt[];
}
