import { SxProps, Theme } from "@mui/material/styles";

export const alertStyle: SxProps<Theme> = {
  width: "100%",
  backgroundColor: "#03045e", // Custom dark blue background
  color: "#ffffff", // White text
  "& .MuiAlert-icon": {
    color: "#ffffff", // White icon
  },
};
