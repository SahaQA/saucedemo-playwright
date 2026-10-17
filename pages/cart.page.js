class CartPage {
  constructor(page) {
    this.page = page;
  }

  async removeProduct(productTestId) {
    await this.page.locator(`[data-test="remove-${productTestId}"]`).click();
  }

  getCartItem(productName) {
    return this.page.getByText(productName);
  }
}

module.exports = { CartPage };