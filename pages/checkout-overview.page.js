class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;

    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  getOverviewItem(productName) {
    return this.page.getByText(productName);
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutOverviewPage };
