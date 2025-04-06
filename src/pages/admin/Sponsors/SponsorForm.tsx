import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloudinaryUpload from "../../../components/CloudinaryUpload/CloudinaryUpload";
import {
  getDocumentById,
  addDocument,
  updateDocument,
} from "../../../services/firestore";
import { Sponsor } from "../../../types/models";
import * as styles from "./SponsorForm.styles"; // Import styles
import { useTranslation } from "react-i18next";

interface SponsorFormData {
  name: string;
  logoUrl: string;
  logoName: string;
  websiteUrl: string;
  description: string;
}

const SponsorForm = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<SponsorFormData>({
    defaultValues: {
      name: "",
      logoUrl: "",
      logoName: "",
      websiteUrl: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      fetchSponsor(id);
    }
  }, [id, isEditMode]);

  const fetchSponsor = async (sponsorId: string) => {
    try {
      setLoading(true);
      const sponsorData = await getDocumentById<Sponsor>("sponsors", sponsorId);

      reset({
        name: sponsorData.name,
        logoUrl: sponsorData.logoUrl,
        logoName: sponsorData.logoName || "",
        websiteUrl: sponsorData.websiteUrl || "",
        description: sponsorData.description,
      });

      setError("");
    } catch (err) {
      console.error("Error fetching sponsor:", err);
      setError(t("admin.sponsorForm.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SponsorFormData) => {
    try {
      setSubmitting(true);
      setError("");

      if (isEditMode && id) {
        // Update existing sponsor
        await updateDocument<Sponsor>("sponsors", id, {
          name: data.name,
          logoUrl: data.logoUrl,
          logoName: data.logoName,
          websiteUrl: data.websiteUrl,
          description: data.description,
        });
      } else {
        // Create new sponsor
        await addDocument<Sponsor>("sponsors", {
          name: data.name,
          logoUrl: data.logoUrl,
          logoName: data.logoName,
          websiteUrl: data.websiteUrl,
          description: data.description,
          active: true,
          order: 999, // Default order, can be changed later
        });
      }

      navigate("/admin/sponsors");
    } catch (err) {
      console.error("Error saving sponsor:", err);
      setError(t("admin.sponsorForm.saveError"));
      setSubmitting(false);
    }
  };

  const handleLogoUpload = (url: string, fileName: string) => {
    setValue("logoUrl", url);
    setValue("logoName", fileName);
  };

  const handleCancel = () => {
    navigate("/admin/sponsors");
  };

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={styles.headerBox}>
        <Typography variant="h4">
          {isEditMode
            ? t("admin.sponsorForm.editTitle")
            : t("admin.sponsorForm.addTitle")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
        >
          {t("admin.sponsorForm.backButton")}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      <Paper sx={styles.formPaper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: t("admin.sponsorForm.validation.nameRequired"),
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("admin.sponsorForm.nameLabel")}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={submitting}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="websiteUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("admin.sponsorForm.websiteUrlLabel")}
                    fullWidth
                    placeholder="https://www.example.com"
                    error={!!errors.websiteUrl}
                    helperText={errors.websiteUrl?.message}
                    disabled={submitting}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("admin.sponsorForm.descriptionLabel")}
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    disabled={submitting}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("admin.sponsorForm.logoLabel")}
              </Typography>
              <Controller
                name="logoUrl"
                control={control}
                render={({ field }) => (
                  <CloudinaryUpload
                    folder="sponsors"
                    onUploadComplete={handleLogoUpload}
                    acceptedFileTypes="image/*"
                    label={t("admin.sponsorForm.logoUploadLabel")}
                    existingUrl={field.value}
                    existingFileName={watch("logoName")}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={styles.formDivider} />
            </Grid>

            <Grid item xs={12} sx={styles.actionsGrid}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={styles.cancelButton}
                disabled={submitting}
              >
                {t("admin.sponsorForm.cancelButton")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  submitting ? <CircularProgress size={24} /> : <SaveIcon />
                }
                disabled={submitting}
              >
                {submitting
                  ? t("admin.sponsorForm.savingButton")
                  : t("admin.sponsorForm.saveButton")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default SponsorForm;
