import React, { forwardRef } from "react";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const baseCardSx: SxProps<Theme> = {
  borderRadius: "0.5rem",
  border: "1px solid hsl(240, 4%, 18%)",
  backgroundColor: "hsl(240, 5%, 8%)",
  color: "hsl(0, 0%, 98%)",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
};

export interface CardProps extends BoxProps {
  cardSx?: SxProps<Theme>;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ cardSx, sx, ...props }, ref) => (
  <Box ref={ref} sx={[baseCardSx, cardSx, sx]} {...props} />
));

Card.displayName = "Card";

const baseHeaderSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
  padding: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
};

export interface CardHeaderProps extends BoxProps {
  headerSx?: SxProps<Theme>;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ headerSx, sx, ...props }, ref) => (
  <Box ref={ref} sx={[baseHeaderSx, headerSx, sx]} {...props} />
));

CardHeader.displayName = "CardHeader";

const baseContentSx: SxProps<Theme> = {
  padding: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
  paddingTop: 0,
};

export interface CardContentProps extends BoxProps {
  contentSx?: SxProps<Theme>;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ contentSx, sx, ...props }, ref) => (
  <Box ref={ref} sx={[baseContentSx, contentSx, sx]} {...props} />
));

CardContent.displayName = "CardContent";

const baseSeparatorSx: SxProps<Theme> = {
  height: "1px",
  width: "100%",
  backgroundColor: "hsl(240, 4%, 18%)",
  flexShrink: 0,
};

export interface SeparatorProps extends BoxProps {
  separatorSx?: SxProps<Theme>;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({ separatorSx, sx, ...props }, ref) => (
  <Box ref={ref} sx={[baseSeparatorSx, separatorSx, sx]} {...props} />
));

Separator.displayName = "Separator";

export interface ProgressProps extends BoxProps {
  value?: number;
  trackSx?: SxProps<Theme>;
  barSx?: SxProps<Theme>;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, trackSx, barSx, sx, ...props }, ref) => {
    const clampedValue = Math.max(0, Math.min(100, value));

    return (
      <Box
        ref={ref}
        sx={[
          {
            position: "relative",
            height: "0.5rem",
            width: "100%",
            overflow: "hidden",
            borderRadius: "9999px",
            backgroundColor: "hsl(240, 4%, 14%)",
          },
          trackSx,
          sx,
        ]}
        {...props}
      >
        <Box
          sx={[
            {
              height: "100%",
              width: "100%",
              flex: 1,
              backgroundColor: "hsl(270, 25%, 60%)",
              transition: "transform 0.2s",
              transform: `translateX(-${100 - clampedValue}%)`,
            },
            barSx,
          ]}
        />
      </Box>
    );
  }
);

Progress.displayName = "Progress";
