'use client';

import React, { useMemo, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ImageIconMui from "@mui/icons-material/Image";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIconMui from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIconMui from "@mui/icons-material/ShoppingBag";
import TrendingUpIconMui from "@mui/icons-material/TrendingUp";
import { useParams } from "@/shared/router";
import type { Series } from "../entities/series";
import { seriesIndexMock, seriesIndexByNumericId } from "@/data/real-data/seriesIndexMock";
import { ReleaseCardMinimal } from "@cards/release-card";
import { CharacterCard } from "@cards/character-card";
import { ReleaseBreadcrumb } from "@/widgets/navigation/breadcrumb";
import { Badge, Card, CardContent, Progress, Separator } from "@/shared/ui/release-hub";

// ============================================================
// DESIGN TOKENS — Monstrino Dark Archive Theme (Inlined)
// ============================================================
const tokens = {
  colors: {
    background: "hsl(240, 6%, 5%)",
    foreground: "hsl(0, 0%, 98%)",
    card: "hsl(240, 5%, 8%)",
    cardForeground: "hsl(0, 0%, 98%)",
    primary: "hsl(270, 25%, 60%)",
    primaryForeground: "hsl(0, 0%, 98%)",
    secondary: "hsl(240, 4%, 14%)",
    secondaryForeground: "hsl(0, 0%, 98%)",
    muted: "hsl(240, 4%, 14%)",
    mutedForeground: "hsl(240, 5%, 58%)",
    accent: "hsl(330, 25%, 75%)",
    accentForeground: "hsl(0, 0%, 98%)",
    border: "hsl(240, 4%, 18%)",
    ring: "hsl(270, 25%, 60%)",
    // Status colors
    green400: "hsl(142, 69%, 58%)",
    green500: "hsl(142, 71%, 45%)",
    green800: "hsl(142, 64%, 24%)",
    green900_30: "hsla(142, 64%, 24%, 0.3)",
    red400: "hsl(0, 84%, 60%)",
    red800: "hsl(0, 70%, 35%)",
    red900_30: "hsla(0, 70%, 35%, 0.3)",
  },
  radius: "0.5rem",
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    12: "3rem",
    16: "4rem",
    24: "6rem",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  },
};

const characterCardLayout = {
  cardSx: { width: "100%", maxWidth: 220, margin: "0 auto" },
  mediaSx: { height: 160 },
  contentSx: { pb: 2 },
};

const releaseCardLayout = {
  containerSx: { display: "flex", justifyContent: "center", height: "100%", minWidth: 0 },
  cardSx: { width: "100%", maxWidth: { xs: 180, sm: 220, md: 210, lg: 200 }, minWidth: 0 },
  imageSx: { paddingTop: { xs: "145%", md: "140%", lg: "135%" } },
  contentSx: { p: { xs: "0.6rem", md: "0.75rem" } },
};

// ============================================================
// MUI ICONS
// ============================================================
const CalendarIcon = CalendarMonthIcon;
const ImageIcon = ImageIconMui;
const DollarSignIcon = AttachMoneyIcon;
const UsersIcon = PeopleIcon;
const ShoppingBagIcon = ShoppingBagIconMui;
const TrendingUpIcon = TrendingUpIconMui;
const StarIcon = ({ sx, filled }: { sx?: SxProps<Theme>; filled?: boolean }) =>
  filled
    ? <StarIconMui {...(sx ? { sx } : {})} />
    : <StarBorderIcon {...(sx ? { sx } : {})} />;

// ============================================================
// INLINED UI COMPONENTS
// ============================================================

// Badge Component
const badgeVariantSx = {
  default: {
    backgroundColor: tokens.colors.primary,
    color: tokens.colors.primaryForeground,
  },
  secondary: {
    backgroundColor: tokens.colors.secondary,
    color: tokens.colors.secondaryForeground,
  },
  outline: {
    borderColor: tokens.colors.border,
    color: tokens.colors.foreground,
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colors.border}`,
  },
} as const;
const badgeBaseSx = {
  fontSize: tokens.fontSizes.xs,
  fontWeight: tokens.fontWeights.semibold,
  transition: "colors 0.15s",
};
const badgeProps = { variantSx: badgeVariantSx, baseSx: badgeBaseSx } as const;


// ============================================================
// PLACEHOLDER COMPONENTS
// ============================================================

// ============================================================
// SERIES DATA (resolved via index mock)
// ============================================================

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
const MonsterHighSeriesPage: React.FC = () => {
  const { internal_id, series_id, id } = useParams();
  const resolveParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);
  const resolvedId = resolveParam(internal_id) ?? resolveParam(series_id) ?? resolveParam(id) ?? "";
  const seriesData = useMemo<Series | null>(() => {
    if (!resolvedId) {
      return seriesIndexMock[0] ?? null;
    }
    const byNumeric = seriesIndexByNumericId.get(resolvedId);
    if (byNumeric) return byNumeric;
    const byId = seriesIndexMock.find((item) => item.id === resolvedId);
    return byId ?? null;
  }, [resolvedId]);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  if (!seriesData) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0B0D11",
          backgroundImage:
            'radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%), radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%), linear-gradient(180deg, #0B0D11 0%, #121622 100%)',
          color: tokens.colors.foreground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h1" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.bold, marginBottom: "0.5rem" }}>
            Series Not Found
          </Typography>
          <Typography sx={{ color: tokens.colors.mutedForeground }}>
            The series you're looking for doesn't exist in our archive.
          </Typography>
        </Box>
      </Box>
    );
  }

  const releaseYears = seriesData.releaseYears ?? seriesData.yearLabel ?? "Unknown";
  const generation = seriesData.generation ?? "G1";
  const description = seriesData.description ?? seriesData.concept ?? "";
  const dolls = seriesData.dolls ?? [];
  const characters = seriesData.characters ?? [];
  const pricing = seriesData.pricing ?? {
    msrpRange: "—",
    currentMarketRange: "—",
    rarityDistribution: { common: 0, rare: 0, ultraRare: 0 },
    demandLevel: "—",
  };
  const community = {
    quotes: seriesData.community?.quotes ?? [],
    legacySummary: seriesData.community?.legacySummary ?? "",
    rating: seriesData.community?.rating ?? 0,
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundColor: "#0B0D11",
      backgroundImage:
        'radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%), radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%), linear-gradient(180deg, #0B0D11 0%, #121622 100%)',
      color: tokens.colors.foreground,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      {/* Breadcrumb */}
      <Box sx={{
        position: "relative",
        padding: isLg ? `1rem ${tokens.spacing[24]} 0` : isMd ? `0.75rem ${tokens.spacing[8]} 0` : `0.5rem ${tokens.spacing[4]} 0`,
      }}>
        <Box sx={{ maxWidth: "80rem", margin: "0 auto" }}>
          <ReleaseBreadcrumb
            items={[
              { label: "Release Hub", link: "/" },
              { label: "Series", link: "/catalog/s" },
              { label: seriesData.name },
            ]}
            colors={{
              background: tokens.colors.background,
              foreground: tokens.colors.foreground,
              mutedForeground: tokens.colors.mutedForeground,
            }}
          />
        </Box>
      </Box>

      {/* Hero Header */}
      <Box component="header" sx={{
        position: "relative",
        padding: isLg ? `${tokens.spacing[4]} ${tokens.spacing[24]} ${tokens.spacing[12]}` : isMd ? `${tokens.spacing[3]} ${tokens.spacing[8]} ${tokens.spacing[8]}` : `${tokens.spacing[2]} ${tokens.spacing[4]} ${tokens.spacing[6]}`,
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}>
        <Box sx={{ maxWidth: "80rem", margin: "0 auto" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: isMd ? "0.75rem" : "0.5rem", marginBottom: isMd ? "1rem" : "0.75rem" }}>
            <Badge
              variant="outline"
              {...badgeProps}
              sx={{ color: tokens.colors.primary, borderColor: tokens.colors.primary }}
            >
              {generation}
            </Badge>
            <Typography component="span" sx={{ color: tokens.colors.mutedForeground, fontSize: tokens.fontSizes.sm, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <CalendarIcon style={{ width: "0.875rem", height: "0.875rem" }} />
              {releaseYears}
            </Typography>
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: tokens.fontSizes["2xl"],
                sm: tokens.fontSizes["4xl"],
                md: tokens.fontSizes["5xl"],
                lg: tokens.fontSizes["6xl"],
              },
              fontWeight: tokens.fontWeights.bold,
              letterSpacing: "-0.025em",
              marginBottom: isMd ? "0.5rem" : "0.375rem",
              lineHeight: tokens.lineHeights.tight,
            }}
          >
            {seriesData.name}
          </Typography>
          <Typography sx={{ color: tokens.colors.mutedForeground, fontSize: isMd ? tokens.fontSizes.lg : tokens.fontSizes.base, maxWidth: "42rem" }}>
            Monster High {generation} • Collector Archive
          </Typography>
          {description && (
            <Typography
              sx={{
                color: tokens.colors.mutedForeground,
                fontSize: isMd ? tokens.fontSizes.base : tokens.fontSizes.sm,
                lineHeight: tokens.lineHeights.relaxed,
                maxWidth: "48rem",
                mt: "0.75rem",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {/* Subtle gradient overlay */}
        <Box sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, ${tokens.colors.primary}0D, transparent)`,
          pointerEvents: "none",
        }} />
      </Box>

      <Box component="main" sx={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: isLg ? `${tokens.spacing[12]} ${tokens.spacing[24]}` : isMd ? `${tokens.spacing[8]} ${tokens.spacing[8]}` : `${tokens.spacing[6]} ${tokens.spacing[4]}`,
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: isMd ? tokens.spacing[16] : tokens.spacing[8] }}>
          {/* Doll Releases Grid */}
          <Box component="section">
            <Box sx={{ marginBottom: isMd ? tokens.spacing[6] : tokens.spacing[4] }}>
              <Typography variant="h2" sx={{ fontSize: isMd ? tokens.fontSizes["2xl"] : tokens.fontSizes.xl, fontWeight: tokens.fontWeights.semibold, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <ShoppingBagIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
                Doll Releases
                <Typography component="span" sx={{ color: tokens.colors.mutedForeground, fontSize: isMd ? tokens.fontSizes.base : tokens.fontSizes.sm, fontWeight: tokens.fontWeights.normal, marginLeft: "0.5rem" }}>
                  ({dolls.length} dolls)
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: {
                xs: "repeat(auto-fit, minmax(150px, 1fr))",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: isMd ? "1rem" : "0.5rem",
              width: "100%",
              overflow: "hidden",
              justifyItems: "center",
            }}>
              {dolls.map((doll) => (
                <ReleaseCardMinimal
                  key={doll.id}
                  doll={doll}
                  isHovered={hoveredCard === doll.id}
                  onMouseEnter={() => setHoveredCard(doll.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  containerSx={releaseCardLayout.containerSx}
                  cardSx={releaseCardLayout.cardSx}
                  imageSx={releaseCardLayout.imageSx}
                  contentSx={releaseCardLayout.contentSx}
                />
              ))}
            </Box>
          </Box>

          {/* Characters Featured */}
          <Box component="section">
            <Box sx={{ marginBottom: isMd ? tokens.spacing[6] : tokens.spacing[4] }}>
              <Typography variant="h2" sx={{ fontSize: isMd ? tokens.fontSizes["2xl"] : tokens.fontSizes.xl, fontWeight: tokens.fontWeights.semibold, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <UsersIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
                Characters Featured
                <Typography component="span" sx={{ color: tokens.colors.mutedForeground, fontSize: isMd ? tokens.fontSizes.base : tokens.fontSizes.sm, fontWeight: tokens.fontWeights.normal, marginLeft: "0.5rem" }}>
                  ({characters.length} characters)
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: isMd ? "1rem" : "0.5rem",
              width: "100%",
              overflow: "hidden",
              justifyItems: "center",
            }}>
              {characters.map((char) => (
                <CharacterCard
                  key={char.id}
                  {...char}
                  cardSx={characterCardLayout.cardSx}
                  mediaSx={characterCardLayout.mediaSx}
                  contentSx={characterCardLayout.contentSx}
                />
              ))}
            </Box>
          </Box>

          {/* Exclusives & Regional */}
          {/* <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPinIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Exclusives & Regional Releases
            </Typography>
            <Card style={{ overflow: "hidden" }}>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderBottom: `1px solid ${tokens.colors.border}` }}>
                    <TableHead>Doll</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exclusives.map((exc, idx) => (
                    <TableRow key={idx}>
                      <TableCell style={{ fontWeight: tokens.fontWeights.medium }}>{exc.doll}</TableCell>
                      <TableCell>
                        <Badge variant="outline" style={{ borderColor: `${tokens.colors.primary}80`, color: tokens.colors.primary }}>
                          {exc.type}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ color: tokens.colors.mutedForeground }}>{exc.region}</TableCell>
                      <TableCell style={{ color: tokens.colors.mutedForeground }}>{exc.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Box> */}

          {/* Distribution & Market */}
          {/* <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <GlobeIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Distribution & Market
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${distributionGridCols}, 1fr)`, gap: tokens.spacing[6] }}>
              <Card>
                <CardHeader style={{ paddingBottom: "0.75rem" }}>
                  <CardTitle style={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground }}>Target Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {distribution.targetMarket.map((market) => (
                      <Badge key={market} variant="secondary">{market}</Badge>
                    ))}
                  </Box>
                </CardContent>
              </Card>
              <Card>
                <CardHeader style={{ paddingBottom: "0.75rem" }}>
                  <CardTitle style={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground }}>Distribution Channels</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {distribution.channels.map((channel) => (
                      <Badge key={channel} variant="secondary">{channel}</Badge>
                    ))}
                  </Box>
                </CardContent>
              </Card>
              <Card>
                <CardHeader style={{ paddingBottom: "0.75rem" }}>
                  <CardTitle style={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground }}>Regions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {distribution.regions.map((region) => (
                      <Badge key={region} variant="outline" style={{ borderColor: tokens.colors.border }}>{region}</Badge>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box> */}

          {/* Related Series */}
          {/* <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ChevronRightIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Related Series
            </Typography>
            <ScrollArea style={{ width: "100%" }}>
              <Box sx={{ display: "flex", gap: "1rem", paddingBottom: "1rem" }}>
                {relatedSeries.map((series) => (
                  <Card
                    key={series.title}
                    onMouseEnter={() => setHoveredRelatedSeries(series.title)}
                    onMouseLeave={() => setHoveredRelatedSeries(null)}
                    style={{
                      minWidth: "240px",
                      cursor: "pointer",
                      transition: "border-color 0.15s",
                      borderColor: hoveredRelatedSeries === series.title ? `${tokens.colors.primary}80` : tokens.colors.border,
                    }}
                  >
                    <CardContent style={{ padding: "1rem" }}>
                      <Box sx={{ aspectRatio: "16/9", backgroundColor: `${tokens.colors.secondary}4D`, borderRadius: "0.375rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <SparklesIcon style={{ width: "2rem", height: "2rem", color: `${tokens.colors.mutedForeground}80` }} />
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: tokens.fontWeights.semibold, color: tokens.colors.foreground }}>{series.title}</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                        <Badge variant="outline" style={{ color: tokens.colors.primary, borderColor: tokens.colors.primary, fontSize: "10px" }}>
                          {series.generation}
                        </Badge>
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground }}>{series.relationship}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </ScrollArea>
          </Box> */}

          {/* Related Media */}
          {/* <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FilmIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Related Media
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${mediaGridCols}, 1fr)`, gap: "1rem" }}>
              {relatedMedia.map((media) => (
                <Card
                  key={media.title}
                  onMouseEnter={() => setHoveredMedia(media.title)}
                  onMouseLeave={() => setHoveredMedia(null)}
                  style={{
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                    borderColor: hoveredMedia === media.title ? `${tokens.colors.primary}80` : tokens.colors.border,
                  }}
                >
                  <CardContent style={{ padding: "1rem" }}>
                    <Box sx={{
                      aspectRatio: "16/9",
                      backgroundColor: hoveredMedia === media.title ? `${tokens.colors.secondary}80` : `${tokens.colors.secondary}4D`,
                      borderRadius: "0.375rem",
                      marginBottom: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background-color 0.15s",
                    }}>
                      <PlayIcon style={{
                        width: "2rem",
                        height: "2rem",
                        color: hoveredMedia === media.title ? tokens.colors.primary : `${tokens.colors.mutedForeground}80`,
                        transition: "color 0.15s",
                      }} />
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: tokens.fontWeights.semibold, color: tokens.colors.foreground }}>{media.title}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                      <Badge
                        variant="secondary"
                        style={
                          media.type === "Movie" ? { backgroundColor: `${tokens.colors.primary}33`, color: tokens.colors.primary } :
                          media.type === "Webisode" ? { backgroundColor: `${tokens.colors.accent}33`, color: tokens.colors.accent } :
                          { backgroundColor: tokens.colors.secondary }
                        }
                      >
                        {media.type}
                      </Badge>
                      <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground }}>{media.year}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box> */}

          {/* Image Gallery */}
          {/* <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ImageIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Gallery
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${galleryGridCols}, 1fr)`, gap: "1rem" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                <Box
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  onMouseEnter={() => setHoveredGallery(idx)}
                  onMouseLeave={() => setHoveredGallery(null)}
                  sx={{
                    aspectRatio: "1/1",
                    backgroundColor: `${tokens.colors.secondary}4D`,
                    borderRadius: tokens.radius,
                    border: `1px solid ${hoveredGallery === idx ? `${tokens.colors.primary}80` : tokens.colors.border}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.15s",
                  }}
                >
                  <ImageIcon style={{
                    width: "2rem",
                    height: "2rem",
                    color: hoveredGallery === idx ? `${tokens.colors.mutedForeground}80` : `${tokens.colors.mutedForeground}4D`,
                    transition: "color 0.15s",
                  }} />
                </Box>
              ))}
            </Box>
          </Box> */}

          {/* Price & Rarity Overview */}
          <Box component="section">
            <Box sx={{ marginBottom: isMd ? tokens.spacing[6] : tokens.spacing[4] }}>
              <Typography variant="h2" sx={{ fontSize: isMd ? tokens.fontSizes["2xl"] : tokens.fontSizes.xl, fontWeight: tokens.fontWeights.semibold, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <DollarSignIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
                Price & Rarity Overview
              </Typography>
            </Box>
            <Card>
              <CardContent contentSx={{ paddingTop: isMd ? tokens.spacing[6] : tokens.spacing[4] }}>
                <Box sx={{ 
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(4, minmax(0, 1fr))",
                  },
                  gap: isMd ? tokens.spacing[6] : tokens.spacing[4],
                }}>
                  <Box>
                    <Typography sx={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground, marginBottom: "0.25rem" }}>Original MSRP</Typography>
                    <Typography sx={{ fontSize: tokens.fontSizes.xl, fontWeight: tokens.fontWeights.semibold }}>{pricing.msrpRange}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground, marginBottom: "0.25rem" }}>Current Market Value</Typography>
                    <Typography sx={{ fontSize: tokens.fontSizes.xl, fontWeight: tokens.fontWeights.semibold, color: tokens.colors.primary }}>{pricing.currentMarketRange}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground, marginBottom: "0.25rem" }}>Collector Demand</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <TrendingUpIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.green500 }} />
                      <Typography component="span" sx={{ fontSize: tokens.fontSizes.xl, fontWeight: tokens.fontWeights.semibold, color: tokens.colors.green500 }}>{pricing.demandLevel}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground, marginBottom: "0.75rem" }}>Rarity Distribution</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "4rem" }}>Common</Typography>
                        <Progress value={pricing.rarityDistribution.common} trackSx={{ height: "0.5rem", flex: 1 }} />
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "2rem" }}>{pricing.rarityDistribution.common}%</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "4rem" }}>Rare</Typography>
                        <Progress value={pricing.rarityDistribution.rare} trackSx={{ height: "0.5rem", flex: 1 }} />
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "2rem" }}>{pricing.rarityDistribution.rare}%</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "4rem" }}>Ultra Rare</Typography>
                        <Progress value={pricing.rarityDistribution.ultraRare} trackSx={{ height: "0.5rem", flex: 1 }} />
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "2rem" }}>{pricing.rarityDistribution.ultraRare}%</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Facts & Behind-the-Scenes */}
          {/* <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <InfoIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Facts & Behind-the-Scenes
            </Typography>
            <Accordion type="single" collapsible style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {facts.map((fact, idx) => (
                <AccordionItem
                  key={idx}
                  value={`fact-${idx}`}
                  style={{
                    backgroundColor: tokens.colors.card,
                    border: `1px solid ${tokens.colors.border}`,
                    borderRadius: tokens.radius,
                    padding: "0 1rem",
                  }}
                >
                  <AccordionTrigger>
                    {fact.title}
                  </AccordionTrigger>
                  <AccordionContent style={{ color: tokens.colors.mutedForeground }}>
                    {fact.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Box> */}

          {/* Community Reception & Legacy */}
          <Box component="section" sx={{ paddingBottom: isMd ? tokens.spacing[8] : tokens.spacing[4] }}>
            <Box sx={{ marginBottom: isMd ? tokens.spacing[6] : tokens.spacing[4] }}>
              <Typography variant="h2" sx={{ fontSize: isMd ? tokens.fontSizes["2xl"] : tokens.fontSizes.xl, fontWeight: tokens.fontWeights.semibold, display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <StarIcon sx={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
                Community Reception & Legacy
              </Typography>
            </Box>
            <Card>
              <CardContent contentSx={{ paddingTop: isMd ? tokens.spacing[6] : tokens.spacing[4], display: "flex", flexDirection: "column", gap: isMd ? tokens.spacing[6] : tokens.spacing[4] }}>
                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", rowGap: "0.5rem" }}>
                  <Box sx={{ display: "flex" }}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFull = star <= Math.floor(community.rating);
                      const isHalf = !isFull && star <= community.rating;
                      return (
                        <StarIcon
                          key={star}
                          filled={isFull || isHalf}
                          sx={{
                            width: "1.25rem",
                            height: "1.25rem",
                            color: isFull || isHalf ? tokens.colors.primary : tokens.colors.mutedForeground,
                            opacity: isHalf ? 0.5 : 1,
                          }}
                        />
                      );
                    })}
                  </Box>
                  <Typography component="span" sx={{ fontSize: tokens.fontSizes.lg, fontWeight: tokens.fontWeights.semibold }}>{community.rating}</Typography>
                  <Typography component="span" sx={{ color: tokens.colors.mutedForeground }}>/ 5 Collector Score</Typography>
                </Box>

                <Separator />

                {/* Quotes */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <Typography variant="h3" sx={{ fontSize: tokens.fontSizes.sm, fontWeight: tokens.fontWeights.medium, color: tokens.colors.mutedForeground }}>Community Highlights</Typography>
                  {community.quotes.map((quote, idx) => (
                    <Box component="blockquote" key={idx} sx={{ borderLeft: `2px solid ${tokens.colors.primary}`, paddingLeft: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
                      <Typography sx={{ color: tokens.colors.foreground, fontStyle: "italic" }}>"{quote.text}"</Typography>
                      <Typography component="cite" sx={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground, fontStyle: "normal" }}>— {quote.author}</Typography>
                    </Box>
                  ))}
                </Box>

                <Separator />

                {/* Legacy */}
                <Box>
                  <Typography variant="h3" sx={{ fontSize: tokens.fontSizes.sm, fontWeight: tokens.fontWeights.medium, color: tokens.colors.mutedForeground, marginBottom: "0.5rem" }}>Legacy</Typography>
                  <Typography sx={{ color: tokens.colors.mutedForeground, lineHeight: tokens.lineHeights.relaxed }}>
                    {community.legacySummary}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

        </Box>
      </Box>

      {/* Lightbox placeholder */}
      {selectedImage && (
        <Box
          onClick={() => setSelectedImage(null)}
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: `${tokens.colors.background}F2`,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: isMd ? tokens.spacing[8] : tokens.spacing[4],
          }}
        >
          <Box sx={{
            width: "100%",
            maxWidth: "48rem",
            aspectRatio: "1/1",
            backgroundColor: `${tokens.colors.secondary}4D`,
            borderRadius: tokens.radius,
            border: `1px solid ${tokens.colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <ImageIcon style={{ width: "4rem", height: "4rem", color: `${tokens.colors.mutedForeground}4D` }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MonsterHighSeriesPage;
