import { AppBar, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import theme from "./styles/theme";
import MainToolbar from "./components/Toolbar/Toolbar";
import HomePage from "./pages/Home";
import HistoryPage from "./pages/History";
import DocumentsPage from "./pages/Documents";
import EventsPage from "./pages/Events";
import GalleryPage from "./pages/Gallery";
import SponsorsPage from "./pages/Sponsors";
import ContactPage from "./pages/Contact";
import "./App.css";
import { useState } from "react";
import i18n from "./i18n";

function App() {
  const [language, setLanguage] = useState("cs");
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <MainToolbar
            language={language}
            setLanguage={(lang: string) => {
              setLanguage(lang);
              i18n.changeLanguage(lang);
            }}
          />
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/historie" element={<HistoryPage />} />
            <Route path="/dokumenty" element={<DocumentsPage />} />
            <Route path="/akce" element={<EventsPage />} />
            <Route path="/galerie" element={<GalleryPage />} />
            <Route path="/sponzori" element={<SponsorsPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
