import type { CSSProperties } from "react";
import { resolveColors } from "./derive";
import { FONT_STACKS } from "./fonts";
import type { ThemeTokens } from "./schema";

const RADIUS = {
  none: { control: "0", card: "0" },
  sm: { control: "0.25rem", card: "0.375rem" },
  md: { control: "0.5rem", card: "0.75rem" },
  lg: { control: "0.75rem", card: "1.25rem" },
} as const;

const PILL_RADIUS = "9999px";

const DENSITY = {
  compact: { cardPadding: "1rem", sectionPadding: "clamp(2rem, 5vw, 3rem)" },
  comfortable: { cardPadding: "1.5rem", sectionPadding: "clamp(3rem, 8vw, 5rem)" },
} as const;

const VISUAL_VARIANT = {
  classic: { headingWeight: "600", headingTracking: "0em", cardShadow: "none", cardBorder: "line" },
  modern: {
    headingWeight: "700",
    headingTracking: "-0.02em",
    cardShadow: "0 1px 2px rgb(0 0 0 / 0.06), 0 8px 24px rgb(0 0 0 / 0.08)",
    cardBorder: "none",
  },
} as const;

export type ThemeCssVars = Record<`--theme-${string}`, string>;

export function themeToCssVars(theme: ThemeTokens): ThemeCssVars {
  const colors = resolveColors(theme.colors);
  const radius = RADIUS[theme.radius];
  const density = DENSITY[theme.density];
  const variant = VISUAL_VARIANT[theme.visualVariant];

  return {
    "--theme-background": colors.background,
    "--theme-surface": colors.surface,
    "--theme-foreground": colors.foreground,
    "--theme-muted": colors.muted,
    "--theme-border": colors.border,
    "--theme-input-border": colors.inputBorder,
    "--theme-card-border": variant.cardBorder === "line" ? colors.border : "transparent",
    "--theme-primary": colors.primary,
    "--theme-primary-hover": colors.primaryHover,
    "--theme-on-primary": colors.onPrimary,
    "--theme-accent": colors.accent,
    "--theme-accent-hover": colors.accentHover,
    "--theme-on-accent": colors.onAccent,
    "--theme-link": colors.link,
    "--theme-focus": colors.focus,
    "--theme-danger": colors.danger,
    "--theme-font-heading": FONT_STACKS[theme.typography.headingFont],
    "--theme-font-body": FONT_STACKS[theme.typography.bodyFont],
    "--theme-heading-weight": variant.headingWeight,
    "--theme-heading-tracking": variant.headingTracking,
    "--theme-radius-control": radius.control,
    "--theme-radius-card": radius.card,
    "--theme-radius-button": theme.buttonShape === "pill" ? PILL_RADIUS : radius.control,
    "--theme-card-shadow": variant.cardShadow,
    "--theme-card-padding": density.cardPadding,
    "--theme-section-py": density.sectionPadding,
  };
}

export function themeStyle(theme: ThemeTokens): CSSProperties {
  return themeToCssVars(theme) as CSSProperties;
}
