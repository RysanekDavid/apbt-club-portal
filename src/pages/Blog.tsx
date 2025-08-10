import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { getAllDocuments } from "../services/firestore";
import { BlogPost } from "../types/models";
import {
  heroSection,
  heroOverlay,
  heroContent,
  heroTitle,
  heroSubtitle,
  pageContainer,
  postCard,
  cardContent,
  postTitle,
  postDate,
  descriptionText,
  learnMoreButton,
  loadingBox,
  errorAlert,
  noEventsAlert,
} from "./Blog.styles";
import { useTranslation } from "react-i18next";

const BlogPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await getAllDocuments<BlogPost>(
          "blogPosts",
          "createdAt",
          "desc"
        );
        const publishedPosts = postsData.filter((post) => post.published);
        setPosts(publishedPosts);
        setError("");
      } catch (err) {
        console.error("Error fetching posts:", err);
        if (err instanceof Error) {
          setError(t("blog.fetchErrorWithMessage", { message: err.message }));
        } else {
          setError(t("blog.fetchErrorGeneric"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [t]);

  const renderPostCard = (post: BlogPost) => {
    return (
      <Grid item xs={12} md={6} key={post.id}>
        <Card sx={postCard}>
          {post.coverImageUrl && (
            <CardMedia
              component="img"
              height="140"
              image={post.coverImageUrl}
              alt={post.title}
            />
          )}
          <CardContent sx={cardContent}>
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={postTitle}
            >
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={postDate}>
              {format(post.createdAt, "d. MMMM yyyy", { locale: cs })}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={descriptionText}
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 150)}...`,
              }}
            />
            <Button
              component={RouterLink}
              to={`/blog/${post.slug}`}
              size="medium"
              sx={learnMoreButton}
            >
              {t("blog.readMore")}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Container sx={pageContainer}>
        <Box sx={loadingBox}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={pageContainer}>
        <Alert severity="error" sx={errorAlert}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Box sx={heroSection}>
        <Box sx={heroOverlay}>
          <Container maxWidth="md" sx={heroContent}>
            <Typography variant="h2" component="h1" sx={heroTitle}>
              {t("blog.title")}
            </Typography>
            <Typography variant="body1" sx={heroSubtitle}>
              {t("blog.subtitle")}
            </Typography>
          </Container>
        </Box>
      </Box>

      <Container sx={pageContainer}>
        {posts.length > 0 ? (
          <Grid container spacing={3} alignItems="flex-start">
            {posts.map(renderPostCard)}
          </Grid>
        ) : (
          <Alert severity="info" sx={noEventsAlert}>
            {t("blog.noPosts")}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default BlogPage;
