import type { ThemeTokens } from "./schema";

export const DEFAULT_THEME: ThemeTokens = {
  schemaVersion: 1,
  colors: {
    primary: "#0f766e",
    background: "#ffffff",
    surface: "#f4f7f7",
    text: "#14232b",
  },
  typography: {
    headingFont: "figtree",
    bodyFont: "figtree",
  },
  radius: "md",
  buttonShape: "default",
  density: "comfortable",
  visualVariant: "classic",
};
