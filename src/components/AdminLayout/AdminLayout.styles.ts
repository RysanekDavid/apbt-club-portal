import { SxProps, Theme } from "@mui/material/styles";

export const rootBox: SxProps<Theme> = {
  display: "flex",
};

export const appBar = (drawerWidth: number): SxProps<Theme> => ({
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
});

export const menuButton: SxProps<Theme> = {
  mr: 2,
  display: { sm: "none" },
};

export const appBarTitle: SxProps<Theme> = {
  flexGrow: 1,
};

export const navBox = (drawerWidth: number): SxProps<Theme> => ({
  width: { sm: drawerWidth },
  flexShrink: { sm: 0 },
});

export const mobileDrawer = (drawerWidth: number): SxProps<Theme> => ({
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
});

export const desktopDrawer = (drawerWidth: number): SxProps<Theme> => ({
  display: { xs: "none", sm: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
});

export const mainContentBox = (drawerWidth: number): SxProps<Theme> => ({
  flexGrow: 1,
  p: 3,
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  mt: 8, // Corresponds to AppBar height
  minHeight: "calc(100vh - 64px)", // Adjust if AppBar height changes
  position: "relative",
  zIndex: 0, // Ensure content is above background
  // Note: backgroundColor is theme-dependent and kept inline in the component
});
