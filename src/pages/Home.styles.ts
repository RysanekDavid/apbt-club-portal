import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Paper } from "@mui/material";

export const HeroWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "300px",
  [theme.breakpoints.up("md")]: {
    minHeight: "450px",
  },
  color: theme.palette.common.white,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
}));

export const HeroImage = styled("img")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center 10%",
  zIndex: 0,
}));

export const HeroOverlay = styled(Box)(() => ({
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  zIndex: 1,
}));

export const HeroContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export const HeroTitle = styled(Typography)(() => ({
  fontWeight: "bold",
  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
}));

export const HeroSubtitle = styled(Typography)(() => ({
  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
}));

export const InfoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  textAlign: "center",
  height: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  // Adjust border for better visibility in dark mode
  border: `1.5px solid ${
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : theme.palette.divider
  }`,
  // Restore default paper shadow for depth
  // Use theme's paper background color for adaptability
  backgroundColor: theme.palette.background.paper,
}));

export const NewsSectionContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));
