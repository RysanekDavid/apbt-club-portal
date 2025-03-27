import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { News } from "../types/models";
import { getTransformedUrl } from "../services/cloudinary";

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper function to convert Firestore timestamp to Date
  const convertTimestampToDate = (data: DocumentData): DocumentData => {
    const result = { ...data };

    // Convert all timestamp fields to Date objects
    Object.keys(result).forEach((key) => {
      if (result[key] instanceof Timestamp) {
        result[key] = result[key].toDate();
      }
    });

    return result;
  };

  useEffect(() => {
    const fetchNewsItem = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const q = query(
          collection(db, "news"),
          where("slug", "==", slug),
          where("published", "==", true)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Novinka nebyla nalezena.");
          setLoading(false);
          return;
        }

        const doc = querySnapshot.docs[0];
        const data = convertTimestampToDate(doc.data());
        setNewsItem({ id: doc.id, ...data } as News);
        setError("");
      } catch (err) {
        console.error("Error fetching news item:", err);
        setError("Nepodařilo se načíst novinku. Zkuste to prosím znovu.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [slug]);

  const handleBack = () => {
    navigate("/novinky");
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("cs-CZ");
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !newsItem) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Novinka nebyla nalezena."}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Zpět na novinky
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Zpět na novinky
      </Button>

      <Card sx={{ mb: 4 }}>
        {newsItem.imageUrl && (
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              maxHeight: 400,
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
            }}
            image={getTransformedUrl(newsItem.imageUrl, {
              width: 1200,
              height: 800,
              crop: "limit",
              quality: 90,
            })}
            alt={newsItem.title}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {newsItem.title}
          </Typography>

          {newsItem.publishedAt && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Publikováno: {formatDate(newsItem.publishedAt)}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="body1"
            component="div"
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewsDetailPage;
