import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export class HomePage {
  page: Page;
  sort: Locator;
  productNames: Locator;
  category: Locator;
  productPrice: Locator;


  constructor(page: Page) {
    this.page = page;
    this.sort = page.getByTestId('sort');
    this.productNames = page.locator('[data-testid^="product-"] [data-testid="product-name"]');
    this.productPrice = page.getByTestId('product-price');
    this.category = page.getByTestId('category-01K2Q0FVX1AZ71P7210AJGKG06');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
  
   async clickProductByName(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).click();
  }

  async getAllProductPrices(): Promise<number[]> {
  const priceTexts = await this.page.locator('.product-price').allTextContents();
  return priceTexts.map(text => parseFloat(text.replace(/[^0-9.]/g, '')) || 0);
}

  selectCategoryCheckbox(categoryName: string): Promise<void> {
    return this.page.getByLabel(categoryName).check();
}

  async getAllProductNames(): Promise<string[]> {
    return this.page.locator('[data-testid^="product-"] [data-testid="product-name"]').allTextContents();
  }
}
