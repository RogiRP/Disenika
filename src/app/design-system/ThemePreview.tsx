import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Link } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { Text } from "@/components/ui/Text";
import { Textarea } from "@/components/ui/Textarea";
import { themeStyle, type ThemeTokens } from "@/features/theming";

type ThemePreviewProps = {
  id: string;
  name: string;
  theme: ThemeTokens;
};

const serviceOptions = [
  { value: "consulta", label: "Consulta general" },
  { value: "seguimiento", label: "Consulta de seguimiento" },
];

export function ThemePreview({ id, name, theme }: ThemePreviewProps) {
  const headingId = `preview-${id}`;

  return (
    <div style={themeStyle(theme)} className="bg-background text-foreground">
      <Section aria-labelledby={headingId} className="border-t border-border">
        <Heading level={2} id={headingId} size="lg">
          {name}
        </Heading>
        <Text tone="muted" className="mt-2 max-w-prose">
          Los mismos componentes con una identidad visual distinta, definida solo por datos de tema.
        </Text>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <Heading level={3} size="md">
              Servicio de ejemplo
            </Heading>
            <Text className="mt-2">
              Descripción breve de un servicio con un enlace de ejemplo para{" "}
              <Link href="/design-system">conocer más</Link>.
            </Text>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href="/design-system" variant="primary">
                Agendar
              </ButtonLink>
              <ButtonLink href="/design-system" variant="accent">
                Llamar
              </ButtonLink>
              <ButtonLink href="/design-system" variant="outline">
                Ubicación
              </ButtonLink>
              <Button variant="ghost">Ver más</Button>
            </div>
          </Card>

          <Card>
            <Heading level={3} size="md">
              Formulario de contacto
            </Heading>
            <form aria-label={`Contacto, ${name}`} className="mt-4 flex flex-col gap-4">
              <Input label="Nombre" name="nombre" autoComplete="name" required />
              <Input
                label="Correo"
                name="correo"
                type="email"
                autoComplete="email"
                error="Escribe un correo válido"
              />
              <Select
                label="Servicio"
                name="servicio"
                placeholder="Elige un servicio"
                options={serviceOptions}
              />
              <Textarea label="Mensaje" name="mensaje" hint="No incluyas información médica" />
              <Button type="submit">Enviar mensaje</Button>
            </form>
          </Card>
        </div>
      </Section>
    </div>
  );
}
