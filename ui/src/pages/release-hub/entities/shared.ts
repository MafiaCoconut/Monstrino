export type BrandedId<T extends string> = string & { readonly __brand: T };

export type ISODateString = string;
export type UrlString = string;
export type HexColor = `#${string}`;

export const GENERATIONS = ["G1", "G2", "G3"] as const;
export type Generation = (typeof GENERATIONS)[number];

export interface EntityAudit {
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
}

export interface EntityRef<TId extends string = string> {
  id: TId;
  name: string;
}
