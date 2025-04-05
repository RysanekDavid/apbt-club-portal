import { SxProps, Theme } from "@mui/material/styles";

// --- Hero Section Styles (similar to Documents) ---
export const heroSection: SxProps<Theme> = {
  position: "relative",
  height: { xs: "20vh", sm: "25vh" },
  minHeight: "180px",
  width: "100%",
  backgroundColor: "black",
  color: "white",
  mb: 4, // Adjusted margin bottom for Events page
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
  // pt: 4, // Padding top is handled by hero section margin bottom
  pb: 8, // Increase padding bottom significantly for scroll room
};

// Updated eventCard for vertical layout
export const eventCard: SxProps<Theme> = {
  // mb: 3, // Margin bottom is handled by Grid spacing, remove here
  display: "flex",
  flexDirection: "column",
  height: "100%", // Make cards in a row equal height
  border: (theme) => `1px solid ${theme.palette.divider}`, // Keep subtle border
  borderRadius: 2, // Keep slight rounding
  overflow: "hidden",
  // Use a slightly less intense shadow to reduce perceived thickness
  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  transition: (theme) => theme.transitions.create("box-shadow"), // Keep transition for hover effect
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)", // Adjusted hover shadow
  },
};

// Updated cardMedia for top position
export const cardMedia: SxProps<Theme> = {
  height: "50%", // Fixed height for the image
  width: "100%",
  objectFit: "cover", // Always cover
};

export const cardMediaPlaceholder: SxProps<Theme> = {
  ...cardMedia, // Inherit base styles
  filter: "grayscale(70%) opacity(70%)",
  backgroundColor: "grey.200", // Add a background color
};

// Updated cardContent
export const cardContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1, // Allow content to fill remaining space
  p: 2, // Standard padding
};

export const eventTitle: SxProps<Theme> = {
  fontWeight: "bold", // Make title bolder
  mb: 1.5, // Add margin bottom
};

// New styles for info section (replaces chips)
export const infoContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column", // Stack info items vertically
  gap: 0.5, // Space between info items
  mb: 1.5, // Margin below the info section
  color: "text.secondary", // Use secondary color for info text
};

export const infoItem: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 0.8, // Space between icon and text
};

export const infoIcon: SxProps<Theme> = {
  fontSize: "1.1rem", // Slightly smaller icon
  color: "inherit", // Inherit color from infoContainer
};

export const infoText: SxProps<Theme> = {
  fontSize: "0.875rem", // Standard body2 size
  lineHeight: 1.4,
  color: "inherit",
};

// Updated descriptionText
export const descriptionText: SxProps<Theme> = {
  mt: 0, // Remove top margin as infoContainer has margin-bottom
  mb: 1.5, // Add margin below description
  flexGrow: 1, // Allow description to take up space before the button
  color: "text.secondary",
  // Ensure long words break correctly
  wordBreak: "break-word",
  overflowWrap: "break-word",
};

// New style for "Learn More" button/link
export const learnMoreButton: SxProps<Theme> = {
  mt: "auto", // Push button to the bottom
  alignSelf: "flex-start", // Align to the left
  textTransform: "none",
  fontWeight: "bold",
  color: (theme) => theme.palette.primary.main, // Use primary color
  p: 0, // Remove padding for link-like appearance
  "&:hover": {
    backgroundColor: "transparent", // No background on hover
    textDecoration: "underline",
  },
};

// Style for the static "Learn More" link when description is short
export const learnMoreStatic: SxProps<Theme> = {
  ...learnMoreButton, // Inherit base styles
  cursor: "default", // Indicate it's not clickable (or style differently)
  color: "text.disabled", // Dim the color
  "&:hover": {
    textDecoration: "none", // No underline on hover
  },
  // Or simply hide it if not needed: display: 'none'
};

// Removed chipsContainer, infoChip, readMoreButtonContainer, readMoreButton

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  mb: 3,
};

export const sectionTitle: SxProps<Theme> = {
  mt: 4,
};

export const sectionDivider: SxProps<Theme> = {
  mb: 3,
};

export const noEventsAlert: SxProps<Theme> = {
  mt: 3,
};
