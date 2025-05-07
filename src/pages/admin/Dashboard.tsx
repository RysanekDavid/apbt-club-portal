import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Button,
  Link as MuiLink,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link as RouterLink } from "react-router-dom";
import * as styles from "./Dashboard.styles"; // Import styles

interface StatItem {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string; // MUI color name (e.g., 'primary', 'success')
  collectionName: string; // Added collection name for linking
}

interface RecentItem {
  id: string;
  title: string;
  createdAt: Date;
  type: string;
  collectionName: string;
}

// Helper function to safely get timestamp
const getTimestamp = (data: any): Date => {
  const ts = data?.createdAt;
  if (ts instanceof Timestamp) {
    return ts.toDate();
  }
  if (typeof ts === "string" || typeof ts === "number") {
    try {
      return new Date(ts);
    } catch (e) {
      /* ignore */
    }
  }
  console.warn("Missing or invalid createdAt timestamp for item:", data);
  return new Date(0);
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const theme = useTheme();

  const collectionsToFetch = [
    { name: "events", title: "Akce", icon: <EventIcon />, color: "primary" },
    {
      name: "galleries",
      title: "Galerie",
      icon: <PhotoLibraryIcon />,
      color: "success",
    },
    {
      name: "sponsors",
      title: "Sponzoři",
      icon: <HandshakeIcon />,
      color: "warning",
    },
    {
      name: "documents",
      title: "Dokumenty",
      icon: <DescriptionIcon />,
      color: "error",
    },
  ];

  useEffect(() => {
    // Fetch Stats
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const counts = await Promise.all(
          collectionsToFetch.map(async (col) => {
            const snapshot = await getDocs(collection(db, col.name));
            return {
              title: col.title,
              count: snapshot.size,
              icon: col.icon,
              color: col.color,
              collectionName: col.name,
            };
          })
        );
        setStats(counts);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    // Fetch Recent Items
    const fetchRecentItems = async () => {
      setLoadingRecent(true);
      try {
        const recentDocsPromises = collectionsToFetch.map(async (col) => {
          const q = query(
            collection(db, col.name),
            orderBy("createdAt", "desc"),
            limit(5)
          );
          const snapshot = await getDocs(q);
          return snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title || `Bez názvu (${col.title})`,
            createdAt: getTimestamp(doc.data()),
            type: col.title,
            collectionName: col.name,
          }));
        });

        const results = await Promise.all(recentDocsPromises);
        const combinedItems = results.flat();
        const sortedItems = combinedItems
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 5);
        setRecentItems(sortedItems);
      } catch (error) {
        console.error("Error fetching recent items:", error);
        if (error instanceof Error && error.message.includes("indexes")) {
          console.error(
            "Firestore index missing for 'createdAt'. Please create composite indexes if needed."
          );
        }
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchStats();
    fetchRecentItems();
  }, []);

  // Function to get main color from theme
  const getMainColor = (colorName: string): string => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return theme.palette[colorName]?.main || theme.palette.text.primary;
    } catch (e) {
      return theme.palette.text.primary;
    }
  };

  // Function to get a very light background color using alpha
  const getVeryLightBgColor = (colorName: string): string => {
    try {
      const mainColor = getMainColor(colorName);
      return alpha(mainColor, 0.2);
    } catch (e) {
      return alpha(theme.palette.grey[500], 0.2);
    }
  };

  return (
    <Box sx={styles.rootBox}>
      {/* Header */}
      <Box sx={styles.headerBox}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Přehled a správa obsahu webu
          </Typography>
        </Box>
      </Box>

      {/* Welcome message */}
      <Paper elevation={2} sx={styles.welcomePaper}>
        <Typography variant="h6" fontWeight="semibold" mb={1}>
          Vítejte v administraci
        </Typography>
        <Typography paragraph color="text.secondary">
          Toto je administrační rozhraní pro správu obsahu webu Klubu APBT.
          Pomocí menu vlevo můžete spravovat jednotlivé sekce webu.
        </Typography>
        <Typography paragraph color="text.secondary">
          Níže naleznete přehled jednotlivých sekcí a rychlé odkazy pro přidání
          nového obsahu.
        </Typography>
      </Paper>

      {/* Combined Stat and Add Cards */}
      <Grid container spacing={3} sx={styles.combinedGrid}>
        {loadingStats
          ? Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography sx={styles.loadingTypography}>
                      Načítání...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : stats.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <Card elevation={2} sx={styles.combinedCard}>
                  <CardContent sx={styles.combinedCardContent}>
                    <Box sx={styles.combinedCardAvatarBox}>
                      <Avatar
                        sx={styles.combinedCardAvatar(
                          getVeryLightBgColor(stat.color),
                          getMainColor(stat.color)
                        )}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box sx={styles.combinedCardTextBox}>
                        <Typography sx={styles.combinedCardTitle} variant="h6">
                          {stat.title}
                        </Typography>
                        <Typography
                          sx={styles.combinedCardCount}
                          variant="body2"
                          color="text.secondary"
                        >
                          Počet: {stat.count}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      color={stat.color}
                      startIcon={<AddCircleOutlineIcon />}
                      component={RouterLink}
                      to={`/admin/${stat.collectionName}/add`}
                      fullWidth
                      sx={styles.combinedCardButton} // Apply style if defined
                    >
                      Přidat {stat.title}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={3} sx={styles.recentActivitiesGrid}>
        <Grid item xs={12}>
          <Card elevation={2} sx={styles.recentActivitiesCard}>
            <CardContent sx={styles.recentActivitiesCardContent}>
              <Typography sx={styles.recentActivitiesTitle} variant="h6">
                Nedávné aktivity
              </Typography>
              {loadingRecent ? (
                <Typography sx={styles.loadingTypography}>
                  Načítání aktivit...
                </Typography>
              ) : (
                <List disablePadding>
                  {recentItems.length > 0 ? (
                    recentItems.map((item, index) => (
                      <Box
                        sx={styles.recentActivitiesListItemBox}
                        key={item.id}
                      >
                        <ListItem
                          disableGutters
                          sx={styles.recentActivitiesListItem}
                          secondaryAction={
                            <Typography
                              sx={styles.recentActivitiesListItemDate}
                              variant="caption"
                              color="text.secondary"
                            >
                              {item.createdAt.toLocaleDateString("cs-CZ")}
                            </Typography>
                          }
                        >
                          <ListItemText
                            primary={
                              <MuiLink
                                sx={styles.recentActivitiesListItemPrimaryLink}
                                component={RouterLink}
                                to={`/admin/${item.collectionName}/edit/${item.id}`}
                                underline="hover"
                                color="text.primary"
                              >
                                {item.title}
                              </MuiLink>
                            }
                            secondaryTypographyProps={{
                              sx: styles.recentActivitiesListItemSecondary,
                            }}
                            secondary={`Typ: ${item.type}`}
                          />
                        </ListItem>
                        {index < recentItems.length - 1 && (
                          <Divider
                            sx={styles.recentActivitiesDivider}
                            component="li"
                          />
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography sx={styles.recentActivitiesEmptyText}>
                      Žádné nedávné aktivity.
                    </Typography>
                  )}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
