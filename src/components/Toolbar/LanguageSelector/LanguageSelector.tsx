import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { GbFlag, CzFlag } from "../../../components/flags";
import i18n from "../../../i18n";
import {
  Container,
  LanguageItemContent,
  FlagContainer,
} from "./LanguageSelector.styles";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageSelector = ({ language, setLanguage }: LanguageSelectorProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
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
      <IconButton
        aria-label="language selector"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="secondary"
      >
        <TranslateIcon />
        <Typography variant="body2" sx={{ ml: 1 }}>
          {currentLanguage?.label}
        </Typography>
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
        PaperProps={{
          sx: {
            bgcolor: "primary.main",
            color: "secondary.main",
          },
        }}
      >
        {languages.map((lng) => (
          <MenuItem
            key={lng.code}
            onClick={() => handleLanguageChange(lng.code)}
            selected={language === lng.code}
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
