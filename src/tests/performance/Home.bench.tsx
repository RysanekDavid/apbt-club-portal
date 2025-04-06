import { bench, describe } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as CustomThemeProvider } from "../../contexts/ThemeContext";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Home from "../../pages/Home";
import { lightTheme } from "../../styles/theme";

const benchTheme = lightTheme;

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
});
