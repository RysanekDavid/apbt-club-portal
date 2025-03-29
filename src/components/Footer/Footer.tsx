import React, { useState, useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";
import { StyledFooter } from "./Footer.styles";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  // Revert initial state back to false
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const toggleVisibility = () => {
    // Use documentElement.scrollTop and lower threshold
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 50) {
      // Lowered threshold to 50px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <StyledFooter isVisible={isVisible}>
      <Box sx={{ textAlign: "center", py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {t("footer.copyright", { year: new Date().getFullYear() })}
          {" made with ❤️ by "}
          <Link
            color="inherit"
            href="https://www.klub-apbt.cz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("footer.teamName")}
          </Link>
        </Typography>
      </Box>
    </StyledFooter>
  );
};

export default Footer;
