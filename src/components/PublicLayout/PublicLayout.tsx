import { ReactNode } from "react";
// Removed duplicate import
import { AppBar, Box, useTheme } from "@mui/material"; // Import Box and useTheme
import MainToolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer"; // Import the Footer component
// Paw images are now used in PawBackground component
import PawBackground from "../PawBackground/PawBackground"; // Import the new component

interface PublicLayoutProps {
  children: ReactNode;
  // Removed language and setLanguage props
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const theme = useTheme(); // Get the current theme

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative", // For PawBackground positioning
        // Apply background color here for the overlay effect
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(33, 33, 33, 0.97)"
            : "rgba(255, 255, 255, 0.95)",
        zIndex: 0, // Ensure content is above background if needed elsewhere
      }}
    >
      <PawBackground /> {/* Background component covers the whole Box */}
      <AppBar position="static" color="primary" sx={{ zIndex: 1 }}>
        {" "}
        {/* Ensure AppBar is above background */}
        {/* MainToolbar now gets language from context internally */}
        <MainToolbar />
      </AppBar>
      <Box
        component="main" // Use main semantic tag
        sx={{
          flexGrow: 1, // Allow this Box to grow and fill space
          // mb: 8, // Margin for footer can be applied here or to footer
          position: "relative", // Ensure content is layered above background
          zIndex: 1,
          // Remove background styles from here
        }}
      >
        {children}
      </Box>
      {/* Wrap Footer in a Box to apply sx prop */}
      <Box component="footer" sx={{ zIndex: 1, mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default PublicLayout;
