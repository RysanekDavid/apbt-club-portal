import { styled } from "@mui/material/styles";
import MuiToolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { NavLink, Link } from "react-router-dom";
import pawIcon from "../../assets/paw.png";
import pawInvertedIcon from "../../assets/paw_inverted.png";

export const Root = styled(MuiToolbar)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100],
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  boxShadow: theme.shadows[2],
  zIndex: theme.zIndex.appBar,
  position: "relative",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
  },
}));

export const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const LogoLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  "& img": {
    height: "3.5rem",
    marginRight: theme.spacing(1.5),
    verticalAlign: "middle",
  },
}));

export const DesktopNav = styled("nav")(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  transition:
    "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
  position: "relative",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.action.hover
        : theme.palette.action.hover,
  },
  "&.active": {
    fontWeight: "bold",
    "&::before": {
      content: '""',
      display: "inline-block",
      width: "1.2em",
      height: "1.1em",
      marginRight: theme.spacing(0.25),
      verticalAlign: "text-bottom",
      backgroundImage: `url(${
        theme.palette.mode === "dark" ? pawInvertedIcon : pawIcon
      })`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
}));

export const ExternalNavLinkStyled = styled("a")(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}`,
  transition:
    "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
  position: "relative",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.action.hover
        : theme.palette.action.hover,
  },
}));

export const MobileMenuContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(1),
  fontSize: "1.5rem",
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: 1300,
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: 240,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
  },
}));

export const DrawerContentBox = styled(Box)({
  width: 240,
});

export const RightSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  [theme.breakpoints.down("md")]: {
    flexGrow: 1,
    justifyContent: "flex-end",

    "& > *:nth-last-of-type(1)": {
      order: -1,
    },
  },
}));
