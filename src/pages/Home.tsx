import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Paper, // Import Paper for new sections
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // For internal routing links
import { getPublishedNews } from "../services/firestore";
import { News } from "../types/models";
import { getTransformedUrl } from "../services/cloudinary";
import homepageImage from "../assets/homepage_image.png"; // Import the homepage image
// Import styled components
import {
  // Removed HeroSection, HeroContentContainer as they are handled differently now
  NewsSectionContainer,
  NewsGrid,
} from "./Home.styles";
// Icons for new sections (optional but nice)
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function HomePage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsData = await getPublishedNews(3); // Get latest 3 news items
        setNews(newsData);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Nepodařilo se načíst aktuality.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      {/* Hero Section using <img> tag for background */}
      <Box
        sx={{
          position: "relative", // Needed for positioning img and overlay
          minHeight: { xs: "300px", md: "450px" }, // Keep minimum height
          color: theme.palette.common.white, // Keep white text color
          overflow: "hidden", // Hide potential overflow from absolutely positioned image
          display: "flex", // Use flex to center content container vertically
          alignItems: "center", // Center content container vertically
          justifyContent: "center", // Center content container horizontally (optional)
          mb: 4, // Keep margin bottom
          // Overlay is now separate
        }}
      >
        {/* Absolutely positioned Image */}
        <Box
          component="img"
          src={homepageImage}
          alt="" // Alt text is decorative here
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", // Fill the container, may crop
            objectPosition: "center 20%", // Position 20% from the top - TRY THIS
            zIndex: 0, // Behind overlay and content
          }}
        />
        {/* Overlay */}
        <Box
          sx={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)", // Dark overlay
            zIndex: 1, // Overlay should be above image but below text
          }}
        />
        {/* Container to constrain content width, ensure it's above overlay */}
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 2, py: { xs: 6, md: 8 } }}
        >
          {" "}
          {/* Add padding here */}
          {/* Use Grid to position text */}
          <Grid container>
            <Grid item xs={12} md={8} lg={7}>
              {" "}
              {/* Adjust text column width */}
              <Typography
                variant={isMdUp ? "h2" : "h3"}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                }}
              >
                APBT Klub ČR
              </Typography>
              <Typography
                variant="h6"
                component="p"
                paragraph
                sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
              >
                Vítejte na oficiálních stránkách Klubu přátel amerických pit
                bull teriérů. Podporujeme zodpovědný chov, výcvik a komunitu
                nadšenců.
              </Typography>
              {/* Optional Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/kontakt"
                sx={{ mt: 2 }}
              >
                Kontaktujte nás
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* --- New Content Sections --- */}
      <NewsSectionContainer maxWidth="lg">
        {" "}
        {/* Use styled container */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Upcoming Events Section */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: { xs: 1.5, sm: 3 }, // Reduce padding on extra-small screens
                textAlign: "center",
                height: "100%",
              }}
            >
              <EventIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Nadcházející Akce
              </Typography>
              <Typography variant="body2" paragraph>
                Podívejte se na plánované výstavy, soutěže a další klubové akce.
              </Typography>
              <Button variant="outlined" component={RouterLink} to="/akce">
                Zobrazit akce
              </Button>
            </Paper>
          </Grid>

          {/* About Us / Membership Section */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: { xs: 1.5, sm: 3 }, // Reduce padding on extra-small screens
                textAlign: "center",
                height: "100%",
              }}
            >
              <GroupIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                O Klubu / Členství
              </Typography>
              <Typography variant="body2" paragraph>
                Zjistěte více o naší historii, cílech a výhodách členství v
                klubu.
              </Typography>
              {/* Link to History or Contact */}
              <Button variant="outlined" component={RouterLink} to="/historie">
                Více o nás
              </Button>
            </Paper>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: { xs: 1.5, sm: 3 }, // Reduce padding on extra-small screens
                textAlign: "center",
                height: "100%",
              }}
            >
              <ContactMailIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Kontaktujte Nás
              </Typography>
              <Typography variant="body2" paragraph>
                Máte dotazy nebo se chcete zapojit? Neváhejte nás kontaktovat.
              </Typography>
              <Button variant="outlined" component={RouterLink} to="/kontakt">
                Kontaktní údaje
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </NewsSectionContainer>
      {/* --- End New Content Sections --- */}

      {/* Existing News Section using styled components */}
      <NewsSectionContainer maxWidth="lg">
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Nejnovější aktuality
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : news.length === 0 ? (
          <Typography>Žádné aktuality k zobrazení.</Typography>
        ) : (
          <NewsGrid>
            {" "}
            {/* Use styled grid */}
            {news.map((item) => (
              <Card
                key={item.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={getTransformedUrl(item.imageUrl, {
                      width: 400,
                      height: 200,
                      crop: "fill",
                    })}
                    alt={item.title}
                  />
                )}
                {/* Apply responsive padding to CardContent */}
                <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  {item.publishedAt && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {new Date(item.publishedAt).toLocaleDateString("cs-CZ")}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {item.content.length > 150
                      ? `${item.content
                          .replace(/<[^>]*>/g, "")
                          .substring(0, 150)}...`
                      : item.content.replace(/<[^>]*>/g, "")}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    // Use RouterLink for internal navigation
                    component={RouterLink}
                    to={`/novinky/${item.slug}`}
                  >
                    Číst více
                  </Button>
                </CardContent>
              </Card>
            ))}
          </NewsGrid>
        )}
      </NewsSectionContainer>
    </>
  );
}
