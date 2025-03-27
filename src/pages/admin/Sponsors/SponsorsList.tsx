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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllDocuments, deleteDocument } from "../../../services/firestore";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";

interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  link: string;
  description: string;
}

const SponsorsList = () => {
  const navigate = useNavigate();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sponsorToDelete, setSponsorToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const sponsorsData = await getAllDocuments<Sponsor>("sponsors");
      setSponsors(sponsorsData);
      setError("");
    } catch (err) {
      console.error("Error fetching sponsors:", err);
      setError("Nepodařilo se načíst sponzory. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSponsor = () => {
    navigate("/admin/sponsors/add");
  };

  const handleEditSponsor = (id: string) => {
    navigate(`/admin/sponsors/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setSponsorToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!sponsorToDelete) return;

    try {
      await deleteDocument("sponsors", sponsorToDelete);
      setSponsors((prevSponsors) =>
        prevSponsors.filter((sponsor) => sponsor.id !== sponsorToDelete)
      );
      setDeleteDialogOpen(false);
      setSponsorToDelete(null);
    } catch (err) {
      console.error("Error deleting sponsor:", err);
      setError("Nepodařilo se smazat sponzora. Zkuste to prosím znovu.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSponsorToDelete(null);
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
        <Typography variant="h4">Sponzoři</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSponsor}
        >
          Přidat sponzora
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
      ) : sponsors.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">
            Zatím nejsou přidáni žádní sponzoři.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Název</TableCell>
                <TableCell>Odkaz</TableCell>
                <TableCell>Akce</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sponsors.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell>
                    {sponsor.logoUrl ? (
                      <Box
                        component="img"
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        sx={{
                          maxWidth: "100px",
                          maxHeight: "50px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      "Bez loga"
                    )}
                  </TableCell>
                  <TableCell>{sponsor.name}</TableCell>
                  <TableCell>
                    {sponsor.link ? (
                      <a
                        href={sponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sponsor.link}
                      </a>
                    ) : (
                      "Bez odkazu"
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditSponsor(sponsor.id)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(sponsor.id)}
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
        title="Smazat sponzora"
        message="Opravdu chcete smazat tohoto sponzora? Tato akce je nevratná."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default SponsorsList;
