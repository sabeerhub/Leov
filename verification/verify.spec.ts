import { test, expect } from '@playwright/test';

test('verify LEOV premium experience', async ({ page }) => {
  // Go to the local prod server
  await page.goto('http://localhost:3000');

  // Wait for the hero section to be visible
  await expect(page.locator('h1')).toBeVisible();

  // Verify Hero Title
  const heroText = await page.innerText('h1');
  expect(heroText).toContain('Global Business');

  // Verify Projects filter
  await page.click('button:has-text("Fintech")');
  await page.waitForTimeout(500);

  // Capture screenshots
  await page.screenshot({ path: 'verification/screenshots/hero.png' });

  // Scroll to projects
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/screenshots/projects.png' });
});
