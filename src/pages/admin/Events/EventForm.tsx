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
  FormControlLabel,
  Switch,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { cs } from "date-fns/locale";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloudinaryUpload from "../../../components/CloudinaryUpload/CloudinaryUpload";
import RichTextEditor from "../../../components/Editor/RichTextEditor";
import {
  getDocumentById,
  addDocument,
  updateDocument,
} from "../../../services/firestore";
import { Event } from "../../../types/models";
import { slugify, generateUniqueSlug } from "../../../utils/slugify";

interface EventFormData {
  title: string;
  description: string;
  date: Date | null;
  location: string;
  imageUrl: string;
  imageName: string;
  published: boolean;
}

const EventForm = () => {
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
  } = useForm<EventFormData>({
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      location: "",
      imageUrl: "",
      imageName: "",
      published: false,
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      fetchEvent(id);
    }
  }, [id, isEditMode]);

  const fetchEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const eventData = await getDocumentById<Event>("events", eventId);

      reset({
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        location: eventData.location,
        imageUrl: eventData.imageUrl || "",
        imageName: eventData.imageName || "",
        published: eventData.published,
      });

      setError("");
    } catch (err) {
      console.error("Error fetching event:", err);
      setError("Nepodařilo se načíst akci. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      setSubmitting(true);
      setError("");

      if (!data.date) {
        setError("Datum je povinné");
        setSubmitting(false);
        return;
      }

      if (isEditMode && id) {
        // Update existing event
        await updateDocument<Event>("events", id, {
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          imageUrl: data.imageUrl,
          imageName: data.imageName,
          published: data.published,
        });
      } else {
        // Create new event
        const baseSlug = slugify(data.title);
        const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

        await addDocument<Event>("events", {
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          imageUrl: data.imageUrl,
          imageName: data.imageName,
          published: data.published,
          slug: uniqueSlug,
          isPast: data.date < new Date(),
        });
      }

      navigate("/admin/events");
    } catch (err) {
      console.error("Error saving event:", err);
      setError("Nepodařilo se uložit akci. Zkuste to prosím znovu.");
      setSubmitting(false);
    }
  };

  const handleImageUpload = (url: string, fileName: string) => {
    setValue("imageUrl", url);
    setValue("imageName", fileName);
  };

  const handleCancel = () => {
    navigate("/admin/events");
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
          {isEditMode ? "Upravit akci" : "Přidat akci"}
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

            <Grid item xs={12} md={6}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={cs}
              >
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Datum je povinné" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Datum"
                      value={field.value}
                      onChange={(newValue: Date | null) =>
                        field.onChange(newValue)
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.date,
                          helperText: errors.date?.message,
                        },
                      }}
                      disabled={submitting}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Místo je povinné" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Místo"
                    fullWidth
                    error={!!errors.location}
                    helperText={errors.location?.message}
                    disabled={submitting}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Popis je povinný" }}
                render={({ field }) => (
                  <RichTextEditor
                    label="Popis"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.description?.message}
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
                  <CloudinaryUpload
                    folder="events"
                    onUploadComplete={handleImageUpload}
                    acceptedFileTypes="image/*"
                    label="Obrázek akce"
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

export default EventForm;
