# Plataforma de marketing médico

Plataforma web reutilizable para crear y mantener sitios de médicos y profesionales de la salud sobre una misma base de código. Monolito modular con Next.js (App Router), TypeScript estricto, PostgreSQL, Prisma, Tailwind CSS, Zod, Vitest y Playwright.

## Requisitos

- Node.js 22 o superior
- npm
- Docker (opcional, para PostgreSQL local)

## Primeros pasos

```bash
npm install
cp .env.example .env
docker compose up -d
npx playwright install
npm run dev
```

## Scripts

| Script                | Uso                                           |
| --------------------- | --------------------------------------------- |
| `npm run dev`         | Servidor de desarrollo                        |
| `npm run build`       | Build de producción                           |
| `npm run check`       | Lint, tipos, formato y pruebas unitarias      |
| `npm run test`        | Pruebas unitarias e integración (Vitest)      |
| `npm run test:e2e`    | Pruebas end-to-end (Playwright)               |
| `npm run db:generate` | Genera el cliente de Prisma (requiere `.env`) |
| `npm run db:migrate`  | Crea y aplica migraciones en desarrollo       |

## Sistema de diseño

La identidad visual se define con tokens de tema (`features/theming`): colores, tipografía, radio, densidad, forma de botones y variante visual. Cada tema se valida con Zod y sus colores derivados garantizan contraste WCAG AA. Los componentes base viven en `src/components/ui` y solo usan clases semánticas (`bg-primary`, `rounded-card`, `font-heading`), nunca valores de un médico.

La página `/design-system` muestra los componentes con cuatro temas de ejemplo. Está disponible en desarrollo y se oculta en producción salvo que `SHOW_DESIGN_SYSTEM="true"`.

Las fuentes permitidas son archivos locales en `src/assets/fonts` (licencia OFL incluida). Agregar una fuente requiere añadir su clave en `features/theming/fonts.ts` y su carga en `src/app/fonts.ts`.

## Arquitectura

Las dependencias van en una sola dirección: `app` usa `components` y `features`; `features` usa `db`; `db` usa Prisma. ESLint hace cumplir estas fronteras:

- `components` no importa `db` ni `app`.
- `features` no importa `components` ni `app`.
- `db` no importa `components` ni `app`.
- `lib` y `config` no importan dominio, interfaz, datos ni rutas.
- Entre módulos solo se importa el índice público: `@/features/<nombre>`, nunca archivos internos.

Las carpetas `components`, `features`, `db`, `lib` y `styles` se crean en la etapa que les da contenido real.
