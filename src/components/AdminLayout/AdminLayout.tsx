import { useState } from "react";
import { Outlet, useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme, // Import useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import AdminAvatar from "../AdminAvatar/AdminAvatar";
import PawBackground from "../PawBackground/PawBackground"; // Import the new component
import * as styles from "./AdminLayout.styles"; // Import styles

const drawerWidth = 240;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme(); // Get the current theme

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Chyba při odhlášení:", error);
    }
  };

  const menuItems = [
    { text: "Akce", icon: <EventIcon />, path: "/admin/events" },
    { text: "Galerie", icon: <PhotoLibraryIcon />, path: "/admin/galleries" }, // Updated path
    { text: "Sponzoři", icon: <HandshakeIcon />, path: "/admin/sponsors" },
    { text: "Dokumenty", icon: <DescriptionIcon />, path: "/admin/documents" },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Administrace
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Zpět na web" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Odhlásit se" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={styles.rootBox}>
      <AppBar position="fixed" sx={styles.appBar(drawerWidth)}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={styles.appBarTitle}
          >
            Administrace KLUB APBT
          </Typography>
          <AdminAvatar />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={styles.navBox(drawerWidth)}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={styles.mobileDrawer(drawerWidth)}
        >
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={styles.desktopDrawer(drawerWidth)} open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          ...styles.mainContentBox(drawerWidth),
          // Keep theme-dependent background color inline
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(33, 33, 33, 0.97)"
              : "rgba(255, 255, 255, 0.95)",
        }}
      >
        <PawBackground /> {/* Add the PawBackground component */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
