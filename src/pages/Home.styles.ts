import { styled, alpha } from "@mui/material/styles";
import { Box, Container, Card, CardActionArea, Avatar } from "@mui/material";

// --- Hero Section ---

export const HeroWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  // Increased height based on template (70vh, min 500px)
  minHeight: "500px",
  height: "70vh",
  color: theme.palette.common.white,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center content vertically and horizontally
}));

export const HeroImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center", // Centered image
  zIndex: 0,
});

export const HeroOverlay = styled(Box)(({ theme }) => ({
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // Adjusted overlay opacity as requested
  backgroundColor: alpha(theme.palette.common.black, 0.3),
  zIndex: 1,
}));

export const HeroContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center", // Center text as requested
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  // Limit max width for readability, similar to template's max-w-3xl
  maxWidth: theme.breakpoints.values.lg, // Use lg breakpoint value
  marginLeft: "auto",
  marginRight: "auto",
}));

// No specific styles needed for Title/Subtitle beyond Typography props now
// export const HeroTitle = styled(Typography)(() => ({
//   fontWeight: "bold",
// }));

// export const HeroSubtitle = styled(Typography)(() => ({
// }));

// --- Explore Cards Section ---

export const ExploreSectionContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6), // Increased padding like template py-16
  paddingBottom: theme.spacing(8),
}));

// Replacing InfoPaper with StyledCard based on template
export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex", // Ensure CardActionArea fills the card
  flexDirection: "column",
  transition: "all 0.2s ease-in-out",
  border: `1px solid ${theme.palette.divider}`, // Subtle border
  "&:hover": {
    boxShadow: theme.shadows[4], // Increase shadow on hover
    borderColor: theme.palette.primary.main, // Highlight border on hover
  },
}));

export const StyledCardActionArea = styled(CardActionArea)(() => ({
  flexGrow: 1, // Make area fill the card height
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start", // Align content to start (like template)
  justifyContent: "flex-start",
  textAlign: "left", // Align text to start
  // Padding removed, will be applied to inner Link component
}));

export const IconAvatar = styled(Avatar)(({ theme }) => ({
  marginBottom: theme.spacing(2), // Corresponds to mb-4 in template
  backgroundColor: alpha(theme.palette.primary.main, 0.1), // bg-purple-100
  color: theme.palette.primary.main, // text-purple-600
  transition: "all 0.2s ease-in-out",
  width: 48, // Corresponds to h-12 w-12
  height: 48,
  // Hover effect from template (group-hover)
  [`${StyledCard}:hover &`]: {
    backgroundColor: theme.palette.primary.main, // bg-purple-600
    color: theme.palette.primary.contrastText, // text-white
  },
}));

// --- Call to Action Section ---

export const CtaSection = styled(Box)(({ theme }) => ({
  // Corresponds to bg-black py-16 text-white
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.common.black, // Use black or near-black
  color: theme.palette.common.white,
  paddingTop: theme.spacing(8), // py-16 equivalent
  paddingBottom: theme.spacing(8),
  textAlign: "center",
}));

// --- Deprecated ---
// Keeping old styles commented out for reference, can be removed later

// export const InfoPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1.5),
//   [theme.breakpoints.up("sm")]: {
//     padding: theme.spacing(3),
//   },
//   textAlign: "center",
//   height: "100%",
//   borderRadius: theme.shape.borderRadius * 2,
//   border: `1.5px solid ${
//     theme.palette.mode === "dark"
//       ? theme.palette.grey[700]
//       : theme.palette.divider
//   }`,
//   backgroundColor: theme.palette.background.paper,
// }));

// export const NewsSectionContainer = styled(Container)(({ theme }) => ({
//   marginTop: theme.spacing(4),
//   marginBottom: theme.spacing(4),
// }));
