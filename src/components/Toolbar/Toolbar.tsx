import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"; // Import Admin icon
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink for IconButton
import { IconButton } from "@mui/material"; // Import IconButton
import logoSvg from "../../assets/logo.svg";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import {
  Root,
  LogoContainer,
  LogoLink,
  // LogoText removed as it's no longer used
  DesktopNav,
  NavLinkStyled,
  MobileMenuContainer,
  MenuButton,
  MobileNav,
  RightSection, // Import the new RightSection
} from "./Toolbar.styles";
import LanguageSelector from "./LanguageSelector/LanguageSelector";

export default function MainToolbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { currentUser } = useAuth(); // Get current user from auth context

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleMenuClose = () => setMenuOpen(false);

  const navItems = [
    { path: "/", label: t("toolbar.home") },
    { path: "/historie", label: t("toolbar.history") },
    { path: "/dokumenty", label: t("toolbar.documents") },
    { path: "/akce", label: t("toolbar.events") },
    { path: "/galerie", label: t("toolbar.gallery") },
    { path: "/sponzori", label: t("toolbar.sponsors") },
    { path: "/kontakt", label: t("toolbar.contact") },
  ];

  return (
    <Root>
      <LogoContainer>
        <LogoLink to="/">
          {/* Replace LogoText and Typography with the img tag */}
          <img src={logoSvg} alt="Klub APBT Logo" />
        </LogoLink>
      </LogoContainer>

      <DesktopNav>
        {navItems.map((item) => (
          <NavLinkStyled key={item.path} to={item.path}>
            {item.label}
          </NavLinkStyled>
        ))}
      </DesktopNav>

      {/* Wrap LanguageSelector, Admin Icon (if logged in), and MobileMenuContainer in RightSection */}
      <RightSection>
        <LanguageSelector />
        {currentUser && (
          // Wrap IconButton in RouterLink instead of using component prop
          <RouterLink
            to="/admin" // Corrected path to admin root
            style={{ textDecoration: "none", color: "inherit" }} // Prevent default link styles
          >
            <IconButton
              color="inherit"
              aria-label="Admin Dashboard"
              title="Admin Dashboard" // Tooltip for accessibility
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          </RouterLink>
        )}
        <MobileMenuContainer>
          <MenuButton
            aria-label="menu"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </MenuButton>
          {menuOpen && (
            <MobileNav id="mobile-menu">
              {navItems.map((item) => (
                <NavLinkStyled
                  key={item.path}
                  to={item.path}
                  onClick={handleMenuClose}
                >
                  {item.label}
                </NavLinkStyled>
              ))}
            </MobileNav>
          )}
        </MobileMenuContainer>
      </RightSection>
    </Root>
  );
}
