import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Container,
  Typography,
  Button, // Import Button
  Box,
  CircularProgress,
  Alert,
  Grid, // Add Grid for image layout
  Card,
  CardMedia,
  CardActionArea, // Make card clickable
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back arrow icon
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox"; // Import Lightbox
import "yet-another-react-lightbox/styles.css"; // Import default styles
import { getGalleryBySlug } from "../services/firestore";
import { Gallery as GalleryModel } from "../types/models";
import { format } from "date-fns"; // Import format for date display
import { cs } from "date-fns/locale"; // Import Czech locale
import * as styles from "./GalleryDetail.styles"; // Import styles

const GalleryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate(); // Get navigate function
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState<GalleryModel | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false); // State for lightbox visibility
  const [lightboxIndex, setLightboxIndex] = useState(0); // State for current image index in lightbox

  useEffect(() => {
    const fetchGallery = async () => {
      if (!slug) {
        setError("Slug galerie chybí.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const galleryData = await getGalleryBySlug(slug);
        if (galleryData) {
          setGallery(galleryData);
        } else {
          setError("Galerie nebyla nalezena.");
        }
      } catch (err) {
        console.error("Error fetching gallery details:", err);
        setError("Nepodařilo se načíst detaily galerie.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [slug]); // Re-fetch if slug changes

  return (
    <Container maxWidth="lg">
      <Box sx={styles.pageContainer}>
        {loading && (
          <Box sx={styles.loadingBox}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={styles.errorAlert}>
            {error}
          </Alert>
        )}

        {!loading && !error && gallery && (
          <>
            {/* Wrap Title and Button in a Flex Box */}
            <Box sx={styles.headerBox}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={styles.headerTitle}
              >
                {" "}
                {gallery.title}
              </Typography>
              {/* Back Button */}
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)} // Use navigate(-1) to go back in history
              >
                Zpět na galerie
              </Button>
            </Box>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {format(gallery.date, "d. MMMM yyyy", { locale: cs })}
            </Typography>
            {/* Removed gallery description display */}

            {/* Display gallery images */}
            {gallery.images && gallery.images.length > 0 ? (
              <Grid container spacing={2}>
                {gallery.images.map((image, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    {/* Wrap CardMedia in CardActionArea to make it clickable */}
                    <Card sx={styles.imageCard}>
                      <CardActionArea
                        onClick={() => {
                          setLightboxIndex(index);
                          setOpenLightbox(true);
                        }}
                        sx={styles.imageCardActionArea}
                      >
                        <CardMedia
                          component="img"
                          image={image.url}
                          alt={image.fileName || `Obrázek ${index + 1}`}
                          sx={styles.cardMedia}
                        />
                        {/* Optionally add a CardContent here if needed */}
                      </CardActionArea>
                    </Card>{" "}
                    {/* Add missing closing tag */}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={styles.noImagesText}>
                Tato galerie zatím neobsahuje žádné obrázky.
              </Typography>
            )}
          </>
        )}
        {/* Keep the case for slug missing or gallery not found after loading */}
        {!loading && !gallery && !error && (
          <Typography>Galerie nenalezena nebo nebyla publikována.</Typography>
        )}

        {/* Render Lightbox component */}
        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          slides={gallery?.images?.map((img) => ({ src: img.url })) || []}
          index={lightboxIndex}
          // Add plugins here if needed (e.g., Thumbnails, Zoom)
        />
      </Box>
    </Container>
  );
};

export default GalleryDetailPage;
