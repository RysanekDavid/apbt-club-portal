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
import * as styles from "./SponsorsList.styles"; // Import styles
import { useTranslation } from "react-i18next";

interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
}

const SponsorsList = () => {
  const { t } = useTranslation();
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
      setError(t("admin.sponsorsList.fetchError"));
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
      setError(t("admin.sponsorsList.deleteError"));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSponsorToDelete(null);
  };

  return (
    <Box>
      <Box sx={styles.headerBox}>
        <Typography variant="h4">{t("admin.sponsorsList.title")}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSponsor}
        >
          {t("admin.sponsorsList.addButton")}
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
      ) : sponsors.length === 0 ? (
        <Paper sx={styles.noDataPaper}>
          <Typography variant="body1">
            {t("admin.sponsorsList.noData")}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t("admin.sponsorsList.tableLogo")}</TableCell>
                <TableCell>{t("admin.sponsorsList.tableName")}</TableCell>
                <TableCell>{t("admin.sponsorsList.tableLink")}</TableCell>
                <TableCell>{t("admin.sponsorsList.tableActions")}</TableCell>
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
                        sx={styles.logoImage}
                      />
                    ) : (
                      t("admin.sponsorsList.noLogo")
                    )}
                  </TableCell>
                  <TableCell>{sponsor.name}</TableCell>
                  <TableCell>
                    {sponsor.websiteUrl ? (
                      <a
                        href={sponsor.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sponsor.websiteUrl}
                      </a>
                    ) : (
                      t("admin.sponsorsList.noLink")
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
        title={t("admin.sponsorsList.deleteDialogTitle")}
        message={t("admin.sponsorsList.deleteDialogMessage")}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default SponsorsList;
