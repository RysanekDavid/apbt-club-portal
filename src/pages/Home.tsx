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
} from "@mui/material";
import { getPublishedNews } from "../services/firestore";
import { News } from "../types/models";
import { getTransformedUrl } from "../services/cloudinary";

export default function HomePage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <Container maxWidth="lg">
      {/* Removed background image styling from this Box */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Vítejte v APBT Klubu
        </Typography>
        <Typography variant="body1" paragraph>
          Vítejte na oficiálních stránkách Klubu přátel amerických pit bull
          teriérů. Naším cílem je podpora odpovědného chovu a výcviku těchto
          psů, organizace vzdělávacích akcí a budování komunity nadšených
          majitelů.
        </Typography>

        {/* Add illustrations section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            my: 4,
            flexWrap: "wrap",
          }}
        >
          {/* Illustration 1 removed */}
          {/* Illustration 2 removed from here and used as background */}
        </Box>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
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
          <Box
            sx={{
              // Reverted background color, padding, and border radius
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
              mb: 4,
            }}
          >
            {news.map((item) => (
              <Card
                key={item.id}
                // Reverted variant="outlined"
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
                <CardContent sx={{ flexGrow: 1 }}>
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
                    href={`/novinky/${item.slug}`}
                  >
                    Číst více
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
