class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    this.confirmationMessage = page.getByText("Thank you for your order!");
  }
}

module.exports = { CheckoutCompletePage };
