
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PetsIcon from "@mui/icons-material/Pets";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, TextField, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import WordmarkGradient from "../components/WordmarkGradient";

const colors = {
  background: "#0d0d0f",
  surface: "#1a1a1e",
  textPrimary: "#f5f5f7",
  textSecondary: "#8a8a8f",
  accentPrimary: "#9d4edd",
  accentSecondary: "#c77dff",
  border: "#2a2a2e",
  silver: "#a0a0a8",
};

type CollectorHubHeaderProps = {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
};

const NAV_ITEMS = [
  { icon: LocalOfferIcon, label: "Releases", path: "/catalog/r" },
  { icon: PersonIcon, label: "Characters", path: "/catalog/c" },
  { icon: PetsIcon, label: "Pets", path: "/catalog/p" },
  { icon: AutoAwesomeIcon, label: "Series", path: "/catalog/s" },
];

const CollectorHubHeader = ({ searchQuery, onSearchChange, searchPlaceholder }: CollectorHubHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isSearchControlled = typeof searchQuery === "string" && typeof onSearchChange === "function";
  const isActive = (path: string) => location.pathname.startsWith(path);

  const styles = {
    header: {
      backgroundColor: colors.background,
      borderBottom: `1px solid ${colors.border}`,
      padding: { xs: "0 12px", sm: "0 16px", md: "0 24px" },
      height: { xs: "56px", sm: "64px", md: "72px" },
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      height: "100%",
      display: "flex",
      alignItems: "center",
      gap: { xs: "8px", sm: "12px", md: "24px" },
    },
    logo: {
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: "20px",
      fontWeight: 600,
      color: colors.accentPrimary,
      flexShrink: 0,
    } as React.CSSProperties,
    navSection: {
      display: { xs: "none", lg: "flex" },
      alignItems: "center",
      gap: { xs: 0.75, sm: 1.5, md: 3 },
      flex: 1,
      justifyContent: { xs: "flex-start", md: "center" },
      overflowX: { xs: "auto", md: "visible" },
      "&::-webkit-scrollbar": { display: "none" },
      scrollbarWidth: "none",
    },
    navIconButton: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      transition: "background-color 0.2s ease",
    } as React.CSSProperties,
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: { xs: "4px", sm: "8px", md: "16px" },
      marginLeft: "auto",
      flex: { xs: 1, md: "initial" },
      position: "relative" as const,
      width: { xs: "100%", md: "auto" },
      justifyContent: { xs: "flex-end", md: "flex-start" },
    },
    searchWrapper: {
      position: "relative" as const,
      display: { xs: searchOpen ? "flex" : "none", md: "flex" },
      alignItems: "center",
      flex: { xs: 1, md: "initial" },
      width: { xs: "100%", md: "auto" },
      maxWidth: { xs: "100%", md: "240px" },
    } as React.CSSProperties,
    searchInput: {
      width: { xs: "100%", md: "240px" },
      height: { xs: "36px", md: "40px" },
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      padding: { xs: "0 8px 0 36px", md: "0 12px 0 40px" },
      color: colors.textPrimary,
      fontSize: { xs: "13px", md: "14px" },
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    searchIcon: {
      position: "absolute" as const,
      left: "12px",
      pointerEvents: "none" as const,
    } as React.CSSProperties,
    userSection: {
      display: { xs: "none", sm: "flex" },
      alignItems: "center",
      gap: "8px",
      paddingLeft: { sm: "12px", md: "16px" },
      borderLeft: `1px solid ${colors.border}`,
    },
    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties,
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <Box component="header" sx={styles.header}>
      <Box sx={styles.container}>
        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: "flex", lg: "none" }, color: colors.textPrimary }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: { xs: searchOpen ? "none" : "flex", md: "flex" },
            cursor: "pointer",
          }}
        >
          <WordmarkGradient onClick={() => navigate("/")} />
        </Box>

        <Box component="nav" sx={styles.navSection}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  position: "relative",
                  pb: { xs: 0.25, md: 0.5 },
                  whiteSpace: "nowrap",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: isActive(item.path) ? "text.primary" : "text.secondary",
                    fontWeight: isActive(item.path) ? 600 : 400,
                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "0.9rem" },
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "text.primary",
                    },
                  }}
                >
                  {item.label}
                </Typography>
                {isActive(item.path) && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: { xs: -4, md: -8 },
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: "primary.main",
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>
            </Link>
          ))}
        </Box>

        <Box
          sx={{
            ...styles.rightSection,
            flex: { xs: searchOpen ? 1 : styles.rightSection.flex, md: "initial" },
          }}
        >
          {/* Mobile Search Toggle */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: colors.textPrimary, width: "36px", height: "36px" }}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <CloseIcon sx={{ fontSize: 18 }} /> : <SearchIcon sx={{ fontSize: 18 }} />}
          </IconButton>

          <Box
            sx={{
              ...styles.searchWrapper,
              width: {
                xs: searchOpen ? "100%" : styles.searchWrapper.width?.xs ?? "100%",
                md: "auto",
              },
              maxWidth: {
                xs: searchOpen ? "100%" : styles.searchWrapper.maxWidth?.xs ?? "100%",
                md: "240px",
              },
            }}
          >
            <Box component="span" sx={styles.searchIcon}>
              <SearchIcon sx={{ fontSize: 18, color: colors.textSecondary }} />
            </Box>
            <TextField
              placeholder={searchPlaceholder ?? "Search archive..."}
              variant="standard"
              value={isSearchControlled ? searchQuery : undefined}
              onChange={isSearchControlled ? (event) => onSearchChange?.(event.target.value) : undefined}
              InputProps={{
                disableUnderline: true,
                sx: styles.searchInput,
              }}
            />
          </Box>

          <Box sx={{ display: "none" }} />
        </Box>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#0B0D11",
            backgroundImage:
              "radial-gradient(600px 420px at 0% 0%, rgba(139, 92, 246, 0.12), transparent 55%), radial-gradient(420px 420px at 100% 10%, rgba(255, 126, 219, 0.08), transparent 55%)",
            borderRight: `1px solid ${colors.border}`,
          },
        }}
      >
        <Box
          sx={{
            px: 2.5,
            pt: 2.5,
            pb: 2,
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 2,
            backgroundColor: "rgba(11, 13, 17, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography
              sx={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: colors.textSecondary,
              }}
            >
              Navigation
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: colors.textPrimary,
              }}
            >
              Releases Hub
            </Typography>
          </Box>
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              color: colors.textSecondary,
              backgroundColor: "rgba(255,255,255,0.04)",
              border: `1px solid ${colors.border}`,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ px: 2.5, pt: 2 }}>
          <Typography
            sx={{
              fontSize: "11px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: colors.textSecondary,
              mb: 1.5,
            }}
          >
            Sections
          </Typography>
        </Box>
        <List sx={{ pt: 0, px: 1.5 }}>
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
            <ListItem
              key={label}
              button
              onClick={() => path && handleNavigate(path)}
              sx={{
                py: 1.25,
                px: 1.5,
                borderRadius: "12px",
                mx: 1,
                mb: 0.75,
                border: `1px solid ${colors.border}`,
                backgroundColor: "rgba(255,255,255,0.02)",
                transition: "transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(157, 78, 221, 0.6)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 46 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    backgroundColor: "rgba(157, 78, 221, 0.16)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid rgba(157, 78, 221, 0.35)`,
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                >
                  <Icon sx={{ fontSize: 20, color: "#c77dff" }} />
                </Box>
              </ListItemIcon>
              <ListItemText 
                primary={label} 
                primaryTypographyProps={{
                  sx: { 
                    fontSize: "15px",
                    fontWeight: 600,
                    color: colors.textPrimary,
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }
                }}
                sx={{ ml: 0.5 }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 3, pb: 3, pt: 1.5 }}>
          <Box
            sx={{
              borderRadius: "14px",
              border: `1px solid ${colors.border}`,
              backgroundColor: "rgba(255,255,255,0.03)",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 0.75,
            }}
          >
            <Typography sx={{ fontSize: "12px", color: colors.textSecondary }}>
              Quick tip
            </Typography>
            <Typography sx={{ fontSize: "13px", color: colors.textPrimary, lineHeight: 1.5 }}>
              Use search in the header to jump directly to a character, series, or release.
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CollectorHubHeader;
