import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import logoSvg from "../../assets/logo.svg";
import logoInvertedSvg from "../../assets/logo_inverted.svg";
import { useAuth } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import {
  Root,
  LogoContainer,
  LogoLink,
  DesktopNav,
  NavLinkStyled,
  MobileMenuContainer,
  MenuButton,
  RightSection,
  ThemeToggleButton,
  StyledDrawer,
  DrawerContentBox,
} from "./Toolbar.styles";
import LanguageSelector from "./LanguageSelector/LanguageSelector";

export default function MainToolbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { mode, toggleTheme } = useThemeContext();

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleMenuClose = () => setMenuOpen(false);

  const currentLogo = mode === "light" ? logoSvg : logoInvertedSvg;

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
          <img src={currentLogo} alt="Klub APBT Logo" />
        </LogoLink>
      </LogoContainer>

      <DesktopNav>
        {navItems.map((item) => (
          <NavLinkStyled key={item.path} to={item.path}>
            {item.label}
          </NavLinkStyled>
        ))}
      </DesktopNav>

      <RightSection>
        <LanguageSelector />
        <ThemeToggleButton
          onClick={toggleTheme}
          color="inherit"
          aria-label={
            mode === "dark"
              ? t("toolbar.switchToLight")
              : t("toolbar.switchToDark")
          }
          title={
            mode === "dark"
              ? t("toolbar.switchToLight")
              : t("toolbar.switchToDark")
          }
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </ThemeToggleButton>
        {/* <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          inputProps={{ 'aria-label': 'toggle theme' }}
        /> */}
        {currentUser && (
          <RouterLink
            to="/admin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton
              color="inherit"
              aria-label={t("toolbar.adminDashboardLabel")}
              title={t("toolbar.adminDashboardLabel")}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          </RouterLink>
        )}
        <MobileMenuContainer>
          <MenuButton
            aria-label={t("toolbar.menuLabel")}
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </MenuButton>
          <StyledDrawer
            anchor="right"
            open={menuOpen}
            onClose={handleMenuClose}
            ModalProps={{ keepMounted: true }}
          >
            <DrawerContentBox
              role="presentation"
              onClick={handleMenuClose}
              onKeyDown={handleMenuClose}
            >
              <List>
                {navItems.map((item) => (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton component={NavLinkStyled} to={item.path}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </DrawerContentBox>
          </StyledDrawer>
        </MobileMenuContainer>
      </RightSection>
    </Root>
  );
}
