import axe from "axe-core";
import { expect } from "vitest";

export async function expectNoA11yViolations(element: Element): Promise<void> {
  const results = await axe.run(element, {
    rules: {
      "color-contrast": { enabled: false },
      region: { enabled: false },
    },
  });

  expect(results.violations.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
}
