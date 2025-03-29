import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Removed MuiThemeProvider import
import { SnackbarProvider } from "notistack";
// Removed lightTheme import
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import custom ThemeProvider
import CustomInfoSnackbar from "./components/Snackbar/CustomInfoSnackbar"; // Import custom component
import "./i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      {" "}
      {/* Use custom ThemeProvider */}
      <SnackbarProvider
        maxSnack={3}
        Components={{
          info: CustomInfoSnackbar, // Map 'info' variant to custom component
        }}
      >
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
