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
import historyImage from "../../src/assets/history_image.png"; // Corrected path if needed
import * as styles from "./History.styles"; // Import styles

export default function HistoryPage() {
  // Data from template
  const milestones = [
    {
      year: "1998",
      title: "Založení klubu",
      description:
        "Klub Amerických Pit Bull Teriérů byl založen za účelem podpory a osvěty tohoto plemene.",
    },
    {
      year: "2005",
      title: "Zavedení sportovních aktivit",
      description:
        "Začátek organizování sportovních aktivit jako weight pull a triatlon pro APBT.",
    },
    {
      year: "2010",
      title: "Nové sportovní disciplíny",
      description:
        "Vytvoření nových sportovních disciplín jako wall climbing, high jump a long jump.",
    },
    {
      year: "2015",
      title: "Osvětové kampaně",
      description:
        "Spuštění osvětových kampaní pro zlepšení povědomí o plemeni APBT.",
    },
    {
      year: "2020",
      title: "Rozšíření aktivit",
      description:
        "Rozšíření aktivit klubu a navázání spolupráce s dalšími organizacemi.",
    },
  ];

  const activities = [
    {
      icon: <FitnessCenterIcon sx={styles.activityIcon} />,
      title: "Sportovní aktivity",
      description:
        "Organizujeme sportovní aktivity pro APBT jako weight pull, triatlon a další disciplíny.",
    },
    {
      icon: <CampaignIcon sx={styles.activityIcon} />,
      title: "Osvětová činnost",
      description:
        "Šíříme osvětu a správné informace o plemeni APBT a bojujeme proti předsudkům.",
    },
    {
      icon: <PeopleIcon sx={styles.activityIcon} />,
      title: "Komunita",
      description:
        "Budujeme komunitu zodpovědných majitelů a chovatelů APBT a sdílíme zkušenosti.",
    },
  ];

  return (
    <>
      {/* Hero Section (similar to Contact) */}
      <Box sx={styles.heroBox}>
        <Container maxWidth="lg" sx={styles.heroContent}>
          <Typography variant="h3" component="h1" sx={styles.heroTitle}>
            Historie
          </Typography>
          <Typography variant="h6" component="p" sx={styles.heroSubtitle}>
            Poznejte historii a poslání našeho klubu
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={styles.pageContainer}>
        <Box sx={{ maxWidth: "960px", mx: "auto" }}>
          {/* History Intro Section */}
          <Box mb={6}>
            <Typography variant="h4" component="h2" sx={styles.sectionTitle}>
              Historie klubu
            </Typography>
            {/* Set alignItems back to flex-start */}
            <Grid container spacing={4} alignItems="flex-start">
              {/* Text Column */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  {" "}
                  {/* Inner Box takes available space */}
                  <Typography paragraph>
                    Klub vznikl v roce 1998 za účelem podpory a osvěty
                    pravděpodobně nejdiskutovanějšího plemene posledních dvou
                    desetiletí.
                  </Typography>
                  <Typography paragraph>
                    Nechceme popírat minulost, protože nebylo-li by psích
                    zápasů, nevznikl by pitbulteriér se všemi svými vlastnostmi
                    a schopnostmi, tak jak jej dnes známe, zároveň se však jako
                    klub důrazně distancujeme od jakéhokoli nelegálního
                    využívání / zneužívání tohoto plemene.
                  </Typography>
                  <Typography>
                    Žijeme v 21. století a našim cílem je podporovat chov
                    moderního plemene za současného respektování jeho minulosti.
                    Proto Klub Amerických Pit Bull Teriérů patří k zásadním
                    subjektům propagujícím sportovní využití APBT (weight pull,
                    triatlon) a tvůrcům či zdokonalovatelům nových sportů
                    uzpůsobených pro toto plemeno a další plemena typu bull
                    (wall climbing, high jump, long jump, weight pull sprint,
                    monkey track), aby každý majitel měl možnost dostatečného a
                    smysluplného zaměstnání pro svého psa. Stejně tak jsme
                    připraveni se podílet na diskusích, které budou mít za cíl
                    kvalifikovanou legislativní úpravu chovu a držení psů.
                  </Typography>
                </Box>
              </Grid>
              {/* Image Column */}
              <Grid item xs={12} md={6}>
                {/* imageContainer style already has height: 100% */}
                <Box sx={styles.imageContainer}>
                  <img
                    src={historyImage}
                    alt="American Pit Bull Terrier historie"
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
                "Společně budujeme lepší povědomí o tomto výjimečném plemeni"
              </Typography>
            </Paper>
          </Box>

          {/* Timeline Section */}
          <Box mb={6}>
            <Box sx={styles.sectionHeader}>
              <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
                Důležité milníky
              </Typography>
              <Divider sx={styles.headingDivider} />
            </Box>
            <Timeline position="alternate">
              {milestones.map((milestone, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined">
                      {/* Optional: Add icon inside dot */}
                    </TimelineDot>
                    {index < milestones.length - 1 && (
                      <TimelineConnector sx={{ bgcolor: "primary.main" }} />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Paper elevation={3} sx={{ p: 2 }}>
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
          <Box>
            <Box sx={styles.sectionHeader}>
              <Typography variant="h5" component="h2" sx={styles.sectionTitle}>
                Naše aktivity
              </Typography>
              <Divider sx={styles.headingDivider} />
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
