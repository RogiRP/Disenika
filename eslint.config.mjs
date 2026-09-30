import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const forbid = (groups) => ({
  "no-restricted-imports": [
    "error",
    { patterns: groups.map(([group, message]) => ({ group, message })) },
  ],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      ...forbid([
        [["@/features/*/*"], "Importa desde el índice público del feature (@/features/<nombre>)."],
      ]),
    },
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: forbid([
      [["@/features/*/*"], "Importa desde el índice público del feature (@/features/<nombre>)."],
      [["@/db", "@/db/**"], "Los componentes no acceden a la capa de datos."],
      [["@/app", "@/app/**"], "Los componentes no dependen de las rutas."],
    ]),
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: forbid([
      [["@/features/*/*"], "Importa desde el índice público del feature (@/features/<nombre>)."],
      [["@/components", "@/components/**"], "Los features no dependen de componentes visuales."],
      [["@/app", "@/app/**"], "Los features no dependen de las rutas."],
    ]),
  },
  {
    files: ["src/db/**/*.{ts,tsx}"],
    rules: forbid([
      [["@/components", "@/components/**"], "La capa de datos no depende de la interfaz."],
      [["@/app", "@/app/**"], "La capa de datos no depende de las rutas."],
    ]),
  },
  {
    files: ["src/lib/**/*.{ts,tsx}", "src/config/**/*.{ts,tsx}"],
    rules: forbid([
      [["@/features", "@/features/**"], "lib y config no dependen del dominio."],
      [["@/components", "@/components/**"], "lib y config no dependen de la interfaz."],
      [["@/db", "@/db/**"], "lib y config no dependen de la capa de datos."],
      [["@/app", "@/app/**"], "lib y config no dependen de las rutas."],
    ]),
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "src/generated/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
