import React, { useState, useEffect } from "react";
import { Typography, Link } from "@mui/material"; // Removed Box import
// Removed RouterLink import
import { StyledFooter, CopyrightBox } from "./Footer.styles"; // Import CopyrightBox
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
      {/* Use CopyrightBox */}
      <CopyrightBox>
        <Typography variant="body2" color="text.secondary">
          {t("footer.copyright", { year: new Date().getFullYear() })}
          {" made with ❤️ by "}
          {/* Link the first part */}
          <Link
            color="inherit"
            href="https://www.klub-apbt.cz/" // Link for the club name
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Get the part before the last word */}
            {t("footer.teamName").substring(
              0,
              t("footer.teamName").lastIndexOf(" ")
            )}
          </Link>
          {/* Add space and the last word ("team") as plain text */}{" "}
          {t("footer.teamName").substring(
            t("footer.teamName").lastIndexOf(" ") + 1
          )}
        </Typography>
      </CopyrightBox>
    </StyledFooter>
  );
};

export default Footer;
