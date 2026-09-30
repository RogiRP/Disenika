import { describe, expect, it } from "vitest";
import { DEFAULT_THEME } from "./default-theme";
import { parseTheme } from "./schema";

describe("parseTheme", () => {
  it("acepta el tema por defecto", () => {
    expect(parseTheme(DEFAULT_THEME)).toEqual(DEFAULT_THEME);
  });

  it("acepta un color de acento opcional", () => {
    const theme = { ...DEFAULT_THEME, colors: { ...DEFAULT_THEME.colors, accent: "#b45309" } };

    expect(parseTheme(theme).colors.accent).toBe("#b45309");
  });

  it("rechaza colores que no son #rrggbb", () => {
    const theme = { ...DEFAULT_THEME, colors: { ...DEFAULT_THEME.colors, primary: "#fff" } };

    expect(() => parseTheme(theme)).toThrow(/colors\.primary/);
  });

  it("rechaza tipografías fuera de la lista permitida", () => {
    const theme = {
      ...DEFAULT_THEME,
      typography: { ...DEFAULT_THEME.typography, bodyFont: "comic" },
    };

    expect(() => parseTheme(theme)).toThrow(/typography\.bodyFont/);
  });

  it("rechaza texto sin contraste suficiente sobre el fondo", () => {
    const theme = { ...DEFAULT_THEME, colors: { ...DEFAULT_THEME.colors, text: "#cccccc" } };

    expect(() => parseTheme(theme)).toThrow(/contraste/);
  });

  it("rechaza propiedades desconocidas, como CSS arbitrario", () => {
    const theme = { ...DEFAULT_THEME, customCss: "body { display: none }" };

    expect(() => parseTheme(theme)).toThrow(/Tema inválido/);
  });

  it("rechaza variantes y versiones inexistentes", () => {
    expect(() => parseTheme({ ...DEFAULT_THEME, visualVariant: "neon" })).toThrow();
    expect(() => parseTheme({ ...DEFAULT_THEME, schemaVersion: 2 })).toThrow();
  });
});
