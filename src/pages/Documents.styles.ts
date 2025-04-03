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

export const noDocumentsText: SxProps<Theme> = {
  textAlign: "center",
  my: 4,
};

export const documentList: SxProps<Theme> = {
  width: "100%",
  bgcolor: "background.paper",
};

export const downloadButton: SxProps<Theme> = {
  ml: 2,
};
