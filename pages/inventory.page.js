class InventoryPage {
  constructor(page) {
    this.page = page;

    this.title = page.getByText('Products');
    this.backpackAddToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addBackpackToCart() {
    await this.backpackAddToCartButton.click();
  }
}

module.exports = { InventoryPage };