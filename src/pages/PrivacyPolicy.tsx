import React from "react";
import { Container, Typography, Box } from "@mui/material"; // Removed Link
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t(
            "privacyPolicy.metaTitle",
            "Zásady ochrany osobních údajů - Klub APBT"
          )}
        </title>
        <meta
          name="description"
          content={t(
            "privacyPolicy.metaDescription",
            "Informace o zpracování údajů a používání technického úložiště na webu Klubu APBT."
          )}
        />
      </Helmet>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("privacyPolicy.title", "Zásady ochrany osobních údajů")}
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {t("privacyPolicy.storageTitle", "Používání technického úložiště")}
          </Typography>
          <Typography paragraph>
            {t(
              "privacyPolicy.storageText1",
              "Tato webová stránka využívá nezbytné technické úložiště v prohlížeči návštěvníků (např. localStorage, IndexedDB) k zajištění základní funkčnosti a bezpečnosti. Konkrétně se jedná o:"
            )}
          </Typography>
          <ul>
            <li>
              <Typography component="span">
                {t(
                  "privacyPolicy.storagePoint1",
                  "Udržování stavu přihlášení administrátora webu napříč relacemi."
                )}
              </Typography>
            </li>
            <li>
              <Typography component="span">
                {t(
                  "privacyPolicy.storagePoint2",
                  "Zajištění správného fungování autentizačního systému (Firebase Authentication)."
                )}
              </Typography>
            </li>
            <li>
              <Typography component="span">
                {t(
                  "privacyPolicy.storagePoint3",
                  "Ukládání časového razítka přihlášení pro bezpečnostní účely administrátorského účtu."
                )}
              </Typography>
            </li>
          </ul>
          <Typography paragraph>
            {t(
              "privacyPolicy.storageText2",
              "Toto úložiště není využíváno ke sledování běžných návštěvníků, profilování, ani k marketingovým účelům. Slouží výhradně k technickému zabezpečení a funkčnosti administrátorského rozhraní."
            )}
          </Typography>
        </Box>

        {/* Add more sections as needed, e.g., about data processing if you collect forms */}

        <Typography variant="body2" color="text.secondary">
          {t(
            "privacyPolicy.lastUpdated",
            "Poslední aktualizace: 29. dubna 2025"
          )}
        </Typography>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
