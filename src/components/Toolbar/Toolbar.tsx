import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Dark mode icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Light mode icon
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom"; // Import NavLink and Link
import { IconButton } from "@mui/material"; // Import Switch
import logoSvg from "../../assets/logo.svg";
import logoInvertedSvg from "../../assets/logo_inverted.svg"; // Import inverted logo
import { useAuth } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext"; // Import theme context hook
import {
  Root,
  LogoContainer,
  LogoLink, // Keep LogoLink for the logo itself
  // LogoText removed as it's no longer used
  DesktopNav,
  NavLinkStyled, // This will now be based on NavLink
  MobileMenuContainer,
  MenuButton,
  MobileNav,
  RightSection, // Import the new RightSection
} from "./Toolbar.styles";
import LanguageSelector from "./LanguageSelector/LanguageSelector";

export default function MainToolbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { mode, toggleTheme } = useThemeContext(); // Get theme mode and toggle function

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleMenuClose = () => setMenuOpen(false);

  const currentLogo = mode === "light" ? logoSvg : logoInvertedSvg; // Select logo based on theme

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
          <img src={currentLogo} alt="Klub APBT Logo" />{" "}
          {/* Use dynamic logo */}
        </LogoLink>
      </LogoContainer>

      <DesktopNav>
        {navItems.map((item) => (
          // Use RouterNavLink here, styled component will handle the styling
          <NavLinkStyled key={item.path} to={item.path}>
            {item.label}
          </NavLinkStyled>
        ))}
      </DesktopNav>

      {/* Wrap LanguageSelector, Theme Switch, Admin Icon, and MobileMenuContainer in RightSection */}
      <RightSection>
        <LanguageSelector />
        {/* Theme Toggle Switch */}
        <IconButton
          sx={{ ml: 1 }}
          onClick={toggleTheme}
          color="inherit"
          aria-label={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          title={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {/* <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          inputProps={{ 'aria-label': 'toggle theme' }}
        /> */}
        {currentUser && (
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
                // Use RouterNavLink here as well
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
