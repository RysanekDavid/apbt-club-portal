import { SxProps, Theme } from "@mui/material/styles";

export const container: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
};

export const userName: SxProps<Theme> = {
  mr: 1,
  display: { xs: "none", sm: "block" },
};

export const iconButton: SxProps<Theme> = {
  ml: 1,
};

// Note: bgcolor and color are dynamic, so they remain in the component
export const avatar: SxProps<Theme> = {
  width: 40,
  height: 40,
  fontWeight: "bold",
};

export const menuItemIcon: SxProps<Theme> = {
  mr: 1,
};
