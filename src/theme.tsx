import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import type { PropsWithChildren } from "react";

export const romniDarkTokens = {
  "--romni-page": "#121212",
  "--romni-surface": "#1c1c1c",
  "--romni-surface-subtle": "#262626",
  "--romni-surface-raised": "#323232",
  "--romni-surface-glass": "rgba(28,28,28,.95)",
  "--romni-help-bg": "#323232",
  "--romni-button-hover": "#505050",
  "--romni-tooltip-bg": "#ededed",
  "--romni-tooltip-text": "#1c1c1c",
  "--romni-text": "#ededed",
  "--romni-text-muted": "#c2c2c2",
  "--romni-text-subtle": "#b0b0b0",
  "--romni-icon": "#d0d0d0",
  "--romni-control-border": "#858585",
  "--romni-control-mark": "#ededed",
  "--romni-on-solid": "#ffffff",
  "--romni-border": "#525252",
  "--romni-border-strong": "#909090",
  "--romni-blue-text": "#829cf5",
  "--romni-blue-bg": "#202b45",
  "--romni-blue-solid": "#3a57e8",
  "--romni-red-text": "#ff9aa3",
  "--romni-red-bg": "#3a222a",
  "--romni-red-solid": "#b42336",
  "--romni-orange-text": "#ffb987",
  "--romni-orange-bg": "#3d2c20",
  "--romni-orange-solid": "#9c4214",
  "--romni-yellow-text": "#ffd07e",
  "--romni-yellow-bg": "#3b311e",
  "--romni-yellow-solid": "#805600",
  "--romni-green-text": "#83dfb6",
  "--romni-green-bg": "#18372d",
  "--romni-green-solid": "#176b49",
  "--romni-cyan-text": "#85d9ee",
  "--romni-cyan-bg": "#18343f",
  "--romni-cyan-solid": "#096579",
  "--romni-purple-text": "#c8adff",
  "--romni-purple-bg": "#342744",
  "--romni-purple-solid": "#7440a3",
  "--romni-pink-text": "#ff9cdb",
  "--romni-pink-bg": "#3b2438",
  "--romni-pink-solid": "#9d286b",
  "--romni-scrim": "rgba(0,0,0,.65)",
} as const;

export const romniLightTheme = createTheme({
  palette: { primary: { main: "#173CBA", light: "#3A57E8" }, background: { default: "#F5F5F5", paper: "#FFFFFF" } },
  typography: { fontFamily: '"Manrope", "Pretendard Variable", Pretendard, sans-serif' },
});
export const romniDarkTheme = createTheme(romniLightTheme, {
  palette: {
    mode: "dark",
    primary: { main: "#3A57E8", light: "#3A57E8", dark: "#173CBA", contrastText: "#FFFFFF" },
    background: { default: "#121212", paper: "#1C1C1C" },
    text: { primary: "#EDEDED", secondary: "#C2C2C2", disabled: "#B0B0B0" },
    divider: "#525252",
    action: { active: "#D0D0D0", hover: "rgba(194,194,194,.08)", selected: "rgba(58,87,232,.16)", focus: "rgba(58,87,232,.24)", disabled: "#9E9E9E", disabledBackground: "#3A3A3A" },
    error: { main: "#FF8A94", contrastText: "#121212" },
    warning: { main: "#FFC76B", contrastText: "#121212" },
    success: { main: "#70D9AD", contrastText: "#121212" },
    info: { main: "#7DD3EC", contrastText: "#121212" },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiTooltip: { styleOverrides: { tooltip: { backgroundColor: "#EDEDED", color: "#1C1C1C" }, arrow: { color: "#EDEDED" } } },
  },
});

/** One document-wide provider also themes menus and tooltips rendered in portals. */
export const RomniThemeProvider = ({ mode, children }: PropsWithChildren<{ mode: "light" | "dark" }>) => (
  <ThemeProvider theme={mode === "dark" ? romniDarkTheme : romniLightTheme}>
    <CssBaseline />
    <GlobalStyles styles={{
      ":root": { ...(mode === "dark" ? romniDarkTokens : {}), colorScheme: mode },
      ":where(button, input, select, textarea)": { color: "inherit" },
    }} />
    {children}
  </ThemeProvider>
);
