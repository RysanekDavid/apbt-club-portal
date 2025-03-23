import { createTheme } from "@mui/material/styles";

export interface ThemeConfig {
  spacingUnit: number;
  spacingScale: (factor: number) => string;
  breakpoints: {
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
  colors: {
    primary: string[];
    secondary: string[];
    neutral: string[];
  };
  typographyScale: Record<string, { fontSize: string; lineHeight: number }>;
  radii: Record<string, string>;
}

const themeConfig: ThemeConfig = {
  spacingUnit: 4,
  spacingScale: (factor) => `${factor * 4}px`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  colors: {
    primary: ["#000000", "#333333", "#666666"],
    secondary: ["#ffffff", "#f0f0f0", "#e0e0e0"],
    neutral: ["#ffffff", "#f8f8f8", "#e8e8e8", "#d0d0d0", "#808080", "#000000"],
  },
  typographyScale: {
    h1: { fontSize: "2.986rem", lineHeight: 1.2 },
    h2: { fontSize: "2.488rem", lineHeight: 1.3 },
    h3: { fontSize: "2.074rem", lineHeight: 1.4 },
    h4: { fontSize: "1.728rem", lineHeight: 1.4 },
    h5: { fontSize: "1.44rem", lineHeight: 1.5 },
    h6: { fontSize: "1.2rem", lineHeight: 1.5 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    caption: { fontSize: "0.833rem", lineHeight: 1.6 },
  },
  radii: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    pill: "999px",
  },
};

// Let's remove the shadows array and not use it in the theme

const theme = createTheme({
  breakpoints: themeConfig.breakpoints,
  palette: {
    primary: {
      main: themeConfig.colors.primary[0],
      contrastText: themeConfig.colors.secondary[0],
    },
    secondary: {
      main: themeConfig.colors.secondary[0],
      contrastText: themeConfig.colors.primary[0],
    },
    text: {
      primary: themeConfig.colors.primary[0],
      secondary: themeConfig.colors.primary[1],
    },
    action: {
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    ...themeConfig.typographyScale,
  },
  spacing: themeConfig.spacingUnit,
  components: {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: themeConfig.radii.sm,
        },
      },
    },
  },
});

export default theme;
