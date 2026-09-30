import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "main" | "header" | "footer" | "nav" | "section";
  size?: keyof typeof sizes;
};

export function Container({ as = "div", size = "default", className, ...rest }: ContainerProps) {
  const Tag: ElementType = as;

  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)} {...rest} />
  );
}
