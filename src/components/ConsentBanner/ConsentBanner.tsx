import React from "react";
import { Paper, Typography, Button, Link } from "@mui/material"; // Removed Box
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
// Import styles later if needed: import * as styles from './ConsentBanner.styles';

interface ConsentBannerProps {
  onAccept: () => void;
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({ onAccept }) => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        zIndex: (theme) => theme.zIndex.snackbar, // Ensure it's above most content
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap", // Allow wrapping on small screens
        gap: 2, // Add gap between items
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        // Consider adding background color based on theme mode if needed
        // backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography variant="body2" sx={{ flexGrow: 1, minWidth: "200px" }}>
        {t(
          "consentBanner.notice",
          "Tento web používá nezbytné technické úložiště pro zajištění funkčnosti a bezpečnosti."
        )}{" "}
        <Link
          component={RouterLink}
          to="/zasady-ochrany-osobnich-udaju"
          sx={{ whiteSpace: "nowrap" }}
        >
          {t("consentBanner.privacyPolicyLink", "Více informací")}
        </Link>
        .
      </Typography>
      <Button
        variant="contained"
        size="small"
        onClick={onAccept}
        sx={{ flexShrink: 0 }} // Prevent button from shrinking too much
      >
        {t("consentBanner.acceptButton", "Rozumím")}
      </Button>
    </Paper>
  );
};

export default ConsentBanner;
