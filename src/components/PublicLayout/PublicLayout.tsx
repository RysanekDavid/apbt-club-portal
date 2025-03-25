import { ReactNode } from "react";
import { AppBar, Container } from "@mui/material";
import MainToolbar from "../Toolbar/Toolbar";

interface PublicLayoutProps {
  children: ReactNode;
  language: string;
  setLanguage: (lang: string) => void;
}

const PublicLayout = ({
  children,
  language,
  setLanguage,
}: PublicLayoutProps) => {
  return (
    <>
      <AppBar position="static" color="primary">
        <MainToolbar language={language} setLanguage={setLanguage} />
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default PublicLayout;
