import { styled } from "@mui/material/styles";
import { Button, Box, Typography, Menu, MenuItem } from "@mui/material";

export const Container = styled("div")({
  padding: "0 1rem",
  display: "flex",
  alignItems: "center",
});

export const LanguageButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  marginLeft: theme.spacing(1),
}));

export const ButtonFlagBox = styled(Box)(({ theme }) => ({
  width: 20,
  height: 15,
  marginRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
}));

export const ButtonTypography = styled(Typography)({
  color: "inherit",
});

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.selected, // Keep selected color on hover
    },
  },
}));

export const LanguageItemContent = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const FlagContainer = styled("span")({
  width: "2rem",
  height: "1.5rem",
});
