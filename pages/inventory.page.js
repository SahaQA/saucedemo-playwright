class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByText('Products');
  }
}

module.exports = { InventoryPage };