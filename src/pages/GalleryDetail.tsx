import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid, // Add Grid for image layout
  Card,
  CardMedia,
  CardActionArea, // Make card clickable
} from "@mui/material";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox"; // Import Lightbox
import "yet-another-react-lightbox/styles.css"; // Import default styles
import { getGalleryBySlug } from "../services/firestore";
import { Gallery as GalleryModel } from "../types/models";
import { format } from "date-fns"; // Import format for date display
import { cs } from "date-fns/locale"; // Import Czech locale

const GalleryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
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
      <Box sx={{ my: 4 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && gallery && (
          <>
            <Typography variant="h3" component="h1" gutterBottom>
              {gallery.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {format(gallery.date, "d. MMMM yyyy", { locale: cs })}
            </Typography>
            {gallery.description && (
              <Typography variant="body1" sx={{ mb: 4 }}>
                {gallery.description}
              </Typography>
            )}

            {/* Display gallery images */}
            {gallery.images && gallery.images.length > 0 ? (
              <Grid container spacing={2}>
                {gallery.images.map((image, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    {/* Wrap CardMedia in CardActionArea to make it clickable */}
                    <Card sx={{ height: "100%" }}>
                      <CardActionArea
                        onClick={() => {
                          setLightboxIndex(index);
                          setOpenLightbox(true);
                        }}
                        sx={{ height: "100%" }}
                      >
                        <CardMedia
                          component="img"
                          image={image.url}
                          alt={image.fileName || `Obrázek ${index + 1}`}
                          sx={{
                            aspectRatio: "1 / 1", // Make images square
                            objectFit: "cover",
                          }}
                        />
                        {/* Optionally add a CardContent here if needed */}
                      </CardActionArea>
                    </Card>{" "}
                    {/* Add missing closing tag */}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ mt: 4 }}>
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
