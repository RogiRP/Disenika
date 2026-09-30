import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("une las clases válidas con un espacio", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("descarta valores falsos, nulos y vacíos", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });
});
