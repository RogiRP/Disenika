import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("sistema de diseño", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/design-system");
  });

  test("muestra su encabezado principal y los cuatro temas", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Sistema de diseño" })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Consultorio moderno" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Especialista clásico" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Fondo oscuro" })).toBeVisible();
  });

  test("no tiene violaciones de accesibilidad WCAG A y AA", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations.map(
        (violation) => `${violation.id}: ${violation.nodes.length} elemento(s)`,
      ),
    ).toEqual([]);
  });

  test("no genera desplazamiento horizontal", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("permite llegar con el teclado a los controles y muestra el foco", async ({ page }) => {
    await page.keyboard.press("Tab");

    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
    const outlineStyle = await focused.evaluate(
      (element) => getComputedStyle(element).outlineStyle,
    );
    expect(outlineStyle).not.toBe("none");
  });

  test("los campos se asocian con su etiqueta", async ({ page }) => {
    await expect(page.getByLabel("Nombre").first()).toBeVisible();
  });
});
