import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { mockProductsResponse } from '../utils/mocking';

test('Verify user can view product details', {
  tag: '@regression',
}, async ({ app }) => {
  await test.step('Go to home page', async () => {
    await app.homePage.goto();
  });

  await test.step('Open product details', async () => {
    await app.homePage.clickProductByName('Combination Pliers');
  });

  await test.step('Check product details are visible', async () => {
    await app.productPage.expectLoaded();
    await expect(app.productPage.productName).toBeVisible();
    await expect(app.productPage.unitPrice).toBeVisible();
    await expect(app.productPage.addToCart).toBeVisible();
    await expect(app.productPage.addToFavorites).toBeVisible();
  });
});

test('Verify user can add product to cart', {
  tag: '@regression',
}, async ({ app }) => {
  await test.step('Go to home page', async () => {
    await app.homePage.goto();
  });

  await test.step('Open product details', async () => {
    await app.homePage.clickProductByName('Slip Joint Pliers');
    await app.productPage.expectLoaded();
  });

  await test.step('Check product details', async () => {
    await expect(app.productPage.productName).toHaveText('Slip Joint Pliers');
    await expect(app.productPage.unitPrice).toHaveText('9.17');
  });

  await test.step('Add product to cart and check alert', async () => {
    await app.productPage.addToCart.click();
    await expect(app.productPage.alert).toBeVisible();
    await expect(app.productPage.alert).toContainText('Product added to shopping cart');
    await expect(app.productPage.alert).toBeHidden({ timeout: 8000 });
    await expect(app.productPage.header.navCart).toHaveText('1');
  });

  await test.step('Go to cart and check product', async () => {
    await app.productPage.header.navCart.click();
    await app.cartPage.expectLoaded();
    await expect(app.cartPage.page.getByTestId('product-quantity')).toHaveCount(1);
    await expect(app.cartPage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(app.cartPage.proceed1).toBeVisible();
  });
});

test('Verify products quantity by mocking', {
  tag: '@regression',
}, async ({ page, app }) => {
  await test.step('Mock products response', async () => {
    await page.route('**/products?**', mockProductsResponse);
  });

  await test.step('Go to home page and check products count', async () => {
    await app.homePage.goto();
    await expect(app.homePage.card).toHaveCount(20);
  });
});
