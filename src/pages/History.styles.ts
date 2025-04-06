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

// Box to constrain content width
export const contentMaxWidthBox: SxProps<Theme> = {
  maxWidth: "960px",
  mx: "auto",
};

// Grid item used for text column layout
export const flexColumnGridItem: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
};

// Box to make content grow within flex container
export const flexGrowBox: SxProps<Theme> = {
  flexGrow: 1,
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

export const quotePaper: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  p: 4,
  textAlign: "center",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[50], // Darker background in dark mode
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none", // Remove default shadow if desired
});

export const quoteIcon: SxProps<Theme> = {
  color: "primary.main",
  fontSize: "2.5rem", // Larger quote icon
  mb: 1,
};

export const quoteText: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  fontStyle: "italic",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.text.primary
      : theme.palette.text.secondary, // Ensure text is visible in dark mode
});

// Timeline Item Paper
export const timelineItemPaper: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  p: 2, // Keep padding
  border: `1px solid ${theme.palette.divider}`, // Add border similar to document cards
  // elevation={3} is handled in the component, but we could override shadow here if needed
});

// Timeline Connector style
export const timelineConnector: SxProps<Theme> = {
  bgcolor: "primary.main",
};

// Timeline Content style
export const timelineContent: SxProps<Theme> = {
  py: "12px",
  px: 2,
};

// Section Header (Title only) - Divider removed
export const sectionHeader: SxProps<Theme> = {
  // display: "flex", // Removed for divider
  // alignItems: "center", // Removed for divider
  mb: 4, // Margin below header
};

// Divider used within sections
export const sectionDivider: SxProps<Theme> = {
  my: 2,
};

// Box with bottom margin for sections
export const sectionMarginBottom: SxProps<Theme> = {
  mb: 6,
};

// Activity Section
export const activityCard: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  height: "100%", // Make cards equal height in the row
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  border: `1px solid ${theme.palette.divider}`, // Add border similar to document cards
  // elevation is implicitly handled by Card, can adjust shadow if needed
});

export const activityCardContent: SxProps<Theme> = {
  flexGrow: 1, // Allow content to expand
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const activityAvatar: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  width: 64, // Match template size (h-16 w-16)
  height: 64,
  bgcolor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[100]
      : theme.palette.primary.light, // Darker background in dark mode
  mb: 2, // Margin below avatar
});

export const activityIcon: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.black
      : theme.palette.common.white, // Black icon in dark mode, white in light
  fontSize: "2rem", // Adjust icon size
});

// --- Deprecated Styles (kept for reference, can be removed later) ---
export const paragraph: SxProps<Theme> = {
  // This was applied specifically, now handled by MUI defaults or specific component props
};

export const quoteBox: SxProps<Theme> = {
  // Replaced by quoteContainer, quotePaper, quoteIcon, quoteText
};
