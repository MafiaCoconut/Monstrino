import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline,
  AppBar, Toolbar, IconButton, Typography, Box, Container, Chip, Avatar,
  Card, CardContent, CardMedia, CardActions, CardHeader,
  Tabs, Tab, Button, TextField, InputAdornment, Collapse, Drawer,
  List, ListItemButton, ListItemIcon, ListItemText, Divider, Skeleton,
  Dialog, DialogContent, DialogTitle, Fab, Tooltip, Paper, Grid,
  Switch, FormControlLabel, Alert, AlertTitle, useMediaQuery,
} from '@mui/material';
import {
  DarkMode, LightMode, Search, ExpandMore, ExpandLess,
  Favorite, FavoriteBorder, Share, Flag, Close, Menu as MenuIcon,
  Pets as PetsIcon, PhotoLibrary, Timeline as TimelineIcon,
  Person, People, EmojiEvents, AutoStories, Bookmark, FilterList,
  ArrowUpward, Star, StarBorder, Visibility, Link as LinkIcon,
  KeyboardArrowUp,
} from '@mui/icons-material';

// ─── Color Palette ─────────────────────────────────────────────
const PALETTE = {
  plum: '#4A2040',
  plumLight: '#6B3A5E',
  plumDark: '#2E1228',
  charcoal: '#2C2C34',
  charcoalLight: '#3D3D48',
  offWhite: '#FAF7F5',
  cream: '#F5F0EC',
  rose: '#D4A0A0',
  roseLight: '#E8C4C4',
  gold: '#C9A96E',
  goldLight: '#E0CC9D',
  orchid: '#9B6B8E',
  bone: '#E8E0D8',
  ink: '#1A1A22',
};

// ─── Ornamental Divider ────────────────────────────────────────
const OrnamentalDivider = ({ color = PALETTE.plum }: { color?: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4, gap: 2 }}>
    <Box sx={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${color}40)` }} />
    <Typography sx={{ color: color, fontSize: 18, opacity: 0.5, letterSpacing: 8 }}>✦ ✦ ✦</Typography>
    <Box sx={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}40, transparent)` }} />
  </Box>
);

// ─── Section Wrapper ───────────────────────────────────────────
const SectionWrapper = ({ id, title, children, isDark }: { id: string; title: string; children: React.ReactNode; isDark: boolean }) => (
  <Box id={id} sx={{ mb: 6, scrollMarginTop: '80px' }}>
    <Typography variant="h4" sx={{
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      mb: 3,
      color: isDark ? PALETTE.roseLight : PALETTE.plum,
      fontSize: { xs: '1.5rem', md: '2rem' },
      letterSpacing: '0.02em',
    }}>
      {title}
    </Typography>
    {children}
  </Box>
);

// ─── Placeholder Image ────────────────────────────────────────
const PlaceholderImage = ({ width = '100%', height = 200, label = '', gradient = `linear-gradient(135deg, ${PALETTE.plum}, ${PALETTE.orchid})` }: { width?: string | number; height?: number; label?: string; gradient?: string }) => (
  <Box sx={{ width, height, background: gradient, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.9 }}>
    {label || 'Image'}
  </Box>
);

// ─── Loading Skeleton ──────────────────────────────────────────
const SectionSkeleton = () => (
  <Box sx={{ mb: 4 }}>
    <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 1 }} />
    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
  </Box>
);

// ─── Empty State ───────────────────────────────────────────────
const EmptyState = ({ message = 'No content yet.', isDark }: { message?: string; isDark: boolean }) => (
  <Paper sx={{ p: 4, textAlign: 'center', bgcolor: isDark ? PALETTE.charcoalLight : PALETTE.cream, borderRadius: 3 }}>
    <Typography sx={{ color: isDark ? PALETTE.bone : PALETTE.charcoal, opacity: 0.7, fontStyle: 'italic' }}>{message}</Typography>
  </Paper>
);

// ─── Error State ───────────────────────────────────────────────
const ErrorState = ({ message = 'Something went wrong.', isDark }: { message?: string; isDark: boolean }) => (
  <Alert severity="error" sx={{ borderRadius: 3, bgcolor: isDark ? '#3a1c1c' : undefined }}>
    <AlertTitle>Error</AlertTitle>
    {message}
  </Alert>
);

// ─── Sample Data ───────────────────────────────────────────────
const CHARACTER = {
  name: 'Draculaura',
  altNames: ['Ula D', 'Laura', 'ドラキュローラ', 'Дракулаура'],
  generations: ['G1', 'G2', 'G3', 'Skullector'],
  species: 'Vampire',
  hometown: 'Transylvania',
  affiliation: 'Monster High',
  firstAppearance: 2010,
  bio: `Draculaura is a sweet, fashion-forward vampire who has been a student at Monster High since its founding. Despite being over 1,600 years old, she maintains the appearance and spirit of a teenager. She's a vegan vampire who faints at the sight of blood, preferring beet juice and iron supplements instead. Her bubbly personality and fierce loyalty to her friends make her one of the most beloved ghouls at Monster High. She's known for her signature pink-and-black aesthetic, heart-shaped beauty mark, and parasol to protect her from sunlight.`,
  facts: [
    { title: 'Age', text: '1,599+ years old (but forever 15 in spirit)' },
    { title: 'Diet', text: 'Strict vegan — faints at the sight of blood' },
    { title: 'Signature Color', text: 'Hot pink & black with heart motifs' },
    { title: 'Fun Fact', text: 'She was adopted by Count Dracula as a baby vampire' },
  ],
  biography: {
    earlyLife: 'Born in Transylvania in the early 5th century, Draculaura was turned into a vampire at an undetermined young age. Count Dracula adopted her, and she has called him "Daddy" ever since. Over the centuries she lived across Europe, witnessing historical events firsthand while maintaining her youthful spirit.',
    keyEvents: 'Draculaura was instrumental in the founding of Monster High, advocating for a school where monsters could be themselves without fear. She helped organize the first Fearleading squad and was pivotal in bridging relationships between different monster species. Her bravery during the Great Scarrier Reef incident cemented her legacy.',
    personality: 'Bubbly, optimistic, and fiercely loyal, Draculaura sees the best in everyone — even normies. She has a dramatic flair but backs it up with genuine compassion. Her fashion sense is impeccable, and she runs a popular blog called "Party Planning with Draculaura." She can be sensitive about her vampiric limitations but never lets them define her.',
  },
  relationships: {
    family: [
      { name: 'Count Dracula', type: 'Father (adoptive)', note: 'Overprotective but loving dad who runs a vampire empire', avatar: 'CD' },
      { name: 'Ramoanah D.', type: 'Stepmother', note: 'Married Dracula in G3 reboot — warm relationship', avatar: 'RD' },
    ],
    friends: [
      { name: 'Clawdeen Wolf', type: 'Best Friend', note: 'Inseparable since Day 1 at Monster High — fashion partners', avatar: 'CW' },
      { name: 'Frankie Stein', type: 'Best Friend', note: 'The newest ghoul — Draculaura helped her navigate school', avatar: 'FS' },
      { name: 'Cleo de Nile', type: 'Close Friend', note: 'Royal Egyptian mummy — frenemies turned besties', avatar: 'CN' },
      { name: 'Lagoona Blue', type: 'Close Friend', note: 'Chill sea monster who balances the group\'s energy', avatar: 'LB' },
    ],
    rivals: [
      { name: 'Toralei Stripe', type: 'Rival', note: 'Competitive werecat who stirs up trouble', avatar: 'TS' },
      { name: 'Nefera de Nile', type: 'Antagonist', note: 'Cleo\'s older sister — schemes against the ghouls', avatar: 'NN' },
    ],
    other: [],
  },
  pets: [
    { name: 'Count Fabulous', species: 'Bat', icon: '🦇' },
    { name: 'Nightmare', species: 'Horse (shared)', icon: '🐴' },
  ],
  releases: [
    { title: 'Original Draculaura Doll', date: '2010', line: 'First Wave', role: 'Main Character', gen: 'G1' },
    { title: 'Draculaura Sweet 1600', date: '2012', line: 'Sweet 1600', role: 'Birthday Star', gen: 'G1' },
    { title: 'Scaris: City of Frights', date: '2013', line: 'Scaris', role: 'Traveler', gen: 'G1' },
    { title: 'Haunted Draculaura', date: '2015', line: 'Haunted', role: 'Ghost Form', gen: 'G1' },
    { title: 'Welcome to MH', date: '2016', line: 'Welcome to Monster High', role: 'Reintroduction', gen: 'G2' },
    { title: 'Electrified', date: '2017', line: 'Electrified', role: 'Powered Up', gen: 'G2' },
    { title: 'G3 Reboot Draculaura', date: '2022', line: 'Monster High G3', role: 'Main Character', gen: 'G3' },
    { title: 'Skulltimate Secrets', date: '2022', line: 'Skulltimate Secrets', role: 'Locker Reveal', gen: 'G3' },
    { title: 'Monster Ball', date: '2023', line: 'Monster Ball', role: 'Ball Gown', gen: 'G3' },
    { title: 'Skullector Draculaura', date: '2023', line: 'Skullector', role: 'Premium Collector', gen: 'Skullector' },
  ],
  versions: [
    { gen: 'G1 (2010–2016)', desc: 'Pink & black, heart cheek mark, classic goth-glam. Romantic interest: Clawd Wolf. 1,599 years old.', color: PALETTE.plum },
    { gen: 'G2 (2016–2021)', desc: 'Simplified design, brighter palette, animated style. Retold origin story with modern sensibility.', color: PALETTE.orchid },
    { gen: 'G3 (2022–present)', desc: 'Reimagined with live-action tie-in. New friendships, updated lore, inclusive storytelling. Stepmother added.', color: PALETTE.rose },
  ],
  gallery: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    caption: [
      'Official box art — First Wave', 'Sweet 1600 promo', 'Scaris fashion shoot',
      'Haunted movie still', 'Freaky Field Trip', 'Dawn of the Dance',
      'G2 reboot art', 'Electrified poster', 'G3 debut promo',
      'Live-action still', 'Monster Ball gown', 'Skullector premium art',
    ][i],
    gradient: [
      `linear-gradient(135deg, ${PALETTE.plum}, ${PALETTE.rose})`,
      `linear-gradient(135deg, ${PALETTE.rose}, ${PALETTE.gold})`,
      `linear-gradient(135deg, ${PALETTE.orchid}, ${PALETTE.plum})`,
      `linear-gradient(135deg, ${PALETTE.charcoal}, ${PALETTE.plumLight})`,
      `linear-gradient(135deg, ${PALETTE.gold}, ${PALETTE.orchid})`,
      `linear-gradient(135deg, ${PALETTE.plumDark}, ${PALETTE.rose})`,
      `linear-gradient(135deg, ${PALETTE.orchid}, ${PALETTE.gold})`,
      `linear-gradient(135deg, ${PALETTE.rose}, ${PALETTE.plumLight})`,
      `linear-gradient(135deg, ${PALETTE.plum}, ${PALETTE.goldLight})`,
      `linear-gradient(135deg, ${PALETTE.charcoalLight}, ${PALETTE.orchid})`,
      `linear-gradient(135deg, ${PALETTE.gold}, ${PALETTE.plum})`,
      `linear-gradient(135deg, ${PALETTE.plumLight}, ${PALETTE.rose})`,
    ][i],
  })),
  fanCreations: {
    fanart: [
      { creator: '@artghoul99', title: 'Draculaura at Sunset', tags: ['digital', 'portrait'], likes: 342 },
      { creator: '@monster_draws', title: 'Vampire Prom Night', tags: ['traditional', 'scene'], likes: 218 },
    ],
    cosplay: [
      { creator: '@cosplay_crypt', title: 'G1 Classic Draculaura', tags: ['costume', 'wig', 'makeup'], likes: 891 },
    ],
    crafts: [
      { creator: '@doll_customs', title: 'OOAK Draculaura Repaint', tags: ['repaint', 'custom'], likes: 567 },
    ],
  },
  chronology: [
    { year: 2010, events: ['First Wave doll released', 'Webisode debut on YouTube', 'Monster High brand launch'] },
    { year: 2011, events: ['Dawn of the Dance special', '"Fright On!" TV movie'] },
    { year: 2012, events: ['Sweet 1600 doll line & movie', 'Friday Night Frights'] },
    { year: 2013, events: ['Scaris: City of Frights', '13 Wishes movie'] },
    { year: 2015, events: ['Haunted movie', 'Boo York, Boo York musical'] },
    { year: 2016, events: ['Welcome to Monster High (G2 reboot)', 'Electrified announced'] },
    { year: 2022, events: ['G3 doll line launch', 'Monster High: The Movie (live-action)', 'Skulltimate Secrets'] },
    { year: 2023, events: ['Monster High 2 (live-action sequel)', 'Monster Ball line', 'Skullector premium release'] },
  ],
};

const SECTIONS = [
  { id: 'hero', label: 'Hero', icon: <Star fontSize="small" /> },
  { id: 'overview', label: 'Overview', icon: <AutoStories fontSize="small" /> },
  { id: 'biography', label: 'Biography', icon: <Person fontSize="small" /> },
  { id: 'relationships', label: 'Relationships', icon: <People fontSize="small" /> },
  { id: 'pets', label: 'Pets', icon: <PetsIcon fontSize="small" /> },
  { id: 'releases', label: 'Releases', icon: <EmojiEvents fontSize="small" /> },
  { id: 'versions', label: 'Versions', icon: <FilterList fontSize="small" /> },
  { id: 'gallery', label: 'Gallery', icon: <PhotoLibrary fontSize="small" /> },
  { id: 'fan-creations', label: 'Fan Creations', icon: <Favorite fontSize="small" /> },
  { id: 'chronology', label: 'Chronology', icon: <TimelineIcon fontSize="small" /> },
];

// ─── Main Page Component ───────────────────────────────────────
const CharacterPage: React.FC = () => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDark);
  const [expandedBio, setExpandedBio] = useState(false);
  const [relTab, setRelTab] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [releaseSearch, setReleaseSearch] = useState('');
  const [releaseFilter, setReleaseFilter] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState(0);
  const [fanTab, setFanTab] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = darkMode;

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: { main: PALETTE.plum, light: PALETTE.plumLight },
      secondary: { main: PALETTE.rose },
      background: {
        default: isDark ? PALETTE.ink : PALETTE.offWhite,
        paper: isDark ? PALETTE.charcoal : '#FFFFFF',
      },
      text: {
        primary: isDark ? PALETTE.bone : PALETTE.ink,
        secondary: isDark ? PALETTE.roseLight : PALETTE.plumLight,
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      h1: { fontFamily: '"Playfair Display", serif' },
      h2: { fontFamily: '"Playfair Display", serif' },
      h3: { fontFamily: '"Playfair Display", serif' },
      h4: { fontFamily: '"Playfair Display", serif' },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark
              ? '0 4px 20px rgba(0,0,0,0.4)'
              : '0 2px 16px rgba(74,32,64,0.08)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 600 },
        },
      },
    },
  }), [isDark]);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileNavOpen(false);
  }, []);

  const filteredReleases = CHARACTER.releases.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(releaseSearch.toLowerCase());
    const matchFilter = !releaseFilter || r.gen === releaseFilter;
    return matchSearch && matchFilter;
  });

  const cardBg = isDark ? PALETTE.charcoalLight : '#FFFFFF';
  const cardBorder = isDark ? `1px solid ${PALETTE.plumLight}30` : `1px solid ${PALETTE.bone}`;
  const accentText = isDark ? PALETTE.roseLight : PALETTE.plum;
  const subtleText = isDark ? PALETTE.bone + 'CC' : PALETTE.charcoal + 'AA';

  // ─── SIDEBAR (Desktop) ────────────────────────────────────
  const SidebarNav = () => (
    <Box sx={{
      position: 'sticky',
      top: 80,
      width: 220,
      flexShrink: 0,
      display: { xs: 'none', md: 'block' },
    }}>
      <Typography variant="overline" sx={{ color: accentText, fontWeight: 700, mb: 1, display: 'block', letterSpacing: 2 }}>
        Contents
      </Typography>
      <List dense disablePadding>
        {SECTIONS.map(s => (
          <ListItemButton
            key={s.id}
            onClick={() => scrollTo(s.id)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              py: 0.75,
              '&:hover': { bgcolor: isDark ? PALETTE.plumLight + '20' : PALETTE.cream },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: accentText }}>{s.icon}</ListItemIcon>
            <ListItemText primary={s.label} primaryTypographyProps={{ fontSize: 13, fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 2, borderColor: isDark ? PALETTE.plumLight + '30' : PALETTE.bone }} />
      <Typography variant="overline" sx={{ color: accentText, fontWeight: 700, mb: 1, display: 'block', letterSpacing: 2, fontSize: 10 }}>
        Quick Actions
      </Typography>
      {[
        { icon: <Bookmark fontSize="small" />, label: 'Bookmark' },
        { icon: <Share fontSize="small" />, label: 'Share' },
        { icon: <Flag fontSize="small" />, label: 'Report' },
      ].map(a => (
        <Button
          key={a.label}
          startIcon={a.icon}
          size="small"
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            color: subtleText,
            textTransform: 'none',
            mb: 0.5,
            fontSize: 12,
            '&:hover': { color: accentText },
          }}
        >
          {a.label}
        </Button>
      ))}
    </Box>
  );

  // ─── MOBILE NAV DRAWER ────────────────────────────────────
  const MobileNavDrawer = () => (
    <Drawer
      anchor="bottom"
      open={mobileNavOpen}
      onClose={() => setMobileNavOpen(false)}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          bgcolor: isDark ? PALETTE.charcoal : '#fff',
          maxHeight: '60vh',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ width: 40, height: 4, bgcolor: PALETTE.bone, borderRadius: 2, mx: 'auto', mb: 2 }} />
        <Typography variant="overline" sx={{ color: accentText, fontWeight: 700, letterSpacing: 2 }}>
          Jump to Section
        </Typography>
        <List>
          {SECTIONS.map(s => (
            <ListItemButton key={s.id} onClick={() => scrollTo(s.id)} sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: 36, color: accentText }}>{s.icon}</ListItemIcon>
              <ListItemText primary={s.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  // ─── RELATIONSHIP NETWORK MINI DIAGRAM ─────────────────
  const RelationshipDiagram = () => {
    const allRels = [...CHARACTER.relationships.family, ...CHARACTER.relationships.friends.slice(0, 3), ...CHARACTER.relationships.rivals.slice(0, 1)];
    const cx = 120, cy = 80, r = 60;
    return (
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
        <svg width={240} height={160} viewBox="0 0 240 160">
          {allRels.map((rel, i) => {
            const angle = (Math.PI * 2 * i) / allRels.length - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke={isDark ? PALETTE.roseLight : PALETTE.plum} strokeWidth={1.5} opacity={0.4} />
                <circle cx={x} cy={y} r={14} fill={isDark ? PALETTE.plumLight : PALETTE.rose} opacity={0.8} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize={8} fill="#fff" fontWeight={600}>{rel.avatar}</text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r={18} fill={PALETTE.plum} />
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fill="#fff" fontWeight={700}>DL</text>
        </svg>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ─── TOP BAR ─────────────────────────────────────── */}
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: isDark ? PALETTE.charcoal + 'F0' : PALETTE.offWhite + 'F0',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isDark ? PALETTE.plumLight + '20' : PALETTE.bone}`,
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton onClick={() => setMobileNavOpen(true)} sx={{ color: accentText }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: accentText,
              letterSpacing: 2,
              fontSize: { xs: 16, md: 20 },
            }}>
              MONSTRINO
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
              <IconButton onClick={() => setDarkMode(!isDark)} sx={{ color: accentText }}>
                {isDark ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileNavDrawer />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 5 }}>
          <SidebarNav />

          {/* ─── MAIN CONTENT ──────────────────────────────── */}
          <Box ref={contentRef} sx={{ flex: 1, minWidth: 0, maxWidth: 900 }}>

            {/* ═══ 1. HERO ═══ */}
            <Box id="hero" sx={{ mb: 5, scrollMarginTop: '80px' }}>
              <Box sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                background: isDark
                  ? `linear-gradient(135deg, ${PALETTE.plumDark}, ${PALETTE.charcoal})`
                  : `linear-gradient(135deg, ${PALETTE.cream}, ${PALETTE.offWhite})`,
                border: cardBorder,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative circle */}
                <Box sx={{
                  position: 'absolute', top: -60, right: -60, width: 200, height: 200,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${PALETTE.rose}20, transparent)`,
                }} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: { md: 'flex-start' } }}>
                  {/* Avatar placeholder */}
                  <Box sx={{ flexShrink: 0 }}>
                    <PlaceholderImage
                      width={isMobile ? '100%' : 200}
                      height={isMobile ? 200 : 260}
                      label="Character Art"
                      gradient={`linear-gradient(135deg, ${PALETTE.plum}, ${PALETTE.rose})`}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h1" sx={{
                      fontWeight: 800,
                      fontSize: { xs: '2.2rem', md: '3.2rem' },
                      lineHeight: 1.1,
                      color: isDark ? '#fff' : PALETTE.plumDark,
                      mb: 1.5,
                    }}>
                      {CHARACTER.name}
                    </Typography>

                    {/* Alt names */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                      {CHARACTER.altNames.map(n => (
                        <Chip key={n} label={n} size="small" sx={{
                          bgcolor: isDark ? PALETTE.plumLight + '40' : PALETTE.rose + '30',
                          color: isDark ? PALETTE.roseLight : PALETTE.plum,
                          fontSize: 11,
                        }} />
                      ))}
                    </Box>

                    {/* Generation badges */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                      {CHARACTER.generations.map(g => (
                        <Chip key={g} label={g} size="small" variant="outlined" sx={{
                          borderColor: isDark ? PALETTE.gold : PALETTE.plum,
                          color: isDark ? PALETTE.goldLight : PALETTE.plum,
                          fontWeight: 700,
                          fontSize: 12,
                        }} />
                      ))}
                    </Box>

                    {/* Metadata grid */}
                    <Grid container spacing={2}>
                      {[
                        { label: 'Species', value: CHARACTER.species },
                        { label: 'Hometown', value: CHARACTER.hometown },
                        { label: 'Affiliation', value: CHARACTER.affiliation },
                        { label: 'First Appearance', value: String(CHARACTER.firstAppearance) },
                      ].map(m => (
                        <Grid size={{ xs: 6, sm: 3 }} key={m.label}>
                          <Typography variant="overline" sx={{ color: subtleText, fontSize: 10, letterSpacing: 1.5, display: 'block' }}>
                            {m.label}
                          </Typography>
                          <Typography sx={{ fontWeight: 600, fontSize: 14, color: isDark ? '#fff' : PALETTE.ink }}>
                            {m.value}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 2. OVERVIEW ═══ */}
            <SectionWrapper id="overview" title="Overview" isDark={isDark}>
              <Card sx={{ bgcolor: cardBg, border: cardBorder }}>
                <CardContent>
                  <Collapse in={expandedBio} collapsedSize={80}>
                    <Typography sx={{ lineHeight: 1.8, color: isDark ? PALETTE.bone : PALETTE.charcoal, fontSize: 15 }}>
                      {CHARACTER.bio}
                    </Typography>
                  </Collapse>
                  <Button
                    onClick={() => setExpandedBio(!expandedBio)}
                    endIcon={expandedBio ? <ExpandLess /> : <ExpandMore />}
                    sx={{ mt: 1, color: accentText, textTransform: 'none', fontWeight: 600 }}
                  >
                    {expandedBio ? 'Show less' : 'Read more'}
                  </Button>
                </CardContent>
              </Card>

              {/* Facts */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {CHARACTER.facts.map(f => (
                  <Grid size={{ xs: 12, sm: 6 }} key={f.title}>
                    <Card sx={{ bgcolor: cardBg, border: cardBorder, height: '100%' }}>
                      <CardContent>
                        <Typography variant="overline" sx={{ color: accentText, fontWeight: 700, letterSpacing: 1.5, fontSize: 10 }}>
                          {f.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: isDark ? PALETTE.bone : PALETTE.charcoal, mt: 0.5 }}>
                          {f.text}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </SectionWrapper>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 3. BIOGRAPHY ═══ */}
            <SectionWrapper id="biography" title="Biography" isDark={isDark}>
              {[
                { heading: 'Early Life', text: CHARACTER.biography.earlyLife },
                { heading: 'Key Events', text: CHARACTER.biography.keyEvents },
                { heading: 'Personality', text: CHARACTER.biography.personality },
              ].map((section, i) => (
                <Box key={section.heading} sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    color: accentText,
                    mb: 1,
                    fontSize: { xs: 16, md: 18 },
                  }}>
                    {section.heading}
                  </Typography>
                  <Typography sx={{ lineHeight: 1.8, color: isDark ? PALETTE.bone : PALETTE.charcoal, fontSize: 14 }}>
                    {section.text}
                  </Typography>
                  {i < 2 && (
                    <Divider sx={{ mt: 3, borderColor: isDark ? PALETTE.plumLight + '20' : PALETTE.bone }} />
                  )}
                </Box>
              ))}
            </SectionWrapper>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 4. RELATIONSHIPS ═══ */}
            <SectionWrapper id="relationships" title="Relationships" isDark={isDark}>
              <Tabs
                value={relTab}
                onChange={(_, v) => setRelTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  mb: 2,
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    color: subtleText,
                    '&.Mui-selected': { color: accentText },
                  },
                  '& .MuiTabs-indicator': { bgcolor: accentText },
                }}
              >
                <Tab label="Family" />
                <Tab label="Friends" />
                <Tab label="Rivals" />
                <Tab label="Other" />
              </Tabs>

              {(['family', 'friends', 'rivals', 'other'] as const).map((key, idx) => (
                relTab === idx && (
                  <Box key={key}>
                    {CHARACTER.relationships[key].length === 0 ? (
                      <EmptyState message="No relationships listed yet." isDark={isDark} />
                    ) : (
                      <Grid container spacing={2}>
                        {CHARACTER.relationships[key].map(rel => (
                          <Grid size={{ xs: 12, sm: 6 }} key={rel.name}>
                            <Card sx={{ bgcolor: cardBg, border: cardBorder, display: 'flex', alignItems: 'center', p: 2 }}>
                              <Avatar sx={{
                                bgcolor: isDark ? PALETTE.plumLight : PALETTE.plum,
                                color: '#fff',
                                width: 48, height: 48,
                                mr: 2, fontWeight: 700, fontSize: 14,
                              }}>
                                {rel.avatar}
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: 14, color: isDark ? '#fff' : PALETTE.ink }}>
                                  {rel.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: accentText, fontWeight: 600 }}>
                                  {rel.type}
                                </Typography>
                                <Typography sx={{ fontSize: 12, color: subtleText, mt: 0.25 }}>
                                  {rel.note}
                                </Typography>
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                )
              ))}

              <RelationshipDiagram />
            </SectionWrapper>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 5. PETS ═══ */}
            <SectionWrapper id="pets" title="Pets" isDark={isDark}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {CHARACTER.pets.map(pet => (
                  <Card key={pet.name} sx={{ bgcolor: cardBg, border: cardBorder, display: 'flex', alignItems: 'center', p: 2, pr: 3 }}>
                    <Typography sx={{ fontSize: 32, mr: 2 }}>{pet.icon}</Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: isDark ? '#fff' : PALETTE.ink }}>
                        {pet.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: subtleText }}>{pet.species}</Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </SectionWrapper>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 6. RELEASES ═══ */}
            <SectionWrapper id="releases" title="Releases" isDark={isDark}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center' }}>
                <TextField
                  size="small"
                  placeholder="Search releases…"
                  value={releaseSearch}
                  onChange={e => setReleaseSearch(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Search sx={{ color: subtleText, fontSize: 20 }} /></InputAdornment>,
                  }}
                  sx={{
                    width: { xs: '100%', sm: 260 },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: isDark ? PALETTE.charcoalLight : '#fff',
                    },
                  }}
                />
                {['G1', 'G2', 'G3', 'Skullector'].map(g => (
                  <Chip
                    key={g}
                    label={g}
                    size="small"
                    variant={releaseFilter === g ? 'filled' : 'outlined'}
                    onClick={() => setReleaseFilter(releaseFilter === g ? null : g)}
                    sx={{
                      borderColor: accentText,
                      color: releaseFilter === g ? '#fff' : accentText,
                      bgcolor: releaseFilter === g ? PALETTE.plum : 'transparent',
                      fontWeight: 700,
                      '&:hover': { bgcolor: releaseFilter === g ? PALETTE.plumLight : (isDark ? PALETTE.plumLight + '20' : PALETTE.rose + '20') },
                    }}
                  />
                ))}
              </Box>

              <Grid container spacing={2}>
                {filteredReleases.map(rel => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={rel.title}>
                    <Card sx={{ bgcolor: cardBg, border: cardBorder, height: '100%' }}>
                      <CardContent>
                        <Chip label={rel.gen} size="small" sx={{
                          bgcolor: isDark ? PALETTE.plumLight + '40' : PALETTE.rose + '20',
                          color: accentText, fontWeight: 700, mb: 1, fontSize: 10,
                        }} />
                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: isDark ? '#fff' : PALETTE.ink, mb: 0.5 }}>
                          {rel.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: subtleText, display: 'block' }}>
                          {rel.date} · {rel.line}
                        </Typography>
                        <Typography variant="caption" sx={{ color: accentText, fontWeight: 500 }}>
                          Role: {rel.role}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ pt: 0 }}>
                        <Button size="small" startIcon={<LinkIcon />} sx={{ color: accentText, textTransform: 'none', fontSize: 12 }}>
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </SectionWrapper>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 7. VERSIONS ═══ */}
            <SectionWrapper id="versions" title="Versions" isDark={isDark}>
              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                {CHARACTER.versions.map((v, i) => (
                  <Chip
                    key={v.gen}
                    label={v.gen}
                    onClick={() => setSelectedVersion(i)}
                    sx={{
                      bgcolor: selectedVersion === i ? v.color : 'transparent',
                      color: selectedVersion === i ? '#fff' : accentText,
                      border: `2px solid ${v.color}`,
                      fontWeight: 700,
                      '&:hover': { bgcolor: v.color + '80' },
                    }}
                  />
                ))}
              </Box>
              <Card sx={{ bgcolor: cardBg, border: cardBorder }}>
                <CardContent>
                  <Box sx={{
                    width: '100%', height: 4, borderRadius: 2, mb: 2,
                    background: `linear-gradient(90deg, ${CHARACTER.versions[selectedVersion].color}, ${PALETTE.rose})`,
                  }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? '#fff' : PALETTE.ink, mb: 1 }}>
                    {CHARACTER.versions[selectedVersion].gen}
                  </Typography>
                  <Typography sx={{ lineHeight: 1.8, color: isDark ? PALETTE.bone : PALETTE.charcoal, fontSize: 14 }}>
                    {CHARACTER.versions[selectedVersion].desc}
                  </Typography>
                </CardContent>
              </Card>
            </SectionWrapper>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 8. OFFICIAL GALLERY ═══ */}
            <SectionWrapper id="gallery" title="Official Image Gallery" isDark={isDark}>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 2,
              }}>
                {CHARACTER.gallery.map((img, i) => (
                  <Box
                    key={img.id}
                    onClick={() => { setLightboxIdx(i); setLightboxOpen(true); }}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 3,
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.03)' },
                      // Masonry-like varying heights
                      gridRow: i % 3 === 0 ? 'span 2' : 'span 1',
                    }}
                  >
                    <PlaceholderImage
                      height={i % 3 === 0 ? 280 : 160}
                      label={`#${img.id}`}
                      gradient={img.gradient}
                    />
                    <Box sx={{
                      position: 'absolute', top: 8, left: 8,
                      bgcolor: PALETTE.gold, color: '#fff', fontSize: 9,
                      fontWeight: 700, px: 1, py: 0.25, borderRadius: 1,
                      textTransform: 'uppercase', letterSpacing: 1,
                    }}>
                      Official
                    </Box>
                    <Box sx={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      p: 1, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    }}>
                      <Typography sx={{ color: '#fff', fontSize: 10, fontWeight: 500 }}>
                        {img.caption}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Lightbox */}
              <Dialog
                open={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                  sx: {
                    bgcolor: isDark ? PALETTE.ink : '#fff',
                    borderRadius: 4,
                    overflow: 'hidden',
                  },
                }}
              >
                <DialogTitle sx={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  color: isDark ? '#fff' : PALETTE.ink,
                }}>
                  <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
                    {CHARACTER.gallery[lightboxIdx]?.caption}
                  </Typography>
                  <IconButton onClick={() => setLightboxOpen(false)} sx={{ color: subtleText }}>
                    <Close />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <PlaceholderImage
                    height={400}
                    label={`Image #${lightboxIdx + 1}`}
                    gradient={CHARACTER.gallery[lightboxIdx]?.gradient}
                  />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip label="Official" size="small" sx={{ bgcolor: PALETTE.gold, color: '#fff', fontWeight: 700 }} />
                    <Typography variant="caption" sx={{ color: subtleText }}>
                      {CHARACTER.gallery[lightboxIdx]?.caption}
                    </Typography>
                  </Box>
                </DialogContent>
              </Dialog>
            </SectionWrapper>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 9. FAN CREATIONS ═══ */}
            <SectionWrapper id="fan-creations" title="Fan Creations" isDark={isDark}>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 3, bgcolor: isDark ? PALETTE.plumDark : PALETTE.cream }}>
                <AlertTitle sx={{ fontWeight: 600 }}>Community Content</AlertTitle>
                Fan creations are submitted by the community. All content is moderated before appearing.
              </Alert>

              <Tabs
                value={fanTab}
                onChange={(_, v) => setFanTab(v)}
                sx={{
                  mb: 2,
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, color: subtleText, '&.Mui-selected': { color: accentText } },
                  '& .MuiTabs-indicator': { bgcolor: accentText },
                }}
              >
                <Tab label="Fan Art" />
                <Tab label="Cosplay" />
                <Tab label="Crafts" />
              </Tabs>

              {[CHARACTER.fanCreations.fanart, CHARACTER.fanCreations.cosplay, CHARACTER.fanCreations.crafts].map((items, idx) => (
                fanTab === idx && (
                  <Grid container spacing={2} key={idx}>
                    {items.map(item => (
                      <Grid size={{ xs: 12, sm: 6 }} key={item.title}>
                        <Card sx={{ bgcolor: cardBg, border: cardBorder }}>
                          <PlaceholderImage
                            height={140}
                            label={item.title}
                            gradient={`linear-gradient(135deg, ${PALETTE.orchid}, ${PALETTE.plum})`}
                          />
                          <CardContent>
                            <Typography sx={{ fontWeight: 600, fontSize: 14, color: isDark ? '#fff' : PALETTE.ink }}>
                              {item.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: accentText, display: 'block', mb: 1 }}>
                              by {item.creator}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                              {item.tags.map(t => (
                                <Chip key={t} label={t} size="small" sx={{
                                  bgcolor: isDark ? PALETTE.plumLight + '30' : PALETTE.cream,
                                  color: subtleText, fontSize: 10,
                                }} />
                              ))}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <FavoriteBorder sx={{ fontSize: 14, color: PALETTE.rose }} />
                                <Typography variant="caption" sx={{ color: subtleText }}>{item.likes}</Typography>
                              </Box>
                              <Button size="small" startIcon={<Flag sx={{ fontSize: 12 }} />} sx={{ color: subtleText, textTransform: 'none', fontSize: 11 }}>
                                Report
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )
              ))}
            </SectionWrapper>

            <OrnamentalDivider color={accentText} />

            {/* ═══ 10. APPEARANCE CHRONOLOGY ═══ */}
            <SectionWrapper id="chronology" title="Appearance Chronology" isDark={isDark}>
              {/* Jump links */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {CHARACTER.chronology.map(c => (
                  <Chip
                    key={c.year}
                    label={c.year}
                    size="small"
                    variant="outlined"
                    onClick={() => document.getElementById(`year-${c.year}`)?.scrollIntoView({ behavior: 'smooth' })}
                    sx={{ borderColor: accentText, color: accentText, fontWeight: 600 }}
                  />
                ))}
              </Box>

              {CHARACTER.chronology.map((entry, i) => (
                <Box key={entry.year} id={`year-${entry.year}`} sx={{
                  display: 'flex',
                  mb: 2,
                  scrollMarginTop: '80px',
                }}>
                  {/* Timeline line */}
                  <Box sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 3, flexShrink: 0,
                  }}>
                    <Box sx={{
                      width: 40, height: 40, borderRadius: '50%',
                      bgcolor: isDark ? PALETTE.plumLight : PALETTE.plum,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 12,
                    }}>
                      {String(entry.year).slice(2)}
                    </Box>
                    {i < CHARACTER.chronology.length - 1 && (
                      <Box sx={{ width: 2, flex: 1, bgcolor: isDark ? PALETTE.plumLight + '40' : PALETTE.bone, mt: 0.5 }} />
                    )}
                  </Box>

                  <Box sx={{ flex: 1, pb: 2 }}>
                    <Typography sx={{ fontWeight: 700, color: accentText, mb: 0.5, fontSize: 16 }}>
                      {entry.year}
                    </Typography>
                    {entry.events.map(ev => (
                      <Box key={ev} sx={{
                        display: 'flex', alignItems: 'center', gap: 1, mb: 0.75,
                      }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: PALETTE.rose, flexShrink: 0 }} />
                        <Typography sx={{ fontSize: 13, color: isDark ? PALETTE.bone : PALETTE.charcoal }}>
                          {ev}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </SectionWrapper>

            {/* ─── UI STATE DEMOS ──────────────────────────── */}
            <OrnamentalDivider color={accentText} />
            <Box sx={{ mb: 6 }}>
              <Typography variant="overline" sx={{ color: subtleText, letterSpacing: 2, display: 'block', mb: 2 }}>
                UI States Preview
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Card sx={{ bgcolor: cardBg, border: cardBorder, p: 2 }}>
                    <Typography variant="caption" sx={{ color: accentText, fontWeight: 700, display: 'block', mb: 1 }}>Loading</Typography>
                    <SectionSkeleton />
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Card sx={{ bgcolor: cardBg, border: cardBorder, p: 2 }}>
                    <Typography variant="caption" sx={{ color: accentText, fontWeight: 700, display: 'block', mb: 1 }}>Empty</Typography>
                    <EmptyState isDark={isDark} />
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Card sx={{ bgcolor: cardBg, border: cardBorder, p: 2 }}>
                    <Typography variant="caption" sx={{ color: accentText, fontWeight: 700, display: 'block', mb: 1 }}>Error</Typography>
                    <ErrorState isDark={isDark} />
                  </Card>
                </Grid>
              </Grid>
            </Box>

          </Box>
        </Box>
      </Container>

      {/* Scroll to top FAB */}
      {showScrollTop && (
        <Fab
          size="small"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: PALETTE.plum,
            color: '#fff',
            '&:hover': { bgcolor: PALETTE.plumLight },
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      )}

      {/* Mobile nav FAB */}
      {isMobile && !mobileNavOpen && (
        <Fab
          size="small"
          onClick={() => setMobileNavOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            bgcolor: isDark ? PALETTE.charcoal : '#fff',
            color: accentText,
            border: `2px solid ${accentText}`,
            '&:hover': { bgcolor: isDark ? PALETTE.charcoalLight : PALETTE.cream },
          }}
        >
          <MenuIcon />
        </Fab>
      )}

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </ThemeProvider>
  );
};

export default CharacterPage;
