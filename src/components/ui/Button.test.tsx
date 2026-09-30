import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../tests/helpers/axe";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

describe("Button", () => {
  it("es de tipo button por defecto para no enviar formularios por accidente", () => {
    render(<Button>Enviar</Button>);

    expect(screen.getByRole("button", { name: "Enviar" }).getAttribute("type")).toBe("button");
  });

  it("permite ser de tipo submit", () => {
    render(<Button type="submit">Enviar</Button>);

    expect(screen.getByRole("button").getAttribute("type")).toBe("submit");
  });

  it("ejecuta el manejador de clic", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Enviar</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("no ejecuta el manejador cuando está deshabilitado", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Enviar
      </Button>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("se deshabilita y marca aria-busy mientras carga", () => {
    render(<Button loading>Enviar</Button>);

    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("no marca aria-busy cuando no está cargando", () => {
    render(<Button>Enviar</Button>);

    expect(screen.getByRole("button").hasAttribute("aria-busy")).toBe(false);
  });

  it("aplica variante, tamaño y ancho completo", () => {
    render(
      <Button variant="outline" size="lg" fullWidth>
        Enviar
      </Button>,
    );

    const { className } = screen.getByRole("button");
    expect(className).toContain("border-2");
    expect(className).toContain("min-h-12");
    expect(className).toContain("w-full");
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <div>
        <Button>Primario</Button>
        <Button variant="accent">Acento</Button>
        <Button variant="outline">Contorno</Button>
        <Button variant="ghost" disabled>
          Deshabilitado
        </Button>
        <Button loading>Cargando</Button>
      </div>,
    );

    await expectNoA11yViolations(container);
  });
});

describe("ButtonLink", () => {
  it("renderiza un enlace con el destino indicado", () => {
    render(<ButtonLink href="tel:+529990000000">Llamar</ButtonLink>);

    const link = screen.getByRole("link", { name: "Llamar" });
    expect(link.getAttribute("href")).toBe("tel:+529990000000");
  });

  it("abre en pestaña nueva de forma segura y lo anuncia", () => {
    render(
      <ButtonLink href="https://wa.me/529990000000" external>
        WhatsApp
      </ButtonLink>,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.textContent).toContain("se abre en una pestaña nueva");
  });

  it("no abre pestaña nueva por defecto", () => {
    render(<ButtonLink href="/contacto">Contacto</ButtonLink>);

    const link = screen.getByRole("link");
    expect(link.hasAttribute("target")).toBe(false);
    expect(link.textContent).not.toContain("pestaña nueva");
  });

  it("comparte los estilos del botón", () => {
    render(
      <ButtonLink href="/contacto" variant="accent">
        Contacto
      </ButtonLink>,
    );

    expect(screen.getByRole("link").className).toContain("bg-accent");
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <ButtonLink href="https://wa.me/529990000000" external>
        WhatsApp
      </ButtonLink>,
    );

    await expectNoA11yViolations(container);
  });
});
