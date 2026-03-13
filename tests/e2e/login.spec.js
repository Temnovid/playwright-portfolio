import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { USERS } from '../../utils/testData.js';

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login with valid credentials', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should show error for locked out user', async () => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('should show error for empty credentials', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});