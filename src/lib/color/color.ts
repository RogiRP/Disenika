export type Rgb = { r: number; g: number; b: number };

export const WHITE = "#ffffff";
export const BLACK = "#000000";

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;
const MIX_STEPS = 20;

export function isHexColor(value: string): boolean {
  return HEX_PATTERN.test(value);
}

export function parseHex(hex: string): Rgb {
  if (!isHexColor(hex)) {
    throw new Error(`Color hexadecimal inválido: ${hex}`);
  }

  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

function channelToHex(value: number): string {
  return Math.round(Math.min(255, Math.max(0, value)))
    .toString(16)
    .padStart(2, "0");
}

export function toHex({ r, g, b }: Rgb): string {
  return `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}`;
}

function linearize(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = parseHex(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

export function contrastRatio(first: string, second: string): number {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

export function mix(from: string, to: string, weightTo: number): string {
  const start = parseHex(from);
  const end = parseHex(to);
  const weight = Math.min(1, Math.max(0, weightTo));

  return toHex({
    r: start.r + (end.r - start.r) * weight,
    g: start.g + (end.g - start.g) * weight,
    b: start.b + (end.b - start.b) * weight,
  });
}

export function bestOnColor(background: string): string {
  return contrastRatio(background, WHITE) >= contrastRatio(background, BLACK) ? WHITE : BLACK;
}

function meetsContrast(color: string, backgrounds: readonly string[], minRatio: number): boolean {
  return backgrounds.every((background) => contrastRatio(color, background) >= minRatio);
}

export function ensureContrast(
  color: string,
  backgrounds: readonly string[],
  minRatio: number,
  towards: string,
): string {
  if (meetsContrast(color, backgrounds, minRatio)) {
    return color;
  }

  for (let step = 1; step < MIX_STEPS; step += 1) {
    const candidate = mix(color, towards, step / MIX_STEPS);
    if (meetsContrast(candidate, backgrounds, minRatio)) {
      return candidate;
    }
  }

  return towards;
}
