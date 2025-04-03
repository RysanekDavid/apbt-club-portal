import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensure this is imported only once
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  CardActionArea, // To make the card clickable
} from "@mui/material";
import { getPublishedGalleries } from "../services/firestore";
import { Gallery as GalleryModel } from "../types/models";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import * as styles from "./Gallery.styles"; // Import styles

const GalleryPage = () => {
  const [galleries, setGalleries] = useState<GalleryModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Re-initialize navigate

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const publishedGalleries = await getPublishedGalleries();
        setGalleries(publishedGalleries);
        setError("");
      } catch (err) {
        console.error("Error fetching galleries:", err);
        setError("Nepodařilo se načíst galerie. Zkuste to prosím později.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  // Re-enable handleGalleryClick
  const handleGalleryClick = (slug: string) => {
    console.log("Navigate to gallery detail:", slug);
    navigate(`/galerie/${slug}`); // Use the defined route
  };

  return (
    <Container maxWidth="lg">
      <Box sx={styles.pageContainer}>
        <Typography variant="h3" component="h1" gutterBottom>
          Galerie
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={styles.pageSubtitle}
        >
          Fotogalerie z akcí a setkání klubu.
        </Typography>

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

        {!loading && !error && galleries.length === 0 && (
          <Typography sx={styles.noGalleriesText}>
            Aktuálně nejsou k dispozici žádné galerie.
          </Typography>
        )}

        {!loading && !error && galleries.length > 0 && (
          <Grid container spacing={4}>
            {galleries.map((gallery) => (
              <Grid item key={gallery.id} xs={12} sm={6} md={4}>
                <Card sx={styles.galleryCard}>
                  {/* Re-enable CardActionArea with onClick */}
                  <CardActionArea
                    onClick={() => handleGalleryClick(gallery.slug)}
                    sx={styles.cardActionArea}
                  >
                    <CardMedia
                      component="img"
                      height="200" // Fixed height for consistency
                      image={gallery.coverImageUrl || "/placeholder-image.jpg"} // Use placeholder if no image
                      alt={gallery.title}
                      sx={styles.cardMedia} // Use imported style
                    />
                    <CardContent sx={styles.cardContent}>
                      <Typography gutterBottom variant="h6" component="div">
                        {gallery.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format(gallery.date, "d. MMMM yyyy", { locale: cs })}
                      </Typography>
                      {/* Optionally display description snippet */}
                      {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                         {gallery.description?.substring(0, 100)}...
                       </Typography> */}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default GalleryPage;
