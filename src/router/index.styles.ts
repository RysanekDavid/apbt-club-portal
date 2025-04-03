import { SxProps, Theme } from "@mui/material/styles";

export const loadingFallbackContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 64px)", // Adjust based on AppBar height if necessary
};
