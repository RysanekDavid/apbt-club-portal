import React, { useState, useEffect, useRef } from "react"; // Add useRef
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
  Switch,
  FormControlLabel,
  List, // Add List imports
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton, // Add IconButton
  // LinearProgress, // Removed as unused
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete"; // Add DeleteIcon
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Add CloudUploadIcon
import CloudinaryUpload from "../../../components/CloudinaryUpload/CloudinaryUpload";
import { uploadToCloudinary } from "../../../services/cloudinary"; // Import uploadToCloudinary
import {
  getDocumentById,
  addDocument,
  updateDocument,
} from "../../../services/firestore"; // Import Firestore functions
import { Gallery as GalleryModel } from "../../../types/models"; // Import Gallery type
import { slugify } from "../../../utils/slugify"; // Import slugify

// Removed unused GalleryImageData interface

interface GalleryFormData {
  title: string;
  description: string;
  date: string; // Use string for date input initially
  coverImageUrl: string;
  coverImageName: string;
  published: boolean;
  images?: { url: string; fileName: string }[]; // Add images field
}

// Interface for gallery image data used in state
interface GalleryImageData {
  url: string;
  fileName: string;
}

const GalleryForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // State for selected files
  const [galleryImages, setGalleryImages] = useState<GalleryImageData[]>([]); // State for existing/uploaded images
  // Removed uploadProgress state as it's not supported by the upload function
  // const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<GalleryFormData>({
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0], // Default to today's date
      coverImageUrl: "",
      coverImageName: "",
      published: true,
      images: [], // Initialize images array
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      fetchGallery(id);
    }
  }, [id, isEditMode]);

  const fetchGallery = async (galleryId: string) => {
    try {
      setLoading(true);
      const galleryData = await getDocumentById<GalleryModel>(
        "galleries",
        galleryId
      );
      reset({
        title: galleryData.title,
        description: galleryData.description || "",
        date: galleryData.date.toISOString().split("T")[0], // Format date for input
        coverImageUrl: galleryData.coverImageUrl || "",
        coverImageName: galleryData.coverImageName || "",
        published: galleryData.published ?? true,
        images: galleryData.images || [], // Load existing images
      });
      setGalleryImages(galleryData.images || []); // Set state for existing images
      setError("");
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setError("Nepodařilo se načíst galerii. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: GalleryFormData) => {
    if (!data.coverImageUrl) {
      setError("Prosím, nahrajte titulní obrázek galerie.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSubmitting(true); // Set submitting early

      // 1. Upload new selected files
      const uploadedImages: GalleryImageData[] = [...galleryImages]; // Start with existing images
      const uploadPromises: Promise<void>[] = [];
      // Removed progress tracking logic

      selectedFiles.forEach((file) => {
        uploadPromises.push(
          // Call uploadToCloudinary without the progress callback
          uploadToCloudinary(file, "galleries/images")
            .then((result) => {
              uploadedImages.push({ url: result.url, fileName: file.name });
              // Removed progress update
            })
            .catch((uploadError) => {
              console.error(`Error uploading ${file.name}:`, uploadError);
              setError(
                (prevError) => prevError + ` Chyba při nahrávání ${file.name}.`
              );
              // Removed progress update
              throw uploadError; // Re-throw to stop the process if needed
            })
        );
      });

      // Removed progress state update

      try {
        await Promise.all(uploadPromises); // Wait for all uploads to complete or fail
      } catch (uploadError) {
        console.error("One or more uploads failed.");
        // setError already set in individual catch blocks
        setSubmitting(false);
        return; // Stop submission if any upload fails
      }

      // 2. Prepare gallery data with all images (existing + newly uploaded)
      const galleryData: Omit<
        GalleryModel,
        "id" | "createdAt" | "updatedAt"
      > & { createdAt?: Date; updatedAt?: Date } = {
        title: data.title,
        description: data.description,
        date: new Date(data.date), // Convert string date back to Date object
        coverImageUrl: data.coverImageUrl,
        coverImageName: data.coverImageName,
        published: data.published,
        slug: slugify(data.title),
        images: uploadedImages, // Save the combined list of images
      };

      // 3. Save gallery document (add or update)
      if (isEditMode && id) {
        galleryData.updatedAt = new Date(); // Firestore serverTimestamp might be better
        await updateDocument<GalleryModel>("galleries", id, galleryData);
      } else {
        // galleryData.createdAt = new Date(); // Use serverTimestamp in addDocument
        // galleryData.updatedAt = new Date();
        await addDocument<GalleryModel>("galleries", galleryData);
      }

      navigate("/admin/galleries"); // Navigate only after successful save
    } catch (err) {
      console.error("Error saving gallery:", err);
      setError("Nepodařilo se uložit galerii. Zkuste to prosím znovu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCoverImageUpload = (url: string, fileName: string) => {
    setValue("coverImageUrl", url, { shouldValidate: true });
    setValue("coverImageName", fileName);
    if (error === "Prosím, nahrajte titulní obrázek galerie.") {
      setError("");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      // Basic validation (can be expanded)
      const validFiles = newFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      if (validFiles.length !== newFiles.length) {
        setError(
          "Byly vybrány neplatné typy souborů. Nahrávejte pouze obrázky."
        );
      }
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      // Clear the input value to allow selecting the same file again if removed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveSelectedFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveUploadedImage = (index: number) => {
    // TODO: Consider deleting the image from Cloudinary as well
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
    // Update the form state immediately if needed, or rely on onSubmit to save the new array
    setValue(
      "images",
      galleryImages.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
  };

  const handleCancel = () => {
    navigate("/admin/galleries");
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
          {isEditMode ? "Upravit galerii" : "Přidat novou galerii"}
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
            <Grid item xs={12} md={8}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Název galerie je povinný" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Název galerie"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    disabled={submitting}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Datum je povinné" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Datum galerie"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date?.message}
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
                    label="Popis galerie"
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
                Titulní obrázek
              </Typography>
              <Controller
                name="coverImageUrl"
                control={control}
                rules={{ required: "Titulní obrázek je povinný" }}
                render={({ field }) => (
                  <CloudinaryUpload
                    folder="galleries/covers" // Specific folder for covers
                    onUploadComplete={handleCoverImageUpload}
                    acceptedFileTypes="image/*"
                    label="Nahrát titulní obrázek"
                    existingUrl={field.value}
                    existingFileName={watch("coverImageName")}
                  />
                )}
              />
              {errors.coverImageUrl && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.coverImageUrl.message ||
                    "Prosím, nahrajte titulní obrázek."}
                </Typography>
              )}
            </Grid>

            {/* Multiple Image Upload Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Obrázky galerie
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                disabled={submitting}
                sx={{ mb: 1 }}
              >
                Vybrat obrázky
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  multiple // Allow multiple file selection
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </Button>

              {/* Display selected files for upload */}
              {selectedFiles.length > 0 && (
                <Paper variant="outlined" sx={{ p: 1, mb: 2 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Soubory k nahrání:
                  </Typography>
                  <List dense>
                    {selectedFiles.map((file, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveSelectedFile(index)}
                            disabled={submitting}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={file.name} />
                        {/* Removed progress display */}
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}

              {/* Display existing/uploaded images */}
              {galleryImages.length > 0 && (
                <Paper variant="outlined" sx={{ p: 1 }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Nahrané obrázky:
                  </Typography>
                  <List dense>
                    {galleryImages.map((image, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveUploadedImage(index)}
                            disabled={submitting}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar src={image.url} variant="square" />
                        </ListItemAvatar>
                        <ListItemText primary={image.fileName} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
              {/* Old placeholder comment - removed */}
              {/* <CloudinaryUpload
                 folder="galleries/images" // Different folder for gallery images
                 onUploadComplete={handleMultipleImageUpload} // Need a different handler
                 acceptedFileTypes="image/*"
                 label="Nahrát obrázky galerie"
                 multiple // Assuming CloudinaryUpload supports a 'multiple' prop
               />
               */}
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
                    label="Publikováno (zobrazit na webu)"
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
                color="primary"
                startIcon={
                  submitting ? <CircularProgress size={24} /> : <SaveIcon />
                }
                disabled={submitting}
              >
                {submitting
                  ? "Ukládání..."
                  : isEditMode
                  ? "Uložit změny"
                  : "Vytvořit galerii"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default GalleryForm;
