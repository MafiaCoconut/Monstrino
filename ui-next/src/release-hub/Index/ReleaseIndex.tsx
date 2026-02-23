'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from '@/shared/router';
import { mergeSx } from '@/shared/ui/mergeSx';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Rating,
  Collapse,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  ChevronRight,
  Star,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  PlayArrow,
  OpenInNew,
  ExpandMore,
  Collections,
  Brush,
  School,
  People,
  LocalOffer,
  Checkroom,
  History,
} from '@mui/icons-material';
import type { Release } from '../entities/release';
import type { CharacterId, CharacterSummary, HexColor } from '../entities';
import { releaseIndexMock } from '@/data/real-data/releaseIndexMock';
import { characterIndexMockById } from '@/data/real-data/CharacterIndexMock';
import { ReleaseBreadcrumb } from '@/widgets/navigation/breadcrumb';
import { CharacterCard } from '@cards/character-card';
import { PetCardSimple } from '@cards/pet-card';
import { MarketOffers, MarketOverview, type MarketCountry, type MarketOffer } from '@/widgets/market';

// Color palette
const colors = {
  bg: '#0a0a0a',
  bgLight: '#111111',
  card: '#1a1a1a',
  cardBorder: '#2a2a2a',
  pink: '#ec4899',
  pinkDark: '#be185d',
  textPrimary: '#ffffff',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',
  green: '#22c55e',
  red: '#ef4444',
  purple: '#a855f7',
  blue: '#3b82f6',
  orange: '#f97316',
  yellow: '#eab308',
  cyan: '#06b6d4',
};

const characterAccentPalette: HexColor[] = [
  '#ec4899',
  '#a855f7',
  '#3b82f6',
  '#f97316',
  '#22c55e',
  '#06b6d4',
];

const segmentTitleSx = {
  fontSize: { xs: 18, sm: 20, md: 22 },
  fontWeight: 700,
  color: colors.textPrimary,
  letterSpacing: '-0.01em',
} as const;

const releaseCharacterCardLayout = {
  cardSx: { width: '100%', maxWidth: 210, margin: '0 auto' },
  mediaSx: { height: 150 },
  contentSx: { pb: 1.5 },
};

const releasePetCardLayout = {
  cardSx: { width: '100%', maxWidth: 210, margin: '0 auto' },
  mediaSx: { height: 150 },
  contentSx: { pb: 1.5 },
};

const sectionCardSx: SxProps<Theme> = {
  backgroundColor: colors.card,
  borderRadius: { xs: 1.5, md: 2 },
  border: `1px solid ${colors.cardBorder}`,
  p: { xs: 2, md: 3 },
};

const msrpLayout = {
  gridSx: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, minmax(0, 1fr))',
      md: 'repeat(3, minmax(0, 1fr))',
      lg: 'repeat(4, minmax(0, 1fr))',
    },
    gap: { xs: 1, sm: 1.5 },
    justifyContent: 'start',
  },
  itemSx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: { xs: 1, sm: 1.25 },
    p: { xs: 1.5, sm: 2 },
    width: '100%',
    minWidth: 0,
    backgroundColor: colors.bgLight,
    borderRadius: 2,
    overflow: 'hidden',
    '&:hover': { backgroundColor: `${colors.pink}20` },
    transition: 'background-color 0.2s',
  },
};

const accessoryCardLayout = {
  cardSx: { maxWidth: { xs: '100%', sm: 220 }, margin: '0 auto' },
  imageSx: { aspectRatio: '1' },
  contentSx: { p: { xs: 1.5, md: 2 } },
};

const infoCardLayout = {
  cardSx: sectionCardSx,
};

const marketCardLayout = {
  statCardSx: { p: 1.5 },
  noticeCardSx: { p: 2 },
  offerCardSx: { p: 2 },
};

const sectionGridSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(2, minmax(0, 1fr))',
    sm: 'repeat(3, minmax(0, 1fr))',
    md: 'repeat(3, minmax(0, 1fr))',
    lg: 'repeat(4, minmax(0, 1fr))',
  },
  justifyContent: 'start',
  gap: { xs: 1, md: 1.5 },
  mt: { xs: 2, md: 3 },
};

const ReleasePage = () => {
  const { internal_id, release_id, id } = useParams();
  const resolvedId = internal_id ?? release_id ?? id ?? '';
  const releaseData: Release = useMemo(() => {
    if (resolvedId) {
      const match = releaseIndexMock.find((release) => `${release.id}` === `${resolvedId}`);
      if (match) return match;
    }
    return releaseIndexMock[0] ?? ({} as Release);
  }, [resolvedId]);
  const primarySeries = releaseData.series?.[0];
  // Header Component

// Hero Section Component
  const HeroSection = () => (
  <Box sx={{ pt: { xs: 1, md: 2 }, pb: 0 }}>
    <Typography
      component="h1"
      sx={{
        fontSize: { xs: 24, sm: 32, md: 42 },
        fontWeight: 700,
        color: colors.textPrimary,
        mb: 0.5,
        lineHeight: 1.2,
      }}
    >
      {releaseData.name}
    </Typography>
    <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: colors.textSecondary, mb: { xs: 2, md: 2 }, lineHeight: 1.5 }}>
      {releaseData.subtitle}
    </Typography>

    <Box sx={{ display: 'flex', gap: { xs: 1, md: 1.5 }, mb: { xs: 1.5, md: 2 }, flexWrap: 'wrap' }}>
      {(releaseData.badges ?? []).map((badge) => (
        <Chip
          key={badge.label}
          label={badge.label}
          {...(badge.variant === 'outlined' ? { variant: 'outlined' } : {})}
          sx={{
            backgroundColor: badge.variant === 'outlined' ? 'transparent' : `${badge.color ?? colors.pink}20`,
            borderColor: badge.color ?? colors.pink,
            color: badge.color ?? colors.pink,
            fontWeight: 600,
            fontSize: 12,
            height: 28,
          }}
        />
      ))}
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 }, mb: { xs: 1, md: 1.5 }, flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: 13, color: colors.textMuted }}>Released</Typography>
        <Typography sx={{ fontSize: 13, color: colors.textSecondary }}>
          {releaseData.releaseDateLabel}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: 13, color: colors.textMuted }}>SKU</Typography>
        <Typography sx={{ fontSize: 13, color: colors.textSecondary }}>{releaseData.sku}</Typography>
      </Box>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: releaseData.stockStatus === 'in_stock' ? colors.green : colors.red,
          }}
        />
        <Typography
          sx={{
            fontSize: 13,
            color: releaseData.stockStatus === 'in_stock' ? colors.green : colors.red,
          }}
        >
          {releaseData.stockStatusLabel}
        </Typography>
      </Box> */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Star sx={{ fontSize: 16, color: '#fbbf24' }} />
        <Typography sx={{ fontSize: 13, color: colors.textSecondary }}>
          {releaseData.rating?.average}
        </Typography>
        <Typography sx={{ fontSize: 13, color: colors.textMuted }}>
          ({releaseData.rating?.count} reviews)
        </Typography>
      </Box>
    </Box>

    {/* ACTUAL NOT NEEDED BUT WILL BE NEEDED IN THE FUTURE */}
    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, flexWrap: 'wrap' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: colors.pink,
          color: colors.textPrimary,
          textTransform: 'none',
          fontWeight: 600,
          px: { xs: 2, md: 3 },
          py: { xs: 0.75, md: 1 },
          fontSize: { xs: 13, md: 14 },
          '&:hover': { backgroundColor: colors.pinkDark },
        }}
      >
        Add to Collection
      </Button>
      <IconButton
        sx={{
          border: `1px solid ${colors.cardBorder}`,
          color: colors.textSecondary,
          '&:hover': { backgroundColor: colors.card },
        }}
      >
        <Bookmark />
      </IconButton>
      <IconButton
        sx={{
          border: `1px solid ${colors.cardBorder}`,
          color: colors.textSecondary,
          '&:hover': { backgroundColor: colors.card },
        }}
      >
        <Share />
      </IconButton>
    </Box> */}
  </Box>
  );

// MSRP Overview Component
  const MsrpOverview = () => {
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const regions = releaseData.pricing?.regions ?? [];
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridLayout, setGridLayout] = useState({ columns: 1 });
  const minCardWidth = 200;
  const cardGap = 12;
  const defaultRows = 2;
  const maxVisible = showAll ? regions.length : Math.max(gridLayout.columns * defaultRows, 1);
  const displayedRegions = expanded
    ? showAll
      ? regions
      : regions.slice(0, maxVisible)
    : regions.slice(0, Math.max(gridLayout.columns, 1));
  const hasMore = regions.length > maxVisible;

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return undefined;

    const updateColumns = () => {
      const width = node.clientWidth;
      if (!width) return;
      const cols = Math.max(1, Math.floor((width + cardGap) / (minCardWidth + cardGap)));
      setGridLayout((prev) => (prev.columns === cols ? prev : { columns: cols }));
    };

    updateColumns();
    const observer = new ResizeObserver(() => updateColumns());
    observer.observe(node);
    return () => observer.disconnect();
  }, [minCardWidth]);

  useEffect(() => {
    if (!expanded && showAll) {
      setShowAll(false);
    }
  }, [expanded, showAll]);

  return (
    <Box sx={sectionCardSx}>
      <Box
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, cursor: 'pointer' }}
      >
        <LocalOffer sx={{ fontSize: 18, color: colors.pink }} />
        <Typography sx={segmentTitleSx}>
          MSRP - Manufacturer's Suggested Retail Price
        </Typography>
        {hasMore && (
          <Chip
            label={`${regions.length} regions`}
            size="small"
            sx={{
              backgroundColor: colors.bgLight,
              color: colors.textMuted,
              fontSize: 11,
              height: 22,
            }}
          />
        )}
        <IconButton
          size="small"
          aria-label={expanded ? 'Collapse section' : 'Expand section'}
          onClick={(event) => {
            event.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          sx={{ marginLeft: 'auto', color: colors.textMuted }}
        >
          <ExpandMore
            sx={{
              fontSize: 20,
              transition: 'transform 0.2s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </IconButton>
      </Box>
      <Collapse in={expanded} unmountOnExit>
        <Typography sx={{ fontSize: 11, color: colors.textMuted, mb: 2, fontStyle: 'italic' }}>
          Informational purposes only. Actual retail prices may vary by retailer and region.
        </Typography>
        <Box
          ref={gridRef}
          sx={{
            ...msrpLayout.gridSx,
            gridTemplateColumns: `repeat(${gridLayout.columns}, minmax(0, 1fr))`,
            gap: `${cardGap}px`,
          }}
        >
          {displayedRegions.map((region) => (
            <Box key={region.code} sx={msrpLayout.itemSx}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.25 } }}>
                <Typography sx={{ fontSize: { xs: 24, sm: 28 } }}>{region.flag}</Typography>
                <Box>
                  <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600, color: colors.textPrimary }}>{region.code}</Typography>
                  <Typography sx={{ fontSize: { xs: 9, sm: 10 }, color: colors.textMuted }}>MSRP</Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: 18, sm: 20 },
                  fontWeight: 700,
                  color: colors.pink,
                  marginLeft: 'auto',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                {region.currency}{region.msrp}
              </Typography>
            </Box>
          ))}
        </Box>
        {hasMore && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              onClick={() => setShowAll(!showAll)}
              sx={{
                textTransform: 'none',
                color: colors.pink,
                fontSize: 12,
                fontWeight: 600,
                minWidth: 'auto',
                px: 1,
                '&:hover': { backgroundColor: colors.pink + '20' },
              }}
              endIcon={showAll ? <KeyboardArrowUp /> : <ExpandMore />}
            >
              {showAll ? 'Show Less' : `Show ${Math.max(regions.length - maxVisible, 0)} More`}
            </Button>
          </Box>
        )}
      </Collapse>
    </Box>
  );
  };

// Releases & Reissues Component
  const ReleasesReissues = () => {
  const [expanded, setExpanded] = useState(false);

  const releases = releaseData.variants ?? [];

  const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
    current: { bg: `${colors.pink}20`, color: colors.pink, label: 'Viewing' },
    available: { bg: `${colors.green}20`, color: colors.green, label: 'Available' },
    upcoming: { bg: `${colors.blue}20`, color: colors.blue, label: 'Coming Soon' },
    discontinued: { bg: `${colors.textMuted}20`, color: colors.textMuted, label: 'Discontinued' },
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: 2,
        border: `1px solid ${colors.cardBorder}`,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <History sx={{ fontSize: 18, color: colors.pink }} />
          <Typography sx={segmentTitleSx}>
            Releases & Variants
          </Typography>
          <Chip
            label={`${releases.length} related`}
            size="small"
            sx={{
              backgroundColor: colors.bgLight,
              color: colors.textMuted,
              fontSize: 11,
              height: 22,
            }}
          />
        </Box>
        {expanded ? (
          <KeyboardArrowUp sx={{ color: colors.textMuted }} />
        ) : (
          <ExpandMore sx={{ color: colors.textMuted }} />
        )}
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ mt: 3 }}>
          {/* Timeline */}
          <Box sx={{ position: 'relative', pl: 3 }}>
            {releases.map((release, index) => (
              <Box
                key={release.sku ?? `${release.name}-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  pb: index < releases.length - 1 ? 3 : 0,
                  position: 'relative',
                }}
              >
                {/* Timeline connector */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: -19,
                    top: 0,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: release.status === 'current' ? colors.pink : colors.cardBorder,
                    border: `2px solid ${release.status === 'current' ? colors.pink : colors.textMuted}`,
                  }}
                />
                {index < releases.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -15,
                      top: 14,
                      width: 2,
                      height: 'calc(100% - 10px)',
                      backgroundColor: colors.cardBorder,
                    }}
                  />
                )}

                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                    <Chip
                      label={release.type}
                      size="small"
                      sx={{
                        backgroundColor: `${colors.purple}20`,
                        color: colors.purple,
                        fontSize: 10,
                        height: 20,
                      }}
                    />
                    <Chip
                      label={statusStyles[release.status]?.label ?? release.status}
                      size="small"
                      sx={{
                        backgroundColor: statusStyles[release.status]?.bg ?? `${colors.textMuted}20`,
                        color: statusStyles[release.status]?.color ?? colors.textMuted,
                        fontSize: 10,
                        height: 20,
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: release.status === 'current' ? 600 : 400,
                      color: release.status === 'current' ? colors.textPrimary : colors.textSecondary,
                      cursor: release.status !== 'current' ? 'pointer' : 'default',
                      '&:hover': release.status !== 'current' ? { color: colors.pink } : {},
                    }}
                  >
                    {release.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: colors.textMuted }}>
                    {release.year} • {release.sku}
                  </Typography>
                </Box>

                {release.status !== 'current' && (
                  <IconButton size="small" sx={{ color: colors.textMuted }}>
                    <OpenInNew sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
  };

// Gallery Thumbnails Component
  const GalleryThumbnails = ({ 
    images, 
    currentImage, 
    onImageClick 
  }: { 
    images: Array<{ src: string; thumbnailSrc?: string; alt?: string }>;
    currentImage: number;
    onImageClick: (index: number) => void;
  }) => {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          gap: { xs: 0.5, md: 1 }, 
          mt: { xs: 1, md: 2 }, 
          overflowX: 'auto',
          overflowY: 'hidden',
          pb: 0.5, 
          width: '100%',
          // Стили для скроллбара
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: colors.cardBorder,
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.pink,
            borderRadius: 3,
            '&:hover': {
              backgroundColor: colors.pinkDark,
            },
          },
          // Для Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.pink} ${colors.cardBorder}`,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            onClick={() => onImageClick(index)}
            sx={{
              width: { xs: 56, sm: 64, md: 72 },
              height: { xs: 56, sm: 64, md: 72 },
              minWidth: { xs: 56, sm: 64, md: 72 },
              flex: '0 0 auto',
              backgroundColor: '#ffffff',
              borderRadius: 1,
              border: `2px solid ${index === currentImage ? colors.pink : colors.cardBorder}`,
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s, transform 0.2s',
              '&:hover': {
                borderColor: colors.pink,
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box
              component="img"
              src={image.thumbnailSrc ?? image.src}
              alt={`Thumbnail ${index + 1}`}
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        ))}
      </Box>
    );
  };

// Image Gallery Component
  const ImageGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = releaseData.gallery ?? [];

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${colors.cardBorder}`,
        }}
      >
        <Box
          component="img"
          src={images[currentImage]?.src}
          alt={images[currentImage]?.alt ?? 'Release'}
          sx={{
            width: '80%',
            height: '80%',
            objectFit: 'contain',
          }}
        />

        <IconButton
          onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: `${colors.bg}cc`,
            color: colors.textPrimary,
            '&:hover': { backgroundColor: colors.bg },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          onClick={() => setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: `${colors.bg}cc`,
            color: colors.textPrimary,
            '&:hover': { backgroundColor: colors.bg },
          }}
        >
          <ChevronRight />
        </IconButton>

        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImage(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === currentImage ? colors.pink : colors.textMuted,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            />
          ))}
        </Box>
      </Box>

      <GalleryThumbnails 
        images={images}
        currentImage={currentImage}
        onImageClick={setCurrentImage}
      />
    </Box>
  );
  };

// General Info Card Component (Two Columns)
  const GeneralInfoCard = ({
    data,
    cardSx,
  }: {
    data: typeof releaseData.generalInfo;
    cardSx?: SxProps<Theme>;
  }) => {
    if (!data) return null;
    const [open, setOpen] = useState(true);
    
    return (
      <Box
        sx={mergeSx(sectionCardSx, cardSx)}
      >
        <Box
          onClick={() => setOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setOpen((prev) => !prev);
            }
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: { xs: 2, md: 3 },
            cursor: 'pointer',
          }}
        >
          <Typography sx={segmentTitleSx}>
            {data.title}
          </Typography>
          <IconButton
            size="small"
            aria-label={open ? 'Collapse section' : 'Expand section'}
            sx={{ color: colors.textMuted }}
          >
            <ExpandMore
              sx={{
                fontSize: 20,
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </IconButton>
        </Box>
        <Collapse in={open}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }, gap: { xs: 3, md: 4 } }}>
            {data.columns.map((column, colIndex) => (
              <Box key={colIndex}>
                {column.items.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <Box
                      sx={{
                        py: 1.5,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        justifyContent: 'space-between',
                        gap: { xs: 0.5, sm: 2 },
                      }}
                    >
                      <Typography sx={{ fontSize: 14, color: colors.textMuted }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: 14, color: colors.textSecondary, fontWeight: 500, textAlign: { xs: 'left', sm: 'right' } }}>
                        {item.value}
                      </Typography>
                    </Box>
                    {index < column.items.length - 1 && <Divider sx={{ borderColor: colors.cardBorder }} />}
                  </React.Fragment>
                ))}
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>
    );
  };

// Product Details Card Component (Sections)
  const ProductDetailsCard = ({
    data,
    cardSx,
  }: {
    data: typeof releaseData.productDetails;
    cardSx?: SxProps<Theme>;
  }) => {
    if (!data) return null;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [open, setOpen] = useState(!isMobile);
    
    useEffect(() => {
      setOpen(!isMobile);
    }, [isMobile]);

    const toggleSection = (title: string) =>
      setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
    
    return (
      <Box
        sx={mergeSx(sectionCardSx, cardSx)}
      >
        <Box
          onClick={() => setOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setOpen((prev) => !prev);
            }
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: { xs: 2, md: 3 },
            cursor: 'pointer',
          }}
        >
          <Typography sx={segmentTitleSx}>
            {data.title}
          </Typography>
          <IconButton
            size="small"
            aria-label={open ? 'Collapse section' : 'Expand section'}
            sx={{ color: colors.textMuted }}
          >
            <ExpandMore
              sx={{
                fontSize: 20,
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </IconButton>
        </Box>
        <Collapse in={open}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }, gap: { xs: 3, md: 4 } }}>
            {data.sections.map((section) => {
              const isOpen = openSections[section.title] ?? false;
              const maxItems = 5;
              const visibleItems = isOpen ? section.items : section.items.slice(0, maxItems);
              const hasMore = section.items.length > maxItems;

              return (
                <Box key={section.title}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, md: 2 } }}>
                    <Typography sx={{ fontSize: { xs: 12, md: 13 }, fontWeight: 600, color: colors.textSecondary }}>
                      {section.title}
                    </Typography>
                    {hasMore && (
                      <Button
                        onClick={() => toggleSection(section.title)}
                        sx={{
                          minWidth: 'auto',
                          px: 0.5,
                          color: colors.textMuted,
                          textTransform: 'none',
                          fontSize: 12,
                          '&:hover': { backgroundColor: 'transparent', color: colors.textSecondary },
                        }}
                        endIcon={
                          <ExpandMore
                            sx={{
                              fontSize: 16,
                              transition: 'transform 0.2s',
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                          />
                        }
                      >
                        {isOpen ? 'Show less' : `Show all (${section.items.length})`}
                      </Button>
                    )}
                  </Box>
                  <Box>
                    {visibleItems.map((item, index) => (
                      <React.Fragment key={item.label}>
                        <Box
                          sx={{
                            py: 1.5,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            justifyContent: 'space-between',
                            gap: { xs: 0.5, sm: 2 },
                          }}
                        >
                          <Typography sx={{ fontSize: 14, color: colors.textMuted }}>{item.label}</Typography>
                          <Typography sx={{ fontSize: 14, color: colors.textSecondary, fontWeight: 500, textAlign: { xs: 'left', sm: 'right' } }}>
                            {item.value}
                          </Typography>
                        </Box>
                        {index < visibleItems.length - 1 && <Divider sx={{ borderColor: colors.cardBorder }} />}
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Collapse>
      </Box>
    );
  };

// Accessory Card Component
  const AccessoryCard = ({
  name,
  category,
  rarity,
  image,
  placeholderIcon,
  cardSx,
  imageSx,
  contentSx,
}: {
  name: string;
  category: string;
  rarity?: string;
  image: string;
  placeholderIcon?: React.ReactNode;
  cardSx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  }) => {
  const rarityColors: Record<string, string> = {
    Rare: colors.purple,
    Exclusive: colors.pink,
    Common: colors.textMuted,
  };

  return (
    <Box
      sx={mergeSx(
        {
          backgroundColor: colors.card,
          borderRadius: { xs: 1.5, md: 2 },
          border: `1px solid ${colors.cardBorder}`,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          width: '100%',
          maxWidth: { xs: '100%', sm: 220 },
          margin: '0 auto',
          '&:hover': {
            transform: { xs: 'none', md: 'translateY(-4px)' },
            boxShadow: { xs: 'none', md: '0 8px 24px rgba(236, 72, 153, 0.15)' },
          },
        },
        cardSx
      )}
    >
      <Box
        sx={mergeSx(
          {
            aspectRatio: '1',
            backgroundColor: colors.bgLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          imageSx
        )}
      >
        {image && false ? (
          <Box
            component="img"
            src={image}
            alt={name}
            sx={{ width: '60%', height: '60%', objectFit: 'contain' }}
          />
        ) : (
          <Box sx={{ color: colors.textMuted, display: 'flex', alignItems: 'center' }}>
            {placeholderIcon}
          </Box>
        )}
      </Box>
      <Box sx={mergeSx({ p: { xs: 1.5, md: 2 } }, contentSx)}>
        <Typography sx={{ fontSize: { xs: 10, md: 11 }, color: colors.textMuted, mb: 0.5 }}>{category}</Typography>
        <Typography sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 500, color: colors.textPrimary, mb: 1 }}>
          {name}
        </Typography>
        <Chip
          label={rarity}
          size="small"
          sx={{
            backgroundColor: `${rarityColors[rarity ?? 'Common'] || colors.textMuted}20`,
            color: rarityColors[rarity ?? 'Common'] || colors.textMuted,
            fontSize: 11,
            height: 22,
          }}
        />
      </Box>
    </Box>
  );
  };

// Accessories Section Component
  const AccessoriesSection = () => {
  const accessories = releaseData.accessories ?? [];
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={sectionCardSx}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap',
          gap: { xs: 0.75, sm: 1 },
          mb: expanded ? { xs: 2, md: 3 } : 0,
          cursor: 'pointer',
          pb: { xs: 1.5, md: 2 },
          borderBottom: 'none',
          '&:hover': {
            backgroundColor: `${colors.cardBorder}40`,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={segmentTitleSx}>
            Accessories
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: colors.textMuted }}>
            {accessories.length} items
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: colors.textMuted }}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={sectionGridSx}>
          {accessories.map((item) => (
            <AccessoryCard
              key={item.name}
              {...item}
              placeholderIcon={<LocalOffer sx={{ fontSize: 40 }} />}
              cardSx={accessoryCardLayout.cardSx}
              imageSx={accessoryCardLayout.imageSx}
              contentSx={accessoryCardLayout.contentSx}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
  };

// Characters Section Component
  const CharactersSection = () => {
  const characters = releaseData.characters ?? [];
  const [expanded, setExpanded] = useState(false);

  const characterCards: CharacterSummary[] = characters.map((character, index) => {
    const characterData = characterIndexMockById(character.id);
    const accentColor = characterAccentPalette[index % characterAccentPalette.length] ?? '#ec4899';
    return {
      id: character.id as CharacterId,
      name: characterData.name ?? character.name,
      species: characterData.species ?? 'Unknown',
      releaseCount: characterData.releaseCount ?? 0,
      imageUrl: characterData.heroImage,
      accentColor,
    };
  });

  return (
    <Box
      sx={sectionCardSx}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap',
          gap: { xs: 0.75, sm: 1 },
          mb: expanded ? { xs: 2, md: 3 } : 0,
          cursor: 'pointer',
          pb: { xs: 1.5, md: 2 },
          borderBottom: 'none',
          '&:hover': {
            backgroundColor: `${colors.cardBorder}40`,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={segmentTitleSx}>
            Characters
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: colors.textMuted }}>
            {characterCards.length} character{characterCards.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: colors.textMuted }}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={sectionGridSx}>
          {characterCards.map((character) => (
            <CharacterCard
              key={character.id}
              {...character}
              cardSx={releaseCharacterCardLayout.cardSx}
              mediaSx={releaseCharacterCardLayout.mediaSx}
              contentSx={releaseCharacterCardLayout.contentSx}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
  };

// Clothing Section Component
  const ClothingSection = () => {
  const clothing = releaseData.clothing ?? [];
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={sectionCardSx}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap',
          gap: { xs: 0.75, sm: 1 },
          mb: expanded ? { xs: 2, md: 3 } : 0,
          cursor: 'pointer',
          pb: { xs: 1.5, md: 2 },
          borderBottom: 'none',
          '&:hover': {
            backgroundColor: `${colors.cardBorder}40`,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={segmentTitleSx}>
            Clothing
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: colors.textMuted }}>
            {clothing.length} items
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: colors.textMuted }}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={sectionGridSx}>
          {clothing.map((item) => (
            <AccessoryCard
              key={item.name}
              {...item}
              placeholderIcon={<Checkroom sx={{ fontSize: 40 }} />}
              cardSx={accessoryCardLayout.cardSx}
              imageSx={accessoryCardLayout.imageSx}
              contentSx={accessoryCardLayout.contentSx}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
  };

// Pets Section Component
  const PetsSection = () => {
  const pets = releaseData.petsDetail ?? [];
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={sectionCardSx}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap',
          gap: { xs: 0.75, sm: 1 },
          mb: expanded ? { xs: 2, md: 3 } : 0,
          cursor: 'pointer',
          pb: { xs: 1.5, md: 2 },
          borderBottom: 'none',
          '&:hover': {
            backgroundColor: `${colors.cardBorder}40`,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={segmentTitleSx}>
            Pets
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: colors.textMuted }}>
            {pets.length} item{pets.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: colors.textMuted }}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={sectionGridSx}>
          {pets.map((pet) => (
            <PetCardSimple
              key={pet.name}
              name={pet.name}
              species={pet.category ?? "Pet"}
              imageUrl={pet.image}
              to={`/catalog/p/${pet.id}`}
              {...(pet.rarity !== undefined ? { rarity: pet.rarity } : {})}
              cardSx={releasePetCardLayout.cardSx}
              mediaSx={releasePetCardLayout.mediaSx}
              contentSx={releasePetCardLayout.contentSx}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
  };

// Multi-Region Price History Chart Component
  const PriceHistoryChart = () => {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [expanded, setExpanded] = useState(true);
  const chartRef = React.useRef<HTMLDivElement | null>(null);

  const regions = releaseData.priceHistory?.regions ?? [];
  const periodOptions = releaseData.priceHistory?.periods ?? ['ALL'];
  const regionIndex = Math.min(selectedRegion, Math.max(0, regions.length - 1));
  const periodIndex = Math.min(selectedPeriod, Math.max(0, periodOptions.length - 1));
  const currentRegion = regions[regionIndex];
  const periodLabel = periodOptions[periodIndex] ?? 'ALL';

  const periodWindowMap: Record<string, number> = {
    '7D': 7,
    '30D': 10,
    '90D': 12,
    '1Y': 15,
    ALL: 15,
  };

  const fullData = currentRegion?.data ?? [];
  const windowSize = Math.min(fullData.length, periodWindowMap[periodLabel] ?? fullData.length);
  const data = windowSize ? fullData.slice(-windowSize) : [];

  const meanValue = data.length ? data.reduce((a, b) => a + b, 0) / data.length : 0;
  const maxValue = data.length ? Math.max(...data) : 0;
  const minValue = data.length ? Math.min(...data) : 0;
  const avgValue = Math.round(meanValue);
  const currentValue = data.length ? (data[data.length - 1] ?? 0) : 0;
  const startValue = data.length ? (data[0] ?? 0) : 0;
  const changePercentValue = startValue ? ((currentValue - startValue) / startValue) * 100 : 0;
  const isPositive = changePercentValue >= 0;
  const variance = data.length
    ? data.reduce((sum, value) => sum + Math.pow(value - meanValue, 2), 0) / data.length
    : 0;
  const volatilityValue = Math.round(Math.sqrt(variance));
  const rangeValue = maxValue - minValue;
  const fullMin = fullData.length ? Math.min(...fullData) : minValue;
  const fullMax = fullData.length ? Math.max(...fullData) : maxValue;

  const pricingRegion = releaseData.pricing?.regions?.find(
    (region) => region.code === currentRegion?.code,
  );
  const msrpValue = pricingRegion?.msrp ?? null;
  const msrpDeltaValue = msrpValue !== null ? currentValue - msrpValue : null;
  const msrpDeltaPercent =
    msrpValue !== null && msrpDeltaValue !== null ? (msrpDeltaValue / msrpValue) * 100 : null;
  const recentSalesCount = pricingRegion?.recentSalesCount ?? null;

  const currencyCodeMap: Record<string, string> = {
    US: 'USD',
    EU: 'EUR',
    JP: 'JPY',
    UK: 'GBP',
    CA: 'CAD',
    AU: 'AUD',
    MX: 'MXN',
    BR: 'BRL',
  };

  const formatPrice = (value: number) => {
    const currencyCode = currencyCodeMap[currentRegion?.code ?? 'US'] ?? 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: currencyCode === 'JPY' ? 0 : 2,
    }).format(value);
  };

  const regionFlagMap: Record<string, string> = {
    US: '🇺🇸',
    EU: '🇪🇺',
    JP: '🇯🇵',
    UK: '🇬🇧',
    CA: '🇨🇦',
    AU: '🇦🇺',
    MX: '🇲🇽',
    BR: '🇧🇷',
  };

  const regionNameMap: Record<string, string> = {
    US: 'United States',
    EU: 'Europe',
    JP: 'Japan',
    UK: 'United Kingdom',
    CA: 'Canada',
    AU: 'Australia',
    MX: 'Mexico',
    BR: 'Brazil',
  };

  const chartWidth = 560;
  const chartHeight = 220;
  const chartPadding = 8;
  const chartLeft = 48;
  const chartRight = 16;
  const chartBottom = 30;
  const chartTop = 12;
  const innerWidth = chartWidth - chartLeft - chartRight;
  const innerHeight = chartHeight - chartTop - chartBottom;
  const linePoints = data.map((value, index) => {
    const x = data.length > 1 ? chartLeft + (index / (data.length - 1)) * innerWidth : chartLeft;
    const y = chartTop + (1 - (value - minValue) / (rangeValue || 1)) * innerHeight;
    return { x, y, value };
  });
  const lastPoint = linePoints[linePoints.length - 1];
  const maxPoint = linePoints.reduce(
    (max, point) => (point.value > max.value ? point : max),
    linePoints[0] ?? { x: 0, y: chartHeight - chartPadding, value: 0 },
  );
  const minPoint = linePoints.reduce(
    (min, point) => (point.value < min.value ? point : min),
    linePoints[0] ?? { x: 0, y: chartHeight - chartPadding, value: 0 },
  );
  const linePath = linePoints.map((point) => `${point.x},${point.y}`).join(' ');
  const areaPath = linePoints.length
    ? `M ${chartLeft} ${chartTop + innerHeight} L ${linePath} L ${chartLeft + innerWidth} ${chartTop + innerHeight} Z`
    : '';

  const yTicks = [
    { label: formatPrice(maxValue), value: maxValue },
    { label: formatPrice(Math.round((maxValue + minValue) / 2)), value: (maxValue + minValue) / 2 },
    { label: formatPrice(minValue), value: minValue },
  ];
  const xLabels =
    periodLabel === 'ALL'
      ? ['Start', 'Mid', 'Now']
      : [`${periodLabel} ago`, 'Mid', 'Now'];

  const hoveredPoint = hoverIndex !== null ? linePoints[hoverIndex] : null;
  const hoverValue = hoveredPoint?.value ?? 0;
  const hoverDelta = hoverValue - startValue;
  const hoverDeltaPercent = startValue ? (hoverDelta / startValue) * 100 : 0;
  const hoverColor = hoverDelta >= 0 ? colors.green : colors.red;
  const hoverLabel = hoverIndex !== null ? `${periodLabel} · point ${hoverIndex + 1}` : '';

  const handleHoverMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!data.length || !chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const ratio = rect.width ? x / rect.width : 0;
    const index = Math.round(ratio * (data.length - 1));
    const point = linePoints[index];
    if (!point) return;
    const xPos = (point.x / chartWidth) * rect.width;
    const yPos = (point.y / chartHeight) * rect.height;
    setHoverIndex(index);
    setHoverPosition({ x: xPos, y: yPos });
  };

  const handleHoverLeave = () => {
    setHoverIndex(null);
    setHoverPosition(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: { xs: 1.5, md: 2 },
        border: `1px solid ${colors.cardBorder}`,
        p: { xs: 2, md: 3 },
      }}
    >
      <Box
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: { xs: 2, md: 3 },
          flexWrap: 'wrap',
          gap: 2,
          cursor: 'pointer',
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
            <TrendingUp sx={{ fontSize: 18, color: colors.pink }} />
            <Typography sx={segmentTitleSx}>
              Price History
            </Typography>
            <Chip
              label={`${regionFlagMap[currentRegion?.code ?? 'US'] ?? '🌎'} ${regionNameMap[currentRegion?.code ?? 'US'] ?? 'Global'}`}
              size="small"
              sx={{
                backgroundColor: colors.bgLight,
                color: colors.textSecondary,
                fontSize: 10,
                height: 20,
              }}
            />
          </Box>
          <Typography sx={{ fontSize: 12, color: colors.textMuted }}>
            Collector view · {periodLabel} trend
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mt: 1 }}>
            <Typography sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 700, color: colors.textPrimary }}>
              {formatPrice(currentValue)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {isPositive ? (
                <TrendingUp sx={{ fontSize: 16, color: colors.green }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: colors.red }} />
              )}
              <Typography sx={{ fontSize: 14, color: isPositive ? colors.green : colors.red }}>
                {isPositive ? '+' : ''}{changePercentValue.toFixed(1)}% vs {periodLabel}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: 12, color: colors.textMuted, mt: 0.5 }}>
            Start {formatPrice(startValue)} · Spread {formatPrice(rangeValue)}
          </Typography>
        </Box>
        <IconButton
          size="small"
          aria-label={expanded ? 'Collapse section' : 'Expand section'}
          sx={{ color: colors.textMuted, mt: 0.5 }}
        >
          <ExpandMore
            sx={{
              fontSize: 20,
              transition: 'transform 0.2s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Region Selector */}
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {regions.map((region, index) => (
                <Box
                  key={region.code}
                  onClick={() => setSelectedRegion(index)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    cursor: 'pointer',
                    backgroundColor: regionIndex === index ? colors.bgLight : 'transparent',
                    border: `1px solid ${regionIndex === index ? colors.cardBorder : 'transparent'}`,
                    color: regionIndex === index ? colors.textPrimary : colors.textMuted,
                    fontSize: 12,
                    '&:hover': { color: colors.textPrimary },
                  }}
                >
                  <Typography component="span">{regionFlagMap[region.code] ?? '🌎'}</Typography>
                  <Typography component="span">{region.code}</Typography>
                </Box>
              ))}
            </Box>

            {/* Period Selector */}
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {periodOptions.map((period, index) => (
                <Button
                  key={period}
                  size="small"
                  onClick={() => setSelectedPeriod(index)}
                  sx={{
                    minWidth: 40,
                    backgroundColor: periodIndex === index ? colors.pink : 'transparent',
                    color: periodIndex === index ? colors.textPrimary : colors.textMuted,
                    fontSize: 11,
                    py: 0.5,
                    '&:hover': { backgroundColor: periodIndex === index ? colors.pinkDark : colors.cardBorder },
                  }}
                >
                  {period}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Chart */}
          <Box
            sx={{
              height: { xs: 220, md: 260 },
              mb: { xs: 2, md: 3 },
              position: 'relative',
            }}
            ref={chartRef}
            onMouseMove={handleHoverMove}
            onMouseLeave={handleHoverLeave}
          >
            <Box sx={{ position: 'absolute', inset: 0 }}>
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: 'block', pointerEvents: 'none' }}
              >
                <defs>
                  <linearGradient id="priceHistoryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={`${colors.pink}66`} />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                {[0, 0.25, 0.5, 0.75, 1].map((line, index) => {
                  const y = chartTop + innerHeight * line;
                  return (
                    <line
                      key={index}
                      x1={chartLeft}
                      y1={y}
                      x2={chartLeft + innerWidth}
                      y2={y}
                      stroke={colors.cardBorder}
                      strokeDasharray="4 6"
                    />
                  );
                })}
                {yTicks.map((tick, index) => {
                  const y = chartTop + innerHeight * (index / (yTicks.length - 1));
                  return (
                    <text
                      key={tick.label}
                      x={chartPadding}
                      y={y + 4}
                      fill={colors.textMuted}
                      fontSize="10"
                    >
                      {tick.label}
                    </text>
                  );
                })}
                {linePoints.length > 0 && (
                  <>
                    <path d={areaPath} fill="url(#priceHistoryGradient)" />
                    <polyline
                      points={linePath}
                      fill="none"
                      stroke={colors.pink}
                      strokeWidth="2"
                    />
                    <circle cx={minPoint.x} cy={minPoint.y} r="3" fill={colors.red} />
                    <circle cx={maxPoint.x} cy={maxPoint.y} r="3" fill={colors.green} />
                    {lastPoint && <circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill={colors.textPrimary} />}
                  </>
                )}
                {hoveredPoint && (
                  <>
                    <line
                      x1={hoveredPoint.x}
                      y1={chartTop}
                      x2={hoveredPoint.x}
                      y2={chartTop + innerHeight}
                      stroke={`${colors.textMuted}66`}
                      strokeDasharray="4 6"
                    />
                    <line
                      x1={chartLeft}
                      y1={hoveredPoint.y}
                      x2={chartLeft + innerWidth}
                      y2={hoveredPoint.y}
                      stroke={`${colors.textMuted}66`}
                      strokeDasharray="4 6"
                    />
                    <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="5" fill={colors.pink} stroke={colors.bg} strokeWidth="2" />
                  </>
                )}
                {xLabels.map((label, index) => {
                  const x = chartLeft + (innerWidth / (xLabels.length - 1)) * index;
                  return (
                    <text
                      key={label}
                      x={x}
                      y={chartTop + innerHeight + chartBottom - 8}
                      fill={colors.textMuted}
                      fontSize="10"
                      textAnchor={index === 0 ? 'start' : index === xLabels.length - 1 ? 'end' : 'middle'}
                    >
                      {label}
                    </text>
                  );
                })}
              </svg>
            </Box>
            {hoveredPoint && hoverPosition && (
              <Box
                sx={{
                  position: 'absolute',
                  left: Math.min(Math.max(hoverPosition.x + 12, 8), (chartRef.current?.clientWidth ?? 0) - 160),
                  top: Math.min(Math.max(hoverPosition.y - 40, 8), (chartRef.current?.clientHeight ?? 0) - 56),
                  backgroundColor: colors.card,
                  border: `1px solid ${colors.cardBorder}`,
                  borderRadius: 2,
                  px: 1.5,
                  py: 1,
                  minWidth: 140,
                  pointerEvents: 'none',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
                }}
              >
                <Typography sx={{ fontSize: 11, color: colors.textMuted }}>{hoverLabel}</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary }}>
                  {formatPrice(hoverValue)}
                </Typography>
                <Typography sx={{ fontSize: 11, color: hoverColor }}>
                  {hoverDelta >= 0 ? '+' : '-'}
                  {formatPrice(Math.abs(hoverDelta))} ({hoverDeltaPercent.toFixed(1)}%)
                </Typography>
              </Box>
            )}
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }, gap: 1.5 }}>
            {[
              {
                label: 'Period Low',
                value: formatPrice(minValue),
                sublabel: `All-time ${formatPrice(fullMin)}`,
                color: colors.red,
              },
              {
                label: 'Period High',
                value: formatPrice(maxValue),
                sublabel: `All-time ${formatPrice(fullMax)}`,
                color: colors.green,
              },
              {
                label: 'Average',
                value: formatPrice(avgValue),
                sublabel: `Volatility ${formatPrice(volatilityValue)}`,
                color: colors.textPrimary,
              },
              {
                label: 'MSRP',
                value: msrpValue ? formatPrice(msrpValue) : '—',
                sublabel: msrpValue && msrpDeltaValue !== null
                  ? `${msrpDeltaValue >= 0 ? '+' : ''}${formatPrice(Math.abs(msrpDeltaValue))} (${msrpDeltaPercent?.toFixed(1)}%)`
                  : 'No MSRP data',
                color: colors.textPrimary,
              },
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  backgroundColor: colors.bgLight,
                  borderRadius: 2,
                  border: `1px solid ${colors.cardBorder}`,
                  p: 1.5,
                }}
              >
                <Typography sx={{ fontSize: 10, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                  {stat.label}
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ fontSize: 11, color: colors.textMuted }}>
                  {stat.sublabel}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};


// Community Reviews Component
const CommunityReviews = () => {
  const reviews = releaseData.reviews ?? [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {reviews.map((review) => (
        <Box
          key={review.user}
          sx={{
            backgroundColor: colors.bgLight,
            borderRadius: 2,
            border: `1px solid ${colors.cardBorder}`,
            p: 2.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, md: 2 } }}>
            <Avatar
              sx={{
                width: { xs: 36, md: 40 },
                height: { xs: 36, md: 40 },
                backgroundColor: colors.pink,
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
              }}
            >
              {review.avatar}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 500, color: colors.textPrimary }}>
                  {review.user}
                </Typography>
                <Rating value={review.rating} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: colors.yellow } }} />
              <Typography sx={{ fontSize: 12, color: colors.textMuted }}>{review.date}</Typography>
            </Box>
            <Typography sx={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.6 }}>
              {review.text}
            </Typography>
            <Typography sx={{ fontSize: 12, color: colors.textMuted, mt: 1.5 }}>
              {review.helpfulCount ?? 0} found this helpful
            </Typography>
          </Box>
        </Box>
      </Box>
      ))}
    </Box>
  );
  };

// OOAK & Custom Dolls Component
  const OOAKSection = () => {
  const customs = releaseData.customs ?? [];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: { xs: 1.5, md: 2 } }}>
      {customs.map((custom) => (
        <Box
          key={custom.title}
          sx={{
            backgroundColor: colors.bgLight,
            borderRadius: { xs: 1.5, md: 2 },
            border: `1px solid ${colors.cardBorder}`,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ aspectRatio: '1', position: 'relative' }}>
            <Box
              component="img"
              src={custom.image}
              alt={custom.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Chip
              label={custom.type}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: `${colors.purple}cc`,
                color: colors.textPrimary,
                fontSize: 10,
                height: 20,
              }}
            />
          </Box>
          <Box sx={{ p: { xs: 1.5, md: 2 } }}>
            <Typography sx={{ fontSize: { xs: 12, md: 13 }, fontWeight: 500, color: colors.textPrimary, mb: 0.5 }}>
              {custom.title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: { xs: 11, md: 12 }, color: colors.pink }}>{custom.artist}</Typography>
              <Typography sx={{ fontSize: { xs: 10, md: 11 }, color: colors.textMuted }}>♥ {custom.likes}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
  };

// Tutorials & Creators Component
  const TutorialsSection = () => {
  const tutorials = releaseData.tutorials ?? [];
  const creators = releaseData.creators ?? [];

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: { xs: 1.5, md: 2 },
        border: `1px solid ${colors.cardBorder}`,
        p: { xs: 2, md: 3 },
      }}
    >
      {/* Tutorials */}
      <Typography sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600, color: colors.textPrimary, mb: { xs: 1.5, md: 2 } }}>
        Related Tutorials
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 }, mb: { xs: 3, md: 4 } }}>
        {tutorials.map((tutorial) => (
          <Box
            key={tutorial.title}
            sx={{
              display: 'flex',
              gap: { xs: 1.5, md: 2 },
              backgroundColor: colors.bgLight,
              borderRadius: { xs: 1.5, md: 2 },
              border: `1px solid ${colors.cardBorder}`,
              overflow: 'hidden',
              cursor: 'pointer',
              flexDirection: { xs: 'column', sm: 'row' },
              '&:hover': { borderColor: colors.pink },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: 160 }, aspectRatio: '16/9', position: 'relative', flexShrink: 0 }}>
              <Box
                component="img"
                src={tutorial.image}
                alt={tutorial.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}
              >
                <PlayArrow sx={{ fontSize: 32, color: colors.textPrimary }} />
              </Box>
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  fontSize: 10,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: colors.textPrimary,
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 0.5,
                }}
              >
                {tutorial.duration}
              </Typography>
            </Box>
            <Box sx={{ py: { xs: 1, sm: 1.5 }, pr: { xs: 1.5, sm: 2 }, px: { xs: 1.5, sm: 0 } }}>
              <Typography sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 500, color: colors.textPrimary, mb: 0.5 }}>
                {tutorial.title}
              </Typography>
              <Typography sx={{ fontSize: { xs: 11, md: 12 }, color: colors.textMuted }}>
                by {tutorial.creator}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Featured Creators */}
      <Typography sx={{ fontSize: { xs: 13, md: 14 }, fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
        Featured Creators
      </Typography>
      <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 2 }, flexWrap: 'wrap' }}>
        {creators.map((creator) => (
          <Box
            key={creator.name}
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: 1 },
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              backgroundColor: colors.bgLight,
              borderRadius: { xs: 1.5, md: 2 },
              border: `1px solid ${colors.cardBorder}`,
              p: 1.5,
              cursor: 'pointer',
              '&:hover': { borderColor: colors.pink },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 32, md: 36 },
                height: { xs: 32, md: 36 },
                backgroundColor: colors.purple,
                fontSize: { xs: 13, md: 14 },
                fontWeight: 600,
              }}
            >
              {creator.avatar}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: { xs: 12, md: 13 }, fontWeight: 500, color: colors.textPrimary }}>
                {creator.name}
              </Typography>
              <Typography sx={{ fontSize: 11, color: colors.textMuted }}>
                {creator.followers} • {creator.specialty}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
  };

// Community Section with Tabs
  const CommunitySection = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const tabs = [
    { label: 'Reviews', icon: <People sx={{ fontSize: 16 }} />, count: releaseData.communityCounts?.reviews ?? 0 },
    { label: 'Customs & OOAK', icon: <Brush sx={{ fontSize: 16 }} />, count: releaseData.communityCounts?.customs ?? 0 },
    // { label: 'Tutorials', icon: <School sx={{ fontSize: 16 }} />, count: releaseData.communityCounts?.tutorials ?? 0 },
  ];

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: { xs: 1.5, md: 2 },
        border: `1px solid ${colors.cardBorder}`,
        p: { xs: 2, md: 3 },
      }}
    >
      <Box
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          mb: { xs: 2, md: 3 },
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Collections sx={{ fontSize: { xs: 18, md: 20 }, color: colors.pink }} />
          <Typography sx={segmentTitleSx}>
            Community
          </Typography>
        </Box>
        <IconButton
          size="small"
          aria-label={expanded ? 'Collapse section' : 'Expand section'}
          sx={{ color: colors.textMuted }}
        >
          <ExpandMore
            sx={{
              fontSize: 20,
              transition: 'transform 0.2s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box
          sx={{
            backgroundColor: colors.bgLight,
            borderRadius: { xs: 1.5, md: 2 },
            border: `1px solid ${colors.cardBorder}`,
            overflow: 'hidden',
          }}
        >
          {/* Tabs */}
          <Box sx={{ display: 'flex', borderBottom: `1px solid ${colors.cardBorder}`, overflowX: 'auto' }}>
            {tabs.map((tab, index) => (
              <Box
                key={tab.label}
                onClick={() => setSelectedTab(index)}
                sx={{
                  flex: { xs: '0 0 auto', sm: 1 },
                  minWidth: { xs: 140, sm: 'auto' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  py: 2,
                  px: { xs: 1.5, sm: 0 },
                  cursor: 'pointer',
                  backgroundColor: selectedTab === index ? colors.bgLight : 'transparent',
                  borderBottom: `2px solid ${selectedTab === index ? colors.pink : 'transparent'}`,
                  color: selectedTab === index ? colors.textPrimary : colors.textMuted,
                  transition: 'all 0.2s',
                  '&:hover': { color: colors.textPrimary },
                }}
              >
                {tab.icon}
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{tab.label}</Typography>
                <Chip
                  label={tab.count}
                  size="small"
                  sx={{
                    backgroundColor: `${colors.pink}20`,
                    color: colors.pink,
                    fontSize: 10,
                    height: 18,
                    minWidth: 28,
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {selectedTab === 0 && <CommunityReviews />}
            {selectedTab === 1 && <OOAKSection />}
            {/* {selectedTab === 2 && <TutorialsSection />} */}
          </Box>
        </Box>

        <Typography sx={{ fontSize: 11, color: colors.textMuted, mt: 2, fontStyle: 'italic' }}>
          Community content is created by collectors and fans. Official content is clearly labeled above.
        </Typography>
      </Collapse>
    </Box>
  );
  };

  const MarketOffersSection = () => {

  const marketCountries: MarketCountry[] = [
    { code: 'DE', label: 'Germany', flag: '🇩🇪', locale: 'de-DE', currency: 'EUR' },
    { code: 'UK', label: 'United Kingdom', flag: '🇬🇧', locale: 'en-GB', currency: 'GBP' },
    { code: 'US', label: 'United States', flag: '🇺🇸', locale: 'en-US', currency: 'USD' },
    { code: 'JP', label: 'Japan', flag: '🇯🇵', locale: 'ja-JP', currency: 'JPY' },
  ];

  const marketOffersByCountry: Record<string, MarketOffer[]> = {
    DE: [
      { store: 'Amazon (EU)', url: 'https://www.amazon.de/', channel: 'Official', official: true, price: 82.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Muller', url: 'https://www.mueller.de/', channel: 'Official', official: true, price: 79.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Carrefour', url: 'https://www.carrefour.fr/', channel: 'Official', official: true, price: 84.5, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Auchan', url: 'https://www.auchan.fr/', channel: 'Official', official: true, price: 83.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'JoueClub', url: 'https://www.joueclub.fr/', channel: 'Official', official: true, price: 86.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'King Jouet', url: 'https://www.king-jouet.com/', channel: 'Official', official: true, price: 85.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'El Corte Ingles', url: 'https://www.elcorteingles.es/', channel: 'Official', official: true, price: 88.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'eBay', url: 'https://www.ebay.de/', channel: 'Marketplace', official: false, price: 109.0, shipping: 'See site', condition: 'Varies', eta: 'Varies' },
      { store: 'Vinted', url: 'https://www.vinted.de/', channel: 'Marketplace', official: false, price: 92.0, shipping: 'See site', condition: 'Varies', eta: 'Varies' },
    ],
    UK: [
      { store: 'Amazon (EU)', url: 'https://www.amazon.co.uk/', channel: 'Official', official: true, price: 74.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Smyths Toys', url: 'https://www.smythstoys.com/uk/en-gb', channel: 'Official', official: true, price: 69.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Argos', url: 'https://www.argos.co.uk/', channel: 'Official', official: true, price: 72.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'The Entertainer', url: 'https://www.thetoyshop.com/', channel: 'Official', official: true, price: 73.5, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'eBay', url: 'https://www.ebay.co.uk/', channel: 'Marketplace', official: false, price: 98.0, shipping: 'See site', condition: 'Varies', eta: 'Varies' },
      { store: 'Vinted', url: 'https://www.vinted.co.uk/', channel: 'Marketplace', official: false, price: 85.0, shipping: 'See site', condition: 'Varies', eta: 'Varies' },
    ],
    US: [
      { store: 'Amazon (US)', url: 'https://www.amazon.com/', channel: 'Official', official: true, price: 79.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Amazon (CA)', url: 'https://www.amazon.ca/', channel: 'Official', official: true, price: 84.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Target', url: 'https://www.target.com/', channel: 'Official', official: true, price: 69.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Walmart', url: 'https://www.walmart.com/', channel: 'Official', official: true, price: 71.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Toys\"R\"Us (US)', url: 'https://www.toysrus.com/', channel: 'Official', official: true, price: 79.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Toys\"R\"Us Canada', url: 'https://www.toysrus.ca/', channel: 'Official', official: true, price: 86.99, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Kohl\'s', url: 'https://www.kohls.com/', channel: 'Official', official: true, price: 76.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Macy\'s', url: 'https://www.macys.com/', channel: 'Official', official: true, price: 78.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Best Buy', url: 'https://www.bestbuy.com/', channel: 'Official', official: true, price: 77.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'GameStop', url: 'https://www.gamestop.com/', channel: 'Official', official: true, price: 74.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Hot Topic', url: 'https://www.hottopic.com/', channel: 'Official', official: true, price: 89.0, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'eBay', url: 'https://www.ebay.com/', channel: 'Marketplace', official: false, price: 109.5, shipping: 'See site', condition: 'Varies', eta: 'Varies' },
      { store: 'Vinted', url: 'https://www.vinted.com/', channel: 'Marketplace', official: false, price: 95.0, shipping: 'See site', condition: 'Varies', eta: 'Varies' },
    ],
    JP: [
      { store: 'Amazon JP', url: 'https://www.amazon.co.jp/', channel: 'Official', official: true, price: 9800, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'Toys\"R\"Us Japan', url: 'https://www.toysrus.co.jp/', channel: 'Official', official: true, price: 10400, shipping: 'See site', condition: 'New', eta: 'Varies' },
      { store: 'eBay', url: 'https://www.ebay.com/', channel: 'Marketplace', official: false, price: 12800, shipping: 'See site', condition: 'Varies', eta: 'Varies' },
    ],
  };

  const defaultCountry = marketCountries[0]?.code ?? 'DE';
  const [selectedOverviewCountry, setSelectedOverviewCountry] = useState(defaultCountry);
  const [selectedOffersCountry, setSelectedOffersCountry] = useState(defaultCountry);
  const overviewOffers = [...(marketOffersByCountry[selectedOverviewCountry] ?? [])].sort(
    (a, b) => a.price - b.price,
  );
  const offerList = [...(marketOffersByCountry[selectedOffersCountry] ?? [])].sort(
    (a, b) => a.price - b.price,
  );

  const formatPrice = (value: number, countryCode: string) => {
    const country = marketCountries.find((item) => item.code === countryCode);
    if (!country) return `$${value.toFixed(2)}`;
    return new Intl.NumberFormat(country.locale, {
      style: 'currency',
      currency: country.currency,
      maximumFractionDigits: country.currency === 'JPY' ? 0 : 2,
    }).format(value);
  };

  const getLogoFromUrl = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://logo.clearbit.com/${hostname}`;
    } catch {
      return '';
    }
  };

  const bestPriceValue = overviewOffers.length ? Math.min(...overviewOffers.map((offer) => offer.price)) : null;
  const officialOffers = overviewOffers.filter((offer) => offer.official);
  const officialBestValue = officialOffers.length ? Math.min(...officialOffers.map((offer) => offer.price)) : null;
  const marketplaceOffers = overviewOffers.filter((offer) => !offer.official);
  const marketplaceAvgValue = marketplaceOffers.length
    ? marketplaceOffers.reduce((sum, offer) => sum + offer.price, 0) / marketplaceOffers.length
    : null;

  const offerListBestPriceValue = offerList.length ? Math.min(...offerList.map((offer) => offer.price)) : null;
  const offerListOfficialOffers = offerList.filter((offer) => offer.official);
  const offerListMarketplaceOffers = offerList.filter((offer) => !offer.official);
  const offerListOfficialSubtitle = `${offerListOfficialOffers.length} offers`;
  const offerListMarketplaceSubtitle = `${offerListMarketplaceOffers.length} offers`;
  const offerListSections = [
    {
      title: 'Official stores',
      subtitle: offerListOfficialSubtitle,
      items: offerListOfficialOffers,
      chipColor: colors.green,
    },
    {
      title: 'Secondary market',
      subtitle: offerListMarketplaceSubtitle,
      items: offerListMarketplaceOffers,
      chipColor: colors.orange,
    },
  ] as const;

  return (
    <Box>
      <MarketOverview
        countries={marketCountries}
        selected={selectedOverviewCountry}
        onSelect={setSelectedOverviewCountry}
        bestPriceValue={bestPriceValue}
        officialBestValue={officialBestValue}
        marketplaceAvgValue={marketplaceAvgValue}
        offersCount={overviewOffers.length}
        formatPrice={formatPrice}
        colors={colors}
        segmentTitleSx={segmentTitleSx}
        statCardSx={marketCardLayout.statCardSx}
      />

      <MarketOffers
        countries={marketCountries}
        selected={selectedOffersCountry}
        onSelect={setSelectedOffersCountry}
        sections={offerListSections}
        bestPriceValue={offerListBestPriceValue}
        selectedCountry={selectedOffersCountry}
        formatPrice={formatPrice}
        getLogoFromUrl={getLogoFromUrl}
        colors={colors}
        segmentTitleSx={segmentTitleSx}
        offerCardSx={marketCardLayout.offerCardSx}
        noticeCardSx={marketCardLayout.noticeCardSx}
      />
    </Box>
  );
  };

  // Main Release Page Component
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0B0D11',
        backgroundImage:
          'radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%), radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%), linear-gradient(180deg, #0B0D11 0%, #121622 100%)',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >

      {/* Main Content Area - 70% width, centered */}
      <Box
        sx={{
          width: { xs: '100%', md: '85%', lg: '70%' },
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 4, md: 8 },
        }}
      >
        {/* Breadcrumb for Mobile - shows only on mobile */}
        <Box sx={{ display: { xs: 'block', lg: 'none' }, pt: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
          <ReleaseBreadcrumb 
            items={[
              { label: 'Releases', link: '/catalog/r' },
              ...(primarySeries
                ? [{ label: primarySeries.name, link: `/catalog/s/${primarySeries.id}` }]
                : [{ label: releaseData.seriesName }]
              ),
              { label: releaseData.name }
            ]} 
            colors={colors} 
          />
        </Box>

        {/* Image Gallery for Mobile - shows only on mobile after Breadcrumb */}
        <Box sx={{ display: { xs: 'block', lg: 'none' }, mb: 3 }}>
          <ImageGallery />
        </Box>

        {/* Two Column Layout - Desktop only */}
        <Box
          sx={{
            display: { xs: 'block', lg: 'flex' },
            gap: 4,
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column - Sticky Breadcrumb & Image Gallery for Desktop */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              width: '32%',
              flexShrink: 0,
              position: 'sticky',
              top: { xs: 80, sm: 100 },
              height: 'fit-content',
              maxHeight: { xs: 'calc(100vh - 96px)', sm: 'calc(100vh - 116px)' },
              overflowY: 'auto',
              zIndex: 10,
            }}
          >
            {/* Breadcrumb for Desktop - sticky with gallery */}
            <Box sx={{ mb: 3 }}>
              <ReleaseBreadcrumb 
                items={[
                  { label: 'Releases', link: '/catalog/r' },
                  ...(primarySeries
                    ? [{ label: primarySeries.name, link: `/catalog/s/${primarySeries.id}` }]
                    : [{ label: releaseData.seriesName }]
                  ),
                  { label: releaseData.name }
                ]} 
                colors={colors} 
              />
            </Box>
            <ImageGallery />
          </Box>

          {/* Right Column - All Content (scrolls with page) */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4, md: 5 } }}>
              <HeroSection />
              <Box sx={{ mt: { xs: 2, sm: '-20px', md: '-40px' } }}>
                <MsrpOverview />
              </Box>
              <MarketOffersSection />
              <PriceHistoryChart />
              {/* <ReleasesReissues /> */}

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
                <GeneralInfoCard data={releaseData.generalInfo} cardSx={infoCardLayout.cardSx} />
                <ProductDetailsCard data={releaseData.productDetails} cardSx={infoCardLayout.cardSx} />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, md: 3.5 } }}>
                <CharactersSection />
                <AccessoriesSection />
                <ClothingSection />
                <PetsSection />
              </Box>

              {/* <OfficialMediaGallery /> */}
              <CommunitySection />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReleasePage;

/*
Original inline component data (pre-refactor):

Hero
- badges: ["Ultra Rare", "First Edition"]
- title: "Draculaura"
- subtitle: "Collector's First Day Edition"
- release meta: Released "Oct 2023", SKU "HNF73", Status "Out of Stock"
- rating: 4.8 (156 reviews)

Pricing regions
[
  { code: 'US', currency: '$', msrp: 75, market: 128, flag: '🇺🇸' },
  { code: 'EU', currency: '€', msrp: 85, market: 142, flag: '🇪🇺' },
  { code: 'JP', currency: '¥', msrp: 12000, market: 18500, flag: '🇯🇵' },
  { code: 'UK', currency: '£', msrp: 65, market: 115, flag: '🇬🇧' },
]

Releases & Variants
[
  { type: 'Original', name: 'Draculaura - First Day Edition', year: '2023', status: 'current', sku: 'HNF73' },
  { type: 'Variant', name: 'Draculaura - Midnight Edition', year: '2024', status: 'available', sku: 'HNF73-B' },
  { type: 'Reissue', name: 'Draculaura - Anniversary Reissue', year: '2024', status: 'upcoming', sku: 'HNF73-R' },
]

Media categories
[
  {
    label: 'Promo',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', caption: 'Official promo shot' },
      { src: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop', caption: 'Lifestyle shot' },
      { src: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=400&fit=crop', caption: 'Detail view' },
    ],
  },
  {
    label: 'Box Art',
    images: [
      { src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop', caption: 'Front packaging' },
      { src: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&h=400&fit=crop', caption: 'Back packaging' },
    ],
  },
  {
    label: 'Stock Photos',
    images: [
      { src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop', caption: 'Product shot 1' },
      { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', caption: 'Product shot 2' },
      { src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', caption: 'Product shot 3' },
      { src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop', caption: 'Product shot 4' },
    ],
  },
]

Gallery images
[1, 2, 3, 4, 5] with main src: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop
and thumbnails: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop

Info sections
- General Information: Series, Wave, Year, Age Group, Brand
- Product Details: Height, Articulation, Material, Edition Size, Certification

Physical contents
[
  { name: 'Doll', count: 1 },
  { name: 'Stand', count: 1 },
  { name: 'Certificate', count: 1 },
  { name: 'Booklet', count: 1 },
  { name: 'Accessories', count: 8 },
  { name: 'Clothing', count: 4 },
]

Accessories
[
  { name: 'Bat Umbrella', category: 'Accessory', rarity: 'Rare', image: 'https://images.unsplash.com/photo-1534119428213-bd2626145164?w=200&h=200&fit=crop' },
  { name: 'Heart Purse', category: 'Bag', rarity: 'Exclusive', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop' },
  { name: 'Vampire Fangs', category: 'Accessory', rarity: 'Rare', image: 'https://images.unsplash.com/photo-1509933551745-514268e6a834?w=200&h=200&fit=crop' },
  { name: 'Pink Heels', category: 'Footwear', rarity: 'Common', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop' },
]

Clothing
[
  { name: 'Signature Dress', category: 'Dress', rarity: 'Exclusive', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop' },
  { name: 'Bat Wings Cape', category: 'Outerwear', rarity: 'Rare', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&h=200&fit=crop' },
  { name: 'Striped Tights', category: 'Legwear', rarity: 'Common', image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=200&h=200&fit=crop' },
  { name: 'Heart Earrings', category: 'Jewelry', rarity: 'Rare', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop' },
]

Pets
Count Fabulous (Legendary)

Price history
regions: US/EU/JP (arrays), periods: ['7D','30D','90D','1Y','ALL']

Reviews
VampireCollector, DollEnthusiast, MonsterFan2023

Customs/OOAK
Gothic Draculaura Repaint, Vampire Queen Custom, Midnight Draculaura Reroot

Tutorials
Draculaura Face Repaint Tutorial, Reroot Guide: Black to Pink Ombre

Creators
DollArtistry, CustomCreations, RerootQueen

Community counts
Reviews 156, Customs 23, Tutorials 8

Market offers
4 listings from eBay/Mercari/Facebook with prices and timestamps
Disclaimer: "Prices are aggregated from multiple marketplaces and may not reflect current availability."
*/
