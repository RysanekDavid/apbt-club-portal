import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home";
import HistoryPage from "./pages/History";
import DocumentsPage from "./pages/Documents";
import "./App.css";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            APBT Klub
          </Typography>
          <nav>
            <Link to="/" style={{ color: "white", marginRight: 16 }}>
              Domů
            </Link>
            <Link to="/historie" style={{ color: "white", marginRight: 16 }}>
              Historie
            </Link>
            <Link to="/dokumenty" style={{ color: "white" }}>
              Dokumenty
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/historie" element={<HistoryPage />} />
          <Route path="/dokumenty" element={<DocumentsPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
