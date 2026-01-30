// src/entities/release/ui/ReleaseCard.tsx
import { Card, CardActionArea, CardContent, Chip, Stack, Typography, Box } from "@mui/material";
import type { ReleaseDTO } from "../model/types";

type Props = {
  release: ReleaseDTO;
  onOpen: (release: ReleaseDTO) => void;
};

function pickSubtitle(r: ReleaseDTO): string {
  const bits: string[] = [];
  if (r.year) bits.push(String(r.year));
  if (r.tier_type) bits.push(r.tier_type);
  if (r.pack_type) bits.push(r.pack_type);
  return bits.join(" • ");
}

export function ReleaseCard({ release, onOpen }: Props) {
  const subtitle = pickSubtitle(release);
  const primaryImageUrl =
    typeof release.primary_image === "string"
      ? release.primary_image
      : release.primary_image?.url ||
        release.images?.find((img) => img.is_primary || img.kind === "primary")?.url ||
        release.images?.[0]?.url ||
        "";
  const tagCharacters =
    release.release_characters?.filter((c) => c.name !== release.name) ?? [];
  const tagSeries =
    release.release_series?.filter((s) => s.name !== release.name) ?? [];

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: (t) => `1px solid ${t.palette.divider}`,
        backgroundColor: "background.paper",
        width: "100%",
        maxWidth: 260,
      }}
      elevation={0}
    >
      <CardActionArea
        onClick={() => onOpen(release)}
        sx={{ alignItems: "stretch", height: "100%" }}
        aria-label={`Open ${release.name}`}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              aspectRatio: "3 / 4",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
            }}
          >
            {primaryImageUrl ? (
              <Box
                component="img"
                src={primaryImageUrl}
                alt={release.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : null}
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: "absolute",
              left: 12,
              bottom: 12,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {release.content_type ? (
              <Chip size="small" label={release.content_type} sx={{ backdropFilter: "blur(10px)" }} />
            ) : null}
            {release.exclusive_of?.length ? (
              <Chip size="small" label={`Exclusive`} sx={{ backdropFilter: "blur(10px)" }} />
            ) : null}
          </Stack>
        </Box>

        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.25 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
            {release.name}
          </Typography>

          {subtitle ? (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          ) : null}

          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, mt: 0.5 }}>
            {tagCharacters.slice(0, 2).map((c, idx) => (
              <Chip key={`${c.name}-${idx}`} size="small" variant="outlined" label={c.name} />
            ))}
            {tagSeries.slice(0, 1).map((s, idx) => (
              <Chip key={`${s.name}-${idx}`} size="small" variant="outlined" label={s.name} />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
