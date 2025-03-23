import { styled } from "@mui/material/styles";

export const Container = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  padding: "0 1rem",
  display: "flex",
  alignItems: "center",
}));

export const LanguageItemContent = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

export const FlagContainer = styled("span")(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
}));
