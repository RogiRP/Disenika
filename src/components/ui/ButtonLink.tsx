import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { type ButtonSize, type ButtonVariant, buttonStyles } from "./button-styles";
import { ExternalHint } from "./ExternalHint";

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  external?: boolean;
};

export function ButtonLink({
  href,
  variant,
  size,
  fullWidth,
  external = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <NextLink
      href={href}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...externalProps}
      {...rest}
    >
      {children}
      {external && <ExternalHint />}
    </NextLink>
  );
}
