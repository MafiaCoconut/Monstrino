// src/entities/release/ui/ReleaseGrid.tsx
import * as React from "react";
import { Grid } from "@mui/material";
import type { ReleaseDTO } from "../model/types";
import { ReleaseCard } from "./ReleaseCard";

type Props = {
  items: ReleaseDTO[];
  onOpen: (release: ReleaseDTO) => void;
};

export function ReleaseGrid({ items, onOpen }: Props) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {items.map((r) => (
        <Grid
          key={r.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ReleaseCard release={r} onOpen={onOpen} />
        </Grid>
      ))}
    </Grid>
  );
}
