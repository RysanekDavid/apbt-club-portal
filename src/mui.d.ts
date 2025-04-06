import "@mui/material/styles";

declare module "@mui/material/styles" {
  // Allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteColorOptions | string[]; // Allow string array for our custom neutral scale
  }

  // Allow usage via `useTheme`
  interface Palette {
    neutral: PaletteColor | string[]; // Allow string array for our custom neutral scale
  }
}
