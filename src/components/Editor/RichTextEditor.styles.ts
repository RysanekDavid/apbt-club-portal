import { SxProps, Theme } from "@mui/material/styles";

export const rootBox: SxProps<Theme> = {
  mb: 2,
};

export const editorWrapper = (
  theme: Theme,
  error?: string,
  height?: string
): SxProps<Theme> => ({
  border: error
    ? `1px solid ${theme.palette.error.main}`
    : `1px solid ${theme.palette.divider}`,
  borderRadius: 1,
  overflow: "hidden",
  "& .ck-editor__editable": {
    minHeight: height || "300px", // Default height if not provided
    maxHeight: "600px",
  },
});
