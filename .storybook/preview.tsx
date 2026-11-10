import { RomniThemeProvider } from "../src/theme";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  tags: ["autodocs"],
  initialGlobals: { theme: "light" },
  globalTypes: {
    theme: { description: "화면 테마", toolbar: { icon: "circlehollow", dynamicTitle: true, items: [
      { value: "light", title: "라이트" }, { value: "dark", title: "다크" },
    ] } },
  },
  decorators: [
    (Story, context) => (
      <RomniThemeProvider mode={context.globals.theme === "dark" ? "dark" : "light"}>
        <div style={{ width: "100%", padding: 24 }}>
          <Story />
        </div>
      </RomniThemeProvider>
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
