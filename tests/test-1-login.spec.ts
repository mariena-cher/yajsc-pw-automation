import { test, expect } from '@playwright/test';

const validUser = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01'
}

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByTestId('email').fill(validUser.email);
  await page.getByTestId('password').fill(validUser.password);
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL('/account');

  await expect(page.locator('[data-test="page-title"]')).toBeVisible();
  await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
});