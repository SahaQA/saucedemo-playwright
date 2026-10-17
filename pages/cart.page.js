class CartPage {
  constructor(page) {
    this.page = page;

    this.backpackItem = page.getByText('Sauce Labs Backpack');
  }
}

module.exports = { CartPage };