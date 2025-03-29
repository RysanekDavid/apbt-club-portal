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
    error: string;
    warning: string;
    info: string;
    success: string;
  };
  typographyScale: Record<
    string,
    { fontSize: string; lineHeight: number; fontWeight?: number }
  >;
  radii: Record<string, string>;
  shadows: string[];
}

const themeConfig: ThemeConfig = {
  spacingUnit: 8, // Increased from 4 to 8 for better spacing
  spacingScale: (factor) => `${factor * 8}px`,
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
    // Black & White Theme Palette
    primary: ["#000000", "#212121", "#424242", "#616161", "#757575"], // Shades of black/dark grey
    secondary: ["#ffffff", "#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0"], // Shades of white/light grey
    neutral: [
      "#ffffff", // White
      "#fafafa", // Off-white
      "#f5f5f5", // Light grey 1
      "#eeeeee", // Light grey 2
      "#e0e0e0", // Light grey 3
      "#bdbdbd", // Medium grey 1
      "#9e9e9e", // Medium grey 2
      "#757575", // Dark grey 1
      "#616161", // Dark grey 2
      "#424242", // Dark grey 3
      "#212121", // Very dark grey
      "#000000", // Black
    ],
    // Keep functional colors, maybe adjust saturation/brightness if needed
    error: "#d32f2f", // Standard red
    warning: "#ffa000", // Amber
    info: "#1976d2", // Blue
    success: "#388e3c", // Green
  },
  typographyScale: {
    h1: { fontSize: "2.5rem", lineHeight: 1.2, fontWeight: 700 },
    h2: { fontSize: "2rem", lineHeight: 1.3, fontWeight: 700 },
    h3: { fontSize: "1.75rem", lineHeight: 1.4, fontWeight: 600 },
    h4: { fontSize: "1.5rem", lineHeight: 1.4, fontWeight: 600 },
    h5: { fontSize: "1.25rem", lineHeight: 1.5, fontWeight: 500 },
    h6: { fontSize: "1.125rem", lineHeight: 1.5, fontWeight: 500 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
    button: { fontSize: "0.875rem", lineHeight: 1.75, fontWeight: 500 },
    caption: { fontSize: "0.75rem", lineHeight: 1.66 },
    overline: { fontSize: "0.75rem", lineHeight: 2.66, fontWeight: 500 },
  },
  radii: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    pill: "999px",
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)",
    "0px 3px 3px -2px rgba(0,0,0,0.1),0px 2px 6px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)",
    "0px 3px 4px -2px rgba(0,0,0,0.1),0px 3px 8px 0px rgba(0,0,0,0.07),0px 1px 12px 0px rgba(0,0,0,0.06)",
    "0px 4px 5px -2px rgba(0,0,0,0.1),0px 4px 10px 0px rgba(0,0,0,0.07),0px 1px 16px 0px rgba(0,0,0,0.06)",
  ],
};

const theme = createTheme({
  breakpoints: themeConfig.breakpoints,
  palette: {
    mode: "light", // Set the mode explicitly (can be 'dark' too)
    primary: {
      // Reverted to black/dark grey as primary
      main: themeConfig.colors.primary[1], // #212121 (Very dark grey)
      light: themeConfig.colors.primary[2], // #424242
      dark: themeConfig.colors.primary[0], // #000000 (Black)
      contrastText: themeConfig.colors.neutral[0], // White text on dark primary
    },
    secondary: {
      // Reverted to medium grey as secondary
      main: themeConfig.colors.neutral[7], // #616161 (Dark Grey 2)
      light: themeConfig.colors.neutral[6], // #757575
      dark: themeConfig.colors.neutral[8], // #424242
      contrastText: themeConfig.colors.neutral[0], // White text on grey secondary
    },
    error: {
      main: themeConfig.colors.error, // Keep error color
    },
    warning: {
      main: themeConfig.colors.warning, // Keep warning color
    },
    info: {
      main: themeConfig.colors.info, // Keep info color
    },
    success: {
      main: themeConfig.colors.success, // Keep success color
    },
    text: {
      // Dark text on light background
      primary: themeConfig.colors.neutral[10], // #212121
      secondary: themeConfig.colors.neutral[8], // #616161
      disabled: themeConfig.colors.neutral[6], // #9e9e9e
    },
    background: {
      // Reverted to light background
      default: themeConfig.colors.neutral[0], // #ffffff (White)
      paper: themeConfig.colors.neutral[0], // #ffffff (White for components like Card, Menu)
    },
    divider: themeConfig.colors.neutral[4], // #e0e0e0 (Light grey divider)
    action: {
      // Adjust action colors for light theme if needed
      active: "rgba(0, 0, 0, 0.54)", // Default MUI light
      hover: "rgba(0, 0, 0, 0.04)", // Default MUI light
      selected: "rgba(0, 0, 0, 0.08)", // Default MUI light
      disabled: "rgba(0, 0, 0, 0.26)", // Default MUI light
      disabledBackground: "rgba(0, 0, 0, 0.12)", // Default MUI light
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: themeConfig.typographyScale.h1.fontSize,
      lineHeight: themeConfig.typographyScale.h1.lineHeight,
      fontWeight: themeConfig.typographyScale.h1.fontWeight,
    },
    h2: {
      fontSize: themeConfig.typographyScale.h2.fontSize,
      lineHeight: themeConfig.typographyScale.h2.lineHeight,
      fontWeight: themeConfig.typographyScale.h2.fontWeight,
    },
    h3: {
      fontSize: themeConfig.typographyScale.h3.fontSize,
      lineHeight: themeConfig.typographyScale.h3.lineHeight,
      fontWeight: themeConfig.typographyScale.h3.fontWeight,
    },
    h4: {
      fontSize: themeConfig.typographyScale.h4.fontSize,
      lineHeight: themeConfig.typographyScale.h4.lineHeight,
      fontWeight: themeConfig.typographyScale.h4.fontWeight,
    },
    h5: {
      fontSize: themeConfig.typographyScale.h5.fontSize,
      lineHeight: themeConfig.typographyScale.h5.lineHeight,
      fontWeight: themeConfig.typographyScale.h5.fontWeight,
    },
    h6: {
      fontSize: themeConfig.typographyScale.h6.fontSize,
      lineHeight: themeConfig.typographyScale.h6.lineHeight,
      fontWeight: themeConfig.typographyScale.h6.fontWeight,
    },
    body1: {
      fontSize: themeConfig.typographyScale.body1.fontSize,
      lineHeight: themeConfig.typographyScale.body1.lineHeight,
    },
    body2: {
      fontSize: themeConfig.typographyScale.body2.fontSize,
      lineHeight: themeConfig.typographyScale.body2.lineHeight,
    },
    button: {
      fontSize: themeConfig.typographyScale.button.fontSize,
      lineHeight: themeConfig.typographyScale.button.lineHeight,
      fontWeight: themeConfig.typographyScale.button.fontWeight,
      textTransform: "none",
    },
    caption: {
      fontSize: themeConfig.typographyScale.caption.fontSize,
      lineHeight: themeConfig.typographyScale.caption.lineHeight,
    },
    overline: {
      fontSize: themeConfig.typographyScale.overline.fontSize,
      lineHeight: themeConfig.typographyScale.overline.lineHeight,
      fontWeight: themeConfig.typographyScale.overline.fontWeight,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
  },
  spacing: themeConfig.spacingUnit,
  shape: {
    borderRadius: parseInt(themeConfig.radii.sm),
  },
  shadows: themeConfig.shadows as any,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: themeConfig.colors.neutral[1],
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: themeConfig.colors.neutral[4],
            borderRadius: themeConfig.radii.pill,
          },
        },
      },
    },
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
          borderRadius: themeConfig.radii.md,
          padding: "8px 16px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: themeConfig.shadows[1],
          },
        },
        contained: {
          "&:hover": {
            boxShadow: themeConfig.shadows[2],
          },
        },
        sizeLarge: {
          padding: "12px 24px",
          fontSize: "1rem",
        },
        sizeSmall: {
          padding: "4px 12px",
          fontSize: "0.8125rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: themeConfig.radii.md,
            "& fieldset": {
              borderColor: themeConfig.colors.neutral[3],
            },
            "&:hover fieldset": {
              borderColor: themeConfig.colors.primary[2],
            },
            "&.Mui-focused fieldset": {
              borderColor: themeConfig.colors.primary[2],
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.md,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: themeConfig.colors.primary[2],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: themeConfig.colors.primary[2],
          },
        },
        input: {
          padding: "14px 16px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          "&.Mui-focused": {
            color: themeConfig.colors.primary[2],
          },
        },
        outlined: {
          transform: "translate(16px, 16px) scale(1)",
          "&.MuiInputLabel-shrink": {
            transform: "translate(16px, -6px) scale(0.75)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.md,
          boxShadow: themeConfig.shadows[1],
          "&:hover": {
            boxShadow: themeConfig.shadows[2],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: themeConfig.radii.md,
        },
        elevation1: {
          boxShadow: themeConfig.shadows[1],
        },
        elevation2: {
          boxShadow: themeConfig.shadows[2],
        },
        elevation3: {
          boxShadow: themeConfig.shadows[3],
        },
        elevation4: {
          boxShadow: themeConfig.shadows[4],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderBottom: `1px solid ${themeConfig.colors.neutral[2]}`,
        },
        head: {
          fontWeight: 600,
          backgroundColor: themeConfig.colors.neutral[1],
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: themeConfig.colors.neutral[1],
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.pill,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 500,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.sm,
          "&.Mui-selected": {
            backgroundColor: `${themeConfig.colors.primary[4]}`,
            color: themeConfig.colors.primary[0],
            "&:hover": {
              backgroundColor: `${themeConfig.colors.primary[3]}`,
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.875rem",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: themeConfig.radii.lg,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.md,
        },
      },
    },
  },
});

export default theme;
