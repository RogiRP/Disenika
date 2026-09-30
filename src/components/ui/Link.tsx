import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { ExternalHint } from "./ExternalHint";

const variants = {
  inline: "text-link underline underline-offset-4 hover:decoration-2",
  plain: "text-foreground no-underline underline-offset-4 hover:underline",
} as const;

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: keyof typeof variants;
  current?: boolean;
  external?: boolean;
};

export function Link({
  href,
  variant = "inline",
  current = false,
  external = false,
  className,
  children,
  ...rest
}: LinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <NextLink
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(variants[variant], current && "font-semibold underline", className)}
      {...externalProps}
      {...rest}
    >
      {children}
      {external && <ExternalHint />}
    </NextLink>
  );
}
