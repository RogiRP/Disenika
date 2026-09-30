type EnvSource = Record<string, string | undefined>;

export function isDesignSystemPageEnabled(env: EnvSource = process.env): boolean {
  return env.NODE_ENV !== "production" || env.SHOW_DESIGN_SYSTEM === "true";
}
