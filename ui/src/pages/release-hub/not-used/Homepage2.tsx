import * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  ButtonBase,
  Divider,
  Chip,
  InputBase,
  Grid,
  alpha,
  IconButton,
  Stack,
  type SxProps,
  type Theme,
} from "@mui/material";
import { keyframes } from "@mui/system";
import {
  Search,
  TrendingUp,
  Database,
  Activity,
  ArrowRight,
  Image as ImageIcon,
  ShieldCheck,
  Globe,
  BarChart3,
  History,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==================================================
// 1) Types & Domain Models
// ==================================================

export type MarketStatus = "rising" | "falling" | "stable";

export interface ReleaseVariant {
  id: string;
  label: string;
  isExclusive: boolean;
  region: "US" | "EU" | "WW" | "Asia";
}

export interface HomeReleasePreview {
  id: number;
  displayName: string;
  year: number;
  series: string;
  subSeries?: string;
  priceTrend: MarketStatus;
  rarity: "Common" | "Rare" | "Exclusive" | "Skullector" | "Grail";
  marketValue: string;
  msrp: string;
  tags: string[];
  imageUrl?: string;
}

export interface SeriesCategory {
  title: string;
  count: number;
  description: string;
  color: string;
}

// ==================================================
// 2) Mock Data
// ==================================================

export const HOME_RELEASES_MOCK: HomeReleasePreview[] = [
  {
    id: 101,
    displayName: "Draculaura — First Wave",
    year: 2010,
    series: "Core",
    priceTrend: "rising",
    rarity: "Grail",
    marketValue: "$450+",
    msrp: "$19.99",
    tags: ["OG", "NIB High Demand", "V1 Box"],
    // imageUrl: "/demo/profile/dolls/Draculaura-First-Wave.png",
  },
  {
    id: 105,
    displayName: "Edward Scissorhands",
    year: 2023,
    series: "Skullector",
    priceTrend: "rising",
    rarity: "Skullector",
    marketValue: "$145+",
    msrp: "$65.00",
    tags: ["Limited", "Movie Collab"],
    // imageUrl: "/demo/profile/dolls/Skullector-Edward-Scissorhands.png",
  },
  {
    id: 106,
    displayName: "Frankie Stein — Haunt Couture",
    year: 2022,
    series: "Collector",
    priceTrend: "stable",
    rarity: "Exclusive",
    marketValue: "$160",
    msrp: "$75.00",
    tags: ["Mattel Creations"],
  },
  {
    id: 107,
    displayName: "G3 Abbey Bominable",
    year: 2023,
    series: "G3 Core",
    priceTrend: "falling",
    rarity: "Common",
    marketValue: "$21",
    msrp: "$24.99",
    tags: ["Mass Market", "Retailer Stocked"],
  },
  {
    id: 110,
    displayName: "Cleo & Deuce 2-Pack",
    year: 2010,
    series: "Core",
    priceTrend: "rising",
    rarity: "Rare",
    marketValue: "$380",
    msrp: "$34.99",
    tags: ["Gold Elastic", "First Edition"],
  },
  {
    id: 115,
    displayName: "Lagoona Blue — SDCC Exclusive",
    year: 2024,
    series: "Special",
    priceTrend: "rising",
    rarity: "Exclusive",
    marketValue: "$210",
    msrp: "$80.00",
    tags: ["Convention", "Holographic Box"],
  },
];

const SERIES_MAP: SeriesCategory[] = [
  {
    title: "Generation 1",
    count: 1240,
    description: "The original era (2010-2016) that started the monster revolution.",
    color: "#D666FF",
  },
  {
    title: "Skullector",
    count: 18,
    description: "Premium movie-inspired crossovers for adult collectors.",
    color: "#ff4d4d",
  },
  {
    title: "G3 Signature",
    count: 145,
    description: "The current era with updated bodies and diverse storytelling.",
    color: "#00d4ff",
  },
  {
    title: "Creeproductions",
    count: 12,
    description: "Exact replicas of original G1 dolls for the new generation.",
    color: "#b6ff00",
  },
];

// ==================================================
// 3) Design tokens
// ==================================================

const ACCENT = "#D666FF";
const BG = "#050505";

// ==================================================
// 4) Shared atoms (typed)
// ==================================================

type GlassCardProps = React.PropsWithChildren<{
  sx?: SxProps<Theme>;
  hover?: boolean;
}>;

const GlassCard = ({ children, sx, hover = true }: GlassCardProps) => (
  <Box
    sx={{
      borderRadius: 4,
      border: "1px solid rgba(255,255,255,0.08)",
      background:
        "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(12px)",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      ...(hover && {
        "&:hover": {
          borderColor: "rgba(214,102,255,0.30)",
          background: "rgba(255,255,255,0.06)",
          transform: "translateY(-6px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        },
      }),
      ...sx,
    }}
  >
    {children}
  </Box>
);

type SectionHeaderProps = {
  overline: string;
  title: string;
  description?: string;
  action?: string;
  onActionClick?: () => void;
};

const SectionHeader = ({ overline, title, description, action, onActionClick }: SectionHeaderProps) => (
  <Box sx={{ mb: 6 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 2 }}>
      <Box>
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: ACCENT,
            fontWeight: 800,
            mb: 1.5,
          }}
        >
          {overline}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: 28, md: 40 } }}>
          {title}
        </Typography>
      </Box>

      {action ? (
        <ButtonBase
          onClick={onActionClick}
          aria-label={action}
          sx={{
            gap: 1,
            opacity: 0.6,
            pb: 1,
            borderBottom: "1px solid transparent",
            "&:hover": { opacity: 1, borderColor: ACCENT },
            transition: "0.3s",
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>{action}</Typography>
          <ArrowRight size={16} />
        </ButtonBase>
      ) : null}
    </Box>

    {description ? (
      <Typography sx={{ maxWidth: 600, opacity: 0.5, fontSize: 15, lineHeight: 1.6 }}>
        {description}
      </Typography>
    ) : null}
  </Box>
);

// ==================================================
// 5) Masthead
// ==================================================

export function Masthead() {
  const nav = useMemo(
    () => [
      { label: "Catalog", href: "/releases" },
      { label: "Market Intelligence", href: "/market" },
      { label: "Media Library", href: "/media" },
      { label: "Community", href: "/community" },
    ],
    []
  );

  return (
    <Box
      component="nav"
      aria-label="Primary navigation"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: alpha(BG, 0.8),
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ height: 80, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: ACCENT,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-hidden
            >
              <Typography sx={{ fontWeight: 950, color: "black", fontSize: 18 }}>M</Typography>
            </Box>
            <Link
              href="/"
              underline="none"
              sx={{
                color: "inherit",
                "&:focus-visible": { outline: "2px solid rgba(255,255,255,0.35)", outlineOffset: 3, borderRadius: 1 },
              }}
              aria-label="Monstrino home"
            >
              <Typography sx={{ fontSize: 20, letterSpacing: 5, fontWeight: 900, textTransform: "uppercase" }}>
                Monstrino
              </Typography>
            </Link>
          </Stack>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {nav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  opacity: 0.6,
                  "&:hover": { opacity: 1 },
                  "&:focus-visible": { outline: "2px solid rgba(255,255,255,0.35)", outlineOffset: 3, borderRadius: 1 },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton aria-label="Open search" sx={{ color: "white", opacity: 0.5, "&:hover": { opacity: 1 } }}>
              <Search size={20} />
            </IconButton>

            <ButtonBase
              component="a"
              href="/login"
              aria-label="Log in"
              sx={{
                bgcolor: "white",
                color: "black",
                px: 2.5,
                py: 1,
                borderRadius: 2,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              LOG IN
            </ButtonBase>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ==================================================
// 6) Market ticker (no <style>, reduced-motion safe)
// ==================================================

const tickerAnim = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const TICKER_ITEMS = [
  "Avg G1 Value: $240 (+12%)",
  "Skullector Elvira: $180 stable",
  "G3 Stock levels: High",
  "Grail of the Day: 2010 SDCC Frankie",
  "MSRP Tracking: 42 countries",
  "Media Added: 1,240 new promos",
];

export function MarketTicker() {
  // duplicate list for seamless loop
  const items = useMemo(() => [...TICKER_ITEMS, ...TICKER_ITEMS], []);

  return (
    <Box
      sx={{
        py: 1.5,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        bgcolor: alpha(ACCENT, 0.02),
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", gap: 6, overflow: "hidden" }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: ACCENT, flexShrink: 0 }}>
            <Activity size={14} />
            <Typography sx={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, textTransform: "uppercase" }}>
              Live Pulse
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "flex",
              gap: 6,
              whiteSpace: "nowrap",
              willChange: "transform",
              animation: `${tickerAnim} 30s linear infinite`,
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
                transform: "none",
              },
            }}
            aria-label="Market ticker"
          >
            {items.map((text, i) => (
              <Typography
                key={`${i}-${text}`}
                sx={{ fontSize: 12, opacity: 0.4, display: "flex", alignItems: "center", gap: 1.5 }}
              >
                <Box component="span" sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: ACCENT }} />
                {text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ==================================================
// 7) Release Card (imageUrl supported, route fixed)
// ==================================================

export function ReleaseCard({ item }: { item: HomeReleasePreview }) {
  const isRising = item.priceTrend === "rising";

  return (
    <ButtonBase
      component="a"
      href={`/releases/${item.id}`}
      aria-label={`Open release: ${item.displayName}`}
      sx={{ width: "100%", textAlign: "left" }}
    >
      <GlassCard sx={{ p: 0, width: "100%" }}>
        <Box sx={{ height: 180, bgcolor: "rgba(255,255,255,0.02)", position: "relative" }}>
          <Box sx={{ position: "absolute", top: 12, left: 12, zIndex: 1 }}>
            <Chip
              label={item.rarity}
              size="small"
              sx={{ height: 18, fontSize: 8, fontWeight: 800, bgcolor: ACCENT, color: "black" }}
            />
          </Box>

          {item.imageUrl ? (
            <Box
              component="img"
              src={item.imageUrl}
              alt={item.displayName}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                filter: "saturate(0.95)",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.12,
              }}
              aria-label="No image available"
            >
              <ImageIcon size={48} />
            </Box>
          )}
        </Box>

        <Box sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: 10,
                opacity: 0.4,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {item.series} / {item.year}
            </Typography>

            {isRising ? <TrendingUp size={14} color="#4caf50" aria-label="Rising trend" /> : null}
          </Box>

          <Typography sx={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2, mb: 2, minHeight: 40 }}>
            {item.displayName}
          </Typography>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography sx={{ fontSize: 9, opacity: 0.4, textTransform: "uppercase" }}>Market Value</Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 900, color: isRising ? "#4caf50" : "white" }}>
                {item.marketValue}
              </Typography>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: 9, opacity: 0.4, textTransform: "uppercase" }}>Orig. MSRP</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 600, opacity: 0.8 }}>{item.msrp}</Typography>
            </Box>
          </Box>
        </Box>
      </GlassCard>
    </ButtonBase>
  );
}

// ==================================================
// 8) Main page
// ==================================================

export function HomePage2() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Safe reveal refs (no resetting array in render)
  const revealSetRef = useRef<Set<HTMLDivElement>>(new Set());

  const addToRevealRefs = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    revealSetRef.current.add(el);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // hero entrance
      gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      // scroll reveal
      revealSetRef.current.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, rootRef);

    return () => {
      ctx.revert(); // kills animations + triggers created inside context
    };
  }, []);

  const onSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Hook your real router/search logic here
  }, []);

  return (
    <Box
      ref={rootRef}
      sx={{
        bgcolor: BG,
        color: "white",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Masthead />
      <MarketTicker />

      {/* 1) Hero */}
      <Box sx={{ position: "relative", overflow: "hidden", pt: { xs: 8, md: 15 }, pb: 10 }}>
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: 600,
            background: "radial-gradient(circle, rgba(214,102,255,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={7} className="hero-content">
              <Chip
                label="Canonical Archive V1.0"
                sx={{
                  bgcolor: alpha(ACCENT, 0.1),
                  color: ACCENT,
                  fontWeight: 800,
                  px: 1,
                  mb: 4,
                  border: "1px solid rgba(214,102,255,0.2)",
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 48, md: 96 },
                  fontWeight: 950,
                  letterSpacing: -3,
                  lineHeight: 0.85,
                  mb: 4,
                }}
              >
                Precision <br />
                Cataloging for <br />
                <Box component="span" sx={{ color: ACCENT }}>
                  Collectors.
                </Box>
              </Typography>

              <Typography sx={{ fontSize: { xs: 18, md: 22 }, opacity: 0.6, maxWidth: 600, mb: 6, lineHeight: 1.5 }}>
                Monstrino is an editorially curated platform that maps the entire Monster High universe through the lens
                of data, market value, and media preservation.
              </Typography>

              {/* Search */}
              <Box
                component="form"
                onSubmit={onSearchSubmit}
                role="search"
                aria-label="Site search"
                sx={{
                  p: 0.75,
                  pl: 3,
                  borderRadius: 5,
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  maxWidth: 640,
                }}
              >
                <Search size={22} style={{ opacity: 0.3 }} aria-hidden />
                <InputBase
                  placeholder="Search characters, series, SKU or year..."
                  inputProps={{ "aria-label": "Search query" }}
                  sx={{ ml: 2, flex: 1, color: "white", fontSize: 16 }}
                />
                <ButtonBase
                  type="submit"
                  aria-label="Search index"
                  sx={{
                    bgcolor: ACCENT,
                    color: "black",
                    fontWeight: 850,
                    px: 4,
                    py: 1.5,
                    borderRadius: 4,
                    fontSize: 13,
                    letterSpacing: 1.5,
                  }}
                >
                  SEARCH INDEX
                </ButtonBase>
              </Box>
            </Grid>

            <Grid item xs={12} md={5} className="hero-content">
              <GlassCard sx={{ p: 4 }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    letterSpacing: 3,
                    fontWeight: 800,
                    opacity: 0.4,
                    mb: 3,
                    textTransform: "uppercase",
                  }}
                >
                  Platform Capabilities
                </Typography>

                <Stack spacing={4}>
                  {[
                    {
                      icon: Database,
                      title: "Structured Ontology",
                      desc: "Every release is a unique entity with parent-child relationships.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Market Intelligence",
                      desc: "Historical price movement tracking across regions (as the dataset grows).",
                    },
                    {
                      icon: ImageIcon,
                      title: "Media Preservation",
                      desc: "Archival-grade promotionals and original packaging scans.",
                    },
                  ].map((feat, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          bgcolor: "rgba(255,255,255,0.03)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: ACCENT,
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                        aria-hidden
                      >
                        <feat.icon size={24} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 15, fontWeight: 800, mb: 0.5 }}>{feat.title}</Typography>
                        <Typography sx={{ fontSize: 13, opacity: 0.5, lineHeight: 1.5 }}>{feat.desc}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </GlassCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2) Series Explorer */}
      <Container maxWidth="xl" sx={{ py: 12 }}>
        <Box ref={addToRevealRefs}>
          <SectionHeader
            overline="Taxonomy"
            title="Explore Generations"
            description="Our database is segmented into specific eras and production lines to ensure accurate search and navigation."
            action="View All Series"
            onActionClick={() => {
              // optional hook for your router
            }}
          />

          <Grid container spacing={3}>
            {SERIES_MAP.map((s, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <GlassCard
                  sx={{
                    p: 4,
                    height: "100%",
                    borderColor: alpha(s.color, 0.1),
                    "&:hover": { borderColor: s.color },
                  }}
                >
                  <Typography sx={{ fontSize: 40, fontWeight: 900, color: s.color, mb: 2, opacity: 0.8 }}>
                    {s.count}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                    {s.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14, opacity: 0.5, lineHeight: 1.6 }}>{s.description}</Typography>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* 3) Catalog Preview */}
      <Box sx={{ py: 12, bgcolor: "rgba(255,255,255,0.01)", borderY: "1px solid rgba(255,255,255,0.03)" }}>
        <Container maxWidth="xl">
          <Box ref={addToRevealRefs}>
            <SectionHeader overline="Catalog" title="Recent Additions" action="Open Database" />

            <Grid container spacing={3}>
              {HOME_RELEASES_MOCK.map((release) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={release.id}>
                  <ReleaseCard item={release} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* 4) Statistics / Infographic */}
      <Container maxWidth="xl" sx={{ py: 15 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} ref={addToRevealRefs}>
            <GlassCard sx={{ p: 6, height: "100%", bgcolor: "transparent" }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
                Platform Analytics
              </Typography>
              <Typography sx={{ opacity: 0.6, mb: 6, fontSize: 16 }}>
                Monstrino isn't just a list—it's an interconnected web of data points that helps collectors understand
                the history of the brand.
              </Typography>

              <Grid container spacing={4}>
                {[
                  { label: "Valid Releases", val: "3,402" },
                  { label: "Price Points", val: "54.2K" },
                  { label: "High-Res Media", val: "12,904" },
                  { label: "Active Nodes", val: "185" },
                ].map((st, i) => (
                  <Grid item xs={6} key={i}>
                    <Typography sx={{ fontSize: 24, fontWeight: 950, color: ACCENT }}>{st.val}</Typography>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 800,
                        opacity: 0.4,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      {st.label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </GlassCard>
          </Grid>

          <Grid item xs={12} md={6} ref={addToRevealRefs}>
            <Box
              sx={{
                height: "100%",
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#0a0a0a",
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.3,
                  background: `radial-gradient(circle at center, ${ACCENT} 0%, transparent 80%)`,
                }}
              />
              <Box
                aria-hidden
                sx={{ position: "absolute", inset: 40, border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 2 }}
              />

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  p: 6,
                  textAlign: "center",
                }}
              >
                <ShieldCheck size={64} color={ACCENT} strokeWidth={1} />
                <Typography variant="h5" sx={{ fontWeight: 900, mt: 4, mb: 2 }}>
                  Curated by Experts
                </Typography>
                <Typography sx={{ opacity: 0.5, fontSize: 14, lineHeight: 1.6 }}>
                  Unlike fan wikis, Monstrino data is verified. We cross-reference SKU numbers, barcodes, and production
                  notes for consistent entries.
                </Typography>

                <ButtonBase
                  component="a"
                  href="/about/standards"
                  aria-label="Learn about standards"
                  sx={{
                    mt: 4,
                    px: 3,
                    py: 1.2,
                    border: `1px solid ${ACCENT}`,
                    color: ACCENT,
                    borderRadius: 2,
                    fontWeight: 800,
                    fontSize: 12,
                  }}
                >
                  LEARN ABOUT OUR STANDARDS
                </ButtonBase>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 5) Footer */}
      <Box sx={{ pt: 15, pb: 8, borderTop: "1px solid rgba(255,255,255,0.05)", bgcolor: "#020202" }}>
        <Container maxWidth="xl">
          <Grid container spacing={8} sx={{ mb: 10 }}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: 24, fontWeight: 950, letterSpacing: 5, textTransform: "uppercase", mb: 3 }}>
                Monstrino
              </Typography>
              <Typography sx={{ opacity: 0.4, fontSize: 14, lineHeight: 1.8, mb: 4, maxWidth: 300 }}>
                The world's most advanced archival platform for Monster High collectors. Built with modern infrastructure
                for high-integrity data preservation.
              </Typography>
              <Stack direction="row" spacing={2}>
                {[Globe, BarChart3, History].map((Icon, i) => (
                  <IconButton
                    key={i}
                    aria-label="Footer icon link"
                    sx={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                      opacity: 0.5,
                      "&:hover": { opacity: 1, borderColor: ACCENT },
                    }}
                  >
                    <Icon size={20} />
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  mb: 4,
                  color: ACCENT,
                }}
              >
                Database
              </Typography>
              <Stack spacing={2.5}>
                {[
                  { label: "Recent Releases", href: "/releases" },
                  { label: "Series Directory", href: "/series" },
                  { label: "Character Map", href: "/characters" },
                  { label: "SKU Search", href: "/search" },
                  { label: "Market Value History", href: "/market" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{ color: "white", textDecoration: "none", opacity: 0.4, fontSize: 13, "&:hover": { opacity: 1 } }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  mb: 4,
                  color: ACCENT,
                }}
              >
                Resources
              </Typography>
              <Stack spacing={2.5}>
                {[
                  { label: "Editorial Guidelines", href: "/about/editorial" },
                  { label: "Market API", href: "/api" },
                  { label: "Data Verification", href: "/about/verification" },
                  { label: "Archive Manifesto", href: "/about/manifesto" },
                  { label: "Brand History", href: "/history" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    sx={{ color: "white", textDecoration: "none", opacity: 0.4, fontSize: 13, "&:hover": { opacity: 1 } }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <GlassCard sx={{ p: 4, bgcolor: alpha(ACCENT, 0.02) }}>
                <Typography sx={{ fontWeight: 850, mb: 1.5, fontSize: 16 }}>Join the Collective</Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.5, mb: 3 }}>
                  Subscribe to receive data-driven reports on market trends and new archival entries.
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <InputBase
                    placeholder="Email address"
                    inputProps={{ "aria-label": "Email address" }}
                    sx={{
                      flex: 1,
                      bgcolor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 2,
                      px: 2,
                      fontSize: 14,
                      color: "white",
                    }}
                  />
                  <ButtonBase
                    component="button"
                    type="button"
                    aria-label="Join"
                    sx={{ bgcolor: "white", color: "black", fontWeight: 800, px: 3, py: 1, borderRadius: 2, fontSize: 12 }}
                  >
                    JOIN
                  </ButtonBase>
                </Box>
              </GlassCard>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <Typography sx={{ fontSize: 11, opacity: 0.3, letterSpacing: 1.5 }}>
              © 2026 MONSTRINO ARCHIVE PROJECT. SYSTEM: PRODUCTION V1.0.42. NOT AFFILIATED WITH MATTEL, INC.
            </Typography>

            <Stack direction="row" spacing={3} aria-label="Footer links">
              {[
                { label: "Terms", href: "/terms" },
                { label: "Privacy", href: "/privacy" },
                { label: "API Docs", href: "/api" },
                { label: "Changelog", href: "/changelog" },
              ].map((f) => (
                <Link
                  key={f.label}
                  href={f.href}
                  sx={{ color: "white", textDecoration: "none", opacity: 0.3, fontSize: 11, "&:hover": { opacity: 1 } }}
                >
                  {f.label}
                </Link>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage2;
