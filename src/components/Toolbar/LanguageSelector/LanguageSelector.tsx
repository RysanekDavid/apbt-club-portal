import { useState } from "react";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { GbFlag, CzFlag } from "../../../components/flags";
import { useLanguage } from "../../../contexts/LanguageContext";
import {
  Container,
  LanguageItemContent,
  FlagContainer,
  LanguageButton,
  ButtonFlagBox,
  ButtonTypography,
  StyledMenu,
  StyledMenuItem,
} from "./LanguageSelector.styles";

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
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
      <LanguageButton
        aria-label="language selector"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {currentLanguage?.flag && (
          <ButtonFlagBox>{currentLanguage.flag}</ButtonFlagBox>
        )}
        <ButtonTypography variant="button">
          {currentLanguage?.code.toUpperCase()}
        </ButtonTypography>
      </LanguageButton>
      <StyledMenu
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
      >
        {languages.map((lng) => (
          <StyledMenuItem
            key={lng.code}
            onClick={() => handleLanguageChange(lng.code)}
            selected={language === lng.code}
          >
            <LanguageItemContent>
              <FlagContainer>{lng.flag}</FlagContainer>
              {lng.label}
            </LanguageItemContent>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </Container>
  );
};

export default LanguageSelector;
