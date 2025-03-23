import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import Select from "@mui/material/Select";

export const Root = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  "& .MuiSelect-icon": {
    color: theme.palette.secondary.main,
  },
}));

export const LogoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
});

export const LogoLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
});

export const LanguageSelector = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginLeft: "20px",
});

export const Icon = styled(LanguageIcon)({
  color: "white",
});

export const SelectStyled = styled(Select)({
  color: "white",
  "&:before": { borderColor: "white" },
  "&:hover:not(.Mui-disabled):before": { borderColor: "white" },
});
