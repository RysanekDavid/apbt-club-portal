import { ReactNode } from "react";
// Removed duplicate import
import { AppBar, Box, useTheme } from "@mui/material"; // Import Box and useTheme
import MainToolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer"; // Import the Footer component
import PawBackground from "../PawBackground/PawBackground"; // Import the new component
import * as styles from "./PublicLayout.styles"; // Import styles

interface PublicLayoutProps {
  children: ReactNode;
  // Removed language and setLanguage props
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const theme = useTheme(); // Get the current theme

  return (
    <Box
      sx={{
        ...styles.rootBox,
        // Keep theme-dependent background color inline
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(33, 33, 33, 0.97)"
            : "rgba(255, 255, 255, 0.95)",
      }}
    >
      <PawBackground /> {/* Background component covers the whole Box */}
      <AppBar position="static" color="primary" sx={styles.appBar}>
        {/* MainToolbar now gets language from context internally */}
        <MainToolbar />
      </AppBar>
      <Box component="main" sx={styles.mainContent}>
        {children}
      </Box>
      {/* Wrap Footer in a Box to apply sx prop */}
      <Box component="footer" sx={styles.footerBox}>
        <Footer />
      </Box>
    </Box>
  );
};

export default PublicLayout;
