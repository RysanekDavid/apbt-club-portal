// Removed ThemeProvider and CssBaseline imports from @mui/material
import { BrowserRouter } from "react-router-dom";
// Removed theme import
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
        {/* Removed ThemeProvider and CssBaseline wrapper */}
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
