import {
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import homepageImage from "../assets/homepage_image.png";
import {
  HeroWrapper,
  HeroImage,
  HeroOverlay,
  HeroContentContainer,
  HeroTitle,
  HeroSubtitle,
  InfoPaper,
  NewsSectionContainer,
} from "./Home.styles";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HandshakeIcon from "@mui/icons-material/Handshake"; // Added Sponsor icon
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"; // Added Gallery icon
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation();

  return (
    <>
      <HeroWrapper>
        <HeroImage as="img" src={homepageImage} alt="" />
        <HeroOverlay />
        <HeroContentContainer maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={8} lg={7}>
              {/* Removed gutterBottom prop */}
              <HeroTitle variant={isMdUp ? "h2" : "h3"} as="h1" sx={{ mb: 1 }}>
                APBT Klub ČR
              </HeroTitle>
              {/* Removed gutterBottom prop */}
              <HeroSubtitle variant="h6" as="p" sx={{ mb: 2 }}>
                {t("homepage.heroSubtitle")}{" "}
              </HeroSubtitle>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/kontakt"
                sx={{ mt: 2 }}
              >
                {t("homepage.heroButton")}
              </Button>
            </Grid>
          </Grid>
        </HeroContentContainer>
      </HeroWrapper>

      <NewsSectionContainer maxWidth="lg">
        {/* Added justifyContent="center" to the Grid container */}
        <Grid container spacing={4} sx={{ mb: 4 }} justifyContent="center">
          <Grid item xs={12} md={4}>
            <InfoPaper>
              <EventIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {" "}
                {/* Removed gutterBottom, added margin */}
                {t("homepage.eventsTitle")}
              </Typography>
              <Typography variant="body2" paragraph>
                {t("homepage.eventsDesc")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/akce"
              >
                {t("homepage.eventsButton")}
              </Button>
            </InfoPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoPaper>
              <GroupIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {" "}
                {/* Removed gutterBottom, added margin */}
                {t("homepage.aboutTitle")}
              </Typography>
              <Typography variant="body2" paragraph>
                {t("homepage.aboutDesc")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/historie"
              >
                {t("homepage.aboutButton")}
              </Button>
            </InfoPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoPaper>
              <ContactMailIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {" "}
                {/* Removed gutterBottom, added margin */}
                {t("homepage.contactTitle")}
              </Typography>
              <Typography variant="body2" paragraph>
                {t("homepage.contactDesc")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/kontakt"
              >
                {t("homepage.contactButton")}
              </Button>
            </InfoPaper>
          </Grid>
          {/* Sponsor Section */}
          <Grid item xs={12} md={4}>
            <InfoPaper>
              <HandshakeIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {" "}
                {/* Removed gutterBottom, added margin */}
                {t("homepage.sponsorsTitle")}
              </Typography>
              <Typography variant="body2" paragraph>
                {t("homepage.sponsorsDesc")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/sponzori"
              >
                {t("homepage.sponsorsButton")}
              </Button>
            </InfoPaper>
          </Grid>
          {/* Gallery Section */}
          <Grid item xs={12} md={4}>
            <InfoPaper>
              <PhotoLibraryIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                {" "}
                {/* Removed gutterBottom, added margin */}
                {t("homepage.galleryTitle")}
              </Typography>
              <Typography variant="body2" paragraph>
                {t("homepage.galleryDesc")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/galerie"
              >
                {t("homepage.galleryButton")}
              </Button>
            </InfoPaper>
          </Grid>
        </Grid>
      </NewsSectionContainer>
    </>
  );
}
