export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems      = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueButton = page.locator('[data-test="continue-shopping"]');
  }

  async getItemNames() {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}