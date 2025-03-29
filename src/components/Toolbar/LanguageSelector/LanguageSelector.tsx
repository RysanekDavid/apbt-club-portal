import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material"; // Changed IconButton to Button, added Box
// import TranslateIcon from "@mui/icons-material/Translate"; // Removed TranslateIcon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Added dropdown arrow
import { GbFlag, CzFlag } from "../../../components/flags";
// Removed i18n import, context handles it
import { useLanguage } from "../../../contexts/LanguageContext"; // Import the hook
import {
  Container,
  LanguageItemContent,
  FlagContainer,
} from "./LanguageSelector.styles";

// Removed LanguageSelectorProps interface and props
const LanguageSelector = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage(); // Get state from context
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode); // Use context's setLanguage
    // i18n.changeLanguage is now handled within the context's setLanguage function
    handleClose();
  };

  const languages = [
    {
      code: "en",
      label: t("language.english"),
      flag: <GbFlag />,
    },
    {
      code: "cs",
      label: t("language.czech"),
      flag: <CzFlag />,
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <Container>
      {/* Changed IconButton to Button for better text/icon combination */}
      <Button
        aria-label="language selector"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit" // Inherit color (white) from Toolbar
        sx={{ textTransform: "none", ml: 1 }} // Prevent uppercase, add margin
        endIcon={<KeyboardArrowDownIcon />} // Add dropdown arrow
      >
        {/* Display flag and language code */}
        {currentLanguage?.flag && (
          <Box
            component="span"
            sx={{
              width: 20,
              height: 15,
              mr: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {currentLanguage.flag}
          </Box>
        )}
        <Typography variant="button" sx={{ color: "inherit" }}>
          {currentLanguage?.code.toUpperCase()}
        </Typography>
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
        PaperProps={{
          sx: {
            // Use theme-aware colors
            bgcolor: "background.paper",
            color: "text.primary",
            mt: 1, // Add margin top
            boxShadow: 3, // Add shadow
          },
        }}
      >
        {languages.map((lng) => (
          <MenuItem
            key={lng.code}
            onClick={() => handleLanguageChange(lng.code)}
            selected={language === lng.code}
            sx={{
              // Add hover effect consistent with theme
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "&.Mui-selected": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selected", // Keep selected color on hover
                },
              },
            }}
          >
            <LanguageItemContent>
              <FlagContainer>{lng.flag}</FlagContainer>
              {lng.label}
            </LanguageItemContent>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default LanguageSelector;
