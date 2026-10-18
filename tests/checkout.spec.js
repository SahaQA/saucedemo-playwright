const { test, expect } = require('../fixtures/test-fixtures');
const { products } = require('../test-data/products');

const requiredFieldCases = [
  {
    name: 'first name',
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
    expectedError: 'First Name is required'
  },
  {
    name: 'last name',
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
    expectedError: 'Last Name is required'
  },
  {
    name: 'postal code',
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
    expectedError: 'Postal Code is required'
  }
];

test.describe('SauceDemo checkout', () => {
  test('user can submit valid checkout information', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
      await inventoryPage.addProductToCart(products.backpack.testId);
      await inventoryPage.openCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCustomerInformation('John', 'Doe', '12345');
      await expect(page).toHaveURL(/checkout-step-two/);

      await expect(checkoutPage.subtotalLabel).toContainText('Item total:');
      await expect(checkoutPage.taxLabel).toContainText('Tax:');
      await expect(checkoutPage.totalLabel).toContainText('Total:');

      const subtotalText = await checkoutPage.subtotalLabel.textContent();
      const taxText = await checkoutPage.taxLabel.textContent();
      const totalText = await checkoutPage.totalLabel.textContent();

      const subtotal = Number(subtotalText.replace('Item total: $', ''));
      const tax = Number(taxText.replace('Tax: $', ''));
      const total = Number(totalText.replace('Total: $', ''));

      expect(subtotal + tax).toBeCloseTo(total, 2);
      await checkoutPage.finishOrder();
      await expect(page).toHaveURL(/checkout-complete/);
      await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

  for (const testCase of requiredFieldCases) {
  test(`${testCase.name} is required during checkout`, async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductToCart(products.backpack.testId);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.firstNameInput.fill(testCase.firstName);
    await checkoutPage.lastNameInput.fill(testCase.lastName);
    await checkoutPage.postalCodeInput.fill(testCase.postalCode);
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toContainText(
      testCase.expectedError
    );
  });
}
});