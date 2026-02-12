'use client';

import { Divider, Grid, Stack, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "@/shared/router";
import {
  InfoBulletList,
  InfoCallout,
  InfoCard,
  InfoAutomationNote,
  InfoPage,
  InfoPageHeader,
  InfoSection,
} from "./InfoComponents";

const values = [
  {
    title: "Archival Accuracy",
    body:
      "We strive for accuracy in all documented information, though as a community-curated resource, we cannot guarantee completeness or correctness.",
  },
  {
    title: "Community Collaboration",
    body:
      "Our archive grows through the contributions of collectors and fans who share their knowledge and help verify information.",
  },
  {
    title: "Respect for Intellectual Property",
    body:
      "We respect the rights of trademark holders and content creators. All trademarks and product names remain the property of their respective owners.",
  },
  {
    title: "Transparency in Sourcing",
    body:
      "We aim to be transparent about the sources of our information and welcome corrections when errors are identified.",
  },
];

const actions = [
  "Browse release information, character data, and historical records",
  "Submit corrections and additions through the contact form (subject to review)",
  "Research collector history and release timelines",
  "Access freely available information for personal, non-commercial use",
];

const InfoValueCard = ({ title, body }: { title: string; body: string }) => (
  <InfoCard sx={{ height: "100%" }}>
    <Stack spacing={1}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {body}
      </Typography>
    </Stack>
  </InfoCard>
);

const InfoDisclaimerCard = () => (
  <InfoCallout>
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Important Disclaimer
      </Typography>
      <Typography sx={{ fontWeight: 600 }}>
        Monstrino is an independent, non-commercial fan project.
      </Typography>
      <Typography color="text.secondary">
        This platform is not affiliated with, endorsed by, or connected to Mattel, Inc. or any of its subsidiaries.
      </Typography>
      <Typography color="text.secondary">
        All trademarks, product names, and images remain the property of their respective owners and are used for
        informational purposes only.
      </Typography>
      <Typography color="text.secondary">
        Information presented on this platform is community-curated and may contain inaccuracies or omissions. Use at your
        own discretion.
      </Typography>
    </Stack>
  </InfoCallout>
);

const AboutInfo = () => {
  return (
    <InfoPage>
      <Stack spacing={{ xs: 4, md: 6 }}>
        <InfoPageHeader title="About Monstrino" subtitle="A community-driven archive for collectors" />

        <InfoSection title="Overview">
          <Stack spacing={2}>
            <Typography color="text.secondary">
              Monstrino is a community-driven archival platform dedicated to documenting and preserving information about
              collectible releases, characters, and related data. Our focus is on providing a comprehensive, freely
              accessible reference resource for collectors and enthusiasts.
            </Typography>
            <Typography color="text.secondary">
              This platform serves an informational and archival purpose. It is a non-commercial fan project, created and
              maintained by volunteers who share a passion for collector culture.
            </Typography>
          </Stack>
        </InfoSection>

        <Divider />

        <InfoAutomationNote />

        <Divider />

        <InfoSection title="Mission & Values">
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {values.map((value) => (
              <Grid key={value.title} size={{ xs: 12, md: 6 }}>
                <InfoValueCard {...value} />
              </Grid>
            ))}
          </Grid>
        </InfoSection>

        <Divider />

        <InfoSection title="What You Can Do">
          <Stack spacing={2}>
            <InfoBulletList items={actions} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button component={RouterLink} to="/info/support" variant="contained" sx={{ width: { xs: "100%", sm: "auto" } }}>
                Read FAQs
              </Button>
              <Button component={RouterLink} to="/info/contact" variant="outlined" sx={{ width: { xs: "100%", sm: "auto" } }}>
                Contact the Team
              </Button>
            </Stack>
          </Stack>
        </InfoSection>

        <Divider />

        <InfoSection title="Who Is This For?">
          <Typography color="text.secondary">
            Monstrino is designed for collectors seeking reference information about releases and characters, fans and
            enthusiasts who appreciate the history and details of their collections, and researchers interested in
            collector culture and documentation.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoDisclaimerCard />
      </Stack>
    </InfoPage>
  );
};

export default AboutInfo;
