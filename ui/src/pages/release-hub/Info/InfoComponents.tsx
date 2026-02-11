import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import { Box, Container, Divider, Paper, Stack, Typography } from "@mui/material";

type InfoPageHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  maxWidth?: number;
};

export const InfoPageHeader = ({
  title,
  subtitle,
  align = "left",
  maxWidth,
}: InfoPageHeaderProps) => (
  <Stack
    spacing={2}
    sx={{
      textAlign: align,
      alignItems: align === "center" ? "center" : "flex-start",
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontWeight: 700,
        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        lineHeight: 1.1,
      }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        color="text.secondary"
        sx={{ maxWidth, fontSize: { xs: "0.95rem", sm: "1rem" }, lineHeight: 1.6 }}
      >
        {subtitle}
      </Typography>
    )}
  </Stack>
);

export const InfoPage = ({ children }: { children: ReactNode }) => (
  <Box sx={{ width: "100%" }}>
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
      {children}
    </Container>
  </Box>
);

type InfoSectionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  withDivider?: boolean;
};

export const InfoSection = ({
  title,
  subtitle,
  children,
  withDivider = false,
}: InfoSectionProps) => (
  <Stack spacing={2}>
    {withDivider && <Divider />}
    <Stack spacing={1}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.5rem" },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
    {children}
  </Stack>
);

type InfoCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export const InfoCard = ({ children, sx }: InfoCardProps) => (
  <Paper variant="outlined" sx={[{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: { xs: 2, md: 3 } }, sx]}>
    {children}
  </Paper>
);

type InfoCalloutProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export const InfoCallout = ({ children, sx }: InfoCalloutProps) => (
  <InfoCard
    sx={[
      {
        backgroundColor: "rgba(255,255,255,0.02)",
        borderColor: "divider",
      },
      sx,
    ]}
  >
    {children}
  </InfoCard>
);

type InfoAutomationNoteProps = {
  title?: string;
  variant?: "callout" | "card";
};

export const InfoAutomationNote = ({
  title = "Data sourcing and updates",
  variant = "callout",
}: InfoAutomationNoteProps) => {
  const content = (
    <Stack spacing={1.5}>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        Monstrino uses automated scripts to populate and refresh information. If something appears incorrect, entries
        are reviewed and updated by volunteers.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        The platform is designed to self-populate so users can access current information quickly and consistently.
      </Typography>
    </Stack>
  );

  return variant === "card" ? <InfoCard>{content}</InfoCard> : <InfoCallout>{content}</InfoCallout>;
};

export const InfoBulletList = ({ items }: { items: string[] }) => (
  <Stack spacing={0.5}>
    {items.map((item) => (
      <Typography key={item} variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}>
        • {item}
      </Typography>
    ))}
  </Stack>
);

export const InfoParagraphStack = ({ items }: { items: string[] }) => (
  <Stack spacing={1.5}>
    {items.map((text) => (
      <Typography key={text} color="text.secondary" sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.7 }}>
        {text}
      </Typography>
    ))}
  </Stack>
);
