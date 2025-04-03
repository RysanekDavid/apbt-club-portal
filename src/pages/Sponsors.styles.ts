import { SxProps, Theme } from "@mui/material/styles";

export const pageContainer: SxProps<Theme> = {
  py: 4,
};

export const pageTitle: SxProps<Theme> = {
  mb: 4,
};

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  mb: 4,
};

export const sponsorCard: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export const cardMedia: SxProps<Theme> = {
  height: 140,
  objectFit: "contain",
  p: 2,
};

export const cardContent: SxProps<Theme> = {
  flexGrow: 1,
};

export const cardActions: SxProps<Theme> = {
  justifyContent: "center",
  pb: 2,
};
