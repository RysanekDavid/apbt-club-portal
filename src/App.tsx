import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import theme from "./styles/theme";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./router"; // Import the new router component

// Import i18n configuration if needed globally (e.g., for initialization)
import "./i18n";

function App() {
  // Language state is now managed within the router's PublicRoutesWrapper
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
