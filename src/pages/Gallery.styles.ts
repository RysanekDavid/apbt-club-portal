import { SxProps, Theme } from "@mui/material/styles";

// --- Hero Section Styles (similar to Documents/Events) ---
export const heroSection: SxProps<Theme> = {
  position: "relative",
  height: { xs: "20vh", sm: "25vh" },
  minHeight: "180px",
  width: "100%",
  backgroundColor: "black",
  color: "white",
  mb: 4, // Adjusted margin bottom for Gallery page
};

export const heroOverlay: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const heroContent: SxProps<Theme> = {
  textAlign: "center",
  px: 2,
};

export const heroTitle: SxProps<Theme> = {
  mb: 1,
  fontWeight: "bold",
  letterSpacing: "tight",
};

export const heroSubtitle: SxProps<Theme> = (theme) => ({
  maxWidth: "600px",
  color: theme.palette.grey[300],
  mx: "auto",
});

// --- Existing Styles ---
export const pageContainer: SxProps<Theme> = {
  // my: 4, // Margin top handled by hero section margin bottom
  pb: 4, // Keep padding bottom
};

export const pageSubtitle: SxProps<Theme> = {
  mb: 4,
};

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  my: 2,
};

export const noGalleriesText: SxProps<Theme> = {
  textAlign: "center",
  my: 4,
};

export const galleryCard: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  height: "100%",
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${theme.palette.divider}`, // Added border
  borderRadius: theme.shape.borderRadius, // Use theme border radius
  overflow: "hidden", // Ensure media respects border radius
  boxShadow: theme.shadows[1], // Add subtle shadow like document cards
  transition: theme.transitions.create(["box-shadow", "transform"]),
  "&:hover": {
    boxShadow: theme.shadows[4], // Slightly increase shadow on hover
    transform: "translateY(-2px)", // Slight lift effect
  },
});

export const cardActionArea: SxProps<Theme> = {
  flexGrow: 1,
};

export const cardMedia: SxProps<Theme> = {
  // Increased height further for taller cards
  height: 350, // Increased from 260
  objectFit: "cover", // Changed from contain to cover for better fill
};

export const cardContent: SxProps<Theme> = {
  flexGrow: 1,
  p: 2, // Ensure consistent padding
};
