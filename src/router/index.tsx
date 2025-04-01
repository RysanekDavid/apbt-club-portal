import React, { Suspense, lazy } from "react"; // Import Suspense and lazy
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout/PublicLayout";
import { Box, CircularProgress } from "@mui/material"; // For loading indicator

// Lazy load page components
const HomePage = lazy(() => import("../pages/Home"));
const HistoryPage = lazy(() => import("../pages/History"));
const DocumentsPage = lazy(() => import("../pages/Documents"));
const EventsPage = lazy(() => import("../pages/Events"));
const GalleryPage = lazy(() => import("../pages/Gallery"));
const SponsorsPage = lazy(() => import("../pages/Sponsors"));
const ContactPage = lazy(() => import("../pages/Contact"));

// Lazy load Admin components
const ProtectedRoute = lazy(
  () => import("../components/ProtectedRoute/ProtectedRoute")
);
const AdminLayout = lazy(() => import("../components/AdminLayout/AdminLayout"));
const AdminLogin = lazy(() => import("../pages/admin/Login"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const EventsList = lazy(() => import("../pages/admin/Events/EventsList"));
const EventForm = lazy(() => import("../pages/admin/Events/EventForm"));
const SponsorsList = lazy(() => import("../pages/admin/Sponsors/SponsorsList"));
const SponsorForm = lazy(() => import("../pages/admin/Sponsors/SponsorForm"));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="calc(100vh - 64px)" // Adjust height based on your AppBar
  >
    <CircularProgress />
  </Box>
);

// Simplified Wrapper for Public Routes, just applying the layout
const PublicRoutesWrapper = ({ children }: { children: React.ReactNode }) => {
  return <PublicLayout>{children}</PublicLayout>;
};

const AppRouter = () => {
  return (
    // Wrap all routes in Suspense
    <Suspense fallback={<LoadingFallback />}>
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
            <Route
              path="documents"
              element={<Navigate to="/admin" replace />}
            />
          </Route>{" "}
          {/* This closes <Route element={<AdminLayout />}> */}
        </Route>{" "}
        {/* This closes <Route path="/admin" element={<ProtectedRoute />}> */}
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
    </Suspense> // Close Suspense wrapper
  );
};

export default AppRouter;
