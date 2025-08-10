import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { getBlogPostBySlug } from "../services/firestore";
import { BlogPost } from "../types/models";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import {
  pageContainer,
  loadingBox,
  errorAlert,
  headerBox,
  headerTitle,
  contentBox,
} from "./BlogPostDetail.styles";
import { useTranslation } from "react-i18next";

const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError(t("blogPostDetail.slugMissing"));
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const postData = await getBlogPostBySlug(slug);
        if (postData) {
          setPost(postData);
        } else {
          setError(t("blogPostDetail.notFoundError"));
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError(t("blogPostDetail.fetchError"));
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, t]);

  return (
    <Container maxWidth="lg">
      <Box sx={pageContainer}>
        {loading && (
          <Box sx={loadingBox}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={errorAlert}>
            {error}
          </Alert>
        )}

        {!loading && !error && post && (
          <>
            <Box sx={headerBox}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={headerTitle}
              >
                {post.title}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                {t("blogPostDetail.backButton")}
              </Button>
            </Box>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {format(post.createdAt, "d. MMMM yyyy", { locale: cs })}
            </Typography>

            {post.coverImageUrl && (
              <Box
                component="img"
                src={post.coverImageUrl}
                alt={post.title}
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  my: 2,
                }}
              />
            )}

            <Box
              dangerouslySetInnerHTML={{ __html: post.content }}
              sx={contentBox}
            />
          </>
        )}
        {!loading && !post && !error && (
          <Typography>{t("blogPostDetail.notFoundOrNotPublished")}</Typography>
        )}
      </Box>
    </Container>
  );
};

export default BlogPostDetailPage;
