import { useState, forwardRef, createContext, useContext, useId } from "react";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import {
  Box,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import PetsIcon from "@mui/icons-material/Pets";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import DangerousIcon from "@mui/icons-material/Dangerous";
import PaletteIcon from "@mui/icons-material/Palette";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { characterIndexMockById } from "@/data/real-data/CharacterIndexMock";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ReleaseCardCharacterIndex } from "../components/release-cards";
import type {
  CharacterIndexCommunityItem,
  CharacterIndexData,
  CharacterIndexRelease,
  CharacterIndexTriviaItem,
  CharacterIndexVariant,
} from "../entities/character-index";

// ============================================
// INLINE STYLES & CSS VARIABLES
// ============================================

const cssVariables = {
  // Core palette (HSL values)
  background: "240 7% 8%",
  foreground: "40 20% 95%",
  card: "240 6% 11%",
  cardForeground: "40 20% 95%",
  popover: "240 6% 13%",
  popoverForeground: "40 20% 95%",
  primary: "270 30% 60%",
  primaryForeground: "40 20% 95%",
  secondary: "270 20% 20%",
  secondaryForeground: "270 30% 75%",
  muted: "240 5% 18%",
  mutedForeground: "40 10% 60%",
  accent: "330 35% 55%",
  accentForeground: "40 20% 95%",
  destructive: "0 62% 50%",
  destructiveForeground: "40 20% 95%",
  border: "270 10% 20%",
  input: "270 10% 20%",
  ring: "270 30% 60%",
  radius: "0.5rem",
  // Gothic tokens
  gothicCharcoal: "240 7% 8%",
  gothicCharcoalElevated: "240 6% 11%",
  gothicPurple: "270 30% 60%",
  gothicPurpleMuted: "270 20% 40%",
  gothicPink: "330 35% 55%",
  gothicPinkMuted: "330 25% 45%",
  gothicCream: "40 20% 95%",
  gothicWarmGray: "40 10% 60%",
  gothicGold: "45 60% 50%",
};

const hsl = (value: string) => `hsl(${value})`;
const hslAlpha = (value: string, alpha: number) => `hsl(${value} / ${alpha})`;

// Utility function for className merging (simplified)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Global style injection
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
    
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Crimson Text', Georgia, serif;
      font-weight: 600;
    }
    
    img {
      max-width: 100%;
      display: block;
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }
    
    button {
      font-family: inherit;
    }
  `}</style>
);

// ============================================
// MUI ICONS
// ============================================

const IconSparkles = AutoAwesomeIcon;
const IconHeart = FavoriteIcon;
const IconUsers = PeopleIcon;
const IconPawPrint = PetsIcon;
const IconCalendar = CalendarMonthIcon;
const IconStar = StarIcon;
const IconSkull = DangerousIcon;
const IconPalette = PaletteIcon;
const IconBookOpen = MenuBookIcon;
const IconClock = AccessTimeIcon;
const IconExternalLink = OpenInNewIcon;
const IconChevronRight = ChevronRightIcon;
const IconChevronDown = ExpandMoreIcon;

// ============================================
// UI PRIMITIVES (Inlined from shadcn/ui)
// ============================================

// Badge Component
interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline";
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Badge = ({ variant = "default", style, children }: BadgeProps) => {
  const variantStyles: Record<string, any> = {
    default: {
      backgroundColor: hsl(cssVariables.primary),
      color: hsl(cssVariables.primaryForeground),
    },
    secondary: {
      backgroundColor: hsl(cssVariables.secondary),
      color: hsl(cssVariables.secondaryForeground),
    },
    destructive: {
      backgroundColor: hsl(cssVariables.destructive),
      color: hsl(cssVariables.destructiveForeground),
    },
    outline: {
      borderColor: hsl(cssVariables.border),
      color: hsl(cssVariables.foreground),
      backgroundColor: "transparent",
      border: `1px solid ${hsl(cssVariables.border)}`,
    },
  };

  return (
    <Chip
      label={children}
      sx={{
        ...variantStyles[variant],
        borderRadius: "9999px",
        border: "1px solid transparent",
        fontSize: "0.75rem",
        fontWeight: 600,
        transition: "colors 0.15s",
        ...style,
      }}
    />
  );
};

// Card Components
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ style, ...props }, ref) => (
  <Box
    ref={ref}
    sx={{
      borderRadius: cssVariables.radius,
      border: `1px solid ${hsl(cssVariables.border)}`,
      backgroundColor: hsl(cssVariables.card),
      color: hsl(cssVariables.cardForeground),
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      ...style,
    }}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, CardProps>(({ style, ...props }, ref) => (
  <Box
    ref={ref}
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
      padding: "1.5rem",
      ...style,
    }}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ style, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="h3"
    sx={{
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: "-0.025em",
      fontFamily: "'Crimson Text', Georgia, serif",
      ...style,
    }}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = forwardRef<HTMLDivElement, CardProps>(({ style, ...props }, ref) => (
  <Box
    ref={ref}
    sx={{
      padding: "1.5rem",
      paddingTop: 0,
      ...style,
    }}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// Tabs Components (using Radix primitives with inline styles)
const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ style, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    style={{
      display: "inline-flex",
      height: "2.5rem",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0.375rem",
      backgroundColor: hslAlpha(cssVariables.muted, 0.5),
      padding: "0.25rem",
      color: hsl(cssVariables.mutedForeground),
      ...style,
    }}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ style, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      borderRadius: "0.25rem",
      padding: "0.375rem 0.75rem",
      fontSize: "0.875rem",
      fontWeight: 500,
      transition: "all 0.15s",
      outline: "none",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      color: "inherit",
      ...style,
    }}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ style, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    style={{
      marginTop: "0.5rem",
      outline: "none",
      ...style,
    }}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

// Accordion Components
const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ style, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    style={{
      borderBottom: `1px solid ${hsl(cssVariables.border)}`,
      ...style,
    }}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, style, ...props }, ref) => (
  <AccordionPrimitive.Header style={{ display: "flex" }}>
    <AccordionPrimitive.Trigger
      ref={ref}
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
        fontWeight: 500,
        transition: "all 0.15s",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
        textAlign: "left",
        color: hsl(cssVariables.foreground),
        fontFamily: "'Crimson Text', Georgia, serif",
        ...style,
      }}
      {...props}
    >
      {children}
      <IconChevronDown style={{ width: "1rem", height: "1rem", flexShrink: 0, transition: "transform 0.2s", color: hsl(cssVariables.mutedForeground) }} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, style, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    style={{
      overflow: "hidden",
      fontSize: "0.875rem",
      ...style,
    }}
    {...props}
  >
    <Box sx={{ paddingBottom: "1rem", paddingTop: 0 }}>{children}</Box>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

// ScrollArea Components
const ScrollArea = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ children, style, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    style={{
      position: "relative",
      overflow: "hidden",
      ...style,
    }}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport style={{ height: "100%", width: "100%", borderRadius: "inherit" }}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation="horizontal"
      style={{
        display: "flex",
        touchAction: "none",
        userSelect: "none",
        transition: "colors 0.15s",
        height: "0.625rem",
        flexDirection: "column",
        borderTop: "1px solid transparent",
        padding: "1px",
      }}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        style={{
          position: "relative",
          flex: 1,
          borderRadius: "9999px",
          backgroundColor: hsl(cssVariables.border),
        }}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = "ScrollArea";

// ============================================
// MOCK DATA - Iconic Ghoul Character (imported)
// ============================================
// ============================================
// COMPONENT STYLES
// ============================================

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: hsl(cssVariables.background),
    color: hsl(cssVariables.foreground),
  } as React.CSSProperties,
  
  container: {
    maxWidth: "56rem",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  } as React.CSSProperties,
  
  heroGradient: {
    position: "absolute" as const,
    inset: 0,
    background: `linear-gradient(to bottom, ${hslAlpha(cssVariables.gothicPurple, 0.05)}, transparent)`,
    pointerEvents: "none" as const,
  } as React.CSSProperties,
  
  headerCenter: {
    textAlign: "center" as const,
    marginBottom: "3rem",
  } as React.CSSProperties,
  
  generationBadgesContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  } as React.CSSProperties,
  
  h1: {
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
    fontFamily: "'Crimson Text', Georgia, serif",
    fontWeight: 700,
    marginBottom: "1rem",
    letterSpacing: "-0.025em",
    color: hsl(cssVariables.foreground),
  } as React.CSSProperties,
  
  alternativeNames: {
    color: hsl(cssVariables.mutedForeground),
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
  } as React.CSSProperties,
  
  tagline: {
    fontSize: "1.125rem",
    color: hsl(cssVariables.gothicWarmGray),
    fontStyle: "italic",
    fontFamily: "'Crimson Text', Georgia, serif",
  } as React.CSSProperties,
  
  heroImageContainer: {
    position: "relative" as const,
    margin: "0 auto 3rem",
    width: "16rem",
    aspectRatio: "4/5",
    borderRadius: "1rem",
    overflow: "hidden",
    border: `1px solid ${hslAlpha(cssVariables.gothicPurple, 0.2)}`,
    boxShadow: `0 0 20px -5px ${hslAlpha(cssVariables.gothicPurple, 0.3)}`,
    backgroundColor: "#FFFFFF",
  } as React.CSSProperties,

  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain" as const,
    objectPosition: "center",
  } as React.CSSProperties,
  
  heroOverlay: {
    position: "absolute" as const,
    inset: 0,
    background: `linear-gradient(to top, ${hslAlpha(cssVariables.background, 0.8)}, transparent, transparent)`,
  } as React.CSSProperties,
  
  mainGrid: {
    display: "grid",
    gap: "2rem",
  } as React.CSSProperties,
  
  contentColumn: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "3rem",
  } as React.CSSProperties,
  
  sectionTitle: {
    fontSize: "1.5rem",
    fontFamily: "'Crimson Text', Georgia, serif",
    fontWeight: 600,
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: hsl(cssVariables.foreground),
  } as React.CSSProperties,
  
  bodyText: {
    color: hslAlpha(cssVariables.foreground, 0.9),
    lineHeight: 1.7,
  } as React.CSSProperties,
  
  easterEggBox: {
    background: `linear-gradient(90deg, ${hslAlpha(cssVariables.gothicPurple, 0.15)}, transparent)`,
    borderLeft: `2px solid ${hsl(cssVariables.gothicPurple)}`,
    padding: "0.75rem",
    borderRadius: "0 0.5rem 0.5rem 0",
    marginTop: "0.75rem",
  } as React.CSSProperties,
  
  releaseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  } as React.CSSProperties,
  
  variantScroll: {
    display: "flex",
    gap: "1rem",
    paddingBottom: "1rem",
    overflowX: "auto" as const,
  } as React.CSSProperties,
  
  relationshipGroup: {
    marginBottom: "1.5rem",
  } as React.CSSProperties,
  
  relationshipLabel: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: hsl(cssVariables.mutedForeground),
    marginBottom: "0.75rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  } as React.CSSProperties,
  
  relationshipGrid: {
    display: "grid",
    gap: "0.5rem",
  } as React.CSSProperties,
  
  stickyPanel: {
    position: "sticky" as const,
    top: "1.5rem",
    border: `1px solid ${hslAlpha(cssVariables.gothicPurple, 0.2)}`,
    backgroundColor: hslAlpha(cssVariables.card, 0.8),
    backdropFilter: "blur(8px)",
  } as React.CSSProperties,
  
  quickFactRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  } as React.CSSProperties,
  
  quickFactLabel: {
    color: hsl(cssVariables.mutedForeground),
    fontSize: "0.875rem",
  } as React.CSSProperties,
  
  quickFactValue: {
    fontWeight: 500,
    fontSize: "0.875rem",
    color: hsl(cssVariables.foreground),
  } as React.CSSProperties,
  
  badgeContainer: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap" as const,
    marginTop: "0.5rem",
  } as React.CSSProperties,
  
  communitySection: {
    borderTop: `1px solid ${hsl(cssVariables.border)}`,
    paddingTop: "3rem",
  } as React.CSSProperties,
  
  communityGrid: {
    display: "grid",
    gap: "0.75rem",
  } as React.CSSProperties,
  
  iconPurple: {
    width: "1.25rem",
    height: "1.25rem",
    color: hsl(cssVariables.gothicPurple),
  } as React.CSSProperties,
  
  iconPink: {
    width: "1.25rem",
    height: "1.25rem",
    color: hsl(cssVariables.gothicPink),
  } as React.CSSProperties,
  
  iconSmall: {
    width: "1rem",
    height: "1rem",
  } as React.CSSProperties,
};

// ============================================
// PAGE SUB-COMPONENTS
// ============================================

const GenerationBadge = ({ gen }: { gen: string }) => {
  const colorMap: Record<string, React.CSSProperties> = {
    G1: { backgroundColor: hslAlpha(cssVariables.gothicPurple, 0.2), color: hsl(cssVariables.gothicPurple), borderColor: hslAlpha(cssVariables.gothicPurple, 0.3) },
    G2: { backgroundColor: hslAlpha(cssVariables.gothicPink, 0.2), color: hsl(cssVariables.gothicPink), borderColor: hslAlpha(cssVariables.gothicPink, 0.3) },
    G3: { backgroundColor: hslAlpha(cssVariables.gothicGold, 0.2), color: hsl(cssVariables.gothicGold), borderColor: hslAlpha(cssVariables.gothicGold, 0.3) },
    Skullector: { backgroundColor: hsl(cssVariables.secondary), color: hsl(cssVariables.secondaryForeground), borderColor: hsl(cssVariables.border) },
  };

  const genStyle = colorMap[gen] || colorMap.G1;

  return (
    <Typography
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 500,
        border: "1px solid",
        ...genStyle,
      }}
    >
      {gen}
    </Typography>
  );
};

const QuickFactsPanel = ({ data }: { data: CharacterIndexData }) => (
  <Card style={styles.stickyPanel}>
    <CardHeader style={{ paddingBottom: "0.75rem" }}>
      <CardTitle style={{ fontSize: "1.125rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <IconStar style={styles.iconPurple} />
        Quick Facts
      </CardTitle>
    </CardHeader>
    <CardContent style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.875rem" }}>
      <Box sx={styles.quickFactRow}>
        <Typography component="span" sx={styles.quickFactLabel}>Debut</Typography>
        <Typography component="span" sx={styles.quickFactValue}>{data.debutYear}</Typography>
      </Box>
      <Box sx={styles.quickFactRow}>
        <Typography component="span" sx={styles.quickFactLabel}>Species</Typography>
        <Typography component="span" sx={styles.quickFactValue}>{data.species}</Typography>
      </Box>
      <Box sx={styles.quickFactRow}>
        <Typography component="span" sx={styles.quickFactLabel}>Age</Typography>
        <Typography component="span" sx={styles.quickFactValue}>{data.age}</Typography>
      </Box>
      <Box sx={styles.quickFactRow}>
        <Typography component="span" sx={styles.quickFactLabel}>Birthday</Typography>
        <Typography component="span" sx={styles.quickFactValue}>{data.birthday}</Typography>
      </Box>
      <Box sx={styles.quickFactRow}>
        <Typography component="span" sx={styles.quickFactLabel}>Releases</Typography>
        <Typography component="span" sx={{ ...styles.quickFactValue, color: hsl(cssVariables.gothicPurple) }}>{data.releaseCount}</Typography>
      </Box>

      <Box sx={{ paddingTop: "0.75rem", borderTop: `1px solid ${hsl(cssVariables.border)}` }}>
        <Typography sx={{ ...styles.quickFactLabel, marginBottom: "0.5rem" }}>Signature Colors</Typography>
        <Box sx={styles.badgeContainer}>
          {data.signatureColors.map((color) => (
            <Badge key={color} variant="outline" style={{ fontSize: "0.75rem" }}>{color}</Badge>
          ))}
        </Box>
      </Box>

      <Box sx={{ paddingTop: "0.5rem" }}>
        <Typography sx={{ ...styles.quickFactLabel, marginBottom: "0.5rem" }}>Motifs</Typography>
        <Box sx={styles.badgeContainer}>
          {data.motifs.map((motif) => (
            <Badge key={motif} variant="secondary" style={{ fontSize: "0.75rem" }}>{motif}</Badge>
          ))}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const VariantCard = ({ variant }: { variant: CharacterIndexVariant }) => (
  <Box sx={{ flex: "none", width: "9rem", cursor: "pointer" }}>
    <Box sx={{ aspectRatio: "3/4", borderRadius: "0.5rem", overflow: "hidden", marginBottom: "0.5rem", border: `1px solid ${hslAlpha(cssVariables.gothicPurple, 0.2)}`, transition: "border-color 0.3s" }}>
      <Box component="img" src={variant.image} alt={variant.name} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} />
    </Box>
    <Typography sx={{ fontSize: "0.75rem", textAlign: "center", color: hsl(cssVariables.mutedForeground), transition: "color 0.3s" }}>{variant.name}</Typography>
  </Box>
);

const RelationshipItem = ({ name, role, link }: { name: string; role: string; link: string }) => (
  <Link href={link} sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    backgroundColor: hslAlpha(cssVariables.muted, 0.5),
    transition: "background-color 0.2s",
    textDecoration: "none",
    color: "inherit",
  }}>
    <Box>
      <Typography sx={{ fontWeight: 500, fontSize: "0.875rem", color: hsl(cssVariables.foreground), transition: "color 0.2s" }}>{name}</Typography>
      <Typography sx={{ fontSize: "0.75rem", color: hsl(cssVariables.mutedForeground) }}>{role}</Typography>
    </Box>
    <IconChevronRight style={{ width: "1rem", height: "1rem", color: hsl(cssVariables.mutedForeground), transition: "color 0.2s" }} />
  </Link>
);

const TimelineItem = ({ year, event, isLast }: { year: number; event: string; isLast: boolean }) => (
  <Box sx={{ display: "flex", gap: "1rem" }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ width: "0.75rem", height: "0.75rem", borderRadius: "9999px", backgroundColor: hsl(cssVariables.gothicPurple) }} />
      {!isLast && <Box sx={{ width: "1px", height: "100%", backgroundColor: hsl(cssVariables.border) }} />}
    </Box>
    <Box sx={{ paddingBottom: "1.5rem" }}>
      <Typography sx={{ fontSize: "0.75rem", color: hsl(cssVariables.gothicPurple), fontWeight: 500, marginBottom: "0.25rem" }}>{year}</Typography>
      <Typography sx={{ fontSize: "0.875rem", color: hsl(cssVariables.mutedForeground) }}>{event}</Typography>
    </Box>
  </Box>
);

const TriviaCard = ({ trivia }: { trivia: CharacterIndexTriviaItem }) => (
  <Card style={{ border: `1px solid ${hslAlpha(cssVariables.gothicPurple, 0.2)}`, backgroundColor: hslAlpha(cssVariables.card, 0.5) }}>
    <CardContent style={{ padding: "1rem" }}>
      <Badge variant="outline" style={{ marginBottom: "0.75rem", fontSize: "0.75rem" }}>{trivia.category}</Badge>
      <Typography sx={{ fontSize: "0.875rem", color: hslAlpha(cssVariables.foreground, 0.9), lineHeight: 1.6 }}>{trivia.text}</Typography>
      {trivia.source && (
        <Typography sx={{ fontSize: "0.75rem", color: hsl(cssVariables.gothicWarmGray), marginTop: "0.5rem", fontStyle: "italic" }}>— {trivia.source}</Typography>
      )}
    </CardContent>
  </Card>
);

const CommunityCard = ({ item }: { item: CharacterIndexCommunityItem }) => (
  <Link href={item.link} sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderRadius: "0.5rem",
    backgroundColor: hslAlpha(cssVariables.muted, 0.3),
    border: `1px solid ${hslAlpha(cssVariables.border, 0.5)}`,
    transition: "border-color 0.2s",
    textDecoration: "none",
    color: "inherit",
  }}>
    <Box>
      <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: hslAlpha(cssVariables.foreground, 0.8), transition: "color 0.2s" }}>{item.type}</Typography>
      <Typography sx={{ fontSize: "0.75rem", color: hsl(cssVariables.mutedForeground) }}>{item.title}</Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Typography component="span" sx={{ fontSize: "0.75rem", color: hsl(cssVariables.gothicPink) }}>{item.count}</Typography>
      <IconExternalLink style={{ width: "0.75rem", height: "0.75rem", color: hsl(cssVariables.mutedForeground) }} />
    </Box>
  </Link>
);

// ============================================
// MAIN PAGE COMPONENT
// ============================================

const CharacterPageV2 = () => {
  const { internal_id } = useParams();
  const characterIndexMock = characterIndexMockById(internal_id);
  const [releaseFilter, setReleaseFilter] = useState("all");

  const filteredReleases = characterIndexMock.releases.filter((release) => {
    if (releaseFilter === "all") return true;
    if (releaseFilter === "main") return release.edition === "main";
    if (releaseFilter === "special") return release.edition === "special";
    return true;
  });

  // Responsive grid for releases (inline media query simulation via CSS)
  const releaseGridStyle: React.CSSProperties = {
    ...styles.releaseGrid,
  };

  const twoColGridStyle: React.CSSProperties = {
    ...styles.relationshipGrid,
  };

  return (
    <>
      <GlobalStyles />
      <style>{`
        @media (min-width: 640px) {
          .release-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .two-col-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .community-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 768px) {
          .main-grid { grid-template-columns: 1fr 280px !important; }
          .hero-image-container { width: 20rem !important; }
          .mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
        }
        [data-state="active"] {
          background-color: ${hsl(cssVariables.background)} !important;
          color: ${hsl(cssVariables.foreground)} !important;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
        }
        [data-state="open"] > svg:last-child {
          transform: rotate(180deg);
        }
      `}</style>

      <Box sx={styles.page}>
        {/* Hero Section */}
        <Box sx={{ position: "relative" }}>
          <Box sx={styles.heroGradient} />

          <Box sx={{ ...styles.container, paddingTop: "3rem", paddingBottom: "2rem" }}>
            {/* Character Header */}
            <Box component="header" sx={styles.headerCenter}>
              <Box sx={styles.generationBadgesContainer}>
                {characterIndexMock.generations.map((gen) => (
                  <GenerationBadge key={gen} gen={gen} />
                ))}
              </Box>

              <Typography variant="h1" sx={styles.h1}>{characterIndexMock.name}</Typography>

              <Typography sx={styles.alternativeNames}>
                {characterIndexMock.alternativeNames.join(" • ")}
              </Typography>

              <Typography sx={styles.tagline}>"{characterIndexMock.tagline}"</Typography>
            </Box>

            {/* Hero Image */}
            <Box className="hero-image-container" sx={styles.heroImageContainer}>
              <Box component="img" src={characterIndexMock.heroImage} alt={characterIndexMock.name} sx={styles.heroImage} />
            </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ ...styles.container, paddingBottom: "4rem" }}>
          <Box className="main-grid" sx={styles.mainGrid}>
            {/* Primary Content Column */}
            <Box sx={styles.contentColumn}>
              {/* Official Description */}
              <Box component="section">
                <Typography variant="h2" sx={styles.sectionTitle}>
                  <IconBookOpen style={styles.iconPurple} />
                  About
                </Typography>
                <Typography sx={styles.bodyText}>{characterIndexMock.officialDescription}</Typography>
              </Box>

              {/* Biography */}
              <Box component="section">
                <Typography variant="h2" sx={styles.sectionTitle}>Biography</Typography>
                <Box sx={{ ...styles.bodyText, color: hslAlpha(cssVariables.foreground, 0.8) }}>
                  {characterIndexMock.biography.split('\n\n').map((paragraph, i) => (
                    <Typography key={i} sx={{ marginBottom: "1rem" }}>{paragraph}</Typography>
                  ))}
                </Box>

                {/* Easter Eggs */}
                <Box sx={{ marginTop: "1.5rem" }}>
                  <Typography variant="h3" sx={{ ...styles.relationshipLabel, marginBottom: "0.75rem" }}>
                    <IconSparkles style={{ ...styles.iconSmall, color: hsl(cssVariables.gothicPink) }} />
                    Easter Eggs & Fun Facts
                  </Typography>
                  {characterIndexMock.easterEggs.map((egg, i) => (
                    <Box key={i} sx={styles.easterEggBox}>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        <Typography component="span" sx={{ marginRight: "0.5rem" }}>{egg.icon}</Typography>
                        {egg.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Releases */}
              <Box component="section">
                <Typography variant="h2" sx={styles.sectionTitle}>
                  <IconSkull style={styles.iconPurple} />
                  Releases & Appearances
                </Typography>

                <Tabs value={releaseFilter} onValueChange={setReleaseFilter}>
                  <TabsList style={{ marginBottom: "1.5rem" }}>
                    <TabsTrigger value="all">All ({characterIndexMock.releases.length})</TabsTrigger>
                    <TabsTrigger value="main">Main</TabsTrigger>
                    <TabsTrigger value="special">Special Editions</TabsTrigger>
                  </TabsList>

                  <TabsContent value={releaseFilter} style={{ marginTop: 0 }}>
                    <Box className="release-grid" sx={releaseGridStyle}>
                      {filteredReleases.map((release) => (
                        <ReleaseCardCharacterIndex key={release.id} release={release} />
                      ))}
                    </Box>
                  </TabsContent>
                </Tabs>
              </Box>

              {/* Character Variants */}
              <Box component="section">
                <Typography variant="h2" sx={styles.sectionTitle}>
                  <IconPalette style={styles.iconPurple} />
                  Character Looks
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", color: hsl(cssVariables.mutedForeground), marginBottom: "1rem" }}>
                  Different canonical representations across media
                </Typography>

                <ScrollArea>
                  <Box sx={styles.variantScroll}>
                    {characterIndexMock.variants.map((variant) => (
                      <VariantCard key={variant.id} variant={variant} />
                    ))}
                  </Box>
                </ScrollArea>
              </Box>

              {/* Relationships */}
              <Box component="section">
                <Typography variant="h2" sx={styles.sectionTitle}>
                  <IconUsers style={styles.iconPurple} />
                  Relationships
                </Typography>

                <Box>
                  {/* Family */}
                  <Box sx={styles.relationshipGroup}>
                    <Typography variant="h3" sx={styles.relationshipLabel}>
                      <IconHeart style={styles.iconSmall} /> Family
                    </Typography>
                    <Box sx={styles.relationshipGrid}>
                      {characterIndexMock.relationships.family.map((person) => (
                        <RelationshipItem key={person.name} {...person} />
                      ))}
                    </Box>
                  </Box>

                  {/* Friends */}
                  <Box sx={styles.relationshipGroup}>
                    <Typography variant="h3" sx={styles.relationshipLabel}>
                      <IconUsers style={styles.iconSmall} /> Friends
                    </Typography>
                    <Box className="two-col-grid" sx={twoColGridStyle}>
                      {characterIndexMock.relationships.friends.map((person) => (
                        <RelationshipItem key={person.name} {...person} />
                      ))}
                    </Box>
                  </Box>

                  {/* Romantic */}
                  <Box sx={styles.relationshipGroup}>
                    <Typography variant="h3" sx={styles.relationshipLabel}>
                      <IconHeart style={styles.iconSmall} /> Romantic
                    </Typography>
                    <Box className="two-col-grid" sx={twoColGridStyle}>
                      {characterIndexMock.relationships.romantic.map((person) => (
                        <RelationshipItem key={person.name} {...person} />
                      ))}
                    </Box>
                  </Box>

                  {/* Pets */}
                  <Box sx={styles.relationshipGroup}>
                    <Typography variant="h3" sx={styles.relationshipLabel}>
                      <IconPawPrint style={styles.iconSmall} /> Pets
                    </Typography>
                    <Box sx={styles.relationshipGrid}>
                      {characterIndexMock.relationships.pets.map((pet) => (
                        <RelationshipItem key={pet.name} name={pet.name} role={pet.species} link={pet.link} />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Collapsible Sections */}
              <Accordion type="multiple" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Timeline */}
                <AccordionItem value="timeline" style={{ border: `1px solid ${hslAlpha(cssVariables.gothicPurple, 0.2)}`, borderRadius: "0.5rem", padding: "0 1rem" }}>
                  <AccordionTrigger>
                    <Typography component="span" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Crimson Text', Georgia, serif", fontSize: "1.125rem" }}>
                      <IconClock style={styles.iconPurple} />
                      Timeline of Appearances
                    </Typography>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Box sx={{ paddingTop: "1rem" }}>
                      {characterIndexMock.timeline.map((item, index) => (
                        <TimelineItem key={index} year={item.year} event={item.event} isLast={index === characterIndexMock.timeline.length - 1} />
                      ))}
                    </Box>
                  </AccordionContent>
                </AccordionItem>

                {/* Lore & Trivia */}
                <AccordionItem value="trivia" style={{ border: `1px solid ${hslAlpha(cssVariables.gothicPurple, 0.2)}`, borderRadius: "0.5rem", padding: "0 1rem" }}>
                  <AccordionTrigger>
                    <Typography component="span" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Crimson Text', Georgia, serif", fontSize: "1.125rem" }}>
                      <IconSparkles style={styles.iconPink} />
                      Lore, Trivia & References
                    </Typography>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Box sx={{ paddingTop: "1rem", display: "grid", gap: "1rem" }}>
                      {characterIndexMock.trivia.map((item, index) => (
                        <TriviaCard key={index} trivia={item} />
                      ))}
                    </Box>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Community Content */}
              <Box component="section" sx={styles.communitySection}>
                <Typography variant="h2" sx={{ ...styles.sectionTitle, fontSize: "1.25rem", color: hsl(cssVariables.mutedForeground) }}>
                  <IconHeart style={styles.iconPink} />
                  Community & Fan Content
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", color: hsl(cssVariables.mutedForeground), marginBottom: "1.5rem" }}>
                  Fan creations and community contributions
                </Typography>

                <Box className="community-grid" sx={styles.communityGrid}>
                  {characterIndexMock.communityContent.map((item, index) => (
                    <CommunityCard key={index} item={item} />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Sticky Sidebar (Quick Facts) - Desktop */}
            <Box component="aside" className="desktop-only">
              <QuickFactsPanel data={characterIndexMock} />
            </Box>
          </Box>

          {/* Mobile Quick Facts */}
          <Box className="mobile-only" sx={{ marginTop: "3rem" }}>
            <QuickFactsPanel data={characterIndexMock} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CharacterPageV2;
