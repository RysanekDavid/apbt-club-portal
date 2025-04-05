import { SxProps, Theme } from "@mui/material/styles";

// Header styles inspired by the Contact page example
export const headerBox: SxProps<Theme> = {
  py: { xs: 4, md: 6 }, // Responsive padding
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
  color: "grey.400", // Lighter subtitle color
  maxWidth: "md", // Limit width for readability
};

// Adjusted pageContainer padding
export const pageContainer: SxProps<Theme> = {
  py: 4, // Keep vertical padding for content below header
};

export const pageTitle: SxProps<Theme> = {
  mb: 4,
};

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  mb: 4,
};

export const sponsorCard: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  border: (theme) => `1px solid ${theme.palette.divider}`, // Add border
  borderRadius: 2, // Add slight rounding
  overflow: "hidden",
  boxShadow: (theme) => theme.shadows[1], // Add subtle shadow
  transition: (theme) => theme.transitions.create("box-shadow"),
  "&:hover": {
    boxShadow: (theme) => theme.shadows[4], // Increase shadow on hover
  },
};

export const cardMedia: SxProps<Theme> = {
  height: 140,
  objectFit: "contain",
  p: 2,
};

export const cardContent: SxProps<Theme> = {
  flexGrow: 1,
};

export const cardActions: SxProps<Theme> = {
  justifyContent: "center",
  pb: 2,
};
