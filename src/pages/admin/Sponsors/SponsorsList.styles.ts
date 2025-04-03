import { SxProps, Theme } from "@mui/material/styles";

export const headerBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 3,
};

export const errorAlert: SxProps<Theme> = {
  mb: 3,
};

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const noDataPaper: SxProps<Theme> = {
  p: 3,
  textAlign: "center",
};

export const logoImage: SxProps<Theme> = {
  maxWidth: "100px",
  maxHeight: "50px",
  objectFit: "contain",
};
