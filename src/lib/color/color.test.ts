import { describe, expect, it } from "vitest";
import {
  BLACK,
  WHITE,
  bestOnColor,
  contrastRatio,
  ensureContrast,
  isHexColor,
  mix,
  parseHex,
  toHex,
} from "./color";

describe("parseHex y toHex", () => {
  it("convierte un color hexadecimal a canales", () => {
    expect(parseHex("#0f766e")).toEqual({ r: 15, g: 118, b: 110 });
  });

  it("rechaza formatos que no son #rrggbb", () => {
    expect(isHexColor("#fff")).toBe(false);
    expect(isHexColor("rojo")).toBe(false);
    expect(() => parseHex("#fff")).toThrow(/inválido/);
  });

  it("normaliza a minúsculas y limita los canales", () => {
    expect(toHex({ r: 15, g: 118, b: 110 })).toBe("#0f766e");
    expect(toHex({ r: 300, g: -5, b: 0 })).toBe("#ff0000");
  });
});

describe("contrastRatio", () => {
  it("da 21 entre blanco y negro", () => {
    expect(contrastRatio(WHITE, BLACK)).toBeCloseTo(21, 5);
  });

  it("da 1 entre colores iguales", () => {
    expect(contrastRatio("#336699", "#336699")).toBeCloseTo(1, 5);
  });

  it("respeta el umbral AA conocido del gris #767676 sobre blanco", () => {
    expect(contrastRatio("#767676", WHITE)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#777777", WHITE)).toBeLessThan(4.5);
  });
});

describe("mix", () => {
  it("devuelve los extremos con pesos 0 y 1", () => {
    expect(mix("#102030", "#ffffff", 0)).toBe("#102030");
    expect(mix("#102030", "#ffffff", 1)).toBe("#ffffff");
  });

  it("calcula el punto medio", () => {
    expect(mix(BLACK, WHITE, 0.5)).toBe("#808080");
  });
});

describe("bestOnColor", () => {
  it("elige blanco sobre fondos oscuros y negro sobre claros", () => {
    expect(bestOnColor("#0f766e")).toBe(WHITE);
    expect(bestOnColor("#facc15")).toBe(BLACK);
  });

  it("siempre alcanza 4.5:1 incluso con tonos medios", () => {
    for (const color of ["#3b82f6", "#ef4444", "#22c55e", "#808080", "#ff7f50"]) {
      expect(contrastRatio(color, bestOnColor(color))).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("ensureContrast", () => {
  it("no modifica un color que ya cumple", () => {
    expect(ensureContrast("#0f766e", [WHITE], 4.5, "#14232b")).toBe("#0f766e");
  });

  it("acerca el color al destino hasta cumplir el umbral", () => {
    const result = ensureContrast("#facc15", [WHITE], 4.5, "#14232b");

    expect(result).not.toBe("#facc15");
    expect(contrastRatio(result, WHITE)).toBeGreaterThanOrEqual(4.5);
  });

  it("cumple el umbral contra todos los fondos indicados", () => {
    const backgrounds = [WHITE, "#e2e8f0"];
    const result = ensureContrast("#64748b", backgrounds, 4.5, "#0f172a");

    for (const background of backgrounds) {
      expect(contrastRatio(result, background)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
