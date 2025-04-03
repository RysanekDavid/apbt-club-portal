import { SxProps, Theme } from "@mui/material/styles";

export const statsGrid: SxProps<Theme> = {
  mb: 4,
};

export const statCardContent: SxProps<Theme> = {
  textAlign: "center",
};

export const statIconBox = (color: string): SxProps<Theme> => ({
  color: color,
  mb: 2,
});

export const recentItemsPaper: SxProps<Theme> = {
  p: 2,
};

export const welcomePaper: SxProps<Theme> = {
  p: 2,
};
