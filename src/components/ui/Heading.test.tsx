import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it.each([1, 2, 3, 4, 5, 6] as const)("renderiza un h%i semántico", (level) => {
    render(<Heading level={level}>Título</Heading>);

    expect(screen.getByRole("heading", { level, name: "Título" })).toBeTruthy();
  });

  it("separa el tamaño visual del nivel semántico", () => {
    render(
      <Heading level={2} size="sm">
        Título
      </Heading>,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.className).toContain("text-xl");
    expect(heading.className).not.toContain("text-3xl");
  });

  it("usa el tamaño por defecto del nivel cuando no se indica", () => {
    render(<Heading level={1}>Título</Heading>);

    expect(screen.getByRole("heading", { level: 1 }).className).toContain("text-4xl");
  });
});
