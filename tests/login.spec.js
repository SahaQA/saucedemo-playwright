const { test, expect } = require('@playwright/test');

test('user can open the SauceDemo login page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle(/Swag Labs/);
});