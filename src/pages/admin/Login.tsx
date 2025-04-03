import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Grid, // Import Grid
  useTheme, // Import useTheme for accessing theme properties
  useMediaQuery, // Import useMediaQuery for responsive design
} from "@mui/material";
import illustration1 from "../../assets/illustration1.png";
import illustration2 from "../../assets/illustration2.png";
import * as styles from "./Login.styles"; // Import styles

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isImage1Loaded, setIsImage1Loaded] = useState(false); // State for image 1 load status
  const [isImage2Loaded, setIsImage2Loaded] = useState(false); // State for image 2 load status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginWithEmail, currentUser } = useAuth(); // Removed loginWithGoogle
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // Check if screen is medium or larger

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/admin"); // Redirect to admin root if logged in
    }
  }, [currentUser, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await loginWithEmail(email, password);
      // Successful login will trigger currentUser change and useEffect redirect
    } catch (err: any) {
      // Use the error message from AuthContext if available, otherwise use a generic one
      setError(
        err?.message || "Nesprávné přihlašovací údaje. Zkuste to znovu."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={styles.rootContainer}>
      <Grid
        container
        sx={styles.gridContainer}
        alignItems="center"
        justifyContent="center"
      >
        {/* Layout for medium screens and up (3 columns) */}
        {isMdUp ? (
          <>
            {/* Left Column: Illustration 1 */}
            <Grid item md={4} sx={styles.illustrationColumn}>
              <Box
                component="img"
                src={illustration1}
                onLoad={() => setIsImage1Loaded(true)} // Add onLoad handler
                alt="Illustration 1"
                sx={styles.illustrationImage}
              />
            </Grid>

            {/* Middle Column: Login Form */}
            <Grid item xs={12} md={4} sx={styles.formColumn}>
              <Paper
                elevation={0} // No shadow needed in 3-col layout
                sx={styles.formPaperMd(theme, isImage1Loaded, isImage2Loaded)}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  gutterBottom
                >
                  Přihlášení do administrace
                </Typography>

                {error && (
                  <Alert severity="error" sx={styles.errorAlert}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleEmailLogin} noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mailová adresa"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Heslo"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Přihlásit se"}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Right Column: Illustration 2 */}
            <Grid item md={4} sx={styles.illustrationColumn}>
              <Box
                component="img"
                src={illustration2}
                onLoad={() => setIsImage2Loaded(true)} // Add onLoad handler
                alt="Illustration 2"
                sx={styles.illustrationImage}
              />
            </Grid>
          </>
        ) : (
          // Layout for small screens (single column, form only)
          <Grid item xs={12} sx={styles.formColumn}>
            <Paper elevation={3} sx={styles.formPaperSm}>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                gutterBottom
              >
                Přihlášení do administrace
              </Typography>

              {error && (
                <Alert severity="error" sx={styles.errorAlert}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleEmailLogin} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mailová adresa"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Heslo"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Přihlásit se"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AdminLogin;
