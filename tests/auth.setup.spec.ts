import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page'; 
import path from 'path';

const authFile = path.join(process.cwd(), '.auth/user.json');
test('Setup authentication and save state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLogin();
  await loginPage.performLogin();

  await expect(page).toHaveURL(/\/account/);

  await page.context().storageState({ path: authFile });
  
  });