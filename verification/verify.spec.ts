import { test, expect } from '@playwright/test';

test('verify LEOV premium experience', async ({ page }) => {
  // Go to the local dev server
  await page.goto('http://localhost:3000');

  // Wait for the hero section to be visible
  await expect(page.locator('h1')).toBeVisible();

  // Capture Hero Section
  await page.screenshot({ path: 'verification/screenshots/hero.png', fullPage: false });

  // Scroll to Services
  const services = page.locator('#services');
  await services.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000); // Wait for entry animations
  await page.screenshot({ path: 'verification/screenshots/services.png' });

  // Scroll to Testimonials
  const testimonials = page.locator('#testimonials');
  await testimonials.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/screenshots/testimonials.png' });

  // Verify Mobile Navbar Trigger (Resize)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/screenshots/mobile-hero.png' });

  // Open mobile menu
  await page.click('button:has(svg)'); // The menu button
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/screenshots/mobile-menu.png' });
});
