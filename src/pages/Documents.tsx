import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { format } from "date-fns";

const documents = [
  {
    title: "Stanovy klubu",
    category: "Organizační dokumenty",
    date: new Date(2024, 0, 15),
  },
  {
    title: "Přihláška do klubu",
    category: "Formuláře",
    date: new Date(2024, 1, 1),
  },
  {
    title: "Výsledky mistrovství 2024",
    category: "Výsledkové listiny",
    date: new Date(2024, 2, 10),
  },
];

export default function DocumentsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Dokumenty ke stažení
        </Typography>

        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {documents.map((doc, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={doc.title}
                secondary={`${doc.category} - ${format(
                  doc.date,
                  "dd.MM.yyyy"
                )}`}
              />
              <Button
                variant="contained"
                startIcon={<Download />}
                sx={{ ml: 2 }}
              >
                Stáhnout
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
