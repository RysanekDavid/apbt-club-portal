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
        setError("Nepodařilo se načíst dokumenty. Zkuste to prosím později.");
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
              Dokumenty
            </Typography>
            <Typography variant="body1" sx={styles.heroSubtitle}>
              V této sekci naleznete důležité informace o klubu.
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

          {/* Render dynamic documents as full-width cards */}
          {!loading && !error && documents.length > 0 && (
            <Grid container spacing={4}>
              {documents.map((doc) => (
                <Grid item xs={12} key={doc.id}>
                  <Card sx={styles.card}>
                    <CardContent sx={{ flexGrow: 1 }}>
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
                            Přidáno:{" "}
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
                      download={`${doc.title}${getFileExtension(doc.fileUrl)}`} // Re-added download attribute
                      underline="none" // Remove underline from link
                      sx={{
                        ...styles.downloadLink,
                        p: 3,
                        pt: 0,
                        alignSelf: "flex-start",
                      }} // Align link to start, adjust padding
                      aria-disabled={!doc.fileUrl}
                      onClick={(e) => !doc.fileUrl && e.preventDefault()} // Prevent click if no URL
                    >
                      <Download sx={styles.downloadIcon} />
                      Stáhnout dokument
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
                        Banka a účet klubu
                      </Typography>
                      <Typography component="div" sx={styles.cardText}>
                        <p>
                          <strong>Účet:</strong> 2845463399/0800
                        </p>
                        <p>
                          <strong>Název účtu:</strong> Klub amerických pit bull
                          teriérů
                        </p>
                        <p>
                          <strong>Název banky:</strong> Česká spořitelna
                        </p>
                        <p>
                          <strong>BIC:</strong> GIBACZPX
                        </p>
                        <p>
                          <strong>IBAN:</strong> CZ76 0800 0000 0028 4546 3399
                        </p>
                      </Typography>
                      <Box sx={styles.bankDetailsBox}>
                        <Typography sx={styles.bankImportantText}>
                          <strong>Důležité:</strong> Při všech platbách na účet
                          klubu členové zásadně uvádějí svůj variabilní symbol
                          (=vaše členské číslo). Nečlenové neuvádějí nic.
                        </Typography>
                        <Typography sx={styles.bankPreferredText}>
                          PREFERUJEME PLATBU NA ÚČET – Děkujeme
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
                        Poštovní adresa klubu
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
          <Card sx={{ ...styles.card, p: 3 }}>
            {" "}
            {/* Apply card styling */}
            <CardContent>
              <Box sx={styles.cardHeader}>
                <Avatar sx={styles.iconAvatar}>
                  <Info />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="h3" sx={styles.cardTitle}>
                    Často kladené dotazy
                  </Typography>
                  <Typography sx={styles.cardText}>
                    Odpovědi na nejčastější otázky týkající se členství a
                    dokumentů
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
                      Jak se stát členem klubu?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={styles.faqAccordionDetails}>
                    <Typography>
                      Pro členství v klubu je potřeba vyplnit přihlášku,
                      zaplatit členský příspěvek a odeslat podepsanou přihlášku
                      na adresu klubu.
                    </Typography>
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
                      Jaké jsou výhody členství?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={styles.faqAccordionDetails}>
                    <Typography>
                      Členové klubu mají přístup k odborným informacím, mohou se
                      účastnit klubových akcí za zvýhodněné ceny a získávají
                      podporu při sportovních aktivitách se svými psy.
                    </Typography>
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
                      Jak obnovit členství?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={styles.faqAccordionDetails}>
                    <Typography>
                      Pro obnovení členství stačí v prosinci zaplatit členský
                      příspěvek a uvést své členské číslo jako variabilní
                      symbol. Není potřeba znovu zasílat přihlášku.
                    </Typography>
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
