import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./contexts/LanguageContext"; // Import the provider
import "./i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      {" "}
      {/* Wrap App with the provider */}
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
