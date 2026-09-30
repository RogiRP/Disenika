import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const sizes = {
  xl: "text-4xl sm:text-5xl",
  lg: "text-3xl sm:text-4xl",
  md: "text-2xl",
  sm: "text-xl",
  xs: "text-lg",
} as const;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = keyof typeof sizes;

const defaultSizeByLevel: Record<HeadingLevel, HeadingSize> = {
  1: "xl",
  2: "lg",
  3: "md",
  4: "sm",
  5: "xs",
  6: "xs",
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level: HeadingLevel;
  size?: HeadingSize;
};

export function Heading({ level, size, className, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={cn(
        "font-heading font-(weight:--theme-heading-weight) tracking-(--theme-heading-tracking) text-foreground text-balance",
        sizes[size ?? defaultSizeByLevel[level]],
        className,
      )}
      {...rest}
    />
  );
}
