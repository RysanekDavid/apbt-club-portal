import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  CardActionArea,
} from "@mui/material";
import { getPublishedGalleries } from "../services/firestore";
import { Gallery as GalleryModel } from "../types/models";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import * as styles from "./Gallery.styles";

const GalleryPage = () => {
  const [galleries, setGalleries] = useState<GalleryModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleGalleryClick = (slug: string) => {
    console.log("Navigate to gallery detail:", slug);
    navigate(`/galerie/${slug}`);
  };

  return (
    <>
      {/* Hero section */}
      <Box sx={styles.heroSection}>
        <Box sx={styles.heroOverlay}>
          <Container maxWidth="md" sx={styles.heroContent}>
            <Typography variant="h2" component="h1" sx={styles.heroTitle}>
              Galerie
            </Typography>
            <Typography variant="body1" sx={styles.heroSubtitle}>
              Prohlédněte si fotografie z našich akcí a aktivit
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={styles.pageContainer}>
        <Box>
          {" "}
          {/* Removed sx={styles.pageContainer} from inner Box */}
          {/* Removed original title and subtitle */}
          {/* <Typography variant="h3" component="h1" gutterBottom> Galerie </Typography> */}
          {/* <Typography variant="body1" color="text.secondary" sx={styles.pageSubtitle}> Fotogalerie z akcí a setkání klubu. </Typography> */}
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
                    <CardActionArea
                      onClick={() => handleGalleryClick(gallery.slug)}
                      sx={styles.cardActionArea}
                    >
                      <CardMedia
                        component="img"
                        // Removed height prop, using sx style now
                        image={
                          gallery.coverImageUrl || "/placeholder-image.jpg"
                        }
                        alt={gallery.title}
                        sx={styles.cardMedia} // Use imported style with height: 220
                      />
                      <CardContent sx={styles.cardContent}>
                        <Typography gutterBottom variant="h6" component="div">
                          {gallery.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {format(gallery.date, "d. MMMM yyyy", { locale: cs })}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default GalleryPage;
