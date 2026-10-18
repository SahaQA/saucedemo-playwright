const { test: base, expect } = require("@playwright/test");
const { InventoryPage } = require("../pages/inventory.page");
const { CartPage } = require("../pages/cart.page");
const {
  CheckoutInformationPage,
} = require("../pages/checkout-information.page");
const { CheckoutOverviewPage } = require("../pages/checkout-overview.page");
const { CheckoutCompletePage } = require("../pages/checkout-complete.page");

const test = base.extend({
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);

    await page.goto("/inventory.html");

    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutInformationPage: async ({ page }, use) => {
    await use(new CheckoutInformationPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});

module.exports = { test, expect };
