import { SxProps, Theme } from "@mui/material/styles";

export const pageContainer: SxProps<Theme> = {
  py: 4,
};

export const eventCard: SxProps<Theme> = {
  mb: 2,
  display: "flex",
};

export const cardMedia: SxProps<Theme> = {
  height: { xs: 100, sm: "100%" },
  width: "100%",
  objectFit: "contain",
  backgroundColor: "#fff",
};

export const cardMediaPlaceholder: SxProps<Theme> = {
  ...cardMedia, // Inherit base styles
  filter: "grayscale(70%) opacity(70%)",
};

export const cardContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
};

export const eventTitle: SxProps<Theme> = {
  mt: 1,
};

export const chipsContainer: SxProps<Theme> = {
  mb: 1,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 1,
};

export const infoChip: SxProps<Theme> = {
  backgroundColor: "#000",
  color: "#fff",
  px: 1.5, // Adjusted padding for consistency
  py: 2,
  "& .MuiChip-icon": {
    color: "#fff",
  },
};

export const descriptionText: SxProps<Theme> = {
  mt: 1,
};

export const readMoreButtonContainer: SxProps<Theme> = {
  mt: 1,
  textAlign: "left",
};

export const readMoreButton: SxProps<Theme> = {
  py: 0.5,
  px: 1,
  textTransform: "none",
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  lineHeight: 1.4,
  minWidth: "auto",
  display: "inline-flex",
  verticalAlign: "baseline",
  mt: 1,
  "&:hover": {
    backgroundColor: "action.hover",
    borderColor: "text.primary",
  },
};

export const loadingBox: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  my: 4,
};

export const errorAlert: SxProps<Theme> = {
  mb: 3,
};

export const sectionTitle: SxProps<Theme> = {
  mt: 4,
};

export const sectionDivider: SxProps<Theme> = {
  mb: 3,
};

export const noEventsAlert: SxProps<Theme> = {
  mt: 3,
};
