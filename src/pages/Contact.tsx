import {
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Link,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MapDisplay from "../../src/components/MapDisplay/MapDisplay"; // Correct path
import * as styles from "./Contact.styles";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();
  const clubInfo = {
    name: t("contact.clubName"), // Use translation
    addressLine1: t("contact.addressLine1"), // Use translation
    addressLine2: t("contact.addressLine2"), // Use translation
    phone: "724 610 712", // Keep phone number as is
    email: "info@klubapbt.cz", // Keep email as is
    website: "http://klubapbt.cz", // Keep website as is
    ico: "68521481", // Keep ICO as is
  };

  const bankInfo = {
    accountNumber: "2845463399/0800", // Keep account number as is
    bankName: t("contact.bankName"), // Use translation
    bic: "GIBACZPX", // Keep BIC as is
    iban: "CZ76 0800 0000 0028 4546 3399", // Keep IBAN as is
    paymentNote: t("contact.paymentNote"), // Use translation
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
    // Add actual form submission logic here
  };

  return (
    <>
      {/* Header Section */}
      <Box sx={styles.headerBox}>
        <Container maxWidth="lg" sx={styles.headerContent}>
          <Typography variant="h3" component="h1" sx={styles.headerTitle}>
            {t("contact.title")}
          </Typography>
          <Typography variant="h6" component="p" sx={styles.headerSubtitle}>
            {t("contact.subtitle")}
          </Typography>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container sx={styles.pageContainer}>
        <Grid container spacing={4}>
          {/* Top Left Column: Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper sx={styles.infoPaper}>
              <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
                {t("contact.formTitle")}
              </Typography>
              <Divider sx={styles.divider} />
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={styles.formBox}
                onSubmit={handleFormSubmit}
              >
                <TextField
                  fullWidth
                  label={t("contact.formNameLabel")}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={t("contact.formEmailLabel")}
                  type="email"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label={t("contact.formSubjectLabel")}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label={t("contact.formMessageLabel")}
                  multiline
                  rows={4}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={styles.submitButton}
                >
                  {t("contact.formSubmitButton")}
                </Button>
              </Box>
            </Paper>
          </Grid>
          {/* Top Right Column: Details + Bank */}
          <Grid item xs={12} md={6}>
            <Paper sx={styles.infoPaper}>
              <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
                {t("contact.detailsTitle")}
              </Typography>
              <Divider sx={styles.divider} />
              {/* Address - MOVED TO MAP CARD */}
              {/* Phone */}
              <Box sx={styles.infoSection}>
                <PhoneIcon sx={styles.infoIcon} />
                <Box>
                  <Typography variant="h6" sx={styles.infoHeading}>
                    {t("contact.phoneLabel")}
                  </Typography>
                  <Link href={`tel:${clubInfo.phone}`} sx={styles.infoLink}>
                    {clubInfo.phone}
                  </Link>
                </Box>
              </Box>
              <Divider sx={styles.divider} />
              {/* Email */}
              <Box sx={styles.infoSection}>
                <EmailIcon sx={styles.infoIcon} />
                <Box>
                  <Typography variant="h6" sx={styles.infoHeading}>
                    {t("contact.emailLabel")}
                  </Typography>
                  <Link href={`mailto:${clubInfo.email}`} sx={styles.infoLink}>
                    {clubInfo.email}
                  </Link>
                </Box>
              </Box>
              <Divider sx={styles.divider} />
              {/* Web */}
              <Box sx={styles.infoSection}>
                <LanguageIcon sx={styles.infoIcon} />
                <Box>
                  <Typography variant="h6" sx={styles.infoHeading}>
                    {t("contact.webLabel")}
                  </Typography>
                  <Link
                    href={clubInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={styles.infoLink}
                  >
                    {clubInfo.website}
                  </Link>
                </Box>
              </Box>
              {/* Banking Details Section (Moved inside the first Paper) */}
              <Divider sx={styles.divider} />
              <Typography
                variant="h5"
                gutterBottom
                sx={styles.bankSectionTitle} // Use dedicated style
              >
                {t("contact.bankTitle")}
              </Typography>
              <Divider sx={styles.divider} />
              <Box sx={styles.infoSection}>
                <AccountBalanceIcon sx={styles.infoIcon} />
                <Box>
                  <Typography variant="h6" sx={styles.infoHeading}>
                    {bankInfo.bankName}
                  </Typography>
                  <Typography variant="body1">
                    {t("contact.accountNumberLabel")}: {bankInfo.accountNumber}
                  </Typography>
                  <Typography variant="body1">
                    {t("contact.bicLabel")}: {bankInfo.bic}
                  </Typography>
                  <Typography variant="body1">
                    {t("contact.ibanLabel")}: {bankInfo.iban}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={styles.divider} />
              <Typography variant="body2" sx={styles.paymentNote}>
                {bankInfo.paymentNote}
              </Typography>
            </Paper>{" "}
            {/* This is the correct closing Paper tag for the Top Right Column */}
          </Grid>{" "}
          {/* This is the correct closing Grid item tag for the Top Right Column */}
          {/* </Paper> <-- This was the extra, incorrect closing tag */}
          {/* Bottom Row: Map */}
          <Grid item xs={12}>
            <Paper sx={styles.infoPaper}>
              <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
                {t("contact.mapTitle")}
              </Typography>
              <Divider sx={styles.divider} />
              {/* Address (Moved Here) */}
              <Box sx={styles.addressInfoSection}>
                {" "}
                {/* Use dedicated style */}
                <LocationOnIcon sx={styles.infoIcon} />
                <Box>
                  <Typography variant="h6" sx={styles.infoHeading}>
                    {t("contact.addressLabel")}
                  </Typography>
                  <Typography variant="body1">{clubInfo.name}</Typography>
                  <Typography variant="body1">
                    {clubInfo.addressLine1}
                  </Typography>
                  <Typography variant="body1">
                    {clubInfo.addressLine2}
                  </Typography>
                  <Typography variant="body1" sx={styles.icoText}>
                    {t("contact.icoLabel")}: {clubInfo.ico}
                  </Typography>
                </Box>
              </Box>
              {/* Map Container */}
              <Box sx={styles.mapContainer}>
                <MapDisplay
                  position={[49.413, 14.677]}
                  popupText={t("contact.mapPopupText")}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactPage;
