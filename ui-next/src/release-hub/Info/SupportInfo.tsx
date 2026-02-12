'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Link,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "@/shared/router";
import {
  InfoAutomationNote,
  InfoCallout,
  InfoCard,
  InfoPage,
  InfoPageHeader,
  InfoSection,
} from "./InfoComponents";

const faqs = [
  {
    id: "report-incorrect-data",
    question: "How do I report incorrect data?",
    answer: (
      <Stack spacing={1.5}>
        <Typography>
          Use our{" "}
          <Link component={RouterLink} to="/info/contact" underline="hover">
            Contact form
          </Link>{" "}
          and select the category "Data Correction Request".
        </Typography>
        <Typography>To help us process your correction efficiently, please include:</Typography>
        <Stack spacing={0.5}>
          <Typography color="text.secondary">• The specific entry or page affected</Typography>
          <Typography color="text.secondary">• The nature of the error (what is incorrect)</Typography>
          <Typography color="text.secondary">
            • The correct information, with a source if available (e.g., official release information, packaging details)
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Corrections are reviewed manually by volunteer contributors. Not all submissions can be independently verified.
        </Typography>
      </Stack>
    ),
  },
  {
    id: "suggest-new-release",
    question: "How can I suggest a new release or character?",
    answer: (
      <Stack spacing={1.5}>
        <Typography>
          Submit your suggestion via our{" "}
          <Link component={RouterLink} to="/info/contact" underline="hover">
            Contact form
          </Link>{" "}
          with supporting information such as:
        </Typography>
        <Stack spacing={0.5}>
          <Typography color="text.secondary">• Release name and line</Typography>
          <Typography color="text.secondary">• Character name(s)</Typography>
          <Typography color="text.secondary">• Release date or approximate timeframe</Typography>
          <Typography color="text.secondary">• Any available sources or references</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Suggestions are reviewed by contributors when capacity allows. There is no guaranteed timeline for additions to
          the archive.
        </Typography>
      </Stack>
    ),
  },
  {
    id: "missing-information",
    question: "Why is some information missing or outdated?",
    answer: (
      <Stack spacing={1.5}>
        <Typography>
          Monstrino is a community-sourced and volunteer-maintained archive. The coverage and accuracy of information
          depends on:
        </Typography>
        <Stack spacing={0.5}>
          <Typography color="text.secondary">• Contributor knowledge and availability</Typography>
          <Typography color="text.secondary">• Access to reliable sources</Typography>
          <Typography color="text.secondary">• The complexity and breadth of collector releases</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Gaps in information do not indicate endorsement of completeness. We welcome contributions to help expand and
          improve the archive.
        </Typography>
      </Stack>
    ),
  },
  {
    id: "official-project",
    question: "Is this an official Mattel project?",
    answer: (
      <Stack spacing={1.5}>
        <Typography sx={{ fontWeight: 600 }}>No.</Typography>
        <Typography>Monstrino is an independent, non-commercial fan project.</Typography>
        <Typography color="text.secondary">
          This platform is not affiliated with, endorsed by, or connected to Mattel, Inc. or any of its subsidiaries.
          All trademarks and product names remain the property of their respective owners.
        </Typography>
      </Stack>
    ),
  },
  {
    id: "contribute",
    question: "How can I contribute to the archive?",
    answer: (
      <Stack spacing={1.5}>
        <Typography>We welcome contributions from knowledgeable collectors and enthusiasts. To express interest:</Typography>
        <Stack spacing={0.5}>
          <Typography color="text.secondary">
            • Contact us via the{" "}
            <Link component={RouterLink} to="/info/contact" underline="hover">
              Contact form
            </Link>
          </Typography>
          <Typography color="text.secondary">• Describe your area of expertise or interest</Typography>
          <Typography color="text.secondary">• Indicate what kind of contributions you'd like to make</Typography>
        </Stack>
      </Stack>
    ),
  },
];

const InfoFAQAccordion = () => (
  <Stack spacing={{ xs: 1.5, md: 2 }}>
    {faqs.map((faq) => (
      <Accordion
        key={faq.id}
        disableGutters
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          backgroundColor: "transparent",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "text.secondary" }}>{faq.answer}</AccordionDetails>
      </Accordion>
    ))}
  </Stack>
);

const SupportInfo = () => {
  return (
    <InfoPage>
      <Stack spacing={{ xs: 4, md: 6 }}>
        <InfoPageHeader
          title="Support & Help"
          subtitle="Monstrino is a community-driven, volunteer-operated platform. Information is manually curated and may be incomplete or contain errors."
        />

        <InfoCallout>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Start here
            </Typography>
            <Typography color="text.secondary">
              For most questions, the FAQ section below will have an answer. If you need help with a correction or request,
              use the contact form.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button component={RouterLink} to="/info/support" variant="contained" sx={{ width: { xs: "100%", sm: "auto" } }}>
                Browse FAQs
              </Button>
              <Button component={RouterLink} to="/info/contact" variant="outlined" sx={{ width: { xs: "100%", sm: "auto" } }}>
                Contact Support
              </Button>
            </Stack>
          </Stack>
        </InfoCallout>

        <InfoAutomationNote />

        <InfoSection title="Frequently Asked Questions">
          <InfoFAQAccordion />
        </InfoSection>

        <Divider />

        <InfoSection title="Platform Limitations">
          <InfoCard>
            <Stack spacing={2}>
              <Typography color="text.secondary">
                Monstrino cannot guarantee data accuracy, completeness, or timeliness. All information is provided for
                reference purposes and should be used at your own discretion.
              </Typography>
              <Stack spacing={1}>
                <Typography color="text.secondary">• We do not provide appraisals or value assessments</Typography>
                <Typography color="text.secondary">• We do not verify authenticity of individual items</Typography>
                <Typography color="text.secondary">• We do not provide buying or selling advice</Typography>
              </Stack>
            </Stack>
          </InfoCard>
        </InfoSection>

        <Divider />

        <InfoSection title="Need Further Help?">
          <Stack spacing={2}>
            <Typography color="text.secondary">
              If your question isn't answered above, please reach out through our{" "}
              <Link component={RouterLink} to="/info/contact" underline="hover">
                Contact page
              </Link>
              .
            </Typography>
            <Typography color="text.secondary">
              For privacy-related questions, please see our{" "}
              <Link component={RouterLink} to="/legal/privacy" underline="hover">
                Privacy Policy
              </Link>
              .
            </Typography>
          </Stack>
        </InfoSection>
      </Stack>
    </InfoPage>
  );
};

export default SupportInfo;
