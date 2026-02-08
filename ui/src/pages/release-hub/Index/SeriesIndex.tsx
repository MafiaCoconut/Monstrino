import React, { useState, createContext, useContext, forwardRef, useId, useCallback, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import ImageIconMui from "@mui/icons-material/Image";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIconMui from "@mui/icons-material/Info";
import StarIconMui from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ChevronRightIconMui from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShoppingBagIconMui from "@mui/icons-material/ShoppingBag";
import PublicIcon from "@mui/icons-material/Public";
import TrendingUpIconMui from "@mui/icons-material/TrendingUp";
import { useParams } from "react-router-dom";
import type { Series } from "../entities/series";
import { seriesIndexMock, seriesIndexByNumericId } from "@/data/real-data/seriesIndexMock";
import { ReleaseCardSeriesIndex } from "../components/release-cards";

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

// ============================================================
// MUI ICONS
// ============================================================
const SparklesIcon = AutoAwesomeIcon;
const CalendarIcon = CalendarMonthIcon;
const MapPinIcon = LocationOnIcon;
const FilmIcon = LocalMoviesIcon;
const ImageIcon = ImageIconMui;
const DollarSignIcon = AttachMoneyIcon;
const InfoIcon = InfoIconMui;
const UsersIcon = PeopleIcon;
const TagIcon = LocalOfferIcon;
const ChevronRightIcon = ChevronRightIconMui;
const ChevronDownIcon = ExpandMoreIcon;
const PlayIcon = PlayArrowIcon;
const ShoppingBagIcon = ShoppingBagIconMui;
const GlobeIcon = PublicIcon;
const TrendingUpIcon = TrendingUpIconMui;
const StarIcon = ({ style, filled }: { style?: React.CSSProperties; filled?: boolean }) =>
  filled ? <StarIconMui style={style} /> : <StarBorderIcon style={style} />;

// ============================================================
// INLINED UI COMPONENTS
// ============================================================

// Badge Component
interface BadgeProps {
  variant?: "default" | "secondary" | "outline";
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = "default", style, children }) => {
  const variantStyles: Record<string, any> = {
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
  };

  return (
    <Chip
      label={children}
      sx={{
        ...variantStyles[variant],
        fontSize: tokens.fontSizes.xs,
        fontWeight: tokens.fontWeights.semibold,
        transition: "colors 0.15s",
        ...style,
      }}
    />
  );
};

// Card Components
const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        borderRadius: tokens.radius,
        border: `1px solid ${tokens.colors.border}`,
        backgroundColor: tokens.colors.card,
        color: tokens.colors.cardForeground,
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.375rem",
        padding: tokens.spacing[6],
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ style, children, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="h3"
      sx={{
        fontSize: tokens.fontSizes["2xl"],
        fontWeight: tokens.fontWeights.semibold,
        lineHeight: tokens.lineHeights.tight,
        letterSpacing: "-0.025em",
        ...style,
      }}
      {...props}
    >
      {children}
    </Typography>
  )
);

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        padding: tokens.spacing[6],
        paddingTop: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

// Separator
const Separator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        height: "1px",
        width: "100%",
        backgroundColor: tokens.colors.border,
        flexShrink: 0,
        ...style,
      }}
      {...props}
    />
  )
);

// Progress
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, style, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        height: "0.5rem",
        width: "100%",
        overflow: "hidden",
        borderRadius: "9999px",
        backgroundColor: tokens.colors.secondary,
        ...style,
      }}
      {...props}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          flex: 1,
          backgroundColor: tokens.colors.primary,
          transition: "transform 0.2s",
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      />
    </Box>
  )
);

// Table Components
const Table = forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ style, children, ...props }, ref) => (
    <Box sx={{ position: "relative", width: "100%", overflow: "auto" }}>
      <Box
        component="table"
        ref={ref}
        sx={{
          width: "100%",
          captionSide: "bottom",
          fontSize: tokens.fontSizes.sm,
          ...style,
        }}
        {...props}
      >
        {children}
      </Box>
    </Box>
  )
);

const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ style, children, ...props }, ref) => (
    <thead ref={ref} style={style} {...props}>
      {children}
    </thead>
  )
);

const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ style, children, ...props }, ref) => (
    <tbody ref={ref} style={style} {...props}>
      {children}
    </tbody>
  )
);

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isHoverable?: boolean;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ style, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <tr
        ref={ref}
        style={{
          borderBottom: `1px solid ${tokens.colors.border}`,
          transition: "background-color 0.15s",
          backgroundColor: isHovered ? `${tokens.colors.muted}80` : "transparent",
          ...style,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ style, children, ...props }, ref) => (
    <th
      ref={ref}
      style={{
        height: "3rem",
        padding: "0 1rem",
        textAlign: "left",
        verticalAlign: "middle",
        fontWeight: tokens.fontWeights.medium,
        color: tokens.colors.mutedForeground,
        ...style,
      }}
      {...props}
    >
      {children}
    </th>
  )
);

const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ style, children, ...props }, ref) => (
    <td
      ref={ref}
      style={{
        padding: "1rem",
        verticalAlign: "middle",
        ...style,
      }}
      {...props}
    >
      {children}
    </td>
  )
);

// Avatar Components
const Avatar = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        display: "flex",
        width: "2.5rem",
        height: "2.5rem",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: "9999px",
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

const AvatarFallback = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        backgroundColor: tokens.colors.muted,
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

// ScrollArea Components
const ScrollArea = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, children, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        overflow: "auto",
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

// Accordion Components
type AccordionContextType = {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
};

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
}

const Accordion: React.FC<AccordionProps> = ({
  type = "single",
  collapsible = false,
  defaultValue,
  children,
  style,
  ...props
}) => {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const toggleItem = useCallback((value: string) => {
    setOpenItems((prev) => {
      if (type === "single") {
        if (prev.includes(value)) {
          return collapsible ? [] : prev;
        }
        return [value];
      }
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      return [...prev, value];
    });
  }, [type, collapsible]);

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <Box sx={{ ...style }} {...props}>
        {children}
      </Box>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItemContext = createContext<{ value: string; isOpen: boolean } | null>(null);

const AccordionItem: React.FC<AccordionItemProps> = ({ value, children, style, ...props }) => {
  const ctx = useContext(AccordionContext);
  const isOpen = ctx?.openItems.includes(value) ?? false;

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <Box
        sx={{
          borderBottom: `1px solid ${tokens.colors.border}`,
          ...style,
        }}
        {...props}
      >
        {children}
      </Box>
    </AccordionItemContext.Provider>
  );
};

const AccordionTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ style, children, ...props }, ref) => {
    const accordionCtx = useContext(AccordionContext);
    const itemCtx = useContext(AccordionItemContext);
    const [isHovered, setIsHovered] = useState(false);

    if (!accordionCtx || !itemCtx) return null;

    return (
      <Box sx={{ display: "flex" }}>
        <Box
          component="button"
          ref={ref}
          onClick={() => accordionCtx.toggleItem(itemCtx.value)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 0",
            fontWeight: tokens.fontWeights.medium,
            transition: "all 0.15s",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: isHovered ? tokens.colors.primary : tokens.colors.foreground,
            textAlign: "left",
            width: "100%",
            fontSize: tokens.fontSizes.base,
            ...style,
          }}
          {...props}
        >
          {children}
          <ChevronDownIcon
            style={{
              width: "1rem",
              height: "1rem",
              flexShrink: 0,
              transition: "transform 0.2s",
              transform: itemCtx.isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Box>
      </Box>
    );
  }
);

const AccordionContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style, children, ...props }) => {
  const itemCtx = useContext(AccordionItemContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  if (!itemCtx) return null;

  return (
    <Box
      sx={{
        overflow: "hidden",
        fontSize: tokens.fontSizes.sm,
        transition: "height 0.2s ease-out, opacity 0.2s ease-out",
        height: itemCtx.isOpen ? height : 0,
        opacity: itemCtx.isOpen ? 1 : 0,
      }}
    >
      <Box ref={contentRef} sx={{ paddingBottom: "1rem", ...style }} {...props}>
        {children}
      </Box>
    </Box>
  );
};

// ============================================================
// PLACEHOLDER COMPONENTS
// ============================================================

// Placeholder doll silhouette SVG
const DollPlaceholder = () => (
  <svg viewBox="0 0 120 180" style={{ width: "100%", height: "100%" }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="30" rx="22" ry="26" fill={tokens.colors.muted} />
    <path d="M38 56 C38 56 35 80 38 100 L44 140 L40 175 L50 178 L55 145 L60 178 L65 145 L70 178 L80 175 L76 140 L82 100 C85 80 82 56 82 56 Z" fill={tokens.colors.muted} />
    <path d="M38 60 L25 90 L30 92 L40 70" fill={tokens.colors.muted} />
    <path d="M82 60 L95 90 L90 92 L80 70" fill={tokens.colors.muted} />
  </svg>
);

// Character avatar placeholder
const CharacterAvatar = ({ name, color }: { name: string; color: string }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
    <Avatar style={{ height: "4rem", width: "4rem", border: `2px solid ${color}` }}>
      <AvatarFallback style={{ backgroundColor: tokens.colors.secondary, color: tokens.colors.foreground, fontSize: tokens.fontSizes.lg, fontWeight: tokens.fontWeights.semibold }}>
        {name.split(' ').map(n => n[0]).join('')}
      </AvatarFallback>
    </Avatar>
    <Typography component="span" sx={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.mutedForeground, textAlign: "center" }}>{name}</Typography>
  </Box>
);

// Color swatch component
const ColorSwatch = ({ hex, name }: { hex: string; name: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <Box
      sx={{
        width: "1.5rem",
        height: "1.5rem",
        borderRadius: "9999px",
        border: `1px solid ${tokens.colors.border}`,
        backgroundColor: hex,
      }}
    />
    <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground }}>{name}</Typography>
  </Box>
);

// ============================================================
// SERIES DATA (resolved via index mock)
// ============================================================

// Rarity badge styling helper
const getRarityStyle = (rarity: string): React.CSSProperties => {
  switch (rarity) {
    case "Ultra Rare":
      return { backgroundColor: tokens.colors.primary, color: tokens.colors.primaryForeground };
    case "Rare":
      return { backgroundColor: `${tokens.colors.accent}33`, color: tokens.colors.accent };
    default:
      return { backgroundColor: tokens.colors.secondary, color: tokens.colors.secondaryForeground };
  }
};

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
const MonsterHighSeriesPage: React.FC = () => {
  const { internal_id, series_id, id } = useParams();
  const resolvedId = internal_id ?? series_id ?? id ?? "";
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
  const [hoveredRelatedSeries, setHoveredRelatedSeries] = useState<string | null>(null);
  const [hoveredMedia, setHoveredMedia] = useState<string | null>(null);
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null);

  // Responsive breakpoint detection
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMd(window.innerWidth >= 768);
      setIsLg(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Grid column calculator
  const dollGridCols = isLg ? 4 : isMd ? 3 : 2;
  const mediaGridCols = isMd ? 3 : 1;
  const galleryGridCols = isMd ? 4 : 2;
  const distributionGridCols = isMd ? 3 : 1;
  const pricingGridCols = isMd ? 4 : 1;
  const overviewGridCols = isMd ? 2 : 1;
  const designGridCols = isMd ? 3 : 1;

  if (!seriesData) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: tokens.colors.background,
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
  const status = seriesData.status ?? "Completed";
  const concept = seriesData.concept ?? seriesData.description ?? "";
  const canonicalPlacement = seriesData.canonicalPlacement ?? "";
  const fashionStyles = seriesData.fashionStyles ?? [];
  const colorPalette = seriesData.colorPalette ?? [];
  const themeDescription = seriesData.themeDescription ?? "";
  const dolls = seriesData.dolls ?? [];
  const characters = seriesData.characters ?? [];
  const exclusives = seriesData.exclusives ?? [];
  const distribution = seriesData.distribution ?? { targetMarket: [], channels: [], regions: [] };
  const relatedSeries = seriesData.relatedSeries ?? [];
  const relatedMedia = seriesData.relatedMedia ?? [];
  const pricing = seriesData.pricing ?? {
    msrpRange: "—",
    currentMarketRange: "—",
    rarityDistribution: { common: 0, rare: 0, ultraRare: 0 },
    demandLevel: "—",
  };
  const facts = seriesData.facts ?? [];
  const community = {
    quotes: seriesData.community?.quotes ?? [],
    legacySummary: seriesData.community?.legacySummary ?? "",
    rating: seriesData.community?.rating ?? 0,
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundColor: tokens.colors.background,
      color: tokens.colors.foreground,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      {/* Hero Header */}
      <Box component="header" sx={{
        position: "relative",
        padding: `${tokens.spacing[16]} ${isLg ? tokens.spacing[24] : isMd ? tokens.spacing[12] : tokens.spacing[6]}`,
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}>
        <Box sx={{ maxWidth: "80rem", margin: "0 auto" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Badge variant="outline" style={{ color: tokens.colors.primary, borderColor: tokens.colors.primary }}>
              {generation}
            </Badge>
            <Typography component="span" sx={{ color: tokens.colors.mutedForeground, fontSize: tokens.fontSizes.sm, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <CalendarIcon style={{ width: "0.875rem", height: "0.875rem" }} />
              {releaseYears}
            </Typography>
            <Badge
              style={
                status === "Completed"
                  ? { backgroundColor: tokens.colors.green900_30, color: tokens.colors.green400, borderColor: tokens.colors.green800 }
                  : status === "Ongoing"
                  ? { backgroundColor: `${tokens.colors.primary}33`, color: tokens.colors.primary, borderColor: `${tokens.colors.primary}80` }
                  : { backgroundColor: tokens.colors.red900_30, color: tokens.colors.red400, borderColor: tokens.colors.red800 }
              }
            >
              {status}
            </Badge>
          </Box>
          <Typography variant="h1" sx={{
            fontSize: isLg ? tokens.fontSizes["6xl"] : isMd ? tokens.fontSizes["5xl"] : tokens.fontSizes["4xl"],
            fontWeight: tokens.fontWeights.bold,
            letterSpacing: "-0.025em",
            marginBottom: "0.5rem",
            lineHeight: tokens.lineHeights.tight,
          }}>
            {seriesData.name}
          </Typography>
          <Typography sx={{ color: tokens.colors.mutedForeground, fontSize: tokens.fontSizes.lg, maxWidth: "42rem" }}>
            Monster High {generation} • Collector Archive
          </Typography>
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
        padding: `${tokens.spacing[12]} ${isLg ? tokens.spacing[24] : isMd ? tokens.spacing[12] : tokens.spacing[6]}`,
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: tokens.spacing[16] }}>

          {/* Series Overview */}
          <Box component="section">
            <Box sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${overviewGridCols}, 1fr)`,
              gap: tokens.spacing[8],
            }}>
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: tokens.fontSizes.lg, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <SparklesIcon style={{ width: "1rem", height: "1rem", color: tokens.colors.primary }} />
                    Concept & Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography sx={{ color: tokens.colors.mutedForeground, lineHeight: tokens.lineHeights.relaxed }}>
                    {concept}
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: tokens.fontSizes.lg, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <InfoIcon style={{ width: "1rem", height: "1rem", color: tokens.colors.primary }} />
                    Canonical Placement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography sx={{ color: tokens.colors.mutedForeground, lineHeight: tokens.lineHeights.relaxed }}>
                    {canonicalPlacement}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Design & Aesthetic */}
          <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TagIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Design & Aesthetic
            </Typography>
            <Card>
              <CardContent style={{ paddingTop: tokens.spacing[6] }}>
                <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${designGridCols}, 1fr)`, gap: tokens.spacing[8] }}>
                  <Box>
                    <Typography variant="h3" sx={{ fontSize: tokens.fontSizes.sm, fontWeight: tokens.fontWeights.medium, color: tokens.colors.foreground, marginBottom: "0.75rem" }}>Fashion Styles</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {fashionStyles.map((style) => (
                        <Badge key={style} variant="secondary" style={{ backgroundColor: `${tokens.colors.secondary}80` }}>
                          {style}
                        </Badge>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontSize: tokens.fontSizes.sm, fontWeight: tokens.fontWeights.medium, color: tokens.colors.foreground, marginBottom: "0.75rem" }}>Color Palette</Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {colorPalette.map((color) => (
                        <ColorSwatch key={color.hex} hex={color.hex} name={color.name} />
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontSize: tokens.fontSizes.sm, fontWeight: tokens.fontWeights.medium, color: tokens.colors.foreground, marginBottom: "0.75rem" }}>Theme</Typography>
                    <Typography sx={{ color: tokens.colors.mutedForeground, fontSize: tokens.fontSizes.sm, lineHeight: tokens.lineHeights.relaxed }}>
                      {themeDescription}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Doll Releases Grid */}
          <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ShoppingBagIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Doll Releases
              <Typography component="span" sx={{ color: tokens.colors.mutedForeground, fontSize: tokens.fontSizes.base, fontWeight: tokens.fontWeights.normal, marginLeft: "0.5rem" }}>
                ({dolls.length} dolls)
              </Typography>
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${dollGridCols}, 1fr)`, gap: "1rem" }}>
              {dolls.map((doll) => (
                <ReleaseCardSeriesIndex
                  key={doll.id}
                  doll={doll}
                  isHovered={hoveredCard === doll.id}
                  onMouseEnter={() => setHoveredCard(doll.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                />
              ))}
            </Box>
          </Box>

          {/* Characters Featured */}
          <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <UsersIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Characters Featured
              <Typography component="span" sx={{ color: tokens.colors.mutedForeground, fontSize: tokens.fontSizes.base, fontWeight: tokens.fontWeights.normal, marginLeft: "0.5rem" }}>
                ({characters.length} characters)
              </Typography>
            </Typography>
            <ScrollArea style={{ width: "100%", whiteSpace: "nowrap" }}>
              <Box sx={{ display: "flex", gap: tokens.spacing[8], paddingBottom: "1rem" }}>
                {characters.map((char) => (
                  <CharacterAvatar key={char.name} name={char.name} color={char.color} />
                ))}
              </Box>
            </ScrollArea>
          </Box>

          {/* Exclusives & Regional */}
          <Box component="section">
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
          </Box>

          {/* Distribution & Market */}
          <Box component="section">
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
          </Box>

          {/* Related Series */}
          <Box component="section">
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
          </Box>

          {/* Related Media */}
          <Box component="section">
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
          </Box>

          {/* Image Gallery */}
          <Box component="section">
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
          </Box>

          {/* Price & Rarity Overview */}
          <Box component="section">
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <DollarSignIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Price & Rarity Overview
            </Typography>
            <Card>
              <CardContent style={{ paddingTop: tokens.spacing[6] }}>
                <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${pricingGridCols}, 1fr)`, gap: tokens.spacing[6] }}>
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
                        <Progress value={pricing.rarityDistribution.common} style={{ height: "0.5rem", flex: 1 }} />
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "2rem" }}>{pricing.rarityDistribution.common}%</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "4rem" }}>Rare</Typography>
                        <Progress value={pricing.rarityDistribution.rare} style={{ height: "0.5rem", flex: 1 }} />
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "2rem" }}>{pricing.rarityDistribution.rare}%</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "4rem" }}>Ultra Rare</Typography>
                        <Progress value={pricing.rarityDistribution.ultraRare} style={{ height: "0.5rem", flex: 1 }} />
                        <Typography component="span" sx={{ fontSize: tokens.fontSizes.xs, color: tokens.colors.mutedForeground, width: "2rem" }}>{pricing.rarityDistribution.ultraRare}%</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Facts & Behind-the-Scenes */}
          <Box component="section">
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
          </Box>

          {/* Community Reception & Legacy */}
          <Box component="section" sx={{ paddingBottom: tokens.spacing[8] }}>
            <Typography variant="h2" sx={{ fontSize: tokens.fontSizes["2xl"], fontWeight: tokens.fontWeights.semibold, marginBottom: tokens.spacing[6], display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <StarIcon style={{ width: "1.25rem", height: "1.25rem", color: tokens.colors.primary }} />
              Community Reception & Legacy
            </Typography>
            <Card>
              <CardContent style={{ paddingTop: tokens.spacing[6], display: "flex", flexDirection: "column", gap: tokens.spacing[6] }}>
                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Box sx={{ display: "flex" }}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFull = star <= Math.floor(community.rating);
                      const isHalf = !isFull && star <= community.rating;
                      return (
                        <StarIcon
                          key={star}
                          filled={isFull || isHalf}
                          style={{
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

      {/* Footer */}
      <Box component="footer" sx={{
        borderTop: `1px solid ${tokens.colors.border}`,
        padding: `${tokens.spacing[8]} ${isLg ? tokens.spacing[24] : isMd ? tokens.spacing[12] : tokens.spacing[6]}`,
      }}>
        <Box sx={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: isMd ? "row" : "column", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <Typography sx={{ color: tokens.colors.mutedForeground, fontSize: tokens.fontSizes.sm }}>
            Monstrino • Monster High Collector Archive
          </Typography>
          <Typography sx={{ color: tokens.colors.mutedForeground, fontSize: tokens.fontSizes.xs }}>
            Data for illustration purposes only
          </Typography>
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
            margin: tokens.spacing[8],
          }}>
            <ImageIcon style={{ width: "4rem", height: "4rem", color: `${tokens.colors.mutedForeground}4D` }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MonsterHighSeriesPage;
