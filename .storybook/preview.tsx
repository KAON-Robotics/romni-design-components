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
  },
};

export default preview;
