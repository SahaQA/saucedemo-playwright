const { test, expect } = require('../fixtures/test-fixtures');
const { products } = require('../test-data/products');

test.describe('SauceDemo inventory', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

test('logged in user can see the inventory page', async ({ page, inventoryPage }) => {
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toBeVisible();
});

  for (const product of Object.values(products)) {
    test(`user can add ${product.name} to cart`, async ({ inventoryPage }) => {
      await inventoryPage.addProductToCart(product.testId);

      await expect(inventoryPage.cartBadge).toHaveText('1');
    });
  }

test('added backpack appears in the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack.testId);
    await inventoryPage.openCart();

    await expect(
      cartPage.getCartItem(products.backpack.name)
    ).toBeVisible();
  });

test('user can remove backpack from the cart',
  async ({ inventoryPage, cartPage }) => {    
    await inventoryPage.addProductToCart(products.backpack.testId);
    await inventoryPage.openCart();

    await expect(
      cartPage.getCartItem(products.backpack.name)
    ).toBeVisible();

    await cartPage.removeProduct(products.backpack.testId);

    await expect(
      cartPage.getCartItem(products.backpack.name)
    ).not.toBeVisible();
  });
});