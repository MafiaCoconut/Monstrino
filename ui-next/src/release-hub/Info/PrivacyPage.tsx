'use client';

import { Link } from "@/shared/router";
import {
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import {
  InfoBulletList,
  InfoCallout,
  InfoCard,
  InfoPage,
  InfoPageHeader,
  InfoParagraphStack,
  InfoSection,
} from "./InfoComponents";

const lastUpdated = "February 10, 2026";

const dataCategories = [
  "Contact details you provide (name, email, message)",
  "Content you submit through forms",
  "Basic technical data (IP address, device/browser, timestamps)",
  "Usage and security logs for abuse prevention and performance",
];

const purposesAndBases = [
  "Provide and maintain the platform (legitimate interests; contract where applicable)",
  "Respond to inquiries and support requests (consent or legitimate interests)",
  "Security, fraud prevention, and abuse detection (legitimate interests)",
  "Compliance with legal obligations (legal obligation)",
];

const sharingPractices = [
  "Service providers (hosting, email delivery, security) under contractual safeguards",
  "Legal or regulatory authorities when required by law",
  "We do not sell or share personal information for cross‑context behavioral advertising",
];

const euRights = [
  "Access, rectification, or erasure of your personal data",
  "Restriction or objection to processing",
  "Data portability",
  "Withdraw consent at any time (where consent is the legal basis)",
];

const caRights = [
  "Right to know categories and specific pieces of personal information collected",
  "Right to delete personal information (subject to legal exceptions)",
  "Right to correct inaccurate personal information",
  "Right to opt out of sale or sharing (we do not sell or share)",
  "Right to limit use of sensitive personal information (if applicable)",
  "Right to non‑discrimination for exercising privacy rights",
];

const InfoDataTable = () => (
  <InfoCard>
    <Stack spacing={2}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Categories of Personal Information
      </Typography>
      <InfoBulletList items={dataCategories} />
    </Stack>
  </InfoCard>
);

const PrivacyPage = () => {
  return (
    <InfoPage>
      <Stack spacing={6}>
        <InfoPageHeader
          title="Privacy Policy"
          subtitle={`Last updated: ${lastUpdated}`}
        />

        <InfoCallout>
          <Stack spacing={1.5}>
            <Typography variant="subtitle1">Overview</Typography>
            <Typography variant="body2" color="text.secondary">
              This policy explains how Monstrino collects, uses, and protects information. It is designed to meet
              disclosure expectations under EU (GDPR) and US (including California) privacy rules. If you need assistance,
              contact us via the Contact page.
            </Typography>
            <MuiLink component={Link} to="/info/contact" underline="hover">
              Contact the team
            </MuiLink>
          </Stack>
        </InfoCallout>

        <InfoSection title="1. Data Controller">
          <InfoParagraphStack
            items={[
              "Contact: contact@monstrino.example",
              "If a Data Protection Officer (DPO) is appointed, their contact details will be listed here.",
            ]}
          />
        </InfoSection>

        <Divider />

        <InfoSection title="2. Information We Collect">
          <InfoDataTable />
        </InfoSection>

        <Divider />

        <InfoSection title="3. How We Use Information (Purposes & Legal Bases)">
          <InfoBulletList items={purposesAndBases} />
          <Typography variant="body2" color="text.secondary">
            Where required by GDPR, we rely on consent, legitimate interests, contractual necessity, or legal obligations.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="4. Sharing and Disclosure">
          <InfoBulletList items={sharingPractices} />
        </InfoSection>

        <Divider />

        <InfoSection title="5. Your Rights (EU / UK)">
          <InfoBulletList items={euRights} />
        </InfoSection>

        <Divider />

        <InfoSection title="6. Your Rights (California)">
          <InfoBulletList items={caRights} />
        </InfoSection>

        <Divider />

        <InfoSection title="7. Contact">
          <Typography variant="body2" color="text.secondary">
            For privacy requests or questions, email <strong>contact@monstrino.example</strong>.
          </Typography>
        </InfoSection>
      </Stack>
    </InfoPage>
  );
};

export default PrivacyPage;
