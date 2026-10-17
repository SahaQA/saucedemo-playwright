const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { users } = require('../test-data/users');

test.describe('SauceDemo inventory', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(
      users.valid.username,
      users.valid.password
    );
  });

  test('logged in user can see the inventory page', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toBeVisible();
  });

  test('user can add Sauce Labs Backpack to cart', async () => {
  await inventoryPage.addBackpackToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');
});
});