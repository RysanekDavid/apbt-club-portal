import { SxProps, Theme } from "@mui/material/styles";

export const pageContainer: SxProps<Theme> = {
  my: 4,
};

export const pageSubtitle: SxProps<Theme> = {
  mb: 4,
};

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  my: 2,
};

export const noGalleriesText: SxProps<Theme> = {
  textAlign: "center",
  my: 4,
};

export const galleryCard: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export const cardActionArea: SxProps<Theme> = {
  flexGrow: 1,
};

export const cardMedia: SxProps<Theme> = {
  objectFit: "contain",
};

export const cardContent: SxProps<Theme> = {
  flexGrow: 1,
};
