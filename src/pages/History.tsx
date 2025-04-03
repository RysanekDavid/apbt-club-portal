import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import useTranslation
import * as styles from "./History.styles"; // Import styles

export default function HistoryPage() {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <Container maxWidth="lg">
      <Box sx={styles.pageContainer}>
        <Typography variant="h3" component="h1" gutterBottom>
          {/* TODO: Add translation key for "Historie klubu" */}
          Historie klubu
        </Typography>

        {/* Use translation keys for descriptive text */}
        <Typography variant="body1" paragraph sx={styles.paragraph}>
          {t("history.paragraph1")}
        </Typography>
        <Typography variant="body1" paragraph>
          {t("history.paragraph2")}
        </Typography>
        {/* End descriptive text */}

        {/* Quote section */}
        <Box sx={styles.quoteBox}>
          <Typography variant="body2" color="text.secondary">
            {/* TODO: Add translation key for the quote if needed, or keep hardcoded */}
            "Společně budujeme lepší povědomí o tomto výjimečném plemeni"
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
