const { test: base, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');

const test = base.extend({
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);

    await page.goto('/inventory.html');

    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  }
});

module.exports = { test, expect };