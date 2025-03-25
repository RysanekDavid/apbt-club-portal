import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataTable, { Column } from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { News } from "../../../types/models";
import { getAllDocuments, deleteDocument } from "../../../services/firestore";

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<News | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const newsData = await getAllDocuments<News>("news");
      setNews(newsData);
      setError("");
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Nepodařilo se načíst novinky. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNews = () => {
    navigate("/admin/news/add");
  };

  const handleEditNews = (newsItem: News) => {
    navigate(`/admin/news/edit/${newsItem.id}`);
  };

  const handleDeleteClick = (newsItem: News) => {
    setNewsToDelete(newsItem);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!newsToDelete) return;

    try {
      await deleteDocument("news", newsToDelete.id);
      setNews(news.filter((item) => item.id !== newsToDelete.id));
      setDeleteDialogOpen(false);
      setNewsToDelete(null);
    } catch (err) {
      console.error("Error deleting news:", err);
      setError("Nepodařilo se smazat novinku. Zkuste to prosím znovu.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setNewsToDelete(null);
  };

  const columns: Column<News>[] = [
    { id: "title", label: "Název", minWidth: 200 },
    {
      id: "published",
      label: "Stav",
      minWidth: 100,
      align: "center",
      format: (value: boolean) => (
        <Chip
          label={value ? "Publikováno" : "Koncept"}
          color={value ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      id: "publishedAt",
      label: "Datum publikace",
      minWidth: 150,
      format: (value: Date | undefined) =>
        value ? new Date(value).toLocaleDateString("cs-CZ") : "Nepublikováno",
    },
    {
      id: "createdAt",
      label: "Vytvořeno",
      minWidth: 150,
      format: (value: Date) => new Date(value).toLocaleDateString("cs-CZ"),
    },
    { id: "actions", label: "Akce", minWidth: 120, align: "right" },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Správa novinek</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNews}
        >
          Přidat novinku
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable<News>
          columns={columns}
          data={news}
          onEdit={handleEditNews}
          onDelete={handleDeleteClick}
          title="Seznam novinek"
          searchField="title"
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Smazat novinku"
        message={`Opravdu chcete smazat novinku "${newsToDelete?.title}"? Tato akce je nevratná.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmButtonText="Smazat"
        cancelButtonText="Zrušit"
      />
    </Box>
  );
};

export default NewsList;
