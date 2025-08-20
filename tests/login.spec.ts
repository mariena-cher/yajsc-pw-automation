import { test, expect} from '@playwright/test'; 
import { AccountPage } from '../pages/account.page';

  test.use({ storageState: './.auth/user.json' });

  test('Login test with valid credentials', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await page.goto('/account');

    await expect(accountPage.pageTitle).toBeVisible();
    await expect(accountPage.header.navMenu).toBeVisible();
    });