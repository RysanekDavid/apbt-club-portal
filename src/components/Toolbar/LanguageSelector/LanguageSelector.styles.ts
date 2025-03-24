import { styled } from "@mui/material/styles";

export const Container = styled("div")(() => ({
  marginLeft: "auto",
  padding: "0 1rem",
  display: "flex",
  alignItems: "center",
}));

export const LanguageItemContent = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

export const FlagContainer = styled("span")(() => ({
  width: "24px",
  height: "24px",
}));
