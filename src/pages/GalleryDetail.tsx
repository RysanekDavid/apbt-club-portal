import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getGalleryBySlug } from "../services/firestore";
import { Gallery as GalleryModel } from "../types/models";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import * as styles from "./GalleryDetail.styles";
import { useTranslation } from "react-i18next";

const GalleryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState<GalleryModel | null>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      if (!slug) {
        setError(t("galleryDetail.slugMissing"));
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
          setError(t("galleryDetail.notFoundError"));
        }
      } catch (err) {
        console.error("Error fetching gallery details:", err);
        setError(t("galleryDetail.fetchError"));
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [slug, t]);

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
            <Box sx={styles.headerBox}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={styles.headerTitle}
              >
                {gallery.title}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                {t("galleryDetail.backButton")}
              </Button>
            </Box>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {format(gallery.date, "d. MMMM yyyy", { locale: cs })}
            </Typography>

            {gallery.images && gallery.images.length > 0 ? (
              <Grid container spacing={2}>
                {gallery.images.map((image, index) => {
                  const altText = image.fileName
                    ? image.fileName
                    : `${t("galleryDetail.imageAlt")} ${index + 1}`;
                  return (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
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
                            alt={altText}
                            sx={styles.cardMedia}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography sx={styles.noImagesText}>
                {t("galleryDetail.noImages")}
              </Typography>
            )}
          </>
        )}
        {!loading && !gallery && !error && (
          <Typography>{t("galleryDetail.notFoundOrNotPublished")}</Typography>
        )}

        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          slides={gallery?.images?.map((img) => ({ src: img.url })) || []}
          index={lightboxIndex}
        />
      </Box>
    </Container>
  );
};

export default GalleryDetailPage;
