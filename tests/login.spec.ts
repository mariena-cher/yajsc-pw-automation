import { expect } from '@playwright/test';
import { loggedInTestApi as test } from '../fixtures';

test('Login test with valid credentials', {
  tag: '@smoke',
}, async ({ loggedInViaApi }) => {
  await test.step('Go to account page', async () => {
    await loggedInViaApi.accountPage.page.goto('/account');
  });

  await test.step('Expect account page loaded', async () => {
    await loggedInViaApi.accountPage.expectLoaded();
  });

  await test.step('Check page title is visible', async () => {
    await expect(loggedInViaApi.accountPage.pageTitle).toBeVisible();
  });

  await test.step('Check navigation menu is visible', async () => {
    await expect(loggedInViaApi.accountPage.header.navMenu).toBeVisible();
  });
});