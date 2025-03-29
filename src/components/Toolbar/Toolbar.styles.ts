import { styled } from "@mui/material/styles"; // Keep only one styled import
import MuiToolbar from "@mui/material/Toolbar"; // Keep only one MuiToolbar import
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { NavLink, Link } from "react-router-dom"; // Import both NavLink and Link
import pawIcon from "../../assets/paw.png"; // Import paw icon
import pawInvertedIcon from "../../assets/paw_inverted.png"; // Import inverted paw icon

// Main Toolbar Root
export const Root = styled(MuiToolbar)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100], // Light grey background
  color: theme.palette.text.primary, // Dark text/icons
  display: "flex",
  alignItems: "center",
  boxShadow: theme.shadows[2], // Add subtle elevation
  // Adjust justification for mobile within the Root itself
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between", // Space out Logo and RightSection
  },
}));

// Logo Section
export const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const LogoLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  "& img": {
    height: "3.5rem",
    marginRight: theme.spacing(1.5),
    verticalAlign: "middle",
  },
}));

// Desktop Navigation
export const DesktopNav = styled("nav")(({ theme }) => ({
  display: "flex",
  flexGrow: 1, // Allow nav to take up space on desktop
  justifyContent: "center", // Center the nav items
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

// Common Navigation Link Style (Now based on NavLink)
export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  // display: "flex", // Ensure flex properties are removed
  // alignItems: "center", // Ensure flex properties are removed
  color: theme.palette.text.primary, // Use theme color
  textDecoration: "none",
  padding: theme.spacing(1, 1.5), // Base padding
  borderRadius: theme.shape.borderRadius,
  transition:
    "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
  position: "relative",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.action.hover // Use theme action color for hover
        : theme.palette.action.hover,
  },
  // Active state styling
  "&.active": {
    fontWeight: "bold",
    // paddingLeft removed, rely on marginRight of ::before
    "&::before": {
      content: '""', // Empty content, using background image
      display: "inline-block", // Ensure display is inline-block
      width: "1.2em", // Keep width
      height: "1.1em", // Revert height back to this value
      marginRight: theme.spacing(0.25), // Revert to this spacing
      verticalAlign: "text-bottom", // Revert to this alignment
      backgroundImage: `url(${
        theme.palette.mode === "dark" ? pawInvertedIcon : pawIcon
      })`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
}));

// Mobile Navigation Container (holds button and dropdown)
export const MobileMenuContainer = styled(Box)(({ theme }) => ({
  display: "none", // Hidden by default
  position: "relative", // For positioning the dropdown
  [theme.breakpoints.down("md")]: {
    display: "block", // Shown on mobile
  },
}));

// Mobile Menu Button (Hamburger Icon)
export const MenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(1),
  fontSize: "1.5rem",
}));

// Mobile Navigation Dropdown Menu
export const MobileNav = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100],
  padding: theme.spacing(2),
  minWidth: 200,
  gap: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  zIndex: theme.zIndex.appBar + 1,
}));

// Container for elements on the right side (Language, Admin Icon, Menu Button)
export const RightSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1), // Consistent gap

  [theme.breakpoints.down("md")]: {
    // On mobile, make the container take available space needed for ordering
    flexGrow: 1, // Allow it to grow within the Toolbar flex container
    justifyContent: "flex-end", // Align items to the right end

    // Target the last direct child (MobileMenuContainer)
    "& > *:nth-last-of-type(1)": {
      order: -1, // Move the menu button visually before its preceding siblings (Lang, Admin)
      // This effectively places it towards the center/left of this section
    },
    // LanguageSelector (and AdminIcon if present) retain their natural order (1, 2)
    // but appear visually after the menu button due to the order property.
  },
}));

// Removed duplicate/incorrect definitions
