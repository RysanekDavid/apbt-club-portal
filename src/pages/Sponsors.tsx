import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Box,
  Link, // Import Link component
} from "@mui/material";
import { getActiveSponsors } from "../services/firestore"; // Use the specific function
import { Sponsor } from "../types/models"; // Import the Sponsor type
import * as styles from "./Sponsors.styles"; // Import styles

const SponsorsPage = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        setError("");
        // Use the specific function to fetch active sponsors
        const fetchedSponsors = await getActiveSponsors();
        setSponsors(fetchedSponsors);
      } catch (err) {
        console.error("Error fetching sponsors:", err);
        setError("Nepodařilo se načíst sponzory.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <>
      {/* Header Section */}
      <Box sx={styles.headerBox}>
        <Container maxWidth="lg" sx={styles.headerContent}>
          <Typography variant="h3" component="h1" sx={styles.headerTitle}>
            Sponzoři
          </Typography>
          <Typography variant="h6" component="p" sx={styles.headerSubtitle}>
            Děkujeme našim podporovatelům a partnerům za jejich štědrost a
            spolupráci.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={styles.pageContainer}>
        {/* Removed old page title */}
        {/* <Typography variant="h4" ... /> */}

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

        {!loading && !error && (
          <Grid container spacing={4}>
            {sponsors.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  Momentálně nejsou k dispozici žádní sponzoři.
                </Typography>
              </Grid>
            ) : (
              sponsors.map((sponsor) => (
                <Grid item key={sponsor.id} xs={12} sm={6} md={4}>
                  <Card sx={styles.sponsorCard}>
                    {sponsor.logoUrl && (
                      <CardMedia
                        component="img"
                        sx={styles.cardMedia}
                        image={sponsor.logoUrl}
                        alt={`${sponsor.name} logo`}
                      />
                    )}
                    <CardContent sx={styles.cardContent}>
                      <Typography gutterBottom variant="h5" component="div">
                        {sponsor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {sponsor.description}
                      </Typography>
                    </CardContent>
                    {sponsor.websiteUrl && ( // Only show button if websiteUrl exists
                      <CardActions sx={styles.cardActions}>
                        <Button
                          size="small"
                          variant="contained"
                          component={Link} // Use Link component for navigation
                          href={sponsor.websiteUrl}
                          target="_blank" // Open in new tab
                          rel="noopener noreferrer" // Security measure
                        >
                          Navštívit web
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
    </> // Add closing fragment tag
  );
};

export default SponsorsPage;
