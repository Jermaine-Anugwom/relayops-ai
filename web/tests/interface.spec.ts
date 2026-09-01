import { expect, test } from "@playwright/test";

test("makes the routing decision and unresolved evidence inspectable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("SYNTHETIC DATA")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Water is crossing an active transit lane." })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Exact depth and spread" })).toBeVisible();
  await page.getByRole("button", { name: "Inspect routing rationale" }).click();
  await expect(page.getByText("Why this route")).toBeVisible();
  await page.getByRole("button", { name: "healthy", exact: true }).click();
  await expect(page.getByRole("cell", { name: "Six inches at marked curb" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Exact depth and spread" })).toHaveCount(0);
  await page.getByRole("button", { name: "blocked", exact: true }).click();
  await expect(page.getByText("No route released")).toBeVisible();
  await expect(page.getByText("Instruction override pattern")).toBeVisible();
  await page.getByRole("button", { name: "empty", exact: true }).click();
  await expect(page.getByRole("heading", { name: "The dispatch queue is clear." })).toBeVisible();
  await expect(page.getByText("Water Response · Crew 2")).toHaveCount(0);
});

test("is keyboard reachable and has no page-level overflow", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to decision" })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
});

test("keeps unresolved evidence in the first mobile viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const box = await page.getByRole("cell", { name: "Exact depth and spread" }).boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeLessThan(844);
});
