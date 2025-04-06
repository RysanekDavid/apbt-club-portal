import { ReactNode } from "react";
import { AppBar, Box, useTheme } from "@mui/material";
import MainToolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer";
import PawBackground from "../PawBackground/PawBackground";
import * as styles from "./PublicLayout.styles";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const theme = useTheme();

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
      {/* Make AppBar sticky, move top style to sx */}
      <AppBar position="sticky" color="primary" sx={styles.appBar}>
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
