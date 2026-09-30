import localFont from "next/font/local";
import type { FontKey } from "@/features/theming";

const figtree = localFont({
  src: "../assets/fonts/figtree-latin-wght-normal.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  display: "swap",
});

const sourceSerif = localFont({
  src: "../assets/fonts/source-serif-4-latin-wght-normal.woff2",
  variable: "--font-source-serif",
  weight: "200 900",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const loadedFonts: Record<FontKey, { variable: string }> = {
  figtree,
  "source-serif": sourceSerif,
};

export const fontVariableClassNames = Object.values(loadedFonts)
  .map((font) => font.variable)
  .join(" ");
