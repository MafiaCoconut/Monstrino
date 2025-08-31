import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Home,
  LogOut,
  Menu,
  Heart,
  MessageCircle,
  Calendar as CalendarIcon,
  Clock,
  PencilLine,
  Users,
  MessageSquare,
  Layers3,
} from 'lucide-react';

// --- Color palette used across the page
const C = {
  black: '#0a0a0a',
  white: '#ffffff',
  purple: '#8b5fbf',
  pink: '#ff69b4',
  yellow: '#ffd93d',
  green: '#66cc66',
  blue: '#4a90e2',
};

// -------------------- HeaderBar --------------------
function HeaderBar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: alpha(C.black, 0.9),
        color: C.white,
        borderBottom: `1px solid ${alpha(C.purple, 0.25)}`,
        backdropFilter: 'blur(8px)'
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 2 }}>
          <IconButton onClick={onOpenSidebar} sx={{ display: { md: 'none' }, color: C.pink }}>
            <Menu size={22} />
          </IconButton>
          <Typography
            sx={{
              fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: C.pink,
              fontSize: { xs: '1.1rem', md: '1.35rem' },
              lineHeight: 1,
            }}
          >
            MONSTRINO
          </Typography>
          <Typography
            sx={{
              display: { xs: 'none', sm: 'block' },
              ml: 1,
              fontFamily: 'Fira Code, monospace',
              color: C.purple,
              letterSpacing: '0.12em',
              fontSize: 12,
            }}
          >
            MONSTER HIGH SOCIAL
          </Typography>
        </Stack>

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            startIcon={<Home size={16} />}
            sx={{
              color: C.white,
              textTransform: 'none',
              fontSize: 14,
              '&:hover': { color: C.pink }
            }}
          >
            Home
          </Button>
          <Button
            startIcon={<LogOut size={16} />}
            sx={{
              color: C.white,
              textTransform: 'none',
              fontSize: 14,
              '&:hover': { color: C.pink }
            }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

// -------------------- SidebarNav --------------------
function SidebarNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = [
    { icon: <Home size={18} />, label: 'My Page', href: '#' },
    { icon: <Layers3 size={18} />, label: 'My Collections', href: '#' },
    { icon: <Users size={18} />, label: 'My Friends', href: '#' },
    { icon: <MessageSquare size={18} />, label: 'My Groups', href: '#' },
  ];

  const content = (
    <Box
      sx={{
        width: 260,
        bgcolor: C.black,
        color: C.white,
        height: '100%',
        borderRight: `1px solid ${alpha(C.purple, 0.2)}`,
        pt: { xs: 1, md: 10 },
      }}
    >
      <List>
        {nav.map((item) => (
          <ListItemButton
            key={item.label}
            component="a"
            href={item.href}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              color: alpha(C.white, 0.85),
              '&:hover': { bgcolor: alpha(C.white, 0.06), color: C.pink },
            }}
          >
            <ListItemIcon sx={{ color: C.pink, minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: 14, fontFamily: 'Inter, sans-serif' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Permanent on md+, drawer on mobile */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>{content}</Box>
      <Drawer
        open={open}
        onClose={onClose}
        sx={{ display: { xs: 'block', md: 'none' } }}
        PaperProps={{ sx: { bgcolor: C.black } }}
      >
        {content}
      </Drawer>
    </>
  );
}

// -------------------- ProfileHeader --------------------
function StatChip({ value, label }: { value: number | string; label: string }) {
  return (
    <Stack alignItems="center" spacing={0.5} sx={{ minWidth: 88 }}>
      <Typography sx={{ color: C.pink, fontWeight: 700 }}>{value}</Typography>
      <Typography sx={{ fontSize: 12, color: alpha(C.white, 0.7) }}>{label}</Typography>
    </Stack>
  );
}

function ProfileHeader() {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderColor: alpha(C.purple, 0.25),
        bgcolor: alpha(C.white, 0.02),
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs:12, md: 8 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 56, height: 56, bgcolor: alpha(C.pink, 0.2), color: C.pink }}>GF</Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>GhoulishFashionista</Typography>
              <Typography sx={{ color: alpha(C.white, 0.75), mt: 0.5 }}>
                Living my best afterlife! 💖 Fashion lover, vampire extraordinaire, and collector of all things pink and fabulous!
              </Typography>
            </Box>
          </Stack>
        </Grid>
       <Grid size={{ xs:12, md: 8 }}>
          <Stack direction="row" justifyContent={{ xs: 'flex-start', md: 'flex-end' }} spacing={3}>
            <StatChip value={12} label="Collections" />
            <StatChip value={47} label="Dolls" />
            <StatChip value={23} label="Friends" />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

// -------------------- QuickActions --------------------
function QuickActions() {
  const items = [
    { icon: <PencilLine size={20} />, label: 'Write Post' },
    { icon: <Users size={20} />, label: 'Friends' },
    { icon: <MessageSquare size={20} />, label: 'Messages' },
    { icon: <Clock size={20} />, label: 'Hours' },
  ];

  return (
    <Grid container spacing={2}>
      {items.map((it) => (
        <Grid size={{ xs:12, sm: 6, md: 3 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderColor: alpha(C.purple, 0.25),
              bgcolor: alpha(C.white, 0.02),
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              transition: 'transform .2s ease',
              '&:hover': { transform: 'translateY(-4px)' },
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ color: C.pink }}>{it.icon}</Box>
              <Typography sx={{ fontFamily: 'Fira Code, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 12 }}>
                {it.label}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

// -------------------- PostCard & RecentPosts --------------------
interface Post {
  id: string;
  date: string; // e.g., 'Apr 1'
  title: string;
  content: string;
  likes: number;
  comments: number;
}

function PostCard({ post }: { post: Post }) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, borderColor: alpha(C.purple, 0.25), bgcolor: 'transparent' }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: C.pink }}>
          <CalendarIcon size={16} />
          <Typography sx={{ fontSize: 13, color: alpha(C.white, 0.8) }}>{post.date}</Typography>
        </Stack>

        <Typography sx={{ fontWeight: 700 }}>{post.title}</Typography>

        <Typography sx={{ color: alpha(C.white, 0.85), lineHeight: 1.7 }}>{post.content}</Typography>

        <Divider sx={{ my: 1.5, borderColor: alpha(C.white, 0.12) }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center" sx={{ color: alpha(C.white, 0.8) }}>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Heart size={16} color={C.pink} />
              <Typography sx={{ fontSize: 13 }}>{post.likes}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <MessageCircle size={16} color={C.pink} />
              <Typography sx={{ fontSize: 13 }}>{post.comments}</Typography>
            </Stack>
          </Stack>
          <Button sx={{ color: C.pink, textTransform: 'none', fontSize: 13 }}>View Post</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

function RecentPosts() {
  const posts: Post[] = [
    {
      id: '1',
      date: 'Apr 1',
      title: 'New Collection Alert! 🎉',
      content:
        'Just added my Holiday Specials collection! So excited to share these festive ghouls with everyone. The winter wonderland Draculaura is absolutely divine! 🦇💖',
      likes: 23,
      comments: 5,
    },
    {
      id: '2',
      date: 'Mar 28',
      title: '',
      content:
        "Can we talk about how gorgeous the new vampire collection pieces are? The detail work on their outfits is incredible! Monster High really outdid themselves this time. 🧛✨",
      likes: 31,
      comments: 8,
    },
    {
      id: '3',
      date: 'Mar 25',
      title: 'Doll Photography Tips',
      content:
        'Been experimenting with lighting for my doll photos. Natural window light + soft reflectors are a killer combo! 📸',
      likes: 18,
      comments: 3,
    },
  ];

  return (
    <Stack spacing={2}>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </Stack>
  );
}

// -------------------- Featured Collections --------------------
function FeaturedCollections() {
  return (
    <Stack spacing={2}>
      <Typography sx={{ fontWeight: 700, color: C.pink }}>Featured Collections</Typography>

      <Paper
        variant="outlined"
        sx={{ borderColor: alpha(C.purple, 0.25), overflow: 'hidden' }}
      >
        <Box sx={{ height: 260, bgcolor: alpha(C.white, 0.06) /* image placeholder */ }} />
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700 }}>Original Ghouls</Typography>
          <Typography sx={{ color: alpha(C.white, 0.7), fontSize: 13 }}>
            The iconic first wave of Monster High dolls that started it all!
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1.5 }}>
            <Chip
              size="small"
              label="8 Dolls"
              sx={{ bgcolor: alpha(C.white, 0.1), color: C.white, borderRadius: 1 }}
            />
            <Chip
              size="small"
              label="Collection"
              sx={{ bgcolor: alpha(C.pink, 0.15), color: C.pink, borderRadius: 1 }}
            />
            <Box sx={{ flex: 1 }} />
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: alpha(C.white, 0.7) }}>
              <CalendarIcon size={16} />
              <Typography sx={{ fontSize: 12 }}>Feb 1, 2024</Typography>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
}

// -------------------- Page --------------------
export default function MonstrinoProfilePage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const mdUp = useMediaQuery('(min-width:900px)');

  return (
    <Box sx={{ bgcolor: C.black, color: C.white, minHeight: '100vh' }}>
      <HeaderBar onOpenSidebar={() => setSidebarOpen(true)} />

      <Box sx={{ pt: { xs: 8, md: 9 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid size={{ xs:12, md: 3 }}>
              <SidebarNav open={sidebarOpen && !mdUp} onClose={() => setSidebarOpen(false)} />
            </Grid>

            {/* Main content */}
            <Grid size={{ xs:12, md: 9 }}>
              <Stack spacing={2}>
                <ProfileHeader />

                <QuickActions />

                <Grid container spacing={2}>
                  <Grid size={{ xs:12, md: 7 }}>
                    <Typography sx={{ fontWeight: 700, mb: 1, color: C.pink }}>Recent Posts</Typography>
                    <RecentPosts />
                  </Grid>

                  <Grid size={{ xs:12, md: 5 }}>
                    <FeaturedCollections />
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* tiny footer spacer for aesthetics */}
      <Box sx={{ height: 24 }} />
    </Box>
  );
}
