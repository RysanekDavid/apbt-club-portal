import { SxProps, Theme } from "@mui/material/styles";

export const rootBox: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  position: "relative",
  zIndex: 0,
  // Note: backgroundColor is theme-dependent and kept inline in the component
};

export const appBar: SxProps<Theme> = {
  zIndex: 1, // Ensure AppBar is above background
};

export const mainContent: SxProps<Theme> = {
  flexGrow: 1,
  position: "relative", // Ensure content is layered above background
  zIndex: 1,
};

export const footerBox: SxProps<Theme> = {
  zIndex: 1,
  mt: "auto", // Push footer to the bottom
};
