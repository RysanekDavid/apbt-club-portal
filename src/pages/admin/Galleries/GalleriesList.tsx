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
  Avatar, // To display cover image thumbnail
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"; // Icon for view/manage images (future) - Removed as unused
import { getAllDocuments, deleteDocument } from "../../../services/firestore";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { Gallery as GalleryModel } from "../../../types/models"; // Rename imported type
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import * as styles from "./GalleriesList.styles"; // Import styles

const GalleriesList: React.FC = () => {
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
      // Fetch galleries, order by date descending
      const galleriesData = await getAllDocuments<GalleryModel>(
        "galleries",
        "date",
        "desc"
      );
      setGalleries(galleriesData);
      setError("");
    } catch (err) {
      console.error("Error fetching galleries:", err);
      setError("Nepodařilo se načíst galerie. Zkuste to prosím znovu.");
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

  // Removed unused function handleManageImages
  // const handleManageImages = (id: string) => {
  //   console.log("Navigate to manage images for gallery:", id);
  //   // navigate(`/admin/galleries/${id}/images`); // Example future route
  // };

  const handleDeleteClick = (id: string) => {
    setGalleryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!galleryToDelete) return;

    try {
      // TODO: Consider deleting associated images from Cloudinary and Firestore subcollections
      await deleteDocument("galleries", galleryToDelete);
      setGalleries((prevGalleries) =>
        prevGalleries.filter((gallery) => gallery.id !== galleryToDelete)
      );
      setDeleteDialogOpen(false);
      setGalleryToDelete(null);
    } catch (err) {
      console.error("Error deleting gallery:", err);
      setError("Nepodařilo se smazat galerii. Zkuste to prosím znovu.");
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
        <Typography variant="h4">Správa galerií</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddGallery}
        >
          Přidat galerii
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
            Zatím nejsou přidány žádné galerie.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.thumbnailCell}>Náhled</TableCell>
                <TableCell>Název</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Akce</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {galleries.map((gallery) => (
                <TableRow key={gallery.id}>
                  <TableCell>
                    <Avatar
                      src={gallery.coverImageUrl}
                      alt={gallery.title}
                      variant="rounded" // Or "square"
                      sx={styles.thumbnailAvatar}
                    />
                  </TableCell>
                  <TableCell>{gallery.title}</TableCell>
                  <TableCell>{formatDate(gallery.date)}</TableCell>
                  <TableCell>
                    <Chip
                      label={gallery.published ? "Publikováno" : "Koncept"}
                      color={gallery.published ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {/* TODO: Re-enable when image management page exists */}
                    {/* <IconButton
                       color="info"
                       onClick={() => handleManageImages(gallery.id)}
                       size="small"
                       title="Spravovat obrázky"
                     >
                       <PhotoLibraryIcon />
                     </IconButton> */}
                    <IconButton
                      color="primary"
                      onClick={() => handleEditGallery(gallery.id)}
                      size="small"
                      title="Upravit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(gallery.id)}
                      size="small"
                      title="Smazat"
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
        title="Smazat galerii"
        message="Opravdu chcete smazat tuto galerii? Budou smazány i všechny přiřazené obrázky (TODO: implementovat mazání obrázků)."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default GalleriesList;
