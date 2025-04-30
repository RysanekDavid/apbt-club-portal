import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
// Remove DatePicker, LocalizationProvider, AdapterDateFns if only used in subcomponent
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { cs } from "date-fns/locale";

import { format, parse } from "date-fns"; // Restore format/parse
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
// Remove CloudinaryUpload and RichTextEditor if only used in subcomponents
// import CloudinaryUpload from "../../../components/CloudinaryUpload/CloudinaryUpload";
// import RichTextEditor from "../../../components/Editor/RichTextEditor";
import {
  getDocumentById,
  addDocument,
  updateDocument,
} from "../../../services/firestore";
import { Event } from "../../../types/models";
import { slugify, generateUniqueSlug } from "../../../utils/slugify";
import * as styles from "./EventForm.styles";
// Import the new subcomponents
import EventBasicInfo from "./components/EventBasicInfo";
import EventDateTimeLocation from "./components/EventDateTimeLocation";
import EventDescription from "./components/EventDescription";
import EventImageUpload from "./components/EventImageUpload";
import EventPublishStatus from "./components/EventPublishStatus";
import { useTranslation } from "react-i18next";

// Export the interface
export interface EventFormData {
  title: string;
  description: string;
  date: Date | null;
  location: string;
  time: string; // Keep for storage
  startTime: Date | null; // For TimePicker
  endTime: Date | null; // For TimePicker
  imageUrl: string;
  imageName: string;
  published: boolean;
}

const EventForm = () => {
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
  } = useForm<EventFormData>({
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      location: "",
      time: "",
      startTime: null, // Add default
      endTime: null, // Add default
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
        time: eventData.time || "",
        // Add parsing logic back
        startTime: eventData.time
          ? parseTime(eventData.time, eventData.date).start
          : null,
        endTime: eventData.time
          ? parseTime(eventData.time, eventData.date).end
          : null,
        imageUrl: eventData.imageUrl || "",
        imageName: eventData.imageName || "",
        published: eventData.published,
      });
      setError("");
    } catch (err) {
      console.error("Error fetching event:", err);
      setError(t("admin.eventForm.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      setSubmitting(true);
      setError("");

      if (!data.date) {
        setError(t("admin.eventForm.validation.dateRequiredError"));
        setSubmitting(false);
        return;
      }

      if (isEditMode && id) {
        // Prepare data for update
        const updateData: Partial<
          Omit<Event, "id" | "createdAt" | "updatedAt" | "slug" | "isPast">
        > = {
          title: data.title,
          description: data.description,
          date: data.date,
          location: data.location,
          time: data.time,
          imageUrl: data.imageUrl,
          imageName: data.imageName,
          published: data.published,
        };
        // Format time before saving
        const formattedTime = formatTime(data.startTime, data.endTime);
        updateData.time = formattedTime; // Update the time field in updateData
        await updateDocument("events", id, updateData);
      } else {
        // Prepare data for adding a new event
        const baseSlug = slugify(data.title);
        const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);
        // Format time before saving
        const formattedTime = formatTime(data.startTime, data.endTime);

        // Build addData dynamically to handle optional endDate
        // Use the correct type Omit<Event, "id" | "createdAt" | "updatedAt">
        const addData: Omit<Event, "id" | "createdAt" | "updatedAt"> = {
          title: data.title,
          description: data.description,
          date: data.date, // Already checked for null earlier
          location: data.location,
          time: formattedTime, // Use formatted time
          imageUrl: data.imageUrl,
          imageName: data.imageName,
          published: data.published,
          slug: uniqueSlug,
          isPast: data.date < new Date(), // date is guaranteed non-null here
          // Conditionally add endDate ONLY if data.endTime is a valid Date
          // This ensures the field is omitted if endTime is null/undefined
          ...(data.endTime instanceof Date && { endDate: data.endTime }),
        };

        // Firestore handles missing optional fields correctly.
        // If data.endTime is null or not a Date, endDate will not be included in addData.

        await addDocument("events", addData);
      }

      navigate("/admin/events");
    } catch (err) {
      console.error("Error saving event:", err);
      setError(t("admin.eventForm.saveError"));
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
            ? t("admin.eventForm.editTitle")
            : t("admin.eventForm.addTitle")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
        >
          {t("admin.eventForm.backButton")}
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
            {/* Use Subcomponents */}
            <EventBasicInfo
              control={control}
              errors={errors}
              submitting={submitting}
            />
            <EventDateTimeLocation
              control={control}
              errors={errors}
              submitting={submitting}
            />
            <EventDescription control={control} errors={errors} />
            <EventImageUpload
              control={control}
              watch={watch}
              onUploadComplete={handleImageUpload}
            />
            <EventPublishStatus control={control} submitting={submitting} />

            {/* Action Buttons remain here */}
            <Grid item xs={12} sx={styles.actionsGrid}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={styles.cancelButton}
                disabled={submitting}
              >
                {t("admin.eventForm.cancelButton")}
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
                  ? t("admin.eventForm.savingButton")
                  : isEditMode
                  ? t("admin.eventForm.saveChangesButton")
                  : t("admin.eventForm.createButton")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

// Add helper functions back
// Helper function to format Date objects into "HH:mm - HH:mm" string
const formatTime = (start: Date | null, end: Date | null): string => {
  const startTime = start ? format(start, "HH:mm") : "";
  const endTime = end ? format(end, "HH:mm") : "";

  if (startTime && endTime) {
    return `${startTime} - ${endTime}`;
  } else if (startTime) {
    return startTime;
  } else if (endTime) {
    return endTime; // Should ideally have a start time too
  }
  return "";
};

// Helper function to parse "HH:mm - HH:mm" string back into Date objects
const parseTime = (
  timeString: string,
  eventDate: Date | null
): { start: Date | null; end: Date | null } => {
  let start: Date | null = null;
  let end: Date | null = null;
  const baseDate = eventDate instanceof Date ? eventDate : new Date(); // Use event date or today
  const parts = timeString.split(" - ");

  if (parts.length > 0 && parts[0]) {
    try {
      start = parse(parts[0], "HH:mm", baseDate);
    } catch (e) {
      console.error("Error parsing start time:", e);
    }
  }
  if (parts.length > 1 && parts[1]) {
    try {
      end = parse(parts[1], "HH:mm", baseDate);
    } catch (e) {
      console.error("Error parsing end time:", e);
    }
  }
  return { start, end };
};

export default EventForm;
