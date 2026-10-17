const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { users } = require('../test-data/users');
const { CartPage } = require('../pages/cart.page');
const { products } = require('../test-data/products');

test.describe('SauceDemo inventory', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(users.valid.username, users.valid.password);
  });

  test('logged in user can see the inventory page', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toBeVisible();
  });

  test('user can add Sauce Labs Backpack to cart', async () => {
   await inventoryPage.addProductToCart(products.backpack.testId);
   await expect(inventoryPage.cartBadge).toHaveText('1');
});

  test('added backpack appears in the cart', async () => {
   await inventoryPage.addBackpackToCart();
   await inventoryPage.openCart();
   await expect(cartPage.getCartItem(products.backpack.name)).toBeVisible();
});

test('user can remove backpack from the cart', async () => {
  await inventoryPage.addBackpackToCart();
  await inventoryPage.openCart();
  await expect(cartPage.getCartItem(products.backpack.name)).toBeVisible();
  await cartPage.removeProduct('sauce-labs-backpack');
  await expect(cartPage.getCartItem('Sauce Labs Backpack')).not.toBeVisible();
});

test('user can add Sauce Labs Bike Light to cart', async () => {
  await inventoryPage.addProductToCart(products.bikeLight.testId);
  await expect(inventoryPage.cartBadge).toHaveText('1');
});
});