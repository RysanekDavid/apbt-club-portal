import { bench, describe } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as CustomThemeProvider } from "../../contexts/ThemeContext";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Home from "../../pages/Home"; // Adjust path as needed
import { lightTheme } from "../../styles/theme"; // Import the theme directly

// Use the imported theme directly
const benchTheme = lightTheme;

// Helper component to wrap Home with necessary providers
const BenchWrapper = ({ children }: { children: React.ReactNode }) => (
  <CustomThemeProvider>
    <MuiThemeProvider theme={benchTheme}>
      <LanguageProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </LanguageProvider>
    </MuiThemeProvider>
  </CustomThemeProvider>
);

describe("Home Page Render Performance", () => {
  bench("rendering Home component", () => {
    render(
      <BenchWrapper>
        <Home />
      </BenchWrapper>
    );
  });

  // You could add more benchmarks here, e.g., for specific interactions
  // bench('some interaction on Home', async () => {
  //   const { getByText } = render(<BenchWrapper><Home /></BenchWrapper>);
  //   const user = userEvent.setup();
  //   await user.click(getByText('Some Button')); // Example interaction
  // });
});
