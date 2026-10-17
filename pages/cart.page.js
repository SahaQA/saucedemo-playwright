class CartPage {
  constructor(page) {
    this.page = page;
    this.removeBackpackButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    );
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }

  getCartItem(productName) {
    return this.page.getByText(productName);
  }
}

module.exports = { CartPage };