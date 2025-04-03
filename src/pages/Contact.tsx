import { Typography, Container, TextField, Button, Box } from "@mui/material";
import * as styles from "./Contact.styles"; // Import styles

const ContactPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Kontaktní formulář
      </Typography>
      <Box component="form" sx={styles.formBox}>
        <TextField
          fullWidth
          label="Jméno"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Zpráva"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={styles.submitButton}
        >
          Odeslat
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage;
