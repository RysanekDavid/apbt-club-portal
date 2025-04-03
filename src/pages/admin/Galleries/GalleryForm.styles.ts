import { SxProps, Theme } from "@mui/material/styles";

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const headerBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 3,
};

export const errorAlert: SxProps<Theme> = {
  mb: 3,
};

export const formPaper: SxProps<Theme> = {
  p: 3,
};

export const coverImageErrorText: SxProps<Theme> = {
  mt: 1,
};

export const uploadButton: SxProps<Theme> = {
  mb: 1,
};

export const selectedFilesPaper: SxProps<Theme> = {
  p: 1,
  mb: 2,
};

export const uploadedImagesPaper: SxProps<Theme> = {
  p: 1,
};

export const formDivider: SxProps<Theme> = {
  my: 2,
};

export const actionsGrid: SxProps<Theme> = {
  display: "flex",
  justifyContent: "flex-end",
};

export const cancelButton: SxProps<Theme> = {
  mr: 2,
};
