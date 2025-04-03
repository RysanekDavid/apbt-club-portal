import { SxProps, Theme } from "@mui/material/styles";

// Reusing styles similar to CloudinaryUpload
export const rootBox: SxProps<Theme> = {
  mb: 3,
};

export const uploadButton: SxProps<Theme> = {
  mb: 2,
};

export const progressBox: SxProps<Theme> = {
  width: "100%",
  mt: 2,
};

export const errorText: SxProps<Theme> = {
  mt: 1,
};

export const filePreviewContainer: SxProps<Theme> = {
  mt: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

export const imagePreview: SxProps<Theme> = {
  maxWidth: "100%",
  maxHeight: "200px",
  objectFit: "contain",
  mb: 1,
  border: "1px solid #ddd",
  borderRadius: 1,
};

export const fileInfoBox: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  p: 2,
  border: "1px solid #ddd",
  borderRadius: 1,
  mb: 1,
};

export const fileNameContainer: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
};

export const fileNameText: SxProps<Theme> = {
  mr: 1,
};
