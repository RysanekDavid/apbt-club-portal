import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllDocuments, deleteDocument } from "../../../services/firestore";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { Event } from "../../../types/models";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await getAllDocuments<Event>("events", "date");
      setEvents(eventsData);
      setError("");
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Nepodařilo se načíst akce. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    navigate("/admin/events/add");
  };

  const handleEditEvent = (id: string) => {
    navigate(`/admin/events/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    try {
      await deleteDocument("events", eventToDelete);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventToDelete)
      );
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Nepodařilo se smazat akci. Zkuste to prosím znovu.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const formatDate = (date: Date) => {
    return format(date, "d. MMMM yyyy", { locale: cs });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Akce / Závody</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEvent}
        >
          Přidat akci
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : events.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">
            Zatím nejsou přidány žádné akce.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Název</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Místo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Akce</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={event.published ? "Publikováno" : "Koncept"}
                      color={event.published ? "success" : "default"}
                      size="small"
                    />
                    {event.isPast && (
                      <Chip
                        label="Proběhlé"
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditEvent(event.id)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(event.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Smazat akci"
        message="Opravdu chcete smazat tuto akci? Tato akce je nevratná."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default EventsList;
