// src/entities/release/ui/ReleaseGridSkeleton.tsx
import * as React from "react";
import { Grid, Card, Skeleton, Box } from "@mui/material";

type Props = { count?: number };

export function ReleaseGridSkeleton({ count = 12 }: Props) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <Card elevation={0} sx={{ border: (t) => `1px solid ${t.palette.divider}`, overflow: "hidden" }}>
            <Skeleton variant="rectangular" height={220} />
            <Box sx={{ p: 2 }}>
              <Skeleton height={28} width="90%" />
              <Skeleton height={18} width="60%" />
              <Box sx={{ mt: 1.5, display: "flex", gap: 1 }}>
                <Skeleton height={28} width={90} />
                <Skeleton height={28} width={110} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="rectangular" height={44} />
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
