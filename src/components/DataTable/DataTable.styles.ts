import { SxProps, Theme } from "@mui/material/styles";

export const rootPaper: SxProps<Theme> = {
  width: "100%",
  overflow: "hidden",
};

export const headerBox: SxProps<Theme> = {
  p: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const tableContainer: SxProps<Theme> = {
  maxHeight: 440, // Consider making this dynamic or configurable if needed
};
