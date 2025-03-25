import { useEffect, useState } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
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
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EventIcon from "@mui/icons-material/Event";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DescriptionIcon from "@mui/icons-material/Description";

interface StatItem {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

interface RecentItem {
  id: string;
  title: string;
  date: Date;
  type: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from Firestore collections
        const newsCount = (await getDocs(collection(db, "news"))).size;
        const eventsCount = (await getDocs(collection(db, "events"))).size;
        const galleryCount = (await getDocs(collection(db, "gallery"))).size;
        const sponsorsCount = (await getDocs(collection(db, "sponsors"))).size;
        const documentsCount = (await getDocs(collection(db, "documents")))
          .size;

        setStats([
          {
            title: "Novinky",
            count: newsCount,
            icon: <NewspaperIcon fontSize="large" />,
            color: "#1976d2",
          },
          {
            title: "Akce",
            count: eventsCount,
            icon: <EventIcon fontSize="large" />,
            color: "#2e7d32",
          },
          {
            title: "Galerie",
            count: galleryCount,
            icon: <PhotoLibraryIcon fontSize="large" />,
            color: "#ed6c02",
          },
          {
            title: "Sponzoři",
            count: sponsorsCount,
            icon: <HandshakeIcon fontSize="large" />,
            color: "#9c27b0",
          },
          {
            title: "Dokumenty",
            count: documentsCount,
            icon: <DescriptionIcon fontSize="large" />,
            color: "#d32f2f",
          },
        ]);

        // Fetch recent items
        const recentNews = await getDocs(
          query(collection(db, "news"), limit(3))
        );
        const recentEvents = await getDocs(
          query(collection(db, "events"), limit(3))
        );

        const newsItems = recentNews.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          date: doc.data().createdAt?.toDate() || new Date(),
          type: "Novinka",
        }));

        const eventItems = recentEvents.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          date: doc.data().date?.toDate() || new Date(),
          type: "Akce",
        }));

        // Combine and sort by date
        const combined = [...newsItems, ...eventItems].sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );

        setRecentItems(combined.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={stat.title}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Box sx={{ color: stat.color, mb: 2 }}>{stat.icon}</Box>
                <Typography variant="h5" component="div">
                  {stat.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Nedávné položky
            </Typography>
            {loading ? (
              <Typography>Načítání...</Typography>
            ) : (
              <List>
                {recentItems.length > 0 ? (
                  recentItems.map((item, index) => (
                    <Box key={item.id}>
                      <ListItem>
                        <ListItemText
                          primary={item.title}
                          secondary={`${
                            item.type
                          } • ${item.date.toLocaleDateString("cs-CZ")}`}
                        />
                      </ListItem>
                      {index < recentItems.length - 1 && <Divider />}
                    </Box>
                  ))
                ) : (
                  <Typography>Žádné nedávné položky</Typography>
                )}
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Vítejte v administraci
            </Typography>
            <Typography paragraph>
              Toto je administrační rozhraní pro správu obsahu webu Klubu APBT.
              Pomocí menu vlevo můžete spravovat jednotlivé sekce webu.
            </Typography>
            <Typography paragraph>
              Pro přidání nového obsahu přejděte do příslušné sekce a klikněte
              na tlačítko "Přidat". Pro úpravu nebo smazání existujícího obsahu
              použijte tlačítka v tabulce.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
