import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../../styles/navigationStyles.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Root, LogoLink } from "./Toolbar.styles";
import LanguageSelector from "./LanguageSelector/LanguageSelector";

interface ToolbarProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export default function MainToolbar({ language, setLanguage }: ToolbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Root>
      <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <LogoLink to="/">
          <div className={styles.logo}>M</div>
          <Typography variant="h6" component="div">
            Klub APBT
          </Typography>
        </LogoLink>
      </div>

      <nav className={styles.desktopNav}>
        <Link to="/" className={styles.navLink}>
          {t("toolbar.home")}
        </Link>
        <Link to="/historie" className={styles.navLink}>
          {t("toolbar.history")}
        </Link>
        <Link to="/dokumenty" className={styles.navLink}>
          {t("toolbar.documents")}
        </Link>
        <Link to="/akce" className={styles.navLink}>
          {t("toolbar.events")}
        </Link>
        <Link to="/galerie" className={styles.navLink}>
          {t("toolbar.gallery")}
        </Link>
        <Link to="/sponzori" className={styles.navLink}>
          {t("toolbar.sponsors")}
        </Link>
        <Link to="/kontakt" className={styles.navLink}>
          {t("toolbar.contact")}
        </Link>
      </nav>

      <LanguageSelector language={language} setLanguage={setLanguage} />

      <div className={styles.mobileMenu}>
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        {menuOpen && (
          <div className={styles.mobileNav}>
            <Link
              to="/"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Domů
            </Link>
            <Link
              to="/historie"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Historie
            </Link>
            <Link
              to="/dokumenty"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Dokumenty
            </Link>
            <Link
              to="/akce"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Akce
            </Link>
            <Link
              to="/galerie"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Galerie
            </Link>
            <Link
              to="/sponzori"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Sponzoři
            </Link>
            <Link
              to="/kontakt"
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              Kontakt
            </Link>
          </div>
        )}
      </div>
    </Root>
  );
}
