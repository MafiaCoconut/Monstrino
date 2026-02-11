import {
  Button,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Link as RouterLink } from "react-router-dom";
import {
  InfoCallout,
  InfoCard,
  InfoAutomationNote,
  InfoPage,
  InfoPageHeader,
  InfoSection,
} from "./InfoComponents";

const principles = [
  {
    title: "Clarity and Accuracy",
    body: "We prioritize accurate, readable reference information for collectors.",
    icon: AutoAwesomeOutlinedIcon,
  },
  {
    title: "Community Driven",
    body: "Maintained by the community; contributions are reviewed before publication.",
    icon: Diversity3OutlinedIcon,
  },
  {
    title: "Non-Commercial",
    body: "The project is non-commercial and does not use advertising or tracking.",
    icon: VerifiedOutlinedIcon,
  },
];

const infoLinks = [
  {
    title: "About",
    description: "Project overview, purpose, and intended audience.",
    to: "/info/about",
  },
  {
    title: "Support",
    description: "FAQs, data correction requests, and support guidance.",
    to: "/info/support",
  },
  {
    title: "Contact",
    description: "Official contact for corrections, legal matters, and inquiries.",
    to: "/info/contact",
  },
];

const legalLinks = [
  {
    title: "Terms of Service",
    description: "Terms governing use of the platform.",
    to: "/legal/terms",
  },
  {
    title: "Privacy Policy",
    description: "How personal data is handled and protected.",
    to: "/legal/privacy",
  },
  {
    title: "Impressum",
    description: "Legal notice and operator information.",
    to: "/legal/impressum",
  },
];

const heroLinks = [
  { label: "About and mission", to: "/info/about" },
  { label: "Support and FAQs", to: "/info/support" },
  { label: "Contact and legal information", to: "/legal" },
];

const helpTopics = [
  { label: "Data correction requests", to: "/info/support" },
  { label: "New information submissions", to: "/info/support" },
  { label: "Legal and copyright matters", to: "/info/contact" },
  { label: "General inquiries", to: "/info/contact" },
];

const InfoHero = () => (
  <InfoCallout sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
    <Stack spacing={3}>
      <InfoPageHeader
        title="Monstrino Information Center"
        subtitle="Centralized information about the project, support resources, and official contact channels."
        maxWidth={720}
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          component={RouterLink}
          to="/info/about"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          About the Project
        </Button>
        <Button component={RouterLink} to="/info/support" variant="outlined" sx={{ width: { xs: "100%", sm: "auto" } }}>
          Support
        </Button>
        <Button component={RouterLink} to="/info/contact" variant="outlined" sx={{ width: { xs: "100%", sm: "auto" } }}>
          Contact
        </Button>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{
          "& .MuiButton-root": {
            borderRadius: 6,
            minHeight: 32,
            px: 1.5,
          },
        }}
      >
        {heroLinks.map((item) => (
          <Button
            key={item.label}
            component={RouterLink}
            to={item.to}
            variant="outlined"
            size="small"
            sx={{ textTransform: "none", width: { xs: "100%", sm: "auto" } }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  </InfoCallout>
);

const InfoLinkCard = ({ title, description, to }: { title: string; description: string; to: string }) => (
  <InfoCard sx={{ height: "100%" }}>
    <Stack spacing={1.5}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Button
        component={RouterLink}
        to={to}
        variant="text"
        endIcon={<ArrowForwardIcon fontSize="small" />}
        sx={{
          px: 0,
          borderRadius: 1,
          minHeight: 32,
          alignSelf: { xs: "stretch", sm: "flex-start" },
          justifyContent: { xs: "center", sm: "flex-start" },
          "&:hover": {
            borderRadius: 1,
            backgroundColor: "rgba(255, 20, 147, 0.1)",
          },
        }}
      >
        View
      </Button>
    </Stack>
  </InfoCard>
);

const InfoPrincipleCard = ({ title, body, icon: Icon }: { title: string; body: string; icon: typeof AutoAwesomeOutlinedIcon }) => (
  <InfoCard sx={{ height: "100%" }}>
    <Stack spacing={1.5}>
      <Stack
        sx={{
          width: { xs: 40, md: 44 },
          height: { xs: 40, md: 44 },
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(139,92,246,0.12)",
        }}
      >
        <Icon fontSize="small" color="primary" />
      </Stack>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {body}
      </Typography>
    </Stack>
  </InfoCard>
);

const InfoHelpTopicsGrid = () => (
  <Grid
    container
    spacing={{ xs: 1.5, sm: 2 }}
    sx={{
      "& .MuiButton-root": {
        borderRadius: 6,
        minHeight: 32,
      },
    }}
  >
    {helpTopics.map((topic) => (
      <Grid item key={topic.label} xs={12} sm={6} md={3}>
        <Button
          component={RouterLink}
          to={topic.to}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ textTransform: "none", justifyContent: "center" }}
        >
          {topic.label}
        </Button>
      </Grid>
    ))}
  </Grid>
);

const InfoDisclaimer = () => (
  <InfoCard>
    <Stack spacing={2} alignItems="center" textAlign="center">
      <Typography variant="body2" color="text.secondary">
        Monstrino is an independent, non-commercial fan project. Not affiliated with, endorsed by, or connected to
        Mattel, Inc. or any of its subsidiaries.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <MuiLink component={RouterLink} to="/legal/privacy" underline="hover">
          Privacy Policy
        </MuiLink>
        <MuiLink component={RouterLink} to="/legal/terms" underline="hover">
          Terms of Service
        </MuiLink>
        <MuiLink component={RouterLink} to="/legal/impressum" underline="hover">
          Impressum
        </MuiLink>
      </Stack>
    </Stack>
  </InfoCard>
);

const MainInfo = () => {
  return (
    <InfoPage>
      <Stack spacing={{ xs: 4, md: 6 }}>
        <InfoHero />

        <InfoAutomationNote />

        <InfoSection title="Information Pages" subtitle="Direct access to core information pages.">
          <Grid container spacing={3}>
            {infoLinks.map((link) => (
              <Grid item key={link.title} xs={12} md={4}>
                <InfoLinkCard {...link} />
              </Grid>
            ))}
          </Grid>
        </InfoSection>

        <InfoSection title="Legal Documents" subtitle="Official policies and legal notices.">
          <Grid container spacing={3}>
            {legalLinks.map((link) => (
              <Grid item key={link.title} xs={12} md={4}>
                <InfoLinkCard {...link} />
              </Grid>
            ))}
          </Grid>
        </InfoSection>

        <InfoSection title="Principles" subtitle="The values that guide how information is curated and presented.">
          <Grid container spacing={3}>
            {principles.map((card) => (
              <Grid item key={card.title} xs={12} md={4}>
                <InfoPrincipleCard {...card} />
              </Grid>
            ))}
          </Grid>
        </InfoSection>

        <InfoSection title="Support Requests" subtitle="Common reasons users contact the team.">
          <InfoCard>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                For assistance, start with the Support page. For other matters, please use the Contact page.
              </Typography>
              <InfoHelpTopicsGrid />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button component={RouterLink} to="/info/support" variant="contained" endIcon={<ArrowForwardIcon />}>
                  Open Support
                </Button>
                <Button component={RouterLink} to="/info/contact" variant="outlined">
                  Contact
                </Button>
              </Stack>
            </Stack>
          </InfoCard>
        </InfoSection>

        <InfoDisclaimer />
      </Stack>
    </InfoPage>
  );
};

export default MainInfo;
