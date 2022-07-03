import { test, expect } from '@playwright/test';

const secondPage = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['港', '澳', '学', '警', '领'],
];

test('New Energy Big Vehicle Plate', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.setViewportSize({ width: 390, height: 844 });

  await page.locator('data-test-id=controlButton').click();

  await page.locator('text=粤').click();

  for (const row of secondPage[0]) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  }

  for (const row of ['I', 'O']) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  }

  for (const row of [4]) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  }

  await page.locator('span:has-text("B")').click();

  for (const row of secondPage[0]) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  }

  await page.locator('span:has-text("1")').click();
  await page.locator('span:has-text("2")').click();
  await page.locator('span:has-text("3")').click();
  await page.locator('span:has-text("4")').click();

  for (const row of [4]) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  }

  await page.locator('span:has-text("5")').click();

  for (const row of 'ABCDEFGHJK') {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  }

  await page.locator('span:has-text("D")').click();

  await expect(page.locator('data-test-id=value')).toHaveText('粤B12345D');
});

test('New Energy Small Vehicle Plate', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.setViewportSize({ width: 390, height: 844 });

  await page.locator('data-test-id=controlButton').click();

  await page.locator('text=粤').click();

  for (const row of secondPage[0]) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  }

  for (const row of ['I', 'O']) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  }

  for (const row of [4]) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  }

  await page.locator('span:has-text("B")').click();

  for (const row of secondPage[0]) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  }

  await page.locator('span:has-text("D")').click();
  await page.locator('span:has-text("1")').click();
  await page.locator('span:has-text("2")').click();
  await page.locator('span:has-text("3")').click();
  await page.locator('span:has-text("4")').click();

  for (const row of secondPage[0]) {
    await expect(page.locator(`[aria-label="${row}"]`)).toHaveAttribute(
      'aria-disabled',
      'false',
    );
  }

  await page.locator('span:has-text("5")').click();

  await expect(page.locator('data-test-id=value')).toHaveText('粤BD12345');
});
