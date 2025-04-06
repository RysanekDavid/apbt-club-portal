import React, { useState, useEffect } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility"; // Icon to view file
import { getAllDocuments, deleteDocument } from "../../../services/firestore";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { Document as DocumentModel } from "../../../types/models"; // Rename imported type
import * as styles from "./DocumentsList.styles"; // Import styles
import { useTranslation } from "react-i18next";

const DocumentsList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DocumentModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      // Fetch documents, order by title (default is createdAt desc)
      const documentsData = await getAllDocuments<DocumentModel>(
        "documents",
        "title", // Order by title instead of category
        "asc" // Order ascending
      );
      setDocuments(documentsData);
      setError("");
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError(t("admin.documentsList.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const handleAddDocument = () => {
    navigate("/admin/documents/add");
  };

  const handleEditDocument = (id: string) => {
    navigate(`/admin/documents/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setDocToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!docToDelete) return;

    try {
      // TODO: Consider deleting the associated file from Cloudinary as well
      await deleteDocument("documents", docToDelete);
      setDocuments((prevDocs) =>
        prevDocs.filter((doc) => doc.id !== docToDelete)
      );
      setDeleteDialogOpen(false);
      setDocToDelete(null);
    } catch (err) {
      console.error("Error deleting document:", err);
      setError(t("admin.documentsList.deleteError"));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDocToDelete(null);
  };

  return (
    <Box>
      <Box sx={styles.headerBox}>
        <Typography variant="h4">{t("admin.documentsList.title")}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddDocument}
        >
          {t("admin.documentsList.addButton")}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : documents.length === 0 ? (
        <Paper sx={styles.noDataPaper}>
          <Typography variant="body1">
            {t("admin.documentsList.noData")}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("admin.documentsList.tableName")}</TableCell>
                {/* Removed Category column */}
                <TableCell>{t("admin.documentsList.tableFileName")}</TableCell>
                <TableCell>{t("admin.documentsList.tableStatus")}</TableCell>
                <TableCell>{t("admin.documentsList.tableActions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.title}</TableCell>
                  {/* Removed Category cell */}
                  <TableCell>{doc.fileName || "N/A"}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        doc.published
                          ? t("admin.documentsList.statusPublished")
                          : t("admin.documentsList.statusDraft")
                      }
                      color={doc.published ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      href={doc.fileUrl}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security measure
                      color="info"
                      size="small"
                      title={t("admin.documentsList.viewTooltip")}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditDocument(doc.id)}
                      size="small"
                      title={t("admin.documentsList.editTooltip")}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(doc.id)}
                      size="small"
                      title={t("admin.documentsList.deleteTooltip")}
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
        title={t("admin.documentsList.deleteDialogTitle")}
        message={t("admin.documentsList.deleteDialogMessage")}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default DocumentsList;
