import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const theme = createTheme({
  palette: {
    primary: { main: "#173CBA", light: "#3A57E8" },
    background: { default: "#F5F5F5", paper: "#FFFFFF" },
  },
  typography: {
    fontFamily: '"Manrope", "Pretendard Variable", Pretendard, sans-serif',
  },
});

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ width: "100%", padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: { toc: true },
    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" }, type: "mobile" },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" }, type: "tablet" },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" }, type: "desktop" },
      },
    },
    a11y: {
      test: "error",
    },
  },
};

export default preview;
