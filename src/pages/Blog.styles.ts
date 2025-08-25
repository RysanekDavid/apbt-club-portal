import { SxProps, Theme } from "@mui/material/styles";

// --- Hero Section Styles ---
export const heroSection: SxProps<Theme> = {
  position: "relative",
  height: { xs: "20vh", sm: "25vh" },
  minHeight: "180px",
  width: "100%",
  backgroundColor: "black",
  color: "white",
  mb: 4,
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

// --- Page Styles ---
export const pageContainer: SxProps<Theme> = {
  pb: 16000,
};

export const postCard: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  border: (theme) => `1px solid ${theme.palette.divider}`,
  borderRadius: 2,
  overflow: "hidden",
  boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
  transition: (theme) => theme.transitions.create("box-shadow"),
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },
};

export const cardContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  p: 2,
};

export const postTitle: SxProps<Theme> = {
  fontWeight: "bold",
  mb: 1.5,
};

export const postDate: SxProps<Theme> = {
  mb: 1.5,
};

export const descriptionText: SxProps<Theme> = {
  mt: 0,
  mb: 1.5,
  flexGrow: 1,
  color: "text.secondary",
  wordBreak: "break-word",
  overflowWrap: "break-word",
};

export const learnMoreButton: SxProps<Theme> = {
  mt: "auto",
  alignSelf: "flex-start",
  textTransform: "none",
  fontWeight: "bold",
  border: "1px solid black",
  color: (theme) => theme.palette.primary.main,
  p: 1,
  "&:hover": {
    backgroundColor: "rgba(140, 189, 222, 0.4)",

    textDecoration: "underline",
  },
};

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  mb: 3,
};

export const noEventsAlert: SxProps<Theme> = {
  mt: 3,
};
