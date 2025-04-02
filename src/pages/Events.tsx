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
      <Card key={event.id} sx={{ mb: 2, display: "flex" }}>
        <Grid container>
          {/* Image Column */}
          <Grid item xs={12} sm={4} md={3}>
            <CardMedia
              component="img"
              sx={{
                height: { xs: 100, sm: "100%" }, // Full height on sm+
                width: "100%",
                objectFit: "contain", // Changed from cover to contain
                backgroundColor: "#fff", // Added white background
                filter: !event.imageUrl
                  ? "grayscale(70%) opacity(70%)"
                  : "none",
              }}
              image={event.imageUrl || placeholderImage}
              alt={event.imageUrl ? event.title : "Placeholder"}
            />
          </Grid>
          {/* Text Content Column */}
          <Grid item xs={12} sm={8} md={9}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  sx={{ mt: 1 }}
                >
                  {event.title}
                </Typography>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Chip
                    icon={<CalendarMonthIcon />}
                    label={formatDate(event.date)}
                    size="medium"
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      px: 1,
                      py: 2,

                      "& .MuiChip-icon": {
                        color: "#fff",
                      },
                    }}
                  />
                  <Chip
                    icon={<LocationOnIcon />}
                    label={event.location}
                    size="medium"
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      px: 1.5,
                      py: 2,
                      "& .MuiChip-icon": {
                        color: "#fff",
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ mt: 1 }}
                  dangerouslySetInnerHTML={{
                    __html:
                      isExpanded || !descriptionNeedsTruncation
                        ? event.description
                        : `${event.description.substring(0, 200)}...`,
                  }}
                />
              </Box>
              {descriptionNeedsTruncation && ( // Show button only if text is long
                <Box sx={{ mt: 1, textAlign: "left" }}>
                  {" "}
                  {/* Button wrapper */}
                  <Button
                    size="small"
                    onClick={() =>
                      setExpandedEventId(isExpanded ? null : event.id)
                    }
                    sx={{
                      py: 0.5, // Keep vertical padding
                      px: 1, // Keep horizontal padding
                      textTransform: "none",
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      lineHeight: 1.4,
                      minWidth: "auto",
                      display: "inline-flex",
                      verticalAlign: "baseline",
                      mt: 1,
                      "&:hover": {
                        backgroundColor: "action.hover",
                        borderColor: "text.primary",
                      },
                    }}
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
