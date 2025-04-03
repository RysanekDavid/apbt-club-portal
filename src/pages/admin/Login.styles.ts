import { SxProps, Theme } from "@mui/material/styles";

export const rootContainer: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
};

export const gridContainer: SxProps<Theme> = {
  flexGrow: 1,
};

export const illustrationColumn: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 4,
  height: "100vh",
};

export const illustrationImage: SxProps<Theme> = {
  maxWidth: "60%",
  maxHeight: "60%",
  height: "auto",
  width: "auto",
};

export const formColumn: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 4,
};

export const formPaperMd = (
  theme: Theme,
  isImage1Loaded: boolean,
  isImage2Loaded: boolean
): SxProps<Theme> => ({
  p: 4,
  width: "100%",
  maxWidth: 400,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  opacity: isImage1Loaded && isImage2Loaded ? 1 : 0,
  transition: "opacity 0.5s ease-in-out",
});

export const formPaperSm: SxProps<Theme> = {
  p: 4,
  width: "100%",
  maxWidth: 400,
};

export const errorAlert: SxProps<Theme> = {
  mb: 2,
};

export const submitButton: SxProps<Theme> = {
  mt: 3,
  mb: 2,
};
