export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title        = page.locator('.title');
    this.cartBadge    = page.locator('.shopping_cart_badge');
    this.cartLink     = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  getAddToCartButton(productName) {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('button');
  }

  async addToCart(productName) {
    await this.getAddToCartButton(productName).click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}