import { expect } from '@playwright/test';
import { loggedInTestApi as test } from '../fixtures';

test('Login test with valid credentials', {
  tag: '@smoke',
}, async ({ loggedInViaApi }) => {
  await loggedInViaApi.accountPage.page.goto('/account');
  await loggedInViaApi.accountPage.expectLoaded();
  await expect(loggedInViaApi.accountPage.pageTitle).toBeVisible();
  await expect(loggedInViaApi.accountPage.header.navMenu).toBeVisible();
});