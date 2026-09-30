import { describe, expect, it } from "vitest";
import { contrastRatio } from "@/lib/color/color";
import { resolveColors } from "./derive";
import type { ThemeTokens } from "./schema";

type Colors = ThemeTokens["colors"];

const palettes: Record<string, Colors> = {
  claro: { primary: "#0f766e", background: "#ffffff", surface: "#f4f7f7", text: "#14232b" },
  primarioAmarillo: {
    primary: "#facc15",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#111827",
  },
  primarioMedio: { primary: "#3b82f6", background: "#ffffff", surface: "#eff6ff", text: "#0f172a" },
  primarioRojo: { primary: "#ef4444", background: "#fffafa", surface: "#fef2f2", text: "#1f1111" },
  oscuro: { primary: "#7dd3fc", background: "#0b1220", surface: "#131c2e", text: "#e6edf7" },
  oscuroPrimarioOscuro: {
    primary: "#1e3a8a",
    background: "#0b1220",
    surface: "#131c2e",
    text: "#e6edf7",
  },
  conAcento: {
    primary: "#1e3a8a",
    accent: "#b45309",
    background: "#fffdf8",
    surface: "#f5f1e8",
    text: "#1c1917",
  },
};

describe.each(Object.entries(palettes))("resolveColors con la paleta %s", (_name, palette) => {
  const colors = resolveColors(palette);
  const surfaces = [colors.background, colors.surface];

  it("mantiene 4.5:1 en texto atenuado, enlaces y errores sobre fondo y superficie", () => {
    for (const surface of surfaces) {
      expect(contrastRatio(colors.muted, surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.link, surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(colors.danger, surface)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("mantiene 3:1 en el borde de controles y en el indicador de foco", () => {
    for (const surface of surfaces) {
      expect(contrastRatio(colors.inputBorder, surface)).toBeGreaterThanOrEqual(3);
      expect(contrastRatio(colors.focus, surface)).toBeGreaterThanOrEqual(3);
    }
  });

  it("mantiene el borde decorativo más sutil que el borde de los controles", () => {
    for (const surface of surfaces) {
      expect(contrastRatio(colors.border, surface)).toBeLessThan(
        contrastRatio(colors.inputBorder, surface),
      );
      expect(contrastRatio(colors.border, surface)).toBeLessThan(3);
    }
  });

  it("mantiene 4.5:1 del texto sobre botones, también en hover", () => {
    expect(contrastRatio(colors.onPrimary, colors.primary)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(colors.onPrimary, colors.primaryHover)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(colors.onAccent, colors.accent)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(colors.onAccent, colors.accentHover)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("resolveColors", () => {
  it("usa el primario como acento cuando no se define uno", () => {
    const colors = resolveColors(palettes["claro"] as Colors);

    expect(colors.accent).toBe(colors.primary);
  });

  it("respeta un acento distinto del primario", () => {
    const colors = resolveColors(palettes["conAcento"] as Colors);

    expect(colors.accent).toBe("#b45309");
  });
});
