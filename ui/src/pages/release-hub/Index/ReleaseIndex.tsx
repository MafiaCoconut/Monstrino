import React, { useMemo, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Rating,
  Tabs,
  Tab,
  Collapse,
  Avatar,
} from '@mui/material';
import {
  Search,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ChevronRight,
  Star,
  Bookmark,
  Share,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Error as ErrorIcon,
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
  PhotoLibrary,
  Inventory,
} from '@mui/icons-material';
import type { Release } from '../entities/release';
import { releaseIndexMock } from '@/data/real-data/releaseIndexMock';

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
  // Header Component

// Breadcrumb Component
  const Breadcrumb = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
    {['Releases', releaseData.seriesName, releaseData.name].map((item, index, arr) => (
      <React.Fragment key={item}>
        <Typography
          sx={{
            fontSize: 14,
            color: index === arr.length - 1 ? colors.textPrimary : colors.textSecondary,
            cursor: index === arr.length - 1 ? 'default' : 'pointer',
            '&:hover': index !== arr.length - 1 ? { color: colors.textPrimary } : {},
          }}
        >
          {item}
        </Typography>
        {index < arr.length - 1 && (
          <ChevronRight sx={{ fontSize: 16, color: colors.textMuted }} />
        )}
      </React.Fragment>
    ))}
  </Box>
  );

// Hero Section Component
  const HeroSection = () => (
  <Box sx={{ py: 2 }}>
    <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
      {(releaseData.badges ?? []).map((badge) => (
        <Chip
          key={badge.label}
          label={badge.label}
          variant={badge.variant === 'outlined' ? 'outlined' : undefined}
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

    <Typography
      sx={{
        fontSize: 42,
        fontWeight: 700,
        color: colors.textPrimary,
        mb: 0.5,
      }}
    >
      {releaseData.name}
    </Typography>
    <Typography sx={{ fontSize: 18, color: colors.textSecondary, mb: 3 }}>
      {releaseData.subtitle}
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 3, flexWrap: 'wrap' }}>
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
      </Box>
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

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: colors.pink,
          color: colors.textPrimary,
          textTransform: 'none',
          fontWeight: 600,
          px: 3,
          py: 1,
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
    </Box>
  </Box>
  );

// Pricing Intelligence Component
  const PricingIntelligence = () => {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const regions = releaseData.pricing?.regions ?? [];
  const currentRegion = regions[selectedRegion];
  const priceChange = currentRegion
    ? ((currentRegion.market - currentRegion.msrp) / currentRegion.msrp * 100).toFixed(1)
    : '0.0';

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: 2,
        border: `1px solid ${colors.cardBorder}`,
        p: 3,
        mt: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <LocalOffer sx={{ fontSize: 18, color: colors.pink }} />
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary }}>
          Pricing Intelligence
        </Typography>
      </Box>

      {/* Region Tabs */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {regions.map((region, index) => (
          <Box
            key={region.code}
            onClick={() => setSelectedRegion(index)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 2,
              py: 1,
              borderRadius: 1,
              cursor: 'pointer',
              backgroundColor: selectedRegion === index ? colors.pink : colors.bgLight,
              color: selectedRegion === index ? colors.textPrimary : colors.textSecondary,
              transition: 'all 0.2s',
              '&:hover': { backgroundColor: selectedRegion === index ? colors.pink : colors.cardBorder },
            }}
          >
            <Typography sx={{ fontSize: 14 }}>{region.flag}</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{region.code}</Typography>
          </Box>
        ))}
      </Box>

      {/* Price Display */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        {/* Official MSRP */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 1.5,
            backgroundColor: colors.bgLight,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Chip
              label="OFFICIAL"
              size="small"
              sx={{
                backgroundColor: `${colors.blue}20`,
                color: colors.blue,
                fontSize: 10,
                height: 20,
                fontWeight: 600,
              }}
            />
          </Box>
          <Typography sx={{ fontSize: 12, color: colors.textMuted, mb: 0.5 }}>
            Original MSRP
          </Typography>
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: colors.textPrimary }}>
            {currentRegion?.currency}
            {currentRegion?.msrp.toLocaleString()}
          </Typography>
          <Typography sx={{ fontSize: 11, color: colors.textMuted, mt: 1 }}>
            {currentRegion?.msrpNote}
          </Typography>
        </Box>

        {/* Secondary Market */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 1.5,
            backgroundColor: colors.bgLight,
            border: `1px solid ${colors.cardBorder}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Chip
              label="SECONDARY"
              size="small"
              sx={{
                backgroundColor: `${colors.orange}20`,
                color: colors.orange,
                fontSize: 10,
                height: 20,
                fontWeight: 600,
              }}
            />
          </Box>
          <Typography sx={{ fontSize: 12, color: colors.textMuted, mb: 0.5 }}>
            Current Market Price
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: colors.textPrimary }}>
              {currentRegion?.currency}
              {currentRegion?.market.toLocaleString()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUp sx={{ fontSize: 14, color: colors.green }} />
              <Typography sx={{ fontSize: 12, color: colors.green }}>+{priceChange}%</Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: 11, color: colors.textMuted, mt: 1 }}>
            {currentRegion?.marketNote}
          </Typography>
        </Box>
      </Box>
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
        mt: 3,
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
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary }}>
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
                key={release.sku}
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
                      label={statusStyles[release.status].label}
                      size="small"
                      sx={{
                        backgroundColor: statusStyles[release.status].bg,
                        color: statusStyles[release.status].color,
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

// Official Media Gallery Component
  const OfficialMediaGallery = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const mediaCategories = releaseData.media ?? [];
  const currentCategory = mediaCategories[selectedTab];

  return (
    <Box sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <PhotoLibrary sx={{ fontSize: 20, color: colors.pink }} />
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: colors.textPrimary }}>
          Official Media
        </Typography>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {mediaCategories.map((category, index) => (
          <Box
            key={category.label}
            onClick={() => { setSelectedTab(index); setSelectedImage(0); }}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 1,
              cursor: 'pointer',
              backgroundColor: selectedTab === index ? colors.card : 'transparent',
              border: `1px solid ${selectedTab === index ? colors.cardBorder : 'transparent'}`,
              color: selectedTab === index ? colors.textPrimary : colors.textMuted,
              transition: 'all 0.2s',
              '&:hover': { color: colors.textPrimary },
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              {category.label} ({category.images.length})
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Gallery Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        {currentCategory?.images.map((image, index) => (
          <Box
            key={index}
            onClick={() => setSelectedImage(index)}
            sx={{
              aspectRatio: '1',
              borderRadius: 2,
              overflow: 'hidden',
              cursor: 'pointer',
              border: `2px solid ${selectedImage === index ? colors.pink : colors.cardBorder}`,
              transition: 'all 0.2s',
              '&:hover': { borderColor: colors.pink },
            }}
          >
            <Box
              component="img"
              src={image.src}
              alt={image.caption}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>
      <Typography sx={{ fontSize: 12, color: colors.textMuted, mt: 2 }}>
        {currentCategory?.images[selectedImage]?.caption}
      </Typography>
    </Box>
  );
  };

// Image Gallery Component
  const ImageGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = releaseData.gallery ?? [];

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          backgroundColor: colors.card,
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

      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        {images.map((image, index) => (
          <Box
            key={index}
            onClick={() => setCurrentImage(index)}
            sx={{
              width: 72,
              height: 72,
              flex: '0 0 auto',
              backgroundColor: colors.card,
              borderRadius: 1,
              border: `2px solid ${index === currentImage ? colors.pink : colors.cardBorder}`,
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={image.thumbnailSrc ?? image.src}
              alt={`Thumbnail ${index + 1}`}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
  };

// Info Card Component
  const InfoCard = ({ title, items }: { title: string; items: { label: string; value: string }[] }) => (
  <Box
    sx={{
      backgroundColor: colors.card,
      borderRadius: 2,
      border: `1px solid ${colors.cardBorder}`,
      p: 3,
    }}
  >
    <Typography sx={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {items.map((item) => (
        <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 14, color: colors.textMuted }}>{item.label}</Typography>
          <Typography sx={{ fontSize: 14, color: colors.textSecondary }}>{item.value}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
  );

// Physical Contents Card Component
  const PhysicalContentsCard = () => {
  const items = releaseData.physicalContents ?? [];

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: 2,
        border: `1px solid ${colors.cardBorder}`,
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Inventory sx={{ fontSize: 18, color: colors.pink }} />
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary }}>
          Physical Contents
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {items.map((item) => (
          <Box key={item.name} sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 24, fontWeight: 700, color: colors.textPrimary }}>
              {item.count}
            </Typography>
            <Typography sx={{ fontSize: 12, color: colors.textMuted }}>{item.name}</Typography>
          </Box>
        ))}
      </Box>
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
}: {
  name: string;
  category: string;
  rarity: string;
  image: string;
  placeholderIcon?: React.ReactNode;
  }) => {
  const rarityColors: Record<string, string> = {
    Rare: colors.purple,
    Exclusive: colors.pink,
    Common: colors.textMuted,
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: 2,
        border: `1px solid ${colors.cardBorder}`,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          aspectRatio: '1',
          backgroundColor: colors.bgLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
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
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 11, color: colors.textMuted, mb: 0.5 }}>{category}</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: colors.textPrimary, mb: 1 }}>
          {name}
        </Typography>
        <Chip
          label={rarity}
          size="small"
          sx={{
            backgroundColor: `${rarityColors[rarity] || colors.textMuted}20`,
            color: rarityColors[rarity] || colors.textMuted,
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
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: expanded ? 3 : 0,
          cursor: 'pointer',
          pb: 2,
          borderBottom: `1px solid ${colors.cardBorder}`,
          '&:hover': {
            backgroundColor: `${colors.cardBorder}40`,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: colors.textPrimary }}>
            Accessories
          </Typography>
          <Typography sx={{ fontSize: 14, color: colors.textMuted }}>
            {accessories.length} items
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: colors.textMuted }}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mt: 3 }}>
          {accessories.map((item) => (
            <AccessoryCard
              key={item.name}
              {...item}
              placeholderIcon={<LocalOffer sx={{ fontSize: 40 }} />}
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
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: expanded ? 3 : 0,
          cursor: 'pointer',
          pb: 2,
          borderBottom: `1px solid ${colors.cardBorder}`,
          '&:hover': {
            backgroundColor: `${colors.cardBorder}40`,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: colors.textPrimary }}>
            Clothing
          </Typography>
          <Typography sx={{ fontSize: 14, color: colors.textMuted }}>
            {clothing.length} items
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: colors.textMuted }}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mt: 3 }}>
          {clothing.map((item) => (
            <AccessoryCard
              key={item.name}
              {...item}
              placeholderIcon={<Checkroom sx={{ fontSize: 40 }} />}
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
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: expanded ? 3 : 0,
          cursor: 'pointer',
          pb: 2,
          borderBottom: `1px solid ${colors.cardBorder}`,
          '&:hover': {
            backgroundColor: `${colors.cardBorder}40`,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: colors.textPrimary }}>
            Pets
          </Typography>
          <Typography sx={{ fontSize: 14, color: colors.textMuted }}>
            {pets.length} item{pets.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: colors.textMuted }}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mt: 3 }}>
          {pets.map((pet) => (
            <Box
              key={pet.name}
              component={RouterLink}
              to={`/catalog/p/${pet.id}`}
              sx={{
                backgroundColor: colors.card,
                borderRadius: 2,
                border: `1px solid ${colors.cardBorder}`,
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(236, 72, 153, 0.15)',
                },
              }}
            >
              <Box
                sx={{
                  aspectRatio: '1',
                  backgroundColor: colors.bgLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src={pet.image}
                  alt={pet.name}
                  sx={{ width: '60%', height: '60%', objectFit: 'contain' }}
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography sx={{ fontSize: 11, color: colors.textMuted, mb: 0.5 }}>
                  {pet.category ?? 'Pet'}
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: colors.textPrimary, mb: 1 }}>
                  {pet.name}
                </Typography>
                {pet.rarity && (
                  <Chip
                    label={pet.rarity}
                    size="small"
                    sx={{
                      backgroundColor: `${colors.orange}20`,
                      color: colors.orange,
                      fontSize: 11,
                      height: 22,
                    }}
                  />
                )}
              </Box>
            </Box>
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

  const regions = releaseData.priceHistory?.regions ?? [];
  const periods = releaseData.priceHistory?.periods ?? [];
  const currentRegion = regions[selectedRegion];
  const maxValue = currentRegion ? Math.max(...currentRegion.data) : 0;
  const minValue = currentRegion ? Math.min(...currentRegion.data) : 0;
  const avgValue = currentRegion
    ? Math.round(currentRegion.data.reduce((a, b) => a + b, 0) / currentRegion.data.length)
    : 0;
  const currentValue = currentRegion ? currentRegion.data[currentRegion.data.length - 1] : 0;
  const previousValue = currentRegion ? currentRegion.data[0] : 0;
  const changePercent = previousValue
    ? ((currentValue - previousValue) / previousValue * 100).toFixed(1)
    : '0.0';
  const isPositive = currentValue > previousValue;

  const formatPrice = (value: number) => {
    if (selectedRegion === 2) return `¥${value.toLocaleString()}`;
    if (selectedRegion === 1) return `€${value}`;
    return `$${value}`;
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: 2,
        border: `1px solid ${colors.cardBorder}`,
        p: 3,
        mb: 4,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TrendingUp sx={{ fontSize: 18, color: colors.pink }} />
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary }}>
              Price History
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <Typography sx={{ fontSize: 32, fontWeight: 700, color: colors.textPrimary }}>
              {formatPrice(currentValue)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {isPositive ? (
                <TrendingUp sx={{ fontSize: 16, color: colors.green }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: colors.red }} />
              )}
              <Typography sx={{ fontSize: 14, color: isPositive ? colors.green : colors.red }}>
                {isPositive ? '+' : ''}{changePercent}%
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Region Selector */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
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
                  backgroundColor: selectedRegion === index ? colors.bgLight : 'transparent',
                  border: `1px solid ${selectedRegion === index ? colors.cardBorder : 'transparent'}`,
                  color: selectedRegion === index ? colors.textPrimary : colors.textMuted,
                  fontSize: 12,
                  '&:hover': { color: colors.textPrimary },
                }}
              >
                <Typography component="span">{region.flag}</Typography>
                <Typography component="span">{region.code}</Typography>
              </Box>
            ))}
          </Box>

          {/* Period Selector */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {periods.map((period, index) => (
              <Button
                key={period}
                size="small"
                onClick={() => setSelectedPeriod(index)}
                sx={{
                  minWidth: 40,
                  backgroundColor: selectedPeriod === index ? colors.pink : 'transparent',
                  color: selectedPeriod === index ? colors.textPrimary : colors.textMuted,
                  fontSize: 11,
                  py: 0.5,
                  '&:hover': { backgroundColor: selectedPeriod === index ? colors.pinkDark : colors.cardBorder },
                }}
              >
                {period}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          height: 180,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0.5,
          mb: 3,
          position: 'relative',
        }}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => (
          <Box
            key={pct}
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: `${pct}%`,
              borderBottom: `1px dashed ${colors.cardBorder}`,
              opacity: 0.5,
            }}
          />
        ))}

        {currentRegion?.data.map((value, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              height: `${(value / maxValue) * 100}%`,
              background: `linear-gradient(180deg, ${colors.pink} 0%, ${colors.pink}40 100%)`,
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.3s',
              position: 'relative',
              zIndex: 1,
              '&:hover': {
                background: colors.pink,
              },
            }}
          />
        ))}
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        {[
          { label: 'Period Low', value: formatPrice(minValue), color: colors.red },
          { label: 'Period High', value: formatPrice(maxValue), color: colors.green },
          { label: 'Average', value: formatPrice(avgValue), color: colors.textSecondary },
        ].map((stat) => (
          <Box key={stat.label} sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 12, color: colors.textMuted, mb: 0.5 }}>
              {stat.label}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: stat.color }}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Box>
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
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: colors.pink,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {review.avatar}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: colors.textPrimary }}>
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
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
      {customs.map((custom) => (
        <Box
          key={custom.title}
          sx={{
            backgroundColor: colors.bgLight,
            borderRadius: 2,
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
          <Box sx={{ p: 2 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary, mb: 0.5 }}>
              {custom.title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: 12, color: colors.pink }}>{custom.artist}</Typography>
              <Typography sx={{ fontSize: 11, color: colors.textMuted }}>♥ {custom.likes}</Typography>
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
    <Box>
      {/* Tutorials */}
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
        Related Tutorials
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {tutorials.map((tutorial) => (
          <Box
            key={tutorial.title}
            sx={{
              display: 'flex',
              gap: 2,
              backgroundColor: colors.bgLight,
              borderRadius: 2,
              border: `1px solid ${colors.cardBorder}`,
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover': { borderColor: colors.pink },
            }}
          >
            <Box sx={{ width: 160, aspectRatio: '16/9', position: 'relative', flexShrink: 0 }}>
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
            <Box sx={{ py: 1.5, pr: 2 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 500, color: colors.textPrimary, mb: 0.5 }}>
                {tutorial.title}
              </Typography>
              <Typography sx={{ fontSize: 12, color: colors.textMuted }}>
                by {tutorial.creator}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Featured Creators */}
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
        Featured Creators
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {creators.map((creator) => (
          <Box
            key={creator.name}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              backgroundColor: colors.bgLight,
              borderRadius: 2,
              border: `1px solid ${colors.cardBorder}`,
              p: 1.5,
              cursor: 'pointer',
              '&:hover': { borderColor: colors.pink },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: colors.purple,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {creator.avatar}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary }}>
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

  const tabs = [
    { label: 'Reviews', icon: <People sx={{ fontSize: 16 }} />, count: releaseData.communityCounts?.reviews ?? 0 },
    { label: 'Customs & OOAK', icon: <Brush sx={{ fontSize: 16 }} />, count: releaseData.communityCounts?.customs ?? 0 },
    { label: 'Tutorials', icon: <School sx={{ fontSize: 16 }} />, count: releaseData.communityCounts?.tutorials ?? 0 },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Collections sx={{ fontSize: 20, color: colors.pink }} />
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: colors.textPrimary }}>
          Community
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: colors.card,
          borderRadius: 2,
          border: `1px solid ${colors.cardBorder}`,
          overflow: 'hidden',
        }}
      >
        {/* Tabs */}
        <Box sx={{ display: 'flex', borderBottom: `1px solid ${colors.cardBorder}` }}>
          {tabs.map((tab, index) => (
            <Box
              key={tab.label}
              onClick={() => setSelectedTab(index)}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 2,
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
        <Box sx={{ p: 3 }}>
          {selectedTab === 0 && <CommunityReviews />}
          {selectedTab === 1 && <OOAKSection />}
          {selectedTab === 2 && <TutorialsSection />}
        </Box>
      </Box>

      <Typography sx={{ fontSize: 11, color: colors.textMuted, mt: 2, fontStyle: 'italic' }}>
        Community content is created by collectors and fans. Official content is clearly labeled above.
      </Typography>
    </Box>
  );
  };

// Market Offer Card Component
  const MarketOfferCard = ({
  seller,
  condition,
  platform,
  shipping,
  price,
  verified,
  lastUpdated,
}: {
  seller: string;
  condition: string;
  platform: string;
  shipping: string;
  price: string;
  verified: boolean;
  lastUpdated: string;
  }) => {
  const platformColors: Record<string, string> = {
    eBay: colors.blue,
    Mercari: colors.red,
    Facebook: colors.blue,
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.card,
        borderRadius: 2,
        border: `1px solid ${colors.cardBorder}`,
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: colors.bgLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 600,
            color: colors.textPrimary,
          }}
        >
          {seller.charAt(0)}
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 500, color: colors.textPrimary }}>
              {seller}
            </Typography>
            {verified ? (
              <CheckCircle sx={{ fontSize: 16, color: colors.green }} />
            ) : (
              <ErrorIcon sx={{ fontSize: 16, color: colors.textMuted }} />
            )}
            <Chip
              label={condition}
              size="small"
              sx={{
                backgroundColor:
                  condition === 'New' ? `${colors.green}20` : `${colors.orange}20`,
                color: condition === 'New' ? colors.green : colors.orange,
                fontSize: 11,
                height: 20,
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              sx={{ fontSize: 13, color: platformColors[platform] || colors.textMuted }}
            >
              {platform}
            </Typography>
            <Typography sx={{ fontSize: 13, color: colors.textMuted }}>•</Typography>
            <Typography sx={{ fontSize: 13, color: colors.textMuted }}>{shipping}</Typography>
            <Typography sx={{ fontSize: 13, color: colors.textMuted }}>•</Typography>
            <Typography sx={{ fontSize: 13, color: colors.textMuted }}>{lastUpdated}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary }}>
          {price}
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: colors.cardBorder,
            color: colors.textPrimary,
            textTransform: 'none',
            '&:hover': { borderColor: colors.pink, backgroundColor: 'transparent' },
          }}
        >
          View Listing
        </Button>
      </Box>
    </Box>
  );
  };

// Market Offers Section Component
  const MarketOffersSection = () => {
  const offers = releaseData.marketOffers ?? [];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 600, color: colors.textPrimary }}>
          Market Offers
        </Typography>
        <Typography sx={{ fontSize: 14, color: colors.textMuted }}>
          {offers.length} listings found
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        {offers.map((offer) => (
          <MarketOfferCard key={offer.seller} {...offer} />
        ))}
      </Box>
      <Typography sx={{ fontSize: 12, color: colors.textMuted, textAlign: 'center' }}>
        {releaseData.marketOffersDisclaimer}
      </Typography>
    </Box>
  );
  };

  // Main Release Page Component
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: colors.bg,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >

      {/* Main Content Area - 70% width, centered */}
      <Box
        sx={{
          width: '70%',
          mx: 'auto',
          px: 4,
          pb: 8,
        }}
      >
        <Breadcrumb />

        {/* Two Column Layout */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
          }}
        >
          {/* Left Column - Sticky Image Gallery */}
          <Box
            sx={{
              width: '40%',
              flexShrink: 0,
              position: 'sticky',
              top: 80,
              alignSelf: 'flex-start',
              height: 'fit-content',
            }}
          >
            <ImageGallery />
          </Box>

          {/* Right Column - All Content (scrolls with page) */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <HeroSection />
            <PricingIntelligence />
            <ReleasesReissues />

            <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              {(releaseData.infoSections ?? []).map((section) => (
                <InfoCard key={section.title} title={section.title} items={section.items} />
              ))}
            </Box>

            <Box sx={{ mt: 3 }}>
              <PhysicalContentsCard />
            </Box>

            <Box sx={{ mt: 6 }}>
              <AccessoriesSection />
              <ClothingSection />
              <PetsSection />
            </Box>

            <OfficialMediaGallery />
            <CommunitySection />

            <Box sx={{ mt: 6 }}>
              <PriceHistoryChart />
              <MarketOffersSection />
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
