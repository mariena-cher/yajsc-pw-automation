import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page'; 
import { AccountPage } from '../pages/account.page';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.performLogin();

  const accountPage = new AccountPage(page);
  await accountPage.expectLoaded();

  await expect(accountPage.pageTitle).toBeVisible();
  await expect(accountPage.header.navMenu).toBeVisible();
});