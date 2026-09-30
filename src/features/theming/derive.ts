import { BLACK, WHITE, bestOnColor, ensureContrast, mix } from "@/lib/color/color";
import type { ThemeTokens } from "./schema";

const TEXT_CONTRAST = 4.5;
const UI_CONTRAST = 3;
const HOVER_SHIFT = 0.12;
const MUTED_BACKGROUND_SHARE = 0.35;
const INPUT_BORDER_BACKGROUND_SHARE = 0.45;
const DECORATIVE_BORDER_BACKGROUND_SHARE = 0.85;
const DANGER_BASE = "#b42318";

export type ResolvedColors = {
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  border: string;
  inputBorder: string;
  primary: string;
  primaryHover: string;
  onPrimary: string;
  accent: string;
  accentHover: string;
  onAccent: string;
  link: string;
  focus: string;
  danger: string;
};

function hoverOf(color: string, onColor: string): string {
  return mix(color, onColor === WHITE ? BLACK : WHITE, HOVER_SHIFT);
}

export function resolveColors(colors: ThemeTokens["colors"]): ResolvedColors {
  const { background, surface, text, primary } = colors;
  const accent = colors.accent ?? primary;
  const surfaces = [background, surface];
  const onPrimary = bestOnColor(primary);
  const onAccent = bestOnColor(accent);

  return {
    background,
    surface,
    foreground: text,
    muted: ensureContrast(
      mix(text, background, MUTED_BACKGROUND_SHARE),
      surfaces,
      TEXT_CONTRAST,
      text,
    ),
    border: mix(text, background, DECORATIVE_BORDER_BACKGROUND_SHARE),
    inputBorder: ensureContrast(
      mix(text, background, INPUT_BORDER_BACKGROUND_SHARE),
      surfaces,
      UI_CONTRAST,
      text,
    ),
    primary,
    primaryHover: hoverOf(primary, onPrimary),
    onPrimary,
    accent,
    accentHover: hoverOf(accent, onAccent),
    onAccent,
    link: ensureContrast(primary, surfaces, TEXT_CONTRAST, text),
    focus: ensureContrast(primary, surfaces, UI_CONTRAST, text),
    danger: ensureContrast(DANGER_BASE, surfaces, TEXT_CONTRAST, text),
  };
}
