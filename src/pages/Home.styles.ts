import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import homepageImage from "../assets/homepage_image.png"; // Import the image

export const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative", // Needed for overlay and content positioning
  backgroundImage: `url(${homepageImage})`,
  backgroundSize: "cover", // Fill the area, may crop
  backgroundPosition: "center 20%", // Default position (20% from top)
  backgroundRepeat: "no-repeat",
  minHeight: "300px", // Default minimum height (xs)
  [theme.breakpoints.down("sm")]: {
    // Adjust position for smaller screens (below 600px)
    backgroundPosition: "center center", // Center the image fully
  },
  "@media (max-width: 400px)": {
    // Further reduce height on very small screens
    minHeight: "250px",
  },
  [theme.breakpoints.up("md")]: {
    minHeight: "450px", // Minimum height for md and up
    backgroundPosition: "center 20%", // Revert to original position for larger screens if needed
  },
  display: "flex", // Use flexbox to center content vertically
  alignItems: "center", // Center content vertically
  color: theme.palette.common.white, // Default text color
  paddingTop: theme.spacing(8), // Add padding top
  paddingBottom: theme.spacing(8), // Add padding bottom
  marginBottom: theme.spacing(4), // Margin below hero

  // Overlay
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)", // Slightly adjusted overlay darkness
    zIndex: 1, // Above background, below content
  },
}));

export const HeroContentContainer = styled(Container)(({ theme }) => ({
  position: "relative", // Ensure content is above overlay
  zIndex: 2, // Above overlay
  textAlign: "left", // Align text to the left within the container
  [theme.breakpoints.down("md")]: {
    textAlign: "center", // Center text on smaller screens
  },
}));

export const NewsSectionContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  // Removed padding reduction for xs screens
}));

export const NewsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr", // Default mobile
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns tablet
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns desktop
  },
}));

// Add more styled components if needed for new content sections later
