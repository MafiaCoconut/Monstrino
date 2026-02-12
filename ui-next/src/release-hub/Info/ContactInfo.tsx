'use client';

import { useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import {
  InfoAutomationNote,
  InfoCallout,
  InfoCard,
  InfoPage,
  InfoPageHeader,
  InfoSection,
} from "./InfoComponents";

const contactSchema = z.object({
  name: z.string().max(100, "Name must be less than 100 characters").optional(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  website: z.string().max(0, "").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

type InfoContactFormProps = {
  onSubmit: (data: ContactFormData) => Promise<void>;
};

const FieldRow = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      px: { xs: 2, sm: 3 },
      py: { xs: 1.5, sm: 2 },
      borderBottom: "1px solid",
      borderColor: "divider",
    }}
  >
    {children}
  </Box>
);

const InfoContactForm = ({ onSubmit }: InfoContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartTime] = useState(Date.now());

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "",
      message: "",
      website: "",
    },
  });

  const category = watch("category");
  const message = watch("message");

  const handleFormSubmit = async (data: ContactFormData) => {
    const timeDiff = Date.now() - formStartTime;
    if (timeDiff < 3000) {
      toast.error("Please take a moment to fill out the form properly.");
      return;
    }

    if (data.website && data.website.length > 0) {
      toast.success("Your message has been sent.");
      return;
    }

    setIsSubmitting(true);
    await onSubmit(data);
    reset();
    setIsSubmitting(false);
  };

  return (
    <InfoCard sx={{ p: 0, overflow: "hidden" }}>
      <Stack component="form" onSubmit={handleSubmit(handleFormSubmit)} spacing={0}>
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            New message
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details below. Email is optional, but required if you want a response.
          </Typography>
        </Box>

        <FieldRow>
          <TextField
            fullWidth
            id="name"
            label="Name (optional)"
            placeholder="Your name"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register("name")}
          />
        </FieldRow>

        <FieldRow>
          <TextField
            fullWidth
            id="email"
            type="email"
            label="Email (optional)"
            placeholder="Not yet ready"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.email)}
            helperText={errors.email?.message ?? "Add an email address to receive a reply or status update."}
            {...register("email")}
          />
        </FieldRow>

        <FieldRow>
          <FormControl fullWidth error={Boolean(errors.category)} variant="standard">
            <InputLabel id="contact-category-label" shrink>
              Category
            </InputLabel>
            <Select
              labelId="contact-category-label"
              id="category"
              label="Category"
              value={category}
              onChange={(event) => setValue("category", event.target.value)}
              disableUnderline
            >
              <MenuItem value="general">General Inquiry</MenuItem>
              <MenuItem value="data-correction">Data Correction Request</MenuItem>
              <MenuItem value="copyright">Copyright or Legal Matter</MenuItem>
              <MenuItem value="technical">Technical Issue</MenuItem>
            </Select>
            {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
          </FormControl>
        </FieldRow>

        <FieldRow>
          <TextField
            fullWidth
            id="message"
            label="Message"
            placeholder="Please describe your inquiry..."
            multiline
            minRows={10}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.message)}
            helperText={errors.message?.message}
            {...register("message")}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "right", mt: 1 }}>
            {message?.length || 0} / 2000
          </Typography>
        </FieldRow>

        <TextField sx={{ display: "none" }} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />

        <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 }, display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" disabled variant="contained">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </Box>
      </Stack>
    </InfoCard>
  );
};

const InfoContactGuidelines = () => (
  <InfoCard>
    <Stack spacing={2}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Before You Send
      </Typography>
      <Typography variant="body2" color="text.secondary">
        To help us respond quickly, please include relevant context such as the affected page, the issue you found, and
        any sources if applicable.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        If you would like a reply or a status update, please include your email address.
      </Typography>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">• Link to the relevant page or entry</Typography>
        <Typography variant="body2" color="text.secondary">• Clear description of the issue</Typography>
        <Typography variant="body2" color="text.secondary">• Suggested correction or additional information</Typography>
      </Stack>
    </Stack>
  </InfoCard>
);

const InfoPrivacyNote = () => (
  <InfoCallout>
    <Stack spacing={1.5}>
      <Typography variant="subtitle1">Data Processing Notice</Typography>
      <Typography variant="body2" color="text.secondary">
        By submitting this form, you acknowledge that your email address and message content will be processed to handle
        your inquiry. Data is retained only as long as necessary to resolve your request.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Contacting us does not establish a contractual relationship.
      </Typography>
    </Stack>
  </InfoCallout>
);

const InfoAlternativeContact = () => (
  <InfoSection title="Alternative Contact" withDivider>
    <Stack spacing={1.5}>
      <Typography variant="body2" color="text.secondary">
        You can also reach us directly via email at{" "}
        <Typography component="span" color="text.secondary">
          Not yet ready
        </Typography>
        .
      </Typography>
      <Typography variant="body2" color="text.secondary">
        For privacy-related inquiries, please see our{" "}
        <Link href="/legal/privacy" underline="hover">
          Privacy Policy
        </Link>
        .
      </Typography>
    </Stack>
  </InfoSection>
);

const InfoResponseTime = () => (
  <InfoSection title="Response Time" withDivider>
    <Typography variant="body2" color="text.secondary">
      We aim to respond within a reasonable timeframe. As a volunteer-operated project, response times may vary depending on
      the nature and complexity of your inquiry.
    </Typography>
  </InfoSection>
);

const ContactInfo = () => {
  const handleSubmitForm = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Thank you for your message. We will respond as soon as possible.");
  };

  return (
    <InfoPage>
      <Stack spacing={{ xs: 4, md: 6 }}>
        <InfoPageHeader
          title="Contact Us"
          subtitle="Use this form to reach us regarding platform-related inquiries. Your data will be processed solely to respond to your request."
        />

        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <InfoContactForm onSubmit={handleSubmitForm} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <InfoContactGuidelines />
              <InfoAutomationNote variant="card" />
              <InfoPrivacyNote />
            </Stack>
          </Grid>
        </Grid>

        <InfoAlternativeContact />
        <InfoResponseTime />
      </Stack>
    </InfoPage>
  );
};

export default ContactInfo;
