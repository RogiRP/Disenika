import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renderiza un div con relleno por defecto", () => {
    render(<Card data-testid="card">Contenido</Card>);

    const card = screen.getByTestId("card");
    expect(card.tagName).toBe("DIV");
    expect(card.className).toContain("p-card");
  });

  it("permite un elemento semántico y quitar el relleno", () => {
    render(
      <Card as="article" padded={false} data-testid="card">
        Contenido
      </Card>,
    );

    const card = screen.getByTestId("card");
    expect(card.tagName).toBe("ARTICLE");
    expect(card.className).not.toContain("p-card");
  });

  it("se conserva una clase adicional del consumidor", () => {
    render(
      <Card className="mt-4" data-testid="card">
        Contenido
      </Card>,
    );

    expect(screen.getByTestId("card").className).toContain("mt-4");
  });
});
