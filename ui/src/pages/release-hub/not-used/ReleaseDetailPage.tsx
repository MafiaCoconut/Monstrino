import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import { Context } from "@/main";
import { createApi } from "@/shared/api/http";
import { getReleaseById } from "@/entities/release";
import type { ReleaseDTO, ReleaseImageDTO } from "@/entities/release/model/types";
import { releasesMock } from "@/data/mocAppData";

export function ReleaseDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { userStore } = React.useContext(Context);
  const api = React.useMemo(() => createApi(userStore), [userStore]);
  const locationRelease = (location.state as { release?: ReleaseDTO } | null)?.release;
  const [release, setRelease] = React.useState<ReleaseDTO | null>(
    locationRelease && locationRelease.id === id ? locationRelease : null
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;
    if (locationRelease && locationRelease.id === id) {
      setRelease(locationRelease);
      return;
    }

    let alive = true;
    setLoading(true);
    setError(null);

    getReleaseById(api, id)
      .then((res) => {
        if (!alive) return;
        setRelease(res);
      })
      .catch((e: any) => {
        if (!alive) return;
        const fallback = releasesMock.find((item) => item.id === id) ?? null;
        if (fallback) {
          setRelease(fallback);
          return;
        }
        setError(e?.message ?? "Release not found");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [api, id, locationRelease]);

  const images = React.useMemo(() => {
    if (!release) return [];
    const list: ReleaseImageDTO[] = [];
    if (release.primary_image) list.push(release.primary_image);
    if (release.images?.length) list.push(...release.images);
    if (!release.primary_image) {
      const primaryFromImages = release.images?.find((img) => img.is_primary);
      if (primaryFromImages) list.unshift(primaryFromImages);
    }
    const seen = new Set<string>();
    return list.filter((img) => {
      const key = img.id ?? img.url;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [release]);

  const primaryImageUrl =
    typeof release?.primary_image === "string"
      ? release.primary_image
      : release?.primary_image?.url ||
        release?.images?.find((img) => img.is_primary || img.kind === "primary")?.url ||
        release?.images?.[0]?.url ||
        "";

  return (
    <Box className="container" sx={{ px: { xs: 1.5, md: 2 }, py: { xs: 2, md: 3 } }}>
      <Paper
        elevation={0}
        sx={{ border: (t) => `1px solid ${t.palette.divider}`, borderRadius: 3, p: 3 }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Typography variant="body2" color="text.secondary">
              Release details
            </Typography>
          </Stack>

          {loading ? (
            <Typography variant="body2" color="text.secondary">
              Loading release…
            </Typography>
          ) : null}

          {error ? (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          ) : null}

          {release ? (
            <Stack spacing={3}>
              <Stack spacing={0.5}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {release.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {[
                    release.year ? String(release.year) : null,
                    release.tier_type ?? null,
                    release.pack_type ?? null,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </Typography>
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Box
                  sx={{
                    flex: "0 0 280px",
                    maxWidth: 320,
                    border: (t) => `1px solid ${t.palette.divider}`,
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  <Box
                    sx={{
                      aspectRatio: "3 / 4",
                      backgroundImage: primaryImageUrl
                        ? `url(${primaryImageUrl})`
                        : "none",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </Box>

                <Stack spacing={2} sx={{ flex: 1 }}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Core info
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {release.content_type ? <Chip label={release.content_type} /> : null}
                      {release.tier_type ? <Chip label={release.tier_type} /> : null}
                      {release.pack_type ? <Chip label={release.pack_type} /> : null}
                      {release.mpn ? <Chip label={`MPN ${release.mpn}`} /> : null}
                    </Stack>
                  </Stack>

                  {release.release_characters?.length ? (
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Characters
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {release.release_characters.map((c, idx) => (
                          <Chip key={`${c.name}-${idx}`} label={c.name} variant="outlined" />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}

                  {release.release_series?.length ? (
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Series
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {release.release_series.map((s, idx) => (
                          <Chip key={`${s.name}-${idx}`} label={s.name} variant="outlined" />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}

                  {release.release_pets?.length ? (
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Pets
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {release.release_pets.map((p, idx) => (
                          <Chip key={`${p.name}-${idx}`} label={p.name} variant="outlined" />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}

                  {release.exclusive_of?.length ? (
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Exclusives
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {release.exclusive_of.map((s, idx) => (
                          <Chip key={`${s.name}-${idx}`} label={s.name} variant="outlined" />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}

                  <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Metadata
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {release.id}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              {release.description ? (
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">{release.description}</Typography>
                </Stack>
              ) : null}

              {release.text_from_box ? (
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Box text
                  </Typography>
                  <Typography variant="body1">{release.text_from_box}</Typography>
                </Stack>
              ) : null}

              {(release.reissue_of || release.rerelease_of) ? (
                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    History
                  </Typography>
                  <Stack spacing={0.5}>
                    {release.reissue_of ? (
                      <Typography variant="body2">
                        Reissue of: {release.reissue_of}
                      </Typography>
                    ) : null}
                    {release.rerelease_of ? (
                      <Typography variant="body2">
                        Rerelease of: {release.rerelease_of}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
              ) : null}

              {images.length ? (
                <Stack spacing={2}>
                  <Divider />
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Images
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      flexWrap="wrap"
                      sx={{ rowGap: 2 }}
                    >
                      {images.map((img) => (
                        <Box
                          key={img.id ?? img.url}
                          sx={{
                            width: 140,
                            height: 180,
                            borderRadius: 2,
                            border: (t) => `1px solid ${t.palette.divider}`,
                            backgroundImage: `url(${img.url})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              ) : null}
            </Stack>
          ) : null}
        </Stack>
      </Paper>
    </Box>
  );
}
