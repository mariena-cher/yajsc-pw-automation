import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickProductByName('Combination Pliers');

  const productPage = new ProductPage(page);
  await productPage.expectLoaded();
  
  await expect(page.getByTestId('product-name')).toBeVisible();
  await expect(page.getByTestId('unit-price')).toBeVisible();
  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});