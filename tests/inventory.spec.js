const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { users } = require('../test-data/users');
const { CartPage } = require('../pages/cart.page');

test.describe('SauceDemo inventory', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

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
   await inventoryPage.addProductToCart('sauce-labs-backpack');
   await expect(inventoryPage.cartBadge).toHaveText('1');
});

  test('added backpack appears in the cart', async () => {
   await inventoryPage.addBackpackToCart();
   await inventoryPage.openCart();
   await expect(cartPage.getCartItem('Sauce Labs Backpack')).toBeVisible();
});

test('user can remove backpack from the cart', async () => {
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await expect(cartPage.getCartItem('Sauce Labs Backpack')).toBeVisible();
  await cartPage.removeBackpack();
  await expect(cartPage.getCartItem('Sauce Labs Backpack')).not.toBeVisible();
});

test('user can add Sauce Labs Bike Light to cart', async () => {
  await inventoryPage.addProductToCart('sauce-labs-bike-light');
  await expect(inventoryPage.cartBadge).toHaveText('1');
});
});