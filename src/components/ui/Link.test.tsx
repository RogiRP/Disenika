import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../tests/helpers/axe";
import { Link } from "./Link";

describe("Link", () => {
  it("renderiza un enlace subrayado por defecto", () => {
    render(<Link href="/servicios">Servicios</Link>);

    const link = screen.getByRole("link", { name: "Servicios" });
    expect(link.getAttribute("href")).toBe("/servicios");
    expect(link.className).toContain("underline");
  });

  it("marca la página actual para tecnologías de asistencia y sin depender solo del color", () => {
    render(
      <Link href="/servicios" variant="plain" current>
        Servicios
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("aria-current")).toBe("page");
    expect(link.className).toContain("underline");
    expect(link.className).toContain("font-semibold");
  });

  it("no marca aria-current cuando no es la página actual", () => {
    render(<Link href="/servicios">Servicios</Link>);

    expect(screen.getByRole("link").hasAttribute("aria-current")).toBe(false);
  });

  it("abre enlaces externos de forma segura y lo anuncia", () => {
    render(
      <Link href="https://example.com" external>
        Sitio externo
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.textContent).toContain("se abre en una pestaña nueva");
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <nav aria-label="Principal">
        <Link href="/" variant="plain" current>
          Inicio
        </Link>
        <Link href="/contacto" variant="plain">
          Contacto
        </Link>
      </nav>,
    );

    await expectNoA11yViolations(container);
  });
});
