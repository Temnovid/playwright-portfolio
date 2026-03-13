import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { USERS, PRODUCTS } from '../../utils/testData.js';

test.describe('Cart', () => {
  let inventoryPage, cartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('should add a product to cart', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('should add multiple products and show correct count', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('should display added products in cart', async () => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();

    const items = await cartPage.getItemNames();
    expect(items).toContain(PRODUCTS.backpack);
  });

  test('should sort products by price (low to high)', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.page
      .locator('.inventory_item_price')
      .allTextContents();
    const nums = prices.map(p => parseFloat(p.replace('$', '')));
    expect(nums).toEqual([...nums].sort((a, b) => a - b));
  });
});