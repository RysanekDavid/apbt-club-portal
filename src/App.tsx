import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import theme from "./styles/theme";
import PublicLayout from "./components/PublicLayout/PublicLayout";
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

// Admin components
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import { AdminLogin, AdminDashboard, NewsList, NewsForm } from "./pages/admin";

function App() {
  const [language, setLanguage] = useState("cs");
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="news" element={<NewsList />} />
                <Route path="news/add" element={<NewsForm />} />
                <Route path="news/edit/:id" element={<NewsForm />} />
                {/* Other admin routes will be added here */}
              </Route>
            </Route>

            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/historie"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <HistoryPage />
                </PublicLayout>
              }
            />
            <Route
              path="/dokumenty"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <DocumentsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/akce"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <EventsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/galerie"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <GalleryPage />
                </PublicLayout>
              }
            />
            <Route
              path="/sponzori"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <SponsorsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/kontakt"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <ContactPage />
                </PublicLayout>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
