import type { Release } from "./types";

// DESIGN-ONLY: placeholder content until real API data is wired.
export const demoRelease: Release = {
  id: "twyla-fearbook-2024",
  title: "Twyla - Fearbook",
  subtitle: "2024 - Fearbook Series - Target Exclusive",
  description: `Twyla has long curly blue hair with purple streaks running through it. Her pale purple complexion is accentuated by her bold purple lips and purple, blue, and pink eyeshadow.

She wears a sleeveless purple dress adorned with ruffles and black designs. She also comes with a blue Ghoulish Gamers varsity jacket.

Additional fashion accessories include a blue bracelet and black bug barrettes. On her feet are chunky blue sandals with purple bows on the side.

Twyla is the leader of the Ghoulish Gamers club at Monster High. She comes with a yearbook and everything for the perfect game night including Boo Crisp cookies, a Humans in High School board game with dice, playing pieces, and a handbook.`,
  gallery: [
    "/demo/release/twyla.png",
    "/demo/release/twyla.png",
    "/demo/release/twyla.png",
    "/demo/release/twyla.png",
    "/demo/release/twyla.png",
    "/demo/release/twyla.png",
  ],
  character: "Twyla",
  series: "Fearbook",
  year: "2024",
  exclusive: "Target Exclusive",
  modelNumber: "HXW31",
  stats: {
    releaseDate: "2024",
    rarity: "Target Exclusive",
    originalMsrp: "$24.99",
    marketValue: "$42.00",
    marketTrend: "up",
    marketDeltaPct: 68.1,
  },
  details: {
    general: [
      { key: "character", label: "Character", value: "Twyla" },
      { key: "series", label: "Series", value: "Fearbook" },
      { key: "gender", label: "Gender", value: "Ghoul" },
      { key: "released_year", label: "Released", value: "2024" },
      { key: "exclusive_of", label: "Exclusive", value: "Target" },
      { key: "model_number", label: "Model Number", value: "HXW31" },
      { key: "manufacturer", label: "Manufacturer", value: "Mattel" },
      { key: "line", label: "Line", value: "Monster High" },
      { key: "release_type", label: "Release Type", value: "Single Doll" },
      { key: "gallery_count", label: "Gallery Count", value: "6 images" },
    ],
    product: [
      { key: "primary_outfit", label: "Primary Outfit", value: "Sleeveless purple dress with ruffles and black designs" },
      { key: "secondary_piece", label: "Secondary Piece", value: "Blue Ghoulish Gamers varsity jacket" },
      { key: "accessories", label: "Accessories", value: "Blue bracelet, black bug barrettes" },
      { key: "footwear", label: "Footwear", value: "Chunky blue sandals with purple bows" },
    ],
    physical: [
      { key: "hair", label: "Hair", value: "Long curly blue hair with purple streaks" },
      { key: "hair_type", label: "Hair Type", value: "Curly" },
      { key: "complexion", label: "Complexion", value: "Pale purple" },
      { key: "makeup", label: "Makeup", value: "Purple lips; purple, blue and pink eyeshadow" },
      { key: "palette", label: "Palette", value: "Purple and blue with black accents" },
      { key: "silhouette", label: "Silhouette", value: "Dress-based outfit with layered outerwear" },
    ],
  },
  clothing: [
    "dress",
    "jacket",
    "shoes",
    "bracelet",
    "earrings",
    "hairpins",
  ],
  items: [
    "fearbook",
    "boo-srisp",
    "scrisps",
    "dnd-dice-blue",
    "dnd-dice-purple",
    "dnd-map",
    "dnd-shift",
  ],
  listings: [
    {
      id: "listing-1",
      title: "Fearbook Twyla Doll",
      seller: "GhoulMarket",
      condition: "New in box",
      price: "$45.00",
      shipping: "$6.50 shipping",
      image: "/demo/release/twyla.png",
      source: "Marketplace",
    },
    {
      id: "listing-2",
      title: "Twyla Fearbook + Accessories",
      seller: "Creepover Club",
      condition: "New",
      price: "$49.99",
      shipping: "Free shipping",
      image: "/demo/release/twyla.png",
      source: "Collector",
    },
    {
      id: "listing-3",
      title: "Fearbook Twyla Complete Set",
      seller: "Midnight Toys",
      condition: "Like new",
      price: "$52.00",
      shipping: "$8.00 shipping",
      image: "/demo/release/twyla.png",
      source: "Resale",
    },
    {
      id: "listing-4",
      title: "Twyla Fearbook Target Exclusive",
      seller: "Exclusive Finds",
      condition: "Sealed",
      price: "$58.00",
      shipping: "$5.00 shipping",
      image: "/demo/release/twyla.png",
      source: "Retail",
    },
  ],
};
