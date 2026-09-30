export const FONT_KEYS = ["figtree", "source-serif"] as const;

export type FontKey = (typeof FONT_KEYS)[number];

export const FONT_STACKS: Record<FontKey, string> = {
  figtree: "var(--font-figtree), ui-sans-serif, system-ui, sans-serif",
  "source-serif": "var(--font-source-serif), ui-serif, Georgia, serif",
};
