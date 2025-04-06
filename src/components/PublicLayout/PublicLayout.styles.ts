import { SxProps, Theme } from "@mui/material/styles";

export const rootBox: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  // Removed position: relative and zIndex: 0
  // Note: backgroundColor is theme-dependent and kept inline in the component
};

export const appBar: SxProps<Theme> = {
  // Removed zIndex, sticky position should handle layering
  top: 0, // Added top position for sticky AppBar
};

export const mainContent: SxProps<Theme> = {
  flexGrow: 1,
  // Removed position: relative and zIndex: 1 again
};

export const footerBox: SxProps<Theme> = {
  zIndex: 1,
  mt: "auto", // Push footer to the bottom
};
