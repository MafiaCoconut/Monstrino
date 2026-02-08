import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  ButtonBase,
  Divider,
  Chip,
} from "@mui/material";

// ==================================================
// entities (types + mock)
// ==================================================

export type HomeReleasePreview = {
  id: number;
  displayName: string;
  year?: number;
  imageUrl?: string;
  series?: string;
};

export const HOME_RELEASES_MOCK: HomeReleasePreview[] = [
  { id: 101, displayName: "Draculaura — First Wave", year: 2010, series: "Core" },
  { id: 102, displayName: "Frankie Stein — First Wave", year: 2010, series: "Core" },
  { id: 103, displayName: "Clawdeen Wolf — First Wave", year: 2010, series: "Core" },
  { id: 104, displayName: "Cleo de Nile — First Wave", year: 2010, series: "Core" },
  { id: 105, displayName: "Skullector — Limited Edition", year: 2022, series: "Skullector" },
  { id: 106, displayName: "Haunt Couture — Collector Line", year: 2021, series: "Collector" },
  { id: 107, displayName: "G3 Signature — New Era", year: 2023, series: "G3" },
  { id: 108, displayName: "Convention Exclusive", year: 2019, series: "Exclusive" },
];

// ==================================================
// shared/ui (atoms)
// ==================================================

export function EditorialSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      {eyebrow ? (
        <Typography
          component="div"
          sx={{
            mb: 1.5,
            fontSize: 12,
            letterSpacing: 3.2,
            textTransform: "uppercase",
            opacity: 0.72,
          }}
        >
          {eyebrow}
        </Typography>
      ) : null}

      <Typography
        component="h2"
        sx={{
          fontSize: { xs: 28, md: 40 },
          lineHeight: 1.05,
          letterSpacing: -0.6,
          mb: 2.5,
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
}

export function SoftDivider() {
  return (
    <Divider
      sx={{
        borderColor: "rgba(255,255,255,0.08)",
      }}
    />
  );
}


// ==================================================
// widgets/header (masthead)
// ==================================================

export function Masthead() {
  const navItems = [
    { label: "Releases", href: "/releases" },
    { label: "Characters", href: "/characters" },
    { label: "Series", href: "/series" },
    { label: "Collections", href: "/collections" },
  ];

  return (
    <Box component="header" sx={{ pt: 3, pb: 2 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box aria-label="Primary navigation" sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                underline="none"
                aria-label={item.label}
                sx={{
                  fontSize: 13,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  opacity: 0.65,
                  "&:hover": { opacity: 0.9 },
                  "&:focus-visible": {
                    outline: "2px solid rgba(255,255,255,0.35)",
                    outlineOffset: 3,
                    borderRadius: 1,
                  },
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link
              href="/"
              underline="none"
              aria-label="Monstrino home"
              sx={{
                color: "inherit",
                "&:focus-visible": {
                  outline: "2px solid rgba(255,255,255,0.35)",
                  outlineOffset: 4,
                  borderRadius: 2,
                },
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: { xs: 28, md: 34 },
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Monstrino
              </Typography>
            </Link>
          </Box>

          <Box aria-hidden />
        </Box>

        <Box sx={{ mt: 2 }}>
          <SoftDivider />
        </Box>
      </Container>
    </Box>
  );
}

// ==================================================
// widgets/home (hero)
// ==================================================
export function HeroColophon() {
  return (
    <Box
      aria-label="Hero colophon"
      sx={{
        mt: 4,
        pt: 2.25,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
        gap: 2,
        alignItems: "center",
        maxWidth: 640,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 2.6,
            textTransform: "uppercase",
            opacity: 0.62,
          }}
        >
          Structured archive
        </Typography>

        <Typography sx={{ opacity: 0.25 }}>•</Typography>

        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 2.6,
            textTransform: "uppercase",
            opacity: 0.62,
          }}
        >
          Detail-first
        </Typography>

        <Typography sx={{ opacity: 0.25 }}>•</Typography>

        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 2.6,
            textTransform: "uppercase",
            opacity: 0.62,
          }}
        >
          Systematically generated
        </Typography>
      </Box>

      <Box
        aria-label="Scroll cue"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: { xs: "flex-start", sm: "flex-end" },
          gap: 1,
          opacity: 0.6,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 2.8,
            textTransform: "uppercase",
          }}
        >
          Scroll
        </Typography>
        <Box
          aria-hidden
          sx={{
            width: 38,
            height: 1,
            background: "rgba(255,255,255,0.22)",
          }}
        />
        <Typography aria-hidden sx={{ fontSize: 12, opacity: 0.75 }}>
          ↓
        </Typography>
      </Box>
    </Box>
  );
}

export function HeroMediaPlate({
  imageUrl,
  caption = "Featured plate",
  title = "Skullector — Edward Scissorhands",
  note = "A catalog view of a collector-focused release.",
}: {
  imageUrl?: string;
  caption?: string;
  title?: string;
  note?: string;
}) {
  const bg = imageUrl
    ? `linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.85)), url(${imageUrl})`
    : `
      radial-gradient(900px 260px at 20% 30%, rgba(214,102,255,0.10), rgba(0,0,0,0) 62%),
      radial-gradient(700px 240px at 85% 70%, rgba(255,92,199,0.08), rgba(0,0,0,0) 58%),
      linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.10))
    `;

  return (
    <Box
      aria-label="Hero media plate"
      sx={{
        mt: 3.5,
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <Box
        aria-hidden
        sx={{
          height: { xs: 200, md: 260 },
          backgroundImage: bg,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: "saturate(0.85) contrast(0.95)",
          position: "relative",
        }}
      >
        {/* subtle grain */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 6px)",
            opacity: 0.10,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
      </Box>

      <Box
        sx={{
          px: 2.25,
          py: 2,
          display: "grid",
          gap: 0.75,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: 2.8,
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          {caption}
        </Typography>

        <Typography sx={{ fontSize: 16, lineHeight: 1.25 }}>
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            lineHeight: 1.7,
            opacity: 0.65,
            maxWidth: 560,
          }}
        >
          {note}
        </Typography>
      </Box>
    </Box>
  );
}




export function HomeHero() {
  return (
    <Box sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(520px, 1fr) 420px" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
          }}
        >
          {/* Left — identity */}
          <Box sx={{ maxWidth: 880 }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 42, md: 64 },
                letterSpacing: { xs: 2.5, md: 6 },
                textTransform: "uppercase",
                lineHeight: 1,
                mb: 3,
              }}
            >
              Monstrino
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 18, md: 20 },
                lineHeight: 1.7,
                opacity: 0.8,
                mb: 2.5,
              }}
            >
              A structured archive for Monster High collectors.
            </Typography>

            <Typography
              sx={{
                fontSize: 15,
                lineHeight: 1.8,
                opacity: 0.65,
                maxWidth: 640,
              }}
            >
              Releases, characters, and details — curated with clarity, not noise.
            </Typography>

            <Box sx={{ mt: 4 }}>
              <ButtonBase
                component="a"
                href="/releases"
                aria-label="Explore the archive"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2.5,
                  py: 1.25,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "background 180ms ease, border-color 180ms ease, transform 180ms ease",
                  transform: "translateY(0)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.28)",
                    transform: "translateY(-1px)",
                  },
                  "&:focus-visible": {
                    outline: "2px solid rgba(255,255,255,0.35)",
                    outlineOffset: 3,
                  },
                }}
              >
                <Typography sx={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", opacity: 0.9 }}>
                  Explore the archive
                </Typography>
                <Typography sx={{ opacity: 0.6 }}>↓</Typography>
              </ButtonBase>

              {/* <HeroColophon /> */}
            </Box>

            {/* NEW: visual anchor for the empty left-bottom area */}
            <HeroMediaPlate
              imageUrl="/demo/profile/dolls/Skullector-Edward-Scissorhands.png"
              caption="Featured plate"
              title="Skullector — Edward Scissorhands"
              note="A collector release presented as an archival object."
            />

          </Box>

          {/* Right — editorial rail */}
          <ArchiveRail />
        </Box>
      </Container>
    </Box>
  );
}



export function ArchiveRail() {
  const index = [
    { label: "Releases", href: "/releases" },
    { label: "Characters", href: "/characters" },
    { label: "Series", href: "/series" },
    { label: "Collections", href: "/collections" },
  ];

  return (
    <Box
      aria-label="Archive rail"
      sx={{
        borderLeft: { xs: "none", md: "1px solid rgba(255,255,255,0.08)" },
        pl: { xs: 0, md: 4 },
        pt: { xs: 5, md: 0 },
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          letterSpacing: 3.2,
          textTransform: "uppercase",
          opacity: 0.65,
          mb: 2.5,
        }}
      >
        Index
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, mb: 3.5 }}>
        {index.map((i) => (
          <Link
            key={i.label}
            href={i.href}
            underline="none"
            aria-label={`Open ${i.label}`}
            sx={{
              fontSize: 13,
              letterSpacing: 2.2,
              textTransform: "uppercase",
              opacity: 0.62,
              "&:hover": { opacity: 0.92 },
              "&:focus-visible": {
                outline: "2px solid rgba(255,255,255,0.35)",
                outlineOffset: 3,
                borderRadius: 1,
              },
            }}
          >
            {i.label}
          </Link>
        ))}
      </Box>

      <Typography
        sx={{
          fontSize: 12,
          letterSpacing: 3.2,
          textTransform: "uppercase",
          opacity: 0.65,
          mb: 2,
        }}
      >
        Curated plates
      </Typography>

      <Box sx={{ display: "grid", gap: 1.5 }}>
        <ArchivePlate
          eyebrow="Archival object"
          title="Complete, structured entries"
          body="Each release is captured with consistent metadata — designed for browsing, not noise."
        />
        <ArchivePlate
          eyebrow="Detail layer"
          title="Accessories, outfits, variants"
          body="Nothing is treated as secondary. Detail appears when you choose to go deeper."
        />
        <ArchivePlate
          eyebrow="Method"
          title="Generated & validated"
          body="Information is produced systematically, not assembled piece by piece by different authors."
        />
      </Box>

      <Box sx={{ mt: 3.5 }}>
        <Typography sx={{ fontSize: 13, lineHeight: 1.8, opacity: 0.6, maxWidth: 360 }}>
          Monstrino is an evolving archive. Structure comes first — features follow.
        </Typography>
      </Box>
    </Box>
  );
}

export function ArchivePlate({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        p: 2,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          letterSpacing: 2.8,
          textTransform: "uppercase",
          opacity: 0.65,
          mb: 1,
        }}
      >
        {eyebrow}
      </Typography>

      <Typography sx={{ fontSize: 16, lineHeight: 1.25, mb: 1.1 }}>
        {title}
      </Typography>

      <Typography sx={{ fontSize: 13, lineHeight: 1.75, opacity: 0.72 }}>
        {body}
      </Typography>
    </Box>
  );
}

// ==================================================
// widgets/home (entry portals)
// ==================================================

export function EntryPortalCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <ButtonBase
      component="a"
      href={href}
      aria-label={`Open ${title}`}
      sx={{
        width: "100%",
        textAlign: "left",
        borderRadius: 4,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
        transition: "border-color 180ms ease, background 180ms ease, transform 180ms ease",
        transform: "translateY(0)",
        "&:hover": {
          background: "rgba(255,255,255,0.045)",
          borderColor: "rgba(255,255,255,0.16)",
          transform: "translateY(-1px)",
        },
        "&:focus-visible": {
          outline: "2px solid rgba(255,255,255,0.35)",
          outlineOffset: 3,
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "grid",
          gap: 1.4,
          position: "relative",
        }}
      >
        {/* subtle rail accent */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background:
              "linear-gradient(180deg, rgba(214,102,255,0.0), rgba(214,102,255,0.45), rgba(255,92,199,0.25), rgba(255,92,199,0.0))",
            opacity: 0.6,
          }}
        />

        <Typography
          sx={{
            fontSize: 22,
            lineHeight: 1.15,
            letterSpacing: -0.2,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            lineHeight: 1.75,
            opacity: 0.72,
            maxWidth: 520,
          }}
        >
          {description}
        </Typography>
      </Box>
    </ButtonBase>
  );
}



export function HomeEntryPoints() {
  const items = [
    {
      title: "Releases",
      description: "The complete archive of releases across lines and eras.",
      href: "/releases",
    },
    {
      title: "Characters",
      description: "Appearances, variations, and connections between releases.",
      href: "/characters",
    },
    {
      title: "Series",
      description: "Collections, sublines, and structural context.",
      href: "/series",
    },
    {
      title: "Collections",
      description: "A future space for personal and curated groupings.",
      href: "/collections",
    },
  ];

  return (
    <Box sx={{ py: { xs: 7, md: 9 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "grid", gap: 2.5, mb: 3.5 }}>
          <Typography
            sx={{
              fontSize: 12,
              letterSpacing: 3.2,
              textTransform: "uppercase",
              opacity: 0.65,
            }}
          >
            Start here
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 28, md: 40 },
              lineHeight: 1.05,
              letterSpacing: -0.6,
              maxWidth: 820,
            }}
          >
            Navigate like a catalog.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 2,
            alignItems: "stretch",
          }}
        >
          {items.map((it) => (
            <EntryPortalCard
              key={it.title}
              title={it.title}
              description={it.description}
              href={it.href}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}


export function EditorialDifferentiatorCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
        p: { xs: 2.75, md: 3 },
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: 0.62,
          mb: 1.25,
        }}
      >
        {eyebrow}
      </Typography>

      <Typography
        sx={{
          fontSize: 18,
          lineHeight: 1.25,
          mb: 1.25,
          letterSpacing: -0.2,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          lineHeight: 1.85,
          opacity: 0.72,
          maxWidth: 720,
        }}
      >
        {body}
      </Typography>
    </Box>
  );
}

export function HomeEditorialDifferentiators() {
  const items = [
    {
      eyebrow: "Archival object",
      title: "Complete, structured entries",
      body:
        "Monstrino documents releases as archival objects — each entry is complete, structured, and consistent.",
    },
    {
      eyebrow: "Detail layer",
      title: "Accessories, outfits, variants",
      body:
        "Every accessory, outfit, and variant is recorded — nothing is treated as secondary or optional.",
    },
    {
      eyebrow: "Method",
      title: "Generated & validated systematically",
      body:
        "Information is generated and validated systematically, not assembled piece by piece by different authors.",
    },
    {
      eyebrow: "Reading order",
      title: "Structure first, detail when needed",
      body:
        "The archive reveals information gradually — structure first, detail when needed.",
    },
  ];

  return (
    <Box sx={{ py: { xs: 7, md: 9 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "grid", gap: 2.5, mb: 3.5 }}>
          <Typography
            sx={{
              fontSize: 12,
              letterSpacing: 3.2,
              textTransform: "uppercase",
              opacity: 0.65,
            }}
          >
            Editorial notes
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 28, md: 40 },
              lineHeight: 1.05,
              letterSpacing: -0.6,
              maxWidth: 900,
            }}
          >
            A calmer way to read complex information.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 2,
            alignItems: "stretch",
          }}
        >
          {items.map((it) => (
            <EditorialDifferentiatorCard
              key={it.title}
              eyebrow={it.eyebrow}
              title={it.title}
              body={it.body}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ==================================================
// widgets/home (archive preview)
// ==================================================

export function HomeArchivePreview({
  items = HOME_RELEASES_MOCK,
}: {
  items?: HomeReleasePreview[];
}) {
  return (
    <Container maxWidth="lg">
      <EditorialSection eyebrow="Archive preview" title="A quiet, extensive index.">
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            alignItems: "stretch",
          }}
        >
          {items.slice(0, 12).map((r) => (
            <HomeReleasePreviewCard key={r.id} item={r} />
          ))}
        </Box>

        <Box sx={{ mt: 3 }}>
          <ButtonBase
            component="a"
            href="/releases"
            aria-label="Browse all releases"
            sx={{
              borderRadius: 999,
              px: 2,
              py: 1,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.02)",
              transition: "background 160ms ease, border-color 160ms ease",
              "&:hover": {
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.18)",
              },
              "&:focus-visible": {
                outline: "2px solid rgba(255,255,255,0.35)",
                outlineOffset: 3,
              },
            }}
          >
            <Typography sx={{ fontSize: 12, letterSpacing: 2.6, textTransform: "uppercase", opacity: 0.85 }}>
              Browse all releases →
            </Typography>
          </ButtonBase>
        </Box>
      </EditorialSection>
    </Container>
  );
}

export function HomeReleasePreviewCard({ item }: { item: HomeReleasePreview }) {
  return (
    <ButtonBase
      component="a"
      href={`/releases/${item.id}`}
      aria-label={`Open release: ${item.displayName}`}
      sx={{
        textAlign: "left",
        borderRadius: 4,
        p: 2.25,
        height: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
        transition: "background 170ms ease, border-color 170ms ease, transform 170ms ease",
        transform: "translateY(0)",
        "&:hover": {
          background: "rgba(255,255,255,0.045)",
          borderColor: "rgba(255,255,255,0.16)",
          transform: "translateY(-1px)",
        },
        "&:focus-visible": {
          outline: "2px solid rgba(255,255,255,0.35)",
          outlineOffset: 3,
        },
      }}
    >
      {/* Top meta */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1 }}>
        <Typography
          sx={{
            fontSize: 12,
            letterSpacing: 2.6,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          {item.series ?? "Release"}
        </Typography>
        {item.year ? (
          <Typography sx={{ fontSize: 12, letterSpacing: 2.6, textTransform: "uppercase", opacity: 0.55 }}>
            {item.year}
          </Typography>
        ) : null}
      </Box>

      {/* Title */}
      <Typography sx={{ fontSize: 18, lineHeight: 1.2, mb: 1.25 }}>
        {item.displayName}
      </Typography>

      {/* Flexible spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Bottom badges (pinned) */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Chip
          size="small"
          label="Archive"
          sx={{
            borderRadius: 999,
            height: 22,
            fontSize: 11,
            letterSpacing: 1.2,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        />
        <Chip
          size="small"
          label="View"
          sx={{
            borderRadius: 999,
            height: 22,
            fontSize: 11,
            letterSpacing: 1.2,
            background: "rgba(214,102,255,0.07)",
            border: "1px solid rgba(214,102,255,0.22)",
          }}
        />
      </Box>
    </ButtonBase>
  );
}

// ==================================================
// widgets/home (manifesto + footer)
// ==================================================

export function HomeManifesto() {
  return (
    <Container maxWidth="lg">
      <EditorialSection eyebrow="Philosophy" title="Built for collectors who notice details.">
        <Typography sx={{ fontSize: 16, lineHeight: 1.85, opacity: 0.76, maxWidth: 820 }}>
          Monstrino is designed like a printed catalog: calm hierarchy, measured accents, and a structure that respects
          browsing. The goal is not “more UI”, but a clearer view of what exists.
        </Typography>
      </EditorialSection>
    </Container>
  );
}

export function HomeFooter() {
  return (
    <Box sx={{ pb: 7, pt: 4 }}>
      <Container maxWidth="lg">
        <SoftDivider />
        <Box
          sx={{
            pt: 3,
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 12, letterSpacing: 3.2, textTransform: "uppercase", opacity: 0.7 }}>
              Monstrino
            </Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.6, mt: 0.75 }}>
              An evolving archive for collectors.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2.25, flexWrap: "wrap" }} aria-label="Footer links">
            <Link href="/about" underline="none" aria-label="About" sx={{ fontSize: 12, letterSpacing: 2.2, textTransform: "uppercase", opacity: 0.65, "&:hover": { opacity: 0.92 } }}>
              About
            </Link>
            <Link href="/changelog" underline="none" aria-label="Changelog" sx={{ fontSize: 12, letterSpacing: 2.2, textTransform: "uppercase", opacity: 0.65, "&:hover": { opacity: 0.92 } }}>
              Changelog
            </Link>
            <Link href="/contact" underline="none" aria-label="Contact" sx={{ fontSize: 12, letterSpacing: 2.2, textTransform: "uppercase", opacity: 0.65, "&:hover": { opacity: 0.92 } }}>
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ==================================================
// pages/home (composition)
// ==================================================


export function HomeHeroMasthead() {
  return (
    <Box
      sx={{
        color: "rgba(255,255,255,0.92)",
        background: "linear-gradient(180deg, rgba(0,0,0,0.94), rgba(0,0,0,0.99))",
      }}
    >
      <Masthead />
      <HomeHero />
    </Box>
  );
}

export function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgba(0,0,0,0.92), rgba(0,0,0,0.98))",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <HomeHeroMasthead />
      <HomeEntryPoints />
      <HomeEditorialDifferentiators />
      <HomeArchivePreview />
      <HomeManifesto />
      <HomeFooter />
    </Box>
  );
}
