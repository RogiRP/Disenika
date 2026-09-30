import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

const swatches = [
  { label: "Fondo", classes: "bg-background text-foreground border border-border" },
  { label: "Superficie", classes: "bg-surface text-foreground border border-border" },
  { label: "Primario", classes: "bg-primary text-on-primary" },
  { label: "Acento", classes: "bg-accent text-on-accent" },
  { label: "Texto atenuado", classes: "bg-background text-muted border border-border" },
  { label: "Enlace", classes: "bg-background text-link border border-border" },
  { label: "Error", classes: "bg-background text-danger border border-border" },
];

export function StatesGallery() {
  return (
    <Section tone="surface" aria-labelledby="gallery-heading">
      <Heading level={2} id="gallery-heading" size="lg">
        Colores, tipografía y estados
      </Heading>

      <Heading level={3} size="sm" className="mt-8">
        Colores del tema base
      </Heading>
      <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {swatches.map((swatch) => (
          <li
            key={swatch.label}
            className={`rounded-control p-4 text-sm font-semibold ${swatch.classes}`}
          >
            {swatch.label}
          </li>
        ))}
      </ul>

      <Heading level={3} size="sm" className="mt-8">
        Jerarquía tipográfica
      </Heading>
      <div className="mt-3 flex flex-col gap-3">
        <Heading level={4} size="xl">
          Título principal
        </Heading>
        <Heading level={4} size="lg">
          Título de sección
        </Heading>
        <Heading level={4} size="md">
          Subtítulo
        </Heading>
        <Text size="lg">Texto destacado para introducciones.</Text>
        <Text>Texto de cuerpo para descripciones y contenido general.</Text>
        <Text size="sm" tone="muted">
          Texto secundario para notas y apoyos.
        </Text>
      </div>

      <Heading level={3} size="sm" className="mt-8">
        Botones: variantes, tamaños y estados
      </Heading>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button size="sm">Pequeño</Button>
        <Button size="md">Mediano</Button>
        <Button size="lg">Grande</Button>
        <Button variant="accent">Acento</Button>
        <Button variant="outline">Contorno</Button>
        <Button variant="ghost">Fantasma</Button>
        <Button disabled>Deshabilitado</Button>
        <Button loading>Cargando</Button>
      </div>

      <Heading level={3} size="sm" className="mt-8">
        Campos: estados
      </Heading>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <Input label="Normal" name="normal" hint="Texto de ayuda" />
        <Input label="Con error" name="error" error="Este campo es obligatorio" />
        <Input label="Deshabilitado" name="deshabilitado" disabled />
      </div>
    </Section>
  );
}
