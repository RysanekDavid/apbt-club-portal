import { SxProps, Theme } from "@mui/material/styles";

export const heroSection: SxProps<Theme> = {
  position: "relative",
  height: { xs: "20vh", sm: "25vh" },
  minHeight: "180px",
  width: "100%",
  backgroundColor: "black", // Use theme color if available, e.g., theme.palette.common.black
  color: "white", // Use theme color, e.g., theme.palette.common.white
  mb: 6,
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
  letterSpacing: "tight", // Adjust letterSpacing if needed
};

export const heroSubtitle: SxProps<Theme> = (theme) => ({
  maxWidth: "600px", // Corresponds to max-w-2xl
  color: theme.palette.grey[300], // Adjust color as needed
  mx: "auto", // Ensure centering within the container
});

export const mainContentSection: SxProps<Theme> = {
  py: 6, // Corresponds to py-12
  pb: 10,
};

export const contentContainer: SxProps<Theme> = {
  maxWidth: "900px", // Corresponds to max-w-4xl
  mx: "auto",
};

export const introText: SxProps<Theme> = {
  textAlign: "center",
  mb: 6, // Corresponds to mb-8
  fontSize: "1.125rem", // Corresponds to text-lg
};

export const gridContainer: SxProps<Theme> = {
  mb: 6, // Corresponds to mb-12
};

export const card: SxProps<Theme> = (theme) => ({
  p: 3, // Corresponds to p-6
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1], // Corresponds to shadow-sm
  // height: "100%", // Removed to allow cards to size naturally
  display: "flex",
  flexDirection: "column",
});

// Style for the CardContent within the document card
export const documentCardContent: SxProps<Theme> = {
  flexGrow: 1,
};

export const cardHeader: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  mb: 2, // Corresponds to mb-4 or mb-6 depending on context
};

export const iconAvatar: SxProps<Theme> = (theme) => ({
  mr: 2, // Corresponds to mr-4
  bgcolor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[100]
      : theme.palette.primary.light, // Darker bg in dark mode
  color:
    theme.palette.mode === "dark"
      ? theme.palette.common.black
      : theme.palette.common.white, // Black icon in dark mode
  width: 48, // Corresponds to h-12 w-12
  height: 48,
});

export const cardTitle: SxProps<Theme> = {
  fontWeight: "bold",
  mb: 1, // Corresponds to mb-2
};

export const cardText: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.secondary, // Corresponds to text-gray-600
  mb: 2, // Corresponds to mb-4
});

export const downloadLink: SxProps<Theme> = (theme) => ({
  display: "inline-flex",
  alignItems: "center",
  color: theme.palette.primary.main, // Corresponds to text-purple-600
  fontWeight: 500,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.primary.dark, // Corresponds to hover:text-purple-800
  },
  mt: "auto", // Push download link to bottom if card uses flex column
});

// Specific style for the document download link with padding adjustments
export const documentDownloadLink: SxProps<Theme> = (theme) => ({
  ...downloadLink(theme), // Inherit base styles
  p: 3,
  pt: 0,
  alignSelf: "flex-start",
});

export const downloadIcon: SxProps<Theme> = {
  mr: 1, // Corresponds to mr-2
  width: 16, // Corresponds to h-4 w-4
  height: 16,
};

export const bankDetailsBox: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  mt: 2, // Corresponds to mt-4
  p: 2, // Corresponds to p-4
  bgcolor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[50], // Darker bg in dark mode
  borderRadius: 4, // Corresponds to rounded-md
  border: `1px solid ${theme.palette.divider}`, // Use divider color for border in both modes
});

export const bankImportantText: SxProps<Theme> = (theme) => ({
  fontSize: "0.875rem", // Corresponds to text-sm
  color: theme.palette.text.secondary, // Use secondary text color for better contrast in both modes potentially
});

export const bankPreferredText: SxProps<Theme> = (theme) => ({
  fontSize: "0.875rem", // Corresponds to text-sm
  fontWeight: 600, // Corresponds to font-semibold
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.light
      : theme.palette.primary.main, // Lighter primary in dark mode
  mt: 1, // Corresponds to mt-2
});

export const faqAccordion: SxProps<Theme> = (theme) => ({
  // Added theme parameter
  boxShadow: "none", // Remove default accordion shadow if needed
  borderBottom: `1px solid ${theme.palette.divider}`, // Corresponds to border-b
  "&:before": {
    display: "none", // Remove the top border line of accordion
  },
  "&:last-of-type": {
    borderBottom: "none", // Remove border for the last item
  },
});

export const faqAccordionSummary: SxProps<Theme> = {
  // Adjust padding if needed
};

export const faqAccordionDetails: SxProps<Theme> = (theme) => ({
  color: theme.palette.text.secondary, // Corresponds to text-gray-600
  pt: 0, // Remove extra padding top
});

export const faqContainer: SxProps<Theme> = {
  // Removed ml-16, handle layout with Grid or Box padding
};

// Specific style for the FAQ card combining card and padding
export const faqCard: SxProps<Theme> = (theme) => ({
  ...card(theme), // Inherit base card styles
  p: 3, // Apply specific padding
});

// Styles from original Documents.styles.ts, potentially reused or adapted
export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  my: 2,
};

export const noDocumentsText: SxProps<Theme> = {
  textAlign: "center",
  my: 4,
};

// Removed dynamicDocumentList, dynamicDocumentListItem, dynamicDownloadButton styles
// as dynamic documents will now use the 'card' styling within a Grid.
