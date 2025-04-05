import { SxProps, Theme } from "@mui/material/styles";

// Header styles (similar to Sponsors page)
export const headerBox: SxProps<Theme> = {
  py: { xs: 4, md: 6 },
  backgroundColor: "common.black",
  color: "common.white",
  textAlign: "center",
};

export const headerContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const headerTitle: SxProps<Theme> = {
  mb: 1,
  fontWeight: "bold",
};

export const headerSubtitle: SxProps<Theme> = {
  color: "grey.400",
  maxWidth: "md",
};

// Page container for content below header
export const pageContainer: SxProps<Theme> = {
  py: 4,
};

// Styling for the Paper containing info sections
export const infoPaper: SxProps<Theme> = {
  p: 3,
  // height: "100%", // Removed to prevent stretching
  border: (theme) => `1px solid ${theme.palette.divider}`,
  boxShadow: (theme) => theme.shadows[1],
};

// Title for each section (Kontaktní údaje, Banka a účet)
export const sectionTitle: SxProps<Theme> = {
  fontWeight: "bold",
  mb: 1.5,
};

// Divider style
export const divider: SxProps<Theme> = {
  my: 2, // Margin top and bottom for dividers
};

// Container for icon + text block
export const infoSection: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start", // Align items to the top
  gap: 2, // Space between icon and text content
};

// Icon style
export const infoIcon: SxProps<Theme> = {
  mt: 0.5, // Align icon slightly lower
  color: "primary.main", // Use primary color for icons
};

// Heading within an info section (e.g., Adresa Klubu)
export const infoHeading: SxProps<Theme> = {
  fontWeight: "medium", // Medium weight for headings
  mb: 0.5, // Margin below heading
};

// Style for clickable links (phone, email, web)
export const infoLink: SxProps<Theme> = {
  color: "primary.main",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};

// Style for the bank payment note
export const paymentNote: SxProps<Theme> = {
  mt: 2, // Margin top for the note
  fontStyle: "italic",
  color: "text.secondary",
};

// Restore original form styles
export const formBox: SxProps<Theme> = {
  maxWidth: 600,
  mt: 3,
};

export const submitButton: SxProps<Theme> = {
  mt: 2,
};

// Style for map container (replaces placeholder)
export const mapContainer: SxProps<Theme> = {
  mt: 3, // Margin top
  height: 250, // Keep example height or adjust as needed
  width: "100%",
  borderRadius: 1, // Optional rounding
  overflow: "hidden", // Ensure map corners respect border radius
  border: (theme) => `1px solid ${theme.palette.divider}`, // Add a subtle border
};
