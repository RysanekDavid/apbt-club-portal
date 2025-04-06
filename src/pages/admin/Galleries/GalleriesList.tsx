import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllDocuments,
  deleteDocument,
  getDocumentById,
} from "../../../services/firestore";
import { deleteFromCloudinary } from "../../../services/cloudinary";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { Gallery as GalleryModel } from "../../../types/models"; // Removed ImageModel import
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import * as styles from "./GalleriesList.styles";
import { useTranslation } from "react-i18next";

// Helper function to extract publicId from Cloudinary URL
const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
    const match = url.match(regex);
    // The public ID might include folder structure, which is correct
    return match ? match[1] : null;
  } catch (e) {
    console.error("Error extracting publicId from URL:", e);
    return null;
  }
};

const GalleriesList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [galleries, setGalleries] = useState<GalleryModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const galleriesData = await getAllDocuments<GalleryModel>(
        "galleries",
        "date",
        "desc"
      );
      setGalleries(galleriesData);
      setError("");
    } catch (err) {
      console.error("Error fetching galleries:", err);
      setError(t("admin.galleriesList.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const handleAddGallery = () => {
    navigate("/admin/galleries/add");
  };

  const handleEditGallery = (id: string) => {
    navigate(`/admin/galleries/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setGalleryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!galleryToDelete) return;

    setLoading(true);
    setError("");

    try {
      // 1. Fetch gallery details to get image URLs
      const galleryDoc = await getDocumentById<GalleryModel>(
        "galleries",
        galleryToDelete
      );

      // 2. Attempt to delete images from Cloudinary
      if (galleryDoc && galleryDoc.images && galleryDoc.images.length > 0) {
        console.log(
          `Attempting to delete ${galleryDoc.images.length} images from Cloudinary for gallery ${galleryToDelete}...`
        );
        const deletePromises = galleryDoc.images.map(
          (image: { url: string; fileName: string }) => {
            // Use inline type
            const publicId = getPublicIdFromUrl(image.url);
            if (publicId) {
              // Call the (currently logging) delete function
              return deleteFromCloudinary(publicId);
            } else {
              console.warn(`Could not extract publicId from URL: ${image.url}`);
              return Promise.resolve(false); // Resolve promise even if extraction fails
            }
          }
        );

        await Promise.allSettled(deletePromises);
        console.log(
          `Cloudinary deletion calls completed for gallery ${galleryToDelete}.`
        );
      } else {
        console.log(
          `No images found in gallery ${galleryToDelete} to delete from Cloudinary.`
        );
      }

      // 3. Delete the gallery document from Firestore
      await deleteDocument("galleries", galleryToDelete);

      // 4. Update local state
      setGalleries((prevGalleries) =>
        prevGalleries.filter((gallery) => gallery.id !== galleryToDelete)
      );
    } catch (err) {
      console.error("Error deleting gallery:", err);
      setError(t("admin.galleriesList.deleteError"));
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setGalleryToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setGalleryToDelete(null);
  };

  const formatDate = (date: Date) => {
    return format(date, "d. MMMM yyyy", { locale: cs });
  };

  return (
    <Box>
      <Box sx={styles.headerBox}>
        <Typography variant="h4">{t("admin.galleriesList.title")}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddGallery}
        >
          {t("admin.galleriesList.addButton")}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : galleries.length === 0 ? (
        <Paper sx={styles.noDataPaper}>
          <Typography variant="body1">
            {t("admin.galleriesList.noData")}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.thumbnailCell}>
                  {t("admin.galleriesList.tableThumbnail")}
                </TableCell>
                <TableCell>{t("admin.galleriesList.tableName")}</TableCell>
                <TableCell>{t("admin.galleriesList.tableDate")}</TableCell>
                <TableCell>{t("admin.galleriesList.tableStatus")}</TableCell>
                <TableCell>{t("admin.galleriesList.tableActions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {galleries.map((gallery) => (
                <TableRow key={gallery.id}>
                  <TableCell>
                    <Avatar
                      src={gallery.coverImageUrl}
                      alt={gallery.title}
                      variant="rounded"
                      sx={styles.thumbnailAvatar}
                    />
                  </TableCell>
                  <TableCell>{gallery.title}</TableCell>
                  <TableCell>{formatDate(gallery.date)}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        gallery.published
                          ? t("admin.galleriesList.statusPublished")
                          : t("admin.galleriesList.statusDraft")
                      }
                      color={gallery.published ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditGallery(gallery.id)}
                      size="small"
                      title={t("admin.galleriesList.editTooltip")}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(gallery.id)}
                      size="small"
                      title={t("admin.galleriesList.deleteTooltip")}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title={t("admin.galleriesList.deleteDialogTitle")}
        message={t("admin.galleriesList.deleteDialogMessage")}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default GalleriesList;
