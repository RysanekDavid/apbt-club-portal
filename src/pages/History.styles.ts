import { SxProps, Theme } from "@mui/material/styles";

// --- Existing Styles ---
export const pageContainer: SxProps<Theme> = {
  my: 4, // Keep existing margin
};

// --- New Styles ---

// Hero Section (similar to Contact)
export const heroBox: SxProps<Theme> = {
  py: { xs: 4, md: 6 },
  backgroundColor: "common.black",
  color: "common.white",
  textAlign: "center",
};

export const heroContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const heroTitle: SxProps<Theme> = {
  mb: 1,
  fontWeight: "bold",
};

export const heroSubtitle: SxProps<Theme> = {
  color: "grey.400",
  maxWidth: "md",
};

// Section Title (used for multiple sections)
export const sectionTitle: SxProps<Theme> = {
  fontWeight: "bold",
  mb: 2, // Margin below title
  textAlign: { xs: "center", md: "left" }, // Center on small, left on medium+
};

// Image Placeholder
export const imagePlaceholder: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  minHeight: { xs: 200, md: 300 }, // Ensure minimum height
  backgroundColor: "grey.200",
  borderRadius: 1, // Use theme's border radius
  border: (theme) => `1px solid ${theme.palette.divider}`,
};

// Image Container (replaces placeholder style)
export const imageContainer: SxProps<Theme> = {
  borderRadius: 2, // Use theme's border radius
  maxHeight: 540, // Re-added max height constraint
  overflow: "hidden", // Ensure image respects border radius
};

// Quote Section
export const quoteContainer: SxProps<Theme> = {
  my: 6, // Margin top and bottom
};

export const quotePaper: SxProps<Theme> = {
  p: 4,
  textAlign: "center",
  backgroundColor: "grey.50", // Light background
  border: (theme) => `1px solid ${theme.palette.divider}`,
  boxShadow: "none", // Remove default shadow if desired
};

export const quoteIcon: SxProps<Theme> = {
  color: "primary.main",
  fontSize: "2.5rem", // Larger quote icon
  mb: 1,
};

export const quoteText: SxProps<Theme> = {
  fontStyle: "italic",
  color: "text.secondary",
};

// Section Header (Title + Divider)
export const sectionHeader: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 4, // Margin below header
};

export const headingDivider: SxProps<Theme> = {
  flexGrow: 1,
  ml: 2,
  maxWidth: "100px", // Match template
  bgcolor: "primary.main", // Use primary color
  height: "2px",
};

// Activity Section
export const activityCard: SxProps<Theme> = {
  height: "100%", // Make cards equal height in the row
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};

export const activityCardContent: SxProps<Theme> = {
  flexGrow: 1, // Allow content to expand
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const activityAvatar: SxProps<Theme> = {
  width: 64, // Match template size (h-16 w-16)
  height: 64,
  bgcolor: "primary.light", // Lighter primary color for avatar background
  mb: 2, // Margin below avatar
};

export const activityIcon: SxProps<Theme> = {
  color: "primary.main", // Primary color for icon
  fontSize: "2rem", // Adjust icon size
};

// --- Deprecated Styles (kept for reference, can be removed later) ---
export const paragraph: SxProps<Theme> = {
  // This was applied specifically, now handled by MUI defaults or specific component props
};

export const quoteBox: SxProps<Theme> = {
  // Replaced by quoteContainer, quotePaper, quoteIcon, quoteText
};
