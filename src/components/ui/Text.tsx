import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

const tones = {
  default: "text-foreground",
  muted: "text-muted",
} as const;

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: "p" | "span" | "div";
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
};

export function Text({ as = "p", size = "md", tone = "default", className, ...rest }: TextProps) {
  const Tag: ElementType = as;

  return <Tag className={cn("leading-relaxed", sizes[size], tones[tone], className)} {...rest} />;
}
