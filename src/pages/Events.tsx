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
  Button, // Import Button for "Read More"
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Use CalendarMonthIcon instead
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
    const descriptionNeedsTruncation = event.description.length >= 200;

    return (
      <Card key={event.id} sx={styles.eventCard}>
        <Grid container>
          {/* Image Column */}
          <Grid item xs={12} sm={4} md={3}>
            <CardMedia
              component="img"
              sx={
                event.imageUrl ? styles.cardMedia : styles.cardMediaPlaceholder
              }
              image={event.imageUrl || placeholderImage}
              alt={event.imageUrl ? event.title : "Placeholder"}
            />
          </Grid>
          {/* Text Content Column */}
          <Grid item xs={12} sm={8} md={9}>
            <CardContent sx={styles.cardContent}>
              <Box>
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  sx={styles.eventTitle}
                >
                  {event.title}
                </Typography>
                <Box sx={styles.chipsContainer}>
                  <Chip
                    icon={<CalendarMonthIcon />}
                    label={formatDate(event.date)}
                    size="medium"
                    sx={styles.infoChip}
                  />
                  <Chip
                    icon={<LocationOnIcon />}
                    label={event.location}
                    size="medium"
                    sx={styles.infoChip}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={styles.descriptionText}
                  dangerouslySetInnerHTML={{
                    __html:
                      isExpanded || !descriptionNeedsTruncation
                        ? event.description
                        : `${event.description.substring(0, 200)}...`,
                  }}
                />
              </Box>
              {descriptionNeedsTruncation && ( // Show button only if text is long
                <Box sx={styles.readMoreButtonContainer}>
                  <Button
                    size="small"
                    onClick={() =>
                      setExpandedEventId(isExpanded ? null : event.id)
                    }
                    sx={styles.readMoreButton}
                  >
                    {isExpanded ? "Skrýt" : "Zobrazit více"}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {upcomingEvents.map(renderEventCard)}
            </Grid>
          </Grid>
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
            Proběhlé akce
          </Typography>
          <Divider sx={styles.sectionDivider} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {pastEvents.map(renderEventCard)}
            </Grid>
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
