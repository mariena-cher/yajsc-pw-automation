import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page'; 
import { AccountPage } from '../pages/account.page';

test('Verify login with valid credentials', async ({ page }) => {
  const homePage = new HomePage (page);
  await homePage.goto();

  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.performLogin();

  const accountPage = new AccountPage(page);
  await accountPage.expectLoaded();

  await expect(page.getByTestId('page-title')).toBeVisible();
  await expect(page.getByTestId('nav-menu')).toBeVisible();
});