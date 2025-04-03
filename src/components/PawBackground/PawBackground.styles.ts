import { SxProps, Theme } from "@mui/material/styles";

export const backgroundContainer: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: -1,
  pointerEvents: "none",
};

// Individual paw styles depend on props, so they remain inline in the component
// However, we can define common properties here if needed, e.g., userSelect
export const pawImageBase: SxProps<Theme> = {
  position: "absolute",
  userSelect: "none",
};
