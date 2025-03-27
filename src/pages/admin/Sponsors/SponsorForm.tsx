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

interface SponsorFormData {
  name: string;
  logoUrl: string;
  logoName: string;
  websiteUrl: string;
  description: string;
}

const SponsorForm = () => {
  const { id } = useParams<{ id: string }>();
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
      setError("Nepodařilo se načíst sponzora. Zkuste to prosím znovu.");
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
      setError("Nepodařilo se uložit sponzora. Zkuste to prosím znovu.");
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
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          {isEditMode ? "Upravit sponzora" : "Přidat sponzora"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
        >
          Zpět na seznam
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Název je povinný" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Název"
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
                    label="Odkaz na web"
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
                    label="Popis"
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
                Logo
              </Typography>
              <Controller
                name="logoUrl"
                control={control}
                render={({ field }) => (
                  <CloudinaryUpload
                    folder="sponsors"
                    onUploadComplete={handleLogoUpload}
                    acceptedFileTypes="image/*"
                    label="Logo sponzora"
                    existingUrl={field.value}
                    existingFileName={watch("logoName")}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ mr: 2 }}
                disabled={submitting}
              >
                Zrušit
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  submitting ? <CircularProgress size={24} /> : <SaveIcon />
                }
                disabled={submitting}
              >
                {submitting ? "Ukládání..." : "Uložit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default SponsorForm;
