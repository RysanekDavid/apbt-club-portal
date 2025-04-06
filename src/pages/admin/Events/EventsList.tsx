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
import * as styles from "./EventsList.styles"; // Import styles
import { useTranslation } from "react-i18next";

const EventsList = () => {
  const { t } = useTranslation();
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
      setError(t("admin.eventsList.fetchError"));
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
      setError(t("admin.eventsList.deleteError"));
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
      <Box sx={styles.headerBox}>
        <Typography variant="h4">{t("admin.eventsList.title")}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEvent}
        >
          {t("admin.eventsList.addButton")}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : events.length === 0 ? (
        <Paper sx={styles.noDataPaper}>
          <Typography variant="body1">
            {t("admin.eventsList.noData")}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("admin.eventsList.tableName")}</TableCell>
                <TableCell>{t("admin.eventsList.tableDate")}</TableCell>
                <TableCell>{t("admin.eventsList.tableLocation")}</TableCell>
                <TableCell>{t("admin.eventsList.tableStatus")}</TableCell>
                <TableCell>{t("admin.eventsList.tableActions")}</TableCell>
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
                      label={
                        event.published
                          ? t("admin.eventsList.statusPublished")
                          : t("admin.eventsList.statusDraft")
                      }
                      color={event.published ? "success" : "default"}
                      size="small"
                    />
                    {event.isPast && (
                      <Chip
                        label={t("admin.eventsList.statusPast")}
                        color="primary"
                        size="small"
                        sx={styles.pastEventChip}
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
        title={t("admin.eventsList.deleteDialogTitle")}
        message={t("admin.eventsList.deleteDialogMessage")}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default EventsList;
