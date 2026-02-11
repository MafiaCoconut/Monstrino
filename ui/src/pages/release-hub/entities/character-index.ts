import type { Generation, UrlString } from "./shared";
import type { CharacterId } from "./character";
import type { ReleaseId } from "./release";

export type CharacterIndexReleaseEdition = "main" | "special" | string;

export interface CharacterIndexEasterEgg {
  icon: string;
  text: string;
}

export interface CharacterIndexRelease {
  id: ReleaseId | string | number;
  name: string;
  year: number;
  series: string;
  edition: CharacterIndexReleaseEdition;
  image: UrlString;
}

export interface CharacterIndexVariant {
  id: string | number;
  name: string;
  image: UrlString;
}

export interface CharacterIndexRelationship {
  name: string;
  role: string;
  link: UrlString;
}

export interface CharacterIndexPetRelationship {
  name: string;
  species: string;
  link: UrlString;
  image?: UrlString;
}

export interface CharacterIndexRelationships {
  family: CharacterIndexRelationship[];
  friends: CharacterIndexRelationship[];
  romantic: CharacterIndexRelationship[];
  pets: CharacterIndexPetRelationship[];
}

export interface CharacterIndexTimelineItem {
  year: number;
  event: string;
}

export interface CharacterIndexTriviaItem {
  category: string;
  text: string;
  source?: string;
}

export interface CharacterIndexCommunityItem {
  type: string;
  title: string;
  count: number;
  link: UrlString;
}

export interface CharacterIndexData {
  id?: CharacterId;
  name: string;
  alternativeNames: string[];
  tagline: string;
  generations: Generation[];
  species: string;
  age: string;
  birthday: string;
  debutYear: number;
  releaseCount: number;
  signatureColors: string[];
  motifs: string[];

  heroImage: UrlString;
  officialDescription: string;
  biography: string;
  easterEggs: CharacterIndexEasterEgg[];

  releases: CharacterIndexRelease[];
  variants: CharacterIndexVariant[];
  relationships: CharacterIndexRelationships;
  timeline: CharacterIndexTimelineItem[];
  trivia: CharacterIndexTriviaItem[];
  communityContent: CharacterIndexCommunityItem[];
}
