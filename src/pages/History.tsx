import { Container, Typography, Box } from "@mui/material";

export default function HistoryPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Historie klubu
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          Založení klubu
        </Typography>
        <Typography variant="body1" paragraph>
          Klub byl založen v roce 2010 skupinou nadšenců s cílem vytvořit
          platformu pro zodpovědné majitele amerických pit bull teriérů. První
          schůze se konala v Praze s účastí 15 členů.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          Významné milníky
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <li>
            <Typography>2012 - První oficiální závody v poslušnosti</Typography>
          </li>
          <li>
            <Typography>2015 - Certifikace výcvikového centra</Typography>
          </li>
          <li>
            <Typography>2018 - Mezinárodní spolupráce s FCI</Typography>
          </li>
          <li>
            <Typography>2020 - Založení záchranného programu</Typography>
          </li>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            "Společně budujeme lepší povědomí o tomto výjimečném plemeni"
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
