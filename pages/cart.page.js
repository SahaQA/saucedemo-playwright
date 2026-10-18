class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async removeProduct(productTestId) {
    await this.page.locator(`[data-test="remove-${productTestId}"]`).click();
  }

  async proceedToCheckout() {
  await this.checkoutButton.click();
}

  getCartItem(productName) {
    return this.page.getByText(productName);
  }
}

module.exports = { CartPage };