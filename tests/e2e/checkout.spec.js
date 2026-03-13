import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { USERS, PRODUCTS, CUSTOMER } from '../../utils/testData.js';

test.describe('Checkout', () => {
  let inventoryPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage   = new InventoryPage(page);
    cartPage        = new CartPage(page);
    checkoutPage    = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.goToCart();
    await cartPage.checkout();
  });

  test('should complete full checkout flow', async () => {
    await checkoutPage.fillInfo(CUSTOMER);
    await expect(checkoutPage.summaryTotal).toBeVisible();
    await checkoutPage.finish();
    await expect(checkoutPage.confirmHeader).toHaveText('Thank you for your order!');
  });

  test('should show error when checkout info is missing', async ({ page }) => {
    await page.locator('[data-test="continue"]').click();
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
  });
});