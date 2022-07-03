import { test, expect } from '@playwright/test';

test('Basic plate input', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.setViewportSize({ width: 390, height: 844 });

  await page.locator('data-test-id=controlButton').click();

  await page.locator('text=粤').click();
  await page.locator('span:has-text("B")').click();
  await page.locator('span:has-text("1")').click();
  await page.locator('span:has-text("2")').click();
  await page.locator('span:has-text("3")').click();
  await page.locator('span:has-text("4")').click();
  await page.locator('span:has-text("5")').click();

  await expect(page.locator('data-test-id=value')).toHaveText('粤B12345');
});
