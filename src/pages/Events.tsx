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
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { getUpcomingEvents, getPastEvents } from "../services/firestore";
import { Event as EventModel } from "../types/models";
import placeholderImage from "../assets/image_placeholder.jpg";
import * as styles from "./Events.styles";

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventModel[]>([]);
  const [pastEvents, setPastEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

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
    const descriptionNeedsTruncation = event.description.length > 150;

    return (
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
              variant="h5"
              component="div"
              gutterBottom
              sx={styles.eventTitle}
            >
              {event.title}
            </Typography>
            <Box sx={styles.infoContainer}>
              <Box sx={styles.infoItem}>
                <CalendarMonthIcon sx={styles.infoIcon} />
                <Typography variant="body2" sx={styles.infoText}>
                  {formatDate(event.date)}
                </Typography>
              </Box>
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
            <Typography
              variant="body2"
              color="text.secondary"
              sx={styles.descriptionText}
              dangerouslySetInnerHTML={{
                __html:
                  isExpanded || !descriptionNeedsTruncation
                    ? event.description
                    : `${event.description.substring(0, 150)}...`,
              }}
            />
            {descriptionNeedsTruncation ? (
              <Button
                size="small"
                onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                sx={styles.learnMoreButton}
              >
                {isExpanded ? "Skrýt" : "Číst dále"}
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  if (loading) {
    // Render loading state within the main structure if needed, or keep separate
    return (
      <Container sx={styles.pageContainer}>
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    // Render error state within the main structure if needed, or keep separate
    return (
      <Container sx={styles.pageContainer}>
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Hero section */}
      <Box sx={styles.heroSection}>
        <Box sx={styles.heroOverlay}>
          <Container maxWidth="md" sx={styles.heroContent}>
            <Typography variant="h2" component="h1" sx={styles.heroTitle}>
              Akce
            </Typography>
            <Typography variant="body1" sx={styles.heroSubtitle}>
              Objevte naše nadcházející akce a ohlédněte se za minulými
              setkáními
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Existing Content Wrapped in Container */}
      <Container sx={styles.pageContainer}>
        {/* Removed original h4 title */}
        {/* <Typography variant="h4" gutterBottom> Akce klubu </Typography> */}

        {upcomingEvents.length > 0 && (
          <Box mb={4}>
            {" "}
            {/* Added Box wrapper with margin */}
            <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
              Nadcházející akce
            </Typography>
            <Divider sx={styles.sectionDivider} />
            <Grid container spacing={3}>
              {upcomingEvents.map(renderEventCard)}
            </Grid>
          </Box>
        )}

        {pastEvents.length > 0 && (
          <Box mb={4}>
            {" "}
            {/* Added Box wrapper with margin */}
            <Typography variant="h5" gutterBottom sx={styles.sectionTitle}>
              Proběhlé akce
            </Typography>
            <Divider sx={styles.sectionDivider} />
            <Grid container spacing={3}>
              {pastEvents.map(renderEventCard)}
            </Grid>
          </Box>
        )}

        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <Alert severity="info" sx={styles.noEventsAlert}>
            Momentálně nejsou naplánovány žádné akce.
          </Alert>
        )}
      </Container>
    </>
  );
};

export default EventsPage;
