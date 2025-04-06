import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Switch, // Import Switch
  FormControlLabel, // Import FormControlLabel
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloudinaryUpload from "../../../components/CloudinaryUpload/CloudinaryUpload"; // Import CloudinaryUpload
import {
  getDocumentById,
  addDocument,
  updateDocument,
} from "../../../services/firestore"; // Import Firestore functions
import { Document as DocumentModel } from "../../../types/models"; // Import Document type
import * as styles from "./DocumentForm.styles"; // Import styles
import { useTranslation } from "react-i18next";

interface DocumentFormData {
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  // fileType: string; // Removed
  // fileSize: number; // Removed
  // category: string; // Removed category
  published: boolean;
}

const DocumentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
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
  } = useForm<DocumentFormData>({
    defaultValues: {
      title: "",
      description: "",
      fileUrl: "",
      fileName: "",
      // fileType: "", // Removed
      // fileSize: 0, // Removed
      // category: "", // Removed category
      published: true,
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      fetchDocument(id);
    }
  }, [id, isEditMode]);

  const fetchDocument = async (docId: string) => {
    try {
      setLoading(true);
      const docData = await getDocumentById<DocumentModel>("documents", docId);
      reset({
        title: docData.title,
        description: docData.description || "",
        fileUrl: docData.fileUrl,
        fileName: docData.fileName || "",
        // fileType: docData.fileType || "", // Removed
        // fileSize: docData.fileSize || 0, // Removed
        // category: docData.category || "", // Removed category
        published: docData.published ?? true,
      });
      setError("");
    } catch (err) {
      console.error("Error fetching document:", err);
      setError(t("admin.documentForm.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: DocumentFormData) => {
    if (!data.fileUrl) {
      setError(t("admin.documentForm.validation.fileRequiredError"));
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      // Prepare data, ensuring all required fields are present
      const documentData: Omit<
        DocumentModel,
        "id" | "createdAt" | "updatedAt"
      > & { createdAt?: Date; updatedAt?: Date } = {
        title: data.title,
        description: data.description,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        // fileType: data.fileType, // Removed
        // fileSize: data.fileSize, // Removed
        // category: data.category, // Removed category
        published: data.published,
      };

      if (isEditMode && id) {
        documentData.updatedAt = new Date(); // Set updatedAt on update
        await updateDocument<DocumentModel>("documents", id, documentData);
      } else {
        documentData.createdAt = new Date(); // Set createdAt on creation
        documentData.updatedAt = new Date(); // Also set updatedAt on creation
        await addDocument<DocumentModel>("documents", documentData);
      }

      navigate("/admin/documents");
    } catch (err) {
      console.error("Error saving document:", err);
      setError(t("admin.documentForm.saveError"));
    } finally {
      setSubmitting(false);
    }
  };

  // Reverted to original signature
  const handleFileUpload = (url: string, fileName: string) => {
    setValue("fileUrl", url, { shouldValidate: true });
    setValue("fileName", fileName);
    // setValue("fileType", fileDetails?.type || ""); // Removed
    // setValue("fileSize", fileDetails?.size || 0);   // Removed
    if (error === t("admin.documentForm.validation.fileRequiredError")) {
      setError("");
    }
  };

  // Removed duplicate handleCancel
  const handleCancel = () => {
    navigate("/admin/documents");
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
            ? t("admin.documentForm.editTitle")
            : t("admin.documentForm.addTitle")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
        >
          {t("admin.documentForm.backButton")}
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
                name="title"
                control={control}
                rules={{
                  required: t("admin.documentForm.validation.titleRequired"),
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("admin.documentForm.titleLabel")}
                    variant="outlined"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
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
                    label={t("admin.documentForm.descriptionLabel")}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    disabled={submitting}
                  />
                )}
              />
            </Grid>

            {/* Removed Category Grid item */}
            {/* <Grid item xs={12}> ... </Grid> */}

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("admin.documentForm.fileLabel")}
              </Typography>
              <Controller
                name="fileUrl"
                control={control}
                rules={{
                  required: t("admin.documentForm.validation.fileRequired"),
                }} // Add validation rule
                render={({ field }) => (
                  <CloudinaryUpload
                    folder="documents" // Specify the Cloudinary folder
                    onUploadComplete={handleFileUpload}
                    // Allow common document types + images for flexibility
                    acceptedFileTypes="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*"
                    label={t("admin.documentForm.uploadButtonLabel")}
                    existingUrl={field.value}
                    existingFileName={watch("fileName")}
                  />
                )}
              />
              {/* Display error message specifically for file upload */}
              {errors.fileUrl && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={styles.fileErrorText}
                >
                  {errors.fileUrl.message ||
                    t("admin.documentForm.validation.fileRequiredError")}
                </Typography>
              )}
              {/* Removed file type/size display */}
              {watch("fileName") && (
                <Typography variant="body2" sx={styles.fileNameText}>
                  {t("admin.documentForm.uploadedFileLabel")}:{" "}
                  {watch("fileName")}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        {...field}
                        checked={field.value}
                        disabled={submitting}
                      />
                    }
                    label={t("admin.documentForm.publishedLabel")}
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
                {t("admin.documentForm.cancelButton")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={
                  submitting ? <CircularProgress size={24} /> : <SaveIcon />
                }
                disabled={submitting}
              >
                {submitting
                  ? t("admin.documentForm.savingButton")
                  : isEditMode
                  ? t("admin.documentForm.saveChangesButton")
                  : t("admin.documentForm.createButton")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default DocumentForm;
