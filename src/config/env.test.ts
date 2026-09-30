import { describe, expect, it } from "vitest";
import { parseEnv } from "./env";

const validSource = {
  DATABASE_URL: "postgresql://usuario:clave@localhost:5432/plataforma",
};

describe("parseEnv", () => {
  it("acepta una configuración válida y aplica NODE_ENV por defecto", () => {
    const env = parseEnv(validSource);

    expect(env.DATABASE_URL).toBe(validSource.DATABASE_URL);
    expect(env.NODE_ENV).toBe("development");
  });

  it("falla cuando falta DATABASE_URL", () => {
    expect(() => parseEnv({})).toThrow(/DATABASE_URL/);
  });

  it("rechaza URLs que no son de PostgreSQL", () => {
    expect(() => parseEnv({ DATABASE_URL: "mysql://usuario:clave@localhost:3306/db" })).toThrow(
      /DATABASE_URL/,
    );
  });

  it("no expone valores sensibles en el mensaje de error", () => {
    let message = "";

    try {
      parseEnv({ DATABASE_URL: "mysql://usuario:claveSecreta@localhost:3306/db" });
    } catch (error) {
      message = error instanceof Error ? error.message : "";
    }

    expect(message).not.toContain("claveSecreta");
  });
});
