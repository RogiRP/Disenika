import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renderiza un párrafo por defecto", () => {
    render(<Text>Contenido</Text>);

    expect(screen.getByText("Contenido").tagName).toBe("P");
  });

  it("permite cambiar el elemento y el tono", () => {
    render(
      <Text as="span" tone="muted">
        Apoyo
      </Text>,
    );

    const element = screen.getByText("Apoyo");
    expect(element.tagName).toBe("SPAN");
    expect(element.className).toContain("text-muted");
  });
});
