import { Typography, Container } from "@mui/material";

const EventsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Akce klubu
      </Typography>
      <Typography variant="body1">
        Přehled nadcházejících a proběhlých akcí
      </Typography>
    </Container>
  );
};

export default EventsPage;
