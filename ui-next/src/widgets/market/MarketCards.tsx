'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import ExpandMore from '@mui/icons-material/ExpandMore';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { mergeSx } from '@/shared/ui/mergeSx';

export type MarketOffer = {
  store: string;
  url: string;
  logoUrl?: string;
  channel: 'Official' | 'Marketplace';
  official: boolean;
  price: number;
  shipping: string;
  condition: string;
  eta: string;
};

export type MarketCountry = {
  code: string;
  label: string;
  flag: string;
  locale: string;
  currency: string;
};

export type MarketColors = {
  bgLight: string;
  cardBorder: string;
  pink: string;
  textMuted: string;
  textSecondary: string;
  textPrimary: string;
  green: string;
  orange: string;
  card: string;
};

export const MarketCountryTabs = ({
  countries,
  selectedCountry,
  onSelect,
  size = 'small',
  showLabel = true,
  colors,
}: {
  countries: MarketCountry[];
  selectedCountry: string;
  onSelect: (code: string) => void;
  size?: 'small' | 'medium';
  showLabel?: boolean;
  colors: MarketColors;
}) => (
  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
    {countries.map((country) => {
      const selected = selectedCountry === country.code;
      return (
        <Chip
          key={country.code}
          label={showLabel ? `${country.flag} ${country.code}` : `${country.flag}`}
          size={size}
          onClick={() => onSelect(country.code)}
          sx={{
            cursor: 'pointer',
            backgroundColor: selected ? `${colors.pink}20` : colors.bgLight,
            border: `1px solid ${selected ? colors.pink : colors.cardBorder}`,
            color: selected ? colors.pink : colors.textMuted,
            fontWeight: 600,
            height: size === 'small' ? 26 : 30,
            '&:hover': { color: colors.textPrimary },
          }}
        />
      );
    })}
  </Box>
);

export const MarketStatsGrid = ({
  bestPriceValue,
  officialBestValue,
  marketplaceAvgValue,
  offersCount,
  selectedCountry,
  formatPrice,
  colors,
  cardSx,
}: {
  bestPriceValue: number | null;
  officialBestValue: number | null;
  marketplaceAvgValue: number | null;
  offersCount: number;
  selectedCountry: string;
  formatPrice: (value: number, countryCode: string) => string;
  colors: MarketColors;
  cardSx?: SxProps<Theme>;
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
      gap: 1.5,
    }}
  >
    <Box sx={mergeSx({ backgroundColor: colors.bgLight, borderRadius: 2, p: 1.5, border: `1px solid ${colors.cardBorder}` }, cardSx)}>
      <Typography sx={{ fontSize: 11, color: colors.textMuted }}>Best price</Typography>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: colors.green }}>
        {bestPriceValue === null ? '-' : formatPrice(bestPriceValue, selectedCountry)}
      </Typography>
    </Box>
    <Box sx={mergeSx({ backgroundColor: colors.bgLight, borderRadius: 2, p: 1.5, border: `1px solid ${colors.cardBorder}` }, cardSx)}>
      <Typography sx={{ fontSize: 11, color: colors.textMuted }}>Official lowest</Typography>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: colors.textPrimary }}>
        {officialBestValue === null ? '-' : formatPrice(officialBestValue, selectedCountry)}
      </Typography>
    </Box>
    <Box sx={mergeSx({ backgroundColor: colors.bgLight, borderRadius: 2, p: 1.5, border: `1px solid ${colors.cardBorder}` }, cardSx)}>
      <Typography sx={{ fontSize: 11, color: colors.textMuted }}>Marketplace avg</Typography>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: colors.textPrimary }}>
        {marketplaceAvgValue === null ? '-' : formatPrice(marketplaceAvgValue, selectedCountry)}
      </Typography>
    </Box>
    <Box sx={mergeSx({ backgroundColor: colors.bgLight, borderRadius: 2, p: 1.5, border: `1px solid ${colors.cardBorder}` }, cardSx)}>
      <Typography sx={{ fontSize: 11, color: colors.textMuted }}>Listings</Typography>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: colors.textPrimary }}>
        {offersCount}
      </Typography>
    </Box>
  </Box>
);

export const MarketNoticeCard = ({
  title = 'Affiliate note',
  colors,
  cardSx,
}: {
  title?: string;
  colors: MarketColors;
  cardSx?: SxProps<Theme>;
}) => (
  <Box sx={mergeSx({ backgroundColor: colors.bgLight, border: `1px solid ${colors.cardBorder}`, borderRadius: 2, p: 2 }, cardSx)}>
    <Typography sx={{ fontSize: 13, fontWeight: 700, color: colors.textPrimary, mb: 1 }}>
      Notes & links
    </Typography>
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
      <Chip label={title} size="small" sx={{ backgroundColor: `${colors.pink}20`, color: colors.pink, fontWeight: 600 }} />
      <Chip label="Applies to all offers" size="small" sx={{ backgroundColor: `${colors.pink}10`, color: colors.textSecondary, fontWeight: 600 }} />
      <Chip label="External links" size="small" sx={{ backgroundColor: colors.card, color: colors.textSecondary, fontWeight: 600 }} />
    </Box>
    <Typography sx={{ fontSize: 12, color: colors.textSecondary }}>
      Some links are affiliate links. We may earn a commission if you make a purchase after clicking.
    </Typography>
    <Typography sx={{ fontSize: 12, color: colors.textMuted }}>
      Prices and availability can change and may not include taxes, duties, or shipping. Offers are provided by third parties and you will be redirected to the retailer site.
    </Typography>
    <Typography sx={{ fontSize: 12, color: colors.textMuted }}>
      Store names and logos are trademarks of their respective owners.
    </Typography>
  </Box>
);

export const MarketOfferCard = ({
  offer,
  bestPriceValue,
  selectedCountry,
  formatPrice,
  getLogoFromUrl,
  colors,
  cardSx,
}: {
  offer: MarketOffer;
  bestPriceValue: number | null;
  selectedCountry: string;
  formatPrice: (value: number, countryCode: string) => string;
  getLogoFromUrl: (url: string) => string;
  colors: MarketColors;
  cardSx?: SxProps<Theme>;
}) => (
  <Box
    sx={mergeSx(
      {
        backgroundColor: colors.bgLight,
        borderRadius: 2,
        border: `1px solid ${colors.cardBorder}`,
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2,
      },
      cardSx
    )}
  >
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Avatar
          src={offer.logoUrl || getLogoFromUrl(offer.url)}
          alt={offer.store}
          sx={{
            width: 28,
            height: 28,
            bgcolor: colors.cardBorder,
            color: colors.textPrimary,
            fontSize: 12,
            fontWeight: 700,
          }}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        >
          {offer.store.slice(0, 1)}
        </Avatar>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>{offer.store}</Typography>
        <Chip
          label={offer.official ? 'Official' : 'Marketplace'}
          size="small"
          sx={{
            backgroundColor: offer.official ? `${colors.green}20` : `${colors.orange}20`,
            color: offer.official ? colors.green : colors.orange,
            fontSize: 10,
            height: 18,
          }}
        />
        <Chip
          label="Affiliate"
          size="small"
          sx={{
            backgroundColor: colors.card,
            color: colors.textMuted,
            fontSize: 10,
            height: 18,
          }}
        />
        {bestPriceValue !== null && offer.price === bestPriceValue && (
          <Chip label="Best price" size="small" sx={{ backgroundColor: `${colors.green}20`, color: colors.green, fontSize: 10, height: 18 }} />
        )}
      </Box>
      <Typography sx={{ fontSize: 12, color: colors.textMuted }}>
        {offer.condition} • {offer.shipping} • {offer.eta}
      </Typography>
    </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignSelf: { xs: 'flex-end', md: 'center' },
        width: { xs: '100%', md: 'auto' },
        mt: { xs: 1, md: 0 },
        textAlign: { xs: 'right', md: 'left' },
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: colors.textPrimary }}>
        {formatPrice(offer.price, selectedCountry)}
      </Typography>
      <Button
        component="a"
        href={offer.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        variant="contained"
        size="small"
        endIcon={<OpenInNew fontSize="small" />}
        sx={{
          backgroundColor: colors.pink,
          color: '#0B0D11',
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#ff5fb2', boxShadow: 'none' },
        }}
      >
        Open store
      </Button>
    </Box>
  </Box>
);

export const MarketOfferGroupCard = ({
  title,
  items,
  bestPriceValue,
  selectedCountry,
  formatPrice,
  getLogoFromUrl,
  colors,
  cardSx,
}: {
  title: string;
  items: MarketOffer[];
  bestPriceValue: number | null;
  selectedCountry: string;
  formatPrice: (value: number, countryCode: string) => string;
  getLogoFromUrl: (url: string) => string;
  colors: MarketColors;
  cardSx?: SxProps<Theme>;
}) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 1.5 }}>
    {items.map((offer) => (
      <MarketOfferCard
        key={`${title}-${offer.store}-${selectedCountry}`}
        offer={offer}
        bestPriceValue={bestPriceValue}
        selectedCountry={selectedCountry}
        formatPrice={formatPrice}
        getLogoFromUrl={getLogoFromUrl}
        colors={colors}
        cardSx={cardSx}
      />
    ))}
  </Box>
);

export const MarketOverview = ({
  countries,
  selected,
  onSelect,
  bestPriceValue,
  officialBestValue,
  marketplaceAvgValue,
  offersCount,
  formatPrice,
  colors,
  segmentTitleSx,
  statCardSx,
}: {
  countries: MarketCountry[];
  selected: string;
  onSelect: (code: string) => void;
  bestPriceValue: number | null;
  officialBestValue: number | null;
  marketplaceAvgValue: number | null;
  offersCount: number;
  formatPrice: (value: number, countryCode: string) => string;
  colors: MarketColors;
  segmentTitleSx: SxProps<Theme>;
  statCardSx?: SxProps<Theme>;
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState(!isMobile);

  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  return (
    <Box sx={{ backgroundColor: colors.card, border: `1px solid ${colors.cardBorder}`, borderRadius: 2, p: 2, mb: 2 }}>
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
          cursor: 'pointer',
          mb: 1.5,
        }}
      >
        <Typography sx={segmentTitleSx}>Market overview</Typography>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MarketCountryTabs
            countries={countries}
            selectedCountry={selected}
            onSelect={onSelect}
            colors={colors}
          />

          <MarketStatsGrid
            bestPriceValue={bestPriceValue}
            officialBestValue={officialBestValue}
            marketplaceAvgValue={marketplaceAvgValue}
            offersCount={offersCount}
            selectedCountry={selected}
            formatPrice={formatPrice}
            colors={colors}
            cardSx={statCardSx}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export const MarketOffers = ({
  countries,
  selected,
  onSelect,
  sections,
  bestPriceValue,
  selectedCountry,
  formatPrice,
  getLogoFromUrl,
  colors,
  segmentTitleSx,
  offerCardSx,
  noticeCardSx,
}: {
  countries: MarketCountry[];
  selected: string;
  onSelect: (code: string) => void;
  sections: ReadonlyArray<{
    title: string;
    subtitle: string;
    items: MarketOffer[];
    chipColor: string;
  }>;
  bestPriceValue: number | null;
  selectedCountry: string;
  formatPrice: (value: number, countryCode: string) => string;
  getLogoFromUrl: (url: string) => string;
  colors: MarketColors;
  segmentTitleSx: SxProps<Theme>;
  offerCardSx?: SxProps<Theme>;
  noticeCardSx?: SxProps<Theme>;
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box sx={{ backgroundColor: colors.card, borderRadius: 2, border: `1px solid ${colors.cardBorder}`, p: 2 }}>
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
          cursor: 'pointer',
          mb: 1.5,
        }}
      >
        <Typography sx={segmentTitleSx}>Market offers</Typography>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MarketCountryTabs
            countries={countries}
            selectedCountry={selected}
            onSelect={onSelect}
            colors={colors}
          />

          {sections.map((section, index) => (
            <Box
              key={section.title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                pt: index === 0 ? 0 : 2,
                borderTop: index === 0 ? 'none' : `1px solid ${colors.cardBorder}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: 17, fontWeight: 700, color: colors.textPrimary }}>
                  {section.title}
                </Typography>
                <Chip
                  label={section.subtitle}
                  size="small"
                  sx={{
                    backgroundColor: `${section.chipColor}20`,
                    color: section.chipColor,
                    fontSize: 10,
                    height: 18,
                  }}
                />
              </Box>
              <MarketOfferGroupCard
                title={section.title}
                items={section.items}
                bestPriceValue={bestPriceValue}
                selectedCountry={selectedCountry}
                formatPrice={formatPrice}
                getLogoFromUrl={getLogoFromUrl}
                colors={colors}
                cardSx={offerCardSx}
              />
            </Box>
          ))}
          <Box sx={{ borderTop: `1px solid ${colors.cardBorder}`, pt: 2 }}>
            <MarketNoticeCard title="Affiliate note (all offers)" colors={colors} cardSx={noticeCardSx} />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
