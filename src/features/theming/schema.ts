import { z } from "zod";
import { contrastRatio, isHexColor } from "@/lib/color/color";
import { FONT_KEYS } from "./fonts";

const MIN_TEXT_CONTRAST = 4.5;

const hexColorSchema = z
  .string()
  .refine(isHexColor, { message: "Debe ser un color hexadecimal con formato #rrggbb" });

const colorsSchema = z.object({
  primary: hexColorSchema,
  accent: hexColorSchema.optional(),
  background: hexColorSchema,
  surface: hexColorSchema,
  text: hexColorSchema,
});

export const themeSchema = z
  .object({
    schemaVersion: z.literal(1),
    colors: colorsSchema,
    typography: z.object({
      headingFont: z.enum(FONT_KEYS),
      bodyFont: z.enum(FONT_KEYS),
    }),
    radius: z.enum(["none", "sm", "md", "lg"]),
    buttonShape: z.enum(["default", "pill"]),
    density: z.enum(["compact", "comfortable"]),
    visualVariant: z.enum(["classic", "modern"]),
  })
  .strict()
  .superRefine((theme, context) => {
    const { text, background, surface } = theme.colors;

    if (contrastRatio(text, background) < MIN_TEXT_CONTRAST) {
      context.addIssue({
        code: "custom",
        path: ["colors", "text"],
        message: "El texto no alcanza contraste 4.5:1 sobre el fondo",
      });
    }

    if (contrastRatio(text, surface) < MIN_TEXT_CONTRAST) {
      context.addIssue({
        code: "custom",
        path: ["colors", "text"],
        message: "El texto no alcanza contraste 4.5:1 sobre las superficies",
      });
    }
  });

export type ThemeTokens = z.infer<typeof themeSchema>;

export function parseTheme(input: unknown): ThemeTokens {
  const result = themeSchema.safeParse(input);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Tema inválido: ${details}`);
  }

  return result.data;
}
