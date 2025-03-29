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
// Import illustrations
import illustration1 from "../../assets/illustration1.png";
import illustration2 from "../../assets/illustration2.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <Container
      maxWidth={false}
      disableGutters
      sx={{ minHeight: "100vh", display: "flex" }}
    >
      <Grid
        container
        sx={{ flexGrow: 1 }}
        alignItems="center"
        justifyContent="center"
      >
        {/* Layout for medium screens and up (3 columns) */}
        {isMdUp ? (
          <>
            {/* Left Column: Illustration 1 */}
            <Grid
              item
              md={4} // Adjusted column size (e.g., 4/12)
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                height: "100vh", // Ensure column takes full height
              }}
            >
              <Box
                component="img"
                src={illustration1}
                alt="Illustration 1"
                sx={{
                  maxWidth: "60%", // Reduced size
                  maxHeight: "60%", // Reduced size
                  height: "auto",
                  width: "auto",
                }}
              />
            </Grid>

            {/* Middle Column: Login Form */}
            <Grid
              item
              xs={12} // Fallback for smaller screens if needed, but handled below
              md={4} // Adjusted column size (e.g., 4/12)
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Paper
                elevation={0} // No shadow needed in 3-col layout
                sx={{
                  p: 4,
                  width: "100%",
                  maxWidth: 400, // Limit form width
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                }}
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
                  <Alert severity="error" sx={{ mb: 2 }}>
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
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Přihlásit se"}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Right Column: Illustration 2 */}
            <Grid
              item
              md={4} // Adjusted column size (e.g., 4/12)
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                height: "100vh", // Ensure column takes full height
              }}
            >
              <Box
                component="img"
                src={illustration2}
                alt="Illustration 2"
                sx={{
                  maxWidth: "60%", // Reduced size
                  maxHeight: "60%", // Reduced size
                  height: "auto",
                  width: "auto",
                }}
              />
            </Grid>
          </>
        ) : (
          // Layout for small screens (single column, form only)
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
            }}
          >
            <Paper
              elevation={3} // Add shadow back for stacked view
              sx={{
                p: 4,
                width: "100%",
                maxWidth: 400, // Limit form width
              }}
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
                <Alert severity="error" sx={{ mb: 2 }}>
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
                  sx={{ mt: 3, mb: 2 }}
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
