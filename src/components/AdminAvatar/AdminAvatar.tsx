import { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

// Subtle pastel colors that are feminine but professional
const avatarColors = ["#f8bbd0", "#e1bee7", "#d1c4e9", "#c5cae9", "#bbdefb"];

interface AdminAvatarProps {
  showName?: boolean;
}

const AdminAvatar = ({ showName = true }: AdminAvatarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Generate a consistent color based on email
  const getColorFromEmail = (email: string) => {
    const sum = email
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatarColors[sum % avatarColors.length];
  };

  // Get initials from email
  const getInitials = (email: string) => {
    if (!email) return "A";
    return email.charAt(0).toUpperCase();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Chyba při odhlášení:", error);
    }
  };

  if (!currentUser) return null;

  const avatarColor = getColorFromEmail(currentUser.email || "admin");
  const initials = getInitials(currentUser.email || "admin");

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {showName && (
        <Typography
          variant="body2"
          sx={{ mr: 1, display: { xs: "none", sm: "block" } }}
        >
          {currentUser.email}
        </Typography>
      )}
      <Tooltip title="Nastavení účtu">
        <IconButton onClick={handleMenu} size="small" sx={{ ml: 1 }}>
          <Avatar
            sx={{
              bgcolor: avatarColor,
              width: 40,
              height: 40,
              fontWeight: "bold",
              color: "#424242", // Dark gray text for contrast
            }}
          >
            {initials}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
          Profil
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
          Nastavení
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Odhlásit se
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminAvatar;
