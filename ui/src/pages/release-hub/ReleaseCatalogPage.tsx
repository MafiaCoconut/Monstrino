import * as React from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Dialog,
  Divider,
  Drawer,
  Fade,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { alpha } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// =====================================================
// UI TOKENS (no magic colors)
// =====================================================
export const uiTokens = {
  bg: "#07060A",
  surface: "rgba(255,255,255,0.05)",
  surface2: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.10)",
  borderSoft: "rgba(255,255,255,0.06)",
  text: "rgba(255,255,255,0.92)",
  text2: "rgba(255,255,255,0.74)",
  text3: "rgba(255,255,255,0.56)",
  purple: "#B86BFF",
  purple2: "#7C4DFF",
  pink: "#FF4FD8",
  focus: "rgba(184,107,255,0.32)",
  glow: "rgba(184,107,255,0.14)",
} as const;

const SIDEBAR_W = 320; // должно совпадать с шириной вашей sidebar колонки

// =====================================================
// TYPES (strict typing)
// =====================================================
export type ReleaseEra = "G1" | "G2" | "G3";
export type ReleaseType = "Playline" | "Collector" | "SDCC" | "Skullector" | "Limited"; 
export type ReleaseContent = "doll" | "playset" | "funko" | "fashion-pack" | "other";
export type ReleaseTier = "common" | "exclusive" | "skullector" | "fangclub" | "other";
export type ReleasePack = "1-pack" | "2-pack" | "multipack" | "unknown";
export type ReleaseSort = "relevance" | "newest" | "oldest" | "a-z" | "z-a";
export type Density = "comfortable" | "compact";

export type ReleaseListItem = {
  id: string;
  title: string;
  series: string;
  year: number;
  era: ReleaseEra;
  type: ReleaseType; // старое поле можно оставить пока (не ломаем)
  imageUrl?: string;
  characters?: string[];

  // NEW
  content: ReleaseContent;
  tier2: ReleaseTier;
  pack: ReleasePack;

  // старые теги/бейджи можете оставить
  rarityTag?: string;
};
export type HeaderSectionKey =
  | "releases"
  | "characters"
  | "pets"
  | "series"
  | "accessories"
  | "clothes";

// =====================================================
// DEMO DATA (design-only; later move to entities/.../mock.ts)
// =====================================================
export const demoReleases: ReleaseListItem[] = [
  {
    id: "r-001",
    title: "Draculaura & Clawd",
    series: "Sweet 1600",
    year: 2012,
    era: "G1",
    type: "Playline",
    content: "doll",
    tier2: "exclusive",
    pack: "2-pack",
    imageUrl: "/demo/profile/dolls/Garden-Ghouls-Toralei-Stripe-1.jpg",
    characters: ["Draculaura", "Clawd"],
    rarityTag: "Exclusive",
  },
  {
    id: "r-002",
    title: "Frankie Stein x Barbie",
    series: "Skullector",
    year: 2023,
    era: "G3",
    type: "Skullector",
    content: "doll",
    tier2: "skullector",
    pack: "1-pack",
    imageUrl: "/demo/profile/dolls/Ghouls-Rule-Frankie-Stein.jpg",
    characters: ["Frankie Stein"],
    rarityTag: "Limited",
  },
  {
    id: "r-003",
    title: "IT Pennywise",
    series: "Skullector",
    year: 2021,
    era: "G1",
    type: "Skullector",
    content: "doll",
    tier2: "skullector",
    pack: "1-pack",
    imageUrl: "/demo/profile/dolls/IT-Pennywise-4.jpg",
    characters: ["Pennywise"],
    rarityTag: "Limited",
  },
  {
    id: "r-004",
    title: "Venus McFlytrap",
    series: "Core",
    year: 2024,
    era: "G3",
    type: "Playline",
    content: "doll",
    tier2: "common",
    pack: "1-pack",
    imageUrl: "/demo/profile/dolls/Venus-McFlytrap-8.webp",
    characters: ["Venus McFlytrap"],
  },
  {
    id: "r-005",
    title: "Witch Weaver",
    series: "Collector",
    year: 2024,
    era: "G3",
    type: "Collector",
    content: "doll",
    tier2: "fangclub",
    pack: "1-pack",
    imageUrl: "/demo/profile/dolls/Witch-Weaver-5.webp",
  },
  {
    id: "r-006",
    title: "SDCC Black & White Frankie",
    series: "SDCC",
    year: 2010,
    era: "G1",
    type: "SDCC",
    content: "doll",
    tier2: "exclusive",
    pack: "1-pack",
    imageUrl: "/demo/profile/dolls/Zomby-Gaga-1.jpg",
    rarityTag: "Convention",
  },
];


// =====================================================
// SMALL HELPERS
// =====================================================
function clampInt(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function formatMetaLine(item: ReleaseListItem): string {
  return `${item.year} · ${item.era} · ${item.type}`;
}

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}

// =====================================================
// PAGE
// =====================================================
export function ReleaseCatalogPage(): React.ReactElement {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [section, setSection] = React.useState<HeaderSectionKey>("releases");

  const [sort, setSort] = React.useState<ReleaseSort>("relevance");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [filtersOpenMobile, setFiltersOpenMobile] = React.useState(false);

  // Primary
  const [era, setEra] = React.useState<ReleaseEra | "all">("all");

  // NEW: multi-select чекбоксы
  const [content, setContent] = React.useState<ReleaseContent[]>([]);
  const [tier2, setTier2] = React.useState<ReleaseTier[]>([]);
  const [pack, setPack] = React.useState<ReleasePack[]>([]);
  const [legacyType, setLegacyType] = React.useState<ReleaseType[]>([]);

  // Other filters
  const [yearMin, setYearMin] = React.useState<number | null>(null);
  const [yearMax, setYearMax] = React.useState<number | null>(null);
  const [series, setSeries] = React.useState<string[]>([]);
  const [characters, setCharacters] = React.useState<string[]>([]);

  const [page, setPage] = React.useState(1);
  const pageSize = 18;

  const allSeries = React.useMemo(
    () => Array.from(new Set(demoReleases.map((r) => r.series))).sort((a, b) => a.localeCompare(b)),
    []
  );

  const allCharacters = React.useMemo(() => {
    const set = new Set<string>();
    for (const r of demoReleases) for (const c of r.characters ?? []) set.add(c);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const activeFilterChips = React.useMemo(() => {
    const chips: Array<{ key: string; label: string; onDelete: () => void }> = [];

    if (era !== "all") chips.push({ key: "era", label: `Era: ${era}`, onDelete: () => setEra("all") });

    if (content.length > 0)
      chips.push({ key: "content", label: `Format: ${content.length}`, onDelete: () => setContent([]) });

    if (tier2.length > 0)
      chips.push({ key: "tier2", label: `Tier: ${tier2.length}`, onDelete: () => setTier2([]) });

    if (pack.length > 0)
      chips.push({ key: "pack", label: `Pack: ${pack.length}`, onDelete: () => setPack([]) });

    if (legacyType.length > 0)
      chips.push({ key: "legacyType", label: `Legacy: ${legacyType.length}`, onDelete: () => setLegacyType([]) });

    if (yearMin != null || yearMax != null) {
      const a = yearMin != null ? yearMin : "…";
      const b = yearMax != null ? yearMax : "…";
      chips.push({
        key: "year",
        label: `Year: ${a}–${b}`,
        onDelete: () => {
          setYearMin(null);
          setYearMax(null);
        },
      });
    }

    if (series.length > 0) chips.push({ key: "series", label: `Series: ${series.length}`, onDelete: () => setSeries([]) });
    if (characters.length > 0)
      chips.push({ key: "characters", label: `Characters: ${characters.length}`, onDelete: () => setCharacters([]) });

    return chips;
  }, [era, content, tier2, pack, legacyType, yearMin, yearMax, series, characters]);

  const filtered = React.useMemo(() => {
    const q = normalizeQuery(query);
    let items = demoReleases.slice();

    if (q.length > 0) {
      items = items.filter((r) => {
        const hay = [
          r.title,
          r.series,
          r.era,
          r.type,
          r.content,
          r.tier2,
          r.pack,
          String(r.year),
          ...(r.characters ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    if (era !== "all") items = items.filter((r) => r.era === era);

    // NEW: multi-select includes
    if (content.length > 0) items = items.filter((r) => content.includes(r.content));
    if (tier2.length > 0) items = items.filter((r) => tier2.includes(r.tier2));
    if (pack.length > 0) items = items.filter((r) => pack.includes(r.pack));

    // Legacy type (если оставляете)
    if (legacyType.length > 0) items = items.filter((r) => legacyType.includes(r.type));

    if (yearMin != null) items = items.filter((r) => r.year >= yearMin);
    if (yearMax != null) items = items.filter((r) => r.year <= yearMax);
    if (series.length > 0) items = items.filter((r) => series.includes(r.series));
    if (characters.length > 0) items = items.filter((r) => (r.characters ?? []).some((c) => characters.includes(c)));

    items = sortItems(items, sort);
    return items;
  }, [query, era, content, tier2, pack, legacyType, yearMin, yearMax, series, characters, sort]);

  const totalPages = React.useMemo(() => Math.max(1, Math.ceil(filtered.length / pageSize)), [filtered.length]);
  React.useEffect(() => setPage((p) => clampInt(p, 1, totalPages)), [totalPages]);

  const pageItems = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const handleClearAll = React.useCallback(() => {
    setEra("all");
    setContent([]);
    setTier2([]);
    setPack([]);
    setLegacyType([]);
    setYearMin(null);
    setYearMax(null);
    setSeries([]);
    setCharacters([]);
  }, []);

  return (
    // <Box sx={{ minHeight: "100vh", background: uiTokens.bg, color: uiTokens.text }}>
      <PageBackdrop>
        <CatalogHeader
          section={section}
          onSectionChange={setSection}
          sort={sort}
          query={query}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenFiltersMobile={() => setFiltersOpenMobile(true)}
          onSortChange={setSort}
        />

        <CatalogLayout
          sidebar={
            <FilterSidebar
              dense={false}
              era={era}
              content={content}
              tier2={tier2}
              pack={pack}
              legacyType={legacyType}
              yearMin={yearMin}
              yearMax={yearMax}
              series={series}
              characters={characters}
              allSeries={allSeries}
              allCharacters={allCharacters}
              activeChips={activeFilterChips}
              onEraChange={setEra}
              onContentChange={setContent}
              onTier2Change={setTier2}
              onPackChange={setPack}
              onLegacyTypeChange={setLegacyType}
              onYearMinChange={setYearMin}
              onYearMaxChange={setYearMax}
              onSeriesChange={setSeries}
              onCharactersChange={setCharacters}
              onClearAll={handleClearAll}
            />
          }
          sidebarMobile={
            <Drawer
              open={filtersOpenMobile}
              onClose={() => setFiltersOpenMobile(false)}
              anchor="left"
              PaperProps={{
                sx: {
                  width: 360,
                  maxWidth: "92vw",
                  background: uiTokens.bg,
                  borderRight: `1px solid ${uiTokens.borderSoft}`,
                },
              }}
            >
              <Box sx={{ p: 2, pt: 1.5 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 700, letterSpacing: 0.4 }}>Filters</Typography>
                  <IconButton
                    onClick={() => setFiltersOpenMobile(false)}
                    aria-label="Close filters"
                    size="small"
                    sx={{ color: uiTokens.text2 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
              <Divider sx={{ borderColor: uiTokens.borderSoft }} />
              <Box sx={{ p: 2, pt: 1.5 }}>
                <FilterSidebar
                  dense={false}
                  era={era}
                  content={content}
                  tier2={tier2}
                  pack={pack}
                  legacyType={legacyType}
                  yearMin={yearMin}
                  yearMax={yearMax}
                  series={series}
                  characters={characters}
                  allSeries={allSeries}
                  allCharacters={allCharacters}
                  activeChips={activeFilterChips}
                  onEraChange={setEra}
                  onContentChange={setContent}
                  onTier2Change={setTier2}
                  onPackChange={setPack}
                  onLegacyTypeChange={setLegacyType}
                  onYearMinChange={setYearMin}
                  onYearMaxChange={setYearMax}
                  onSeriesChange={setSeries}
                  onCharactersChange={setCharacters}
                  onClearAll={handleClearAll}
                />
              </Box>
            </Drawer>
          }
          main={
            <Box sx={{ pb: 6 }}>
              <Container maxWidth="xl" sx={{ pt: 3 }}>
                <Stack spacing={2.25}>
                  <ActiveFiltersBar chips={activeFilterChips} total={filtered.length} onClearAll={handleClearAll} />
                  <ReleaseGrid items={pageItems} />
                  <CatalogPagination page={page} totalPages={totalPages} onChange={setPage} />
                </Stack>
              </Container>
            </Box>
          }
          isMdUp={isMdUp}
        />

        <SearchOverlay
          open={searchOpen}
          query={query}
          onQueryChange={setQuery}
          onClose={() => setSearchOpen(false)}
          suggestions={buildSearchSuggestions(demoReleases)}
        />
        </PageBackdrop>
    // </Box>
  );
}

export function PageBackdrop(props: {
  children: React.ReactNode;
  debug?: boolean;
}): React.ReactElement {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: uiTokens.bg,
        color: uiTokens.text,
        overflow: "clip",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",

        // LAYER 1: glow + vignette (stronger)
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(1100px 640px at 58% 16%, ${alpha(uiTokens.purple, 0.18)} 0%, transparent 62%),
            radial-gradient(880px 520px at 22% 24%, ${alpha(uiTokens.pink, 0.10)} 0%, transparent 58%),
            radial-gradient(1200px 760px at 50% 70%, ${alpha("#000", 0.00)} 0%, ${alpha("#000", 0.52)} 68%, ${alpha("#000", 0.74)} 100%),
            linear-gradient(180deg, ${alpha(uiTokens.surface, 0.10)} 0%, transparent 42%)
          `,
          opacity: 1,
          // debug border to confirm layer is visible
          outline: props.debug ? `2px solid ${alpha(uiTokens.pink, 0.55)}` : "none",
          outlineOffset: props.debug ? -2 : 0,
        },

        // LAYER 2: subtle grid (more visible)
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 84px,
              ${alpha(uiTokens.text, 0.055)} 85px
            ),
            repeating-linear-gradient(
              180deg,
              transparent 0px,
              transparent 84px,
              ${alpha(uiTokens.text, 0.045)} 85px
            )
          `,
          mixBlendMode: "soft-light",
          opacity: 0.55,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>{props.children}</Box>
    </Box>
  );
}




// =====================================================
// HEADER
// =====================================================

export function BrandMasthead(): React.ReactElement {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        component="a"
        href="/"
        aria-label="Go to homepage"
        sx={{
          textDecoration: "none",
          cursor: "pointer",
          display: "inline-block",

          "&:focus-visible": {
            outline: `2px solid ${alpha(uiTokens.purple, 0.45)}`,
            outlineOffset: 4,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 10,
            fontSize: 18,
            lineHeight: 1,
            whiteSpace: "nowrap",

            color: alpha(uiTokens.text, 0.92),

            // premium ink / engraving effect
            textShadow: [
              `0 1px 0 ${alpha("#000", 0.60)}`,
              `0 0 18px ${alpha(uiTokens.purple, 0.12)}`,
            ].join(", "),
            WebkitTextStroke: `0.5px ${alpha(uiTokens.text, 0.22)}`,

            transition: "color 160ms ease, text-shadow 160ms ease, transform 160ms ease",

            "&:hover": {
              color: uiTokens.text,
              textShadow: [
                `0 1px 0 ${alpha("#000", 0.70)}`,
                `0 0 22px ${alpha(uiTokens.purple, 0.22)}`,
              ].join(", "),
              transform: "translateY(-1px)",
            },

            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          MONSTRINO
        </Typography>
      </Box>
    </Box>
  );
}



export function CatalogHeader(props: {
  sort: ReleaseSort;
  query: string;

  section: HeaderSectionKey;
  onSectionChange: (v: HeaderSectionKey) => void;

  onOpenSearch: () => void;
  onOpenFiltersMobile: () => void;
  onSortChange: (v: ReleaseSort) => void;
}): React.ReactElement {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: `linear-gradient(180deg, ${alpha(uiTokens.bg, 0.86)} 0%, ${alpha(
          uiTokens.bg,
          0.70
        )} 100%)`,
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${alpha(uiTokens.borderSoft, 0.9)}`,
      }}
    >
      <Box
        sx={{
          maxWidth: 1480,
          mx: "auto",
          px: { xs: 1.5, md: 3 },
          height: 64,
          display: "grid",
          alignItems: "center",

          // ✅ key: center column gets real space, right column is fixed-ish
          gridTemplateColumns: { xs: "1fr auto", md: `${SIDEBAR_W}px 1fr auto` },
          columnGap: 2,
          minWidth: 0,
        }}
      >
        {/* Brand */}
       <Box
            sx={{
                width: SIDEBAR_W,
                height: 64,
                minWidth: 0,

                // ✅ “clean plate”: no blur artifacts
                background: uiTokens.bg,
                // важно: backdrop-filter не наследуется как надо, но визуально артефакт
                // часто появляется из-за слоя с blur над всем хедером — этот solid plate его убирает.
                // borderBottom: `1px solid ${alpha(uiTokens.borderSoft, 0.9)}`,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
                <BrandMasthead />
        </Box>


        {/* Center nav */}
        {isMdUp && (
          <Box sx={{ minWidth: 0, display: "flex", justifyContent: "center" }}>
            <HeaderNavTabs
              value={props.section}
              onChange={props.onSectionChange}
              mode={isLgUp ? "full" : "compact"} // ✅ no scrollbars
            />
          </Box>
        )}

        {/* Right tools (NO heavy shadows => no “white smear”) */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 0.75,
              borderRadius: 99,
              border: `1px solid ${uiTokens.borderSoft}`,
              background: alpha(uiTokens.surface, 0.06),
              // ✅ remove big boxShadow that caused artifact
              boxShadow: "none",
            }}
          >
            {!isMdUp && (
              <>
                <IconButton
                  onClick={props.onOpenFiltersMobile}
                  aria-label="Open filters"
                  size="small"
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 99,
                    border: `1px solid ${uiTokens.borderSoft}`,
                    color: uiTokens.text2,
                    background: alpha(uiTokens.surface, 0.08),
                    "&:hover": { background: alpha(uiTokens.surface, 0.14), borderColor: uiTokens.border },
                  }}
                >
                  <TuneIcon fontSize="small" />
                </IconButton>

                <Box
                  aria-hidden="true"
                  sx={{
                    width: 1,
                    height: 26,
                    background: `linear-gradient(180deg, transparent, ${alpha(
                      uiTokens.borderSoft,
                      0.9
                    )}, transparent)`,
                  }}
                />
              </>
            )}

            <SearchPill query={props.query} onClick={props.onOpenSearch} />

            <Box
              aria-hidden="true"
              sx={{
                width: 1,
                height: 26,
                background: `linear-gradient(180deg, transparent, ${alpha(
                  uiTokens.borderSoft,
                  0.9
                )}, transparent)`,
              }}
            />

            <SortPill value={props.sort} onChange={props.onSortChange} />
          </Box>
        </Box>
      </Box>

      {/* Mobile nav row stays scrollable? — NO. We keep it compact instead. */}
      {!isMdUp && (
        <Box
          sx={{
            maxWidth: 1480,
            mx: "auto",
            px: { xs: 1.5, md: 3 },
            pb: 1,
          }}
        >
          <HeaderNavTabs value={props.section} onChange={props.onSectionChange} mode="compact" />
        </Box>
      )}
    </Box>
  );
}



export function HeaderNavTabs(props: {
  value: HeaderSectionKey;
  onChange: (v: HeaderSectionKey) => void;
  mode: "full" | "compact";
}): React.ReactElement {
  const all: Array<{ key: HeaderSectionKey; label: string }> = [
    { key: "releases", label: "Releases" },
    { key: "characters", label: "Characters" },
    { key: "pets", label: "Pets" },
    { key: "series", label: "Series" },
    { key: "accessories", label: "Accessories" },
    { key: "clothes", label: "Clothes" },
  ];

  const primary = props.mode === "full"
    ? all
    : all.slice(0, 4); // Releases, Characters, Pets, Series

  const overflow = props.mode === "full"
    ? []
    : all.slice(4);

  const [moreAnchor, setMoreAnchor] = React.useState<null | HTMLElement>(null);

  const index = Math.max(0, primary.findIndex((i) => i.key === props.value));
  const isOverflowActive = overflow.some((i) => i.key === props.value);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
      <Tabs
        value={index}
        onChange={(_, v) => props.onChange(primary[v]?.key ?? "releases")}
        variant="standard"
        aria-label="Primary navigation"
        sx={{
          minHeight: 40,
          "& .MuiTabs-flexContainer": { gap: 1.75 },
          "& .MuiTab-root": {
            minHeight: 40,
            px: 0,
            minWidth: "auto",
            textTransform: "uppercase",
            fontWeight: 900,
            letterSpacing: 1.35,
            fontSize: 11.2,
            color: uiTokens.text3,
            opacity: 1,
          },
          "& .MuiTab-root.Mui-selected": { color: uiTokens.text },
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: 99,
            background: `linear-gradient(90deg, ${uiTokens.purple}, ${uiTokens.pink})`,
            boxShadow: `0 0 0 5px ${alpha(uiTokens.purple, 0.10)}`,
          },
        }}
      >
        {primary.map((t) => (
          <Tab key={t.key} label={t.label} disableRipple />
        ))}
      </Tabs>

      {overflow.length > 0 && (
        <>
          <Button
            onClick={(e) => setMoreAnchor(e.currentTarget)}
            endIcon={<KeyboardArrowDownIcon fontSize="small" />}
            aria-label="More sections"
            variant="text"
            sx={{
              height: 36,
              borderRadius: 99,
              textTransform: "uppercase",
              fontWeight: 900,
              letterSpacing: 1.35,
              fontSize: 11.2,
              color: isOverflowActive ? uiTokens.text : uiTokens.text3,
              px: 1,
              "&:hover": { background: alpha(uiTokens.surface, 0.14) },
            }}
          >
            More
          </Button>

          <Menu
            anchorEl={moreAnchor}
            open={Boolean(moreAnchor)}
            onClose={() => setMoreAnchor(null)}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 0,
                minWidth: 200,
                background: alpha(uiTokens.bg, 0.94),
                backdropFilter: "blur(14px)",
                border: `1px solid ${uiTokens.borderSoft}`,
              },
            }}
          >
            {overflow.map((o) => (
              <MenuItem
                key={o.key}
                selected={props.value === o.key}
                onClick={() => {
                  props.onChange(o.key);
                  setMoreAnchor(null);
                }}
                sx={{
                  fontSize: 12.5,
                  color: uiTokens.text,
                  "&.Mui-selected": { background: alpha(uiTokens.purple, 0.16) },
                  "&:hover": { background: alpha(uiTokens.surface, 0.18) },
                }}
              >
                {o.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
}


export function SearchPill(props: {
  query: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <Button
      onClick={props.onClick}
      startIcon={<SearchIcon fontSize="small" />}
      aria-label="Open search"
      variant="outlined"
      sx={{
        borderRadius: 99,
        borderColor: uiTokens.borderSoft,
        color: uiTokens.text2,
        background: alpha(uiTokens.surface, 0.08),
        textTransform: "none",
        px: 1.1,
        height: 36,
        // ✅ key: no “huge” minWidth on mid screens
        minWidth: { xs: 180, sm: 200, lg: 240 },
        justifyContent: "flex-start",
        "&:hover": {
          borderColor: uiTokens.border,
          background: alpha(uiTokens.surface, 0.14),
        },
        "& .MuiButton-startIcon": { color: uiTokens.text3 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
        <Typography
          sx={{
            fontSize: 12.5,
            color: props.query ? uiTokens.text : uiTokens.text3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
            textAlign: "left",
          }}
        >
          {props.query ? props.query : "Search"}
        </Typography>

        <Box
          sx={{
            px: 0.8,
            py: 0.2,
            borderRadius: 0.8,
            border: `1px solid ${uiTokens.borderSoft}`,
            color: uiTokens.text3,
            fontSize: 11,
            lineHeight: 1.2,
            flex: "0 0 auto",
          }}
          aria-hidden="true"
        >
          K
        </Box>
      </Box>
    </Button>
  );
}


export function SortPill(props: {
  value: ReleaseSort;
  onChange: (v: ReleaseSort) => void;
}): React.ReactElement {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const label = React.useMemo(() => {
    switch (props.value) {
      case "relevance":
        return "Relevance";
      case "newest":
        return "Newest";
      case "oldest":
        return "Oldest";
      default:
        return "Relevance";
    }
  }, [props.value]);

  return (
    <>
      <Button
        onClick={(e) => setAnchor(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        aria-label="Change sort"
        variant="outlined"
        sx={{
          borderRadius: 99,
          borderColor: uiTokens.borderSoft,
          color: uiTokens.text2,
          background: alpha(uiTokens.surface, 0.08),
          textTransform: "none",
          px: 1.1,
          height: 36,
          minWidth: 140, // ✅ stable width
          "&:hover": {
            borderColor: uiTokens.border,
            background: alpha(uiTokens.surface, 0.14),
          },
          "& .MuiButton-endIcon": { ml: 0.6 },
        }}
      >
        <Typography sx={{ fontSize: 12.5, lineHeight: 1, whiteSpace: "nowrap" }}>{label}</Typography>
      </Button>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 0,
            minWidth: 180,
            background: alpha(uiTokens.bg, 0.94),
            backdropFilter: "blur(14px)",
            border: `1px solid ${uiTokens.borderSoft}`,
          },
        }}
      >
        {[
          { value: "relevance" as const, label: "Relevance" },
          { value: "newest" as const, label: "Newest" },
          { value: "oldest" as const, label: "Oldest" },
        ].map((o) => (
          <MenuItem
            key={o.value}
            selected={props.value === o.value}
            onClick={() => {
              props.onChange(o.value);
              setAnchor(null);
            }}
            sx={{
              fontSize: 12.5,
              color: uiTokens.text,
              "&.Mui-selected": { background: alpha(uiTokens.purple, 0.16) },
              "&:hover": { background: alpha(uiTokens.surface, 0.18) },
            }}
          >
            {o.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}


export function SectionNav(): React.ReactElement {
  const items: Array<{ label: string; active?: boolean }> = [
    { label: "Releases", active: true },
    { label: "Characters" },
    { label: "Pets" },
    { label: "Series" },
    { label: "Accessories" },
    { label: "Clothes" },
  ];

  return (
    <Stack direction="row" alignItems="center" spacing={2.25} sx={{ px: 2 }}>
      {items.map((it) => (
        <Box key={it.label} sx={{ position: "relative", py: 1 }}>
          <Typography
            sx={{
              fontSize: 13,
              letterSpacing: 1.6,
              textTransform: "uppercase",
              color: it.active ? uiTokens.text : uiTokens.text3,
              fontWeight: it.active ? 800 : 600,
              cursor: "default",
            }}
          >
            {it.label}
          </Typography>

          {it.active && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -10,
                height: 2,
                borderRadius: 999,
                background: `linear-gradient(90deg, ${uiTokens.purple}, ${uiTokens.pink})`,
                boxShadow: `0 0 0 6px ${alpha(uiTokens.glow, 0.25)}`,
              }}
              aria-hidden="true"
            />
          )}
        </Box>
      ))}
    </Stack>
  );
}

// =====================================================
// LAYOUT
// =====================================================
export function CatalogLayout(props: {
  sidebar: React.ReactNode;
  sidebarMobile: React.ReactNode;
  main: React.ReactNode;
  isMdUp: boolean;
}): React.ReactElement {
  return (
    <Box 
    // sx={{ background: uiTokens.bg }}
    >
      {/* Page frame: centers BOTH sidebar + main and adds global gutters */}
      <Box
        sx={{
          maxWidth: 1480,
          mx: "auto",
          px: { xs: 0, md: 3 }, // общий отступ от краёв экрана
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
            columnGap: { xs: 0, md: 3 },
            alignItems: "start",
          }}
        >
          {/* Desktop sidebar */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "sticky",
              top: 64,
              height: "calc(100vh - 64px)",
              overflow: "auto",
              borderRight: `1px solid ${uiTokens.borderSoft}`,
              // background: uiTokens.bg,
            }}
          >
            <Box sx={{ p: 2.25 }}>
              {props.sidebar}
            </Box>
          </Box>

          {/* Main */}
          <Box sx={{ minWidth: 0 }}>{props.main}</Box>

          {/* Mobile sidebar */}
          {props.sidebarMobile}
        </Box>
      </Box>
    </Box>
  );
}




// =====================================================
// SEARCH
// =====================================================
export function SearchButton(props: {
  query: string;
  onClick: () => void;
}): React.ReactElement {
  const hasQuery = props.query.trim().length > 0;

  return (
    <Button
      onClick={props.onClick}
      startIcon={<SearchIcon />}
      aria-label="Open search"
      variant="outlined"
      sx={{
        borderColor: uiTokens.borderSoft,
        color: uiTokens.text2,
        borderRadius: 2,
        textTransform: "none",
        px: 1.25,
        minWidth: 0,
        "&:hover": { borderColor: uiTokens.border, background: alpha(uiTokens.surface, 0.25) },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: { xs: 0, md: 180 } }}>
        <Typography sx={{ fontSize: 13, color: uiTokens.text2, whiteSpace: "nowrap" }}>
          Search
        </Typography>

        <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }} />

        <Chip
          label={hasQuery ? "Active" : "K"}
          size="small"
          sx={{
            ml: 0.5,
            height: 22,
            fontSize: 12,
            borderRadius: 999,
            background: hasQuery ? alpha(uiTokens.purple, 0.20) : alpha("#ffffff", 0.07),
            color: hasQuery ? uiTokens.text : uiTokens.text3,
            border: `1px solid ${hasQuery ? alpha(uiTokens.purple, 0.35) : uiTokens.borderSoft}`,
          }}
        />
      </Stack>
    </Button>
  );
}

export function SearchOverlay(props: {
  open: boolean;
  query: string;
  suggestions: string[];
  onQueryChange: (q: string) => void;
  onClose: () => void;
}): React.ReactElement {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!props.open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [props.open]);

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          background: alpha(uiTokens.bg, 0.92),
          backdropFilter: "blur(12px)",
          border: `1px solid ${uiTokens.borderSoft}`,
          borderRadius: 0,
          overflow: "hidden",
        },
      }}
      aria-label="Search dialog"
    >
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${uiTokens.borderSoft}`,
          background: alpha(uiTokens.surface, 0.28),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack spacing={0.25}>
            <Typography sx={{ fontWeight: 800, letterSpacing: 0.4 }}>Search the archive</Typography>
            <Typography sx={{ fontSize: 12.5, color: uiTokens.text3 }}>
              Titles, series, years, characters, tags
            </Typography>
          </Stack>

          <IconButton onClick={props.onClose} aria-label="Close search" sx={{ color: uiTokens.text2 }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        <Autocomplete
          freeSolo
          options={props.suggestions}
          value={props.query}
          inputValue={props.query}
          onInputChange={(_, v) => props.onQueryChange(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={inputRef}
              placeholder="Type to search…"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  background: alpha(uiTokens.surface, 0.24),
                  color: uiTokens.text,
                  "& fieldset": { borderColor: uiTokens.borderSoft },
                  "&:hover fieldset": { borderColor: uiTokens.border },
                  "&.Mui-focused fieldset": { borderColor: alpha(uiTokens.purple, 0.5) },
                },
                "& .MuiSvgIcon-root": { color: uiTokens.text3 },
              }}
            />
          )}
        />

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
          <Chip
            icon={<AutoAwesomeIcon />}
            label='Tip: try "Draculaura", "2010", "SDCC", "Skullector"'
            size="small"
            sx={{
              borderRadius: 999,
              background: alpha(uiTokens.purple, 0.10),
              border: `1px solid ${alpha(uiTokens.purple, 0.18)}`,
              color: uiTokens.text2,
              "& .MuiChip-icon": { color: uiTokens.purple },
            }}
          />
        </Stack>
      </Box>
    </Dialog>
  );
}


function buildSearchSuggestions(items: ReleaseListItem[]): string[] {
  const set = new Set<string>();
  for (const r of items) {
    set.add(r.title);
    set.add(r.series);
    set.add(String(r.year));
    set.add(r.type);
    set.add(r.era);
    for (const c of r.characters ?? []) set.add(c);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

// =====================================================
// SORT / DENSITY
// =====================================================
export function DensityToggle(props: {
  density: Density;
  onChange: (d: Density) => void;
}): React.ReactElement {
  return (
    <ToggleButtonGroup
      exclusive
      value={props.density}
      onChange={(_, v: Density | null) => v && props.onChange(v)}
      aria-label="Density"
      size="small"
      sx={{
        borderRadius: 2,
        background: alpha(uiTokens.surface, 0.2),
        border: `1px solid ${uiTokens.borderSoft}`,
        "& .MuiToggleButton-root": {
          border: "none",
          color: uiTokens.text3,
          px: 1,
          py: 0.75,
          borderRadius: 2,
          "&.Mui-selected": {
            color: uiTokens.text,
            background: alpha(uiTokens.purple, 0.18),
          },
          "&:hover": { background: alpha(uiTokens.surface, 0.35) },
        },
      }}
    >
      <ToggleButton value="comfortable" aria-label="Comfortable density">
        <ViewComfyIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="compact" aria-label="Compact density">
        <ViewCompactIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export function SortMenu(props: {
  sort: ReleaseSort;
  onChange: (s: ReleaseSort) => void;
}): React.ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const label = React.useMemo(() => {
    switch (props.sort) {
      case "relevance":
        return "Relevance";
      case "newest":
        return "Newest";
      case "oldest":
        return "Oldest";
      case "a-z":
        return "A–Z";
      case "z-a":
        return "Z–A";
      default:
        return "Sort";
    }
  }, [props.sort]);

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={<SortIcon />}
        aria-label="Sort menu"
        variant="outlined"
        sx={{
          borderColor: uiTokens.borderSoft,
          color: uiTokens.text2,
          borderRadius: 2,
          textTransform: "none",
          px: 1.25,
          minWidth: 0,
          "&:hover": { borderColor: uiTokens.border, background: alpha(uiTokens.surface, 0.25) },
        }}
      >
        <Typography sx={{ fontSize: 13, color: uiTokens.text2 }}>{label}</Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 1,
            background: alpha(uiTokens.bg, 0.96),
            border: `1px solid ${uiTokens.borderSoft}`,
            borderRadius: 2,
            minWidth: 220,
            overflow: "hidden",
          },
        }}
      >
        <SortMenuItem label="Relevance" value="relevance" current={props.sort} onPick={props.onChange} onClose={() => setAnchorEl(null)} />
        <SortMenuItem label="Newest first" value="newest" current={props.sort} onPick={props.onChange} onClose={() => setAnchorEl(null)} />
        <SortMenuItem label="Oldest first" value="oldest" current={props.sort} onPick={props.onChange} onClose={() => setAnchorEl(null)} />
        <Divider sx={{ borderColor: uiTokens.borderSoft }} />
        <SortMenuItem label="Title A–Z" value="a-z" current={props.sort} onPick={props.onChange} onClose={() => setAnchorEl(null)} />
        <SortMenuItem label="Title Z–A" value="z-a" current={props.sort} onPick={props.onChange} onClose={() => setAnchorEl(null)} />
      </Menu>
    </>
  );
}

export function SortMenuItem(props: {
  label: string;
  value: ReleaseSort;
  current: ReleaseSort;
  onPick: (s: ReleaseSort) => void;
  onClose: () => void;
}): React.ReactElement {
  const selected = props.value === props.current;

  return (
    <MenuItem
      onClick={() => {
        props.onPick(props.value);
        props.onClose();
      }}
      selected={selected}
      sx={{
        py: 1.1,
        "&.Mui-selected": { background: alpha(uiTokens.purple, 0.12) },
        "&:hover": { background: alpha(uiTokens.surface, 0.35) },
      }}
    >
      <ListItemIcon sx={{ minWidth: 30 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: selected ? uiTokens.purple : alpha("#fff", 0.16),
            boxShadow: selected ? `0 0 0 5px ${alpha(uiTokens.glow, 0.25)}` : "none",
          }}
        />
      </ListItemIcon>
      <ListItemText
        primary={props.label}
        primaryTypographyProps={{ sx: { fontSize: 13.5, color: uiTokens.text2 } }}
      />
    </MenuItem>
  );
}

function sortItems(items: ReleaseListItem[], sort: ReleaseSort): ReleaseListItem[] {
  const out = items.slice();
  switch (sort) {
    case "newest":
      out.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
      return out;
    case "oldest":
      out.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
      return out;
    case "a-z":
      out.sort((a, b) => a.title.localeCompare(b.title));
      return out;
    case "z-a":
      out.sort((a, b) => b.title.localeCompare(a.title));
      return out;
    case "relevance":
    default:
      return out;
  }
}

// =====================================================
// FILTERS
// =====================================================
export function IndexRow(props: {
  label: string;
  value: string;
  hint?: string;
  actionLabel: string;
  onAction: () => void;
  onClear?: () => void;
}): React.ReactElement {
  return (
    <Box
      sx={{
        border: `1px solid ${uiTokens.borderSoft}`,
        borderRadius: 0,
        overflow: "hidden",
        background: alpha(uiTokens.surface, 0.06),
      }}
    >
      <Box sx={{ px: 1.25, py: 1.1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
          <Stack spacing={0.15} sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 12, color: uiTokens.text3, letterSpacing: 0.25 }}>
              {props.label}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="baseline" sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 900, fontSize: 13.5, letterSpacing: 0.2 }}>
                {props.value}
              </Typography>

              {props.hint && (
                <Typography
                  sx={{
                    fontSize: 12,
                    color: uiTokens.text3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: 0,
                  }}
                  title={props.hint}
                >
                  {props.hint}
                </Typography>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            {props.onClear && (
              <Button
                onClick={props.onClear}
                size="small"
                variant="text"
                aria-label="Clear selection"
                sx={{
                  borderRadius: 0,
                  color: uiTokens.text3,
                  textTransform: "none",
                  px: 1,
                  "&:hover": { background: alpha(uiTokens.surface, 0.18) },
                }}
              >
                Clear
              </Button>
            )}

            <Button
              onClick={props.onAction}
              size="small"
              variant="outlined"
              aria-label={props.actionLabel}
              sx={{
                borderRadius: 0,
                borderColor: uiTokens.borderSoft,
                color: uiTokens.text2,
                textTransform: "none",
                px: 1.1,
                "&:hover": { borderColor: uiTokens.border, background: alpha(uiTokens.surface, 0.18) },
              }}
            >
              {props.actionLabel}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export function IndexPickerDialog(props: {
  open: boolean;
  title: string;
  value: string[];
  options: string[];
  onChange: (v: string[]) => void;
  onClose: () => void;
  ariaLabel: string;
}): React.ReactElement {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          background: alpha(uiTokens.bg, 0.92),
          backdropFilter: "blur(12px)",
          border: `1px solid ${uiTokens.borderSoft}`,
          borderRadius: 0,
          overflow: "hidden",
        },
      }}
      aria-label={`${props.ariaLabel} dialog`}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${uiTokens.borderSoft}`,
          background: alpha(uiTokens.surface, 0.22),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack spacing={0.25}>
            <Typography sx={{ fontWeight: 900, letterSpacing: 0.3 }}>{props.title}</Typography>
            <Typography sx={{ fontSize: 12.5, color: uiTokens.text3 }}>
              Select multiple. Changes apply instantly.
            </Typography>
          </Stack>

          <IconButton onClick={props.onClose} aria-label="Close" sx={{ color: uiTokens.text2 }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        <FilterChips
          value={props.value}
          options={props.options}
          onChange={props.onChange}
          dense={false}
          placeholder={`Add ${props.title.toLowerCase()}…`}
          ariaLabel={props.ariaLabel}
        />
      </Box>

      <Divider sx={{ borderColor: uiTokens.borderSoft }} />

      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Button
          onClick={() => props.onChange([])}
          variant="text"
          aria-label="Clear selection"
          sx={{
            borderRadius: 0,
            color: uiTokens.text2,
            textTransform: "none",
            "&:hover": { background: alpha(uiTokens.surface, 0.18) },
          }}
        >
          Clear
        </Button>

        <Button
          onClick={props.onClose}
          variant="outlined"
          aria-label="Done"
          sx={{
            borderRadius: 0,
            borderColor: uiTokens.borderSoft,
            color: uiTokens.text2,
            textTransform: "none",
            "&:hover": { borderColor: uiTokens.border, background: alpha(uiTokens.surface, 0.18) },
          }}
        >
          Done
        </Button>
      </Box>
    </Dialog>
  );
}

export function FilterSidebar(props: {
  dense: boolean;

  era: ReleaseEra | "all";

  content: ReleaseContent[];
  tier2: ReleaseTier[];
  pack: ReleasePack[];
  legacyType: ReleaseType[];

  yearMin: number | null;
  yearMax: number | null;

  series: string[];
  characters: string[];
  allSeries: string[];
  allCharacters: string[];

  activeChips: Array<{ key: string; label: string; onDelete: () => void }>;

  onEraChange: (v: ReleaseEra | "all") => void;

  onContentChange: (v: ReleaseContent[]) => void;
  onTier2Change: (v: ReleaseTier[]) => void;
  onPackChange: (v: ReleasePack[]) => void;
  onLegacyTypeChange: (v: ReleaseType[]) => void;

  onYearMinChange: (v: number | null) => void;
  onYearMaxChange: (v: number | null) => void;

  onSeriesChange: (v: string[]) => void;
  onCharactersChange: (v: string[]) => void;

  onClearAll: () => void;
}): React.ReactElement {
  const [seriesOpen, setSeriesOpen] = React.useState(false);
  const [charactersOpen, setCharactersOpen] = React.useState(false);

  return (
    <Stack spacing={2.25}>
      {/* Header */}
      <Stack spacing={0.25}>
        <Typography sx={{ fontWeight: 900, letterSpacing: 0.35, fontSize: 13.5 }}>
          Curated Index
        </Typography>
        <Typography sx={{ fontSize: 12, color: uiTokens.text3 }}>
          Narrow the archive without turning it into a form.
        </Typography>
      </Stack>

      {/* Active filters summary */}
      <ActiveFiltersMini
        chips={props.activeChips}
        onClearAll={props.onClearAll}
      />

      {/* PRIMARY — always open */}
      <FilterSection
        title="Primary"
        subtitle="Era, format, tier, pack"
        rail
      >
        {/* Era */}
        <FilterSegmented
          label="Era"
          value={props.era}
          options={[
            { value: "all", label: "All" },
            { value: "G1", label: "G1" },
            { value: "G2", label: "G2" },
            { value: "G3", label: "G3" },
          ]}
          onChange={(v) => props.onEraChange(v as ReleaseEra | "all")}
        />

        <Box sx={{ height: 12 }} />

        {/* Format */}
        <FilterCheckboxGroup
          label="Format"
          value={props.content}
          options={[
            { value: "doll", label: "Doll" },
            { value: "playset", label: "Playset" },
            { value: "funko", label: "Funko" },
            { value: "fashion-pack", label: "Fashion Pack" },
            { value: "other", label: "Other" },
          ]}
          onChange={props.onContentChange}
          ariaLabel="Filter by format"
        />

        <Box sx={{ height: 12 }} />

        {/* Tier */}
        <FilterCheckboxGroup
          label="Tier"
          value={props.tier2}
          options={[
            { value: "common", label: "Common" },
            { value: "exclusive", label: "Exclusive" },
            { value: "skullector", label: "Skullector" },
            { value: "fangclub", label: "Fang Club" },
            { value: "other", label: "Other" },
          ]}
          onChange={props.onTier2Change}
          ariaLabel="Filter by tier"
        />

        <Box sx={{ height: 12 }} />

        {/* Pack */}
        <FilterCheckboxGroup
          label="Pack"
          value={props.pack}
          options={[
            { value: "1-pack", label: "1-pack" },
            { value: "2-pack", label: "2-pack" },
            { value: "multipack", label: "Multipack" },
            { value: "unknown", label: "Unknown" },
          ]}
          onChange={props.onPackChange}
          ariaLabel="Filter by pack"
        />
      </FilterSection>

      {/* YEAR — collapsed */}
      <FilterSection
        title="Year"
        subtitle="Release range"
        rail
        collapsible
        defaultExpanded={false}
      >
        <YearRangeRow
          dense={props.dense}
          min={props.yearMin}
          max={props.yearMax}
          onMinChange={props.onYearMinChange}
          onMaxChange={props.onYearMaxChange}
        />
      </FilterSection>

      {/* SERIES — collapsed */}
      <FilterSection
        title="Series"
        subtitle="Curated list"
        rail
        collapsible
        defaultExpanded={false}
      >
        <IndexRow
          label="Selected"
          value={props.series.length > 0 ? `${props.series.length}` : "None"}
          hint={
            props.series.length > 0
              ? props.series.slice(0, 2).join(", ")
              : "Choose series…"
          }
          actionLabel={props.series.length > 0 ? "Manage" : "Choose"}
          onAction={() => setSeriesOpen(true)}
          onClear={props.series.length > 0 ? () => props.onSeriesChange([]) : undefined}
        />

        <IndexPickerDialog
          open={seriesOpen}
          title="Series"
          value={props.series}
          options={props.allSeries}
          onChange={props.onSeriesChange}
          onClose={() => setSeriesOpen(false)}
          ariaLabel="Select series"
        />
      </FilterSection>

      {/* CHARACTERS — collapsed */}
      <FilterSection
        title="Characters"
        subtitle="Curated list"
        rail
        collapsible
        defaultExpanded={false}
      >
        <IndexRow
          label="Selected"
          value={props.characters.length > 0 ? `${props.characters.length}` : "None"}
          hint={
            props.characters.length > 0
              ? props.characters.slice(0, 2).join(", ")
              : "Choose characters…"
          }
          actionLabel={props.characters.length > 0 ? "Manage" : "Choose"}
          onAction={() => setCharactersOpen(true)}
          onClear={props.characters.length > 0 ? () => props.onCharactersChange([]) : undefined}
        />

        <IndexPickerDialog
          open={charactersOpen}
          title="Characters"
          value={props.characters}
          options={props.allCharacters}
          onChange={props.onCharactersChange}
          onClose={() => setCharactersOpen(false)}
          ariaLabel="Select characters"
        />
      </FilterSection>

      {/* LEGACY — collapsed, lowest priority */}
      <FilterSection
        title="Legacy"
        subtitle="Old type mapping"
        rail
        collapsible
        defaultExpanded={false}
      >
        <FilterCheckboxGroup
          label="Type"
          value={props.legacyType}
          options={[
            { value: "Playline", label: "Playline" },
            { value: "Collector", label: "Collector" },
            { value: "SDCC", label: "SDCC" },
            { value: "Skullector", label: "Skullector" },
            { value: "Limited", label: "Limited" },
          ]}
          onChange={props.onLegacyTypeChange}
          ariaLabel="Filter by legacy type"
        />
      </FilterSection>

      {/* Reset */}
      <Button
        onClick={props.onClearAll}
        fullWidth
        variant="outlined"
        aria-label="Reset all filters"
        sx={{
          borderColor: uiTokens.borderSoft,
          color: uiTokens.text2,
          borderRadius: 0,
          textTransform: "none",
          py: 1.1,
          "&:hover": {
            borderColor: uiTokens.border,
            background: alpha(uiTokens.surface, 0.18),
          },
        }}
      >
        Reset filters
      </Button>
    </Stack>
  );
}



export function FilterSection(props: {
  title: string;
  subtitle?: string;
  rail?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const isCollapsible = Boolean(props.collapsible);
  const [expanded, setExpanded] = React.useState<boolean>(props.defaultExpanded ?? true);

  const toggle = React.useCallback(() => {
    if (!isCollapsible) return;
    setExpanded((v) => !v);
  }, [isCollapsible]);

  return (
    <Box
      sx={{
        position: "relative",
        border: `1px solid ${uiTokens.borderSoft}`,
        borderRadius: 0,
        overflow: "hidden",
        background: alpha(uiTokens.surface, 0.06),
      }}
    >
      {props.rail && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: `linear-gradient(180deg, ${uiTokens.purple}, ${uiTokens.pink})`,
            opacity: 0.65,
          }}
          aria-hidden="true"
        />
      )}

      <Box sx={{ p: 1.6, pl: props.rail ? 2 : 1.6 }}>
        {/* Header: clickable area */}
        <Box
          role={isCollapsible ? "button" : undefined}
          tabIndex={isCollapsible ? 0 : -1}
          aria-label={isCollapsible ? `${expanded ? "Collapse" : "Expand"} ${props.title}` : undefined}
          aria-expanded={isCollapsible ? expanded : undefined}
          onClick={toggle}
          onKeyDown={(e) => {
            if (!isCollapsible) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            cursor: isCollapsible ? "pointer" : "default",
            userSelect: "none",
            borderRadius: 0,
            // subtle hover to show it’s clickable
            "&:hover": isCollapsible
              ? { background: alpha(uiTokens.surface, 0.10) }
              : undefined,
            // focus ring when header is keyboard-focused
            "&:focus-visible": isCollapsible
              ? {
                  outline: `2px solid ${alpha(uiTokens.purple, 0.40)}`,
                  outlineOffset: 2,
                }
              : undefined,
            // make it feel like a header strip
            px: 0.75,
            py: 0.6,
            mx: -0.75, // compensate padding to make hover strip full-width inside section
            mt: -0.35,
          }}
        >
          <Stack spacing={0.2}>
            <Typography sx={{ fontWeight: 900, letterSpacing: 0.25, fontSize: 13 }}>
              {props.title}
            </Typography>
            {props.subtitle && (
              <Typography sx={{ fontSize: 12, color: uiTokens.text3 }}>
                {props.subtitle}
              </Typography>
            )}
          </Stack>

          {isCollapsible && (
            <IconButton
              size="small"
              aria-label={expanded ? `Collapse ${props.title}` : `Expand ${props.title}`}
              onClick={(e) => {
                // prevent double toggle due to bubbling
                e.stopPropagation();
                toggle();
              }}
              sx={{
                color: uiTokens.text2,
                borderRadius: 0,
                border: `1px solid ${uiTokens.borderSoft}`,
                "&:hover": { background: alpha(uiTokens.surface, 0.16) },
              }}
            >
              {expanded ? <CloseIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
            </IconButton>
          )}
        </Box>

        {(!isCollapsible || expanded) && (
          <Box sx={{ mt: 1.1 }}>
            {props.children}
          </Box>
        )}
      </Box>
    </Box>
  );
}



export function FilterSegmented(props: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (v: string) => void;
}): React.ReactElement {
  return (
    <Stack spacing={0.75}>
      <Typography sx={{ fontSize: 12.5, color: uiTokens.text3, letterSpacing: 0.25 }}>
        {props.label}
      </Typography>

      <ToggleButtonGroup
        exclusive
        value={props.value}
        onChange={(_, v: string | null) => v && props.onChange(v)}
        aria-label={`${props.label} segmented control`}
        size="small"
        sx={{
          width: "100%",
          borderRadius: 2,
          background: alpha(uiTokens.surface, 0.18),
          border: `1px solid ${uiTokens.borderSoft}`,
          display: "grid",
          gridTemplateColumns: `repeat(${props.options.length}, 1fr)`,
          overflow: "hidden",
          "& .MuiToggleButton-root": {
            border: "none",
            borderRadius: 0,
            color: uiTokens.text3,
            py: 1,
            "&.Mui-selected": {
              color: uiTokens.text,
              background: alpha(uiTokens.purple, 0.18),
            },
            "&:hover": { background: alpha(uiTokens.surface, 0.35) },
          },
        }}
      >
        {props.options.map((o) => (
          <ToggleButton key={o.value} value={o.value} aria-label={`${props.label}: ${o.label}`}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>{o.label}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
export function FilterCheckboxGroup<T extends string>(props: {
  label: string;
  value: T[];
  options: Array<{ value: T; label: string }>;
  onChange: (v: T[]) => void;
  ariaLabel: string;
}): React.ReactElement {
  const set = React.useMemo(() => new Set(props.value), [props.value]);

  const toggle = React.useCallback(
    (v: T) => {
      const next = new Set(set);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      props.onChange(Array.from(next));
    },
    [set, props]
  );

  return (
    <Box aria-label={props.ariaLabel}>
      <Typography sx={{ fontSize: 12, color: uiTokens.text3, letterSpacing: 0.25, mb: 0.75 }}>
        {props.label}
      </Typography>

      <Box
        sx={{
          border: `1px solid ${uiTokens.borderSoft}`,
          background: alpha(uiTokens.surface, 0.06),
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        <Stack spacing={0} divider={<Divider sx={{ borderColor: uiTokens.borderSoft }} />}>
          {props.options.map((o) => {
            const checked = set.has(o.value);
            return (
              <Box
                key={o.value}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 1.25,
                  py: 0.85,
                  "&:hover": { background: alpha(uiTokens.surface, 0.14) },
                }}
              >
                <Stack spacing={0}>
                  <Typography sx={{ fontSize: 12.6, fontWeight: 800, letterSpacing: 0.15 }}>
                    {o.label}
                  </Typography>
                </Stack>

                <Checkbox
                  checked={checked}
                  onChange={() => toggle(o.value)}
                  inputProps={{ "aria-label": `${props.label}: ${o.label}` }}
                  size="small"
                  sx={{
                    color: uiTokens.text3,
                    "&.Mui-checked": { color: uiTokens.purple },
                  }}
                />
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}

export function FilterChips(props: {
  value: string[];
  options: string[];
  onChange: (v: string[]) => void;
  dense: boolean;
  placeholder: string;
  ariaLabel: string;
}): React.ReactElement {
  return (
    <Autocomplete
      multiple
      options={props.options}
      value={props.value}
      onChange={(_, v) => props.onChange(v)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option}
            label={option}
            size={props.dense ? "small" : "medium"}
            sx={{
              borderRadius: 999,
              background: alpha(uiTokens.surface, 0.10),
              border: `1px solid ${uiTokens.borderSoft}`,
              color: uiTokens.text2,
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.placeholder}
          aria-label={props.ariaLabel}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
              background: alpha(uiTokens.surface, 0.10),
              color: uiTokens.text,
              "& fieldset": { borderColor: uiTokens.borderSoft },
              "&:hover fieldset": { borderColor: uiTokens.border },
              "&.Mui-focused fieldset": { borderColor: alpha(uiTokens.purple, 0.45) },
            },
          }}
        />
      )}
    />
  );
}

export function YearRangeRow(props: {
  dense: boolean;
  min: number | null;
  max: number | null;
  onMinChange: (v: number | null) => void;
  onMaxChange: (v: number | null) => void;
}): React.ReactElement {
  return (
    <Stack direction="row" spacing={1}>
      <TextField
        value={props.min ?? ""}
        onChange={(e) => props.onMinChange(e.target.value === "" ? null : Number(e.target.value))}
        placeholder="From"
        inputProps={{ inputMode: "numeric", "aria-label": "Year from" }}
        size={props.dense ? "small" : "medium"}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            background: alpha(uiTokens.surface, 0.10),
            color: uiTokens.text,
            "& fieldset": { borderColor: uiTokens.borderSoft },
            "&:hover fieldset": { borderColor: uiTokens.border },
            "&.Mui-focused fieldset": { borderColor: alpha(uiTokens.purple, 0.45) },
          },
        }}
      />
      <TextField
        value={props.max ?? ""}
        onChange={(e) => props.onMaxChange(e.target.value === "" ? null : Number(e.target.value))}
        placeholder="To"
        inputProps={{ inputMode: "numeric", "aria-label": "Year to" }}
        size={props.dense ? "small" : "medium"}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            background: alpha(uiTokens.surface, 0.10),
            color: uiTokens.text,
            "& fieldset": { borderColor: uiTokens.borderSoft },
            "&:hover fieldset": { borderColor: uiTokens.border },
            "&.Mui-focused fieldset": { borderColor: alpha(uiTokens.purple, 0.45) },
          },
        }}
      />
    </Stack>
  );
}

const yearFieldSx = {
  flex: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: alpha(uiTokens.surface, 0.14),
    color: uiTokens.text,
    "& fieldset": { borderColor: uiTokens.borderSoft },
    "&:hover fieldset": { borderColor: uiTokens.border },
    "&.Mui-focused fieldset": { borderColor: alpha(uiTokens.purple, 0.6) },
  },
};

export function ActiveFiltersMini(props: {
  chips: Array<{ key: string; label: string; onDelete: () => void }>;
  onClearAll: () => void;
}): React.ReactElement {
  const hasAny = props.chips.length > 0;

  return (
    <Box
      sx={{
        border: `1px solid ${uiTokens.borderSoft}`,
        borderRadius: 0,
        overflow: "hidden",
        background: alpha(uiTokens.surface, 0.06),
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 1.1,
          borderBottom: hasAny ? `1px solid ${uiTokens.borderSoft}` : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography sx={{ fontWeight: 900, letterSpacing: 0.25, fontSize: 13 }}>
          Active filters
        </Typography>

        <Button
          onClick={props.onClearAll}
          disabled={!hasAny}
          size="small"
          aria-label="Clear all active filters"
          sx={{
            color: hasAny ? uiTokens.text2 : uiTokens.text3,
            textTransform: "none",
            borderRadius: 0,
            px: 1,
            "&:hover": { background: alpha(uiTokens.surface, 0.14) },
          }}
        >
          Clear
        </Button>
      </Box>

      <Box sx={{ p: 1.25 }}>
        {hasAny ? (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {props.chips.map((c) => (
              <Chip
                key={c.key}
                label={c.label}
                onDelete={c.onDelete}
                size="small"
                sx={{
                  borderRadius: 999,
                  background: alpha(uiTokens.surface, 0.10),
                  border: `1px solid ${uiTokens.borderSoft}`,
                  color: uiTokens.text2,
                  "& .MuiChip-deleteIcon": { color: uiTokens.text3 },
                }}
              />
            ))}
          </Stack>
        ) : (
          <Typography sx={{ fontSize: 12, color: uiTokens.text3 }}>
            No filters selected.
          </Typography>
        )}
      </Box>
    </Box>
  );
}


// =====================================================
// ACTIVE FILTERS BAR (main area)
// =====================================================
export function ActiveFiltersBar(props: {
  chips: Array<{ key: string; label: string; onDelete: () => void }>;
  total: number;
  onClearAll: () => void;
}): React.ReactElement {
  const hasAny = props.chips.length > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        background: alpha(uiTokens.surface, 0.08),
        border: `1px solid ${uiTokens.borderSoft}`,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack spacing={0.15}>
          <Typography sx={{ fontWeight: 900, letterSpacing: 0.2, fontSize: 13.5 }}>
            Releases
          </Typography>
          <Typography sx={{ fontSize: 12, color: uiTokens.text3 }}>
            {props.total} results
          </Typography>
        </Stack>

        {hasAny ? (
          <Button
            onClick={props.onClearAll}
            size="small"
            variant="text"
            aria-label="Clear all filters"
            sx={{
              color: uiTokens.text2,
              textTransform: "none",
              borderRadius: 0,
              px: 1.25,
              "&:hover": { background: alpha(uiTokens.surface, 0.18) },
            }}
          >
            Clear all
          </Button>
        ) : (
          <Typography sx={{ fontSize: 12, color: uiTokens.text3 }}>
            Use filters to narrow the archive
          </Typography>
        )}
      </Box>

      {hasAny && (
        <>
          <Divider sx={{ borderColor: uiTokens.borderSoft }} />
          <Box sx={{ px: 2, py: 1.25 }}>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {props.chips.map((c) => (
                <Chip
                  key={c.key}
                  label={c.label}
                  onDelete={c.onDelete}
                  size="small"
                  sx={{
                    borderRadius: 999,
                    background: alpha(uiTokens.surface, 0.14),
                    border: `1px solid ${uiTokens.borderSoft}`,
                    color: uiTokens.text2,
                    "& .MuiChip-deleteIcon": { color: uiTokens.text3 },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Paper>
  );
}

// =====================================================
// GRID + CARDS
// =====================================================
export function ReleaseGrid(props: {
  items: ReleaseListItem[];
}): React.ReactElement {
  return (
    <Box
      role="list"
      aria-label="Release grid"
      sx={{
        display: "grid",
        gap: 12,
        alignItems: "stretch",

        // ✅ Catalog columns: narrow cards, auto-wrap, never overflow
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 240px))",

        // ✅ When there are fewer columns, keep the grid centered
        justifyContent: "center",

        width: "100%",
        minWidth: 0,
      }}
    >
      {props.items.map((item) => (
        <ReleaseCard key={item.id} item={item} />
      ))}
    </Box>
  );
}

export function ReleaseCardSpecStrip(props: {
  content: ReleaseContent;
  tier2: ReleaseTier;
  pack: ReleasePack;
}): React.ReactElement {
  const fmt = (s: string) => s.replace("-", " ");

  return (
    <Typography
      sx={{
        fontSize: 11.5,
        color: uiTokens.text3,
        letterSpacing: 0.25,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={`${fmt(props.content)} • ${fmt(props.tier2)} • ${fmt(props.pack)}`}
    >
      {fmt(props.content)} • {fmt(props.tier2)} • {fmt(props.pack)}
    </Typography>
  );
}

export function ReleaseCard(props: {
  item: ReleaseListItem;
}): React.ReactElement {
  const CARD_W = 240;

  // ✅ ниже общая высота: чтобы на 27" помещалось 2 ряда
  const CARD_HEIGHT = { xs: 470, sm: 485, md: 500 };

  return (
    <Paper
      role="listitem"
      elevation={0}
      sx={{
        width: CARD_W,
        height: CARD_HEIGHT,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRadius: 0,
        overflow: "hidden",
        background: alpha(uiTokens.surface, 0.08),
        border: `1px solid ${uiTokens.borderSoft}`,
        transition: "transform 180ms ease, border-color 180ms ease, background 180ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: alpha(uiTokens.purple, 0.26),
          background: alpha(uiTokens.surface, 0.13),
        },
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={() => {
          // TODO: navigate(`/releases/${props.item.id}`)
        }}
        aria-label={`Open release: ${props.item.title}`}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          margin: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          textAlign: "left",
          color: "inherit",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            "&:focus-visible": {
              outline: `2px solid ${alpha(uiTokens.purple, 0.42)}`,
              outlineOffset: 2,
            },
          }}
        >
          <ReleaseCardRail />
          <ReleaseCardMedia title={props.item.title} imageUrl={props.item.imageUrl} />

          {/* ✅ footer layout: top content + flexible spacer + badges stuck to bottom */}
          <Box
            sx={{
              p: 1.15,
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0.55,
            }}
          >
            {/* TOP INFO */}
            <ReleaseCardTitle title={props.item.title} />
            <ReleaseCardSubtitle series={props.item.series} />
            <ReleaseCardSpecStrip content={props.item.content} tier2={props.item.tier2} pack={props.item.pack} />
            <ReleaseCardMetaRow meta={formatMetaLine(props.item)} />

            {/* ✅ Spacer eats extra space when there is little text */}
            <Box sx={{ flex: 1, minHeight: 6 }} />

            {/* ✅ Badges always at bottom */}
            <ReleaseCardBadgeRow tier={props.item.tier2} rarityTag={props.item.rarityTag} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}


export function ReleaseCardRail(): React.ReactElement {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: `linear-gradient(180deg, ${uiTokens.purple}, ${uiTokens.pink})`,
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}

export function ReleaseCardMedia(props: {
  title: string;
  imageUrl?: string;
}): React.ReactElement {
  const MEDIA_HEIGHT = { xs: 260, sm: 290, md: 310 };

  return (
    <Box
      sx={{
        height: MEDIA_HEIGHT,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0b0a10, #07060a)",
        borderBottom: `1px solid ${uiTokens.borderSoft}`,
        flex: "0 0 auto",
      }}
      aria-label={`Release image: ${props.title}`}
      role="img"
    >
      {props.imageUrl ? (
        <>
          {/* soft blurred backdrop */}
          <Box
            sx={{
              position: "absolute",
              inset: -60,
              backgroundImage: `url(${props.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              filter: "blur(28px) saturate(1.05)",
              opacity: 0.14,
              transform: "scale(1.08)",
            }}
            aria-hidden="true"
          />

          {/* subtle vignette */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(75% 70% at 50% 32%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.00) 48%, rgba(0,0,0,0.38) 100%)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />

          {/* main image */}
          <Box
            component="img"
            src={props.imageUrl}
            alt={props.title}
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              p: 1.6,
              boxSizing: "border-box",
              // only shadow on the figure itself
              filter: "drop-shadow(0 18px 26px rgba(0,0,0,0.45))",
            }}
          />
        </>
      ) : (
        <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <Typography
            sx={{
              fontSize: 11.5,
              letterSpacing: 2.2,
              textTransform: "uppercase",
              color: uiTokens.text3,
            }}
          >
            Image placeholder
          </Typography>
        </Box>
      )}
    </Box>
  );
}


export function ReleaseCardTitle(props: { title: string }): React.ReactElement {
  return (
    <Typography
      sx={{
        fontWeight: 900,
        letterSpacing: 0.2,
        fontSize: 15,
        lineHeight: 1.15,
        color: uiTokens.text,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
      title={props.title}
    >
      {props.title}
    </Typography>
  );
}

export function ReleaseCardSubtitle(props: { series: string }): React.ReactElement {
  return (
    <Typography
      sx={{
        fontSize: 12.5,
        color: uiTokens.text3,
        letterSpacing: 0.25,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={props.series}
    >
      {props.series}
    </Typography>
  );
}

export function ReleaseCardMetaRow(props: { meta: string }): React.ReactElement {
  return (
    <Typography
      sx={{
        fontSize: 12.5,
        color: uiTokens.text2,
        letterSpacing: 0.35,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={props.meta}
    >
      {props.meta}
    </Typography>
  );
}

export function ReleaseCardBadgeRow(props: {
  tier?: ReleaseTier;
  rarityTag?: string;
}): React.ReactElement {
  const chips: Array<{ label: string; tone: "neutral" | "accent" }> = [];

  if (props.rarityTag) chips.push({ label: props.rarityTag, tone: "accent" });
  if (props.tier) chips.push({ label: props.tier, tone: "neutral" });

  if (chips.length === 0) return <Box />;

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ pt: 0.5 }}>
      {chips.map((c) => (
        <BadgePill key={c.label} label={c.label} tone={c.tone} />
      ))}
    </Stack>
  );
}

export function BadgePill(props: {
  label: string;
  tone: "neutral" | "accent";
}): React.ReactElement {
  const isAccent = props.tone === "accent";

  return (
    <Chip
      label={
        <Stack direction="row" spacing={0.75} alignItems="center">
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: isAccent
                ? `linear-gradient(135deg, ${uiTokens.pink}, ${uiTokens.purple})`
                : alpha("#fff", 0.22),
              boxShadow: isAccent ? `0 0 0 5px ${alpha(uiTokens.glow, 0.25)}` : "none",
            }}
            aria-hidden="true"
          />
          <span>{props.label}</span>
        </Stack>
      }
      size="small"
      sx={{
        borderRadius: 999,
        height: 24,
        fontSize: 12.2,
        color: uiTokens.text2,
        background: isAccent ? alpha(uiTokens.purple, 0.12) : alpha(uiTokens.surface, 0.18),
        border: `1px solid ${isAccent ? alpha(uiTokens.purple, 0.25) : uiTokens.borderSoft}`,
        "& .MuiChip-label": { px: 1.0 },
      }}
    />
  );
}

// =====================================================
// PAGINATION
// =====================================================
export function CatalogPagination(props: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}): React.ReactElement {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0,
        background: alpha(uiTokens.surface, 0.06),
        border: `1px solid ${uiTokens.borderSoft}`,
        p: 1.75,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pagination
        page={props.page}
        count={props.totalPages}
        onChange={(_, p) => props.onChange(p)}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: 0,
            color: uiTokens.text2,
            border: `1px solid ${uiTokens.borderSoft}`,
            background: alpha(uiTokens.surface, 0.08),
            "&:hover": { background: alpha(uiTokens.surface, 0.18) },
            "&.Mui-selected": {
              background: alpha(uiTokens.purple, 0.16),
              borderColor: alpha(uiTokens.purple, 0.28),
              color: uiTokens.text,
            },
          },
        }}
      />
    </Paper>
  );
}

