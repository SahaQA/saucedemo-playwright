class CartPage {
  constructor(page) {
    this.page = page;

    this.backpackItem = page.getByText('Sauce Labs Backpack');
    this.removeBackpackButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    );
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }
}

module.exports = { CartPage };