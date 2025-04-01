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

// If you also use neutral colors directly in components like <Box bgcolor="neutral.5">,
// you might need to augment the Color type as well, but let's start with Palette.
// declare module '@mui/system' {
//   interface Color {
//     neutral?: Record<number | string, string>;
//   }
// }
