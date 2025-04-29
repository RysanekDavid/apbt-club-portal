import { useState, useEffect } from "react"; // Import useState, useEffect
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./router"; // Import the new router component
import ConsentBanner from "./components/ConsentBanner/ConsentBanner"; // Import the banner

// Import i18n configuration if needed globally (e.g., for initialization)
import "./i18n";

const CONSENT_KEY = "storage_consent_accepted"; // Key for localStorage

function App() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check localStorage only after initial mount on client-side
    const consentAccepted = localStorage.getItem(CONSENT_KEY);
    if (!consentAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setShowBanner(false);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        {/* Conditionally render the banner */}
        {showBanner && <ConsentBanner onAccept={handleAcceptConsent} />}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
