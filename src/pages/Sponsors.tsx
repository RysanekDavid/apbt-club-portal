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
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Sponzoři a Partneři
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
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
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {sponsor.logoUrl && (
                    <CardMedia
                      component="img"
                      sx={{
                        height: 140,
                        objectFit: "contain", // Use 'contain' to fit logo without cropping
                        p: 2, // Add padding around the logo
                      }}
                      image={sponsor.logoUrl}
                      alt={`${sponsor.name} logo`}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {sponsor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {sponsor.description}
                    </Typography>
                  </CardContent>
                  {sponsor.websiteUrl && ( // Only show button if websiteUrl exists
                    <CardActions sx={{ justifyContent: "center", pb: 2 }}>
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
  );
};

export default SponsorsPage;
