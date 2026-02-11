import { Divider, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  InfoAutomationNote,
  InfoCard,
  InfoPage,
  InfoPageHeader,
  InfoParagraphStack,
  InfoSection,
} from "./InfoComponents";

const InfoOperatorCard = () => (
  <InfoCard>
    <Stack spacing={1}>
      <Typography>
        <strong>Name:</strong> [Operator Name]
      </Typography>
      <Typography>
        <strong>Address:</strong>
        <br />
        [Street Address]
        <br />
        [Postal Code City]
        <br />
        Germany
      </Typography>
      <Typography>
        <strong>Email:</strong> Not yet ready
      </Typography>
    </Stack>
  </InfoCard>
);

const InfoContentResponsibleCard = () => (
  <InfoCard sx={{ p: 2 }}>
    <Stack spacing={0.5}>
      <Typography>[Operator Name]</Typography>
      <Typography>[Street Address]</Typography>
      <Typography>[Postal Code City]</Typography>
      <Typography>Germany</Typography>
    </Stack>
  </InfoCard>
);

const InfoLegalLinksNote = () => (
  <InfoCard>
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Non-Affiliation Disclaimer
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
        For more information, see our{" "}
        <Link component={RouterLink} to="/legal/privacy" underline="hover">
          Privacy Policy
        </Link>{" "}
        or{" "}
        <Link component={RouterLink} to="/legal/terms" underline="hover">
          Terms of Service
        </Link>
        . Contact us via the{" "}
        <Link component={RouterLink} to="/info/contact" underline="hover">
          Contact page
        </Link>
        .
      </Typography>
    </Stack>
  </InfoCard>
);

const ImpressumInfo = () => {
  return (
    <InfoPage>
      <Stack spacing={{ xs: 4, md: 6 }}>
        <InfoPageHeader
          title="Impressum / Legal Notice"
          subtitle="Information according to § 5 TMG (Telemediengesetz)"
        />

        <InfoAutomationNote />

        {/*
        <InfoSection title="Operator Information">
          <InfoOperatorCard />
        </InfoSection>

        <Divider />

        <InfoSection title="Responsible for Content">
          <Typography color="text.secondary">Responsible for content according to § 18 Abs. 2 MStV:</Typography>
          <InfoContentResponsibleCard />
        </InfoSection>

        <Divider />
        */}

        <InfoSection title="Liability for Content">
          <InfoParagraphStack
            items={[
              "The contents of this website are created with care. However, we cannot guarantee the accuracy, completeness, or timeliness of the information provided.",
              "As a service provider, we are responsible for our own content on this website under general laws in accordance with § 7 Paragraph 1 TMG.",
              "According to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate unlawful activity.",
              "Obligations to remove or block the use of information under general laws remain unaffected. Upon becoming aware of any legal violations, we will remove such content promptly.",
            ]}
          />
        </InfoSection>

        <Divider />

        <InfoSection title="Liability for Links">
          <InfoParagraphStack
            items={[
              "Our website contains links to external websites of third parties. We have no influence over the content of these external websites and cannot accept responsibility for them.",
              "The respective operators of linked websites are solely responsible for their content.",
              "Linked websites were checked for possible legal violations at the time of linking. Illegal content was not apparent at the time the link was created. Permanent monitoring of linked pages is not feasible without concrete indications of a legal violation.",
              "Upon notification of legal violations, we will remove such links immediately.",
            ]}
          />
        </InfoSection>

        <Divider />

        <InfoSection title="Copyright Notice">
          <InfoParagraphStack
            items={[
              "Content and works created by the operator of this website are subject to German copyright law.",
              "Third-party content is marked accordingly. All trademarks, product names, and images belong to their respective owners and are used for informational purposes only.",
              "Reproduction, editing, distribution, or any form of use beyond the limits of copyright law requires written consent.",
              "This is a non-commercial fan project. Content is provided for informational and archival purposes under fair use / quotation principles.",
            ]}
          />
        </InfoSection>

        <Divider />

        <InfoSection title="Dispute Resolution">
          <Stack spacing={1.5}>
            <Typography color="text.secondary">
              The European Commission provides a platform for online dispute resolution (OS):{" "}
              <Link
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                https://ec.europa.eu/consumers/odr
              </Link>
            </Typography>
            <Typography color="text.secondary">
              We are not willing or obliged to participate in dispute resolution proceedings before a consumer
              arbitration board.
            </Typography>
          </Stack>
        </InfoSection>

        <Divider />

        <InfoLegalLinksNote />
      </Stack>
    </InfoPage>
  );
};

export default ImpressumInfo;
