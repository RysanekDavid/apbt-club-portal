import { styled } from "@mui/material/styles";
import MuiToolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

// Main Toolbar Root
export const Root = styled(MuiToolbar)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100], // Light grey background
  color: theme.palette.text.primary, // Dark text/icons
  display: "flex",
  // Removed justifyContent: 'space-between' to allow centering nav
  alignItems: "center",
  boxShadow: theme.shadows[2], // Add subtle elevation
}));

// Logo Section
export const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  // Removed flexGrow: 1
});

export const LogoLink = styled(Link)(({ theme }) => ({
  // Wrap in callback to access theme
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",

  // Add styling for the img tag within the link
  "& img": {
    height: "3.5rem", // Adjust height as needed
    marginRight: theme.spacing(1.5), // Add some space between logo and potential text (if added later)
    verticalAlign: "middle", // Ensure proper vertical alignment
  },
}));

// LogoText is removed as it's no longer used

// Desktop Navigation
export const DesktopNav = styled("nav")(({ theme }) => ({
  display: "flex",
  flexGrow: 1, // Allow nav to take up space
  justifyContent: "center", // Center the nav items within the flex container
  gap: theme.spacing(2), // 1rem equivalent
  [theme.breakpoints.down("md")]: {
    // Corresponds to max-width: 900px
    display: "none",
  },
}));

// Common Navigation Link Style (Cleaner - Option A)
export const NavLinkStyled = styled(Link)(({ theme }) => ({
  color: `${theme.palette.text.primary} !important`, // Dark text
  textDecoration: "none !important",
  padding: theme.spacing(1, 1.5), // Adjusted padding slightly
  borderRadius: theme.shape.borderRadius,
  // Removed backgroundColor
  border: `1px solid ${theme.palette.grey[400]}`, // Add outline
  transition:
    "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
  position: "relative", // Needed for potential underline pseudo-element
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300], // Darker grey background on hover
  },
  // Optional: Add an underline effect on hover/active if desired
  // "&:after": {
  //   content: '""',
  //   position: "absolute",
  //   bottom: 0,
  //   left: '50%',
  //   transform: 'translateX(-50%)',
  //   width: 0,
  //   height: '2px',
  //   backgroundColor: theme.palette.primary.contrastText,
  //   transition: 'width 0.3s ease',
  // },
  // "&:hover:after": {
  //   width: '80%', // Adjust width as needed
  // },
}));

// Mobile Navigation
export const MobileMenuContainer = styled(Box)(({ theme }) => ({
  display: "none",
  position: "relative", // For positioning the dropdown
  [theme.breakpoints.down("md")]: {
    // Corresponds to max-width: 900px
    display: "block",
  },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary, // Dark icon
  padding: theme.spacing(1), // 0.5rem equivalent
  fontSize: "1.5rem", // Keep explicit font size for icon
}));

export const MobileNav = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "calc(100% + 8px)", // Position below the button
  right: 0,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100], // Match new toolbar background
  padding: theme.spacing(2), // 1rem equivalent
  minWidth: 200,
  gap: theme.spacing(1), // 0.5rem equivalent
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4], // Example shadow
  zIndex: theme.zIndex.appBar + 1, // Ensure it's above other content
}));

// Container for elements on the right side
export const RightSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px", // Adjust gap as needed
});

// Language Selector Styles (Assuming they might be used here or in LanguageSelector.styles.ts)
// If LanguageSelector has its own styles file, these might be redundant here.
// Keeping them commented out for now unless LanguageSelector imports from here.
/*
export const LanguageSelectorContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginLeft: "20px", // Adjust as needed with theme spacing
});

export const LanguageIconStyled = styled(LanguageIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const SelectStyled = styled(MuiSelect)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "& .MuiSelect-icon": {
    color: theme.palette.secondary.main,
  },
  "&:before": { borderColor: theme.palette.secondary.main },
  "&:hover:not(.Mui-disabled):before": { borderColor: theme.palette.secondary.main },
  // Add other necessary overrides for Select appearance
}));
*/
