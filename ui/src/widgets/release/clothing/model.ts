import type { ReleaseDetailsItem } from "@/entities/release/model";

export type ClothingGroupKey = "layer" | "footwear" | "accessory" | "other";

export const getClothingDisplayName = (key: string) => {
  if (!key) return "-";
  const displayNameMap: Record<string, string> = {
    dress: "Dress",
    jacket: "Varsity Jacket",
    shoes: "Chunky Sandals",
    bracelet: "Bracelet",
    earrings: "Earrings",
    hairpins: "Hair Barrettes",
  };

  return (
    displayNameMap[key] ??
    key.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase())
  );
};

export const getClothingCategory = (key: string) => {
  if (!key) return "-";
  const categoryMap: Record<string, string> = {
    dress: "OUTFIT",
    jacket: "LAYER",
    shoes: "FOOTWEAR",
    bracelet: "ACCESSORY",
    earrings: "ACCESSORY",
    hairpins: "HAIR",
  };

  return categoryMap[key] ?? "CLOTHING";
};

const getProductDetail = (items: ReleaseDetailsItem[], key: string) =>
  items.find((item) => item.key === key)?.value ?? "-";

export function buildClothingModel(clothingKeys: string[], productDetails: ReleaseDetailsItem[]) {
  if (!clothingKeys.length) {
    return {
      ordered: [],
      primary: "",
      groups: { layer: [], footwear: [], accessory: [], other: [] },
      summary: {
        primaryOutfit: getProductDetail(productDetails, "primary_outfit"),
        secondaryPiece: getProductDetail(productDetails, "secondary_piece"),
        accessoriesText: getProductDetail(productDetails, "accessories"),
        footwearText: getProductDetail(productDetails, "footwear"),
      },
      specStrip: [],
      accessoryIsLong: false,
    };
  }
  const primaryKeyPreferred = "dress";
  const ordered = [...clothingKeys];
  const primary = ordered.includes(primaryKeyPreferred)
    ? primaryKeyPreferred
    : ordered[0];
  const rest = ordered.filter((item) => item !== primary);

  const groupOf = (key: string): ClothingGroupKey => {
    const cat = getClothingCategory(key).toLowerCase();
    if (cat.includes("layer")) return "layer";
    if (cat.includes("footwear")) return "footwear";
    if (cat.includes("accessory") || cat.includes("hair")) return "accessory";
    return "other";
  };

  const groups = rest.reduce(
    (acc, key) => {
      acc[groupOf(key)].push(key);
      return acc;
    },
    { layer: [] as string[], footwear: [] as string[], accessory: [] as string[], other: [] as string[] }
  );

  const summary = {
    primaryOutfit: getProductDetail(productDetails, "primary_outfit"),
    secondaryPiece: getProductDetail(productDetails, "secondary_piece"),
    accessoriesText: getProductDetail(productDetails, "accessories"),
    footwearText: getProductDetail(productDetails, "footwear"),
  };

  const specStrip = [
    { label: "Pieces", value: String(ordered.length) },
    { label: "Primary", value: getClothingDisplayName(primary) },
    { label: "Layer", value: groups.layer.length ? getClothingDisplayName(groups.layer[0]) : "-" },
    { label: "Footwear", value: groups.footwear.length ? getClothingDisplayName(groups.footwear[0]) : "-" },
  ];

  return {
    ordered,
    primary,
    groups,
    summary,
    specStrip,
    accessoryIsLong: groups.accessory.length > 4,
  };
}
