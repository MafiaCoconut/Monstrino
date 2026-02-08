import type { BrandedId, EntityAudit, Generation, HexColor, UrlString } from "./shared";

export type CharacterId = BrandedId<"CharacterId">;

export const CHARACTER_TAGS = [
  "Main Character",
  "Secondary",
  "Reboot",
  "Movie Character",
  "Webisode Only",
] as const;
export type CharacterTag = (typeof CHARACTER_TAGS)[number] | string;

export interface CharacterSummary {
  id: CharacterId;
  name: string;
  species: string;
  releaseCount?: number;
  imageUrl?: UrlString;
  accentColor?: HexColor;
}

export interface Character extends CharacterSummary, EntityAudit {
  origin?: string;
  generations?: Generation[];
  seriesAppearances?: string[];
  tags?: CharacterTag[];
}
