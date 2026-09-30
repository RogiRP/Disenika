import { describe, expect, it } from "vitest";
import { isDesignSystemPageEnabled } from "./flags";

describe("isDesignSystemPageEnabled", () => {
  it("está habilitada fuera de producción", () => {
    expect(isDesignSystemPageEnabled({ NODE_ENV: "development" })).toBe(true);
    expect(isDesignSystemPageEnabled({ NODE_ENV: "test" })).toBe(true);
  });

  it("está deshabilitada en producción por defecto", () => {
    expect(isDesignSystemPageEnabled({ NODE_ENV: "production" })).toBe(false);
  });

  it("solo se habilita en producción con la bandera exacta", () => {
    expect(isDesignSystemPageEnabled({ NODE_ENV: "production", SHOW_DESIGN_SYSTEM: "true" })).toBe(
      true,
    );
    expect(isDesignSystemPageEnabled({ NODE_ENV: "production", SHOW_DESIGN_SYSTEM: "1" })).toBe(
      false,
    );
  });
});
