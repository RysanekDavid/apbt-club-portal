import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout/PublicLayout";
import HomePage from "../pages/Home";
import HistoryPage from "../pages/History";
import DocumentsPage from "../pages/Documents";
import EventsPage from "../pages/Events";
import GalleryPage from "../pages/Gallery";
import SponsorsPage from "../pages/Sponsors";
import ContactPage from "../pages/Contact";
// Removed i18n import as it's handled in context now

// Admin components
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import {
  AdminLogin,
  AdminDashboard,
  EventsList,
  EventForm,
  SponsorsList,
  SponsorForm,
} from "../pages/admin";

// Simplified Wrapper for Public Routes, just applying the layout
const PublicRoutesWrapper = ({ children }: { children: React.ReactNode }) => {
  return <PublicLayout>{children}</PublicLayout>;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          {/* Events routes */}
          <Route path="events" element={<EventsList />} />
          <Route path="events/add" element={<EventForm />} />
          <Route path="events/edit/:id" element={<EventForm />} />

          {/* Gallery routes - Redirecting to admin dashboard for now */}
          <Route path="gallery" element={<Navigate to="/admin" replace />} />

          {/* Sponsors routes */}
          <Route path="sponsors" element={<SponsorsList />} />
          <Route path="sponsors/add" element={<SponsorForm />} />
          <Route path="sponsors/edit/:id" element={<SponsorForm />} />

          {/* Documents routes - Redirecting to admin dashboard for now */}
          <Route path="documents" element={<Navigate to="/admin" replace />} />
        </Route>
      </Route>

      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoutesWrapper>
            <HomePage />
          </PublicRoutesWrapper>
        }
      />
      <Route
        path="/historie"
        element={
          <PublicRoutesWrapper>
            <HistoryPage />
          </PublicRoutesWrapper>
        }
      />
      <Route
        path="/dokumenty"
        element={
          <PublicRoutesWrapper>
            <DocumentsPage />
          </PublicRoutesWrapper>
        }
      />
      <Route
        path="/akce"
        element={
          <PublicRoutesWrapper>
            <EventsPage />
          </PublicRoutesWrapper>
        }
      />
      <Route
        path="/galerie"
        element={
          <PublicRoutesWrapper>
            <GalleryPage />
          </PublicRoutesWrapper>
        }
      />
      <Route
        path="/sponzori"
        element={
          <PublicRoutesWrapper>
            <SponsorsPage />
          </PublicRoutesWrapper>
        }
      />
      <Route
        path="/kontakt"
        element={
          <PublicRoutesWrapper>
            <ContactPage />
          </PublicRoutesWrapper>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
