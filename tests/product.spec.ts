import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';  
import { CartPage } from '../pages/cart.page';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickProductByName('Combination Pliers');

  const productPage = new ProductPage(page);
  await productPage.expectLoaded();
  await expect(productPage.productName).toBeVisible();
  await expect(productPage.unitPrice).toBeVisible();
  await expect(productPage.addToCart).toBeVisible();
  await expect(productPage.addToFavorites).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickProductByName('Slip Joint Pliers');

  const productPage = new ProductPage(page);
  await productPage.expectLoaded();
  await expect(productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(productPage.unitPrice).toHaveText('9.17');

  await productPage.addToCart.click();
  await expect(productPage.alert).toBeVisible();
  await expect(productPage.alert).toContainText('Product added to shopping cart');
  await expect(productPage.alert).toBeHidden({ timeout: 8000 });
  await expect(productPage.header.navCart).toHaveText('1');

  await productPage.header.navCart.click();

  const cartPage = new CartPage(page);
  await cartPage.expectLoaded();
  await expect(cartPage.page.getByTestId('product-quantity')).toHaveCount(1);
  await expect(cartPage.productTitle).toHaveText('Slip Joint Pliers');
  await expect(cartPage.proceed1).toBeVisible();
});

