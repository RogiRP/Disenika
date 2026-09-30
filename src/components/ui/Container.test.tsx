import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";
import { Section } from "./Section";

describe("Container", () => {
  it("renderiza el elemento semántico indicado", () => {
    render(<Container as="main">Contenido</Container>);

    expect(screen.getByRole("main").textContent).toBe("Contenido");
  });

  it("limita el ancho según el tamaño", () => {
    render(
      <Container size="narrow" data-testid="container">
        Contenido
      </Container>,
    );

    expect(screen.getByTestId("container").className).toContain("max-w-3xl");
  });
});

describe("Section", () => {
  it("envuelve su contenido en un contenedor", () => {
    render(
      <Section aria-label="Servicios" data-testid="section">
        Contenido
      </Section>,
    );

    const section = screen.getByRole("region", { name: "Servicios" });
    expect(section.firstElementChild?.className).toContain("max-w-6xl");
  });

  it("aplica el tono de superficie", () => {
    render(
      <Section tone="surface" aria-label="Servicios">
        Contenido
      </Section>,
    );

    expect(screen.getByRole("region").className).toContain("bg-surface");
  });
});
