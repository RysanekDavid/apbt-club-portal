import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import RichTextEditor from "../../../components/Editor/RichTextEditor";
import FileUpload from "../../../components/FileUpload/FileUpload";
import { News } from "../../../types/models";
import {
  getDocumentById,
  addDocument,
  updateDocument,
} from "../../../services/firestore";
import { slugify, generateUniqueSlug } from "../../../utils/slugify";

interface NewsFormData {
  title: string;
  content: string;
  published: boolean;
  imageUrl?: string;
  imageName?: string;
}

const NewsForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [existingSlugs] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<NewsFormData>({
    defaultValues: {
      title: "",
      content: "",
      published: false,
      imageUrl: "",
      imageName: "",
    },
  });

  // We'll use this later for slug generation
  // const watchTitle = watch("title");

  useEffect(() => {
    if (isEditMode && id) {
      fetchNewsItem(id);
    }
    // Fetch existing slugs for unique slug generation
    // This would be implemented in a real application
  }, [id, isEditMode]);

  const fetchNewsItem = async (newsId: string) => {
    try {
      setLoading(true);
      const newsData = await getDocumentById<News>("news", newsId);

      reset({
        title: newsData.title,
        content: newsData.content,
        published: newsData.published,
        imageUrl: newsData.imageUrl,
        imageName: newsData.imageName,
      });

      setError("");
    } catch (err) {
      console.error("Error fetching news item:", err);
      setError("Nepodařilo se načíst novinku. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: NewsFormData) => {
    try {
      setSubmitting(true);
      setError("");

      if (isEditMode && id) {
        // Update existing news
        await updateDocument<News>("news", id, {
          title: data.title,
          content: data.content,
          published: data.published,
          imageUrl: data.imageUrl,
          imageName: data.imageName,
          ...(data.published && { publishedAt: new Date() }),
        });
      } else {
        // Create new news
        const baseSlug = slugify(data.title);
        const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

        await addDocument<News>("news", {
          title: data.title,
          content: data.content,
          published: data.published,
          imageUrl: data.imageUrl,
          imageName: data.imageName,
          slug: uniqueSlug,
          ...(data.published && { publishedAt: new Date() }),
        });
      }

      navigate("/admin/news");
    } catch (err) {
      console.error("Error saving news:", err);
      setError("Nepodařilo se uložit novinku. Zkuste to prosím znovu.");
      setSubmitting(false);
    }
  };

  const handleImageUpload = (url: string, fileName: string) => {
    setValue("imageUrl", url);
    setValue("imageName", fileName);
  };

  const handleCancel = () => {
    navigate("/admin/news");
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
          {isEditMode ? "Upravit novinku" : "Přidat novinku"}
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
                name="title"
                control={control}
                rules={{ required: "Název je povinný" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Název"
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
                rules={{ required: "Obsah je povinný" }}
                render={({ field }) => (
                  <RichTextEditor
                    label="Obsah"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.content?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Obrázek
              </Typography>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    folder="news"
                    onUploadComplete={handleImageUpload}
                    acceptedFileTypes="image/*"
                    label="Obrázek novinky"
                    existingUrl={field.value}
                    existingFileName={watch("imageName")}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        disabled={submitting}
                      />
                    }
                    label="Publikovat"
                  />
                )}
              />
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

export default NewsForm;
