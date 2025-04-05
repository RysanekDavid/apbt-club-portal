import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid, // Use standard Grid import for v6
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2"; // Remove incorrect v2 import path
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Import AccessTime icon
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { getUpcomingEvents, getPastEvents } from "../services/firestore";
import { Event as EventModel } from "../types/models"; // Renamed Event to EventModel to avoid conflict
import placeholderImage from "../assets/image_placeholder.jpg"; // Corrected import extension
import * as styles from "./Events.styles"; // Import styles

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [pastEvents, setPastEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null); // State for expanded description

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const upcoming = await getUpcomingEvents();
        const past = await getPastEvents();

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setError("");
      } catch (err) {
        console.error("Error fetching events:", err);
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

  const renderEventCard = (event: EventModel) => {
    const isExpanded = expandedEventId === event.id;
    const descriptionNeedsTruncation = event.description.length > 150; // Adjust truncation length if needed

    return (
      // Wrap card in Grid item for multi-column layout
      <Grid item xs={12} sm={6} md={4} key={event.id}>
        <Card sx={styles.eventCard}>
          <CardMedia
            component="img"
            sx={event.imageUrl ? styles.cardMedia : styles.cardMediaPlaceholder}
            image={event.imageUrl || placeholderImage}
            alt={event.imageUrl ? event.title : "Placeholder"}
          />
          <CardContent sx={styles.cardContent}>
            <Typography
              variant="h5" // Adjusted heading size
              component="div"
              gutterBottom
              sx={styles.eventTitle}
            >
              {event.title}
            </Typography>

            {/* Info Section */}
            <Box sx={styles.infoContainer}>
              <Box sx={styles.infoItem}>
                <CalendarMonthIcon sx={styles.infoIcon} />
                <Typography variant="body2" sx={styles.infoText}>
                  {formatDate(event.date)}
                </Typography>
              </Box>
              {/* Display Time if available */}
              {event.time && (
                <Box sx={styles.infoItem}>
                  <AccessTimeIcon sx={styles.infoIcon} />
                  <Typography variant="body2" sx={styles.infoText}>
                    {event.time}
                  </Typography>
                </Box>
              )}
              <Box sx={styles.infoItem}>
                <LocationOnIcon sx={styles.infoIcon} />
                <Typography variant="body2" sx={styles.infoText}>
                  {event.location}
                </Typography>
              </Box>
            </Box>

            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary" // Use secondary color for description
              sx={styles.descriptionText}
              dangerouslySetInnerHTML={{
                __html:
                  isExpanded || !descriptionNeedsTruncation
                    ? event.description
                    : `${event.description.substring(0, 150)}...`, // Use adjusted length
              }}
            />

            {/* Learn More / Toggle Button */}
            {descriptionNeedsTruncation ? (
              <Button
                size="small"
                onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                sx={styles.learnMoreButton} // Use new style name
              >
                {isExpanded ? "Skrýt" : "Číst dále"}
              </Button>
            ) : null}
            {/* Render nothing if description doesn't need truncation */}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  if (loading) {
    return (
      <Container sx={styles.pageContainer}>
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={styles.pageContainer}>
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={styles.pageContainer}>
      <Typography variant="h4" gutterBottom>
        Akce klubu
      </Typography>

      {upcomingEvents.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
            Nadcházející akce
          </Typography>
          <Divider sx={styles.sectionDivider} />
          {/* Grid container for the cards */}
          <Grid container spacing={3}>
            {upcomingEvents.map(renderEventCard)}
          </Grid>
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
            Proběhlé akce
          </Typography>
          <Divider sx={styles.sectionDivider} />
          {/* Grid container for the cards */}
          <Grid container spacing={3}>
            {pastEvents.map(renderEventCard)}
          </Grid>
        </>
      )}

      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <Alert severity="info" sx={styles.noEventsAlert}>
          Momentálně nejsou naplánovány žádné akce.
        </Alert>
      )}
    </Container>
  );
};

export default EventsPage;
