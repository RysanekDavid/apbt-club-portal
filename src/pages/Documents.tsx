import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress, // Added for loading state
  Alert, // Added for error state
  // ListSubheader, // Removed for category grouping
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { format } from "date-fns";
import { cs } from "date-fns/locale"; // Import Czech locale
import { useState, useEffect } from "react"; // Added hooks
import { getPublishedDocuments } from "../services/firestore"; // Corrected Firestore service import
import { Document as DocumentModel } from "../types/models"; // Added model type
import * as styles from "./Documents.styles"; // Import styles

// Removed helper function groupDocumentsByCategory
// const groupDocumentsByCategory = ...

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        // Use the correct function to fetch published documents
        const publishedDocs = await getPublishedDocuments();
        // Note: getPublishedDocuments already orders by title,
        // If ordering by category first is desired, we might need to sort client-side
        // or create a new specific firestore function with compound index.
        // For now, we'll use the existing title sort and group by category.
        setDocuments(publishedDocs);
        setError("");
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Nepodařilo se načíst dokumenty. Zkuste to prosím později.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Removed grouping logic
  // const groupedDocuments = groupDocumentsByCategory(documents);
  // const categories = Object.keys(groupedDocuments).sort();

  return (
    <Container maxWidth="lg">
      <Box sx={styles.pageContainer}>
        <Typography variant="h3" component="h1" gutterBottom>
          Dokumenty ke stažení
        </Typography>

        {loading && (
          <Box sx={styles.loadingBox}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={styles.errorAlert}>
            {error}
          </Alert>
        )}

        {!loading && !error && documents.length === 0 && (
          <Typography sx={styles.noDocumentsText}>
            Aktuálně nejsou k dispozici žádné dokumenty ke stažení.
          </Typography>
        )}

        {!loading && !error && documents.length > 0 && (
          <List sx={styles.documentList}>
            {/* Removed category mapping */}
            {/* {categories.map((category) => ( ... ))} */}
            {documents.map(
              (
                doc // Map directly over documents
              ) => (
                <ListItem key={doc.id} divider>
                  <ListItemText
                    primary={doc.title}
                    secondary={`Přidáno: ${format(
                      doc.createdAt, // Use createdAt from Firestore
                      "d. MMMM yyyy",
                      { locale: cs }
                    )} ${doc.description ? `- ${doc.description}` : ""}`} // Add description if available
                  />
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    sx={styles.downloadButton}
                    href={doc.fileUrl} // Link directly to the file URL
                    target="_blank" // Open in new tab
                    rel="noopener noreferrer"
                    disabled={!doc.fileUrl} // Disable if no URL
                  >
                    Stáhnout
                  </Button>
                </ListItem>
              )
            )}
            {/* Removed closing React.Fragment */}
          </List>
        )}
      </Box>
    </Container>
  );
}
