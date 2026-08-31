import { expect, test } from "@playwright/test";

test("makes the routing decision and unresolved evidence inspectable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("SYNTHETIC DATA")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Water is crossing an active transit lane." })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Exact depth and spread" })).toBeVisible();
  await page.getByRole("button", { name: "Inspect routing rationale" }).click();
  await expect(page.getByText("Why this route")).toBeVisible();
});

test("is keyboard reachable and has no page-level overflow", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to decision" })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
});
