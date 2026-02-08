/* Auto-generated mock data from DB exports.
Source: release_schema.csv

Null normalization:
- "(null)" -> null

Some tables in the export did not include headers, so some column names are inferred by position.
*/
export const releaseCharacterRoles = [
    {
      "id": 1,
      "name": "main",
      "description": "The primary character featured in the release.",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 2,
      "name": "secondary",
      "description": "A supporting character included as an accessory or packmate.",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 3,
      "name": "variant",
      "description": "An alternate version of an existing character (e.g. color or outfit variant).",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    }
  ] as const;
export const releaseExclusives = [
    {
      "id": 1,
      "slug": "amazon",
      "name": "Amazon",
      "description": "Exclusive release available only on Amazon.",
      "imageUrl": "https://example.com/images/amazon_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 2,
      "slug": "costco",
      "name": "Costco",
      "description": "Exclusive release available only at Costco.",
      "imageUrl": "https://example.com/images/costco_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 3,
      "slug": "entertainment-earth",
      "name": "Entertainment Earth",
      "description": "Exclusive release available through Entertainment Earth.",
      "imageUrl": "https://example.com/images/entertainment_earth_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 4,
      "slug": "fang-club",
      "name": "Fang Club",
      "description": "Exclusive release for members of the Fang Club.",
      "imageUrl": "https://example.com/images/fang_club_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 5,
      "slug": "jcpenney",
      "name": "JCPenney",
      "description": "Exclusive release available at JCPenney stores.",
      "imageUrl": "https://example.com/images/jcpenney_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 6,
      "slug": "justice",
      "name": "Justice",
      "description": "Exclusive release available at Justice.",
      "imageUrl": "https://example.com/images/justice_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 7,
      "slug": "kmart",
      "name": "Kmart",
      "description": "Exclusive release available at Kmart.",
      "imageUrl": "https://example.com/images/kmart_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 8,
      "slug": "kohls",
      "name": "Kohl's",
      "description": "Exclusive release available at Kohl's.",
      "imageUrl": "https://example.com/images/kohls_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 9,
      "slug": "mattel-creations",
      "name": "Mattel Creations",
      "description": "Collector-exclusive release from Mattel Creations.",
      "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 10,
      "slug": "mattel-shop",
      "name": "Mattel Shop",
      "description": "Exclusive release available via the official Mattel Shop.",
      "imageUrl": "https://example.com/images/mattel_shop_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 11,
      "slug": "sams-club",
      "name": "Sam's Club",
      "description": "Exclusive release available at Sam's Club.",
      "imageUrl": "https://example.com/images/sams_club_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 12,
      "slug": "san-diego-comic-con",
      "name": "San Diego Comic-Con",
      "description": "Convention-exclusive release for San Diego Comic-Con.",
      "imageUrl": "https://example.com/images/sdcc_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 13,
      "slug": "target",
      "name": "Target",
      "description": "Exclusive release available at Target.",
      "imageUrl": "https://example.com/images/target_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 14,
      "slug": "toys-r-us",
      "name": "Toys\"R\"Us",
      "description": "Exclusive release available at Toys\"R\"Us.",
      "imageUrl": "https://example.com/images/toysrus_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 15,
      "slug": "walmart",
      "name": "Walmart",
      "description": "Exclusive release available at Walmart.",
      "imageUrl": "https://example.com/images/walmart_exclusive.jpg",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    }
  ] as const;
export const releaseTypes = [
    {
      "id": 1,
      "slug": "reissue",
      "name": "Reissue",
      "description": "Indicates a later re-release of a previous doll or pack.",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 2,
      "slug": "variant",
      "name": "Variant",
      "description": "Represents a variation of a release (e.g., color or packaging differences).",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    },
    {
      "id": 3,
      "slug": "collection_inclusion",
      "name": "Collection Inclusion",
      "description": "Marks that this release is part of a specific collection or subline.",
      "updatedAt": "2026-01-04 20:46:23",
      "createdAt": "2026-01-04 20:46:23"
    }
  ] as const;
export const contentTypes = [
    {
      "id": 1,
      "slug": "doll-figure",
      "name": "Doll Figure",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 2,
      "slug": "playset",
      "name": "Playset",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 3,
      "slug": "plush",
      "name": "Plush",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 4,
      "slug": "vinyl-figure",
      "name": "Vinyl Figure",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 5,
      "slug": "mini-figure",
      "name": "Mini Figure",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 6,
      "slug": "construction-set",
      "name": "Construction Set",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 7,
      "slug": "fashion-pack",
      "name": "Fashion Pack",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 8,
      "slug": "stationery",
      "name": "Stationery",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 9,
      "slug": "ornament",
      "name": "Ornament",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 10,
      "slug": "custom-kit",
      "name": "Custom Kit",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 11,
      "slug": "creature-figure",
      "name": "Creature Figure",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 12,
      "slug": "vehicle",
      "name": "Vehicle",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 13,
      "slug": "pet-figure",
      "name": "Pet Figure",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 14,
      "slug": "digital-toy",
      "name": "Digital Toy",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 15,
      "slug": "funko-pop",
      "name": "Funko Pop",
      "group": "content",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 16,
      "slug": "1-pack",
      "name": "1 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 17,
      "slug": "2-pack",
      "name": "2 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 18,
      "slug": "3-pack",
      "name": "3 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 19,
      "slug": "4-pack",
      "name": "4 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 20,
      "slug": "5-pack",
      "name": "5 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 21,
      "slug": "6-pack",
      "name": "6 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 22,
      "slug": "7-pack",
      "name": "7 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 23,
      "slug": "8-pack",
      "name": "8 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 24,
      "slug": "9-pack",
      "name": "9 Pack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 25,
      "slug": "multipack",
      "name": "Multipack",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 26,
      "slug": "pack-gift-set",
      "name": "Gift Set",
      "group": "packaging",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 27,
      "slug": "tier-budget",
      "name": "Budget",
      "group": "tier",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 28,
      "slug": "tier-standard",
      "name": "Standard",
      "group": "tier",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 29,
      "slug": "tier-deluxe",
      "name": "Deluxe",
      "group": "tier",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    },
    {
      "id": 30,
      "slug": "tier-collector",
      "name": "Collector",
      "group": "tier",
      "updatedAt": "2026-01-04 20:46:19",
      "createdAt": "2026-01-04 20:46:19"
    }
  ] as const;
export const series = [
    {
        "id": 1,
        "slug": "13-wishes",
        "name": "13 Wishes",
        "description": "Gigi Grant has helped everyone dress up for a Moroccan themed party where the ghouls will dance all night. This series is comprised of two lines: 13 Wishes and 13 Wishes – Haunt the Casbah.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:13",
        "createdAt": "2026-01-05 22:37:13"
    },
    {
        "id": 2,
        "slug": "art-class",
        "name": "Art Class",
        "description": "The students of Monster High are studying their favorite forms of art. Styles include ice sculpting, painting, pottery, and metalworking.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:14",
        "createdAt": "2026-01-05 22:37:14"
    },
    {
        "id": 3,
        "slug": "ballerina-ghouls",
        "name": "Ballerina Ghouls",
        "description": "The ghouls of Monster High are participating in performance art and they are wearing beautiful ballet dresses and leotards.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:14",
        "createdAt": "2026-01-05 22:37:14"
    },
    {
        "id": 4,
        "slug": "basic",
        "name": "Basic",
        "description": "Ghouls wearing simple yet adorable outfits that exemplify their personal styles. This series features budget dolls with simplified forms that lack elbow and wrist joints,",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:15",
        "createdAt": "2026-01-05 22:37:15"
    },
    {
        "id": 5,
        "slug": "basic-fashion",
        "name": "Basic Fashion",
        "description": "Four fangtastic dresses and a variety of accessories are included in this unnamed series. The fashion packs may be budget friendly, but they don’t lack style.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:15",
        "createdAt": "2026-01-05 22:37:15"
    },
    {
        "id": 6,
        "slug": "boo-york-boo-york",
        "name": "Boo York, Boo York",
        "description": "Cleo is heads to Boo York and brings some of her most terrorific friends. While there they attend a fancy gala and meet some amazingly awesome ghouls.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:15",
        "createdAt": "2026-01-05 22:37:15"
    },
    {
        "id": 7,
        "slug": "boo-york-boo-york",
        "name": "Boo York, Boo York",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "6",
        "updatedAt": "2026-01-05 22:37:16",
        "createdAt": "2026-01-05 22:37:16"
    },
    {
        "id": 8,
        "slug": "city-schemes",
        "name": "City Schemes",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "6",
        "updatedAt": "2026-01-05 22:37:16",
        "createdAt": "2026-01-05 22:37:16"
    },
    {
        "id": 9,
        "slug": "frightseers",
        "name": "Frightseers",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "6",
        "updatedAt": "2026-01-05 22:37:16",
        "createdAt": "2026-01-05 22:37:16"
    },
    {
        "id": 10,
        "slug": "gala-ghoulfriends",
        "name": "Gala Ghoulfriends",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "6",
        "updatedAt": "2026-01-05 22:37:17",
        "createdAt": "2026-01-05 22:37:17"
    },
    {
        "id": 11,
        "slug": "boo-riginal-creeproduction",
        "name": "Boo-riginal Creeproduction",
        "description": "The original ghouls of Monster High are back. Each ghoul is a reproduction of the original doll with all her fangtastic accessories.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:17",
        "createdAt": "2026-01-05 22:37:17"
    },
    {
        "id": 12,
        "slug": "brand-boo-students",
        "name": "Brand-Boo Students",
        "description": "More students are participating in the monster exchange at Monster High. It’s always exciting to meet new students from around the world.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:18",
        "createdAt": "2026-01-05 22:37:18"
    },
    {
        "id": 13,
        "slug": "buried-secrets",
        "name": "Buried Secrets",
        "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:18",
        "createdAt": "2026-01-05 22:37:18"
    },
    {
        "id": 14,
        "slug": "buried-secrets",
        "name": "Buried Secrets",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "13",
        "updatedAt": "2026-01-05 22:37:18",
        "createdAt": "2026-01-05 22:37:18"
    },
    {
        "id": 15,
        "slug": "cozy-creepover",
        "name": "Cozy Creepover",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "13",
        "updatedAt": "2026-01-05 22:37:19",
        "createdAt": "2026-01-05 22:37:19"
    },
    {
        "id": 16,
        "slug": "haunted-dance",
        "name": "Haunted Dance",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "13",
        "updatedAt": "2026-01-05 22:37:19",
        "createdAt": "2026-01-05 22:37:19"
    },
    {
        "id": 17,
        "slug": "scaremester",
        "name": "Scaremester",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "13",
        "updatedAt": "2026-01-05 22:37:20",
        "createdAt": "2026-01-05 22:37:20"
    },
    {
        "id": 18,
        "slug": "classroom",
        "name": "Classroom",
        "description": "The students of Monster High have dressed up for their specialized classes. They will be attending Home Ick, Mad Science, and Physical Deaducation. “Classroom” is not found on the packaging of individual dolls, but it is the name of the series. Cases of the dolls are labeled “Class",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:20",
        "createdAt": "2026-01-05 22:37:20"
    },
    {
        "id": 19,
        "slug": "coffin-bean",
        "name": "Coffin Bean",
        "description": "After school the students of Monster High like to hang out at the Maul. Today they are relaxing at the Coffin Bean where there are delicious drinks and ghoulish snacks.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:20",
        "createdAt": "2026-01-05 22:37:20"
    },
    {
        "id": 20,
        "slug": "comic-book",
        "name": "Comic Book",
        "description": "The ghouls of Monster High are wearing outfits inspired by the pages of comic books.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:20",
        "createdAt": "2026-01-05 22:37:20"
    },
    {
        "id": 21,
        "slug": "complete-look",
        "name": "Complete Look",
        "description": "This series features fashion packs with complete outfits. Each outfit has a dress, or a top and bottom, jewelry, shoes, and a purse.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:21",
        "createdAt": "2026-01-05 22:37:21"
    },
    {
        "id": 22,
        "slug": "creepateria",
        "name": "Creepateria",
        "description": "It’s lunch time for the students of Monster High. They have filled their coffin-shaped trays with haunt dogs, sand-witches, and other creepy cool foods.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:21",
        "createdAt": "2026-01-05 22:37:21"
    },
    {
        "id": 23,
        "slug": "creepover-party",
        "name": "Creepover Party",
        "description": "The ghouls of Monster High are hanging out and having a slumber party. A night of food, fun, and makeovers.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:21",
        "createdAt": "2026-01-05 22:37:21"
    },
    {
        "id": 24,
        "slug": "dance-class",
        "name": "Dance Class",
        "description": "The students of Monster High are ready to take part in a dance performance. Dance styles include tap, ballet, and hip-hop and they are wearing outfits to match.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:22",
        "createdAt": "2026-01-05 22:37:22"
    },
    {
        "id": 25,
        "slug": "dawn-of-the-dance",
        "name": "Dawn of the Dance",
        "description": "Students of Monster high are showing off their most frighteningly fabulous fashions at the biggest bash of the year. Everyone living or dead wants an invitation to the dance.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:22",
        "createdAt": "2026-01-05 22:37:22"
    },
    {
        "id": 26,
        "slug": "day-out",
        "name": "Day Out",
        "description": "The ghouls from Monster High are ready for a day out where they shop, relax, wear their favorite outfits, and hang out with friends.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:22",
        "createdAt": "2026-01-05 22:37:22"
    },
    {
        "id": 27,
        "slug": "day-to-night-fashion",
        "name": "Day-To-Night Fashion",
        "description": "This series features ghouls with multiple pieces of clothing and accessories. The clothes can be mixed and matched to create amazing outfits for school or a night out with friends.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:23",
        "createdAt": "2026-01-05 22:37:23"
    },
    {
        "id": 28,
        "slug": "dead-tired",
        "name": "Dead Tired",
        "description": "Some of the students of Monster high are getting together for a sleepover. Hanging out and having fun with friends means their clothes can’t just be comfy. Their PJs have to be fashionable as well.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:23",
        "createdAt": "2026-01-05 22:37:23"
    },
    {
        "id": 29,
        "slug": "deluxe-fashion",
        "name": "Deluxe Fashion",
        "description": "There are four fabulous collections in this unnamed series. Each deluxe pack includes two outfits and multiple accessories that are perfect for the most stylish monsters.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:23",
        "createdAt": "2026-01-05 22:37:23"
    },
    {
        "id": 30,
        "slug": "designer-series",
        "name": "Designer Series",
        "description": "Monster High characters that are straight from the minds of Mattel’s in-house designers.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:24",
        "createdAt": "2026-01-05 22:37:24"
    },
    {
        "id": 31,
        "slug": "dessert",
        "name": "Dessert",
        "description": "The ghouls are looking delicious in the dessert-themed outfits.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:24",
        "createdAt": "2026-01-05 22:37:24"
    },
    {
        "id": 32,
        "slug": "dot-dead-gorgeous",
        "name": "Dot Dead Gorgeous",
        "description": "Monster High is having a party and the theme is polka dots. Everyone is wearing spectacular outfits that feature lots and lots of dots.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:24",
        "createdAt": "2026-01-05 22:37:24"
    },
    {
        "id": 33,
        "slug": "electrified",
        "name": "Electrified",
        "description": "Clawdeen opens a hair salon at an old power station and the hair styles that are created are electrifying.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:25",
        "createdAt": "2026-01-05 22:37:25"
    },
    {
        "id": 34,
        "slug": "hair-raising-ghouls",
        "name": "Hair-Raising Ghouls",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "33",
        "updatedAt": "2026-01-05 22:37:25",
        "createdAt": "2026-01-05 22:37:25"
    },
    {
        "id": 35,
        "slug": "high-voltage",
        "name": "High Voltage",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "33",
        "updatedAt": "2026-01-05 22:37:25",
        "createdAt": "2026-01-05 22:37:25"
    },
    {
        "id": 36,
        "slug": "monstrous-hair-ghouls",
        "name": "Monstrous Hair Ghouls",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "33",
        "updatedAt": "2026-01-05 22:37:26",
        "createdAt": "2026-01-05 22:37:26"
    },
    {
        "id": 37,
        "slug": "emoji",
        "name": "Emoji",
        "description": "The ghouls have created outfits inspired by the ideograms everyone loves to use while messaging.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:26",
        "createdAt": "2026-01-05 22:37:26"
    },
    {
        "id": 38,
        "slug": "faboolous-pets",
        "name": "Faboolous Pets",
        "description": "The ghouls of Monster High are heading out for a day of shopping, and they’re not alone – their adorable pets are coming along too!",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:26",
        "createdAt": "2026-01-05 22:37:26"
    },
    {
        "id": 39,
        "slug": "fang-vote",
        "name": "Fang Vote",
        "description": "The Fang Vote series allows fans to decide what Monster High doll will be created. Voting decides the character, hair & makeup, shoes, and accessories.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:27",
        "createdAt": "2026-01-05 22:37:27"
    },
    {
        "id": 40,
        "slug": "fangtastic-fitness",
        "name": "Fangtastic Fitness",
        "description": "This series features ghouls dressed for their favorite fitness activities. Even ghouls want to be fit and healthy.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:27",
        "createdAt": "2026-01-05 22:37:27"
    },
    {
        "id": 41,
        "slug": "fearbook",
        "name": "Fearbook",
        "description": "Fearbook features Monster High students dressed to impress for their photos. Each sports a varsity jacket and has everything needed to participate in their favorite club.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:27",
        "createdAt": "2026-01-05 22:37:27"
    },
    {
        "id": 42,
        "slug": "fearleading",
        "name": "Fearleading",
        "description": "Fans will go crazy when these fearleaders rally their team to victory. Join the fun and show off your school spirit with these Toys”R”Us exclusives. Go Monster High Team!",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:28",
        "createdAt": "2026-01-05 22:37:28"
    },
    {
        "id": 43,
        "slug": "fierce-rockers",
        "name": "Fierce Rockers",
        "description": "Catty Noir, Toralei, and other ghouls are putting on a concert that will make you scream.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:28",
        "createdAt": "2026-01-05 22:37:28"
    },
    {
        "id": 44,
        "slug": "freak-du-chic",
        "name": "Freak Du Chic",
        "description": "The Freak Du Chic circus has come to town and the ghouls are throwing a party to celebrate. Each ghoul is dressed in amazing circus themed outfits.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:28",
        "createdAt": "2026-01-05 22:37:28"
    },
    {
        "id": 45,
        "slug": "freaky-field-trip",
        "name": "Freaky Field Trip",
        "description": "The students of Monster High are going on field trips. They are wearing themed outfits for visits to a planetarium, an aquarium, and the Unnatural History Museum.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:29",
        "createdAt": "2026-01-05 22:37:29"
    },
    {
        "id": 46,
        "slug": "freaky-fusion",
        "name": "Freaky Fusion",
        "description": "When ghouls are fused together and create never-before-seen monsters you have a Freaky Fusion! There are several sub-series with a variety of fantastic twists.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:29",
        "createdAt": "2026-01-05 22:37:29"
    },
    {
        "id": 47,
        "slug": "freaky-fusion",
        "name": "Freaky Fusion",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "46",
        "updatedAt": "2026-01-05 22:37:29",
        "createdAt": "2026-01-05 22:37:29"
    },
    {
        "id": 48,
        "slug": "fusion-inspired-ghouls",
        "name": "Fusion-Inspired Ghouls",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "46",
        "updatedAt": "2026-01-05 22:37:30",
        "createdAt": "2026-01-05 22:37:30"
    },
    {
        "id": 49,
        "slug": "save-frankie",
        "name": "Save Frankie!",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "46",
        "updatedAt": "2026-01-05 22:37:30",
        "createdAt": "2026-01-05 22:37:30"
    },
    {
        "id": 50,
        "slug": "hybrids",
        "name": "Hybrids",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "46",
        "updatedAt": "2026-01-05 22:37:30",
        "createdAt": "2026-01-05 22:37:30"
    },
    {
        "id": 51,
        "slug": "freaky-fusions",
        "name": "Freaky Fusions",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "46",
        "updatedAt": "2026-01-05 22:37:31",
        "createdAt": "2026-01-05 22:37:31"
    },
    {
        "id": 52,
        "slug": "frightfully-tall-ghouls",
        "name": "Frightfully Tall Ghouls",
        "description": "This series features larger than un-life dolls. Each ghoul stands 17 inches tall and is wearing her signature outfit.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:31",
        "createdAt": "2026-01-05 22:37:31"
    },
    {
        "id": 53,
        "slug": "frights-camera-action",
        "name": "Frights, Camera, Action!",
        "description": "The ghouls of Monster High head to Hauntlywood where they go behind the scenes and meet some of the most monstrous celebrities. This series is comprised of two subseries.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:31",
        "createdAt": "2026-01-05 22:37:31"
    },
    {
        "id": 54,
        "slug": "frights-camera-action",
        "name": "Frights, Camera, Action!",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "53",
        "updatedAt": "2026-01-05 22:37:31",
        "createdAt": "2026-01-05 22:37:31"
    },
    {
        "id": 55,
        "slug": "black-carpet",
        "name": "Black Carpet",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "53",
        "updatedAt": "2026-01-05 22:37:31",
        "createdAt": "2026-01-05 22:37:31"
    },
    {
        "id": 56,
        "slug": "hauntlywood",
        "name": "Hauntlywood",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "53",
        "updatedAt": "2026-01-05 22:37:31",
        "createdAt": "2026-01-05 22:37:31"
    },
    {
        "id": 57,
        "slug": "garden-ghouls",
        "name": "Garden Ghouls",
        "description": "This series features a tree nymph and ghouls that have been sprinkled with mystical pollen which causes them to sprout wings.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:31",
        "createdAt": "2026-01-05 22:37:31"
    },
    {
        "id": 58,
        "slug": "garden-ghouls",
        "name": "Garden Ghouls",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "57",
        "updatedAt": "2026-01-05 22:37:31",
        "createdAt": "2026-01-05 22:37:31"
    },
    {
        "id": 59,
        "slug": "winged-critters",
        "name": "Winged Critters",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "57",
        "updatedAt": "2026-01-05 22:37:32",
        "createdAt": "2026-01-05 22:37:32"
    },
    {
        "id": 60,
        "slug": "wings",
        "name": "Wings",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "57",
        "updatedAt": "2026-01-05 22:37:32",
        "createdAt": "2026-01-05 22:37:32"
    },
    {
        "id": 61,
        "slug": "geek-shriek",
        "name": "Geek Shriek",
        "description": "The ghouls have embraced their inner geek. It is now fashionably cool to look smart and stylish.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:32",
        "createdAt": "2026-01-05 22:37:32"
    },
    {
        "id": 62,
        "slug": "generation-3",
        "name": "Generation 3",
        "description": "This series welcomes a new class of ghouls to Monster High. These classic characters have been reimaged for a new generation.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:32",
        "createdAt": "2026-01-05 22:37:32"
    },
    {
        "id": 63,
        "slug": "ghostly-tea-party",
        "name": "Ghostly Tea Party",
        "description": "The ghouls of Monster high are having a tea party. They are wearing spectacular outfits and snacking on ghoulish treats. Note: Although promotional images were distributed, Ghostly Tea Party dolls were never released.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:32",
        "createdAt": "2026-01-05 22:37:32"
    },
    {
        "id": 64,
        "slug": "ghoul-fair",
        "name": "Ghoul Fair",
        "description": "The Monster High school dance has been cancelled and the students are having a fundraiser to bring it back. They are selling balloons, cake pops, harshmallows, and car washes.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 65,
        "slug": "ghoul-spirit",
        "name": "Ghoul Spirit",
        "description": "The ghouls of Monster High are showing their school spirit at the pep rally. They are building excitement with bullhorns and by waving pompoms, pennants, and foam fingers.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 66,
        "slug": "ghoul-sports",
        "name": "Ghoul Sports",
        "description": "The ghouls of Monster High are participating in their favorite sports. Their extra-scaricular activities include baseball, soccer, and tennis.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 67,
        "slug": "ghouls-alive",
        "name": "Ghoul’s Alive!",
        "description": "They’re alive! These dolls have more than just awesome outfits. They come to life with spooktacular lights and sounds.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 68,
        "slug": "ghouls-beast-pet",
        "name": "Ghoul’s Beast Pet",
        "description": "The ghouls have new friends and they are adorable pets. There is a kitten, puppy, turtle, wolf pup, and teddy bear.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 69,
        "slug": "ghouls-night-out",
        "name": "Ghoul’s Night Out",
        "description": "Most ghouls love the night and the students of Monster High are no exception. They have dressed up in spectacular outfits and are ready for a night out on the town.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 70,
        "slug": "ghouls-rule",
        "name": "Ghouls Rule",
        "description": "The girls are celebrating Halloween with spook-tacular costumes that also pay tribute to their heritage.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 71,
        "slug": "ghouls-getaway",
        "name": "Ghouls’ Getaway",
        "description": "The ghouls have taken a vacation to a tropical paradise where they can have fun and relax.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 72,
        "slug": "gloom-and-bloom",
        "name": "Gloom and Bloom",
        "description": "A party is underway that celebrates the blooming of the corpse flower, an event that happens once every 1300 years! All the ghouls are wearing amazing floral-themed outfits for the occasion.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:33",
        "createdAt": "2026-01-05 22:37:33"
    },
    {
        "id": 73,
        "slug": "gloom-beach",
        "name": "Gloom Beach",
        "description": "Get ready for fun in the sun. Some of the students from Monster High are heading to the beach. They are wearing their favorite suits and are going to soak up some gloom.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:34",
        "createdAt": "2026-01-05 22:37:34"
    },
    {
        "id": 74,
        "slug": "gore-geous-accessories",
        "name": "Gore-geous Accessories",
        "description": "Ghouls love clothes but they also love accessories, especially purses. Each ghoul has multiple purses for her terrorific ensemble.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:34",
        "createdAt": "2026-01-05 22:37:34"
    },
    {
        "id": 75,
        "slug": "great-scarrier-reef",
        "name": "Great Scarrier Reef",
        "description": "The ghouls of Monster High have been pulled through a whirlpool to the Great Scarrier Reef. Not only are they away from home, they have acquired aquatic traits for the undersea world.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:34",
        "createdAt": "2026-01-05 22:37:34"
    },
    {
        "id": 76,
        "slug": "great-scarrier-reef",
        "name": "Great Scarrier Reef",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "75",
        "updatedAt": "2026-01-05 22:37:34",
        "createdAt": "2026-01-05 22:37:34"
    },
    {
        "id": 77,
        "slug": "down-under-ghouls",
        "name": "Down Under Ghouls",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "75",
        "updatedAt": "2026-01-05 22:37:34",
        "createdAt": "2026-01-05 22:37:34"
    },
    {
        "id": 78,
        "slug": "glowsome-ghoulfish",
        "name": "Glowsome Ghoulfish",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "75",
        "updatedAt": "2026-01-05 22:37:34",
        "createdAt": "2026-01-05 22:37:34"
    },
    {
        "id": 79,
        "slug": "haunt-couture",
        "name": "Haunt Couture",
        "description": "Haunt Couture brings back the original ghouls and takes them from the hallways of Monster High to fashion runways. Each ghoul wears a reimagined version of her vintage high school outfit.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:35",
        "createdAt": "2026-01-05 22:37:35"
    },
    {
        "id": 80,
        "slug": "haunt-couture",
        "name": "Haunt Couture",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "79",
        "updatedAt": "2026-01-05 22:37:35",
        "createdAt": "2026-01-05 22:37:35"
    },
    {
        "id": 81,
        "slug": "midnight-runway",
        "name": "Midnight Runway",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "79",
        "updatedAt": "2026-01-05 22:37:35",
        "createdAt": "2026-01-05 22:37:35"
    },
    {
        "id": 82,
        "slug": "haunted",
        "name": "Haunted",
        "description": "Haunted is based upon an adventure where the ghouls of Monster High follow Spectra Vondergest to Ghost World. They meet spooky new friends and visit Haunted High, the all-spirit school.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:35",
        "createdAt": "2026-01-05 22:37:35"
    },
    {
        "id": 83,
        "slug": "getting-ghostly",
        "name": "Getting Ghostly",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "82",
        "updatedAt": "2026-01-05 22:37:35",
        "createdAt": "2026-01-05 22:37:35"
    },
    {
        "id": 84,
        "slug": "student-spirits",
        "name": "Student Spirits",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "82",
        "updatedAt": "2026-01-05 22:37:36",
        "createdAt": "2026-01-05 22:37:36"
    },
    {
        "id": 85,
        "slug": "how-do-you-boo",
        "name": "How Do You Boo?",
        "description": "This series introduces some of the most popular ghouls that attend Monster High. These ghouls embrace what makes them unique and show that it is okay to be different.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:36",
        "createdAt": "2026-01-05 22:37:36"
    },
    {
        "id": 86,
        "slug": "how-do-you-boo",
        "name": "How Do You Boo?",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "85",
        "updatedAt": "2026-01-05 22:37:36",
        "createdAt": "2026-01-05 22:37:36"
    },
    {
        "id": 87,
        "slug": "first-day-of-school",
        "name": "First Day of School",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "85",
        "updatedAt": "2026-01-05 22:37:36",
        "createdAt": "2026-01-05 22:37:36"
    },
    {
        "id": 88,
        "slug": "ghoul-spirit",
        "name": "Ghoul Spirit",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "85",
        "updatedAt": "2026-01-05 22:37:36",
        "createdAt": "2026-01-05 22:37:36"
    },
    {
        "id": 89,
        "slug": "howliday",
        "name": "Howliday",
        "description": "The Howliday series features mansters and ghouls all dressed up and celebrating various holidays.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:36",
        "createdAt": "2026-01-05 22:37:36"
    },
    {
        "id": 90,
        "slug": "howling-hoodies",
        "name": "Howling Hoodies",
        "description": "The ghouls are dressing up in outfits that feature hoodies complemented by awesome accessories. Note: Although promotional images were distributed, Howling Hoodies dolls were never released.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:36",
        "createdAt": "2026-01-05 22:37:36"
    },
    {
        "id": 91,
        "slug": "i-love-fashion",
        "name": "I Love Fashion",
        "description": "The series features characters who love having lots and lots of clothes. Each doll has three outfits, three pairs of shoes, and a variety of accessories. These Toys”R”Us exclusives are sometimes referred to as “I Heart Fashion”.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:36",
        "createdAt": "2026-01-05 22:37:36"
    },
    {
        "id": 92,
        "slug": "i-love-shoes",
        "name": "I Love Shoes",
        "description": "This unnamed series features ghouls that have lots and lots of shoes. Each doll comes with multiple pairs of shoes to go with her awesome outfit. “I Love Shoes” is a fan made name and the series may also be referred to as “I Heart Shoes”.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:37",
        "createdAt": "2026-01-05 22:37:37"
    },
    {
        "id": 93,
        "slug": "killer-style-i",
        "name": "Killer Style I",
        "description": "This unnamed assortment contains two dolls that are wearing outfits similar to the ones found in the Day at the Maul fashion pack. “Killer Style I” is a fan-made name used to identify this series. “Classrooms” is also used to identify the dolls.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:37",
        "createdAt": "2026-01-05 22:37:37"
    },
    {
        "id": 94,
        "slug": "killer-style-ii",
        "name": "Killer Style II",
        "description": "This Kohl’s exclusive has two dolls that are wearing outfits similar to the ones found in the Maul Session fashion packs. “Killer Style II” is a fan-made name used to identify this series.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:37",
        "createdAt": "2026-01-05 22:37:37"
    },
    {
        "id": 95,
        "slug": "lots-of-looks",
        "name": "Lots of Looks",
        "description": "Lots of Looks is all about having lots of outfits. Each doll comes with enough clothes and accessories to create at least twenty outfits.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:37",
        "createdAt": "2026-01-05 22:37:37"
    },
    {
        "id": 96,
        "slug": "maul-session",
        "name": "Maul Session",
        "description": "This series features outfits for hanging out at the mall. “Maul Session” is a fan-made name used to identify this unnamed assortment of fashion packs.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:38",
        "createdAt": "2026-01-05 22:37:38"
    },
    {
        "id": 97,
        "slug": "miscellaneous",
        "name": "Miscellaneous",
        "description": "The miscellaneous category is for dolls and playsets that are stand-alone releases or the only release in a series.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:38",
        "createdAt": "2026-01-05 22:37:38"
    },
    {
        "id": 98,
        "slug": "monster-ball",
        "name": "Monster Ball",
        "description": "The ghouls of Monster High are dressed and ready for an extravagant and enchanting ballroom party.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:38",
        "createdAt": "2026-01-05 22:37:38"
    },
    {
        "id": 99,
        "slug": "monster-exchange",
        "name": "Monster Exchange",
        "description": "A student exchange program is under way at Monster High. Ghouls from around the world are visiting and local monsters are studying abroad.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:38",
        "createdAt": "2026-01-05 22:37:38"
    },
    {
        "id": 100,
        "slug": "monster-family",
        "name": "Monster Family",
        "description": "This series features family members of the students who attend Monster High.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:38",
        "createdAt": "2026-01-05 22:37:38"
    },
    {
        "id": 101,
        "slug": "monster-fest",
        "name": "Monster Fest",
        "description": "Monster Fest features ghouls all dressed up and ready to have a great time at a music festival.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:38",
        "createdAt": "2026-01-05 22:37:38"
    },
    {
        "id": 102,
        "slug": "monster-high-x-wednesday",
        "name": "Monster High x Wednesday",
        "description": "Monster High x Wednesday features characters inspired by the Wednesday TV series.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:38",
        "createdAt": "2026-01-05 22:37:38"
    },
    {
        "id": 103,
        "slug": "music-class",
        "name": "Music Class",
        "description": "The ghouls are in music class and playing monstrously amazing tunes on their favorite instruments.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:38",
        "createdAt": "2026-01-05 22:37:38"
    },
    {
        "id": 104,
        "slug": "music-festival",
        "name": "Music Festival",
        "description": "The ghouls are out and heading to a music festival. They are wearing fang-tastic outfits and are ready to hear some killer music.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:39",
        "createdAt": "2026-01-05 22:37:39"
    },
    {
        "id": 105,
        "slug": "new-scaremester",
        "name": "New Scaremester",
        "description": "It’s back to school time and the students of Monster High are ready. They are wearing killer outfits that are to die for.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:39",
        "createdAt": "2026-01-05 22:37:39"
    },
    {
        "id": 106,
        "slug": "off-white",
        "name": "Off-White",
        "description": "The Off-White series is a collaboration with Monster High and Off-White, a high-end fashion label founded by Virgil Abloh in 2012. The brand is recognized for its use of bold graphics, a black and white color palette, and clothing with a modern and urban aesthetic.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:39",
        "createdAt": "2026-01-05 22:37:39"
    },
    {
        "id": 107,
        "slug": "original-favorites",
        "name": "Original Favorites",
        "description": "Original Favorites is an assortment of characters wearing their signature outfits. This 2013 reissue includes three of the dolls from the Signature series: Clawdeen Wolf, Draculaura, and Frankie Stein. The only major difference between the two releases is the packaging.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:40",
        "createdAt": "2026-01-05 22:37:40"
    },
    {
        "id": 108,
        "slug": "original-ghouls-collection",
        "name": "Original Ghouls Collection",
        "description": "This 2014 assortment includes Clawdeen Wolf, Cleo de Nile, Draculaura, and Frankie Stein wearing their signature outfits. A 6-pack of the dolls also includes Lagoona Blue and Ghoulia Yelps. They are reissues of dolls in the Signature series, but lack many of the accessories and have different packag",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:40",
        "createdAt": "2026-01-05 22:37:40"
    },
    {
        "id": 109,
        "slug": "party-ghouls",
        "name": "Party Ghouls",
        "description": "The ghouls have dressed up for a monstrously fun party and have accessorized with purses that include a beastie friend.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:40",
        "createdAt": "2026-01-05 22:37:40"
    },
    {
        "id": 110,
        "slug": "picture-day",
        "name": "Picture Day",
        "description": "The students of Monster High are wearing their most eye-catching outfits in order to look amazing for the Fearbook.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:41",
        "createdAt": "2026-01-05 22:37:41"
    },
    {
        "id": 111,
        "slug": "power-ghouls",
        "name": "Power Ghouls",
        "description": "This series features Monster High characters portraying fantastic comic book heroes and villains.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:41",
        "createdAt": "2026-01-05 22:37:41"
    },
    {
        "id": 112,
        "slug": "reel-drama",
        "name": "Reel Drama",
        "description": "Reel Drama features ghouls inspired by classic horror films. Each doll is black & white complemented by a little bit of color and comes with a movie-themed poster.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:41",
        "createdAt": "2026-01-05 22:37:41"
    },
    {
        "id": 113,
        "slug": "scare-adise-island",
        "name": "Scare-adise Island",
        "description": "The students of Monster High are having a getaway. They are ready for the beach and some fun in the sun at Scare-adise Island.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:42",
        "createdAt": "2026-01-05 22:37:42"
    },
    {
        "id": 114,
        "slug": "scarily-ever-after",
        "name": "Scarily Ever After",
        "description": "The series features characters dressed in outfits based upon classic fairy tales. Although Scarily Ever After is the trademarked name, this Target exclusive collection was initially referred to as Scary Tales.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:42",
        "createdAt": "2026-01-05 22:37:42"
    },
    {
        "id": 115,
        "slug": "scaris-city-of-frights",
        "name": "Scaris: City of Frights",
        "description": "Everyone is on break and ready to take a vacation. They have packed their bags and are off to visit the frighteningly fun city called Scaris.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:42",
        "createdAt": "2026-01-05 22:37:42"
    },
    {
        "id": 116,
        "slug": "scaritage",
        "name": "Scaritage",
        "description": "This series features ghouls with multiple accessories to go with their killer outfits. Scaritage does not appear on the packaging and the series is sometimes referred to as “I Love Accessories” or “I Heart Accessories”.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:43",
        "createdAt": "2026-01-05 22:37:43"
    },
    {
        "id": 117,
        "slug": "scarnival",
        "name": "Scarnival",
        "description": "The school dance has been cancelled and the students are having a Scarnival to raise money for the dance. The Scarnival has ghouls in costume, games, and fun prizes.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:43",
        "createdAt": "2026-01-05 22:37:43"
    },
    {
        "id": 118,
        "slug": "scary-sweet-birthday",
        "name": "Scary Sweet Birthday",
        "description": "Scary Sweet Birthday features Monster High characters enjoying a birthday celebration.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:43",
        "createdAt": "2026-01-05 22:37:43"
    },
    {
        "id": 119,
        "slug": "school-clubs",
        "name": "School Clubs",
        "description": "This series of fashion packs features clothing for popular after school activities. Students can wear stylish outfits when they participate in the comic book, newspaper, snowboarding, and fashion entrepreneur’s clubs.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:44",
        "createdAt": "2026-01-05 22:37:44"
    },
    {
        "id": 120,
        "slug": "school-spirit",
        "name": "School Spirit",
        "description": "School Spirit is a food themed series that focuses on tasty outfits and accessories.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:44",
        "createdAt": "2026-01-05 22:37:44"
    },
    {
        "id": 121,
        "slug": "scream-sugar",
        "name": "Scream & Sugar",
        "description": "This series is about the Scream & Sugar Cafe, where all the ghouls love to hang out, gossip, and enjoy some terrorific treats.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:44",
        "createdAt": "2026-01-05 22:37:44"
    },
    {
        "id": 122,
        "slug": "scream-uniform",
        "name": "Scream Uniform",
        "description": "Scream uniforms let the students of Monster High show off their school spirit. There fashion packs include outfits for casketball, fearleading, swimming, and soccer. Go Monster High!",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:45",
        "createdAt": "2026-01-05 22:37:45"
    },
    {
        "id": 123,
        "slug": "self-scare-secrets",
        "name": "Self-Scare Secrets",
        "description": "Self-Scare Secrets features Monster High characters taking time to unwind with beauty rituals and cozy self-care routines.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:45",
        "createdAt": "2026-01-05 22:37:45"
    },
    {
        "id": 124,
        "slug": "shriek-wrecked",
        "name": "Shriek Wrecked",
        "description": "The ghouls go on vacation as wannabe-pirates. With a treasure map in hand they sail the high seas in search of adventure.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:45",
        "createdAt": "2026-01-05 22:37:45"
    },
    {
        "id": 125,
        "slug": "shriek-wrecked",
        "name": "Shriek Wrecked",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "124",
        "updatedAt": "2026-01-05 22:37:46",
        "createdAt": "2026-01-05 22:37:46"
    },
    {
        "id": 126,
        "slug": "nautical-ghouls",
        "name": "Nautical Ghouls",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "124",
        "updatedAt": "2026-01-05 22:37:46",
        "createdAt": "2026-01-05 22:37:46"
    },
    {
        "id": 127,
        "slug": "shriek-mates",
        "name": "Shriek Mates",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "124",
        "updatedAt": "2026-01-05 22:37:46",
        "createdAt": "2026-01-05 22:37:46"
    },
    {
        "id": 128,
        "slug": "signature",
        "name": "Signature",
        "description": "The Signature series is the main line of Monster High dolls that often features characters wearing their “signature”, or standard, outfits. It has been broken down into sub-series with some being given fan-made names to help differentiate the dolls.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:47",
        "createdAt": "2026-01-05 22:37:47"
    },
    {
        "id": 129,
        "slug": "wave-1",
        "name": "Wave 1",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "128",
        "updatedAt": "2026-01-05 22:37:47",
        "createdAt": "2026-01-05 22:37:47"
    },
    {
        "id": 130,
        "slug": "wave-2",
        "name": "Wave 2",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "128",
        "updatedAt": "2026-01-05 22:37:48",
        "createdAt": "2026-01-05 22:37:48"
    },
    {
        "id": 131,
        "slug": "wave-3",
        "name": "Wave 3",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "128",
        "updatedAt": "2026-01-05 22:37:48",
        "createdAt": "2026-01-05 22:37:48"
    },
    {
        "id": 132,
        "slug": "wave-4",
        "name": "Wave 4",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "128",
        "updatedAt": "2026-01-05 22:37:48",
        "createdAt": "2026-01-05 22:37:48"
    },
    {
        "id": 133,
        "slug": "skull-shores",
        "name": "Skull Shores",
        "description": "Even monsters sometimes need a vacation and Skulls Shores is the perfect place to relax. Everyone is wearing fantastic swimsuits and are ready for some fun in the sun on their island getaway.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:49",
        "createdAt": "2026-01-05 22:37:49"
    },
    {
        "id": 134,
        "slug": "skullector",
        "name": "Skullector",
        "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:49",
        "createdAt": "2026-01-05 22:37:49"
    },
    {
        "id": 135,
        "slug": "skulltimate-secrets",
        "name": "Skulltimate Secrets",
        "description": "Skulltimate Secrets features Monster High ghouls who need an outfit change. Each doll has a Coffin container with compartments packed full of outfits and accessories.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:50",
        "createdAt": "2026-01-05 22:37:50"
    },
    {
        "id": 136,
        "slug": "skulltimate-secrets",
        "name": "Skulltimate Secrets",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "135",
        "updatedAt": "2026-01-05 22:37:50",
        "createdAt": "2026-01-05 22:37:50"
    },
    {
        "id": 137,
        "slug": "destination-gore-geous-oasis",
        "name": "Destination: Gore-Geous Oasis",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "135",
        "updatedAt": "2026-01-05 22:37:50",
        "createdAt": "2026-01-05 22:37:50"
    },
    {
        "id": 138,
        "slug": "fearidescent",
        "name": "Fearidescent",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "135",
        "updatedAt": "2026-01-05 22:37:51",
        "createdAt": "2026-01-05 22:37:51"
    },
    {
        "id": 139,
        "slug": "garden-mysteries",
        "name": "Garden Mysteries",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "135",
        "updatedAt": "2026-01-05 22:37:51",
        "createdAt": "2026-01-05 22:37:51"
    },
    {
        "id": 140,
        "slug": "monster-mysteries",
        "name": "Monster Mysteries",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "135",
        "updatedAt": "2026-01-05 22:37:52",
        "createdAt": "2026-01-05 22:37:52"
    },
    {
        "id": 141,
        "slug": "neon-frights",
        "name": "Neon Frights",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "135",
        "updatedAt": "2026-01-05 22:37:52",
        "createdAt": "2026-01-05 22:37:52"
    },
    {
        "id": 142,
        "slug": "skultimate-roller-maze",
        "name": "Skultimate Roller Maze",
        "description": "The students of Monster High have put on skates and are ready to race through catacombs and around monstrous obstacles.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:52",
        "createdAt": "2026-01-05 22:37:52"
    },
    {
        "id": 143,
        "slug": "sleepover",
        "name": "Sleepover",
        "description": "A sleepover with friends is the best way to learn all the ghoulish gossip at Monster High. This series features budget dolls that have less articulation and accessories.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:53",
        "createdAt": "2026-01-05 22:37:53"
    },
    {
        "id": 144,
        "slug": "social-spots",
        "name": "Social Spots",
        "description": "Monster High students like to hang out, chat with friends, and discuss creeptastic gossip. This series features all of the places ghouls love to haunt.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:53",
        "createdAt": "2026-01-05 22:37:53"
    },
    {
        "id": 145,
        "slug": "sweet-1600",
        "name": "Sweet 1600",
        "description": "Get ready to celebrate Draculaura’s 1600th birthday. She has invited all of her friends and they are dressed for the party of the century. Each doll includes a Skullette key with a code that lets you access the party at MonsterHigh.com.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:54",
        "createdAt": "2026-01-05 22:37:54"
    },
    {
        "id": 146,
        "slug": "sweet-screams",
        "name": "Sweet Screams",
        "description": "This series finds the ghouls asleep and experiencing an unusual dream. They are in a candy themed world where there clothes, accessories, and even their pets are inspired by sweets.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:54",
        "createdAt": "2026-01-05 22:37:54"
    },
    {
        "id": 147,
        "slug": "swim-class",
        "name": "Swim Class",
        "description": "Everyone from Monster High is heading back to the beach. They are wearing terrorific bathing suits and are ready for some fun in the sun. “Swim Class” is a fan-made name created for the series.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:54",
        "createdAt": "2026-01-05 22:37:54"
    },
    {
        "id": 148,
        "slug": "swimsuit",
        "name": "Swimsuit",
        "description": "This budget series features ghouls ready for a swim. The dolls have molded swimsuits and lack accessories.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:55",
        "createdAt": "2026-01-05 22:37:55"
    },
    {
        "id": 149,
        "slug": "transforming-ghouls",
        "name": "Transforming Ghouls",
        "description": "Dolls in this collection feature a mechanism that transforms their clothes into monstrous outfits.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-05 22:37:55",
        "createdAt": "2026-01-05 22:37:55"
    },
    {
        "id": 150,
        "slug": "voltageous-beast-freaky-friend",
        "name": "Voltageous – Beast Freaky Friend",
        "description": "These gore-geous ghouls stand an incredible 28 inches tall. Each comes with lots of accessories and has the ability to transform her eye color.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-06 02:30:00",
        "createdAt": "2026-01-06 02:30:00"
    },
    {
        "id": 151,
        "slug": "welcome-to-monster-high",
        "name": "Welcome to Monster High",
        "description": "This series is all about Draculaura and her friends wanting a school where everyone is welcome. To celebrate their special high school they have a dance party!",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-06 02:30:00",
        "createdAt": "2026-01-06 02:30:00"
    },
    {
        "id": 152,
        "slug": "welcome-to-monster-high",
        "name": "Welcome to Monster High",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "151",
        "updatedAt": "2026-01-06 02:30:00",
        "createdAt": "2026-01-06 02:30:00"
    },
    {
        "id": 153,
        "slug": "dance-the-fright-away",
        "name": "Dance The Fright Away",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "151",
        "updatedAt": "2026-01-06 02:30:00",
        "createdAt": "2026-01-06 02:30:00"
    },
    {
        "id": 154,
        "slug": "photo-booth-ghouls",
        "name": "Photo Booth Ghouls",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "151",
        "updatedAt": "2026-01-06 02:30:01",
        "createdAt": "2026-01-06 02:30:01"
    },
    {
        "id": 155,
        "slug": "popstar-fang-ghouls",
        "name": "Popstar Fang Ghouls",
        "description": null,
        "primaryRole": "secondary",
        "imageUrl": null,
        "bannerUrl": "151",
        "updatedAt": "2026-01-06 02:30:01",
        "createdAt": "2026-01-06 02:30:01"
    },
    {
        "id": 156,
        "slug": "zombie-shake",
        "name": "Zombie Shake",
        "description": "Monster High is having a party that will raise the dead. The guys are wearing their undead best and the ghouls have amazing zombie-themed dresses.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-01-06 02:30:02",
        "createdAt": "2026-01-06 02:30:02"
    },
    {
        "id": 157,
        "slug": "funko-pop-retro-toys",
        "name": "Funko Pop! Retro Toys",
        "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-02-08 00:00:00",
        "createdAt": "2026-02-08 00:00:00"
    },
    {
        "id": 158,
        "slug": "fang-club",
        "name": "Fang Club",
        "description": "Collector releases available to Monster High Fang Club members.",
        "primaryRole": "primary",
        "imageUrl": null,
        "bannerUrl": null,
        "updatedAt": "2026-02-08 00:00:00",
        "createdAt": "2026-02-08 00:00:00"
    }
] as const;
export const releases = [
    {
        "id": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "slug": "skullector-frankie-stein-x-barbie-doll",
        "name": "Skullector Frankie Stein x Barbie Doll",
        "sku": "JHK28",
        "releaseYear": 2025,
        "description": "Celebrate the 80th Anniversary of Mattel with the Skullector Frankie Stein x Barbie Doll, which pays homage to the original 1959 Barbie “Original Teenage Fashion Model” doll.\nFrankie Stein has long, wavy, silver and black striped hair styled in a high ponytail with rolled bangs. Her pale green complexion is enhanced by bright red lipstick with varying shades of blue eyeshadow.\nThe original 1959 Barbie doll inspires her black and white lightning-bolt-striped one-piece swimsuit. When she’s ready to go out for the evening, she changes into a glittery floor-length black gown with layers of tulle on the bottom and a red “melting” rose with a skullette in its center. The gown is inspired by the 1960 “Solo in the Spotlight” Barbie doll.\nOn her feet are strappy black heels featuring skulls as the heels. Accessories include white cat-eye lightning-bolt sunnies, large silver hoop earrings, a black necklace, black mesh gloves, a black stage scarf, and a wrist tag.\nIncluded with Frankie is a doll stand and a certificate of authenticity.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 1,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 1,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            },
            {
                "id": 2,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            },
            {
                "id": 3,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            },
            {
                "id": 4,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            },
            {
                "id": 5,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            },
            {
                "id": 6,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            },
            {
                "id": 7,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            },
            {
                "id": 8,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            },
            {
                "id": 9,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            }
        ],
        "mediaAssets": [
            {
                "id": 1,
                "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
                "mediaAssetId": 40,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:09",
                "createdAt": "2026-01-05 22:45:09"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "slug": "skullector-sweet-screams-twyla",
        "name": "Skullector Sweet Screams Twyla",
        "sku": "HYW02",
        "releaseYear": 2025,
        "description": "Sweet Screams Twyla is the newest addition to the Skullector and Sweet Screams series and available online and at the 2025 San Diego Comic-Con.\nTwyla’s hair is mint green and pulled back into two curly poofs with a couple lavender streaks running through it. Her pale purple complexion is enhanced by pitch black lips and dramatic purple and pink eyeshadow.\nShe wears a purple and plum layered tulle confection dress with a black faux leather top. On her feet are translucent purple shoes that look like they are melting with black and purple striped heels.\nAdditional accessories include an ice-cream-cone headband with syrup dripping down it, peppermint candy-themed earrings, a necklace, and a translucent blue handbag.\nWith Twyla is Dustin, her pet dust bunny who actually smells like cotton candy.\nIncluded with Twyla is a doll stand, a certificate of authenticity, and a “Sweet Screams” mini comic storybook that reveals a frightmare adventure.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 9,
                "slug": "mattel-creations",
                "name": "Mattel Creations",
                "description": "Collector-exclusive release from Mattel Creations.",
                "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            },
            {
                "id": 12,
                "slug": "san-diego-comic-con",
                "name": "San Diego Comic-Con",
                "description": "Convention-exclusive release for San Diego Comic-Con.",
                "imageUrl": "https://example.com/images/sdcc_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 2,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 3,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "characterId": 146,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 10,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 11,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 12,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 13,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 14,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 15,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 16,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 17,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 18,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 19,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 20,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 21,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 22,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 23,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 24,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 25,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 26,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 27,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 28,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 29,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 30,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            },
            {
                "id": 31,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "url": "/demo/releases/2025/skullector/twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            }
        ],
        "mediaAssets": [
            {
                "id": 2,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "mediaAssetId": 96,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            }
        ],
        "mediaAssets2": [
            {
                "id": 1,
                "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
                "mediaAssetId": 30,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:45:14",
                "createdAt": "2026-01-05 22:45:14"
            }
        ]
    },
    {
        "id": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "slug": "skulltimate-secrets-hauntlywood-clawdeen-wolf",
        "name": "Skulltimate Secrets Hauntlywood Clawdeen Wolf",
        "sku": null,
        "releaseYear": 2025,
        "description": "Clawdeen Wolf has curly brown hair with gold tinsel strands running through it pulled up into a high ponytail. Her warm brown complexion is complemented by purple and gold eyeshadow, and dark purple lips.\nAn assortment of clothing lets her create a variety of outfits. She has a black dress, a fur-trimmed gold jacket, a fur-trimmed purple skirt, and a gold and black metallic skirt, to name a few.\nHer feet can be dressed up with chunky pink high-heeled boots or high-heeled black boots with gold decorations.\nFor accessories, Clawdeen has a gold cage bodice, gold necklace and bracelets, purple belt, gold and black purse, sunglasses, and a microphone.\n<strong>Closet Container</strong>\nWith Clawdeen Wolf is a purple and gold Hauntlywood Mysteries closet that holds the doll and all their belongings. Use the magnifying glass key to reveal symbols on the treasure map and unlock the closet doors.\nFind the 3 charms hidden in the closet and piece them together to make a single mystery talisman. Insert the talisman at the base of the closet, then slide it up to unveil the doll.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 4,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "characterId": 135,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            }
        ],
        "series": [
            {
                "id": 135,
                "slug": "skulltimate-secrets",
                "name": "Skulltimate Secrets",
                "description": "Skulltimate Secrets features Monster High ghouls who need an outfit change. Each doll has a Coffin container with compartments packed full of outfits and accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:50",
                "createdAt": "2026-01-05 22:37:50"
            }
        ],
        "imageUrls": [
            {
                "id": 32,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            },
            {
                "id": 33,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            },
            {
                "id": 34,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            },
            {
                "id": 35,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            },
            {
                "id": 36,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            },
            {
                "id": 37,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            },
            {
                "id": 38,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            },
            {
                "id": 39,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            }
        ],
        "mediaAssets": [
            {
                "id": 3,
                "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
                "mediaAssetId": 21,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:19",
                "createdAt": "2026-01-05 22:45:19"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "slug": "self-scare-secrets-venus-mcflytrap",
        "name": "Self-Scare Secrets Venus McFlytrap",
        "sku": "JHK45",
        "releaseYear": 2025,
        "description": "Venus McFlytrap has extremely curly green and pink hair pulled back in a high ponytail. Her bold green lips and pink eyeshadow accentuate her green complexion.\nShe wears a pink knit crop top with black bows on the shoulders and a green skirt with a foil floral print. On her feet are black high tops with white soles and pink laces.\nAdditional accessories include translucent green earrings, a black bonnet with a pink foil print, a pink case holding multiple hair products, a radio, and tattoos.\nWith Venus is Chewlian, her Venus Flytrap pet.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 5,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "characterId": 123,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21",
                "character": {
                    "id": 123,
                    "slug": "lux-de-nile",
                    "name": "Lux de Nile",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 123,
                "slug": "self-scare-secrets",
                "name": "Self-Scare Secrets",
                "description": "Self-Scare Secrets features Monster High characters taking time to unwind with beauty rituals and cozy self-care routines.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:45",
                "createdAt": "2026-01-05 22:37:45"
            }
        ],
        "imageUrls": [
            {
                "id": 40,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            },
            {
                "id": 41,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            },
            {
                "id": 42,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            },
            {
                "id": 43,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            },
            {
                "id": 44,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            },
            {
                "id": 45,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            },
            {
                "id": 46,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            }
        ],
        "mediaAssets": [
            {
                "id": 4,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "mediaAssetId": 98,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            }
        ],
        "mediaAssets2": [
            {
                "id": 2,
                "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
                "mediaAssetId": 26,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:45:21",
                "createdAt": "2026-01-05 22:45:21"
            }
        ]
    },
    {
        "id": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
        "slug": "funko-pop-retro-toys-howliday-skelita",
        "name": "Funko Pop! Retro Toys Howliday Skelita",
        "sku": "164",
        "releaseYear": 2025,
        "description": "Skelita has long, wavy black hair with vibrant blue underneath. Her delicate, pale gray skin is adorned with intricate sugar skull makeup and pink lips.\nShe wears a dress with a black top, spiderweb and skull printed on the bottom, a gold belt, and purple and pink ruffles on the sleeves and hem. On her feet are yellow and brown sandals.\nFor accessories, she has a necklace, colorful bracelets, and an elaborate yellow headpiece featuring white skulls.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:23",
        "createdAt": "2026-01-05 22:45:23",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [],
        "series": [
            {
                "id": 157,
                "slug": "funko-pop-retro-toys",
                "name": "Funko Pop! Retro Toys",
                "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 47,
                "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
                "url": "/demo/releases/2025/retro-toys-skelita/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:23",
                "createdAt": "2026-01-05 22:45:23"
            },
            {
                "id": 48,
                "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
                "url": "/demo/releases/2025/retro-toys-skelita/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:23",
                "createdAt": "2026-01-05 22:45:23"
            },
            {
                "id": 49,
                "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
                "url": "/demo/releases/2025/retro-toys-skelita/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:23",
                "createdAt": "2026-01-05 22:45:23"
            }
        ],
        "mediaAssets": [
            {
                "id": 5,
                "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
                "mediaAssetId": 91,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:23",
                "createdAt": "2026-01-05 22:45:23"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "slug": "scary-sweet-birthday-draculaura",
        "name": "Scary Sweet Birthday Draculaura",
        "sku": null,
        "releaseYear": 2025,
        "description": "Draculaura is celebrating her Sweet 1600!\nHer long wavy black hair has pink streaks running through it and styled in pigtails for the party. Her bold dark purple lips and pink and purple eyeshadow accentuate her pale pink complexion.\nShe wears an elaborate pink spiderweb cage skirt over a satiny pink dress. A ‘pearl’ collar draping across her shoulders, black gloves, a bow hairpiece, and pink bat earrings complete the look. On her feet are black and pink bow-inspired heels.\nParty-themed accessories include a coffin gift box with a surprise present inside, an invite, a birthday card, and a pink fan. The pink heart shaped purse and cool batty balloon are my favorites though.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 6,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "characterId": 118,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24",
                "character": {
                    "id": 118,
                    "slug": "hoodude-voodoo",
                    "name": "Hoodude Voodoo",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 118,
                "slug": "scary-sweet-birthday",
                "name": "Scary Sweet Birthday",
                "description": "Scary Sweet Birthday features Monster High characters enjoying a birthday celebration.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:43",
                "createdAt": "2026-01-05 22:37:43"
            }
        ],
        "imageUrls": [
            {
                "id": 50,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            },
            {
                "id": 51,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            },
            {
                "id": 52,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            },
            {
                "id": 53,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            },
            {
                "id": 54,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            },
            {
                "id": 55,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            },
            {
                "id": 56,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            },
            {
                "id": 57,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            }
        ],
        "mediaAssets": [
            {
                "id": 6,
                "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
                "mediaAssetId": 31,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:24",
                "createdAt": "2026-01-05 22:45:24"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "slug": "self-scare-secrets-draculaura",
        "name": "Self-Scare Secrets Draculaura",
        "sku": "JHK43",
        "releaseYear": 2025,
        "description": "Draculaura has long pink hair with black streaks in the front. Her pale pink complexion is enhanced with bold black lips and varying shades of pink eyeshadow.\nShe wears a pink knit crop top with a white trim featuring bats and roses on it. On her feet are black sandals with pink bows on the front and hearts cut out on the heels.\nAdditional accessories include pink translucent heart earrings, tattoos, and a pink box containing a variety of hair and beauty products.\nWith Draculaura is Count Fabulous, her pet bat.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 7,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "characterId": 123,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26",
                "character": {
                    "id": 123,
                    "slug": "lux-de-nile",
                    "name": "Lux de Nile",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 123,
                "slug": "self-scare-secrets",
                "name": "Self-Scare Secrets",
                "description": "Self-Scare Secrets features Monster High characters taking time to unwind with beauty rituals and cozy self-care routines.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:45",
                "createdAt": "2026-01-05 22:37:45"
            }
        ],
        "imageUrls": [
            {
                "id": 58,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            },
            {
                "id": 59,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            },
            {
                "id": 60,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            },
            {
                "id": 61,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            },
            {
                "id": 62,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            },
            {
                "id": 63,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            },
            {
                "id": 64,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            }
        ],
        "mediaAssets": [
            {
                "id": 7,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "mediaAssetId": 31,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            }
        ],
        "mediaAssets2": [
            {
                "id": 3,
                "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
                "mediaAssetId": 27,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:45:26",
                "createdAt": "2026-01-05 22:45:26"
            }
        ]
    },
    {
        "id": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
        "slug": "buried-secrets-scaremester-draculaura",
        "name": "Buried Secrets Scaremester Draculaura",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secret Scaremester Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed. To add to the surprise, the doll could be from the Buried Secret Scaremester or the Buried Secret Cozy Creepover series.\nDraculaura has long, straight, dark pink hair with pale pink streaks running through it. Her pale pink complexion is enhanced with bold pink lips and pink eyeshadow.\nHer dress has a pink top with short white sleeves, and a printed pink and black bottom. It also has a black collar and long pink tie. On her feet are dark pink chunky high heels.\nAdditional accessories include a pink drinking bottle, pink earrings, a black bow headband, and a pink and black bat-shaped purse.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:27",
        "createdAt": "2026-01-05 22:45:27",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 8,
                "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:27",
                "createdAt": "2026-01-05 22:45:27",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 65,
                "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
                "url": "/demo/releases/2025/buried-secrets-scaremester-draculaura/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:27",
                "createdAt": "2026-01-05 22:45:27"
            },
            {
                "id": 66,
                "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
                "url": "/demo/releases/2025/buried-secrets-scaremester-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:27",
                "createdAt": "2026-01-05 22:45:27"
            },
            {
                "id": 67,
                "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
                "url": "/demo/releases/2025/buried-secrets-scaremester-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:27",
                "createdAt": "2026-01-05 22:45:27"
            }
        ],
        "mediaAssets": [
            {
                "id": 8,
                "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
                "mediaAssetId": 31,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:27",
                "createdAt": "2026-01-05 22:45:27"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "slug": "generation-3-skelita-calaveras",
        "name": "Generation 3 Skelita Calaveras",
        "sku": "JHK34",
        "releaseYear": 2025,
        "description": "Skelita Calaveras has long, wavy black hair with magenta and copper streaks in the front. Her pale complexion is enhanced with sugar-skull-inspired Day of the Dead makeup.\nShe wears a black dress with turquoise tulle ruffles on the sleeves and a rainbow papel picado hem. On her feet are turquoise sandals with brown heels and sculpted skulls and yellow marigolds. Pink and turquoise bracelets, a gold necklace, and a gold marigold headband complete the look.\nSkelita comes with several accessories, including a brown crossbody bag with a butterfly on it, turquoise sunnies, a sketch book, sewing scissors, and an iCoffin.\nWith Skelita is Candelita, her pet dog.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 23,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "characterId": 62,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13",
                "character": {
                    "id": 62,
                    "slug": "lost-boys-david",
                    "name": "Lost Boys David",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 62,
                "slug": "generation-3",
                "name": "Generation 3",
                "description": "This series welcomes a new class of ghouls to Monster High. These classic characters have been reimaged for a new generation.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:32",
                "createdAt": "2026-01-05 22:37:32"
            }
        ],
        "imageUrls": [
            {
                "id": 170,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "url": "/demo/releases/2025/skullector/skelita/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            },
            {
                "id": 171,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "url": "/demo/releases/2025/skullector/skelita/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            },
            {
                "id": 172,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "url": "/demo/releases/2025/skullector/skelita/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            },
            {
                "id": 173,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "url": "/demo/releases/2025/skullector/skelita/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            },
            {
                "id": 174,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "url": "/demo/releases/2025/skullector/skelita/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            },
            {
                "id": 175,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "url": "/demo/releases/2025/skullector/skelita/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            },
            {
                "id": 176,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "url": "/demo/releases/2025/skullector/skelita/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            }
        ],
        "mediaAssets": [
            {
                "id": 25,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "mediaAssetId": 91,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            }
        ],
        "mediaAssets2": [
            {
                "id": 5,
                "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
                "mediaAssetId": 24,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:46:13",
                "createdAt": "2026-01-05 22:46:13"
            }
        ]
    },
    {
        "id": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "slug": "skullector-clawdeen-wolf-house-of-wolf",
        "name": "Skullector Clawdeen Wolf House Of Wolf",
        "sku": "JDR66",
        "releaseYear": 2025,
        "description": "Clawdeen Wolf House of Wolf is the newest addition to the Skullector series. Her designs are the talk of the town at this year’s Scaris Fashion Week.\nClawdeen’s body-length brown hair is pulled into a high, twisted statement ponytail. Her tan complexion is enhanced with gold and chocolate brown eyeshadow and chocolate brown lips.\nShe wears a brown jacquard coat that features dramatic faux-fur accents and faux-leather trim. It includes a framed hem so you can pose it how you see fit.\nUnder the coat is a purple twill blazer dress with gold buttons, complemented by a black waist belt with her initials in gold in the middle.  Black pantaboots with gold heels and adorned with gold bows complete the look.\nAdditional accessories include gold earrings with purple jewel hearts, a gold ribbon choker, and her line’s signature brown faux fur bag.\nIncluded with Clawdeen is a doll stand and a certificate of authenticity.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 9,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 68,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            },
            {
                "id": 69,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            },
            {
                "id": 70,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            },
            {
                "id": 71,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            },
            {
                "id": 72,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            },
            {
                "id": 73,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            },
            {
                "id": 74,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            },
            {
                "id": 75,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            },
            {
                "id": 76,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            }
        ],
        "mediaAssets": [
            {
                "id": 9,
                "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
                "mediaAssetId": 21,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:29",
                "createdAt": "2026-01-05 22:45:29"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "slug": "skelita-calaveras-dia-de-muertos",
        "name": "Skelita Calaveras Dia de Muertos",
        "sku": "JDR63",
        "releaseYear": 2025,
        "description": "Skelita Calaveras sports long, straight black hair accented with vibrant turquoise and auburn streaks. Her delicate pale gray skin is adorned with intricate sugar skull makeup, green eyeshadow, and black lips.\nTo celebrate Dia de Muertos, she wears a midnight black satin dress depicting the ancient spirit Quetzalcóatl soaring across it in vibrant colors. An elaborate headdress that also depicts Quetzalcóatl, featuring a skull with a candle as its centerpiece, adorns her head.\nAdditional accessories include Aztec-inspired jewelry, necklace and earrings, and a gold belt.\nA doll stand is included with Skelita.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 10,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            }
        ],
        "series": [
            {
                "id": 89,
                "slug": "howliday",
                "name": "Howliday",
                "description": "The Howliday series features mansters and ghouls all dressed up and celebrating various holidays.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:36",
                "createdAt": "2026-01-05 22:37:36"
            }
        ],
        "imageUrls": [
            {
                "id": 77,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            },
            {
                "id": 78,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            },
            {
                "id": 79,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            },
            {
                "id": 80,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            },
            {
                "id": 81,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            },
            {
                "id": 82,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            },
            {
                "id": 83,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            }
        ],
        "mediaAssets": [
            {
                "id": 10,
                "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
                "mediaAssetId": 91,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:33",
                "createdAt": "2026-01-05 22:45:33"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "slug": "skulltimate-secrets-destination-gore-geous-oasis-draculaura",
        "name": "Skulltimate Secrets Destination: Gore-Geous Oasis Draculaura",
        "sku": null,
        "releaseYear": 2025,
        "description": "Draculaura has long pink hair with black streaks in her bangs. Bold pink lips and pink and black eyeshadow enhance her light pink skin. A little pink heart is under her left eye.\nAn assortment of clothing lets her create a variety of outfits. She has a pink and black floral fitted crop top, white and pink shorts, a red skirt with pink tulle trim, and a white and pink floral printed sarong with a matching bandana.\nOn her feet are pink and gold high-heeled sandals, or you can switch them out for white shoes. Additional accessories include pink earrings and a pink belt, black sunglasses, a pink heart-shaped fan, and some hangers.\n<strong>Luggage Case</strong>\nWith Draculaura is a pink and black luggage case that holds the doll and all her belongings. Use the key hidden in the front of the case to open the door and reveal the Draculaura doll.\nHidden among the travel essentials in the luggage case is a small key that opens a doll-sized suitcase. Unpack this suitcase to find the third and final key that unlocks the skullette-shaped hand luggage.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 11,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "characterId": 135,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            }
        ],
        "series": [
            {
                "id": 135,
                "slug": "skulltimate-secrets",
                "name": "Skulltimate Secrets",
                "description": "Skulltimate Secrets features Monster High ghouls who need an outfit change. Each doll has a Coffin container with compartments packed full of outfits and accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:50",
                "createdAt": "2026-01-05 22:37:50"
            }
        ],
        "imageUrls": [
            {
                "id": 84,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            },
            {
                "id": 85,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            },
            {
                "id": 86,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            },
            {
                "id": 87,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            },
            {
                "id": 88,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            },
            {
                "id": 89,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            },
            {
                "id": 90,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            }
        ],
        "mediaAssets": [
            {
                "id": 11,
                "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
                "mediaAssetId": 31,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:36",
                "createdAt": "2026-01-05 22:45:36"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
        "slug": "funko-pop-retro-toys-ghoulia-yelps",
        "name": "Funko Pop! Retro Toys Ghoulia Yelps",
        "sku": "154",
        "releaseYear": 2025,
        "description": "Ghoulia Yelps has light blue hair with streaks of darker blue running through it. Her pale gray complexion is enhanced by mauve eyeshadow and bright red lips.\nShe wears a cherry-printed tank top over a black and white striped long-sleeve top with fingerless black gloves. Red pants with a piano keyboard belt complete her look. On her feet are black and white boots with red heels and red laces.\nAccessories include pink earrings, a green headband, and white glasses.\nWith Ghoulia Yelps is Sir Hoots A Lot, her pet owl.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:39",
        "createdAt": "2026-01-05 22:45:39",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [],
        "series": [
            {
                "id": 157,
                "slug": "funko-pop-retro-toys",
                "name": "Funko Pop! Retro Toys",
                "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 91,
                "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
                "url": "/demo/releases/2025/retro-toys-ghoulia-yelps/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:39",
                "createdAt": "2026-01-05 22:45:39"
            },
            {
                "id": 92,
                "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
                "url": "/demo/releases/2025/retro-toys-ghoulia-yelps/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:39",
                "createdAt": "2026-01-05 22:45:39"
            },
            {
                "id": 93,
                "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
                "url": "/demo/releases/2025/retro-toys-ghoulia-yelps/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:39",
                "createdAt": "2026-01-05 22:45:39"
            }
        ],
        "mediaAssets": [
            {
                "id": 12,
                "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
                "mediaAssetId": 41,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:39",
                "createdAt": "2026-01-05 22:45:39"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-7497-82c1-b3d65cfea544",
        "slug": "buried-secrets-haunted-dance-twyla",
        "name": "Buried Secrets Haunted Dance Twyla",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secrets Haunted Dance Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed.\nTwyla has long, purple hair streaked blue in the front, pulled up into a high bun. Her pale purple complexion is enhanced by bold purple lips and purple and blue eyeshadow.\nShe wears a purple mini-dress with black straps, with black tulle and blue, purple, and black designs on the skirt. Over the dress, she has a purple molded chest piece shaped into a bow. On her feet are turquoise platform shoes.\nTwyla’s masquerade mask is blue and purple and shaped like a rabbit. Additional accessories include a purple handbag embossed with rabbits, a black hair comb, a blue water bottle, and purple earrings.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:42",
        "createdAt": "2026-01-05 22:45:42",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 12,
                "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:42",
                "createdAt": "2026-01-05 22:45:42",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 94,
                "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
                "url": "/demo/releases/2025/haunted-dance-twyla/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:42",
                "createdAt": "2026-01-05 22:45:42"
            },
            {
                "id": 95,
                "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
                "url": "/demo/releases/2025/haunted-dance-twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:42",
                "createdAt": "2026-01-05 22:45:42"
            },
            {
                "id": 96,
                "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
                "url": "/demo/releases/2025/haunted-dance-twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:42",
                "createdAt": "2026-01-05 22:45:42"
            },
            {
                "id": 97,
                "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
                "url": "/demo/releases/2025/haunted-dance-twyla/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:42",
                "createdAt": "2026-01-05 22:45:42"
            }
        ],
        "mediaAssets": [
            {
                "id": 13,
                "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
                "mediaAssetId": 96,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:42",
                "createdAt": "2026-01-05 22:45:42"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "slug": "skulltimate-secrets-destination-gore-geous-oasis-jinafire-long",
        "name": "Skulltimate Secrets Destination: Gore-Geous Oasis Jinafire Long",
        "sku": null,
        "releaseYear": 2025,
        "description": "Jinafire Long has long, wavy black hair with a purple streak in the front. Her pale green complexion is accentuated by her pink lips and purple and turquoise eyeshadow.\nAn assortment of clothing lets her create a variety of outfits. She has a purple floral-printed tank top, a purple skirt with tulle trim, a blue printed skirt, a purple jacket, and an oriental-inspired sarong with a matching bandana.\nOn her feet are intricate turquoise sandals, or you can switch them out for blue sandals. Additional accessories include white earrings, a gold belt, an oriental-themed fan, purple translucent sunglasses, a dragon boat purse, and hangers.\n<strong>Luggage Case</strong>\nWith Jinafire Long is a blue and black luggage case that holds the doll and all her belongings. Use the key hidden in the front of the case to open the door and reveal the Jinafire Long doll.\nHidden among the travel essentials in the luggage case is a small key that opens a doll-sized suitcase. Unpack this suitcase to find the third and final key that unlocks the skullette-shaped hand luggage.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 13,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "characterId": 135,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            }
        ],
        "series": [
            {
                "id": 135,
                "slug": "skulltimate-secrets",
                "name": "Skulltimate Secrets",
                "description": "Skulltimate Secrets features Monster High ghouls who need an outfit change. Each doll has a Coffin container with compartments packed full of outfits and accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:50",
                "createdAt": "2026-01-05 22:37:50"
            }
        ],
        "imageUrls": [
            {
                "id": 98,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            },
            {
                "id": 99,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            },
            {
                "id": 100,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            },
            {
                "id": 101,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            },
            {
                "id": 102,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            },
            {
                "id": 103,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            },
            {
                "id": 104,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            }
        ],
        "mediaAssets": [
            {
                "id": 14,
                "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
                "mediaAssetId": 54,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:44",
                "createdAt": "2026-01-05 22:45:44"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-71e4-9408-7b407278e0f0",
        "slug": "funko-pop-retro-toys-frankie-stein-mini-glitter-globe",
        "name": "Funko Pop! Retro Toys Frankie Stein Mini Glitter Globe",
        "sku": null,
        "releaseYear": 2025,
        "description": "Celebrate the 80th Anniversary of Mattel with the Frankie Stein Mini Glitter Globe.\nFrankie Stein rocks black and white striped hair, kept in place by a Skullette clip. Their pale green skin is complemented by pink eyeshadow and bold red lips.\nTheir outfit features a collared white shirt paired with a sleek black top with blue trim, and a white skirt. Tights with one gray leg and one black leg complete the ensemble. On her feet are black pumps with gray heels.\nFrankie comes in a glitter globe that is approximately 2.2 inches tall.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:48",
        "createdAt": "2026-01-05 22:45:48",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [],
        "series": [
            {
                "id": 157,
                "slug": "funko-pop-retro-toys",
                "name": "Funko Pop! Retro Toys",
                "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 105,
                "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
                "url": "/demo/releases/2025/retro-toys-frankie-stein-mini-glitter-globe/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:48",
                "createdAt": "2026-01-05 22:45:48"
            },
            {
                "id": 106,
                "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
                "url": "/demo/releases/2025/retro-toys-frankie-stein-mini-glitter-globe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:48",
                "createdAt": "2026-01-05 22:45:48"
            },
            {
                "id": 107,
                "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
                "url": "/demo/releases/2025/retro-toys-frankie-stein-mini-glitter-globe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:48",
                "createdAt": "2026-01-05 22:45:48"
            }
        ],
        "mediaAssets": [
            {
                "id": 15,
                "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
                "mediaAssetId": 40,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:48",
                "createdAt": "2026-01-05 22:45:48"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
        "slug": "buried-secrets-scaremester-clawdeen-wolf",
        "name": "Buried Secrets Scaremester Clawdeen Wolf",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secret Scaremester Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed. To add to the surprise, the doll could be from the Buried Secret Scaremester or the Buried Secret Cozy Creepover series.\nClawdeen Wolf has long straight brown hair with braids and magenta streaks in the front. Her tan complexion is enhanced with bold magenta lips and purple and magenta eyeshadow.\nHer dress is a sleeveless black top and a printed purple and black bottom with a black ruffle. It also has a white collar and a long purple tie adorned with a gold star and moon. On her feet are purple chunky high-heeled boots.\nAdditional accessories include a pink drinking bottle, earrings, sunglasses, and a purple purse adorned with a gold scarab on the front.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:50",
        "createdAt": "2026-01-05 22:45:50",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 14,
                "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:50",
                "createdAt": "2026-01-05 22:45:50",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 108,
                "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
                "url": "/demo/releases/2025/buried-secrets-scaremester-clawdeen-wolf/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:50",
                "createdAt": "2026-01-05 22:45:50"
            },
            {
                "id": 109,
                "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
                "url": "/demo/releases/2025/buried-secrets-scaremester-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:50",
                "createdAt": "2026-01-05 22:45:50"
            },
            {
                "id": 110,
                "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
                "url": "/demo/releases/2025/buried-secrets-scaremester-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:50",
                "createdAt": "2026-01-05 22:45:50"
            }
        ],
        "mediaAssets": [
            {
                "id": 16,
                "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
                "mediaAssetId": 21,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:50",
                "createdAt": "2026-01-05 22:45:50"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
        "slug": "buried-secrets-haunted-dance-lagoona-blue",
        "name": "Buried Secrets Haunted Dance Lagoona Blue",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secrets Haunted Dance Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed.\nLagoona Blue has long blond and mint green hair pulled back into a bun. Her pale pink complexion is enhanced with bold magenta lips and magenta and blue eyeshadow. She has light blue freckles under her eyes and across her nose.\nShe wears a mint green mini-dress with black crisscross straps, with black tulle and pink and black designs on the skirt. Over the dress, she has a pink molded chest piece shaped into a bow and octopus tentacles. On her feet are pink platform shoes.\nLagoona’s masquerade mask is pink and blue and aquatic themed, featuring shell and pearl details. Additional accessories include a mint green handbag, a black hair comb, a pink water bottle, and pink earrings.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:52",
        "createdAt": "2026-01-05 22:45:52",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 15,
                "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:52",
                "createdAt": "2026-01-05 22:45:52",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 111,
                "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
                "url": "/demo/releases/2025/haunted-dance-lagoona-blue/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:52",
                "createdAt": "2026-01-05 22:45:52"
            },
            {
                "id": 112,
                "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
                "url": "/demo/releases/2025/haunted-dance-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:52",
                "createdAt": "2026-01-05 22:45:52"
            },
            {
                "id": 113,
                "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
                "url": "/demo/releases/2025/haunted-dance-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:52",
                "createdAt": "2026-01-05 22:45:52"
            },
            {
                "id": 114,
                "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
                "url": "/demo/releases/2025/haunted-dance-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:52",
                "createdAt": "2026-01-05 22:45:52"
            }
        ],
        "mediaAssets": [
            {
                "id": 17,
                "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
                "mediaAssetId": 59,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:52",
                "createdAt": "2026-01-05 22:45:52"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-762f-a70a-83006384a341",
        "slug": "buried-secrets-cozy-creepover-clawdeen-wolf",
        "name": "Buried Secrets Cozy Creepover Clawdeen Wolf",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secret Cozy Creepover Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed.\nClawdeen Wolf has wavy purple hair that flows past her shoulders. Her tan complexion is enhanced with bold dark purple lips and purple eyeshadow.\nShe wears a black pajama outfit with purple stars and moons printed on it and a purple bow at the waist. On her feet are light purple peep-toe slippers.\nAdditional accessories include a light purple eye mask, a gold lip gloss tube, a purple comb, and earrings.\nWith Clawdeen Wolf is her pet, Crescent.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:55",
        "createdAt": "2026-01-05 22:45:55",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 16,
                "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:55",
                "createdAt": "2026-01-05 22:45:55",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 115,
                "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-clawdeen-wolf/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:55",
                "createdAt": "2026-01-05 22:45:55"
            },
            {
                "id": 116,
                "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:55",
                "createdAt": "2026-01-05 22:45:55"
            },
            {
                "id": 117,
                "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:55",
                "createdAt": "2026-01-05 22:45:55"
            }
        ],
        "mediaAssets": [
            {
                "id": 18,
                "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
                "mediaAssetId": 21,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:55",
                "createdAt": "2026-01-05 22:45:55"
            }
        ],
        "mediaAssets2": [
            {
                "id": 4,
                "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
                "mediaAssetId": 28,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:45:55",
                "createdAt": "2026-01-05 22:45:55"
            }
        ]
    },
    {
        "id": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "slug": "skulltimate-secrets-destination-gore-geous-oasis-lagoona-blue",
        "name": "Skulltimate Secrets Destination: Gore-Geous Oasis Lagoona Blue",
        "sku": null,
        "releaseYear": 2025,
        "description": "Lagoona Blue has long, wavy blue hair with blond streaks. Her pink skin is enhanced by turquoise freckles and stars below her eyes, turquoise and pink eyeshadow, and pink lips.\nAn assortment of clothing lets her create a variety of outfits. She has a blue shell-printed tank top, a pink skirt, a nautical theme printed sarong with a matching bandana, and a blue skirt with blue tulle trim.\nOn her feet are intricate pink sandals, or you can switch them out for silver sandals. Additional accessories include blue earrings, a belt, a nautical-themed fan, blue translucent sunglasses, a shell purse, and hangers.\n<strong>Luggage Case</strong>\nWith Lagoona Blue is a blue and black luggage case that holds the doll and all her belongings. Use the key hidden in the front of the case to open the door and reveal the Lagoona Blue doll.\nHidden among the travel essentials in the luggage case is a small key that opens a doll-sized suitcase. Unpack this suitcase to find the third and final key that unlocks the skullette-shaped hand luggage.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 17,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "characterId": 135,
                "role": "primary",
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            }
        ],
        "series": [
            {
                "id": 135,
                "slug": "skulltimate-secrets",
                "name": "Skulltimate Secrets",
                "description": "Skulltimate Secrets features Monster High ghouls who need an outfit change. Each doll has a Coffin container with compartments packed full of outfits and accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:50",
                "createdAt": "2026-01-05 22:37:50"
            }
        ],
        "imageUrls": [
            {
                "id": 118,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            },
            {
                "id": 119,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            },
            {
                "id": 120,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            },
            {
                "id": 121,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            },
            {
                "id": 122,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            },
            {
                "id": 123,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            },
            {
                "id": 124,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            }
        ],
        "mediaAssets": [
            {
                "id": 19,
                "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
                "mediaAssetId": 59,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:45:58",
                "createdAt": "2026-01-05 22:45:58"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "slug": "fang-vote-catty-noir",
        "name": "Fang Vote Catty Noir",
        "sku": "JDR77",
        "releaseYear": 2025,
        "description": "Catty Noir has long, straight, hot pink hair styled in a high ponytail. Complementing her dark complexion is pink eyeshadow, bold pink lips, and pink stars beneath her eyes.\nShe wears a silver and black one-piece outfit with an elaborate shimmery black skirt and flowing hot pink wrap. On her feet are thigh high Petrifying Pink boots.\nAdditional accessories include a ornate silver headpiece, silver jewelry, belt, purse, and the Looking Sharp Headset.\nIncluded with the doll is a stand, a Certificate of Authenticity, and exclusive packaging.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 9,
                "slug": "mattel-creations",
                "name": "Mattel Creations",
                "description": "Collector-exclusive release from Mattel Creations.",
                "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 18,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "characterId": 39,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01",
                "character": {
                    "id": 39,
                    "slug": "fangelica",
                    "name": "Fangelica",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 39,
                "slug": "fang-vote",
                "name": "Fang Vote",
                "description": "The Fang Vote series allows fans to decide what Monster High doll will be created. Voting decides the character, hair & makeup, shoes, and accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:27",
                "createdAt": "2026-01-05 22:37:27"
            }
        ],
        "imageUrls": [
            {
                "id": 125,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 126,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 127,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 128,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 129,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 130,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 131,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 132,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 133,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 134,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            },
            {
                "id": 135,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "url": "/demo/releases/2025/catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            }
        ],
        "mediaAssets": [
            {
                "id": 20,
                "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
                "mediaAssetId": 19,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:01",
                "createdAt": "2026-01-05 22:46:01"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "slug": "scary-sweet-birthday-frankie-stein",
        "name": "Scary Sweet Birthday Frankie Stein",
        "sku": null,
        "releaseYear": 2025,
        "description": "Frankie Stein has long straight black hair with blue and white streaks in it. Their bold blue lips and white eyeshadow accentuate a pale blue complexion.\nThey wear an elaborate silver cage skirt over a black dress featuring a plaid skirt and statement sleeve. A blue lightning bolt necklace, silver earrings, and silver hairpiece complete the look. On their feet are blue and silver lightning-studded heels.\nParty-themed accessories include a gift bag for Draculaura with a surprise present inside, an invite, and a birthday card.\nThe lightning purse and cute heart balloon are my favorites, though.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 19,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "characterId": 118,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05",
                "character": {
                    "id": 118,
                    "slug": "hoodude-voodoo",
                    "name": "Hoodude Voodoo",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 118,
                "slug": "scary-sweet-birthday",
                "name": "Scary Sweet Birthday",
                "description": "Scary Sweet Birthday features Monster High characters enjoying a birthday celebration.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:43",
                "createdAt": "2026-01-05 22:37:43"
            }
        ],
        "imageUrls": [
            {
                "id": 136,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            },
            {
                "id": 137,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            },
            {
                "id": 138,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            },
            {
                "id": 139,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            },
            {
                "id": 140,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            },
            {
                "id": 141,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            },
            {
                "id": 142,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            },
            {
                "id": 143,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            }
        ],
        "mediaAssets": [
            {
                "id": 21,
                "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
                "mediaAssetId": 40,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:05",
                "createdAt": "2026-01-05 22:46:05"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "slug": "skullector-edward-scissorhands",
        "name": "Skullector Edward Scissorhands",
        "sku": "JDR70",
        "releaseYear": 2025,
        "description": "The newest Skullector doll celebrates the 35th anniversary of the cult classic film *Edward Scissorhands*.\nThe doll has jet black voluminous hair with a silver and gold mechanical heart headband. Her pale complexion is enhanced by black lipstick, purple eyeshadow, and scars on her face and lip.\nBoth of her hands are adorned with scissors just like in the movie.\nShe wears a black faux leather bodysuit with buckle straps across the bodice and a sheer black skirt. On her feet are black knee-high boots featuring a dinosaur topiary and an ice angel sculpture as heels, referencing iconic scenes from the movie.\nIncluded with Edward Scissorhands is a doll stand and a certificate of authenticity.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 9,
                "slug": "mattel-creations",
                "name": "Mattel Creations",
                "description": "Collector-exclusive release from Mattel Creations.",
                "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 20,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 144,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 145,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 146,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 147,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 148,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 149,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 150,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 151,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 152,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 153,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            },
            {
                "id": 154,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "url": "/demo/releases/2025/skullector/edward/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            }
        ],
        "mediaAssets": [
            {
                "id": 22,
                "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
                "mediaAssetId": 33,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:08",
                "createdAt": "2026-01-05 22:46:08"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "slug": "skulltimate-secrets-hauntlywood-catty-noir",
        "name": "Skulltimate Secrets Hauntlywood Catty Noir",
        "sku": null,
        "releaseYear": 2025,
        "description": "Catty Noir has long straight pink hair with silver tinsel strands running through it. Complementing her dark complexion is teal and silver eyeshadow and bold pink lips.\nAn assortment of clothing lets her create a variety of outfits. She has a pink dress adorned with hearts, a fur-trimmed silver and teal jacket, a fur-trimmed pink skirt, and a silver skirt adorned with hearts.\nHer feet can be dressed in silver high-heeled boots with pink chains or high-heeled silver boots with teal stars on the side.\nFor accessories, Catty has silver bracelets and a silver necklace, a silver cage bodice, a blue belt, a purse, sunglasses, and music trophy.\n<strong>Closet Container</strong>\nWith Catty Noir is a pink and teal Hauntlywood Mysteries closet that holds the doll and all their belongings. Use the magnifying glass key to reveal symbols on the treasure map and unlock the closet doors.\nFind the 3 charms hidden in the closet and piece them together to make a single mystery talisman. Insert the talisman at the base of the closet, then slide it up to unveil the doll.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 21,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "characterId": 135,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            }
        ],
        "series": [
            {
                "id": 135,
                "slug": "skulltimate-secrets",
                "name": "Skulltimate Secrets",
                "description": "Skulltimate Secrets features Monster High ghouls who need an outfit change. Each doll has a Coffin container with compartments packed full of outfits and accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:50",
                "createdAt": "2026-01-05 22:37:50"
            }
        ],
        "imageUrls": [
            {
                "id": 155,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            },
            {
                "id": 156,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            },
            {
                "id": 157,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            },
            {
                "id": 158,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            },
            {
                "id": 159,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            },
            {
                "id": 160,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            },
            {
                "id": 161,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            }
        ],
        "mediaAssets": [
            {
                "id": 23,
                "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
                "mediaAssetId": 19,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:11",
                "createdAt": "2026-01-05 22:46:11"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "slug": "skullector-elvira-mistress-of-the-dark",
        "name": "Skullector Elvira, Mistress of the Dark",
        "sku": "HYV99",
        "releaseYear": 2025,
        "description": "The newest Skullector Elvira, Mistress of the Dark doll is inspired by her grand finale fashion in the movie *Elvira: Mistress of the Dark*.\nElvira has long jet-black hair worn in her signature high bouffant. Her pale complexion is enhanced by bold dark red lips and violet and purple eyeshadow.\nShe wears a black faux leather dress with sheer panels in the front and mesh long sleeves.  Over the dress, she has a metallic silver molded chest piece with a chain belt and a gold dagger. On her feet are black high-heeled shoes with silver bats wrapped around her ankle.\nA shimmering mesh batwing cape with silver spiderwebs printed on it, completes the look.\nAdditional accessories include a spiderweb collar, silver snake earrings, and two spiderweb gauntlet cuffs.\nIncluded with Elvira, Mistress of the Dark, is a doll stand, a Certificate of Authenticity, and premium packaging.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 22,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 162,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "url": "/demo/releases/2025/skullector/elvira/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            },
            {
                "id": 163,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "url": "/demo/releases/2025/skullector/elvira/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            },
            {
                "id": 164,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "url": "/demo/releases/2025/skullector/elvira/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            },
            {
                "id": 165,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "url": "/demo/releases/2025/skullector/elvira/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            },
            {
                "id": 166,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "url": "/demo/releases/2025/skullector/elvira/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            },
            {
                "id": 167,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "url": "/demo/releases/2025/skullector/elvira/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            },
            {
                "id": 168,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "url": "/demo/releases/2025/skullector/elvira/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            },
            {
                "id": 169,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "url": "/demo/releases/2025/skullector/elvira/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            }
        ],
        "mediaAssets": [
            {
                "id": 24,
                "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
                "mediaAssetId": 37,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:12",
                "createdAt": "2026-01-05 22:46:12"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "slug": "designer-series-corazon-marikit",
        "name": "Designer Series Corazon Marikit",
        "sku": "HXJ09",
        "releaseYear": 2025,
        "description": "Corazon Marikit has long, wavy black and purple hair. Her pink complexion is enhanced by bold red lips and pink and purple eyeshadow.\nShe wears traditional Filipino fashions and accessories including a foil print white dress with red hearts and red fringe. On her feet are gold and green sculpted sandals.\nAdditional accessories include a yellow and green purse and a pink and white fan. Corazon has beautifully embroidered pink batwings as well.\nShe can be separated into two pieces and comes with special packaging. Move levers up and down on the box to display her in multiple poses.\nA special doll stand allows the upper body to slide up and down or allows the lower body to swing and rotate.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 9,
                "slug": "mattel-creations",
                "name": "Mattel Creations",
                "description": "Collector-exclusive release from Mattel Creations.",
                "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 24,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "characterId": 30,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15",
                "character": {
                    "id": 30,
                    "slug": "dracula",
                    "name": "Dracula",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 30,
                "slug": "designer-series",
                "name": "Designer Series",
                "description": "Monster High characters that are straight from the minds of Mattel’s in-house designers.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:24",
                "createdAt": "2026-01-05 22:37:24"
            }
        ],
        "imageUrls": [
            {
                "id": 177,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 178,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 179,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 180,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 181,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 182,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 183,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 184,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 185,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 186,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 187,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 188,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 189,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 190,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 191,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 192,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 193,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 194,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 195,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 196,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 197,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 198,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 199,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 200,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 201,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            },
            {
                "id": 202,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            }
        ],
        "mediaAssets": [
            {
                "id": 26,
                "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
                "mediaAssetId": 24,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:15",
                "createdAt": "2026-01-05 22:46:15"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
        "slug": "funko-pop-retro-toys-abbey-bominable",
        "name": "Funko Pop! Retro Toys Abbey Bominable",
        "sku": "155",
        "releaseYear": 2025,
        "description": "Abbey Bominable has long hair streaked with white, purple, magenta, and blue. Her pale blue complexion is enhanced by purple eyeshadow and magenta lips.\nShe wears a dress featuring a pink, white, black, and blue abstract design trimmed in white fur. On her feet are boots made of white fur.\nAdditional accessories include blue and pink earrings, white fur arm warmers, and a white fur hat.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:18",
        "createdAt": "2026-01-05 22:46:18",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [],
        "series": [
            {
                "id": 157,
                "slug": "funko-pop-retro-toys",
                "name": "Funko Pop! Retro Toys",
                "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 203,
                "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
                "url": "/demo/releases/2025/retro-toys-abbey-bominable/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:18",
                "createdAt": "2026-01-05 22:46:18"
            },
            {
                "id": 204,
                "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
                "url": "/demo/releases/2025/retro-toys-abbey-bominable/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:18",
                "createdAt": "2026-01-05 22:46:18"
            },
            {
                "id": 205,
                "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
                "url": "/demo/releases/2025/retro-toys-abbey-bominable/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:18",
                "createdAt": "2026-01-05 22:46:18"
            }
        ],
        "mediaAssets": [
            {
                "id": 27,
                "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
                "mediaAssetId": 1,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:18",
                "createdAt": "2026-01-05 22:46:18"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
        "slug": "funko-pop-retro-toys-sweet-1600-draculaura",
        "name": "Funko Pop! Retro Toys Sweet 1600 Draculaura",
        "sku": "156",
        "releaseYear": 2025,
        "description": "Celebrate the 80th Anniversary of Mattel with the Amazon exclusive POP Sweet 1600 Draculaura.\nDraculaura has long, pink and black striped hair, adorned with a pink heart headband. Her pale pink skin is complemented by bright pink eyeshadow and red lips. A little pink heart with 1600 written in it is below her left eye.\nShe wears a skull-printed pink and black dress with pink bows on the white and pink ruffled hem. On her feet are pink and black heels.\nFor accessories, she has a pink bow belt, pink earrings, and a pink fanged lip clutch.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:19",
        "createdAt": "2026-01-05 22:46:19",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 1,
                "slug": "amazon",
                "name": "Amazon",
                "description": "Exclusive release available only on Amazon.",
                "imageUrl": "https://example.com/images/amazon_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [],
        "series": [
            {
                "id": 157,
                "slug": "funko-pop-retro-toys",
                "name": "Funko Pop! Retro Toys",
                "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 206,
                "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
                "url": "/demo/releases/2025/retro-toys-draculaura-1600/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:19",
                "createdAt": "2026-01-05 22:46:19"
            },
            {
                "id": 207,
                "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
                "url": "/demo/releases/2025/retro-toys-draculaura-1600/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:19",
                "createdAt": "2026-01-05 22:46:19"
            },
            {
                "id": 208,
                "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
                "url": "/demo/releases/2025/retro-toys-draculaura-1600/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:19",
                "createdAt": "2026-01-05 22:46:19"
            }
        ],
        "mediaAssets": [
            {
                "id": 28,
                "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
                "mediaAssetId": 31,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:19",
                "createdAt": "2026-01-05 22:46:19"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
        "slug": "funko-pop-retro-toys-howliday-draculaura",
        "name": "Funko Pop! Retro Toys Howliday Draculaura",
        "sku": "163",
        "releaseYear": 2025,
        "description": "Draculaura has long, pink and black striped hair. Her pale pink skin is complemented by pink and purple eyeshadow and light pink lips. A little black heart is below her left eye.\nShe wears a pink spiderweb printed dress under a long dark grey jacket. On her feet are chunky black boots. A black belt with a pink buckle and black and white striped arm warmers completes her look.\nFor accessories, she has an intricate black collar necklace and pink and black bat wing earrings.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:20",
        "createdAt": "2026-01-05 22:46:20",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [],
        "series": [
            {
                "id": 157,
                "slug": "funko-pop-retro-toys",
                "name": "Funko Pop! Retro Toys",
                "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 209,
                "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
                "url": "/demo/releases/2025/retro-toys-draculaura-howliday/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:20",
                "createdAt": "2026-01-05 22:46:20"
            },
            {
                "id": 210,
                "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
                "url": "/demo/releases/2025/retro-toys-draculaura-howliday/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:20",
                "createdAt": "2026-01-05 22:46:20"
            },
            {
                "id": 211,
                "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
                "url": "/demo/releases/2025/retro-toys-draculaura-howliday/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:20",
                "createdAt": "2026-01-05 22:46:20"
            }
        ],
        "mediaAssets": [
            {
                "id": 29,
                "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
                "mediaAssetId": 31,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:20",
                "createdAt": "2026-01-05 22:46:20"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
        "slug": "buried-secrets-cozy-creepover-draculaura",
        "name": "Buried Secrets Cozy Creepover Draculaura",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secret Cozy Creepover Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed.\nDraculaura has long, straight, pink hair with black streaks framing her face. Her pale pink complexion is enhanced with bold pink lips and pink eyeshadow.\nShe wears a pink pajama outfit with a black top and black spiderwebs featuring a pink heart in the center. On her feet are black peep-toe slippers with bat wings on the heels.\nAdditional accessories include a translucent pink face roller, a pink eye mask, pink earrings, and a black perfume bottle.\nWith Draculaura is Count Fabulous, her pet bat.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:21",
        "createdAt": "2026-01-05 22:46:21",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 25,
                "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:21",
                "createdAt": "2026-01-05 22:46:21",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 212,
                "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-draculaura/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:21",
                "createdAt": "2026-01-05 22:46:21"
            },
            {
                "id": 213,
                "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:21",
                "createdAt": "2026-01-05 22:46:21"
            },
            {
                "id": 214,
                "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-draculaura/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:21",
                "createdAt": "2026-01-05 22:46:21"
            }
        ],
        "mediaAssets": [
            {
                "id": 30,
                "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
                "mediaAssetId": 31,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:21",
                "createdAt": "2026-01-05 22:46:21"
            }
        ],
        "mediaAssets2": [
            {
                "id": 6,
                "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
                "mediaAssetId": 27,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:46:21",
                "createdAt": "2026-01-05 22:46:21"
            }
        ]
    },
    {
        "id": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "slug": "buried-secrets-haunted-dance-clawdeen-wolf",
        "name": "Buried Secrets Haunted Dance Clawdeen Wolf",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secrets Haunted Dance Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed.\nClawdeen Wolf has short and extremely curly purple hair. Her tan complexion is enhanced by bold purple lipstick and purple and gold eyeshadow.\nShe wears a mini-dress with a purple top, while the bottom features a gold and black design and black tulle. Over the dress, she has a gold molded chest piece shaped into a bow with pink stars. On her feet are pink platform shoes.\nClawdeen’s masquerade mask is pink and gold and shaped like a wolf to represent her heritage. Additional accessories include a light purple handbag embossed with a moon and stars, a gold star-topped hair pick, a purple water bottle, and black bow earrings.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 26,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 215,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24"
            },
            {
                "id": 216,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24"
            },
            {
                "id": 217,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24"
            },
            {
                "id": 218,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24"
            },
            {
                "id": 219,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24"
            },
            {
                "id": 220,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24"
            },
            {
                "id": 221,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24"
            }
        ],
        "mediaAssets": [
            {
                "id": 31,
                "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
                "mediaAssetId": 21,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:24",
                "createdAt": "2026-01-05 22:46:24"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "slug": "generation-3-nefera-de-nile",
        "name": "Generation 3 Nefera de Nile",
        "sku": "JDR48",
        "releaseYear": 2025,
        "description": "Nefera de Nile has long, straight turquoise hair with purple streaks and gold tinsel strands running through it, styled in a high ponytail. Her turquoise lips and turquoise, purple, and gold eyeshadow accentuate her tan skin.\nShe wears a printed mummy wrap dress with sheer black sleeves on each arm, one featuring a snake cuff and the other a gold ribbon fringe. On her feet are black and gold knee-high shoes with cobra heels.\nA gold belt, a purple snake necklace, gold scorpion earrings, purple translucent sunglasses, and a turquoise hieroglyphic handbag featuring a gold snake handle and gold scarab on the front complete the look.\nNefera comes with several accessories, including a computer, iCoffin, snacks, and lotus water.\nWith Nefera is Lavish, her Egyptian scarab pet.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 27,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "characterId": 62,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27",
                "character": {
                    "id": 62,
                    "slug": "lost-boys-david",
                    "name": "Lost Boys David",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 62,
                "slug": "generation-3",
                "name": "Generation 3",
                "description": "This series welcomes a new class of ghouls to Monster High. These classic characters have been reimaged for a new generation.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:32",
                "createdAt": "2026-01-05 22:37:32"
            }
        ],
        "imageUrls": [
            {
                "id": 222,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            },
            {
                "id": 223,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            },
            {
                "id": 224,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            },
            {
                "id": 225,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            },
            {
                "id": 226,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            },
            {
                "id": 227,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            },
            {
                "id": 228,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            },
            {
                "id": 229,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            },
            {
                "id": 230,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            }
        ],
        "mediaAssets": [
            {
                "id": 32,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "mediaAssetId": 71,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            }
        ],
        "mediaAssets2": [
            {
                "id": 7,
                "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
                "mediaAssetId": 32,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:46:27",
                "createdAt": "2026-01-05 22:46:27"
            }
        ]
    },
    {
        "id": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "slug": "scary-sweet-birthday-clawdeen-wolf-cake-playset",
        "name": "Scary Sweet Birthday Clawdeen Wolf Cake Playset",
        "sku": null,
        "releaseYear": 2025,
        "description": "The Clawdeen Wolf Cake Playset comes with everything you need to help celebrate Draculaura’s sweet 1600 birthday.\nThe playset comes with a cake decorating station and a ton of accessories to design the perfect cake including decorations, tools, pans, and containers to deliver them.\nThis playset also includes a Clawdeen Wolf doll who has long brown hair with purple streaks in it. Her bold purple lips and purple eyeshadow accentuate her tan complexion. Freckles adorn her face.\nShe wears a golden cage skirt over a purple printed dress with ruffles on the bottom. On her feet are chunky gold heels and she wears large gold hoop earrings.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            },
            {
                "id": 2,
                "slug": "variant",
                "name": "Variant",
                "description": "Represents a variation of a release (e.g., color or packaging differences).",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 28,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "characterId": 118,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28",
                "character": {
                    "id": 118,
                    "slug": "hoodude-voodoo",
                    "name": "Hoodude Voodoo",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 118,
                "slug": "scary-sweet-birthday",
                "name": "Scary Sweet Birthday",
                "description": "Scary Sweet Birthday features Monster High characters enjoying a birthday celebration.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:43",
                "createdAt": "2026-01-05 22:37:43"
            }
        ],
        "imageUrls": [
            {
                "id": 231,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-1.jpg",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28"
            },
            {
                "id": 232,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-5-1.jpg",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28"
            },
            {
                "id": 233,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-4.jpg",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28"
            },
            {
                "id": 234,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-5.jpg",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28"
            },
            {
                "id": 235,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-3.jpg",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28"
            },
            {
                "id": 236,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-2.jpg",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28"
            },
            {
                "id": 237,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-1.jpg",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28"
            }
        ],
        "mediaAssets": [
            {
                "id": 33,
                "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
                "mediaAssetId": 21,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:28",
                "createdAt": "2026-01-05 22:46:28"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "slug": "skullector-us-adelaide-and-red",
        "name": "Skullector US – Adelaide and Red",
        "sku": "HYV97",
        "releaseYear": 2025,
        "description": "This two-pack of Monster High dolls, featuring Adelaide and Red, is inspired by the 2019 movie *US*.\n<strong>Adelaide</strong>\nAdelaide has black, medium braided hair and her dark complexion is enhanced with dark brown lipstick.\nShe wears a tan and white rabbit-camo printed jumpsuit under a red and white long-sleeve mesh shirt. On her feet are white, strappy, high-heeled sandals with a white rabbit on one heel and a creepy face on the other. The words “Tethered Together” are written on the front.\nA gold hair barrette, gold handcuff earrings, and a gold chain belt complete the look. Additional accessories include a tan rabbit and a red paper doll chain.\n<strong>Red</strong>\nRed has short black hair, brown lipstick, and red and brown eyeshadow that enhance her dark complexion.\nShe wears a scarlet paper doll printed jumpsuit. On her feet are beige, strappy, high-heeled sandals with a red rabbit on one heel and a creepy white face on the other. The words “Find Yourself” are written on the front.\nA gold scissor belt, gold fingerless gloves, and red paper doll earrings complete the look. Additional accessories include a white rabbit and a pair of gold scissors.\nThe set comes with a Certificate of Authenticity, doll stands, and deluxe packaging featuring artwork and photography inspired by the movie.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 9,
                "slug": "mattel-creations",
                "name": "Mattel Creations",
                "description": "Collector-exclusive release from Mattel Creations.",
                "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 29,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 238,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 239,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 240,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 241,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 242,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 243,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 244,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 245,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 246,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 247,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 248,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 249,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 250,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 251,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 252,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            },
            {
                "id": 253,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            }
        ],
        "mediaAssets": [
            {
                "id": 34,
                "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
                "mediaAssetId": 2,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:30",
                "createdAt": "2026-01-05 22:46:30"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b93-742a-858e-c3f079d70727",
        "slug": "skullector-lost-boys-david",
        "name": "Skullector Lost Boys David",
        "sku": "HRP88",
        "releaseYear": 2025,
        "description": "The newest Skullector doll is inspired by the character David from the iconic horror movie *The Lost Boys*!\nShe has long, straight blond hair piled high in the front. <span class=\"f22q1s9\">Soft peach lips accentuate her pale complexion</span><span class=\"fc6omth regular_f1jfh96c f18ev72d\"> along with red and black eyeshadow. Golden eyes and fangs complete her vampire look.</span>\nThe doll wears a black trench coat and a faux leather black bodysuit. On the front of the bodysuit is a picture of a monster with yellow eyes and sharp teeth. On her feet are knee-high black boots, including heels with a saxophone and a vampire blood bottle.\nAdditional accessories include black gloves, long black earrings, a golden brooch, and takeout-box-style purse filled with worms.\nIncluded with Lost Boys David are a doll stand and premium packaging.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 9,
                "slug": "mattel-creations",
                "name": "Mattel Creations",
                "description": "Collector-exclusive release from Mattel Creations.",
                "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 30,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 254,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 255,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 256,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 257,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 258,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 259,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 260,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 261,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 262,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 263,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 264,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            },
            {
                "id": 265,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            }
        ],
        "mediaAssets": [
            {
                "id": 35,
                "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
                "mediaAssetId": 62,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:32",
                "createdAt": "2026-01-05 22:46:32"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b93-7443-baef-90e06d870115",
        "slug": "scary-sweet-birthday-cleo-de-nile",
        "name": "Scary Sweet Birthday Cleo de Nile",
        "sku": null,
        "releaseYear": 2025,
        "description": "Cleo de Nile has long straight blue hair with with gold tinsel streaks throughout styled in a high ponytail. Her bold black lips and gold and blue eyeshadow accentuate her tan complexion.\nShe wears an elaborate golden cage skirt with beaded accents over a black dress with sheer sleeves and cascading ribbons.  A gold collar draping across her shoulders, gold hairpieces, and gold snake earrings complete the look.\nOn her feet are chunky gold heels with turquoise accents.\nParty-themed accessories include a gift bag for Draculaura with a surprise present inside, an invite, and birthday card. The cake frosting purse and cool scarab balloon are my favorites though.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 31,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "characterId": 118,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36",
                "character": {
                    "id": 118,
                    "slug": "hoodude-voodoo",
                    "name": "Hoodude Voodoo",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 118,
                "slug": "scary-sweet-birthday",
                "name": "Scary Sweet Birthday",
                "description": "Scary Sweet Birthday features Monster High characters enjoying a birthday celebration.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:43",
                "createdAt": "2026-01-05 22:37:43"
            }
        ],
        "imageUrls": [
            {
                "id": 266,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            },
            {
                "id": 267,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            },
            {
                "id": 268,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            },
            {
                "id": 269,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            },
            {
                "id": 270,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            },
            {
                "id": 271,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            },
            {
                "id": 272,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            },
            {
                "id": 273,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            }
        ],
        "mediaAssets": [
            {
                "id": 36,
                "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
                "mediaAssetId": 23,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:36",
                "createdAt": "2026-01-05 22:46:36"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
        "slug": "funko-pop-retro-toys-haunt-couture-cleo-de-nile",
        "name": "Funko Pop! Retro Toys Haunt Couture Cleo De Nile",
        "sku": "169",
        "releaseYear": 2025,
        "description": "Celebrate the 80th Anniversary of Mattel with the Haunt Couture Cleo De Nile figure.\nCleo has long, wavy black hair, while her pale complexion is enhanced with blue and gold eyeshadow and gold lips.\nShe wears a gold mummy wrap-inspired bodysuit with black straps wrapped around her body. On her feet are black and gold heels.\nAn elaborate gold Anubis-themed face mask with a blue scarab on the front and an elegant gold necklace complete the look.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:39",
        "createdAt": "2026-01-05 22:46:39",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [],
        "series": [
            {
                "id": 157,
                "slug": "funko-pop-retro-toys",
                "name": "Funko Pop! Retro Toys",
                "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 274,
                "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
                "url": "/demo/releases/2025/retro-toys-haunt-couture-cleo-de/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:39",
                "createdAt": "2026-01-05 22:46:39"
            },
            {
                "id": 275,
                "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
                "url": "/demo/releases/2025/retro-toys-haunt-couture-cleo-de/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:39",
                "createdAt": "2026-01-05 22:46:39"
            },
            {
                "id": 276,
                "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
                "url": "/demo/releases/2025/retro-toys-haunt-couture-cleo-de/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:39",
                "createdAt": "2026-01-05 22:46:39"
            }
        ],
        "mediaAssets": [
            {
                "id": 37,
                "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
                "mediaAssetId": 23,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:39",
                "createdAt": "2026-01-05 22:46:39"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b93-73af-a440-87460c0be140",
        "slug": "reel-drama-cleo-de-nile",
        "name": "Reel Drama Cleo De Nile",
        "sku": "JDR65",
        "releaseYear": 2025,
        "description": "Cleo De Nile is grayscale with long, straight black hair highlighted with gold tinsel. Shimmering gold eyes are enhanced by her pale gray complexion.\nShe wears a black &amp; white ensemble, which is a reproduction of her original look, consisting of mummy-wrapped capris and a tank top. On her feet are white mummy-wrapped sandals with black heels.\nAdditional accessories include a cell phone and case, silver earrings, a silver arm cuff, a silver headband, and a wide pearl belt.\nCleo De Nile is about 10.5 inches tall and comes with Hissette, her pet snake. Also included is a doll stand and two Cleo De Nile posters, one mini and one full size.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 32,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "characterId": 112,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42",
                "character": {
                    "id": 112,
                    "slug": "frankenstein",
                    "name": "Frankenstein",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 112,
                "slug": "reel-drama",
                "name": "Reel Drama",
                "description": "Reel Drama features ghouls inspired by classic horror films. Each doll is black & white complemented by a little bit of color and comes with a movie-themed poster.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:41",
                "createdAt": "2026-01-05 22:37:41"
            }
        ],
        "imageUrls": [
            {
                "id": 277,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            },
            {
                "id": 278,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            },
            {
                "id": 279,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            },
            {
                "id": 280,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            },
            {
                "id": 281,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            },
            {
                "id": 282,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            },
            {
                "id": 283,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            },
            {
                "id": 284,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            }
        ],
        "mediaAssets": [
            {
                "id": 38,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "mediaAssetId": 23,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            }
        ],
        "mediaAssets2": [
            {
                "id": 8,
                "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
                "mediaAssetId": 31,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:46:42",
                "createdAt": "2026-01-05 22:46:42"
            }
        ]
    },
    {
        "id": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "slug": "skullector-corpse-bride",
        "name": "Skullector Corpse Bride",
        "sku": "JDR67",
        "releaseYear": 2025,
        "description": "Mattel is celebrating the 20th anniversary of Tim Burton’s* Corpse Bride* with an exciting Emily doll to add to the Skullector family.\nEmily has long, wavy, blue hair with indigo streaks in it. Her pale blue complexion is enhanced by pink lips and dramatic purple eyeshadow.\nShe wears a blue, mesh, spiderweb-style bridal gown with a black vine waist belt adorned with a blue butterfly. On her feet are black heels with Scraps the skeleton dog, representing one of those heels.\nSheer blue leg and arm warmers along with a vine-inspired black headpiece adorned with blue butterflies and a flowing blue mesh veil, complete the look.\nAdditional accessories include Victor’s ring on her skeletal hand and her pet Maggot is styled as earrings.\nIncluded with Emily is a doll stand, a certificate of authenticity, and premium packaging.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 33,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 285,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 286,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 287,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 288,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 289,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 290,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 291,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 292,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 293,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 294,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            },
            {
                "id": 295,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            }
        ],
        "mediaAssets": [
            {
                "id": 39,
                "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
                "mediaAssetId": 25,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:45",
                "createdAt": "2026-01-05 22:46:45"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "slug": "boo-riginal-creeproduction-toralei-stripe",
        "name": "Boo-riginal Creeproduction Toralei Stripe",
        "sku": null,
        "releaseYear": 2025,
        "description": "Toralei Stripe has short auburn hair styled in a bob with black streaks across it on one side. <span class=\"f22q1s9\">Her bold dark red lips accentuate her tan complexion</span><span class=\"fc6omth regular_f1jfh96c f18ev72d\"> along with emerald green eyeshadow.</span>\nShe wears a red tiger-striped blouse, faux black leather jacket, and clawed-up black capri pants. On her feet are black open-toe shoes with red heels and red laces.\nAccessories include silver earrings, an orange scarf, red fingerless gloves, and a gold grommeted belt with a silver skullette buckle. A handbag, diary, brush, and doll stand are also included.\nWith Toralei is Sweet Tooth, her pet saber-toothed cub.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 34,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "characterId": 11,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49",
                "character": {
                    "id": 11,
                    "slug": "beetlejuice-lydia",
                    "name": "Beetlejuice & Lydia",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 11,
                "slug": "boo-riginal-creeproduction",
                "name": "Boo-riginal Creeproduction",
                "description": "The original ghouls of Monster High are back. Each ghoul is a reproduction of the original doll with all her fangtastic accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:17",
                "createdAt": "2026-01-05 22:37:17"
            }
        ],
        "imageUrls": [
            {
                "id": 296,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "url": "/demo/releases/2025/toralei-stripe/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49"
            },
            {
                "id": 297,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "url": "/demo/releases/2025/toralei-stripe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49"
            },
            {
                "id": 298,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "url": "/demo/releases/2025/toralei-stripe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49"
            },
            {
                "id": 299,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "url": "/demo/releases/2025/toralei-stripe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49"
            },
            {
                "id": 300,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "url": "/demo/releases/2025/toralei-stripe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49"
            },
            {
                "id": 301,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "url": "/demo/releases/2025/toralei-stripe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49"
            }
        ],
        "mediaAssets": [
            {
                "id": 40,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "mediaAssetId": 94,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49"
            }
        ],
        "mediaAssets2": [
            {
                "id": 9,
                "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
                "mediaAssetId": 41,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:46:49",
                "createdAt": "2026-01-05 22:46:49"
            }
        ]
    },
    {
        "id": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "slug": "fearbook-venus-mcflytrap",
        "name": "Fearbook Venus McFlytrap",
        "sku": "JDR59",
        "releaseYear": 2025,
        "description": "Venus McFlytrap is ready for her close-up in the Monster High yearbook.\nShe has short and extremely curly green and pink hair. Her bold red lips and pink and yellow eyeshadow accentuate her pale green complexion.\nVenus wears floral print overalls over a long-sleeved black shirt. She also comes with a Unearthed Club club varsity jacket. On her feet are black and pink gardening boots with a venus flytrap image on the side.\nShe comes with a number of gardening accessories including sunglasses, gloves, a tote bag, Unearthed Day poster, a watering can, a spade, a fork, and a planter box with flowers!",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 13,
                "slug": "target",
                "name": "Target",
                "description": "Exclusive release available at Target.",
                "imageUrl": "https://example.com/images/target_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 35,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "characterId": 41,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51",
                "character": {
                    "id": 41,
                    "slug": "ghoulia-yelps",
                    "name": "Ghoulia Yelps",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 41,
                "slug": "fearbook",
                "name": "Fearbook",
                "description": "Fearbook features Monster High students dressed to impress for their photos. Each sports a varsity jacket and has everything needed to participate in their favorite club.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:27",
                "createdAt": "2026-01-05 22:37:27"
            }
        ],
        "imageUrls": [
            {
                "id": 302,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51"
            },
            {
                "id": 303,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51"
            },
            {
                "id": 304,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51"
            },
            {
                "id": 305,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51"
            },
            {
                "id": 306,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51"
            },
            {
                "id": 307,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51"
            },
            {
                "id": 308,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51"
            }
        ],
        "mediaAssets": [
            {
                "id": 41,
                "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
                "mediaAssetId": 98,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:51",
                "createdAt": "2026-01-05 22:46:51"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
        "slug": "buried-secrets-scaremester-toralei-stripe",
        "name": "Buried Secrets Scaremester Toralei Stripe",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secret Scaremester Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed. To add to the surprise, the doll could be from the Buried Secret Scaremester or the Buried Secret Cozy Creepover series.\nToralei Stripe has long, straight, orange hair with purple streaks framing her face. Her tan complexion is enhanced with bold purple lips and orange eyeshadow.\nHer dress is a sleeveless purple top and a striped printed black, purple, and pink bottom. It also has a white collar and a long pink tie adorned with music notes. On her feet are pink Mary Janes.\nAdditional accessories include a red drinking cup, black glasses, black fishbone earrings, and a red purse with a diamond paw print on the front.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:55",
        "createdAt": "2026-01-05 22:46:55",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 36,
                "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:55",
                "createdAt": "2026-01-05 22:46:55",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 309,
                "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
                "url": "/demo/releases/2025/buried-secrets-scaremester-tolarei-stripe/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:55",
                "createdAt": "2026-01-05 22:46:55"
            },
            {
                "id": 310,
                "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
                "url": "/demo/releases/2025/buried-secrets-scaremester-tolarei-stripe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:55",
                "createdAt": "2026-01-05 22:46:55"
            },
            {
                "id": 311,
                "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
                "url": "/demo/releases/2025/buried-secrets-scaremester-tolarei-stripe/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:55",
                "createdAt": "2026-01-05 22:46:55"
            }
        ],
        "mediaAssets": [
            {
                "id": 42,
                "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
                "mediaAssetId": 94,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:55",
                "createdAt": "2026-01-05 22:46:55"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "slug": "skullector-betelgeuse-and-lydia-deetz",
        "name": "Skullector Betelgeuse and Lydia Deetz",
        "sku": "HYV96",
        "releaseYear": 2025,
        "description": "Lydia Deetz and Betelgeuse return to the world of Monster High in a 2-pack inspired by the wedding scene from the *Beetlejuice Beetlejuice* movie.\n<strong>Betelgeuse</strong>\nBetelgeuse has curly neon green hair, bold emerald green lips, and pink eyeshadow that enhances her pale skin.\nShe wears a two-piece red striped suit with faux leather accents over a ruffled cream-colored shirt and black bow tie. On her feet are white shoes with tombstone and beetle heels.\nAdditional accessories include black earrings, a white and black striped headband, and a heart she carries around in her hand.\n<strong>Lydia Deetz </strong>\nLydia has long black hair styled in a high ponytail with sharp bangs, pale nude lips, and red eyeshadow that enhances her pale skin.\nShe wears a red tulle gown complete with a sheer veil, bow collar, and jagged Swiss dot skirt. On her feet are red Mary Janes with black heels.\nLydia also carries a red bouquet that doubles as a purse.\nThe set comes with a Certificate of Authenticity and doll stands.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 37,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 312,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 313,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 314,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 315,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 316,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 317,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 318,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 319,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 320,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 321,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            },
            {
                "id": 322,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            }
        ],
        "mediaAssets": [
            {
                "id": 43,
                "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
                "mediaAssetId": 11,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:46:57",
                "createdAt": "2026-01-05 22:46:57"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "slug": "self-scare-secrets-abbey-bominable",
        "name": "Self-Scare Secrets Abbey Bominable",
        "sku": "JHK44",
        "releaseYear": 2025,
        "description": "Abbey Bominable has long, straight, white hair with pale purple streaks in the front. <span class=\"f22q1s9\">Her bold blue lips accentuate her pale blue complexion,</span><span class=\"fc6omth regular_f1jfh96c f18ev72d\"> along with blue eyeshadow.</span>\nShe wears a purple knit crop top and a blue skirt with faux fur black trim and silver foil snowflakes printed on it. On her feet are purple platform sandals.\nAdditional accessories include translucent purple earrings, tattoos, and a blue case containing hair products, as well as knitting and painting supplies.\nWith Abbey is Tundra, her pet woolly mammoth.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 38,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "characterId": 123,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00",
                "character": {
                    "id": 123,
                    "slug": "lux-de-nile",
                    "name": "Lux de Nile",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 123,
                "slug": "self-scare-secrets",
                "name": "Self-Scare Secrets",
                "description": "Self-Scare Secrets features Monster High characters taking time to unwind with beauty rituals and cozy self-care routines.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:45",
                "createdAt": "2026-01-05 22:37:45"
            }
        ],
        "imageUrls": [
            {
                "id": 323,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            },
            {
                "id": 324,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            },
            {
                "id": 325,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            },
            {
                "id": 326,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            },
            {
                "id": 327,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            },
            {
                "id": 328,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            },
            {
                "id": 329,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            }
        ],
        "mediaAssets": [
            {
                "id": 44,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "mediaAssetId": 1,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            }
        ],
        "mediaAssets2": [
            {
                "id": 10,
                "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
                "mediaAssetId": 38,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:47:00",
                "createdAt": "2026-01-05 22:47:00"
            }
        ]
    },
    {
        "id": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "slug": "skullector-m3gan-doll",
        "name": "Skullector M3GAN Doll",
        "sku": "HYV94",
        "releaseYear": 2025,
        "description": "The newest Skullector doll is the robotic AI M3GAN from the movie of the same name.\nShe has wavy long blond hair. <span class=\"f22q1s9\">Pale pink lips accentuate her pale complexion</span><span class=\"fc6omth regular_f1jfh96c f18ev72d\"> along with light orange eyeshadow.</span>\nM3GAN wears a glossy mauve circuit board dress with white mesh sleeves and an oversized red, blue, and gold striped bow with a skull in the center. White code-print tights cover her legs. On her feet are black Mary Janes with an orange robot heel.\nHer outer face detaches to reveal the android face underneath. Additional accessories include a black PurRpetual Petz Bat Purse.\nIncluded with M3GAN is a doll stand and premium packaging.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 9,
                "slug": "mattel-creations",
                "name": "Mattel Creations",
                "description": "Collector-exclusive release from Mattel Creations.",
                "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 39,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 330,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 331,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 332,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 333,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 334,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 335,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 336,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 337,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 338,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 339,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 340,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 341,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 342,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 343,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 344,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            },
            {
                "id": 345,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "url": "/demo/releases/2025/skullector/megan/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            }
        ],
        "mediaAssets": [
            {
                "id": 45,
                "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
                "mediaAssetId": 65,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:03",
                "createdAt": "2026-01-05 22:47:03"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "slug": "boo-riginal-creeproduction-meowlody-purrsephone-2-pack",
        "name": "Boo-riginal Creeproduction Meowlody & Purrsephone 2-Pack",
        "sku": null,
        "releaseYear": 2025,
        "description": "This 2-pack features twin werecat sisters Meowlody and Purrsephone.\n<strong>Meowlody</strong>\nMeowlody has long, straight, white hair with a single section striped black. Bold red lips and blue eyeshadow enhance her grey and white skin.\nShe wears a sleeveless black top with white tiger print under a cropped black vest and a short red miniskirt with black stitching. On her feet are peep-toe knee-high black boots with red heels and bows up the front..\n<strong>Purrsephone</strong>\nPurrsephone has long, straight, black hair with a single white stripe running through it, alternating with black sections. Bold red lips and blue eyeshadow enhance her grey and white skin.\nShe wears a sleeveless white top with black tiger print under a cropped red vest and a short red miniskirt with black stitching. On her feet are peep-toe knee-high black boots with red heels and laces up the front.\nBoth sisters have matching accessories that include stacked bracelets, red fingerless gloves, and their purses are red balls of yarn.\nIncluded with the dolls is a shared diary, hair brushes, and doll stands.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 40,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "characterId": 11,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08",
                "character": {
                    "id": 11,
                    "slug": "beetlejuice-lydia",
                    "name": "Beetlejuice & Lydia",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 11,
                "slug": "boo-riginal-creeproduction",
                "name": "Boo-riginal Creeproduction",
                "description": "The original ghouls of Monster High are back. Each ghoul is a reproduction of the original doll with all her fangtastic accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:17",
                "createdAt": "2026-01-05 22:37:17"
            }
        ],
        "imageUrls": [
            {
                "id": 346,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            },
            {
                "id": 347,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            },
            {
                "id": 348,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            },
            {
                "id": 349,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            },
            {
                "id": 350,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            },
            {
                "id": 351,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            },
            {
                "id": 352,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            }
        ],
        "mediaAssets": [
            {
                "id": 46,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "mediaAssetId": 67,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": false,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            },
            {
                "id": 47,
                "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
                "mediaAssetId": 79,
                "kindId": 2,
                "caption": null,
                "sortOrder": 2,
                "width": null,
                "height": null,
                "isPublic": false,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:08",
                "createdAt": "2026-01-05 22:47:08"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b94-7f8c-a4c2-722939770e28",
        "slug": "buried-secrets-scaremester-frankie-stein",
        "name": "Buried Secrets Scaremester Frankie Stein",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secret Scaremester Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed. To add to the surprise, the doll could be from the Buried Secret Scaremester or the Buried Secret Cozy Creepover series.\nFrankie Stein has long straight black hair with blue streaks framing their face. Their pale blue complexion is enhanced with bold blue lips and blue eyeshadow.\nThey wear a jumper with a blue top and short white sleeves and a printed blue and pink bottom. It also has a black collar and a blue lightning-shaped tie. On their feet are dark blue chunky high-heeled boots.\nAdditional accessories include a blue drinking bottle, silver earrings, silver headband, and turquoise purse.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:11",
        "createdAt": "2026-01-05 22:47:11",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 41,
                "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:11",
                "createdAt": "2026-01-05 22:47:11",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 353,
                "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
                "url": "/demo/releases/2025/buried-secrets-scaremester-frankie-stein/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:11",
                "createdAt": "2026-01-05 22:47:11"
            },
            {
                "id": 354,
                "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
                "url": "/demo/releases/2025/buried-secrets-scaremester-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:11",
                "createdAt": "2026-01-05 22:47:11"
            },
            {
                "id": 355,
                "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
                "url": "/demo/releases/2025/buried-secrets-scaremester-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:11",
                "createdAt": "2026-01-05 22:47:11"
            }
        ],
        "mediaAssets": [
            {
                "id": 48,
                "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
                "mediaAssetId": 40,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:11",
                "createdAt": "2026-01-05 22:47:11"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b94-79b0-ab4b-73713a12a188",
        "slug": "buried-secrets-cozy-creepover-cleo-de-nile",
        "name": "Buried Secrets Cozy Creepover Cleo de Nile",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secret Cozy Creepover Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed.\nCleo de Nile has long, straight, blue hair with gold streaks framing her face. Her tan complexion is enhanced with bold dark brown lips and gold eyeshadow.\nShe wears a turquoise, gold, and black striped pajama outfit with a black top and gold ribbon tied around the waist. On her feet are gold peep-toe slippers adorned with scarabs on the front.\nAdditional accessories include a gold eye mask, a gold hand mirror, a lipstick tube, and gold earrings.\nWith Cleo de Nile is Hissette, her pet snake.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:13",
        "createdAt": "2026-01-05 22:47:13",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 42,
                "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:13",
                "createdAt": "2026-01-05 22:47:13",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 356,
                "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-cleo-de-nile/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:13",
                "createdAt": "2026-01-05 22:47:13"
            },
            {
                "id": 357,
                "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:13",
                "createdAt": "2026-01-05 22:47:13"
            },
            {
                "id": 358,
                "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:13",
                "createdAt": "2026-01-05 22:47:13"
            }
        ],
        "mediaAssets": [
            {
                "id": 49,
                "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
                "mediaAssetId": 23,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:13",
                "createdAt": "2026-01-05 22:47:13"
            }
        ],
        "mediaAssets2": [
            {
                "id": 11,
                "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
                "mediaAssetId": 31,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:47:13",
                "createdAt": "2026-01-05 22:47:13"
            }
        ]
    },
    {
        "id": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "slug": "skullector-alien",
        "name": "Skullector Alien",
        "sku": "JDR69",
        "releaseYear": 2025,
        "description": "The newest Skullector doll is a Xenomorph inspired by the original film franchise *Alien.*\nShe has a black Xenomorph-inspired face and body sculpt with a long, bendable tail. Her face is Monster High style with black lipstick and silver stars and moons in her eyes.\nSkullector Alien wears a sheer black and iridescent chestburster foil print top and skirt, plus a pleather bodysuit. On her feet are black wraparound heels with facehuggers on the front.\nIncluded with the doll is a doll stand, Certificate of Authenticity, and premium packaging that puts you right aboard the Alien ship *Nostromo.*",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 43,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 359,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 360,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 361,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 362,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 363,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 364,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 365,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 366,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 367,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 368,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            },
            {
                "id": 369,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "url": "/demo/releases/2025/skullector/alien/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            }
        ],
        "mediaAssets": [
            {
                "id": 50,
                "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
                "mediaAssetId": 3,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:16",
                "createdAt": "2026-01-05 22:47:16"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b94-79d4-80b9-11080d22c064",
        "slug": "skulltimate-secrets-hauntlywood-frankie-stein",
        "name": "Skulltimate Secrets Hauntlywood Frankie Stein",
        "sku": null,
        "releaseYear": 2025,
        "description": "Frankie Stein has long straight black hair with streaks of blue and silver through it. Pink lips and pink and silver eyeshadow enhance their light blue skin.\nAn assortment of clothing lets them create a variety of outfits. They have a blue plaid jumpsuit, a fur-trimmed puffy-sleeve jacket, a fur-trimmed blue skirt, and a blue and black metallic skirt, to name a few.\nTheir feet can be dressed up in high-heeled blue boots or gold and silver boots.\nFor accessories, Frankie has silver bracelets, sunglasses, a gold belt, a silver and black purse, a microphone, a silver cage bodice, and pink necklace.\n<strong>Closet Container</strong>\nWith Frankie is a blue and silver Hauntlywood Mysteries closet that holds the doll and all their belongings. Use the magnifying glass key to reveal symbols on the treasure map and unlock the closet doors.\nFind the 3 charms hidden in the closet and piece them together to make a single mystery talisman. Insert the talisman at the base of the closet, then slide it up to unveil the doll.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:19",
        "createdAt": "2026-01-05 22:47:19",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 44,
                "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
                "characterId": 135,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:19",
                "createdAt": "2026-01-05 22:47:19"
            }
        ],
        "series": [
            {
                "id": 135,
                "slug": "skulltimate-secrets",
                "name": "Skulltimate Secrets",
                "description": "Skulltimate Secrets features Monster High ghouls who need an outfit change. Each doll has a Coffin container with compartments packed full of outfits and accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:50",
                "createdAt": "2026-01-05 22:37:50"
            }
        ],
        "imageUrls": [
            {
                "id": 370,
                "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:19",
                "createdAt": "2026-01-05 22:47:19"
            },
            {
                "id": 371,
                "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:19",
                "createdAt": "2026-01-05 22:47:19"
            },
            {
                "id": 372,
                "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:19",
                "createdAt": "2026-01-05 22:47:19"
            },
            {
                "id": 373,
                "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:19",
                "createdAt": "2026-01-05 22:47:19"
            },
            {
                "id": 374,
                "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:19",
                "createdAt": "2026-01-05 22:47:19"
            },
            {
                "id": 375,
                "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
                "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:19",
                "createdAt": "2026-01-05 22:47:19"
            }
        ],
        "mediaAssets": [
            {
                "id": 51,
                "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
                "mediaAssetId": 40,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:19",
                "createdAt": "2026-01-05 22:47:19"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b94-79fc-ab60-bb5365218371",
        "slug": "funko-pop-retro-toys-cleo-de-nile",
        "name": "Funko Pop! Retro Toys Cleo De Nile",
        "sku": "117",
        "releaseYear": 2025,
        "description": "Cleo De Nile has short black hair with light blue and gold streaks running through it. Her pale complexion is enhanced by turquoise and gold eyeshadow and dark red lips.\nShe wears a gray skirt with a dramatic gold belt. A turquoise tank, black leggings, and yellow, blue, and black designed arm and leg warmers complete the look. On her feet are open-toed turquoise sandals with gold buttons.\nAccessories include a gold headband and a black purse with turquoise fringe.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:21",
        "createdAt": "2026-01-05 22:47:21",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [],
        "series": [
            {
                "id": 157,
                "slug": "funko-pop-retro-toys",
                "name": "Funko Pop! Retro Toys",
                "description": "Vinyl figures from the Funko Pop! Retro Toys line featuring Monster High characters.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 376,
                "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
                "url": "/demo/releases/2025/retro-toys-cleo-de-nile/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:21",
                "createdAt": "2026-01-05 22:47:21"
            },
            {
                "id": 377,
                "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
                "url": "/demo/releases/2025/retro-toys-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:21",
                "createdAt": "2026-01-05 22:47:21"
            },
            {
                "id": 378,
                "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
                "url": "/demo/releases/2025/retro-toys-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:21",
                "createdAt": "2026-01-05 22:47:21"
            }
        ],
        "mediaAssets": [
            {
                "id": 52,
                "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
                "mediaAssetId": 23,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:21",
                "createdAt": "2026-01-05 22:47:21"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "slug": "skullector-the-shining-grady-twins-re-release",
        "name": "Skullector The Shining Grady Twins (Re-Release)",
        "sku": "GNP21",
        "releaseYear": 2025,
        "description": "Originally sold out in 2020, Mattel has re-released the Grady Twins who are inspired by characters from the 1980 movie *The Shining.*\nEach girl has brown hair accentuated by an axe barrette. Their pale skin is enhanced by brown eyeshadow and pale lips.\nThe girls have matching outfits that consist of a blue babydoll dress with white dots, white lace trim, sheer sleeves, a pleated bodice, and a pink bow around the waist.\nSheer stockings and a pair of black platform Mary Janes with green hedge maze-inspired heels complete the look.\nAdditional accessories include a red key to room 237, a page from Jack’s typewritten manuscript, and a yellow tennis ball.\nSpecially designed packaging recreates the iconic scene from the Overlook Hotel’s hallway featured in the movie and has a “second release” sticker on the package to differentiate it from the 2020 release.\nIncluded with the dolls are doll stands and a certificate of authenticity.",
        "imageUrl": "Come play with us, ghoul...\r\n\r\nHello there. We see you playing ALL alone. We, of all ghouls, understand just how lonely this hotel can be... especially when it's monstrously snowy outside. Why don't you come play with us? We have been haunting these halls for ever and ever and ever, lurking for a guest like you to be our new beast friend. Somebody who can appreciate how scary-cute we are - mirror images, holding hands in our matching dresses. OH! Please don't ride your tricycle away! Maybe we can use this key to play a fangtastic game of hide-and-shriek in room 237?! We only hope you have a freaky-fab time here at your stay at the Overlook Hotel.",
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 9,
                "slug": "mattel-creations",
                "name": "Mattel Creations",
                "description": "Collector-exclusive release from Mattel Creations.",
                "imageUrl": "https://example.com/images/mattel_creations_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 45,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 379,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 380,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 381,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 382,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 383,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 384,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 385,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 386,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 387,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 388,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 389,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 390,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            },
            {
                "id": 391,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            }
        ],
        "mediaAssets": [
            {
                "id": 53,
                "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
                "mediaAssetId": 45,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:22",
                "createdAt": "2026-01-05 22:47:22"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
        "slug": "buried-secrets-haunted-dance-cleo-de-nile",
        "name": "Buried Secrets Haunted Dance Cleo de Nile",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secrets Haunted Dance Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed.\nCleo de Nile has long, blue hair with glittering blue strands in the front, pulled back into a bun. Her tan complexion is enhanced by bold blue lips and blue and gold eyeshadow.\nShe wears a mini-dress with a blue top while the bottom features an elaborate gold and blue design and black tulle. Over the dress, she has a gold and turquoise molded chest piece shaped into a bow and scarab. On her feet are royal blue platform shoes.\nCleo’s masquerade mask is gold and blue and shaped to represent the Egyptian god Anubis. Additional accessories include a sky blue handbag embossed with a scarab, a sky blue hair comb, a green water bottle, and blue earrings.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:25",
        "createdAt": "2026-01-05 22:47:25",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 46,
                "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:25",
                "createdAt": "2026-01-05 22:47:25",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 392,
                "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
                "url": "/demo/releases/2025/buried-secrets-haunted-dance-cleo-de-nile/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:25",
                "createdAt": "2026-01-05 22:47:25"
            },
            {
                "id": 393,
                "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
                "url": "/demo/releases/2025/buried-secrets-haunted-dance-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:25",
                "createdAt": "2026-01-05 22:47:25"
            },
            {
                "id": 394,
                "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
                "url": "/demo/releases/2025/buried-secrets-haunted-dance-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:25",
                "createdAt": "2026-01-05 22:47:25"
            },
            {
                "id": 395,
                "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
                "url": "/demo/releases/2025/buried-secrets-haunted-dance-cleo-de-nile/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:25",
                "createdAt": "2026-01-05 22:47:25"
            }
        ],
        "mediaAssets": [
            {
                "id": 54,
                "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
                "mediaAssetId": 23,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:25",
                "createdAt": "2026-01-05 22:47:25"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "slug": "boo-riginal-creeproduction-operetta",
        "name": "Boo-riginal Creeproduction Operetta",
        "sku": null,
        "releaseYear": 2025,
        "description": "Operetta has red hair with two black streaks on the side with rolled bangs. Her pale lavender complexion is enhanced with bold red lips and orange eyeshadow. Over her left eye is her signature heart-shaped monocle.\nShe wears a puff-sleeve white jacket that features black spiderwebs over a collared black &amp; purple patterned sleeveless top. A white music note belt, capri pants, a keyboard bracelet, and dice earrings complete the look.\nOn her feet are black &amp; white shoes with white laces, a spiderweb pattern, and black treble clefs for heels.\nShe also has a black &amp; red guitar adorned with white spiderwebs and black treble clefs.\nWith Operetta is Memphis “Daddy O” Longlegs, her pet spider.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 47,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "characterId": 11,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26",
                "character": {
                    "id": 11,
                    "slug": "beetlejuice-lydia",
                    "name": "Beetlejuice & Lydia",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 11,
                "slug": "boo-riginal-creeproduction",
                "name": "Boo-riginal Creeproduction",
                "description": "The original ghouls of Monster High are back. Each ghoul is a reproduction of the original doll with all her fangtastic accessories.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:17",
                "createdAt": "2026-01-05 22:37:17"
            }
        ],
        "imageUrls": [
            {
                "id": 396,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "url": "/demo/releases/2025/operetta/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            },
            {
                "id": 397,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "url": "/demo/releases/2025/operetta/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            },
            {
                "id": 398,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "url": "/demo/releases/2025/operetta/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            },
            {
                "id": 399,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "url": "/demo/releases/2025/operetta/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            },
            {
                "id": 400,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "url": "/demo/releases/2025/operetta/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            },
            {
                "id": 401,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "url": "/demo/releases/2025/operetta/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            },
            {
                "id": 402,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "url": "/demo/releases/2025/operetta/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            }
        ],
        "mediaAssets": [
            {
                "id": 55,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "mediaAssetId": 72,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            }
        ],
        "mediaAssets2": [
            {
                "id": 12,
                "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
                "mediaAssetId": 33,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:47:26",
                "createdAt": "2026-01-05 22:47:26"
            }
        ]
    },
    {
        "id": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "slug": "monster-high-x-wednesday-bianca-barclay",
        "name": "Monster High x Wednesday Bianca Barclay",
        "sku": "JDR71",
        "releaseYear": 2025,
        "description": "The *Wednesday* TV show inspires this Bianca Barclay Monster High doll.\nBianca has short black hair and her dark complexion is enhanced by dark brown lipstick and pink eyeshadow.\nShe wears her Nevermore Academy uniform, consisting of a black and purple striped jacket, purple skirt, and a white dress shirt with a black tie. Purple lace leggings, a school crest waist belt, and a stylish purple satchel bag complete her look.\nOn her feet are black lace-up boots with a turquoise mermaid on one heel and a tree on the other. Additional accessories include shell-like earrings and a gold siren amulet.\nThe doll comes with a Certificate of Authenticity and a doll stand. The doll comes in elevated packaging with a Nevermore Academy background.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 48,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "characterId": 102,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27",
                "character": {
                    "id": 102,
                    "slug": "wingrid",
                    "name": "Wingrid",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 102,
                "slug": "monster-high-x-wednesday",
                "name": "Monster High x Wednesday",
                "description": "Monster High x Wednesday features characters inspired by the Wednesday TV series.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:38",
                "createdAt": "2026-01-05 22:37:38"
            }
        ],
        "imageUrls": [
            {
                "id": 403,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "url": "/demo/releases/2025/bianca-barclay/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            },
            {
                "id": 404,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "url": "/demo/releases/2025/bianca-barclay/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            },
            {
                "id": 405,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "url": "/demo/releases/2025/bianca-barclay/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            },
            {
                "id": 406,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "url": "/demo/releases/2025/bianca-barclay/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            },
            {
                "id": 407,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "url": "/demo/releases/2025/bianca-barclay/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            },
            {
                "id": 408,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "url": "/demo/releases/2025/bianca-barclay/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            },
            {
                "id": 409,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "url": "/demo/releases/2025/bianca-barclay/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            },
            {
                "id": 410,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "url": "/demo/releases/2025/bianca-barclay/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            }
        ],
        "mediaAssets": [
            {
                "id": 56,
                "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
                "mediaAssetId": 13,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:27",
                "createdAt": "2026-01-05 22:47:27"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b95-73db-97db-f15f96772195",
        "slug": "scary-sweet-birthday-cupid-asteria",
        "name": "Scary Sweet Birthday Cupid Asteria",
        "sku": null,
        "releaseYear": 2025,
        "description": "Cupid Asteria has short curly pink and white hair. Her bold pink and red lips and red and purple eyeshadow accentuate her pale complexion.\nCupid features elaborately designed heart-shaped wings as well.\nShe wears an elaborate gold cage skirt over a red heart-print dress. Red heart earrings, a red hairpiece, a crossbow bracelet, and a gold arrow-pierced heart chest piece complete the look. On her feet are gold and red bow and arrow studded heels.\nParty-themed accessories include a gift bag for Draculaura with a surprise present inside, an invite, and birthday card.\nThe pink arrow tote and cute red heart balloon are my favorites though.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 49,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "characterId": 118,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31",
                "character": {
                    "id": 118,
                    "slug": "hoodude-voodoo",
                    "name": "Hoodude Voodoo",
                    "gender": "manster"
                }
            }
        ],
        "series": [
            {
                "id": 118,
                "slug": "scary-sweet-birthday",
                "name": "Scary Sweet Birthday",
                "description": "Scary Sweet Birthday features Monster High characters enjoying a birthday celebration.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:43",
                "createdAt": "2026-01-05 22:37:43"
            }
        ],
        "imageUrls": [
            {
                "id": 411,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            },
            {
                "id": 412,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            },
            {
                "id": 413,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            },
            {
                "id": 414,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            },
            {
                "id": 415,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            },
            {
                "id": 416,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            },
            {
                "id": 417,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            },
            {
                "id": 418,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            }
        ],
        "mediaAssets": [
            {
                "id": 57,
                "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
                "mediaAssetId": 27,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:31",
                "createdAt": "2026-01-05 22:47:31"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
        "slug": "buried-secrets-cozy-creepover-frankie-stein",
        "name": "Buried Secrets Cozy Creepover Frankie Stein",
        "sku": null,
        "releaseYear": 2025,
        "description": "Unwrap a sarcophagus to reveal which Buried Secret Cozy Creepover Monster High doll you will get. It’s a mystery until the box’s mummy bandages are removed.\nFrankie Stein has blue hair with black streaks framing their face hanging past their shoulders. Their pale blue complexion is enhanced with bold pink lips and blue eyeshadow.\nThey wear a pink and blue printed pajama outfit with a black top and a pink bow hanging from one shoulder. On their feet are one pink and one blue peep-toe slipper.\nAdditional accessories include a blue eye mask, a silver comb, green hair barrettes, and green bolt earrings.\nWith Frankie Stein is Watzit, her dog-like pet.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:33",
        "createdAt": "2026-01-05 22:47:33",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [],
        "characters": [
            {
                "id": 50,
                "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
                "characterId": 13,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:33",
                "createdAt": "2026-01-05 22:47:33",
                "character": {
                    "id": 13,
                    "slug": "bianca-barclay",
                    "name": "Bianca Barclay",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 13,
                "slug": "buried-secrets",
                "name": "Buried Secrets",
                "description": "Buried Secrets features dolls in a sarcophagus. You do not know what ghoul you will get until you unwrap the packaging.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:18",
                "createdAt": "2026-01-05 22:37:18"
            }
        ],
        "imageUrls": [
            {
                "id": 419,
                "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-frankie-stein/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:33",
                "createdAt": "2026-01-05 22:47:33"
            },
            {
                "id": 420,
                "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:33",
                "createdAt": "2026-01-05 22:47:33"
            },
            {
                "id": 421,
                "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
                "url": "/demo/releases/2025/buried-secrets-cozy-creepover-frankie-stein/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:33",
                "createdAt": "2026-01-05 22:47:33"
            }
        ],
        "mediaAssets": [
            {
                "id": 58,
                "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
                "mediaAssetId": 40,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:33",
                "createdAt": "2026-01-05 22:47:33"
            }
        ],
        "mediaAssets2": [
            {
                "id": 13,
                "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
                "mediaAssetId": 43,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "updatedAt": "2026-01-05 22:47:33",
                "createdAt": "2026-01-05 22:47:33"
            }
        ]
    },
    {
        "id": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "slug": "fearbook-abbey-bominable",
        "name": "Fearbook Abbey Bominable",
        "sku": "JDR58",
        "releaseYear": 2025,
        "description": "Abbey Bominable is ready for her close-up in the Monster High yearbook.\nShe has long straight blue hair with a few streaks of light pink, blue, and tinsel in the front. Her light pink lips and turquoise eyeshadow accentuate her pale blue complexion. White freckles adorn her face.\nAbbey wears a purple cardigan over a black shirt and an ice crystal inspired mini skirt. She also comes with a Arts &amp; Creepy Crafts club varsity jacket. On her feet are blue and white boots.\nHer ice sculpture set includes goggles, a snow saw for carving, and a lump of ice to sculpt. Additional accessories include a canvas, paintbrush, palette, colored pencil box, and apron.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 13,
                "slug": "target",
                "name": "Target",
                "description": "Exclusive release available at Target.",
                "imageUrl": "https://example.com/images/target_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 51,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "characterId": 41,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34",
                "character": {
                    "id": 41,
                    "slug": "ghoulia-yelps",
                    "name": "Ghoulia Yelps",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 41,
                "slug": "fearbook",
                "name": "Fearbook",
                "description": "Fearbook features Monster High students dressed to impress for their photos. Each sports a varsity jacket and has everything needed to participate in their favorite club.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:27",
                "createdAt": "2026-01-05 22:37:27"
            }
        ],
        "imageUrls": [
            {
                "id": 422,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34"
            },
            {
                "id": 423,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34"
            },
            {
                "id": 424,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34"
            },
            {
                "id": 425,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34"
            },
            {
                "id": 426,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34"
            },
            {
                "id": 427,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34"
            },
            {
                "id": 428,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34"
            }
        ],
        "mediaAssets": [
            {
                "id": 59,
                "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
                "mediaAssetId": 1,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:34",
                "createdAt": "2026-01-05 22:47:34"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "slug": "skullector-elvira-mistress-of-the-dark-sdcc",
        "name": "Skullector Elvira Mistress of the Dark (SDCC)",
        "sku": null,
        "releaseYear": 2025,
        "description": "Elvira Mistress of the Dark is the newest Skullector doll and exclusive to the 2025 San Diego Comic-Con.\nElvira has long jet-black hair worn in her signature high bouffant. Her pale complexion is enhanced by bold dark red lips and purple eyeshadow. There’s a beauty mark under her right eye that’s winking at you.\nShe wears a <span style=\"font-weight: 400;\">black faux leather dress with sheer panels in the front and mesh long sleeves.  Over the dress, she has a metallic purple molded chest piece with chains and a gold dagger. On her feet are black high-heeled shoes with purple bats wrapped around her ankle.</span>\n<span style=\"font-weight: 400;\">A shimmering mesh batwing cape has purple spiderwebs printed on it, completing the look. On the back of the cape the spiderweb design integrates a stylized dagger with a skeleton head into it.</span>",
        "imageUrl": "3 Tips for Putting on a Bewitching Show\r\nBy Elvira, Mistress of the Dark\r\n\r\nThey say everybody can’t play the same role, but I always start with attitude. When I was a kid, I imagined becoming a glamorous and beloved performer. I mean, I knew I had the hair for it. As I grew up, I embraced a sense of self-expression. When others went simple, I went big. And when they went safe, I went spooky. That’s how I made my mark. My act was always a little over-the-top, a little outside the lines, and a little mysterious. And that’s what made it…me. I’ve got a few pointers for anyone who wants to give it a try.\r\n\r\n1. Dazzle. The camera (and everyone else) is watching. Long lashes, high contrast, shimmering shadows. Can’t lose.\r\n\r\n2. Be someone your supernatural self would root for. Be bold. Be weird. Be you. What else is there?\r\n\r\n3. Make an entrance they won’t dare to forget. With a spider-printed cape and a little shock of purple, nightmares really walk among us.",
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 12,
                "slug": "san-diego-comic-con",
                "name": "San Diego Comic-Con",
                "description": "Convention-exclusive release for San Diego Comic-Con.",
                "imageUrl": "https://example.com/images/sdcc_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 52,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "characterId": 134,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            }
        ],
        "series": [
            {
                "id": 134,
                "slug": "skullector",
                "name": "Skullector",
                "description": "The Skullector series features characters inspired by popular movies. These collector dolls are highly detailed and have a killer style.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-01-05 22:37:49",
                "createdAt": "2026-01-05 22:37:49"
            }
        ],
        "imageUrls": [
            {
                "id": 429,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            },
            {
                "id": 430,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            },
            {
                "id": 431,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            },
            {
                "id": 432,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            },
            {
                "id": 433,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            },
            {
                "id": 434,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            },
            {
                "id": 435,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            },
            {
                "id": 436,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            },
            {
                "id": 437,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            }
        ],
        "mediaAssets": [
            {
                "id": 60,
                "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
                "mediaAssetId": 37,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:35",
                "createdAt": "2026-01-05 22:47:35"
            }
        ],
        "mediaAssets2": []
    },
    {
        "id": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "slug": "venus-mcflytrap",
        "name": "Venus McFlytrap",
        "sku": "HYV93",
        "releaseYear": 2025,
        "description": "Venus McFlytrap has long straight black hair hanging past her waist with hot pink and emerald green streaks. It’s styled in a high ponytail with a braid in the front.\nDark red lips, green and pink eyeshadow, and a small green and white flower adorn her face to accentuate her pale green skin.\nShe wears a layered black mesh and cotton denim bodysuit with exaggerated sleeves. Green burnout velvet tights adorned with vines complete the look. On her feet are knee-high greenhouse heels.\nAn elaborate green and pink backpiece shaped like vines is attached to her outfit. Additional accessories include thorny silver earrings.\nThe doll cannot stand alone but a doll stand is included.",
        "imageUrl": null,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37",
        "types": [
            {
                "id": 1,
                "slug": "reissue",
                "name": "Reissue",
                "description": "Indicates a later re-release of a previous doll or pack.",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "exclusives": [
            {
                "id": 4,
                "slug": "fang-club",
                "name": "Fang Club",
                "description": "Exclusive release for members of the Fang Club.",
                "imageUrl": "https://example.com/images/fang_club_exclusive.jpg",
                "updatedAt": "2026-01-04 20:46:23",
                "createdAt": "2026-01-04 20:46:23"
            }
        ],
        "characters": [
            {
                "id": 53,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "characterId": 97,
                "role": "primary",
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37",
                "character": {
                    "id": 97,
                    "slug": "vandala-doubloons",
                    "name": "Vandala Doubloons",
                    "gender": "ghoul"
                }
            }
        ],
        "series": [
            {
                "id": 158,
                "slug": "fang-club",
                "name": "Fang Club",
                "description": "Collector releases available to Monster High Fang Club members.",
                "primaryRole": "primary",
                "imageUrl": null,
                "bannerUrl": null,
                "updatedAt": "2026-02-08 00:00:00",
                "createdAt": "2026-02-08 00:00:00"
            }
        ],
        "imageUrls": [
            {
                "id": 438,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": true,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 439,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 440,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 441,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 442,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 443,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 444,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 445,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 446,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 447,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 448,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 449,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            },
            {
                "id": 450,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "url": "/demo/releases/2025/skullector/venus/main-image.png",
                "isPrimary": false,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            }
        ],
        "mediaAssets": [
            {
                "id": 61,
                "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
                "mediaAssetId": 98,
                "kindId": 1,
                "caption": null,
                "sortOrder": 1,
                "width": null,
                "height": null,
                "isPublic": true,
                "sourceUrl": null,
                "altText": null,
                "credit": null,
                "hash": null,
                "mimeType": null,
                "updatedAt": "2026-01-05 22:47:37",
                "createdAt": "2026-01-05 22:47:37"
            }
        ],
        "mediaAssets2": []
    }
] as const;
export const links = {
    "releaseExclusiveLinks": [
        {
            "id": 1,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "exclusiveId": 9,
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 2,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "exclusiveId": 12,
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 3,
            "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
            "exclusiveId": 9,
            "updatedAt": "2026-01-05 22:46:01",
            "createdAt": "2026-01-05 22:46:01"
        },
        {
            "id": 4,
            "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
            "exclusiveId": 9,
            "updatedAt": "2026-01-05 22:46:08",
            "createdAt": "2026-01-05 22:46:08"
        },
        {
            "id": 5,
            "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
            "exclusiveId": 9,
            "updatedAt": "2026-01-05 22:46:15",
            "createdAt": "2026-01-05 22:46:15"
        },
        {
            "id": 6,
            "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
            "exclusiveId": 1,
            "updatedAt": "2026-01-05 22:46:19",
            "createdAt": "2026-01-05 22:46:19"
        },
        {
            "id": 7,
            "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
            "exclusiveId": 9,
            "updatedAt": "2026-01-05 22:46:30",
            "createdAt": "2026-01-05 22:46:30"
        },
        {
            "id": 8,
            "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
            "exclusiveId": 9,
            "updatedAt": "2026-01-05 22:46:32",
            "createdAt": "2026-01-05 22:46:32"
        },
        {
            "id": 9,
            "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
            "exclusiveId": 13,
            "updatedAt": "2026-01-05 22:46:51",
            "createdAt": "2026-01-05 22:46:51"
        },
        {
            "id": 10,
            "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
            "exclusiveId": 9,
            "updatedAt": "2026-01-05 22:47:03",
            "createdAt": "2026-01-05 22:47:03"
        },
        {
            "id": 11,
            "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
            "exclusiveId": 9,
            "updatedAt": "2026-01-05 22:47:22",
            "createdAt": "2026-01-05 22:47:22"
        },
        {
            "id": 12,
            "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
            "exclusiveId": 13,
            "updatedAt": "2026-01-05 22:47:34",
            "createdAt": "2026-01-05 22:47:34"
        },
        {
            "id": 13,
            "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
            "exclusiveId": 12,
            "updatedAt": "2026-01-05 22:47:35",
            "createdAt": "2026-01-05 22:47:35"
        },
        {
            "id": 14,
            "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
            "exclusiveId": 4,
            "updatedAt": "2026-01-05 22:47:37",
            "createdAt": "2026-01-05 22:47:37"
        }
    ],
    "releaseTypeLinks": [
        {
            "id": 1,
            "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:09",
            "createdAt": "2026-01-05 22:45:09"
        },
        {
            "id": 2,
            "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:09",
            "createdAt": "2026-01-05 22:45:09"
        },
        {
            "id": 3,
            "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:45:09",
            "createdAt": "2026-01-05 22:45:09"
        },
        {
            "id": 4,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 5,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 6,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 7,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 8,
            "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:19",
            "createdAt": "2026-01-05 22:45:19"
        },
        {
            "id": 9,
            "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:19",
            "createdAt": "2026-01-05 22:45:19"
        },
        {
            "id": 10,
            "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:19",
            "createdAt": "2026-01-05 22:45:19"
        },
        {
            "id": 11,
            "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:45:21",
            "createdAt": "2026-01-05 22:45:21"
        },
        {
            "id": 12,
            "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:21",
            "createdAt": "2026-01-05 22:45:21"
        },
        {
            "id": 13,
            "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:21",
            "createdAt": "2026-01-05 22:45:21"
        },
        {
            "id": 14,
            "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:21",
            "createdAt": "2026-01-05 22:45:21"
        },
        {
            "id": 15,
            "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
            "typeId": 15,
            "updatedAt": "2026-01-05 22:45:23",
            "createdAt": "2026-01-05 22:45:23"
        },
        {
            "id": 16,
            "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:23",
            "createdAt": "2026-01-05 22:45:23"
        },
        {
            "id": 17,
            "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:23",
            "createdAt": "2026-01-05 22:45:23"
        },
        {
            "id": 18,
            "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:23",
            "createdAt": "2026-01-05 22:45:23"
        },
        {
            "id": 19,
            "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:24",
            "createdAt": "2026-01-05 22:45:24"
        },
        {
            "id": 20,
            "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:24",
            "createdAt": "2026-01-05 22:45:24"
        },
        {
            "id": 21,
            "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:24",
            "createdAt": "2026-01-05 22:45:24"
        },
        {
            "id": 22,
            "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:45:26",
            "createdAt": "2026-01-05 22:45:26"
        },
        {
            "id": 23,
            "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:26",
            "createdAt": "2026-01-05 22:45:26"
        },
        {
            "id": 24,
            "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:26",
            "createdAt": "2026-01-05 22:45:26"
        },
        {
            "id": 25,
            "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:26",
            "createdAt": "2026-01-05 22:45:26"
        },
        {
            "id": 26,
            "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:27",
            "createdAt": "2026-01-05 22:45:27"
        },
        {
            "id": 27,
            "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:27",
            "createdAt": "2026-01-05 22:45:27"
        },
        {
            "id": 28,
            "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:45:27",
            "createdAt": "2026-01-05 22:45:27"
        },
        {
            "id": 29,
            "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:29",
            "createdAt": "2026-01-05 22:45:29"
        },
        {
            "id": 30,
            "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:29",
            "createdAt": "2026-01-05 22:45:29"
        },
        {
            "id": 31,
            "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:45:29",
            "createdAt": "2026-01-05 22:45:29"
        },
        {
            "id": 32,
            "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:33",
            "createdAt": "2026-01-05 22:45:33"
        },
        {
            "id": 33,
            "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:33",
            "createdAt": "2026-01-05 22:45:33"
        },
        {
            "id": 34,
            "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:33",
            "createdAt": "2026-01-05 22:45:33"
        },
        {
            "id": 35,
            "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:36",
            "createdAt": "2026-01-05 22:45:36"
        },
        {
            "id": 36,
            "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:36",
            "createdAt": "2026-01-05 22:45:36"
        },
        {
            "id": 37,
            "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:36",
            "createdAt": "2026-01-05 22:45:36"
        },
        {
            "id": 38,
            "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
            "typeId": 15,
            "updatedAt": "2026-01-05 22:45:39",
            "createdAt": "2026-01-05 22:45:39"
        },
        {
            "id": 39,
            "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:39",
            "createdAt": "2026-01-05 22:45:39"
        },
        {
            "id": 40,
            "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:39",
            "createdAt": "2026-01-05 22:45:39"
        },
        {
            "id": 41,
            "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:39",
            "createdAt": "2026-01-05 22:45:39"
        },
        {
            "id": 42,
            "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:42",
            "createdAt": "2026-01-05 22:45:42"
        },
        {
            "id": 43,
            "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:42",
            "createdAt": "2026-01-05 22:45:42"
        },
        {
            "id": 44,
            "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:45:42",
            "createdAt": "2026-01-05 22:45:42"
        },
        {
            "id": 45,
            "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:44",
            "createdAt": "2026-01-05 22:45:44"
        },
        {
            "id": 46,
            "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:44",
            "createdAt": "2026-01-05 22:45:44"
        },
        {
            "id": 47,
            "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:44",
            "createdAt": "2026-01-05 22:45:44"
        },
        {
            "id": 48,
            "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
            "typeId": 15,
            "updatedAt": "2026-01-05 22:45:48",
            "createdAt": "2026-01-05 22:45:48"
        },
        {
            "id": 49,
            "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:48",
            "createdAt": "2026-01-05 22:45:48"
        },
        {
            "id": 50,
            "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:48",
            "createdAt": "2026-01-05 22:45:48"
        },
        {
            "id": 51,
            "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:48",
            "createdAt": "2026-01-05 22:45:48"
        },
        {
            "id": 52,
            "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:50",
            "createdAt": "2026-01-05 22:45:50"
        },
        {
            "id": 53,
            "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:50",
            "createdAt": "2026-01-05 22:45:50"
        },
        {
            "id": 54,
            "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:45:50",
            "createdAt": "2026-01-05 22:45:50"
        },
        {
            "id": 55,
            "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:52",
            "createdAt": "2026-01-05 22:45:52"
        },
        {
            "id": 56,
            "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:52",
            "createdAt": "2026-01-05 22:45:52"
        },
        {
            "id": 57,
            "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:45:52",
            "createdAt": "2026-01-05 22:45:52"
        },
        {
            "id": 58,
            "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:45:55",
            "createdAt": "2026-01-05 22:45:55"
        },
        {
            "id": 59,
            "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:55",
            "createdAt": "2026-01-05 22:45:55"
        },
        {
            "id": 60,
            "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:55",
            "createdAt": "2026-01-05 22:45:55"
        },
        {
            "id": 61,
            "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:45:55",
            "createdAt": "2026-01-05 22:45:55"
        },
        {
            "id": 62,
            "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:45:58",
            "createdAt": "2026-01-05 22:45:58"
        },
        {
            "id": 63,
            "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:45:58",
            "createdAt": "2026-01-05 22:45:58"
        },
        {
            "id": 64,
            "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:45:58",
            "createdAt": "2026-01-05 22:45:58"
        },
        {
            "id": 65,
            "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:01",
            "createdAt": "2026-01-05 22:46:01"
        },
        {
            "id": 66,
            "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:01",
            "createdAt": "2026-01-05 22:46:01"
        },
        {
            "id": 67,
            "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:01",
            "createdAt": "2026-01-05 22:46:01"
        },
        {
            "id": 68,
            "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:05",
            "createdAt": "2026-01-05 22:46:05"
        },
        {
            "id": 69,
            "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:05",
            "createdAt": "2026-01-05 22:46:05"
        },
        {
            "id": 70,
            "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:05",
            "createdAt": "2026-01-05 22:46:05"
        },
        {
            "id": 71,
            "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:08",
            "createdAt": "2026-01-05 22:46:08"
        },
        {
            "id": 72,
            "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:08",
            "createdAt": "2026-01-05 22:46:08"
        },
        {
            "id": 73,
            "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:46:08",
            "createdAt": "2026-01-05 22:46:08"
        },
        {
            "id": 74,
            "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:11",
            "createdAt": "2026-01-05 22:46:11"
        },
        {
            "id": 75,
            "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:11",
            "createdAt": "2026-01-05 22:46:11"
        },
        {
            "id": 76,
            "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:11",
            "createdAt": "2026-01-05 22:46:11"
        },
        {
            "id": 77,
            "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:12",
            "createdAt": "2026-01-05 22:46:12"
        },
        {
            "id": 78,
            "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:12",
            "createdAt": "2026-01-05 22:46:12"
        },
        {
            "id": 79,
            "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:46:12",
            "createdAt": "2026-01-05 22:46:12"
        },
        {
            "id": 80,
            "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:46:13",
            "createdAt": "2026-01-05 22:46:13"
        },
        {
            "id": 81,
            "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:13",
            "createdAt": "2026-01-05 22:46:13"
        },
        {
            "id": 82,
            "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:13",
            "createdAt": "2026-01-05 22:46:13"
        },
        {
            "id": 83,
            "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:13",
            "createdAt": "2026-01-05 22:46:13"
        },
        {
            "id": 84,
            "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:15",
            "createdAt": "2026-01-05 22:46:15"
        },
        {
            "id": 85,
            "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:15",
            "createdAt": "2026-01-05 22:46:15"
        },
        {
            "id": 86,
            "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:15",
            "createdAt": "2026-01-05 22:46:15"
        },
        {
            "id": 87,
            "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
            "typeId": 15,
            "updatedAt": "2026-01-05 22:46:18",
            "createdAt": "2026-01-05 22:46:18"
        },
        {
            "id": 88,
            "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:18",
            "createdAt": "2026-01-05 22:46:18"
        },
        {
            "id": 89,
            "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:18",
            "createdAt": "2026-01-05 22:46:18"
        },
        {
            "id": 90,
            "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:18",
            "createdAt": "2026-01-05 22:46:18"
        },
        {
            "id": 91,
            "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
            "typeId": 15,
            "updatedAt": "2026-01-05 22:46:19",
            "createdAt": "2026-01-05 22:46:19"
        },
        {
            "id": 92,
            "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:19",
            "createdAt": "2026-01-05 22:46:19"
        },
        {
            "id": 93,
            "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:19",
            "createdAt": "2026-01-05 22:46:19"
        },
        {
            "id": 94,
            "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:19",
            "createdAt": "2026-01-05 22:46:19"
        },
        {
            "id": 95,
            "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
            "typeId": 15,
            "updatedAt": "2026-01-05 22:46:20",
            "createdAt": "2026-01-05 22:46:20"
        },
        {
            "id": 96,
            "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:20",
            "createdAt": "2026-01-05 22:46:20"
        },
        {
            "id": 97,
            "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:20",
            "createdAt": "2026-01-05 22:46:20"
        },
        {
            "id": 98,
            "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:20",
            "createdAt": "2026-01-05 22:46:20"
        },
        {
            "id": 99,
            "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:46:21",
            "createdAt": "2026-01-05 22:46:21"
        },
        {
            "id": 100,
            "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:21",
            "createdAt": "2026-01-05 22:46:21"
        },
        {
            "id": 101,
            "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:21",
            "createdAt": "2026-01-05 22:46:21"
        },
        {
            "id": 102,
            "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:46:21",
            "createdAt": "2026-01-05 22:46:21"
        },
        {
            "id": 103,
            "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:24",
            "createdAt": "2026-01-05 22:46:24"
        },
        {
            "id": 104,
            "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:24",
            "createdAt": "2026-01-05 22:46:24"
        },
        {
            "id": 105,
            "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:46:24",
            "createdAt": "2026-01-05 22:46:24"
        },
        {
            "id": 106,
            "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:46:27",
            "createdAt": "2026-01-05 22:46:27"
        },
        {
            "id": 107,
            "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:27",
            "createdAt": "2026-01-05 22:46:27"
        },
        {
            "id": 108,
            "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
            "typeId": 16,
            "updatedAt": "2026-01-05 22:46:27",
            "createdAt": "2026-01-05 22:46:27"
        },
        {
            "id": 109,
            "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:27",
            "createdAt": "2026-01-05 22:46:27"
        },
        {
            "id": 110,
            "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:28",
            "createdAt": "2026-01-05 22:46:28"
        },
        {
            "id": 111,
            "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
            "typeId": 2,
            "updatedAt": "2026-01-05 22:46:28",
            "createdAt": "2026-01-05 22:46:28"
        },
        {
            "id": 112,
            "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:28",
            "createdAt": "2026-01-05 22:46:28"
        },
        {
            "id": 113,
            "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:30",
            "createdAt": "2026-01-05 22:46:30"
        },
        {
            "id": 114,
            "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
            "typeId": 17,
            "updatedAt": "2026-01-05 22:46:30",
            "createdAt": "2026-01-05 22:46:30"
        },
        {
            "id": 115,
            "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
            "typeId": 25,
            "updatedAt": "2026-01-05 22:46:30",
            "createdAt": "2026-01-05 22:46:30"
        },
        {
            "id": 116,
            "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:46:30",
            "createdAt": "2026-01-05 22:46:30"
        },
        {
            "id": 117,
            "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:32",
            "createdAt": "2026-01-05 22:46:32"
        },
        {
            "id": 118,
            "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:46:32",
            "createdAt": "2026-01-05 22:46:32"
        },
        {
            "id": 119,
            "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:36",
            "createdAt": "2026-01-05 22:46:36"
        },
        {
            "id": 120,
            "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:36",
            "createdAt": "2026-01-05 22:46:36"
        },
        {
            "id": 121,
            "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
            "typeId": 15,
            "updatedAt": "2026-01-05 22:46:39",
            "createdAt": "2026-01-05 22:46:39"
        },
        {
            "id": 122,
            "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:39",
            "createdAt": "2026-01-05 22:46:39"
        },
        {
            "id": 123,
            "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:39",
            "createdAt": "2026-01-05 22:46:39"
        },
        {
            "id": 124,
            "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:46:42",
            "createdAt": "2026-01-05 22:46:42"
        },
        {
            "id": 125,
            "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:42",
            "createdAt": "2026-01-05 22:46:42"
        },
        {
            "id": 126,
            "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:42",
            "createdAt": "2026-01-05 22:46:42"
        },
        {
            "id": 127,
            "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:45",
            "createdAt": "2026-01-05 22:46:45"
        },
        {
            "id": 128,
            "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:46:45",
            "createdAt": "2026-01-05 22:46:45"
        },
        {
            "id": 129,
            "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:46:49",
            "createdAt": "2026-01-05 22:46:49"
        },
        {
            "id": 130,
            "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:49",
            "createdAt": "2026-01-05 22:46:49"
        },
        {
            "id": 131,
            "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:49",
            "createdAt": "2026-01-05 22:46:49"
        },
        {
            "id": 132,
            "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:51",
            "createdAt": "2026-01-05 22:46:51"
        },
        {
            "id": 133,
            "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:46:51",
            "createdAt": "2026-01-05 22:46:51"
        },
        {
            "id": 134,
            "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:55",
            "createdAt": "2026-01-05 22:46:55"
        },
        {
            "id": 135,
            "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:46:55",
            "createdAt": "2026-01-05 22:46:55"
        },
        {
            "id": 136,
            "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:46:57",
            "createdAt": "2026-01-05 22:46:57"
        },
        {
            "id": 137,
            "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
            "typeId": 17,
            "updatedAt": "2026-01-05 22:46:57",
            "createdAt": "2026-01-05 22:46:57"
        },
        {
            "id": 138,
            "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
            "typeId": 25,
            "updatedAt": "2026-01-05 22:46:57",
            "createdAt": "2026-01-05 22:46:57"
        },
        {
            "id": 139,
            "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:46:57",
            "createdAt": "2026-01-05 22:46:57"
        },
        {
            "id": 140,
            "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:47:00",
            "createdAt": "2026-01-05 22:47:00"
        },
        {
            "id": 141,
            "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:00",
            "createdAt": "2026-01-05 22:47:00"
        },
        {
            "id": 142,
            "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:00",
            "createdAt": "2026-01-05 22:47:00"
        },
        {
            "id": 143,
            "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:03",
            "createdAt": "2026-01-05 22:47:03"
        },
        {
            "id": 144,
            "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:47:03",
            "createdAt": "2026-01-05 22:47:03"
        },
        {
            "id": 145,
            "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:08",
            "createdAt": "2026-01-05 22:47:08"
        },
        {
            "id": 146,
            "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
            "typeId": 17,
            "updatedAt": "2026-01-05 22:47:08",
            "createdAt": "2026-01-05 22:47:08"
        },
        {
            "id": 147,
            "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
            "typeId": 25,
            "updatedAt": "2026-01-05 22:47:08",
            "createdAt": "2026-01-05 22:47:08"
        },
        {
            "id": 148,
            "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:08",
            "createdAt": "2026-01-05 22:47:08"
        },
        {
            "id": 149,
            "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:11",
            "createdAt": "2026-01-05 22:47:11"
        },
        {
            "id": 150,
            "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:47:11",
            "createdAt": "2026-01-05 22:47:11"
        },
        {
            "id": 151,
            "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:47:13",
            "createdAt": "2026-01-05 22:47:13"
        },
        {
            "id": 152,
            "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:13",
            "createdAt": "2026-01-05 22:47:13"
        },
        {
            "id": 153,
            "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:47:13",
            "createdAt": "2026-01-05 22:47:13"
        },
        {
            "id": 154,
            "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:16",
            "createdAt": "2026-01-05 22:47:16"
        },
        {
            "id": 155,
            "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:47:16",
            "createdAt": "2026-01-05 22:47:16"
        },
        {
            "id": 156,
            "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:19",
            "createdAt": "2026-01-05 22:47:19"
        },
        {
            "id": 157,
            "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:19",
            "createdAt": "2026-01-05 22:47:19"
        },
        {
            "id": 158,
            "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
            "typeId": 15,
            "updatedAt": "2026-01-05 22:47:21",
            "createdAt": "2026-01-05 22:47:21"
        },
        {
            "id": 159,
            "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:21",
            "createdAt": "2026-01-05 22:47:21"
        },
        {
            "id": 160,
            "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:21",
            "createdAt": "2026-01-05 22:47:21"
        },
        {
            "id": 161,
            "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:22",
            "createdAt": "2026-01-05 22:47:22"
        },
        {
            "id": 162,
            "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
            "typeId": 17,
            "updatedAt": "2026-01-05 22:47:22",
            "createdAt": "2026-01-05 22:47:22"
        },
        {
            "id": 163,
            "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
            "typeId": 25,
            "updatedAt": "2026-01-05 22:47:22",
            "createdAt": "2026-01-05 22:47:22"
        },
        {
            "id": 164,
            "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:47:22",
            "createdAt": "2026-01-05 22:47:22"
        },
        {
            "id": 165,
            "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:25",
            "createdAt": "2026-01-05 22:47:25"
        },
        {
            "id": 166,
            "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:47:25",
            "createdAt": "2026-01-05 22:47:25"
        },
        {
            "id": 167,
            "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:47:26",
            "createdAt": "2026-01-05 22:47:26"
        },
        {
            "id": 168,
            "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:26",
            "createdAt": "2026-01-05 22:47:26"
        },
        {
            "id": 169,
            "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:26",
            "createdAt": "2026-01-05 22:47:26"
        },
        {
            "id": 170,
            "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:27",
            "createdAt": "2026-01-05 22:47:27"
        },
        {
            "id": 171,
            "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:27",
            "createdAt": "2026-01-05 22:47:27"
        },
        {
            "id": 172,
            "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:31",
            "createdAt": "2026-01-05 22:47:31"
        },
        {
            "id": 173,
            "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:31",
            "createdAt": "2026-01-05 22:47:31"
        },
        {
            "id": 174,
            "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
            "typeId": 13,
            "updatedAt": "2026-01-05 22:47:33",
            "createdAt": "2026-01-05 22:47:33"
        },
        {
            "id": 175,
            "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:33",
            "createdAt": "2026-01-05 22:47:33"
        },
        {
            "id": 176,
            "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
            "typeId": 27,
            "updatedAt": "2026-01-05 22:47:33",
            "createdAt": "2026-01-05 22:47:33"
        },
        {
            "id": 177,
            "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:34",
            "createdAt": "2026-01-05 22:47:34"
        },
        {
            "id": 178,
            "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:34",
            "createdAt": "2026-01-05 22:47:34"
        },
        {
            "id": 179,
            "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:35",
            "createdAt": "2026-01-05 22:47:35"
        },
        {
            "id": 180,
            "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
            "typeId": 30,
            "updatedAt": "2026-01-05 22:47:35",
            "createdAt": "2026-01-05 22:47:35"
        },
        {
            "id": 181,
            "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
            "typeId": 1,
            "updatedAt": "2026-01-05 22:47:37",
            "createdAt": "2026-01-05 22:47:37"
        },
        {
            "id": 182,
            "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
            "typeId": 28,
            "updatedAt": "2026-01-05 22:47:37",
            "createdAt": "2026-01-05 22:47:37"
        }
    ],
    "releaseCharacterLinks": [
        {
            "id": 1,
            "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:09",
            "createdAt": "2026-01-05 22:45:09"
        },
        {
            "id": 2,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 3,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "characterId": 146,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 4,
            "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
            "characterId": 135,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:19",
            "createdAt": "2026-01-05 22:45:19"
        },
        {
            "id": 5,
            "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
            "characterId": 123,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:21",
            "createdAt": "2026-01-05 22:45:21",
            "character": {
                "id": 123,
                "slug": "lux-de-nile",
                "name": "Lux de Nile",
                "gender": "manster"
            }
        },
        {
            "id": 6,
            "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
            "characterId": 118,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:24",
            "createdAt": "2026-01-05 22:45:24",
            "character": {
                "id": 118,
                "slug": "hoodude-voodoo",
                "name": "Hoodude Voodoo",
                "gender": "manster"
            }
        },
        {
            "id": 7,
            "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
            "characterId": 123,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:26",
            "createdAt": "2026-01-05 22:45:26",
            "character": {
                "id": 123,
                "slug": "lux-de-nile",
                "name": "Lux de Nile",
                "gender": "manster"
            }
        },
        {
            "id": 8,
            "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:27",
            "createdAt": "2026-01-05 22:45:27",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 9,
            "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:29",
            "createdAt": "2026-01-05 22:45:29"
        },
        {
            "id": 10,
            "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:33",
            "createdAt": "2026-01-05 22:45:33"
        },
        {
            "id": 11,
            "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
            "characterId": 135,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:36",
            "createdAt": "2026-01-05 22:45:36"
        },
        {
            "id": 12,
            "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:42",
            "createdAt": "2026-01-05 22:45:42",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 13,
            "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
            "characterId": 135,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:44",
            "createdAt": "2026-01-05 22:45:44"
        },
        {
            "id": 14,
            "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:50",
            "createdAt": "2026-01-05 22:45:50",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 15,
            "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:52",
            "createdAt": "2026-01-05 22:45:52",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 16,
            "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:55",
            "createdAt": "2026-01-05 22:45:55",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 17,
            "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
            "characterId": 135,
            "role": "primary",
            "updatedAt": "2026-01-05 22:45:58",
            "createdAt": "2026-01-05 22:45:58"
        },
        {
            "id": 18,
            "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
            "characterId": 39,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:01",
            "createdAt": "2026-01-05 22:46:01",
            "character": {
                "id": 39,
                "slug": "fangelica",
                "name": "Fangelica",
                "gender": "ghoul"
            }
        },
        {
            "id": 19,
            "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
            "characterId": 118,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:05",
            "createdAt": "2026-01-05 22:46:05",
            "character": {
                "id": 118,
                "slug": "hoodude-voodoo",
                "name": "Hoodude Voodoo",
                "gender": "manster"
            }
        },
        {
            "id": 20,
            "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:08",
            "createdAt": "2026-01-05 22:46:08"
        },
        {
            "id": 21,
            "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
            "characterId": 135,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:11",
            "createdAt": "2026-01-05 22:46:11"
        },
        {
            "id": 22,
            "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:12",
            "createdAt": "2026-01-05 22:46:12"
        },
        {
            "id": 23,
            "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
            "characterId": 62,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:13",
            "createdAt": "2026-01-05 22:46:13",
            "character": {
                "id": 62,
                "slug": "lost-boys-david",
                "name": "Lost Boys David",
                "gender": "ghoul"
            }
        },
        {
            "id": 24,
            "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
            "characterId": 30,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:15",
            "createdAt": "2026-01-05 22:46:15",
            "character": {
                "id": 30,
                "slug": "dracula",
                "name": "Dracula",
                "gender": "ghoul"
            }
        },
        {
            "id": 25,
            "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:21",
            "createdAt": "2026-01-05 22:46:21",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 26,
            "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:24",
            "createdAt": "2026-01-05 22:46:24",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 27,
            "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
            "characterId": 62,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:27",
            "createdAt": "2026-01-05 22:46:27",
            "character": {
                "id": 62,
                "slug": "lost-boys-david",
                "name": "Lost Boys David",
                "gender": "ghoul"
            }
        },
        {
            "id": 28,
            "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
            "characterId": 118,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:28",
            "createdAt": "2026-01-05 22:46:28",
            "character": {
                "id": 118,
                "slug": "hoodude-voodoo",
                "name": "Hoodude Voodoo",
                "gender": "manster"
            }
        },
        {
            "id": 29,
            "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:30",
            "createdAt": "2026-01-05 22:46:30"
        },
        {
            "id": 30,
            "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:32",
            "createdAt": "2026-01-05 22:46:32"
        },
        {
            "id": 31,
            "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
            "characterId": 118,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:36",
            "createdAt": "2026-01-05 22:46:36",
            "character": {
                "id": 118,
                "slug": "hoodude-voodoo",
                "name": "Hoodude Voodoo",
                "gender": "manster"
            }
        },
        {
            "id": 32,
            "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
            "characterId": 112,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:42",
            "createdAt": "2026-01-05 22:46:42",
            "character": {
                "id": 112,
                "slug": "frankenstein",
                "name": "Frankenstein",
                "gender": "manster"
            }
        },
        {
            "id": 33,
            "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:45",
            "createdAt": "2026-01-05 22:46:45"
        },
        {
            "id": 34,
            "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
            "characterId": 11,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:49",
            "createdAt": "2026-01-05 22:46:49",
            "character": {
                "id": 11,
                "slug": "beetlejuice-lydia",
                "name": "Beetlejuice & Lydia",
                "gender": "ghoul"
            }
        },
        {
            "id": 35,
            "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
            "characterId": 41,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:51",
            "createdAt": "2026-01-05 22:46:51",
            "character": {
                "id": 41,
                "slug": "ghoulia-yelps",
                "name": "Ghoulia Yelps",
                "gender": "ghoul"
            }
        },
        {
            "id": 36,
            "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:55",
            "createdAt": "2026-01-05 22:46:55",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 37,
            "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:46:57",
            "createdAt": "2026-01-05 22:46:57"
        },
        {
            "id": 38,
            "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
            "characterId": 123,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:00",
            "createdAt": "2026-01-05 22:47:00",
            "character": {
                "id": 123,
                "slug": "lux-de-nile",
                "name": "Lux de Nile",
                "gender": "manster"
            }
        },
        {
            "id": 39,
            "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:03",
            "createdAt": "2026-01-05 22:47:03"
        },
        {
            "id": 40,
            "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
            "characterId": 11,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:08",
            "createdAt": "2026-01-05 22:47:08",
            "character": {
                "id": 11,
                "slug": "beetlejuice-lydia",
                "name": "Beetlejuice & Lydia",
                "gender": "ghoul"
            }
        },
        {
            "id": 41,
            "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:11",
            "createdAt": "2026-01-05 22:47:11",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 42,
            "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:13",
            "createdAt": "2026-01-05 22:47:13",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 43,
            "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:16",
            "createdAt": "2026-01-05 22:47:16"
        },
        {
            "id": 44,
            "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
            "characterId": 135,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:19",
            "createdAt": "2026-01-05 22:47:19"
        },
        {
            "id": 45,
            "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:22",
            "createdAt": "2026-01-05 22:47:22"
        },
        {
            "id": 46,
            "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:25",
            "createdAt": "2026-01-05 22:47:25",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 47,
            "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
            "characterId": 11,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:26",
            "createdAt": "2026-01-05 22:47:26",
            "character": {
                "id": 11,
                "slug": "beetlejuice-lydia",
                "name": "Beetlejuice & Lydia",
                "gender": "ghoul"
            }
        },
        {
            "id": 48,
            "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
            "characterId": 102,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:27",
            "createdAt": "2026-01-05 22:47:27",
            "character": {
                "id": 102,
                "slug": "wingrid",
                "name": "Wingrid",
                "gender": "ghoul"
            }
        },
        {
            "id": 49,
            "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
            "characterId": 118,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:31",
            "createdAt": "2026-01-05 22:47:31",
            "character": {
                "id": 118,
                "slug": "hoodude-voodoo",
                "name": "Hoodude Voodoo",
                "gender": "manster"
            }
        },
        {
            "id": 50,
            "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
            "characterId": 13,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:33",
            "createdAt": "2026-01-05 22:47:33",
            "character": {
                "id": 13,
                "slug": "bianca-barclay",
                "name": "Bianca Barclay",
                "gender": "ghoul"
            }
        },
        {
            "id": 51,
            "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
            "characterId": 41,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:34",
            "createdAt": "2026-01-05 22:47:34",
            "character": {
                "id": 41,
                "slug": "ghoulia-yelps",
                "name": "Ghoulia Yelps",
                "gender": "ghoul"
            }
        },
        {
            "id": 52,
            "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
            "characterId": 134,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:35",
            "createdAt": "2026-01-05 22:47:35"
        },
        {
            "id": 53,
            "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
            "characterId": 97,
            "role": "primary",
            "updatedAt": "2026-01-05 22:47:37",
            "createdAt": "2026-01-05 22:47:37",
            "character": {
                "id": 97,
                "slug": "vandala-doubloons",
                "name": "Vandala Doubloons",
                "gender": "ghoul"
            }
        }
    ],
    "releaseSeriesLinks": [
        {
            "id": 1,
            "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
            "seriesId": 134,
            "releaseSlug": "skullector-frankie-stein-x-barbie-doll",
            "updatedAt": "2026-01-05 22:45:09",
            "createdAt": "2026-01-05 22:45:09"
        },
        {
            "id": 2,
            "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
            "seriesId": 134,
            "releaseSlug": "skullector-sweet-screams-twyla",
            "updatedAt": "2026-01-05 22:45:14",
            "createdAt": "2026-01-05 22:45:14"
        },
        {
            "id": 3,
            "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
            "seriesId": 135,
            "releaseSlug": "skulltimate-secrets-hauntlywood-clawdeen-wolf",
            "updatedAt": "2026-01-05 22:45:19",
            "createdAt": "2026-01-05 22:45:19"
        },
        {
            "id": 4,
            "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
            "seriesId": 123,
            "releaseSlug": "self-scare-secrets-venus-mcflytrap",
            "updatedAt": "2026-01-05 22:45:21",
            "createdAt": "2026-01-05 22:45:21"
        },
        {
            "id": 5,
            "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
            "seriesId": 157,
            "releaseSlug": "funko-pop-retro-toys-howliday-skelita",
            "updatedAt": "2026-01-05 22:45:23",
            "createdAt": "2026-01-05 22:45:23"
        },
        {
            "id": 6,
            "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
            "seriesId": 118,
            "releaseSlug": "scary-sweet-birthday-draculaura",
            "updatedAt": "2026-01-05 22:45:24",
            "createdAt": "2026-01-05 22:45:24"
        },
        {
            "id": 7,
            "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
            "seriesId": 123,
            "releaseSlug": "self-scare-secrets-draculaura",
            "updatedAt": "2026-01-05 22:45:26",
            "createdAt": "2026-01-05 22:45:26"
        },
        {
            "id": 8,
            "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-scaremester-draculaura",
            "updatedAt": "2026-01-05 22:45:27",
            "createdAt": "2026-01-05 22:45:27"
        },
        {
            "id": 9,
            "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
            "seriesId": 134,
            "releaseSlug": "skullector-clawdeen-wolf-house-of-wolf",
            "updatedAt": "2026-01-05 22:45:29",
            "createdAt": "2026-01-05 22:45:29"
        },
        {
            "id": 10,
            "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
            "seriesId": 89,
            "releaseSlug": "skelita-calaveras-dia-de-muertos",
            "updatedAt": "2026-01-05 22:45:33",
            "createdAt": "2026-01-05 22:45:33"
        },
        {
            "id": 11,
            "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
            "seriesId": 135,
            "releaseSlug": "skulltimate-secrets-destination-gore-geous-oasis-draculaura",
            "updatedAt": "2026-01-05 22:45:36",
            "createdAt": "2026-01-05 22:45:36"
        },
        {
            "id": 12,
            "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
            "seriesId": 157,
            "releaseSlug": "funko-pop-retro-toys-ghoulia-yelps",
            "updatedAt": "2026-01-05 22:45:39",
            "createdAt": "2026-01-05 22:45:39"
        },
        {
            "id": 13,
            "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-haunted-dance-twyla",
            "updatedAt": "2026-01-05 22:45:42",
            "createdAt": "2026-01-05 22:45:42"
        },
        {
            "id": 14,
            "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
            "seriesId": 135,
            "releaseSlug": "skulltimate-secrets-destination-gore-geous-oasis-jinafire-long",
            "updatedAt": "2026-01-05 22:45:44",
            "createdAt": "2026-01-05 22:45:44"
        },
        {
            "id": 15,
            "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
            "seriesId": 157,
            "releaseSlug": "funko-pop-retro-toys-frankie-stein-mini-glitter-globe",
            "updatedAt": "2026-01-05 22:45:48",
            "createdAt": "2026-01-05 22:45:48"
        },
        {
            "id": 16,
            "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-scaremester-clawdeen-wolf",
            "updatedAt": "2026-01-05 22:45:50",
            "createdAt": "2026-01-05 22:45:50"
        },
        {
            "id": 17,
            "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-haunted-dance-lagoona-blue",
            "updatedAt": "2026-01-05 22:45:52",
            "createdAt": "2026-01-05 22:45:52"
        },
        {
            "id": 18,
            "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-clawdeen-wolf",
            "updatedAt": "2026-01-05 22:45:55",
            "createdAt": "2026-01-05 22:45:55"
        },
        {
            "id": 19,
            "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
            "seriesId": 135,
            "releaseSlug": "skulltimate-secrets-destination-gore-geous-oasis-lagoona-blue",
            "updatedAt": "2026-01-05 22:45:58",
            "createdAt": "2026-01-05 22:45:58"
        },
        {
            "id": 20,
            "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
            "seriesId": 39,
            "releaseSlug": "fang-vote-catty-noir",
            "updatedAt": "2026-01-05 22:46:01",
            "createdAt": "2026-01-05 22:46:01"
        },
        {
            "id": 21,
            "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
            "seriesId": 118,
            "releaseSlug": "scary-sweet-birthday-frankie-stein",
            "updatedAt": "2026-01-05 22:46:05",
            "createdAt": "2026-01-05 22:46:05"
        },
        {
            "id": 22,
            "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
            "seriesId": 134,
            "releaseSlug": "skullector-edward-scissorhands",
            "updatedAt": "2026-01-05 22:46:08",
            "createdAt": "2026-01-05 22:46:08"
        },
        {
            "id": 23,
            "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
            "seriesId": 135,
            "releaseSlug": "skulltimate-secrets-hauntlywood-catty-noir",
            "updatedAt": "2026-01-05 22:46:11",
            "createdAt": "2026-01-05 22:46:11"
        },
        {
            "id": 24,
            "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
            "seriesId": 134,
            "releaseSlug": "skullector-elvira-mistress-of-the-dark-2",
            "updatedAt": "2026-01-05 22:46:12",
            "createdAt": "2026-01-05 22:46:12"
        },
        {
            "id": 25,
            "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
            "seriesId": 62,
            "releaseSlug": "generation-3-skelita-calaveras",
            "updatedAt": "2026-01-05 22:46:13",
            "createdAt": "2026-01-05 22:46:13"
        },
        {
            "id": 26,
            "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
            "seriesId": 30,
            "releaseSlug": "designer-series-corazon-marikit",
            "updatedAt": "2026-01-05 22:46:15",
            "createdAt": "2026-01-05 22:46:15"
        },
        {
            "id": 27,
            "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
            "seriesId": 157,
            "releaseSlug": "funko-pop-retro-toys-abbey-bominable",
            "updatedAt": "2026-01-05 22:46:18",
            "createdAt": "2026-01-05 22:46:18"
        },
        {
            "id": 28,
            "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
            "seriesId": 157,
            "releaseSlug": "funko-pop-retro-toys-sweet-1600-draculaura",
            "updatedAt": "2026-01-05 22:46:19",
            "createdAt": "2026-01-05 22:46:19"
        },
        {
            "id": 29,
            "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
            "seriesId": 157,
            "releaseSlug": "funko-pop-retro-toys-howliday-draculaura",
            "updatedAt": "2026-01-05 22:46:20",
            "createdAt": "2026-01-05 22:46:20"
        },
        {
            "id": 30,
            "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-draculaura",
            "updatedAt": "2026-01-05 22:46:21",
            "createdAt": "2026-01-05 22:46:21"
        },
        {
            "id": 31,
            "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-haunted-dance-clawdeen-wolf",
            "updatedAt": "2026-01-05 22:46:24",
            "createdAt": "2026-01-05 22:46:24"
        },
        {
            "id": 32,
            "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
            "seriesId": 62,
            "releaseSlug": "generation-3-nefera-de-nile",
            "updatedAt": "2026-01-05 22:46:27",
            "createdAt": "2026-01-05 22:46:27"
        },
        {
            "id": 33,
            "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
            "seriesId": 118,
            "releaseSlug": "scary-sweet-birthday-clawdeen-wolf-cake-playset",
            "updatedAt": "2026-01-05 22:46:28",
            "createdAt": "2026-01-05 22:46:28"
        },
        {
            "id": 34,
            "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
            "seriesId": 134,
            "releaseSlug": "skullector-adelaide-and-red",
            "updatedAt": "2026-01-05 22:46:30",
            "createdAt": "2026-01-05 22:46:30"
        },
        {
            "id": 35,
            "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
            "seriesId": 134,
            "releaseSlug": "skullector-lost-boys-david",
            "updatedAt": "2026-01-05 22:46:32",
            "createdAt": "2026-01-05 22:46:32"
        },
        {
            "id": 36,
            "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
            "seriesId": 118,
            "releaseSlug": "scary-sweet-birthday-cleo-de-nile",
            "updatedAt": "2026-01-05 22:46:36",
            "createdAt": "2026-01-05 22:46:36"
        },
        {
            "id": 37,
            "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
            "seriesId": 157,
            "releaseSlug": "funko-pop-retro-toys-haunt-couture-cleo-de-nile",
            "updatedAt": "2026-01-05 22:46:39",
            "createdAt": "2026-01-05 22:46:39"
        },
        {
            "id": 38,
            "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
            "seriesId": 112,
            "releaseSlug": "reel-drama-cleo-de-nile",
            "updatedAt": "2026-01-05 22:46:42",
            "createdAt": "2026-01-05 22:46:42"
        },
        {
            "id": 39,
            "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
            "seriesId": 134,
            "releaseSlug": "skullector-corpse-bride",
            "updatedAt": "2026-01-05 22:46:45",
            "createdAt": "2026-01-05 22:46:45"
        },
        {
            "id": 40,
            "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
            "seriesId": 11,
            "releaseSlug": "boo-riginal-creeproduction-toralei-stripe",
            "updatedAt": "2026-01-05 22:46:49",
            "createdAt": "2026-01-05 22:46:49"
        },
        {
            "id": 41,
            "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
            "seriesId": 41,
            "releaseSlug": "fearbook-venus-mcflytrap",
            "updatedAt": "2026-01-05 22:46:51",
            "createdAt": "2026-01-05 22:46:51"
        },
        {
            "id": 42,
            "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-scaremester-toralei-stripe",
            "updatedAt": "2026-01-05 22:46:55",
            "createdAt": "2026-01-05 22:46:55"
        },
        {
            "id": 43,
            "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
            "seriesId": 134,
            "releaseSlug": "skullector-betelgeuse-and-lydia-deetz",
            "updatedAt": "2026-01-05 22:46:57",
            "createdAt": "2026-01-05 22:46:57"
        },
        {
            "id": 44,
            "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
            "seriesId": 123,
            "releaseSlug": "self-scare-secrets-abbey-bominable",
            "updatedAt": "2026-01-05 22:47:00",
            "createdAt": "2026-01-05 22:47:00"
        },
        {
            "id": 45,
            "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
            "seriesId": 134,
            "releaseSlug": "skullector-m3gan-doll",
            "updatedAt": "2026-01-05 22:47:03",
            "createdAt": "2026-01-05 22:47:03"
        },
        {
            "id": 46,
            "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
            "seriesId": 11,
            "releaseSlug": "boo-riginal-creeproduction-meowlody-purrsephone-2-pack",
            "updatedAt": "2026-01-05 22:47:08",
            "createdAt": "2026-01-05 22:47:08"
        },
        {
            "id": 47,
            "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-scaremester-frankie-stein",
            "updatedAt": "2026-01-05 22:47:11",
            "createdAt": "2026-01-05 22:47:11"
        },
        {
            "id": 48,
            "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-cleo-de-nile",
            "updatedAt": "2026-01-05 22:47:13",
            "createdAt": "2026-01-05 22:47:13"
        },
        {
            "id": 49,
            "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
            "seriesId": 134,
            "releaseSlug": "skullector-alien",
            "updatedAt": "2026-01-05 22:47:16",
            "createdAt": "2026-01-05 22:47:16"
        },
        {
            "id": 50,
            "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
            "seriesId": 135,
            "releaseSlug": "skulltimate-secrets-hauntlywood-frankie-stein",
            "updatedAt": "2026-01-05 22:47:19",
            "createdAt": "2026-01-05 22:47:19"
        },
        {
            "id": 51,
            "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
            "seriesId": 157,
            "releaseSlug": "funko-pop-retro-toys-cleo-de-nile",
            "updatedAt": "2026-01-05 22:47:21",
            "createdAt": "2026-01-05 22:47:21"
        },
        {
            "id": 52,
            "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
            "seriesId": 134,
            "releaseSlug": "skullector-the-shining-grady-twins-re-release",
            "updatedAt": "2026-01-05 22:47:22",
            "createdAt": "2026-01-05 22:47:22"
        },
        {
            "id": 53,
            "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-haunted-dance-cleo-de-nile",
            "updatedAt": "2026-01-05 22:47:25",
            "createdAt": "2026-01-05 22:47:25"
        },
        {
            "id": 54,
            "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
            "seriesId": 11,
            "releaseSlug": "boo-riginal-creeproduction-operetta",
            "updatedAt": "2026-01-05 22:47:26",
            "createdAt": "2026-01-05 22:47:26"
        },
        {
            "id": 55,
            "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
            "seriesId": 102,
            "releaseSlug": "monster-high-x-wednesday-bianca-barclay",
            "updatedAt": "2026-01-05 22:47:27",
            "createdAt": "2026-01-05 22:47:27"
        },
        {
            "id": 56,
            "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
            "seriesId": 118,
            "releaseSlug": "scary-sweet-birthday-cupid-asteria",
            "updatedAt": "2026-01-05 22:47:31",
            "createdAt": "2026-01-05 22:47:31"
        },
        {
            "id": 57,
            "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
            "seriesId": 13,
            "releaseSlug": "buried-secrets-frankie-stein",
            "updatedAt": "2026-01-05 22:47:33",
            "createdAt": "2026-01-05 22:47:33"
        },
        {
            "id": 58,
            "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
            "seriesId": 41,
            "releaseSlug": "fearbook-abbey-bominable",
            "updatedAt": "2026-01-05 22:47:34",
            "createdAt": "2026-01-05 22:47:34"
        },
        {
            "id": 59,
            "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
            "seriesId": 134,
            "releaseSlug": "skullector-elvira-mistress-of-the-dark",
            "updatedAt": "2026-01-05 22:47:35",
            "createdAt": "2026-01-05 22:47:35"
        },
        {
            "id": 60,
            "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
            "seriesId": 158,
            "releaseSlug": "venus-mcflytrap",
            "updatedAt": "2026-01-05 22:47:37",
            "createdAt": "2026-01-05 22:47:37"
        }
    ]
} as const;
export const assets = {
    "releaseImageUrls": [
      {
        "id": 1,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 2,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 3,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 4,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 5,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 6,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 7,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 8,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 9,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "url": "/demo/releases/2025/skullector/frankie-barbie/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 10,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 11,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 12,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 13,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 14,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 15,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 16,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 17,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 18,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 19,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 20,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 21,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 22,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 23,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 24,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 25,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 26,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 27,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 28,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 29,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 30,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 31,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "url": "/demo/releases/2025/skullector/twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 32,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 33,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 34,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 35,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 36,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 37,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 38,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 39,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 40,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 41,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 42,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 43,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 44,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 45,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 46,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "url": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 47,
        "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
        "url": "/demo/releases/2025/retro-toys-skelita/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:23",
        "createdAt": "2026-01-05 22:45:23"
      },
      {
        "id": 48,
        "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
        "url": "/demo/releases/2025/retro-toys-skelita/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:23",
        "createdAt": "2026-01-05 22:45:23"
      },
      {
        "id": 49,
        "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
        "url": "/demo/releases/2025/retro-toys-skelita/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:23",
        "createdAt": "2026-01-05 22:45:23"
      },
      {
        "id": 50,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 51,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 52,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 53,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 54,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 55,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 56,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 57,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "url": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 58,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 59,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 60,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 61,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 62,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 63,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 64,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "url": "/demo/releases/2025/self-scare-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 65,
        "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
        "url": "/demo/releases/2025/buried-secrets-scaremester-draculaura/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:27",
        "createdAt": "2026-01-05 22:45:27"
      },
      {
        "id": 66,
        "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
        "url": "/demo/releases/2025/buried-secrets-scaremester-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:27",
        "createdAt": "2026-01-05 22:45:27"
      },
      {
        "id": 67,
        "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
        "url": "/demo/releases/2025/buried-secrets-scaremester-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:27",
        "createdAt": "2026-01-05 22:45:27"
      },
      {
        "id": 68,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 69,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 70,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 71,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 72,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 73,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 74,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 75,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 76,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "url": "/demo/releases/2025/skullector/clawdeen-wolf-house-of-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 77,
        "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33"
      },
      {
        "id": 78,
        "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33"
      },
      {
        "id": 79,
        "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33"
      },
      {
        "id": 80,
        "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33"
      },
      {
        "id": 81,
        "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33"
      },
      {
        "id": 82,
        "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33"
      },
      {
        "id": 83,
        "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "url": "/demo/releases/2025/gen-3-skelita-calaveras/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33"
      },
      {
        "id": 84,
        "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36"
      },
      {
        "id": 85,
        "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36"
      },
      {
        "id": 86,
        "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36"
      },
      {
        "id": 87,
        "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36"
      },
      {
        "id": 88,
        "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36"
      },
      {
        "id": 89,
        "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36"
      },
      {
        "id": 90,
        "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "url": "/demo/releases/2025/skulltimate-secrets-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36"
      },
      {
        "id": 91,
        "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
        "url": "/demo/releases/2025/retro-toys-ghoulia-yelps/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:39",
        "createdAt": "2026-01-05 22:45:39"
      },
      {
        "id": 92,
        "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
        "url": "/demo/releases/2025/retro-toys-ghoulia-yelps/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:39",
        "createdAt": "2026-01-05 22:45:39"
      },
      {
        "id": 93,
        "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
        "url": "/demo/releases/2025/retro-toys-ghoulia-yelps/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:39",
        "createdAt": "2026-01-05 22:45:39"
      },
      {
        "id": 94,
        "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
        "url": "/demo/releases/2025/haunted-dance-twyla/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:42",
        "createdAt": "2026-01-05 22:45:42"
      },
      {
        "id": 95,
        "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
        "url": "/demo/releases/2025/haunted-dance-twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:42",
        "createdAt": "2026-01-05 22:45:42"
      },
      {
        "id": 96,
        "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
        "url": "/demo/releases/2025/haunted-dance-twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:42",
        "createdAt": "2026-01-05 22:45:42"
      },
      {
        "id": 97,
        "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
        "url": "/demo/releases/2025/haunted-dance-twyla/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:42",
        "createdAt": "2026-01-05 22:45:42"
      },
      {
        "id": 98,
        "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44"
      },
      {
        "id": 99,
        "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44"
      },
      {
        "id": 100,
        "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44"
      },
      {
        "id": 101,
        "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44"
      },
      {
        "id": 102,
        "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44"
      },
      {
        "id": 103,
        "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44"
      },
      {
        "id": 104,
        "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "url": "/demo/releases/2025/skulltimate-secrets-jinafire-long/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44"
      },
      {
        "id": 105,
        "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
        "url": "/demo/releases/2025/retro-toys-frankie-stein-mini-glitter-globe/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:48",
        "createdAt": "2026-01-05 22:45:48"
      },
      {
        "id": 106,
        "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
        "url": "/demo/releases/2025/retro-toys-frankie-stein-mini-glitter-globe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:48",
        "createdAt": "2026-01-05 22:45:48"
      },
      {
        "id": 107,
        "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
        "url": "/demo/releases/2025/retro-toys-frankie-stein-mini-glitter-globe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:48",
        "createdAt": "2026-01-05 22:45:48"
      },
      {
        "id": 108,
        "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
        "url": "/demo/releases/2025/buried-secrets-scaremester-clawdeen-wolf/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:50",
        "createdAt": "2026-01-05 22:45:50"
      },
      {
        "id": 109,
        "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
        "url": "/demo/releases/2025/buried-secrets-scaremester-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:50",
        "createdAt": "2026-01-05 22:45:50"
      },
      {
        "id": 110,
        "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
        "url": "/demo/releases/2025/buried-secrets-scaremester-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:50",
        "createdAt": "2026-01-05 22:45:50"
      },
      {
        "id": 111,
        "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
        "url": "/demo/releases/2025/haunted-dance-lagoona-blue/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:52",
        "createdAt": "2026-01-05 22:45:52"
      },
      {
        "id": 112,
        "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
        "url": "/demo/releases/2025/haunted-dance-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:52",
        "createdAt": "2026-01-05 22:45:52"
      },
      {
        "id": 113,
        "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
        "url": "/demo/releases/2025/haunted-dance-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:52",
        "createdAt": "2026-01-05 22:45:52"
      },
      {
        "id": 114,
        "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
        "url": "/demo/releases/2025/haunted-dance-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:52",
        "createdAt": "2026-01-05 22:45:52"
      },
      {
        "id": 115,
        "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-clawdeen-wolf/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:55",
        "createdAt": "2026-01-05 22:45:55"
      },
      {
        "id": 116,
        "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:55",
        "createdAt": "2026-01-05 22:45:55"
      },
      {
        "id": 117,
        "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:55",
        "createdAt": "2026-01-05 22:45:55"
      },
      {
        "id": 118,
        "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58"
      },
      {
        "id": 119,
        "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58"
      },
      {
        "id": 120,
        "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58"
      },
      {
        "id": 121,
        "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58"
      },
      {
        "id": 122,
        "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58"
      },
      {
        "id": 123,
        "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58"
      },
      {
        "id": 124,
        "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "url": "/demo/releases/2025/skulltimate-secrets-lagoona-blue/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58"
      },
      {
        "id": 125,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 126,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 127,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 128,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 129,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 130,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 131,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 132,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 133,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 134,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 135,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "url": "/demo/releases/2025/catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 136,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 137,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 138,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 139,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 140,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 141,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 142,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 143,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "url": "/demo/releases/2025/scary-sweet-birthday-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 144,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 145,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 146,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 147,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 148,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 149,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 150,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 151,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 152,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 153,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 154,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "url": "/demo/releases/2025/skullector/edward/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 155,
        "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11"
      },
      {
        "id": 156,
        "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11"
      },
      {
        "id": 157,
        "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11"
      },
      {
        "id": 158,
        "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11"
      },
      {
        "id": 159,
        "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11"
      },
      {
        "id": 160,
        "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11"
      },
      {
        "id": 161,
        "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-catty-noir/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11"
      },
      {
        "id": 162,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "url": "/demo/releases/2025/skullector/elvira/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 163,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "url": "/demo/releases/2025/skullector/elvira/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 164,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "url": "/demo/releases/2025/skullector/elvira/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 165,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "url": "/demo/releases/2025/skullector/elvira/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 166,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "url": "/demo/releases/2025/skullector/elvira/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 167,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "url": "/demo/releases/2025/skullector/elvira/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 168,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "url": "/demo/releases/2025/skullector/elvira/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 169,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "url": "/demo/releases/2025/skullector/elvira/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 170,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "url": "/demo/releases/2025/skullector/skelita/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 171,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "url": "/demo/releases/2025/skullector/skelita/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 172,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "url": "/demo/releases/2025/skullector/skelita/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 173,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "url": "/demo/releases/2025/skullector/skelita/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 174,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "url": "/demo/releases/2025/skullector/skelita/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 175,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "url": "/demo/releases/2025/skullector/skelita/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 176,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "url": "/demo/releases/2025/skullector/skelita/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 177,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 178,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 179,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 180,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 181,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 182,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 183,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 184,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 185,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 186,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 187,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 188,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 189,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 190,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 191,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 192,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 193,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 194,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 195,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 196,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 197,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 198,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 199,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 200,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 201,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 202,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "url": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 203,
        "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
        "url": "/demo/releases/2025/retro-toys-abbey-bominable/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:18",
        "createdAt": "2026-01-05 22:46:18"
      },
      {
        "id": 204,
        "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
        "url": "/demo/releases/2025/retro-toys-abbey-bominable/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:18",
        "createdAt": "2026-01-05 22:46:18"
      },
      {
        "id": 205,
        "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
        "url": "/demo/releases/2025/retro-toys-abbey-bominable/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:18",
        "createdAt": "2026-01-05 22:46:18"
      },
      {
        "id": 206,
        "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
        "url": "/demo/releases/2025/retro-toys-draculaura-1600/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:19",
        "createdAt": "2026-01-05 22:46:19"
      },
      {
        "id": 207,
        "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
        "url": "/demo/releases/2025/retro-toys-draculaura-1600/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:19",
        "createdAt": "2026-01-05 22:46:19"
      },
      {
        "id": 208,
        "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
        "url": "/demo/releases/2025/retro-toys-draculaura-1600/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:19",
        "createdAt": "2026-01-05 22:46:19"
      },
      {
        "id": 209,
        "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
        "url": "/demo/releases/2025/retro-toys-draculaura-howliday/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:20",
        "createdAt": "2026-01-05 22:46:20"
      },
      {
        "id": 210,
        "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
        "url": "/demo/releases/2025/retro-toys-draculaura-howliday/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:20",
        "createdAt": "2026-01-05 22:46:20"
      },
      {
        "id": 211,
        "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
        "url": "/demo/releases/2025/retro-toys-draculaura-howliday/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:20",
        "createdAt": "2026-01-05 22:46:20"
      },
      {
        "id": 212,
        "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-draculaura/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:21",
        "createdAt": "2026-01-05 22:46:21"
      },
      {
        "id": 213,
        "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:21",
        "createdAt": "2026-01-05 22:46:21"
      },
      {
        "id": 214,
        "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-draculaura/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:21",
        "createdAt": "2026-01-05 22:46:21"
      },
      {
        "id": 215,
        "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24"
      },
      {
        "id": 216,
        "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24"
      },
      {
        "id": 217,
        "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24"
      },
      {
        "id": 218,
        "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24"
      },
      {
        "id": 219,
        "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24"
      },
      {
        "id": 220,
        "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24"
      },
      {
        "id": 221,
        "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "url": "/demo/releases/2025/haunted-dance-clawdeen-wolf/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24"
      },
      {
        "id": 222,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 223,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 224,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 225,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 226,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 227,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 228,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 229,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 230,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "url": "/demo/releases/2025/gen-3-nefera-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 231,
        "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-1.jpg",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28"
      },
      {
        "id": 232,
        "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-5-1.jpg",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28"
      },
      {
        "id": 233,
        "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-4.jpg",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28"
      },
      {
        "id": 234,
        "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-5.jpg",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28"
      },
      {
        "id": 235,
        "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-3.jpg",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28"
      },
      {
        "id": 236,
        "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-2.jpg",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28"
      },
      {
        "id": 237,
        "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "url": "https://mhcollector.com/wp-content/uploads/2025/01/Scary-Sweet-Birthday-Clawdeen-Wolf-Cake-Playset-1.jpg",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28"
      },
      {
        "id": 238,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 239,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 240,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 241,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 242,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 243,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 244,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 245,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 246,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 247,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 248,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 249,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 250,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 251,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 252,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 253,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "url": "/demo/releases/2025/skullector/us-adelaide-and-red/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 254,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 255,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 256,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 257,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 258,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 259,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 260,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 261,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 262,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 263,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 264,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 265,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "url": "/demo/releases/2025/skullector/lost-boys/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 266,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 267,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 268,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 269,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 270,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 271,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 272,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 273,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "url": "/demo/releases/2025/scary-sweet-birthday-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 274,
        "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
        "url": "/demo/releases/2025/retro-toys-haunt-couture-cleo-de/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:39",
        "createdAt": "2026-01-05 22:46:39"
      },
      {
        "id": 275,
        "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
        "url": "/demo/releases/2025/retro-toys-haunt-couture-cleo-de/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:39",
        "createdAt": "2026-01-05 22:46:39"
      },
      {
        "id": 276,
        "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
        "url": "/demo/releases/2025/retro-toys-haunt-couture-cleo-de/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:39",
        "createdAt": "2026-01-05 22:46:39"
      },
      {
        "id": 277,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 278,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 279,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 280,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 281,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 282,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 283,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 284,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "url": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 285,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 286,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 287,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 288,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 289,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 290,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 291,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 292,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 293,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 294,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 295,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "url": "/demo/releases/2025/skullector/corpse-bride/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 296,
        "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "url": "/demo/releases/2025/toralei-stripe/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49"
      },
      {
        "id": 297,
        "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "url": "/demo/releases/2025/toralei-stripe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49"
      },
      {
        "id": 298,
        "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "url": "/demo/releases/2025/toralei-stripe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49"
      },
      {
        "id": 299,
        "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "url": "/demo/releases/2025/toralei-stripe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49"
      },
      {
        "id": 300,
        "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "url": "/demo/releases/2025/toralei-stripe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49"
      },
      {
        "id": 301,
        "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "url": "/demo/releases/2025/toralei-stripe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49"
      },
      {
        "id": 302,
        "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51"
      },
      {
        "id": 303,
        "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51"
      },
      {
        "id": 304,
        "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51"
      },
      {
        "id": 305,
        "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51"
      },
      {
        "id": 306,
        "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51"
      },
      {
        "id": 307,
        "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51"
      },
      {
        "id": 308,
        "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "url": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51"
      },
      {
        "id": 309,
        "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
        "url": "/demo/releases/2025/buried-secrets-scaremester-tolarei-stripe/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:55",
        "createdAt": "2026-01-05 22:46:55"
      },
      {
        "id": 310,
        "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
        "url": "/demo/releases/2025/buried-secrets-scaremester-tolarei-stripe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:55",
        "createdAt": "2026-01-05 22:46:55"
      },
      {
        "id": 311,
        "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
        "url": "/demo/releases/2025/buried-secrets-scaremester-tolarei-stripe/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:55",
        "createdAt": "2026-01-05 22:46:55"
      },
      {
        "id": 312,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 313,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 314,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 315,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 316,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 317,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 318,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 319,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 320,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 321,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 322,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "url": "/demo/releases/2025/skullector/betelgeuse/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 323,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 324,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 325,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 326,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 327,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 328,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 329,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "url": "/demo/releases/2025/self-scare-secrets-abbey/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 330,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 331,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 332,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 333,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 334,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 335,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 336,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 337,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 338,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 339,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 340,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 341,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 342,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 343,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 344,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 345,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "url": "/demo/releases/2025/skullector/megan/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 346,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 347,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 348,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 349,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 350,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 351,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 352,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "url": "/demo/releases/2025/meowlody---purrsephone-2-pack/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 353,
        "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
        "url": "/demo/releases/2025/buried-secrets-scaremester-frankie-stein/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:11",
        "createdAt": "2026-01-05 22:47:11"
      },
      {
        "id": 354,
        "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
        "url": "/demo/releases/2025/buried-secrets-scaremester-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:11",
        "createdAt": "2026-01-05 22:47:11"
      },
      {
        "id": 355,
        "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
        "url": "/demo/releases/2025/buried-secrets-scaremester-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:11",
        "createdAt": "2026-01-05 22:47:11"
      },
      {
        "id": 356,
        "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-cleo-de-nile/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:13",
        "createdAt": "2026-01-05 22:47:13"
      },
      {
        "id": 357,
        "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:13",
        "createdAt": "2026-01-05 22:47:13"
      },
      {
        "id": 358,
        "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:13",
        "createdAt": "2026-01-05 22:47:13"
      },
      {
        "id": 359,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 360,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 361,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 362,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 363,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 364,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 365,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 366,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 367,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 368,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 369,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "url": "/demo/releases/2025/skullector/alien/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 370,
        "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:19",
        "createdAt": "2026-01-05 22:47:19"
      },
      {
        "id": 371,
        "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:19",
        "createdAt": "2026-01-05 22:47:19"
      },
      {
        "id": 372,
        "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:19",
        "createdAt": "2026-01-05 22:47:19"
      },
      {
        "id": 373,
        "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:19",
        "createdAt": "2026-01-05 22:47:19"
      },
      {
        "id": 374,
        "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:19",
        "createdAt": "2026-01-05 22:47:19"
      },
      {
        "id": 375,
        "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
        "url": "/demo/releases/2025/skulltimate-secrets-hauntlywood-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:19",
        "createdAt": "2026-01-05 22:47:19"
      },
      {
        "id": 376,
        "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
        "url": "/demo/releases/2025/retro-toys-cleo-de-nile/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:21",
        "createdAt": "2026-01-05 22:47:21"
      },
      {
        "id": 377,
        "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
        "url": "/demo/releases/2025/retro-toys-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:21",
        "createdAt": "2026-01-05 22:47:21"
      },
      {
        "id": 378,
        "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
        "url": "/demo/releases/2025/retro-toys-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:21",
        "createdAt": "2026-01-05 22:47:21"
      },
      {
        "id": 379,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 380,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 381,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 382,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 383,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 384,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 385,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 386,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 387,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 388,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 389,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 390,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 391,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "url": "/demo/releases/2025/skullector/shining-grady-twins/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 392,
        "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
        "url": "/demo/releases/2025/buried-secrets-haunted-dance-cleo-de-nile/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:25",
        "createdAt": "2026-01-05 22:47:25"
      },
      {
        "id": 393,
        "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
        "url": "/demo/releases/2025/buried-secrets-haunted-dance-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:25",
        "createdAt": "2026-01-05 22:47:25"
      },
      {
        "id": 394,
        "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
        "url": "/demo/releases/2025/buried-secrets-haunted-dance-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:25",
        "createdAt": "2026-01-05 22:47:25"
      },
      {
        "id": 395,
        "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
        "url": "/demo/releases/2025/buried-secrets-haunted-dance-cleo-de-nile/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:25",
        "createdAt": "2026-01-05 22:47:25"
      },
      {
        "id": 396,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "url": "/demo/releases/2025/operetta/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 397,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "url": "/demo/releases/2025/operetta/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 398,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "url": "/demo/releases/2025/operetta/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 399,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "url": "/demo/releases/2025/operetta/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 400,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "url": "/demo/releases/2025/operetta/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 401,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "url": "/demo/releases/2025/operetta/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 402,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "url": "/demo/releases/2025/operetta/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 403,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "url": "/demo/releases/2025/bianca-barclay/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 404,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "url": "/demo/releases/2025/bianca-barclay/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 405,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "url": "/demo/releases/2025/bianca-barclay/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 406,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "url": "/demo/releases/2025/bianca-barclay/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 407,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "url": "/demo/releases/2025/bianca-barclay/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 408,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "url": "/demo/releases/2025/bianca-barclay/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 409,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "url": "/demo/releases/2025/bianca-barclay/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 410,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "url": "/demo/releases/2025/bianca-barclay/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 411,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 412,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 413,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 414,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 415,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 416,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 417,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 418,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "url": "/demo/releases/2025/scary-sweet-birthday-cupid-asteria/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 419,
        "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-frankie-stein/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:33",
        "createdAt": "2026-01-05 22:47:33"
      },
      {
        "id": 420,
        "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:33",
        "createdAt": "2026-01-05 22:47:33"
      },
      {
        "id": 421,
        "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
        "url": "/demo/releases/2025/buried-secrets-cozy-creepover-frankie-stein/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:33",
        "createdAt": "2026-01-05 22:47:33"
      },
      {
        "id": 422,
        "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34"
      },
      {
        "id": 423,
        "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34"
      },
      {
        "id": 424,
        "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34"
      },
      {
        "id": 425,
        "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34"
      },
      {
        "id": 426,
        "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34"
      },
      {
        "id": 427,
        "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34"
      },
      {
        "id": 428,
        "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "url": "/demo/releases/2025/fearbook-abbey-bominable/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34"
      },
      {
        "id": 429,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 430,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 431,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 432,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 433,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 434,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 435,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 436,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 437,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "url": "/demo/releases/2025/skullector/elvira-sdcc/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 438,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": true,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 439,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 440,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 441,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 442,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 443,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 444,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 445,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 446,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 447,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 448,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 449,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      },
      {
        "id": 450,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "url": "/demo/releases/2025/skullector/venus/main-image.png",
        "isPrimary": false,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      }
    ],
    "releaseMediaAssets": [
      {
        "id": 1,
        "releaseId": "019c3a60-8b8e-7153-9507-6235851a7ac8",
        "mediaAssetId": 40,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:09",
        "createdAt": "2026-01-05 22:45:09"
      },
      {
        "id": 2,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "mediaAssetId": 96,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 3,
        "releaseId": "019c3a60-8b8f-76a6-9163-0dec6fa65af5",
        "mediaAssetId": 21,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:19",
        "createdAt": "2026-01-05 22:45:19"
      },
      {
        "id": 4,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "mediaAssetId": 98,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 5,
        "releaseId": "019c3a60-8b8f-7d9e-b11b-f8584cbfaa89",
        "mediaAssetId": 91,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:23",
        "createdAt": "2026-01-05 22:45:23"
      },
      {
        "id": 6,
        "releaseId": "019c3a60-8b8f-7770-8623-4ac2ac105f4c",
        "mediaAssetId": 31,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:24",
        "createdAt": "2026-01-05 22:45:24"
      },
      {
        "id": 7,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "mediaAssetId": 31,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 8,
        "releaseId": "019c3a60-8b8f-7983-97cc-f5ffe4cfe30a",
        "mediaAssetId": 31,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:27",
        "createdAt": "2026-01-05 22:45:27"
      },
      {
        "id": 9,
        "releaseId": "019c3a60-8b8f-7e2a-9b50-65d5713e812c",
        "mediaAssetId": 21,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:29",
        "createdAt": "2026-01-05 22:45:29"
      },
      {
        "id": 10,
        "releaseId": "019c3a60-8b8f-7f15-ac3a-0ed4627b1a44",
        "mediaAssetId": 91,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:33",
        "createdAt": "2026-01-05 22:45:33"
      },
      {
        "id": 11,
        "releaseId": "019c3a60-8b90-7f99-88da-07e2f2753577",
        "mediaAssetId": 31,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:36",
        "createdAt": "2026-01-05 22:45:36"
      },
      {
        "id": 12,
        "releaseId": "019c3a60-8b90-74d7-a2f9-fd6897db7cd8",
        "mediaAssetId": 41,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:39",
        "createdAt": "2026-01-05 22:45:39"
      },
      {
        "id": 13,
        "releaseId": "019c3a60-8b90-7497-82c1-b3d65cfea544",
        "mediaAssetId": 96,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:42",
        "createdAt": "2026-01-05 22:45:42"
      },
      {
        "id": 14,
        "releaseId": "019c3a60-8b90-70f3-8b18-39879477ab4f",
        "mediaAssetId": 54,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:44",
        "createdAt": "2026-01-05 22:45:44"
      },
      {
        "id": 15,
        "releaseId": "019c3a60-8b90-71e4-9408-7b407278e0f0",
        "mediaAssetId": 40,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:48",
        "createdAt": "2026-01-05 22:45:48"
      },
      {
        "id": 16,
        "releaseId": "019c3a60-8b90-764a-9d16-0c91bf49feb3",
        "mediaAssetId": 21,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:50",
        "createdAt": "2026-01-05 22:45:50"
      },
      {
        "id": 17,
        "releaseId": "019c3a60-8b90-74f5-a2b0-6bfcd9860934",
        "mediaAssetId": 59,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:52",
        "createdAt": "2026-01-05 22:45:52"
      },
      {
        "id": 18,
        "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
        "mediaAssetId": 21,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:55",
        "createdAt": "2026-01-05 22:45:55"
      },
      {
        "id": 19,
        "releaseId": "019c3a60-8b90-7ba7-9ce2-15c410f25aba",
        "mediaAssetId": 59,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:45:58",
        "createdAt": "2026-01-05 22:45:58"
      },
      {
        "id": 20,
        "releaseId": "019c3a60-8b90-74f3-871b-371e4c37befc",
        "mediaAssetId": 19,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:01",
        "createdAt": "2026-01-05 22:46:01"
      },
      {
        "id": 21,
        "releaseId": "019c3a60-8b91-74f5-8509-87b25ef91c2b",
        "mediaAssetId": 40,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:05",
        "createdAt": "2026-01-05 22:46:05"
      },
      {
        "id": 22,
        "releaseId": "019c3a60-8b91-7b74-8a53-5f696e0113da",
        "mediaAssetId": 33,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:08",
        "createdAt": "2026-01-05 22:46:08"
      },
      {
        "id": 23,
        "releaseId": "019c3a60-8b91-7ac5-b2a7-eb1e13afb143",
        "mediaAssetId": 19,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:11",
        "createdAt": "2026-01-05 22:46:11"
      },
      {
        "id": 24,
        "releaseId": "019c3a60-8b91-75d0-bf8f-b8a1924dc26c",
        "mediaAssetId": 37,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:12",
        "createdAt": "2026-01-05 22:46:12"
      },
      {
        "id": 25,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "mediaAssetId": 91,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 26,
        "releaseId": "019c3a60-8b92-7f9e-a4d4-ffb454be571d",
        "mediaAssetId": 24,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:15",
        "createdAt": "2026-01-05 22:46:15"
      },
      {
        "id": 27,
        "releaseId": "019c3a60-8b92-7e36-a869-b3a86967cbe1",
        "mediaAssetId": 1,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:18",
        "createdAt": "2026-01-05 22:46:18"
      },
      {
        "id": 28,
        "releaseId": "019c3a60-8b92-7b7d-84b4-4bc4cb5ed152",
        "mediaAssetId": 31,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:19",
        "createdAt": "2026-01-05 22:46:19"
      },
      {
        "id": 29,
        "releaseId": "019c3a60-8b92-7e2c-b9a7-252c434851ed",
        "mediaAssetId": 31,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:20",
        "createdAt": "2026-01-05 22:46:20"
      },
      {
        "id": 30,
        "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
        "mediaAssetId": 31,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:21",
        "createdAt": "2026-01-05 22:46:21"
      },
      {
        "id": 31,
        "releaseId": "019c3a60-8b92-7430-ab05-aecf9c7a890a",
        "mediaAssetId": 21,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:24",
        "createdAt": "2026-01-05 22:46:24"
      },
      {
        "id": 32,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "mediaAssetId": 71,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 33,
        "releaseId": "019c3a60-8b92-73fe-9603-cff7d9f24180",
        "mediaAssetId": 21,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:28",
        "createdAt": "2026-01-05 22:46:28"
      },
      {
        "id": 34,
        "releaseId": "019c3a60-8b93-7bcf-af27-7bdf04bd854b",
        "mediaAssetId": 2,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:30",
        "createdAt": "2026-01-05 22:46:30"
      },
      {
        "id": 35,
        "releaseId": "019c3a60-8b93-742a-858e-c3f079d70727",
        "mediaAssetId": 62,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:32",
        "createdAt": "2026-01-05 22:46:32"
      },
      {
        "id": 36,
        "releaseId": "019c3a60-8b93-7443-baef-90e06d870115",
        "mediaAssetId": 23,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:36",
        "createdAt": "2026-01-05 22:46:36"
      },
      {
        "id": 37,
        "releaseId": "019c3a60-8b93-7cc8-8e1a-90be1fda8ecd",
        "mediaAssetId": 23,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:39",
        "createdAt": "2026-01-05 22:46:39"
      },
      {
        "id": 38,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "mediaAssetId": 23,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 39,
        "releaseId": "019c3a60-8b93-7277-9907-ecb7f056d941",
        "mediaAssetId": 25,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:45",
        "createdAt": "2026-01-05 22:46:45"
      },
      {
        "id": 40,
        "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "mediaAssetId": 94,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49"
      },
      {
        "id": 41,
        "releaseId": "019c3a60-8b93-7dc7-af7a-9a7533da9f83",
        "mediaAssetId": 98,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:51",
        "createdAt": "2026-01-05 22:46:51"
      },
      {
        "id": 42,
        "releaseId": "019c3a60-8b93-7cf9-adcc-76aa17d35ca4",
        "mediaAssetId": 94,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:55",
        "createdAt": "2026-01-05 22:46:55"
      },
      {
        "id": 43,
        "releaseId": "019c3a60-8b94-74ed-a613-c9f69a958950",
        "mediaAssetId": 11,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:46:57",
        "createdAt": "2026-01-05 22:46:57"
      },
      {
        "id": 44,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "mediaAssetId": 1,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 45,
        "releaseId": "019c3a60-8b94-7d49-b5d9-650af804912f",
        "mediaAssetId": 65,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:03",
        "createdAt": "2026-01-05 22:47:03"
      },
      {
        "id": 46,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "mediaAssetId": 67,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": false,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 47,
        "releaseId": "019c3a60-8b94-711a-8c8b-84b12bc49343",
        "mediaAssetId": 79,
        "kindId": 2,
        "caption": null,
        "sortOrder": 2,
        "width": null,
        "height": null,
        "isPublic": false,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:08",
        "createdAt": "2026-01-05 22:47:08"
      },
      {
        "id": 48,
        "releaseId": "019c3a60-8b94-7f8c-a4c2-722939770e28",
        "mediaAssetId": 40,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:11",
        "createdAt": "2026-01-05 22:47:11"
      },
      {
        "id": 49,
        "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
        "mediaAssetId": 23,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:13",
        "createdAt": "2026-01-05 22:47:13"
      },
      {
        "id": 50,
        "releaseId": "019c3a60-8b94-7303-bfcd-2d62ccb494e3",
        "mediaAssetId": 3,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:16",
        "createdAt": "2026-01-05 22:47:16"
      },
      {
        "id": 51,
        "releaseId": "019c3a60-8b94-79d4-80b9-11080d22c064",
        "mediaAssetId": 40,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:19",
        "createdAt": "2026-01-05 22:47:19"
      },
      {
        "id": 52,
        "releaseId": "019c3a60-8b94-79fc-ab60-bb5365218371",
        "mediaAssetId": 23,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:21",
        "createdAt": "2026-01-05 22:47:21"
      },
      {
        "id": 53,
        "releaseId": "019c3a60-8b94-7cdc-8c5b-d28ca62cdae6",
        "mediaAssetId": 45,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:22",
        "createdAt": "2026-01-05 22:47:22"
      },
      {
        "id": 54,
        "releaseId": "019c3a60-8b95-7aa5-b922-4ee32119ad5d",
        "mediaAssetId": 23,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:25",
        "createdAt": "2026-01-05 22:47:25"
      },
      {
        "id": 55,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "mediaAssetId": 72,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 56,
        "releaseId": "019c3a60-8b95-749e-b866-3e81c6044c4b",
        "mediaAssetId": 13,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:27",
        "createdAt": "2026-01-05 22:47:27"
      },
      {
        "id": 57,
        "releaseId": "019c3a60-8b95-73db-97db-f15f96772195",
        "mediaAssetId": 27,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:31",
        "createdAt": "2026-01-05 22:47:31"
      },
      {
        "id": 58,
        "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
        "mediaAssetId": 40,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:33",
        "createdAt": "2026-01-05 22:47:33"
      },
      {
        "id": 59,
        "releaseId": "019c3a60-8b95-77f5-a0c5-536237c9dfd0",
        "mediaAssetId": 1,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:34",
        "createdAt": "2026-01-05 22:47:34"
      },
      {
        "id": 60,
        "releaseId": "019c3a60-8b95-776f-87e6-7980cc85d3dc",
        "mediaAssetId": 37,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:35",
        "createdAt": "2026-01-05 22:47:35"
      },
      {
        "id": 61,
        "releaseId": "019c3a60-8b95-7ee1-80b3-8951f3630b65",
        "mediaAssetId": 98,
        "kindId": 1,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "mimeType": null,
        "updatedAt": "2026-01-05 22:47:37",
        "createdAt": "2026-01-05 22:47:37"
      }
    ],
    "releaseMediaAssets2": [
      {
        "id": 1,
        "releaseId": "019c3a60-8b8f-70e4-acd4-2b6893b68653",
        "mediaAssetId": 30,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:45:14",
        "createdAt": "2026-01-05 22:45:14"
      },
      {
        "id": 2,
        "releaseId": "019c3a60-8b8f-748e-a712-60f64fc35125",
        "mediaAssetId": 26,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:45:21",
        "createdAt": "2026-01-05 22:45:21"
      },
      {
        "id": 3,
        "releaseId": "019c3a60-8b8f-75e1-83ad-70e42e14daf6",
        "mediaAssetId": 27,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:45:26",
        "createdAt": "2026-01-05 22:45:26"
      },
      {
        "id": 4,
        "releaseId": "019c3a60-8b90-762f-a70a-83006384a341",
        "mediaAssetId": 28,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:45:55",
        "createdAt": "2026-01-05 22:45:55"
      },
      {
        "id": 5,
        "releaseId": "019c3a60-8b8f-71b0-b127-6ce84c6e2333",
        "mediaAssetId": 24,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:46:13",
        "createdAt": "2026-01-05 22:46:13"
      },
      {
        "id": 6,
        "releaseId": "019c3a60-8b92-7e39-89fd-1aee7defe79c",
        "mediaAssetId": 27,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:46:21",
        "createdAt": "2026-01-05 22:46:21"
      },
      {
        "id": 7,
        "releaseId": "019c3a60-8b92-71b8-a6cb-3a73631b4456",
        "mediaAssetId": 32,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:46:27",
        "createdAt": "2026-01-05 22:46:27"
      },
      {
        "id": 8,
        "releaseId": "019c3a60-8b93-73af-a440-87460c0be140",
        "mediaAssetId": 31,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:46:42",
        "createdAt": "2026-01-05 22:46:42"
      },
      {
        "id": 9,
        "releaseId": "019c3a60-8b93-7a84-a8aa-af9393d8ba03",
        "mediaAssetId": 41,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:46:49",
        "createdAt": "2026-01-05 22:46:49"
      },
      {
        "id": 10,
        "releaseId": "019c3a60-8b94-7b5f-8b43-42d194f6bc87",
        "mediaAssetId": 38,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:47:00",
        "createdAt": "2026-01-05 22:47:00"
      },
      {
        "id": 11,
        "releaseId": "019c3a60-8b94-79b0-ab4b-73713a12a188",
        "mediaAssetId": 31,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:47:13",
        "createdAt": "2026-01-05 22:47:13"
      },
      {
        "id": 12,
        "releaseId": "019c3a60-8b95-7eba-9dd6-19dbed955286",
        "mediaAssetId": 33,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:47:26",
        "createdAt": "2026-01-05 22:47:26"
      },
      {
        "id": 13,
        "releaseId": "019c3a60-8b95-7c9f-bd18-18b7ca3a639a",
        "mediaAssetId": 43,
        "caption": null,
        "sortOrder": 1,
        "width": null,
        "height": null,
        "isPublic": true,
        "sourceUrl": null,
        "altText": null,
        "credit": null,
        "hash": null,
        "updatedAt": "2026-01-05 22:47:33",
        "createdAt": "2026-01-05 22:47:33"
      }
    ]
  } as const;
export const meta = {
    "counts": {
      "releaseCharacterRoles": 3,
      "releaseExclusives": 15,
      "releaseTypes": 3,
      "contentTypes": 30,
      "series": 158,
      "releases": 60,
      "releaseImageUrls": 450,
      "releaseMediaAssets": 61,
      "releaseMediaAssets2": 13,
      "releaseExclusiveLinks": 14,
      "releaseTypeLinks": 182,
      "releaseCharacterLinks": 53,
      "releaseSeriesLinks": 60
    },
    "enrichedCharacterRefs": true,
    "sourceFile": "release_schema.csv"
  } as const;
export const mockCharacters = [
  {
    "id": 1,
    "slug": "abbey-bominable",
    "name": "Abbey Bominable",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 2,
    "slug": "adelaide-red",
    "name": "Adelaide & Red",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 3,
    "slug": "alien",
    "name": "Alien",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 4,
    "slug": "alivia-stein",
    "name": "Alivia Stein",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 5,
    "slug": "amanita-nightshade",
    "name": "Amanita Nightshade",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 6,
    "slug": "amber-bash",
    "name": "Amber Bash",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 7,
    "slug": "andrew-nguyen",
    "name": "Andrew Nguyen",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 8,
    "slug": "angel-bell",
    "name": "Angel Bell",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 9,
    "slug": "ann-iron",
    "name": "Ann Iron",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 10,
    "slug": "april-wright",
    "name": "April Wright",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 11,
    "slug": "ari-hauntington",
    "name": "Ari Hauntington",
    "gender": "ghoul",
    "imageUrl": "/demo/releases/2025/toralei-stripe/main-image.png",
    "pets": []
  },
  {
    "id": 12,
    "slug": "ashlynn-ella",
    "name": "Ashlynn Ella",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 13,
    "slug": "astra-nova",
    "name": "Astra Nova",
    "gender": "ghoul",
    "imageUrl": "/demo/releases/2025/buried-secrets-scaremester-draculaura/main-image.png",
    "pets": []
  },
  {
    "id": 14,
    "slug": "avea-trotter",
    "name": "Avea Trotter",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 15,
    "slug": "batsy-claro",
    "name": "Batsy Claro",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 16,
    "slug": "belle",
    "name": "Belle",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 17,
    "slug": "billy",
    "name": "Billy",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 18,
    "slug": "bitey-von-bite",
    "name": "Bitey Von Bite",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 19,
    "slug": "bloodgood",
    "name": "Bloodgood",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 20,
    "slug": "bonita-femur",
    "name": "Bonita Femur",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 21,
    "slug": "brandon",
    "name": "Brandon",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 22,
    "slug": "brian-flynn",
    "name": "Brian Flynn",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 23,
    "slug": "brittany-violin",
    "name": "Brittany Violin",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 24,
    "slug": "c-a-cupid",
    "name": "C.A. Cupid",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 25,
    "slug": "caasandra",
    "name": "Caasandra",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 26,
    "slug": "caesar",
    "name": "Caesar",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 27,
    "slug": "cally",
    "name": "Cally",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 28,
    "slug": "catrine-demew",
    "name": "Catrine DeMew",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 29,
    "slug": "catty-noir",
    "name": "Catty Noir",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 30,
    "slug": "celia",
    "name": "Celia",
    "gender": "ghoul",
    "imageUrl": "/demo/releases/2025/skullector/corazon-markit/main-image.png",
    "pets": []
  },
  {
    "id": 31,
    "slug": "claudine-wolf",
    "name": "Claudine Wolf",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": [
      {
        "id": 27,
        "slug": "count-fabulous",
        "name": "Count Fabulous"
      }
    ]
  },
  {
    "id": 32,
    "slug": "clawd-wolf",
    "name": "Clawd Wolf",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 33,
    "slug": "clawdeen-wolf",
    "name": "Clawdeen Wolf",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 34,
    "slug": "clawdia-wolf",
    "name": "Clawdia Wolf",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 35,
    "slug": "cleo-de-nile",
    "name": "Cleo de Nile",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 36,
    "slug": "clio",
    "name": "Clio",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 37,
    "slug": "cooper",
    "name": "Cooper",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 38,
    "slug": "corinne",
    "name": "Corinne",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 39,
    "slug": "cupid",
    "name": "Cupid",
    "gender": "ghoul",
    "imageUrl": "/demo/releases/2025/catty-noir/main-image.png",
    "pets": []
  },
  {
    "id": 40,
    "slug": "darko",
    "name": "Darko",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 41,
    "slug": "darla",
    "name": "Darla",
    "gender": "ghoul",
    "imageUrl": "/demo/releases/2025/fearbook-venus-mcflytrap/main-image.png",
    "pets": []
  },
  {
    "id": 42,
    "slug": "deuce-gorgon",
    "name": "Deuce Gorgon",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 43,
    "slug": "didi-grant",
    "name": "Didi Grant",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 44,
    "slug": "dina",
    "name": "Dina",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 45,
    "slug": "djinni-whisp-grant",
    "name": "Djinni \"Whisp\" Grant",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 46,
    "slug": "draculaura",
    "name": "Draculaura",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 47,
    "slug": "drake",
    "name": "Drake",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 48,
    "slug": "eldritch",
    "name": "Eldritch",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 49,
    "slug": "elissabat",
    "name": "Elissabat",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 50,
    "slug": "elle-eedee",
    "name": "Elle Eedee",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 51,
    "slug": "elvira",
    "name": "Elvira",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 52,
    "slug": "eris",
    "name": "Eris",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 53,
    "slug": "faraon",
    "name": "Faraon",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 54,
    "slug": "farrah",
    "name": "Farrah",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 55,
    "slug": "fawn",
    "name": "Fawn",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 56,
    "slug": "frankie-stein",
    "name": "Frankie Stein",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 57,
    "slug": "garrott-du-roque",
    "name": "Garrott Du Roque",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 58,
    "slug": "gaston",
    "name": "Gaston",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 59,
    "slug": "gigi-grant",
    "name": "Gigi Grant",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 60,
    "slug": "gil-webber",
    "name": "Gil Webber",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 61,
    "slug": "gory",
    "name": "Gory",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 62,
    "slug": "gory-fangtell",
    "name": "Gory Fangtell",
    "gender": "manster",
    "imageUrl": "/demo/releases/2025/skullector/skelita/main-image.png",
    "pets": []
  },
  {
    "id": 63,
    "slug": "gremelda",
    "name": "Gremelda",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 64,
    "slug": "greta-gremlin",
    "name": "Greta Gremlin",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 65,
    "slug": "gryffin",
    "name": "Gryffin",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 66,
    "slug": "gilda-goldstag",
    "name": "Gilda Goldstag",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 67,
    "slug": "hank-magnolia",
    "name": "Hank Magnolia",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 68,
    "slug": "heath-burns",
    "name": "Heath Burns",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 69,
    "slug": "hexiciah-steam",
    "name": "Hexiciah Steam",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 70,
    "slug": "honey-swamp",
    "name": "Honey Swamp",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 71,
    "slug": "howleen-wolf",
    "name": "Howleen Wolf",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": [
      {
        "id": 23,
        "slug": "azura",
        "name": "Azura"
      }
    ]
  },
  {
    "id": 72,
    "slug": "hugo",
    "name": "Hugo",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 73,
    "slug": "inna",
    "name": "Inna",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 74,
    "slug": "iris-clops",
    "name": "Iris Clops",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 75,
    "slug": "isis-dawn",
    "name": "Isis Dawn",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 76,
    "slug": "isin",
    "name": "Isin",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 77,
    "slug": "jackson-jekyll",
    "name": "Jackson Jekyll",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 78,
    "slug": "jane-boolittle",
    "name": "Jane Boolittle",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 79,
    "slug": "jinafire-long",
    "name": "Jinafire Long",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 80,
    "slug": "jinx",
    "name": "Jinx",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 81,
    "slug": "johnny-spirit",
    "name": "Johnny Spirit",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 82,
    "slug": "johnny-spirit-c",
    "name": "Johnny Spirit C",
    "gender": "manster",
    "imageUrl": null,
    "pets": [
      {
        "id": 25,
        "slug": "captain-penny",
        "name": "Captain Penny"
      }
    ]
  },
  {
    "id": 83,
    "slug": "kaia",
    "name": "Kaia",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 84,
    "slug": "kieran-valentine",
    "name": "Kieran Valentine",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 85,
    "slug": "kiyomi-haunterly",
    "name": "Kiyomi Haunterly",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 86,
    "slug": "lagoona-blue",
    "name": "Lagoona Blue",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 87,
    "slug": "london-madison",
    "name": "London Madison",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 88,
    "slug": "lorelei",
    "name": "Lorelei",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 89,
    "slug": "luna-motts",
    "name": "Luna Motts",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 90,
    "slug": "manuella-madeline",
    "name": "Manuella Madeline",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 91,
    "slug": "marisol-coxi",
    "name": "Marisol Coxi",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": [
      {
        "id": 24,
        "slug": "candelita",
        "name": "Candelita"
      }
    ]
  },
  {
    "id": 92,
    "slug": "matthew",
    "name": "Matthew",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 93,
    "slug": "moanica-dkay",
    "name": "Moanica D'Kay",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 94,
    "slug": "mousecedes-king",
    "name": "Mousecedes King",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 95,
    "slug": "neighthan-rot",
    "name": "Neighthan Rot",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 96,
    "slug": "nefera-de-nile",
    "name": "Nefera de Nile",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 97,
    "slug": "niki",
    "name": "Niki",
    "gender": "ghoul",
    "imageUrl": "/demo/releases/2025/skullector/venus/main-image.png",
    "pets": []
  },
  {
    "id": 98,
    "slug": "nika",
    "name": "Nika",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": [
      {
        "id": 26,
        "slug": "chewlian",
        "name": "Chewlian"
      }
    ]
  },
  {
    "id": 99,
    "slug": "niki-c",
    "name": "Niki C",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 100,
    "slug": "nika-c",
    "name": "Nika C",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 101,
    "slug": "operetta",
    "name": "Operetta",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 102,
    "slug": "porter-geiss",
    "name": "Porter Geiss",
    "gender": "manster",
    "imageUrl": "/demo/releases/2025/bianca-barclay/main-image.png",
    "pets": []
  },
  {
    "id": 103,
    "slug": "river-styx",
    "name": "River Styxx",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 104,
    "slug": "rochelle-goyle",
    "name": "Rochelle Goyle",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 105,
    "slug": "romulus",
    "name": "Romulus",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 106,
    "slug": "rosabella-beauty",
    "name": "Rosabella Beauty",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 107,
    "slug": "scarah-screams",
    "name": "Scarah Screams",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 108,
    "slug": "sclera",
    "name": "Sclera",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 109,
    "slug": "silvi-timberwolf",
    "name": "Silvi Timberwolf",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 110,
    "slug": "skelita-calaveras",
    "name": "Skelita Calaveras",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 111,
    "slug": "spectra-vondergeist",
    "name": "Spectra Vondergeist",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 112,
    "slug": "spencer",
    "name": "Spencer",
    "gender": "manster",
    "imageUrl": "/demo/releases/2025/reel-drama-cleo-de-nile/main-image.png",
    "pets": []
  },
  {
    "id": 113,
    "slug": "stacy",
    "name": "Stacy",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 114,
    "slug": "stripes",
    "name": "Stripes",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 115,
    "slug": "the-headless-headmistress",
    "name": "The Headless Headmistress",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 116,
    "slug": "tobby",
    "name": "Tobby",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 117,
    "slug": "torelei-stripe",
    "name": "Torelei Stripe",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 118,
    "slug": "vanderwulf",
    "name": "Vanderwulf",
    "gender": "manster",
    "imageUrl": "/demo/releases/2025/scary-sweet-birthday-draculaura/main-image.png",
    "pets": []
  },
  {
    "id": 119,
    "slug": "venus-mcflytrap",
    "name": "Venus McFlytrap",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 120,
    "slug": "veronica-von-vamp",
    "name": "Veronica Von Vamp",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 121,
    "slug": "victoria",
    "name": "Victoria",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 122,
    "slug": "vince",
    "name": "Vince",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 123,
    "slug": "wisp-grant",
    "name": "Wisp Grant",
    "gender": "ghoul",
    "imageUrl": "/demo/releases/2025/self-scare-secrets-venus/main-image.png",
    "pets": []
  },
  {
    "id": 124,
    "slug": "wyatt",
    "name": "Wyatt",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 125,
    "slug": "xander",
    "name": "Xander",
    "gender": "manster",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 126,
    "slug": "yuki",
    "name": "Yuki",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  },
  {
    "id": 127,
    "slug": "zola",
    "name": "Zola",
    "gender": "ghoul",
    "imageUrl": null,
    "pets": []
  }
] as const;

export const mockPets = [
  {
    "id": 23,
    "slug": "azura",
    "name": "Azura",
    "imageUrl": "/demo/pets/azura/main-image.png"
  },
  {
    "id": 24,
    "slug": "candelita",
    "name": "Candelita",
    "imageUrl": "/demo/pets/candelita/main-image.png"
  },
  {
    "id": 25,
    "slug": "captain-penny",
    "name": "Captain Penny",
    "imageUrl": "/demo/pets/captain-penny/main-image.png"
  },
  {
    "id": 26,
    "slug": "chewlian",
    "name": "Chewlian",
    "imageUrl": "/demo/pets/chewlian/main-image.png"
  },
  {
    "id": 27,
    "slug": "count-fabulous",
    "name": "Count Fabulous",
    "imageUrl": "/demo/pets/count-fabulous/main-image.png"
  },
  {
    "id": 28,
    "slug": "crescent",
    "name": "Crescent",
    "imageUrl": "/demo/pets/crescent/main-image.png"
  },
  {
    "id": 29,
    "slug": "dustin",
    "name": "Dustin",
    "imageUrl": "/demo/pets/dustin/main-image.png"
  },
  {
    "id": 30,
    "slug": "hisette",
    "name": "Hisette",
    "imageUrl": "/demo/pets/hisette/main-image.png"
  },
  {
    "id": 31,
    "slug": "hooty",
    "name": "Hooty",
    "imageUrl": "/demo/pets/hooty/main-image.png"
  },
  {
    "id": 32,
    "slug": "neptuna",
    "name": "Neptuna",
    "imageUrl": "/demo/pets/neptuna/main-image.png"
  },
  {
    "id": 33,
    "slug": "perseus",
    "name": "Perseus",
    "imageUrl": "/demo/pets/perseus/main-image.png"
  },
  {
    "id": 34,
    "slug": "ravensley",
    "name": "Ravensley",
    "imageUrl": "/demo/pets/ravensley/main-image.png"
  },
  {
    "id": 35,
    "slug": "rhuen",
    "name": "Rhuen",
    "imageUrl": "/demo/pets/rhuen/main-image.png"
  },
  {
    "id": 36,
    "slug": "romulus",
    "name": "Romulus",
    "imageUrl": "/demo/pets/romulus/main-image.png"
  },
  {
    "id": 37,
    "slug": "sir-hoots-a-lot",
    "name": "Sir Hoots-a-Lot",
    "imageUrl": "/demo/pets/sir-hoots-a-lot/main-image.png"
  },
  {
    "id": 38,
    "slug": "siren",
    "name": "Siren",
    "imageUrl": "/demo/pets/siren/main-image.png"
  },
  {
    "id": 39,
    "slug": "squawk",
    "name": "Squawk",
    "imageUrl": "/demo/pets/squawk/main-image.png"
  },
  {
    "id": 40,
    "slug": "watzie",
    "name": "Watzie",
    "imageUrl": "/demo/pets/watzie/main-image.png"
  },
  {
    "id": 41,
    "slug": "wendy",
    "name": "Wendy",
    "imageUrl": "/demo/pets/wendy/main-image.png"
  },
  {
    "id": 42,
    "slug": "watzit",
    "name": "Watzit",
    "imageUrl": "/demo/pets/watzit/main-image.png"
  },
  {
    "id": 43,
    "slug": "zombie",
    "name": "Zombie",
    "imageUrl": "/demo/pets/zombie/main-image.png"
  },
  {
    "id": 44,
    "slug": "zucchini",
    "name": "Zucchini",
    "imageUrl": "/demo/pets/zucchini/main-image.png"
  }
] as const;

export const mockCharacterPetOwnership = [
  {
    "id": 1,
    "characterId": 71,
    "petId": 23
  },
  {
    "id": 2,
    "characterId": 91,
    "petId": 24
  },
  {
    "id": 3,
    "characterId": 82,
    "petId": 25
  },
  {
    "id": 4,
    "characterId": 98,
    "petId": 26
  },
  {
    "id": 5,
    "characterId": 31,
    "petId": 27
  },
  {
    "id": 6,
    "characterId": 117,
    "petId": 28
  },
  {
    "id": 7,
    "characterId": 46,
    "petId": 29
  },
  {
    "id": 8,
    "characterId": 35,
    "petId": 30
  },
  {
    "id": 9,
    "characterId": 56,
    "petId": 31
  },
  {
    "id": 10,
    "characterId": 86,
    "petId": 32
  },
  {
    "id": 11,
    "characterId": 42,
    "petId": 33
  },
  {
    "id": 12,
    "characterId": 111,
    "petId": 34
  },
  {
    "id": 13,
    "characterId": 101,
    "petId": 35
  },
  {
    "id": 14,
    "characterId": 105,
    "petId": 36
  },
  {
    "id": 15,
    "characterId": 19,
    "petId": 37
  },
  {
    "id": 16,
    "characterId": 79,
    "petId": 38
  },
  {
    "id": 17,
    "characterId": 68,
    "petId": 39
  },
  {
    "id": 18,
    "characterId": 50,
    "petId": 40
  },
  {
    "id": 19,
    "characterId": 28,
    "petId": 41
  },
  {
    "id": 20,
    "characterId": 77,
    "petId": 42
  },
  {
    "id": 21,
    "characterId": 49,
    "petId": 43
  },
  {
    "id": 22,
    "characterId": 70,
    "petId": 44
  }
] as const;

export const mockCharactersAndPetsMeta = {
  "source": "Monstrino DB export (characters, pets, character_pet_ownership)",
  "counts": {
    "characters": 127,
    "pets": 22,
    "ownership": 22
  }
} as const;

export const mockCharactersAndPets = {
  characters: mockCharacters,
  pets: mockPets,
  ownership: mockCharacterPetOwnership,
  meta: mockCharactersAndPetsMeta
} as const;

export const releaseMockData = {
  releaseCharacterRoles,
  releaseExclusives,
  releaseTypes,
  contentTypes,
  series,
  releases,
  links,
  assets,
  meta,
  mockCharactersAndPets
} as const;
export type ReleaseMockData = typeof releaseMockData;
