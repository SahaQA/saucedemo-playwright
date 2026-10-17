class InventoryPage {
  constructor(page) {
    this.page = page;

    this.title = page.getByText('Products');
    this.backpackAddToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.bikeLightAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  }

  async addBackpackToCart() {
    await this.backpackAddToCartButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async addBikeLightToCart() {
  await this.bikeLightAddToCartButton.click();
  }
}

module.exports = { InventoryPage };