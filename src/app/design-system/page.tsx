import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { isDesignSystemPageEnabled } from "@/config/flags";
import { demoThemes } from "./demo-themes";
import { StatesGallery } from "./StatesGallery";
import { ThemePreview } from "./ThemePreview";

export const metadata: Metadata = {
  title: "Sistema de diseño",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  if (!isDesignSystemPageEnabled()) {
    notFound();
  }

  return (
    <main>
      <Container className="py-section">
        <Heading level={1}>Sistema de diseño</Heading>
        <Text tone="muted" className="mt-3 max-w-prose">
          Página de revisión interna. Muestra los componentes base con el tema de la plataforma y
          con tres identidades visuales de ejemplo.
        </Text>
      </Container>
      <StatesGallery />
      {demoThemes.map((demo) => (
        <ThemePreview key={demo.id} id={demo.id} name={demo.name} theme={demo.theme} />
      ))}
    </main>
  );
}
