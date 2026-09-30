import { describe, expect, it } from "vitest";
import { themeStyle, themeToCssVars } from "./css-vars";
import { DEFAULT_THEME } from "./default-theme";
import { FONT_KEYS } from "./fonts";
import type { ThemeTokens } from "./schema";

const withOverrides = (overrides: Partial<ThemeTokens>): ThemeTokens => ({
  ...DEFAULT_THEME,
  ...overrides,
});

describe("themeToCssVars", () => {
  it("emite solo variables con el prefijo --theme-", () => {
    const keys = Object.keys(themeToCssVars(DEFAULT_THEME));

    expect(keys.length).toBeGreaterThan(0);
    expect(keys.every((key) => key.startsWith("--theme-"))).toBe(true);
  });

  it("emite colores en hexadecimal y nunca valores vacíos", () => {
    const vars = themeToCssVars(DEFAULT_THEME);

    expect(vars["--theme-primary"]).toBe("#0f766e");
    expect(vars["--theme-on-primary"]).toMatch(/^#[0-9a-f]{6}$/);
    expect(Object.values(vars).every((value) => value.length > 0)).toBe(true);
  });

  it("usa el primario como acento por defecto", () => {
    const vars = themeToCssVars(DEFAULT_THEME);

    expect(vars["--theme-accent"]).toBe(vars["--theme-primary"]);
  });

  it("aplica el radio elegido a controles y tarjetas", () => {
    const vars = themeToCssVars(withOverrides({ radius: "lg" }));

    expect(vars["--theme-radius-control"]).toBe("0.75rem");
    expect(vars["--theme-radius-card"]).toBe("1.25rem");
  });

  it("hace redondos los botones cuando la forma es pill", () => {
    const vars = themeToCssVars(withOverrides({ buttonShape: "pill" }));

    expect(vars["--theme-radius-button"]).toBe("9999px");
  });

  it("usa el radio de los controles para los botones por defecto", () => {
    const vars = themeToCssVars(DEFAULT_THEME);

    expect(vars["--theme-radius-button"]).toBe(vars["--theme-radius-control"]);
  });

  it("diferencia las variantes visuales en sombra, borde y peso de títulos", () => {
    const classic = themeToCssVars(withOverrides({ visualVariant: "classic" }));
    const modern = themeToCssVars(withOverrides({ visualVariant: "modern" }));

    expect(classic["--theme-card-shadow"]).toBe("none");
    expect(modern["--theme-card-shadow"]).not.toBe("none");
    expect(classic["--theme-card-border"]).toBe(classic["--theme-border"]);
    expect(modern["--theme-card-border"]).toBe("transparent");
    expect(classic["--theme-heading-weight"]).not.toBe(modern["--theme-heading-weight"]);
  });

  it("diferencia la densidad en el relleno de tarjetas", () => {
    const compact = themeToCssVars(withOverrides({ density: "compact" }));
    const comfortable = themeToCssVars(withOverrides({ density: "comfortable" }));

    expect(compact["--theme-card-padding"]).not.toBe(comfortable["--theme-card-padding"]);
  });

  it("resuelve una pila tipográfica para cada fuente permitida", () => {
    for (const font of FONT_KEYS) {
      const vars = themeToCssVars(
        withOverrides({ typography: { headingFont: font, bodyFont: font } }),
      );

      expect(vars["--theme-font-heading"]).toContain(`--font-`);
      expect(vars["--theme-font-body"]).toBe(vars["--theme-font-heading"]);
    }
  });
});

describe("themeStyle", () => {
  it("devuelve las mismas variables listas para el atributo style", () => {
    expect(themeStyle(DEFAULT_THEME)).toEqual(themeToCssVars(DEFAULT_THEME));
  });
});
