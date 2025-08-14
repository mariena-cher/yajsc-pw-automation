import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

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