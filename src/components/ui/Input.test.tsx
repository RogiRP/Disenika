import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../tests/helpers/axe";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

describe("Input", () => {
  it("asocia la etiqueta con el campo", () => {
    render(<Input label="Nombre" />);

    expect(screen.getByLabelText("Nombre").tagName).toBe("INPUT");
  });

  it("marca el campo como obligatorio para tecnologías de asistencia", () => {
    render(<Input label="Teléfono" required />);

    const input = screen.getByLabelText(/Teléfono/) as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it("vincula la ayuda con aria-describedby", () => {
    render(<Input label="Teléfono" hint="Incluye la lada" />);

    const input = screen.getByLabelText("Teléfono");
    const hint = screen.getByText("Incluye la lada");
    expect(input.getAttribute("aria-describedby")).toBe(hint.id);
  });

  it("marca el campo inválido y vincula el mensaje de error", () => {
    render(<Input label="Correo" error="Escribe un correo válido" />);

    const input = screen.getByLabelText("Correo");
    const error = screen.getByText("Escribe un correo válido");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBe(error.id);
  });

  it("vincula ayuda y error a la vez", () => {
    render(
      <Input label="Correo" hint="Usaremos este correo para responder" error="Falta el correo" />,
    );

    const input = screen.getByLabelText("Correo");
    const ids = (input.getAttribute("aria-describedby") ?? "").split(" ");
    expect(ids).toContain(screen.getByText("Usaremos este correo para responder").id);
    expect(ids).toContain(screen.getByText("Falta el correo").id);
  });

  it("no marca aria-invalid ni aria-describedby sin ayuda ni error", () => {
    render(<Input label="Nombre" />);

    const input = screen.getByLabelText("Nombre");
    expect(input.hasAttribute("aria-invalid")).toBe(false);
    expect(input.hasAttribute("aria-describedby")).toBe(false);
  });

  it("mantiene la etiqueta accesible aunque esté oculta visualmente", () => {
    render(<Input label="Buscar" hideLabel />);

    expect(screen.getByLabelText("Buscar")).toBeTruthy();
    expect(screen.getByText("Buscar").className).toContain("sr-only");
  });

  it("genera identificadores únicos para varios campos", () => {
    render(
      <>
        <Input label="Nombre" />
        <Input label="Apellido" />
      </>,
    );

    expect(screen.getByLabelText("Nombre").id).not.toBe(screen.getByLabelText("Apellido").id);
  });
});

describe("Textarea", () => {
  it("asocia la etiqueta y usa 4 filas por defecto", () => {
    render(<Textarea label="Mensaje" />);

    const textarea = screen.getByLabelText("Mensaje") as HTMLTextAreaElement;
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea.rows).toBe(4);
  });

  it("vincula el error al campo", () => {
    render(<Textarea label="Mensaje" error="Escribe un mensaje" />);

    const textarea = screen.getByLabelText("Mensaje");
    expect(textarea.getAttribute("aria-invalid")).toBe("true");
    expect(textarea.getAttribute("aria-describedby")).toBe(
      screen.getByText("Escribe un mensaje").id,
    );
  });
});

describe("Select", () => {
  const options = [
    { value: "consulta", label: "Consulta general" },
    { value: "estudios", label: "Estudios" },
  ];

  it("asocia la etiqueta y renderiza las opciones", () => {
    render(<Select label="Servicio" options={options} />);

    const select = screen.getByLabelText("Servicio") as HTMLSelectElement;
    expect(select.options).toHaveLength(2);
  });

  it("agrega una opción vacía cuando hay placeholder", () => {
    render(<Select label="Servicio" options={options} placeholder="Elige un servicio" />);

    const select = screen.getByLabelText("Servicio") as HTMLSelectElement;
    expect(select.options).toHaveLength(3);
    expect(select.options[0]?.value).toBe("");
  });

  it("vincula el error al campo", () => {
    render(<Select label="Servicio" options={options} error="Elige un servicio" />);

    expect(screen.getByLabelText("Servicio").getAttribute("aria-invalid")).toBe("true");
  });
});

describe("Formulario completo", () => {
  it("no tiene violaciones de accesibilidad en ningún estado", async () => {
    const { container } = render(
      <form aria-label="Contacto">
        <Input label="Nombre" required />
        <Input label="Teléfono" hint="Incluye la lada" />
        <Input label="Correo" error="Escribe un correo válido" />
        <Select
          label="Servicio"
          placeholder="Elige un servicio"
          options={[{ value: "consulta", label: "Consulta general" }]}
        />
        <Textarea label="Mensaje" hint="No incluyas información médica" />
        <Input label="Campo deshabilitado" disabled />
      </form>,
    );

    await expectNoA11yViolations(container);
  });
});
