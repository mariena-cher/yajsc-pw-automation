import { expect } from '@playwright/test';
import { test } from '../fixtures';

test('Verify user can view product details', async ({ app }) => {
  await app.homePage.goto();
  await app.homePage.clickProductByName('Combination Pliers');

  await app.productPage.expectLoaded();
  await expect(app.productPage.productName).toBeVisible();
  await expect(app.productPage.unitPrice).toBeVisible();
  await expect(app.productPage.addToCart).toBeVisible();
  await expect(app.productPage.addToFavorites).toBeVisible();
});

test('Verify user can add product to cart', async ({ app }) => {
  await app.homePage.goto();
  await app.homePage.clickProductByName('Slip Joint Pliers');

  await app.productPage.expectLoaded();
  await expect(app.productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(app.productPage.unitPrice).toHaveText('9.17');

  await app.productPage.addToCart.click();
  await expect(app.productPage.alert).toBeVisible();
  await expect(app.productPage.alert).toContainText('Product added to shopping cart');
  await expect(app.productPage.alert).toBeHidden({ timeout: 8000 });
  await expect(app.productPage.header.navCart).toHaveText('1');

  await app.productPage.header.navCart.click();

  await app.cartPage.expectLoaded();
  await expect(app.cartPage.page.getByTestId('product-quantity')).toHaveCount(1);
  await expect(app.cartPage.productTitle).toHaveText('Slip Joint Pliers');
  await expect(app.cartPage.proceed1).toBeVisible();
});