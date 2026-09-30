import { DEFAULT_THEME, parseTheme } from "@/features/theming";

export const demoThemes = [
  {
    id: "base",
    name: "Tema base de la plataforma",
    theme: DEFAULT_THEME,
  },
  {
    id: "moderno",
    name: "Consultorio moderno",
    theme: parseTheme({
      schemaVersion: 1,
      colors: {
        primary: "#0e7490",
        accent: "#f59e0b",
        background: "#ffffff",
        surface: "#ecfeff",
        text: "#0f172a",
      },
      typography: { headingFont: "figtree", bodyFont: "figtree" },
      radius: "lg",
      buttonShape: "pill",
      density: "comfortable",
      visualVariant: "modern",
    }),
  },
  {
    id: "clasico",
    name: "Especialista clásico",
    theme: parseTheme({
      schemaVersion: 1,
      colors: {
        primary: "#1e3a8a",
        accent: "#b45309",
        background: "#fffdf8",
        surface: "#f5f1e8",
        text: "#1c1917",
      },
      typography: { headingFont: "source-serif", bodyFont: "figtree" },
      radius: "sm",
      buttonShape: "default",
      density: "compact",
      visualVariant: "classic",
    }),
  },
  {
    id: "oscuro",
    name: "Fondo oscuro",
    theme: parseTheme({
      schemaVersion: 1,
      colors: {
        primary: "#7dd3fc",
        background: "#0b1220",
        surface: "#131c2e",
        text: "#e6edf7",
      },
      typography: { headingFont: "figtree", bodyFont: "figtree" },
      radius: "md",
      buttonShape: "default",
      density: "comfortable",
      visualVariant: "modern",
    }),
  },
] as const;
