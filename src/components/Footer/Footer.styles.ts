import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

interface StyledFooterProps {
  isVisible: boolean;
}

export const StyledFooter = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<StyledFooterProps>(({ theme, isVisible }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  zIndex: theme.zIndex.appBar, // Ensure it's above most content but below modals etc.
  transform: isVisible ? "translateY(0)" : "translateY(100%)", // Slide in/out
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeOut,
  }),
  borderTop: `1px solid ${theme.palette.divider}`,
}));
