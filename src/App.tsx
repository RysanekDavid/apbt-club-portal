import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import theme from "./styles/theme";
import PublicLayout from "./components/PublicLayout/PublicLayout";
import HomePage from "./pages/Home";
import HistoryPage from "./pages/History";
import DocumentsPage from "./pages/Documents";
import EventsPage from "./pages/Events";
import NewsPage from "./pages/News";
import NewsDetailPage from "./pages/NewsDetail";
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
import {
  AdminLogin,
  AdminDashboard,
  NewsList,
  NewsForm,
  EventsList,
  EventForm,
  SponsorsList,
  SponsorForm,
} from "./pages/admin";

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

                {/* Events routes */}
                <Route path="events" element={<EventsList />} />
                <Route path="events/add" element={<EventForm />} />
                <Route path="events/edit/:id" element={<EventForm />} />

                {/* Gallery routes */}
                <Route
                  path="gallery"
                  element={<Navigate to="/admin" replace />}
                />

                {/* Sponsors routes */}
                <Route path="sponsors" element={<SponsorsList />} />
                <Route path="sponsors/add" element={<SponsorForm />} />
                <Route path="sponsors/edit/:id" element={<SponsorForm />} />

                {/* Documents routes */}
                <Route
                  path="documents"
                  element={<Navigate to="/admin" replace />}
                />
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
              path="/novinky"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <NewsPage />
                </PublicLayout>
              }
            />
            <Route
              path="/novinky/:slug"
              element={
                <PublicLayout
                  language={language}
                  setLanguage={(lang: string) => {
                    setLanguage(lang);
                    i18n.changeLanguage(lang);
                  }}
                >
                  <NewsDetailPage />
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
