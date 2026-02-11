import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import WordmarkGradient from "../components/WordmarkGradient";
import { useState } from "react";

const navLinks = [
  { href: "/info", label: "Info" },
  { href: "/info/about", label: "About" },
  { href: "/info/support", label: "Support" },
  { href: "/info/contact", label: "Contact" },
  { href: "/legal", label: "Legal" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/impressum", label: "Impressum" },
];

const InfoHeader = () => {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setMobileOpen((prev) => !prev);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(15, 15, 18, 0.72)",
      }}
    >
      <Toolbar disableGutters>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1.5, md: 2 },
            py: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <WordmarkGradient />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={RouterLink}
                to={link.href}
                color={isActive(link.href) ? "primary" : "inherit"}
                sx={{
                  textTransform: "none",
                  fontWeight: isActive(link.href) ? 600 : 500,
                  color: isActive(link.href) ? "primary.main" : "text.secondary",
                  minWidth: "auto",
                  px: 1.25,
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={handleToggle}
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "text.primary" }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </IconButton>
        </Container>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: 280, backgroundColor: "background.default", color: "text.primary" } }}
      >
        <Box sx={{ px: 2, py: 2 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            onClick={handleToggle}
          >
            <WordmarkGradient />
          </Box>
        </Box>
        <Divider />
        <List sx={{ px: 1, py: 1 }}>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.href}
              component={RouterLink}
              to={link.href}
              onClick={handleToggle}
              sx={{
                borderRadius: 1.5,
                mx: 1,
                my: 0.5,
                color: isActive(link.href) ? "primary.main" : "text.secondary",
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ fontWeight: isActive(link.href) ? 600 : 500 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default InfoHeader;
