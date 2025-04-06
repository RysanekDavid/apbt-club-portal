import {
  Container,
  Typography,
  Box,
  // List, // Removed List import
  // ListItem, // Removed ListItem import
  // ListItemText, // Removed ListItemText import
  // Button, // Removed Button import (using MuiLink now for download)
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Avatar,
  Link as MuiLink,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Download,
  Description,
  Info,
  CreditCard,
  LocationOn,
  ExpandMore,
} from "@mui/icons-material";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { useState, useEffect } from "react";
import { getPublishedDocuments } from "../services/firestore";
// Removed import for getTransformedUrl
import { Document as DocumentModel } from "../types/models";
import * as styles from "./Documents.styles";
import { useTranslation } from "react-i18next";

// Helper function to extract file extension
const getFileExtension = (url: string): string => {
  try {
    const pathname = new URL(url).pathname;
    const parts = pathname.split(".");
    return parts.length > 1 ? `.${parts.pop()}` : "";
  } catch (e) {
    console.error("Error parsing URL for extension:", e);
    return ""; // Return empty string if URL parsing fails or no extension
  }
};

export default function DocumentsPage() {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState<DocumentModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const publishedDocs = await getPublishedDocuments();
        setDocuments(publishedDocs);
        setError("");
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError(t("documents.fetchError"));
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <>
      {/* Hero section */}
      <Box sx={styles.heroSection}>
        <Box sx={styles.heroOverlay}>
          <Container maxWidth="md" sx={styles.heroContent}>
            <Typography variant="h2" component="h1" sx={styles.heroTitle}>
              {t("documents.title")}
            </Typography>
            <Typography variant="body1" sx={styles.heroSubtitle}>
              {t("documents.subtitle")}
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Main content */}
      <Box component="section" sx={styles.mainContentSection}>
        <Container maxWidth={false} sx={styles.contentContainer}>
          {/* Removed intro text */}

          {/* Removed Static Documents grid */}

          {/* Dynamic Documents Section */}
          <Typography variant="h4" component="h2" mb={2}>
            {t("documents.downloadTitle")}
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
              {t("documents.noDocuments")}
            </Typography>
          )}

          {/* Render dynamic documents as full-width cards */}
          {!loading && !error && documents.length > 0 && (
            <Grid container spacing={4}>
              {documents.map((doc) => (
                <Grid item xs={12} key={doc.id}>
                  <Card sx={styles.card}>
                    <CardContent sx={styles.documentCardContent}>
                      {" "}
                      {/* Use dedicated style */}
                      <Box sx={styles.cardHeader}>
                        <Avatar sx={styles.iconAvatar}>
                          <Description />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={styles.cardTitle}
                          >
                            {doc.title}
                          </Typography>
                          {doc.description && (
                            <Typography sx={styles.cardText}>
                              {doc.description}
                            </Typography>
                          )}
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {t("documents.addedLabel")}:{" "}
                            {format(doc.createdAt, "d. MMMM yyyy", {
                              locale: cs,
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    {/* Use MuiLink styled as a button/link */}
                    <MuiLink
                      href={doc.fileUrl} // Reverted to direct file URL
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`${doc.title}${getFileExtension(doc.fileUrl)}`}
                      underline="none"
                      sx={styles.documentDownloadLink} // Use dedicated style
                      aria-disabled={!doc.fileUrl}
                      onClick={(e) => !doc.fileUrl && e.preventDefault()}
                    >
                      <Download sx={styles.downloadIcon} />
                      {t("documents.downloadButton")}
                    </MuiLink>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Contact information grid */}
          <Grid container spacing={4} sx={styles.gridContainer} mt={2}>
            {" "}
            {/* Reduced margin top */}
            {/* Bank account */}
            <Grid item xs={12} md={6}>
              <Card sx={styles.card}>
                <CardContent>
                  <Box sx={styles.cardHeader}>
                    <Avatar sx={styles.iconAvatar}>
                      <CreditCard />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={styles.cardTitle}
                      >
                        {t("documents.bankAccount.title")}
                      </Typography>
                      <Typography component="div" sx={styles.cardText}>
                        <p>
                          <strong>
                            {t("documents.bankAccount.accountNumberLabel")}:
                          </strong>{" "}
                          2845463399/0800
                        </p>
                        <p>
                          <strong>
                            {t("documents.bankAccount.accountNameLabel")}:
                          </strong>{" "}
                          {t("documents.bankAccount.accountNameValue")}
                        </p>
                        <p>
                          <strong>
                            {t("documents.bankAccount.bankNameLabel")}:
                          </strong>{" "}
                          {t("documents.bankAccount.bankNameValue")}
                        </p>
                        <p>
                          <strong>
                            {t("documents.bankAccount.bicLabel")}:
                          </strong>{" "}
                          GIBACZPX
                        </p>
                        <p>
                          <strong>
                            {t("documents.bankAccount.ibanLabel")}:
                          </strong>{" "}
                          CZ76 0800 0000 0028 4546 3399
                        </p>
                      </Typography>
                      <Box sx={styles.bankDetailsBox}>
                        <Typography sx={styles.bankImportantText}>
                          <strong>
                            {t("documents.bankAccount.importantLabel")}:
                          </strong>{" "}
                          {t("documents.bankAccount.importantText")}
                        </Typography>
                        <Typography sx={styles.bankPreferredText}>
                          {t("documents.bankAccount.preferredPaymentText")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {/* Postal address */}
            <Grid item xs={12} md={6}>
              <Card sx={styles.card}>
                <CardContent>
                  <Box sx={styles.cardHeader}>
                    <Avatar sx={styles.iconAvatar}>
                      <LocationOn />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={styles.cardTitle}
                      >
                        {t("documents.postalAddress.title")}
                      </Typography>
                      <Typography component="div" sx={styles.cardText}>
                        <p style={{ fontWeight: "bold" }}>KAPBT</p>
                        <p>Monika Pažinová</p>
                        <p>Hlinice 38</p>
                        <p>Tábor</p>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* FAQ section */}
          <Card sx={styles.faqCard}>
            {" "}
            {/* Use dedicated style */}
            <CardContent>
              <Box sx={styles.cardHeader}>
                <Avatar sx={styles.iconAvatar}>
                  <Info />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="h3" sx={styles.cardTitle}>
                    {t("documents.faq.title")}
                  </Typography>
                  <Typography sx={styles.cardText}>
                    {t("documents.faq.subtitle")}
                  </Typography>
                </Box>
              </Box>

              <Box sx={styles.faqContainer}>
                <Accordion sx={styles.faqAccordion} elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="faq1-content"
                    id="faq1-header"
                    sx={styles.faqAccordionSummary}
                  >
                    <Typography variant="subtitle1" component="h4">
                      {t("documents.faq.q1")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={styles.faqAccordionDetails}>
                    <Typography>{t("documents.faq.a1")}</Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion sx={styles.faqAccordion} elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="faq2-content"
                    id="faq2-header"
                    sx={styles.faqAccordionSummary}
                  >
                    <Typography variant="subtitle1" component="h4">
                      {t("documents.faq.q2")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={styles.faqAccordionDetails}>
                    <Typography>{t("documents.faq.a2")}</Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion sx={styles.faqAccordion} elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="faq3-content"
                    id="faq3-header"
                    sx={styles.faqAccordionSummary}
                  >
                    <Typography variant="subtitle1" component="h4">
                      {t("documents.faq.q3")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={styles.faqAccordionDetails}>
                    <Typography>{t("documents.faq.a3")}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
