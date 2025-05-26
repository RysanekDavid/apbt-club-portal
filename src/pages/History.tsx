import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"; // Placeholder for Sportovní aktivity
import CampaignIcon from "@mui/icons-material/Campaign"; // Placeholder for Osvětová činnost
import PeopleIcon from "@mui/icons-material/People"; // Placeholder for Komunita
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import historyImage from "../assets/history_image.webp"; // Corrected path and changed to webp
import * as styles from "./History.styles"; // Import styles
import { useTranslation } from "react-i18next";

export default function HistoryPage() {
  const { t } = useTranslation();
  // Data from template - translate these
  const milestones = [
    {
      year: "1998",
      title: t("history.milestones.1998.title"),
      description: t("history.milestones.1998.description"),
    },
    {
      year: "2005",
      title: t("history.milestones.2005.title"),
      description: t("history.milestones.2005.description"),
    },
    {
      year: "2010",
      title: t("history.milestones.2010.title"),
      description: t("history.milestones.2010.description"),
    },
    {
      year: "2015",
      title: t("history.milestones.2015.title"),
      description: t("history.milestones.2015.description"),
    },
    {
      year: "2020",
      title: t("history.milestones.2020.title"),
      description: t("history.milestones.2020.description"),
    },
    {
      year: "2025",
      title: t("history.milestones.2025.title"),
      description: t("history.milestones.2025.description"),
    },
  ];

  const activities = [
    {
      icon: <FitnessCenterIcon sx={styles.activityIcon} />,
      title: t("history.activities.sports.title"),
      description: t("history.activities.sports.description"),
    },
    {
      icon: <CampaignIcon sx={styles.activityIcon} />,
      title: t("history.activities.awareness.title"),
      description: t("history.activities.awareness.description"),
    },
    {
      icon: <PeopleIcon sx={styles.activityIcon} />,
      title: t("history.activities.community.title"),
      description: t("history.activities.community.description"),
    },
  ];

  return (
    <>
      {/* Hero Section (similar to Contact) */}
      <Box sx={styles.heroBox}>
        <Container maxWidth="lg" sx={styles.heroContent}>
          <Typography variant="h3" component="h1" sx={styles.heroTitle}>
            {t("history.title")}
          </Typography>
          <Typography variant="h6" component="p" sx={styles.heroSubtitle}>
            {t("history.subtitle")}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={styles.pageContainer}>
        <Box sx={styles.contentMaxWidthBox}>
          {" "}
          {/* Use dedicated style */}
          {/* History Intro Section */}
          <Box sx={styles.sectionMarginBottom}>
            {" "}
            {/* Use dedicated style */}
            {/* Set alignItems back to flex-start */}
            <Grid container spacing={4} alignItems="flex-start">
              {/* Text Column */}
              <Grid
                item
                xs={12}
                md={6}
                sx={styles.flexColumnGridItem} // Use dedicated style
              >
                <Box sx={styles.flexGrowBox}>
                  {" "}
                  {/* Use dedicated style */}
                  <Typography paragraph>{t("history.paragraph1")}</Typography>
                  <Typography paragraph>{t("history.paragraph2")}</Typography>
                  <Typography>{t("history.paragraph3")}</Typography>
                </Box>
              </Grid>
              {/* Image Column */}
              <Grid item xs={12} md={6}>
                {/* imageContainer style already has height: 100% */}
                <Box sx={styles.imageContainer}>
                  <img
                    src={historyImage}
                    alt={t("history.imageAlt")}
                    style={{
                      width: "100%",
                      // height: "100%", // Removed
                      objectFit: "cover", // Keep cover
                      display: "block",
                      borderRadius: "inherit",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* Quote Section */}
          <Box sx={styles.quoteContainer}>
            <Paper sx={styles.quotePaper}>
              <FormatQuoteIcon sx={styles.quoteIcon} />
              <Typography
                variant="h6"
                component="blockquote"
                sx={styles.quoteText}
              >
                {t("homepage.quote")}
              </Typography>
            </Paper>
          </Box>
          {/* Timeline Section */}
          <Box sx={styles.sectionMarginBottom}>
            {" "}
            {/* Use dedicated style */}
            <Box sx={styles.sectionHeader}>
              <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
                {t("history.milestonesTitle")}
              </Typography>
              <Divider sx={styles.sectionDivider} /> {/* Use dedicated style */}
            </Box>
            <Timeline position="alternate">
              {milestones.map((milestone, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined">
                      {/* Optional: Add icon inside dot */}
                    </TimelineDot>
                    {index < milestones.length - 1 && (
                      <TimelineConnector sx={styles.timelineConnector} /> // Use dedicated style
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={styles.timelineContent}>
                    {" "}
                    {/* Use dedicated style */}
                    <Paper elevation={3} sx={styles.timelineItemPaper}>
                      <Typography
                        variant="caption"
                        color="primary"
                        display="block"
                        gutterBottom
                      >
                        {milestone.year}
                      </Typography>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {milestone.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {milestone.description}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
          {/* Activities Section */}
          <Box sx={styles.sectionMarginBottom}>
            {" "}
            {/* Use dedicated style */}
            <Box sx={styles.sectionHeader}>
              <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
                {t("history.activitiesTitle")}
              </Typography>
              <Divider sx={styles.sectionDivider} /> {/* Use dedicated style */}
            </Box>
            <Grid container spacing={3}>
              {activities.map((activity, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={styles.activityCard}>
                    <CardContent sx={styles.activityCardContent}>
                      <Avatar sx={styles.activityAvatar}>
                        {activity.icon}
                      </Avatar>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
