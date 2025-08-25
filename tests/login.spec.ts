import { expect } from '@playwright/test';
import { loggedInTest as test } from '../fixtures';

test('Login test with valid credentials', async ({ loggedInApp }) => {
  await loggedInApp.accountPage.page.goto('/account');
  await loggedInApp.accountPage.expectLoaded();
  await expect(loggedInApp.accountPage.pageTitle).toBeVisible();
  await expect(loggedInApp.accountPage.header.navMenu).toBeVisible();
});