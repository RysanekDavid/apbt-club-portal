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

const ContactPage = () => {
  const clubInfo = {
    name: "Klub Amerických pit bull teriérů",
    addressLine1: "Hlinice 38",
    addressLine2: "390 02 Tábor",
    phone: "724 610 712",
    email: "info@klubapbt.cz",
    website: "http://klubapbt.cz",
    ico: "68521481",
  };

  const bankInfo = {
    accountNumber: "2845463399/0800",
    bankName: "ČESKÁ SPOŘITELNA",
    bic: "GIBACZPX",
    iban: "CZ76 0800 0000 0028 4546 3399",
    paymentNote:
      "Při všech platbách na účet klubu členové zásadně uvádějí svůj variabilní symbol (=vaše členské číslo). Nečlenové neuvádějí nic.",
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
            Kontakt
          </Typography>
          <Typography variant="h6" component="p" sx={styles.headerSubtitle}>
            Máte dotaz nebo zájem o spolupráci? Neváhejte nás kontaktovat.
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
                Napište nám
              </Typography>
              <Divider sx={styles.divider} />
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={styles.formBox}
                onSubmit={handleFormSubmit}
              >
                <TextField fullWidth label="Jméno" margin="normal" required />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  required
                />
                <TextField fullWidth label="Předmět" margin="normal" />
                <TextField
                  fullWidth
                  label="Zpráva"
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
                  Odeslat zprávu
                </Button>
              </Box>
            </Paper>
          </Grid>
          {/* Top Right Column: Details + Bank */}
          <Grid item xs={12} md={6}>
            <Paper sx={styles.infoPaper}>
              <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
                Kontaktní údaje
              </Typography>
              <Divider sx={styles.divider} />
              {/* Address - MOVED TO MAP CARD */}
              {/* Phone */}
              <Box sx={styles.infoSection}>
                <PhoneIcon sx={styles.infoIcon} />
                <Box>
                  <Typography variant="h6" sx={styles.infoHeading}>
                    Telefon
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
                    Email
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
                    Web
                  </Typography>{" "}
                  {/* Ensure heading is present */}
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
                sx={{ ...styles.sectionTitle, mt: 3 }}
              >
                Banka a účet klubu
              </Typography>
              <Divider sx={styles.divider} />
              <Box sx={styles.infoSection}>
                <AccountBalanceIcon sx={styles.infoIcon} />
                <Box>
                  <Typography variant="h6" sx={styles.infoHeading}>
                    {bankInfo.bankName}
                  </Typography>
                  <Typography variant="body1">
                    Číslo účtu: {bankInfo.accountNumber}
                  </Typography>
                  <Typography variant="body1">BIC: {bankInfo.bic}</Typography>
                  <Typography variant="body1">IBAN: {bankInfo.iban}</Typography>
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
                Najdete nás zde
              </Typography>
              <Divider sx={styles.divider} />
              {/* Address (Moved Here) */}
              <Box sx={{ ...styles.infoSection, mb: 2 }}>
                {" "}
                {/* Added margin-bottom */}
                <LocationOnIcon sx={styles.infoIcon} />
                <Box>
                  <Typography variant="h6" sx={styles.infoHeading}>
                    Adresa Klubu
                  </Typography>
                  <Typography variant="body1">{clubInfo.name}</Typography>
                  <Typography variant="body1">
                    {clubInfo.addressLine1}
                  </Typography>
                  <Typography variant="body1">
                    {clubInfo.addressLine2}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    IČO: {clubInfo.ico}
                  </Typography>
                </Box>
              </Box>
              {/* Map Container */}
              <Box sx={styles.mapContainer}>
                <MapDisplay
                  position={[49.413, 14.677]}
                  popupText="Klub APBT, Hlinice 38"
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
