import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page'; 
import path from 'path';

const authFile = path.join(process.cwd(), '.auth/user.json');

test('Setup authentication and save state', {
  tag: '@smoke',
}, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Go to login page', async () => {
    await loginPage.gotoLogin();
  });

  await test.step('Perform login', async () => {
    await loginPage.performLogin();
  });

  await test.step('Verify redirect to account page', async () => {
    await expect(page).toHaveURL(/\/account/);
  });

  await test.step('Save storage state', async () => {
    await page.context().storageState({ path: authFile });
  });
});