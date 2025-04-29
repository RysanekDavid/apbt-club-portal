import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import CustomInfoSnackbar from "./components/Snackbar/CustomInfoSnackbar";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import "./i18n";
import "leaflet/dist/leaflet.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      {/* Add HelmetProvider here */}
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={3}
          Components={{
            info: CustomInfoSnackbar,
          }}
        >
          <LanguageProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LanguageProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>{" "}
    {/* Close HelmetProvider here */}
  </React.StrictMode>
);
