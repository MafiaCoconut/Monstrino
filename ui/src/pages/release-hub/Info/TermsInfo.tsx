import { Divider, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  InfoBulletList,
  InfoCallout,
  InfoCard,
  InfoPage,
  InfoPageHeader,
  InfoSection,
} from "./InfoComponents";

const InfoContactCard = () => (
  <InfoCard>
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Contact
      </Typography>
      <Typography color="text.secondary">
        If you have questions about these terms, please contact us via the{" "}
        <Link component={RouterLink} to="/info/contact" underline="hover">
          Contact page
        </Link>
        .
      </Typography>
      <Typography color="text.secondary">
        For legal notices, see the{" "}
        <Link component={RouterLink} to="/legal/impressum" underline="hover">
          Impressum
        </Link>
        .
      </Typography>
    </Stack>
  </InfoCard>
);

const TermsInfo = () => {
  const effectiveDate = "February 10, 2026";

  return (
    <InfoPage>
      <Stack spacing={{ xs: 4, md: 6 }}>
        <InfoPageHeader title="Terms of Service" subtitle={`Effective date: ${effectiveDate}`} />

        <InfoCallout>
          <Stack spacing={1.5}>
            <Typography variant="subtitle1">At a glance</Typography>
            <InfoBulletList
              items={[
                "Monstrino is a non‑commercial, community‑driven reference archive.",
                "Information is provided “as is” without warranties.",
                "Automated scripts populate data; volunteers review corrections.",
                "Commercial use, automated scraping, or redistribution require permission.",
              ]}
            />
          </Stack>
        </InfoCallout>

        <InfoSection title="1. Acceptance of Terms">
          <Typography color="text.secondary">
            By accessing and using Monstrino, you agree to be bound by these Terms of Service. If you do not agree to
            these terms, please discontinue use of the platform.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="2. Description of Service">
          <Stack spacing={1.5}>
            <Typography color="text.secondary">
              Monstrino is a non‑commercial, community‑driven informational archive focused on collector releases and
              related data. The platform is operated by volunteers and provided free of charge.
            </Typography>
            <Typography color="text.secondary">
              We make no warranties regarding the accuracy, availability, or fitness for any particular purpose of the
              information or services provided.
            </Typography>
            <Typography color="text.secondary">
              The service may be modified, suspended, or discontinued at any time without prior notice.
            </Typography>
          </Stack>
        </InfoSection>

        <Divider />

        <InfoSection title="3. Eligibility">
          <Typography color="text.secondary">
            You must be at least 13 years old to use the platform. If you are under the age of majority in your
            jurisdiction, you may use the platform only with the consent of a parent or legal guardian.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="4. Permitted Use">
          <Typography color="text.secondary">You may use Monstrino for:</Typography>
          <InfoBulletList
            items={[
              "Personal, non‑commercial, informational purposes",
              "Reference and research related to collector information",
            ]}
          />
          <Typography color="text.secondary">You may not:</Typography>
          <InfoBulletList
            items={[
              "Use automated tools to scrape, download, or redistribute content without permission",
              "Use the platform in any way that infringes third‑party rights or applicable law",
              "Engage in commercial use of platform content without authorization",
              "Attempt to reverse‑engineer or disrupt platform operations",
            ]}
          />
        </InfoSection>

        <Divider />

        <InfoSection title="5. User Submissions">
          <Typography color="text.secondary">
            If you submit corrections, suggestions, or other content, you grant us a non‑exclusive, worldwide, royalty‑free
            license to use, display, and incorporate that content for platform purposes. You represent that you have the
            rights to submit such content and that it does not violate any third‑party rights.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="6. Intellectual Property">
          <Stack spacing={1.5}>
            <Typography color="text.secondary">
              Monstrino content is provided for informational purposes. All trademarks, product names, and images remain
              the property of their respective owners.
            </Typography>
            <Typography color="text.secondary">
              You may not reproduce, distribute, or create derivative works from platform content without permission,
              except where permitted by law.
            </Typography>
          </Stack>
        </InfoSection>

        <Divider />

        <InfoSection title="7. Third‑Party Links">
          <Typography color="text.secondary">
            The platform may contain links to third‑party websites. We are not responsible for the content or practices of
            these sites and do not endorse them.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="8. Disclaimers">
          <Typography color="text.secondary">
            The platform is provided “as is” and “as available.” We disclaim all warranties, express or implied, including
            warranties of merchantability, fitness for a particular purpose, and non‑infringement.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="9. Limitation of Liability">
          <Typography color="text.secondary">
            To the maximum extent permitted by law, Monstrino and its volunteers will not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of data, use, or goodwill.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="10. Indemnification">
          <Typography color="text.secondary">
            You agree to indemnify and hold harmless Monstrino and its volunteers from claims arising out of your use of
            the platform or your violation of these Terms.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="11. Termination">
          <Typography color="text.secondary">
            We may restrict or terminate access to the platform at any time for violations of these Terms or to protect the
            integrity and security of the service.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="12. Regional Rights and Consumer Protections">
          <Typography color="text.secondary">
            If you are located in the EU/EEA/UK, your statutory rights under applicable consumer and data protection laws
            remain unaffected. If you are located in the United States, you may have additional rights under state privacy
            laws; see the Privacy Policy for details.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="13. Governing Law and Jurisdiction">
          <Typography color="text.secondary">
            These Terms are governed by the laws of [Jurisdiction], without regard to conflict of law rules. Courts located
            in [Jurisdiction] shall have exclusive jurisdiction, except where consumer protection laws provide otherwise.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoSection title="14. Changes to Terms">
          <Typography color="text.secondary">
            We may update these Terms of Service from time to time. Continued use of Monstrino after changes are posted
            constitutes acceptance of the updated terms.
          </Typography>
        </InfoSection>

        <Divider />

        <InfoContactCard />
      </Stack>
    </InfoPage>
  );
};

export default TermsInfo;
