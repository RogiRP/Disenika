import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li" | "section";
  padded?: boolean;
};

export function Card({ as = "div", padded = true, className, ...rest }: CardProps) {
  const Tag: ElementType = as;

  return (
    <Tag
      className={cn(
        "rounded-card border border-card-border bg-surface text-foreground shadow-card",
        padded && "p-card",
        className,
      )}
      {...rest}
    />
  );
}
