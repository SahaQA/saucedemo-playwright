const { test, expect } = require('../fixtures/test-fixtures');
const { products } = require('../test-data/products');
const { checkoutData } = require('../test-data/checkout');

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
  test('user can submit valid checkout information', async ({ page, inventoryPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
      await inventoryPage.addProductToCart(products.backpack.testId);
      await inventoryPage.openCart();
      await cartPage.proceedToCheckout();
      await checkoutInformationPage.fillCustomerInformation(checkoutData.validCustomer.firstName, checkoutData.validCustomer.lastName, checkoutData.validCustomer.postalCode);      
      await expect(page).toHaveURL(/checkout-step-two/);

      await expect(checkoutOverviewPage.subtotalLabel).toContainText('Item total:');
      await expect(checkoutOverviewPage.taxLabel).toContainText('Tax:');
      await expect(checkoutOverviewPage.totalLabel).toContainText('Total:');

      const subtotalText = await checkoutOverviewPage.subtotalLabel.textContent();
      const taxText = await checkoutOverviewPage.taxLabel.textContent();
      const totalText = await checkoutOverviewPage.totalLabel.textContent();

      const subtotal = Number(subtotalText.replace('Item total: $', ''));
      const tax = Number(taxText.replace('Tax: $', ''));
      const total = Number(totalText.replace('Total: $', ''));

      expect(subtotal + tax).toBeCloseTo(total, 2);
      await checkoutOverviewPage.finishOrder();
      await expect(page).toHaveURL(/checkout-complete/);
      await expect(checkoutCompletePage.confirmationMessage).toBeVisible();
});

  for (const testCase of requiredFieldCases) {
  test(`${testCase.name} is required during checkout`, async ({ inventoryPage, cartPage, checkoutInformationPage }) => {
    await inventoryPage.addProductToCart(products.backpack.testId);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutInformationPage.firstNameInput.fill(testCase.firstName);
    await checkoutInformationPage.lastNameInput.fill(testCase.lastName);
    await checkoutInformationPage.postalCodeInput.fill(testCase.postalCode);
    await checkoutInformationPage.continueButton.click();

    await expect(checkoutInformationPage.errorMessage).toContainText(
      testCase.expectedError
    );
  });
}
});