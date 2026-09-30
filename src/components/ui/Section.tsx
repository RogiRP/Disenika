import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

const tones = {
  default: "bg-background",
  surface: "bg-surface",
} as const;

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: keyof typeof tones;
  containerSize?: "narrow" | "default" | "wide";
};

export function Section({
  tone = "default",
  containerSize = "default",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn("py-section", tones[tone], className)} {...rest}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
