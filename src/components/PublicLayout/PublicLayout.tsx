import { ReactNode } from "react";
import { AppBar, Box } from "@mui/material"; // Import Box instead of Container
import MainToolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer"; // Import the Footer component
// Removed unused useLanguage import

interface PublicLayoutProps {
  children: ReactNode;
  // Removed language and setLanguage props
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  // Removed unused useLanguage hook call

  return (
    <>
      <AppBar position="static" color="primary">
        {/* MainToolbar now gets language from context internally */}
        <MainToolbar />
      </AppBar>
      {/* Removed Container wrapper - pages now manage their own width */}
      <Box sx={{ mb: 8 }}>
        {" "}
        {/* Use Box for margin instead of Container */}
        {children}
      </Box>
      <Footer /> {/* Render the Footer component */}
    </>
  );
};

export default PublicLayout;
