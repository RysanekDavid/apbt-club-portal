import { Container, Typography, Box } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Vítejte v APBT Klubu
        </Typography>
        <Typography variant="body1" paragraph>
          Vítejte na oficiálních stránkách Klubu přátel amerických pit bull
          teriérů. Naším cílem je podpora odpovědného chovu a výcviku těchto
          psů, organizace vzdělávacích akcí a budování komunity nadšených
          majitelů.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          Nejnovější aktuality
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          {/* Placeholder for news items */}
          <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
            <Typography variant="h6">Připravovaný výcvikový seminář</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              15. dubna 2025
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Základy poslušnosti a socializace...
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
