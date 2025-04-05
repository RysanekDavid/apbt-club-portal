import {
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Container, // Added Container
  Box, // Added Box
  Stack, // Added Stack for buttons
  Link, // Added Link for card navigation
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import homepageImage from "../assets/homepage_image.png"; // Assuming this is the correct image
import {
  HeroWrapper,
  HeroImage,
  HeroOverlay,
  HeroContentContainer,
  ExploreSectionContainer, // Renamed from NewsSectionContainer
  StyledCard, // New Card component
  StyledCardActionArea, // New CardActionArea
  IconAvatar, // New Avatar for icons
  CtaSection, // New CTA section
} from "./Home.styles";
// Updated MUI Icons to match template (Calendar, Users, Mail, Award, Image)
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Replaces EventIcon
import PeopleIcon from "@mui/icons-material/People"; // Replaces GroupIcon
import MailOutlineIcon from "@mui/icons-material/MailOutline"; // Replaces ContactMailIcon
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // Replaces HandshakeIcon (Award)
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"; // Kept Gallery icon
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation();

  // Card data structure for easier mapping
  const cardItems = [
    {
      icon: <CalendarTodayIcon />,
      titleKey: "homepage.eventsTitle",
      descKey: "homepage.eventsDesc",
      link: "/akce",
      gridSpan: { xs: 12, md: 4 },
    },
    {
      icon: <PeopleIcon />,
      titleKey: "homepage.aboutTitle",
      descKey: "homepage.aboutDesc",
      link: "/historie",
      gridSpan: { xs: 12, md: 4 },
    },
    {
      icon: <MailOutlineIcon />,
      titleKey: "homepage.contactTitle",
      descKey: "homepage.contactDesc",
      link: "/kontakt",
      gridSpan: { xs: 12, md: 4 },
    },
    {
      icon: <EmojiEventsIcon />,
      titleKey: "homepage.sponsorsTitle",
      descKey: "homepage.sponsorsDesc",
      link: "/sponzori",
      // Spans 2 columns on md, 1 on lg as per template (md:col-span-2 lg:col-span-1)
      gridSpan: { xs: 12, md: 6, lg: 4 },
    },
    {
      icon: <PhotoLibraryIcon />,
      titleKey: "homepage.galleryTitle",
      descKey: "homepage.galleryDesc",
      link: "/galerie",
      // Spans 2 columns on md, 2 on lg as per template (md:col-span-2 lg:col-span-2)
      gridSpan: { xs: 12, md: 6, lg: 8 },
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroWrapper>
        <HeroImage src={homepageImage} alt={t("homepage.heroTitle")} />
        <HeroOverlay />
        <HeroContentContainer>
          {/* Centered content */}
          <Typography
            variant={isMdUp ? "h2" : "h3"}
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            {t("homepage.heroTitle")}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="common.white" // Explicitly set to white for visibility in both modes
            sx={{
              maxWidth: "800px", // Limit width like template max-w-3xl
              mx: "auto", // Center the paragraph
              mb: 4, // Margin bottom like template mb-6
              lineHeight: 1.6, // Like template leading-relaxed
            }}
          >
            {t("homepage.heroSubtitle")}
          </Typography>
          {/* Buttons stack horizontally, wrap on smaller screens */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            mt={4} // Margin top like template mt-8
          >
            <Button
              variant="contained"
              color="primary" // Purple button
              size="large"
              component={RouterLink}
              to="/akce"
            >
              {t("homepage.heroButtonEvents")}
            </Button>
            <Button
              variant="outlined" // White/transparent button
              color="inherit" // Use white text color from parent
              size="large"
              component={RouterLink}
              to="/historie"
              sx={{
                // Adjusted styles for better visibility
                color: "white", // Ensure text is white
                backgroundColor: "rgba(100, 100, 100, 0.4)", // Slightly darker background
                borderColor: "rgba(255, 255, 255, 0.8)", // More opaque border
                "&:hover": {
                  backgroundColor: "rgba(100, 100, 100, 0.8)", // Darken on hover
                  borderColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              {t("homepage.heroButtonAbout")}
            </Button>
          </Stack>
        </HeroContentContainer>
      </HeroWrapper>

      {/* Explore Cards Section */}
      <ExploreSectionContainer>
        <Box textAlign="center" mb={6}>
          {" "}
          {/* Increased margin bottom like template mb-12 */}
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            {t("homepage.exploreTitle")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto" }} // Limit width like template max-w-2xl
          >
            {t("homepage.exploreSubtitle")}
          </Typography>
        </Box>

        {/* Grid using new StyledCard */}
        <Grid container spacing={3} justifyContent="center">
          {cardItems.map((item, index) => (
            // Adjust grid item sizing based on template spans
            <Grid
              item
              key={index}
              xs={item.gridSpan.xs}
              md={item.gridSpan.md}
              lg={item.gridSpan.lg}
            >
              <StyledCard>
                {/* CardActionArea provides hover effect, Link handles navigation */}
                <StyledCardActionArea>
                  <Link
                    component={RouterLink}
                    to={item.link}
                    underline="none" // Remove link underline
                    color="inherit" // Inherit text color
                    sx={{
                      display: "flex", // Use flexbox for layout
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "100%", // Ensure link fills the area
                      height: "100%",
                      p: 3, // Apply padding here (was removed from StyledCardActionArea)
                    }}
                  >
                    <IconAvatar>{item.icon}</IconAvatar>
                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {t(item.titleKey)}
                    </Typography>
                    {/* Correctly placed closing tag for description Typography */}
                    <Typography variant="body2" color="text.secondary">
                      {t(item.descKey)}
                    </Typography>
                    {/* Removed Button from inside the card */}
                  </Link>{" "}
                  {/* Closing tag for the Link component */}
                </StyledCardActionArea>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </ExploreSectionContainer>

      {/* Call to Action Section */}
      <CtaSection>
        <Container maxWidth="md">
          {" "}
          {/* Limit width like template max-w-2xl */}
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 3 }} // Margin like template mb-6
          >
            {t("homepage.ctaTitle")}
          </Typography>
          <Typography
            variant="body1"
            // Lighter text like template text-gray-300
            color="rgba(255, 255, 255, 0.7)"
            paragraph
            sx={{ mb: 4 }} // Margin like template mb-8
          >
            {t("homepage.ctaSubtitle")}
          </Typography>
          <Button
            variant="contained"
            color="primary" // Purple button
            size="large"
            component={RouterLink}
            to="/dokumenty" // Link to documents page as per template
          >
            {t("homepage.ctaButton")}
          </Button>
        </Container>
      </CtaSection>
    </>
  );
}
