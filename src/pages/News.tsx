import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { getPublishedNews } from "../services/firestore";
import { News } from "../types/models";
import { getTransformedUrl } from "../services/cloudinary";

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsData = await getPublishedNews();
        setNewsItems(newsData);
        setError("");
      } catch (err) {
        console.error("Error fetching news:", err);
        // Log more detailed error information
        if (err instanceof Error) {
          console.error("Error details:", err.message);
          setError(`Nepodařilo se načíst aktuality: ${err.message}`);
        } else {
          setError("Nepodařilo se načíst aktuality. Zkuste to prosím znovu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("cs-CZ");
  };

  const renderNewsCard = (newsItem: News) => (
    <Card
      key={newsItem.id}
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {newsItem.imageUrl && (
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: 200 },
            height: { xs: 200, md: "100%" },
            objectFit: "cover",
          }}
          image={getTransformedUrl(newsItem.imageUrl, {
            width: 400,
            height: 300,
            crop: "fill",
          })}
          alt={newsItem.title}
        />
      )}
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Typography variant="h5" component="div" gutterBottom>
          {newsItem.title}
        </Typography>
        {newsItem.publishedAt && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {formatDate(newsItem.publishedAt)}
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{ mb: 2 }}
          dangerouslySetInnerHTML={{
            __html:
              newsItem.content.length > 300
                ? `${newsItem.content.substring(0, 300)}...`
                : newsItem.content,
          }}
        />
        {newsItem.content.length > 300 && (
          <Button
            variant="outlined"
            size="small"
            href={`/novinky/${newsItem.slug}`}
          >
            Číst více
          </Button>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Novinky a aktuality
      </Typography>

      {newsItems.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {newsItems.map(renderNewsCard)}
          </Grid>
        </Grid>
      ) : (
        <Alert severity="info" sx={{ mt: 3 }}>
          Momentálně nejsou k dispozici žádné novinky.
        </Alert>
      )}
    </Container>
  );
};

export default NewsPage;
