import { ReactNode } from "react";
import { AppBar, Container } from "@mui/material";
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {" "}
        {/* Add bottom margin to prevent content overlap */}
        {children}
      </Container>
      <Footer /> {/* Render the Footer component */}
    </>
  );
};

export default PublicLayout;
