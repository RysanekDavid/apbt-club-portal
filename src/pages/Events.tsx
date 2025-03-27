import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { getUpcomingEvents, getPastEvents } from "../services/firestore";
import { Event } from "../types/models";

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setpastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const upcoming = await getUpcomingEvents();
        const past = await getPastEvents();

        setUpcomingEvents(upcoming);
        setpastEvents(past);
        setError("");
      } catch (err) {
        console.error("Error fetching events:", err);
        // Log more detailed error information
        if (err instanceof Error) {
          console.error("Error details:", err.message);
          setError(`Nepodařilo se načíst akce: ${err.message}`);
        } else {
          setError("Nepodařilo se načíst akce. Zkuste to prosím znovu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date: Date) => {
    return format(date, "d. MMMM yyyy", { locale: cs });
  };

  const renderEventCard = (event: Event) => (
    <Card
      key={event.id}
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {event.imageUrl && (
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: 200 },
            height: { xs: 200, md: "100%" },
            objectFit: "cover",
          }}
          image={event.imageUrl}
          alt={event.title}
        />
      )}
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Typography variant="h5" component="div" gutterBottom>
          {event.title}
        </Typography>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Chip
            label={formatDate(event.date)}
            color="primary"
            size="small"
            variant="outlined"
          />
          <Chip label={event.location} size="small" variant="outlined" />
        </Box>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Akce klubu
      </Typography>

      {upcomingEvents.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Nadcházející akce
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {upcomingEvents.map(renderEventCard)}
            </Grid>
          </Grid>
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Proběhlé akce
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {pastEvents.map(renderEventCard)}
            </Grid>
          </Grid>
        </>
      )}

      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          Momentálně nejsou naplánovány žádné akce.
        </Alert>
      )}
    </Container>
  );
};

export default EventsPage;
