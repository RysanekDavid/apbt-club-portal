import { createTheme, ThemeOptions } from "@mui/material/styles";

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
  spacingUnit: 8,
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
    primary: ["#000000", "#212121", "#424242", "#616161", "#757575"], // Shades of black/dark grey
    secondary: ["#ffffff", "#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0"], // Shades of white/light grey
    neutral: [
      "#ffffff", // 0: White
      "#fafafa", // 1: Off-white
      "#f5f5f5", // 2: Light grey 1
      "#eeeeee", // 3: Light grey 2
      "#e0e0e0", // 4: Light grey 3
      "#bdbdbd", // 5: Medium grey 1
      "#9e9e9e", // 6: Medium grey 2
      "#757575", // 7: Dark grey 1
      "#616161", // 8: Dark grey 2
      "#424242", // 9: Dark grey 3
      "#212121", // 10: Very dark grey
      "#000000", // 11: Black
    ],
    error: "#d32f2f",
    warning: "#ffa000",
    info: "#1976d2",
    success: "#388e3c",
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

// --- Base Theme Options (Common settings) ---
const baseThemeOptions: Omit<ThemeOptions, "palette" | "components"> = {
  breakpoints: themeConfig.breakpoints,
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: themeConfig.typographyScale.h1,
    h2: themeConfig.typographyScale.h2,
    h3: themeConfig.typographyScale.h3,
    h4: themeConfig.typographyScale.h4,
    h5: themeConfig.typographyScale.h5,
    h6: themeConfig.typographyScale.h6,
    body1: themeConfig.typographyScale.body1,
    body2: themeConfig.typographyScale.body2,
    button: { ...themeConfig.typographyScale.button, textTransform: "none" },
    caption: themeConfig.typographyScale.caption,
    overline: {
      ...themeConfig.typographyScale.overline,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
  },
  spacing: themeConfig.spacingUnit,
  shape: {
    borderRadius: parseInt(themeConfig.radii.sm),
  },
  shadows: themeConfig.shadows as any, // Cast needed as MUI expects specific length array
};

// --- Light Theme ---
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "light",
    primary: {
      main: themeConfig.colors.primary[1], // #212121
      light: themeConfig.colors.primary[2], // #424242
      dark: themeConfig.colors.primary[0], // #000000
      contrastText: themeConfig.colors.neutral[0], // White
    },
    secondary: {
      main: themeConfig.colors.neutral[7], // #757575
      light: themeConfig.colors.neutral[6], // #9e9e9e
      dark: themeConfig.colors.neutral[8], // #616161
      contrastText: themeConfig.colors.neutral[0], // White
    },
    error: { main: themeConfig.colors.error },
    warning: { main: themeConfig.colors.warning },
    info: { main: themeConfig.colors.info },
    success: { main: themeConfig.colors.success },
    text: {
      primary: themeConfig.colors.neutral[10], // Dark text
      secondary: themeConfig.colors.neutral[8],
      disabled: themeConfig.colors.neutral[6],
    },
    background: {
      default: themeConfig.colors.neutral[0], // White
      paper: themeConfig.colors.neutral[0], // White
    },
    divider: themeConfig.colors.neutral[4], // Light grey divider
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "8px", height: "8px" },
          "&::-webkit-scrollbar-track": {
            background: themeConfig.colors.neutral[1],
          }, // Very light grey track
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: themeConfig.colors.neutral[5],
            borderRadius: themeConfig.radii.pill,
          }, // Medium grey thumb
        },
      },
    },
    MuiButtonGroup: { styleOverrides: { root: { boxShadow: "none" } } },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: themeConfig.radii.md,
          padding: "8px 16px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": { boxShadow: themeConfig.shadows[1] },
        },
        contained: { "&:hover": { boxShadow: themeConfig.shadows[2] } },
        sizeLarge: { padding: "12px 24px", fontSize: "1rem" },
        sizeSmall: { padding: "4px 12px", fontSize: "0.8125rem" },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: themeConfig.radii.md,
            "& fieldset": { borderColor: themeConfig.colors.neutral[5] }, // Medium grey border
            "&:hover fieldset": { borderColor: themeConfig.colors.primary[1] }, // Darker primary on hover
            "&.Mui-focused fieldset": {
              borderColor: themeConfig.colors.primary[1],
            }, // Darker primary when focused
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.md,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: themeConfig.colors.primary[1],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: themeConfig.colors.primary[1],
          },
        },
        input: { padding: "14px 16px" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          "&.Mui-focused": { color: themeConfig.colors.primary[1] },
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
          "&:hover": { boxShadow: themeConfig.shadows[2] },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: themeConfig.radii.md },
        elevation1: { boxShadow: themeConfig.shadows[1] },
        elevation2: { boxShadow: themeConfig.shadows[2] },
        elevation3: { boxShadow: themeConfig.shadows[3] },
        elevation4: { boxShadow: themeConfig.shadows[4] },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderBottom: `1px solid ${themeConfig.colors.neutral[2]}`,
        }, // Light grey border
        head: {
          fontWeight: 600,
          backgroundColor: themeConfig.colors.neutral[1],
        }, // Very light grey head
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: { "&:hover": { backgroundColor: themeConfig.colors.neutral[1] } },
      },
    }, // Very light grey hover
    MuiChip: {
      styleOverrides: { root: { borderRadius: themeConfig.radii.pill } },
    },
    MuiAvatar: {
      styleOverrides: { root: { fontSize: "1rem", fontWeight: 500 } },
    },
    MuiListItem: {
      styleOverrides: { root: { paddingTop: 8, paddingBottom: 8 } },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.sm,
          "&.Mui-selected": {
            backgroundColor: themeConfig.colors.neutral[3],
            color: themeConfig.colors.primary[0],
            "&:hover": { backgroundColor: themeConfig.colors.neutral[4] },
          }, // Adjusted selection colors
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 500, fontSize: "0.875rem" },
      },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: themeConfig.radii.lg } },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: themeConfig.radii.md },
        standardInfo: {
          backgroundColor: "#e3f2fd",
          color: "#0d47a1",
          "& .MuiAlert-icon": { color: "#1976d2" },
        }, // Lighter blue info
      },
    },
  },
});

// --- Dark Theme ---
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "dark",
    primary: {
      // Use lighter shades for primary in dark mode for contrast
      main: themeConfig.colors.neutral[3], // Light grey 2
      light: themeConfig.colors.neutral[2], // Light grey 1
      dark: themeConfig.colors.neutral[5], // Medium grey 1
      contrastText: themeConfig.colors.neutral[11], // Black text
    },
    secondary: {
      // Use medium grey for secondary
      main: themeConfig.colors.neutral[7], // Dark grey 1
      light: themeConfig.colors.neutral[6], // Medium grey 2
      dark: themeConfig.colors.neutral[9], // Dark grey 3
      contrastText: themeConfig.colors.neutral[0], // White text
    },
    error: { main: "#f44336" }, // Slightly brighter red
    warning: { main: "#ffa726" }, // Slightly brighter orange
    info: { main: "#29b6f6" }, // Slightly brighter blue
    success: { main: "#66bb6a" }, // Slightly brighter green
    text: {
      primary: themeConfig.colors.neutral[0], // White text
      secondary: themeConfig.colors.neutral[4], // Light grey 3
      disabled: themeConfig.colors.neutral[7], // Dark grey 1
    },
    background: {
      default: themeConfig.colors.neutral[10], // Very dark grey
      paper: themeConfig.colors.neutral[9], // Dark grey 3
    },
    divider: themeConfig.colors.neutral[8], // Dark grey 2 divider
    action: {
      active: "rgba(255, 255, 255, 0.7)",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "8px", height: "8px" },
          "&::-webkit-scrollbar-track": {
            background: themeConfig.colors.neutral[9],
          }, // Dark grey track
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: themeConfig.colors.neutral[7],
            borderRadius: themeConfig.radii.pill,
          }, // Lighter grey thumb
        },
      },
    },
    MuiButtonGroup: { styleOverrides: { root: { boxShadow: "none" } } },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: themeConfig.radii.md,
          padding: "8px 16px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": { boxShadow: themeConfig.shadows[1] },
        }, // Keep subtle shadow on hover
        containedPrimary: {
          backgroundColor: themeConfig.colors.neutral[3],
          color: themeConfig.colors.neutral[11],
          "&:hover": { backgroundColor: themeConfig.colors.neutral[4] },
        },
        containedSecondary: {
          backgroundColor: themeConfig.colors.neutral[7],
          color: themeConfig.colors.neutral[0],
          "&:hover": { backgroundColor: themeConfig.colors.neutral[6] },
        },
        outlinedPrimary: {
          borderColor: themeConfig.colors.neutral[5],
          color: themeConfig.colors.neutral[3],
          "&:hover": {
            borderColor: themeConfig.colors.neutral[4],
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        },
        sizeLarge: { padding: "12px 24px", fontSize: "1rem" },
        sizeSmall: { padding: "4px 12px", fontSize: "0.8125rem" },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": { color: themeConfig.colors.neutral[3] }, // Lighter focus color for label
          "& .MuiOutlinedInput-root": {
            borderRadius: themeConfig.radii.md,
            "& fieldset": { borderColor: themeConfig.colors.neutral[7] }, // Dark grey border
            "&:hover fieldset": { borderColor: themeConfig.colors.neutral[5] }, // Medium grey on hover
            "&.Mui-focused fieldset": {
              borderColor: themeConfig.colors.neutral[3],
            }, // Lighter grey when focused
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.md,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: themeConfig.colors.neutral[5],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: themeConfig.colors.neutral[3],
          },
        },
        input: { padding: "14px 16px" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          "&.Mui-focused": { color: themeConfig.colors.neutral[3] },
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
          backgroundImage: "none",
          backgroundColor: themeConfig.colors.neutral[9],
          "&:hover": { boxShadow: themeConfig.shadows[2] },
        },
      },
    }, // Remove gradient, set bg
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: themeConfig.radii.md },
        elevation1: {
          boxShadow: themeConfig.shadows[1],
          backgroundImage: "none",
          backgroundColor: themeConfig.colors.neutral[9],
        }, // Dark paper
        elevation2: {
          boxShadow: themeConfig.shadows[2],
          backgroundImage: "none",
          backgroundColor: themeConfig.colors.neutral[9],
        },
        elevation3: {
          boxShadow: themeConfig.shadows[3],
          backgroundImage: "none",
          backgroundColor: themeConfig.colors.neutral[9],
        },
        elevation4: {
          boxShadow: themeConfig.shadows[4],
          backgroundImage: "none",
          backgroundColor: themeConfig.colors.neutral[9],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderBottom: `1px solid ${themeConfig.colors.neutral[8]}`,
        }, // Darker grey border
        head: {
          fontWeight: 600,
          backgroundColor: themeConfig.colors.neutral[8],
        }, // Dark grey head
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: { "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" } },
      },
    }, // Subtle white hover
    MuiChip: {
      styleOverrides: { root: { borderRadius: themeConfig.radii.pill } },
    },
    MuiAvatar: {
      styleOverrides: { root: { fontSize: "1rem", fontWeight: 500 } },
    },
    MuiListItem: {
      styleOverrides: { root: { paddingTop: 8, paddingBottom: 8 } },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: themeConfig.radii.sm,
          "&.Mui-selected": {
            backgroundColor: themeConfig.colors.neutral[8],
            color: themeConfig.colors.neutral[0],
            "&:hover": { backgroundColor: themeConfig.colors.neutral[7] },
          }, // Adjusted selection colors
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 500, fontSize: "0.875rem" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: themeConfig.radii.lg,
          backgroundImage: "none",
          backgroundColor: themeConfig.colors.neutral[9],
        },
      },
    }, // Dark dialog
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: themeConfig.radii.md },
        standardInfo: {
          backgroundColor: "#0277bd",
          color: "#e1f5fe",
          "& .MuiAlert-icon": { color: "#81d4fa" },
        }, // Darker blue info
        standardSuccess: {
          backgroundColor: "#2e7d32",
          color: "#e8f5e9",
          "& .MuiAlert-icon": { color: "#a5d6a7" },
        },
        standardWarning: {
          backgroundColor: "#ed6c02",
          color: "#fff3e0",
          "& .MuiAlert-icon": { color: "#ffcc80" },
        },
        standardError: {
          backgroundColor: "#c62828",
          color: "#ffebee",
          "& .MuiAlert-icon": { color: "#ef9a9a" },
        },
      },
    },
  },
});
