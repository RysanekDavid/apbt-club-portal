import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllDocuments, deleteDocument } from "../../../services/firestore";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { BlogPost } from "../../../types/models";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import {
  headerBox,
  errorAlert,
  loadingBox,
  noDataPaper,
} from "./BlogList.styles";
import { useTranslation } from "react-i18next";

const BlogList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsData = await getAllDocuments<BlogPost>(
        "blogPosts",
        "createdAt"
      );
      setPosts(postsData);
      setError("");
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(t("admin.blogList.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = () => {
    navigate("/admin/blog/add");
  };

  const handleEditPost = (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await deleteDocument("blogPosts", postToDelete);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postToDelete)
      );
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (err) {
      console.error("Error deleting post:", err);
      setError(t("admin.blogList.deleteError"));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  return (
    <Box>
      <Box sx={headerBox}>
        <Typography variant="h4">{t("admin.blogList.title")}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPost}
        >
          {t("admin.blogList.addButton")}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={errorAlert}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={loadingBox}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <Paper sx={noDataPaper}>
          <Typography variant="body1">{t("admin.blogList.noData")}</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("admin.blogList.tableTitle")}</TableCell>
                <TableCell>{t("admin.blogList.tableDate")}</TableCell>
                <TableCell>{t("admin.blogList.tableStatus")}</TableCell>
                <TableCell>{t("admin.blogList.tableActions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    {format(post.createdAt, "d. MMMM yyyy", {
                      locale: cs,
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        post.published
                          ? t("admin.blogList.statusPublished")
                          : t("admin.blogList.statusDraft")
                      }
                      color={post.published ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditPost(post.id)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(post.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title={t("admin.blogList.deleteDialogTitle")}
        message={t("admin.blogList.deleteDialogMessage")}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default BlogList;
