const { test, expect } = require('../fixtures/test-fixtures');
const { products } = require('../test-data/products');

test.describe('SauceDemo checkout', () => {
  test('user can submit valid checkout information', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
      await inventoryPage.addProductToCart(products.backpack.testId);
      await inventoryPage.openCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCustomerInformation('John', 'Doe', '12345');
      await expect(page).toHaveURL(/checkout-step-two/);
    }
  );

  test('postal code is required during checkout', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductToCart(products.backpack.testId);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.firstNameInput.fill('John');
    await checkoutPage.lastNameInput.fill('Doe');
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
   }
  );
});