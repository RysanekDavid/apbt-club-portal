import { SxProps, Theme } from "@mui/material/styles";

// Existing styles (keeping them)
export const statsGrid: SxProps<Theme> = {
  mb: 4, // Kept from original, might be overridden by combinedGrid below
};

export const statCardContent: SxProps<Theme> = {
  textAlign: "center", // Kept from original, might not be used anymore
};

export const statIconBox = (color: string): SxProps<Theme> => ({
  color: color, // Kept from original, might not be used anymore
  mb: 2,
});

export const recentItemsPaper: SxProps<Theme> = {
  p: 2, // Kept from original, might be overridden by recentActivitiesCard below
};

export const welcomePaper: SxProps<Theme> = {
  p: 3, // Updated padding from original
  mb: 4,
};

// New styles extracted from Dashboard.tsx
export const rootBox: SxProps<Theme> = {
  p: 3,
};

export const headerBox: SxProps<Theme> = {
  mb: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const combinedGrid: SxProps<Theme> = {
  mb: 4,
};

export const combinedCard: SxProps<Theme> = {
  height: "100%", // Ensure cards have same height
};

export const combinedCardContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%", // Fill height
};

export const combinedCardAvatarBox: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 2,
};

export const combinedCardAvatar = (
  bgColor: string,
  color: string
): SxProps<Theme> => ({
  bgcolor: bgColor,
  color: color,
  width: 48,
  height: 48,
  mr: 2,
});

export const combinedCardTextBox: SxProps<Theme> = {
  // No specific styles needed here currently, but defined for structure
};

export const combinedCardTitle: SxProps<Theme> = {
  fontWeight: "medium", // Using string value as per MUI Typography
};

export const combinedCardCount: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const combinedCardButton: SxProps<Theme> = {
  // No specific styles needed here currently as color is passed directly
  // fullWidth is applied directly in the component
};

export const recentActivitiesGrid: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesCard: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesCardContent: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesTitle: SxProps<Theme> = {
  mb: 2,
};

export const recentActivitiesListItemBox: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesListItem: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesListItemDate: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesListItemPrimaryLink: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesListItemSecondary: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesDivider: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const recentActivitiesEmptyText: SxProps<Theme> = {
  // No specific styles needed here currently
};

export const loadingTypography: SxProps<Theme> = {
  // No specific styles needed here currently
};
