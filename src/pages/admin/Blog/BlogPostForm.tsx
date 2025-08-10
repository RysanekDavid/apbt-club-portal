import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import RichTextEditor from "../../../components/Editor/RichTextEditor";
import CloudinaryUpload from "../../../components/CloudinaryUpload/CloudinaryUpload";
import {
  getDocumentById,
  addDocument,
  updateDocument,
} from "../../../services/firestore";
import { BlogPost } from "../../../types/models";
import { slugify, generateUniqueSlug } from "../../../utils/slugify";
import * as styles from "./BlogPostForm.styles";
import { useTranslation } from "react-i18next";

export interface BlogPostFormData {
  title: string;
  content: string;
  published: boolean;
  coverImageUrl: string;
  coverImageName: string;
}

const BlogPostForm = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [existingSlugs] = useState<string[]>([]); // Consider fetching existing slugs

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<BlogPostFormData>({
    defaultValues: {
      title: "",
      content: "",
      published: false,
      coverImageUrl: "",
      coverImageName: "",
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      fetchPost(id);
    }
  }, [id, isEditMode]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      const postData = await getDocumentById<BlogPost>("blogPosts", postId);
      reset({
        ...postData,
        coverImageUrl: postData.coverImageUrl || "",
        coverImageName: postData.coverImageName || "",
      });
      setError("");
    } catch (err) {
      console.error("Error fetching post:", err);
      setError(t("admin.blogPostForm.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: BlogPostFormData) => {
    try {
      setSubmitting(true);
      setError("");

      if (isEditMode && id) {
        const updateData: Partial<
          Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "slug">
        > = {
          title: data.title,
          content: data.content,
          published: data.published,
          coverImageUrl: data.coverImageUrl,
          coverImageName: data.coverImageName,
        };
        await updateDocument("blogPosts", id, updateData);
      } else {
        const baseSlug = slugify(data.title);
        const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);
        const addData: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> = {
          title: data.title,
          content: data.content,
          published: data.published,
          slug: uniqueSlug,
          coverImageUrl: data.coverImageUrl,
          coverImageName: data.coverImageName,
        };
        await addDocument("blogPosts", addData);
      }

      navigate("/admin/blog");
    } catch (err) {
      console.error("Error saving post:", err);
      setError(t("admin.blogPostForm.saveError"));
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/blog");
  };

  const handleImageUpload = (url: string, fileName: string) => {
    setValue("coverImageUrl", url);
    setValue("coverImageName", fileName);
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
            ? t("admin.blogPostForm.editTitle")
            : t("admin.blogPostForm.addTitle")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
        >
          {t("admin.blogPostForm.backButton")}
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
                  required: t("admin.blogPostForm.validation.titleRequired"),
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("admin.blogPostForm.titleLabel")}
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
                name="content"
                control={control}
                rules={{
                  required: t("admin.blogPostForm.validation.contentRequired"),
                }}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.content && (
                <Typography color="error" variant="caption">
                  {errors.content.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Titulní obrázek
              </Typography>
              <Controller
                name="coverImageUrl"
                control={control}
                render={() => (
                  <CloudinaryUpload
                    folder="blog_covers"
                    onUploadComplete={handleImageUpload}
                    existingUrl={watch("coverImageUrl")}
                    existingFileName={watch("coverImageName")}
                  />
                )}
              />
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
                    label={t("admin.blogPostForm.publishedLabel")}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sx={styles.actionsGrid}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={styles.cancelButton}
                disabled={submitting}
              >
                {t("admin.blogPostForm.cancelButton")}
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
                  ? t("admin.blogPostForm.savingButton")
                  : isEditMode
                  ? t("admin.blogPostForm.saveChangesButton")
                  : t("admin.blogPostForm.createButton")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default BlogPostForm;
