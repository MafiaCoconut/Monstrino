import * as React from "react";
import { Box, Typography } from "@mui/material";
import { AccentPanel } from "@/shared/ui/accent-panel";
import { BadgePill } from "@/shared/ui/badge-pill";
import { Section } from "@/shared/ui/section";
import { uiTokens } from "@/shared/ui/tokens";
import { ItemCard } from "./ItemCard";

export interface ItemsSectionProps {
  items?: string[];
}

type ItemCategory = "BOOK" | "GAME" | "DICE" | "FOOD" | "OTHER";

const prettyNameMap: Record<string, string> = {
  fearbook: "Fearbook (Yearbook)",
  "dnd-map": "Game Map",
  "dnd-shift": "Game Sheet",
  "dnd-dice-blue": "Dice (Blue)",
  "dnd-dice-purple": "Dice (Purple)",
  "boo-srisp": "Boo Crisp Cookies",
  scrisps: "Snack Pack",
};

const categoryOf = (key: string): ItemCategory => {
  const k = key.toLowerCase();
  if (k.includes("fearbook") || k.includes("book")) return "BOOK";
  if (k.includes("dice")) return "DICE";
  if (k.includes("cris") || k.includes("cookie") || k.includes("snack") || k.includes("boo")) return "FOOD";
  if (k.includes("map") || k.includes("shift") || k.includes("game") || k.includes("dnd")) return "GAME";
  return "OTHER";
};

const noteOf = (key: string): string => {
  const cat = categoryOf(key);
  if (cat === "BOOK") return "Archive insert / character-themed book";
  if (cat === "DICE") return "Game component; color variant";
  if (cat === "FOOD") return "Prop snack item for the set";
  if (cat === "GAME") return "Board game component / play prop";
  return "Included prop item";
};

const toneOf = (cat: ItemCategory) => (cat === "GAME" ? "purple" : cat === "BOOK" ? "pink" : "neutral");

const prettyName = (key: string) =>
  prettyNameMap[key] ?? key.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

export function ItemsSection({ items = [] }: ItemsSectionProps) {
  const itemsData = React.useMemo(
    () =>
      items.map((key) => ({
        key,
        name: prettyName(key),
        category: categoryOf(key),
        note: noteOf(key),
        src: `/demo/release/items/${key}.png`,
      })),
    [items]
  );

  const summary = React.useMemo(() => {
    if (!itemsData.length) return "No items";
    const countsByCategory = itemsData.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});

    return (
      `Included: ${itemsData.length} | ` +
      Object.entries(countsByCategory)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([category, count]) => `${category}: ${count}`)
        .join(" | ")
    );
  }, [itemsData]);

  return (
    <Section title="Items">
      <AccentPanel
        title="INCLUDED KIT"
        subtitle="Scrollable list of included props"
        accent="purple"
        rightSlot={<BadgePill text={`${itemsData.length} ITEMS`} tone="purple" size="sm" />}
      >
        {itemsData.length ? (
          <Box
            component="ul"
            aria-label="Included items"
            sx={{
              listStyle: "none",
              display: "flex",
              gap: 2.5,
              m: 0,
              p: 0,
              overflowX: "auto",
              pb: 1.25,
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { height: 10 },
              "&::-webkit-scrollbar-thumb": {
                background: uiTokens.scrollbarThumbSoft,
                borderRadius: 99,
              },
            }}
          >
            {itemsData.map((item) => (
              <Box component="li" key={item.key} sx={{ listStyle: "none" }}>
                <ItemCard
                  src={item.src}
                  name={item.name}
                  category={item.category}
                  note={item.note}
                  tone={toneOf(item.category)}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography sx={{ opacity: 0.7 }}>No items</Typography>
        )}
      </AccentPanel>
    </Section>
  );
}
