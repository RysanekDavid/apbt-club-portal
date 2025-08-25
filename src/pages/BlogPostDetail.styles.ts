import { SxProps, Theme } from "@mui/material/styles";

export const pageContainer: SxProps<Theme> = {
  my: 4,
  pb: 8,
};

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  my: 2,
};

export const headerBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

export const headerTitle: SxProps<Theme> = {
  mb: 0,
};

export const contentBox: SxProps<Theme> = {
  mt: 4,
};
