"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { releaseHubTokens as t } from "../release-hub/designTokens";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: t.colors.bg,
        backgroundImage: t.gradients.pageBg,
        padding: { xs: 2, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative glow elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${t.colors.accentPink}20 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${t.colors.accentPurple}20 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {/* 404 Icon */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: 120, md: 160 },
            height: { xs: 120, md: 160 },
            borderRadius: t.radius.xl,
            backgroundColor: t.colors.surface,
            border: `1px solid ${t.colors.borderSoft}`,
            marginBottom: 3,
            boxShadow: `0 0 40px ${t.colors.accentPink}15`,
          }}
        >
          <SearchOffIcon
            sx={{
              fontSize: { xs: 60, md: 80 },
              color: t.colors.accentPink,
            }}
          />
        </Box>

        {/* 404 Number */}
        <Typography
          sx={{
            fontSize: { xs: t.typography.sizes["5xl"], md: t.typography.sizes["6xl"] },
            fontWeight: t.typography.weights.extrabold,
            background: t.gradients.headerWordmark,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.04em",
            marginBottom: 2,
            fontFamily: t.typography.fontFamily.primary,
          }}
        >
          404
        </Typography>

        {/* Title */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: t.typography.sizes["2xl"], md: t.typography.sizes["4xl"] },
            fontWeight: t.typography.weights.bold,
            color: t.colors.textPrimary,
            marginBottom: 2,
            fontFamily: t.typography.fontFamily.primary,
            letterSpacing: "-0.02em",
          }}
        >
          Page Not Found
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: { xs: t.typography.sizes.base, md: t.typography.sizes.lg },
            color: t.colors.textSecondary,
            marginBottom: 4,
            maxWidth: 500,
            marginX: "auto",
            lineHeight: t.typography.lineHeights.relaxed,
            fontFamily: t.typography.fontFamily.primary,
          }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back to
          exploring the Monster High collection.
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => router.push("/")}
            sx={{
              backgroundColor: t.colors.accentPink,
              color: t.colors.textPrimary,
              paddingX: { xs: 3, md: 4 },
              paddingY: { xs: 1.25, md: 1.5 },
              fontSize: { xs: t.typography.sizes.sm, md: t.typography.sizes.base },
              fontWeight: t.typography.weights.semibold,
              fontFamily: t.typography.fontFamily.primary,
              borderRadius: t.radius.lg,
              textTransform: "none",
              boxShadow: `0 8px 24px ${t.colors.accentPink}30`,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: t.colors.accentPinkDark,
                boxShadow: `0 12px 32px ${t.colors.accentPink}40`,
                transform: "translateY(-2px)",
              },
            }}
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            onClick={() => router.push("/catalog/r")}
            sx={{
              borderColor: t.colors.borderSoft,
              color: t.colors.textPrimary,
              paddingX: { xs: 3, md: 4 },
              paddingY: { xs: 1.25, md: 1.5 },
              fontSize: { xs: t.typography.sizes.sm, md: t.typography.sizes.base },
              fontWeight: t.typography.weights.semibold,
              fontFamily: t.typography.fontFamily.primary,
              borderRadius: t.radius.lg,
              textTransform: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: t.colors.accentPurple,
                backgroundColor: `${t.colors.accentPurple}15`,
                boxShadow: `0 8px 24px ${t.colors.accentPurple}20`,
                transform: "translateY(-2px)",
              },
            }}
          >
            Browse Releases
          </Button>
        </Box>

        {/* Quick Links */}
        <Box
          sx={{
            marginTop: 6,
            paddingTop: 4,
            borderTop: `1px solid ${t.colors.borderSoft}`,
          }}
        >
          <Typography
            sx={{
              fontSize: t.typography.sizes.sm,
              color: t.colors.textMuted,
              marginBottom: 2,
              fontFamily: t.typography.fontFamily.primary,
            }}
          >
            Or explore:
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 3 },
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Characters", path: "/catalog/c" },
              { label: "Series", path: "/catalog/s" },
              { label: "Pets", path: "/catalog/p" },
            ].map((link) => (
              <Typography
                key={link.path}
                component="a"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(link.path);
                }}
                sx={{
                  fontSize: t.typography.sizes.sm,
                  color: t.colors.textSecondary,
                  textDecoration: "none",
                  cursor: "pointer",
                  fontFamily: t.typography.fontFamily.primary,
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: t.colors.accentCyan,
                  },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
