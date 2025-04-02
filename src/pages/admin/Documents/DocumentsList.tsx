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

const DocumentsList: React.FC = () => {
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
      setError("Nepodařilo se načíst dokumenty. Zkuste to prosím znovu.");
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
      setError("Nepodařilo se smazat dokument. Zkuste to prosím znovu.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDocToDelete(null);
  };

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
        <Typography variant="h4">Správa dokumentů</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddDocument}
        >
          Přidat dokument
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
      ) : documents.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">
            Zatím nejsou přidány žádné dokumenty.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Název</TableCell>
                {/* Removed Category column */}
                <TableCell>Název souboru</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Akce</TableCell>
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
                      label={doc.published ? "Publikováno" : "Koncept"}
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
                      title="Zobrazit soubor"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditDocument(doc.id)}
                      size="small"
                      title="Upravit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(doc.id)}
                      size="small"
                      title="Smazat"
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
        title="Smazat dokument"
        message="Opravdu chcete smazat tento dokument? Soubor zůstane v úložišti, ale záznam bude odstraněn."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default DocumentsList;
