import { SxProps, Theme } from "@mui/material/styles";

export const pageContainer: SxProps<Theme> = {
  my: 4,
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
  mb: 0, // Remove bottom margin when used in headerBox
};

export const imageCard: SxProps<Theme> = {
  height: "100%",
};

export const imageCardActionArea: SxProps<Theme> = {
  height: "100%",
};

export const cardMedia: SxProps<Theme> = {
  aspectRatio: "1 / 1",
  objectFit: "cover",
};

export const noImagesText: SxProps<Theme> = {
  mt: 4,
};
