import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly sort: Locator;
  readonly productNames: Locator;
  readonly category: Locator;
  readonly productPrice: Locator;
  readonly card: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sort = page.getByTestId('sort');
    this.productNames = page.locator('[data-testid^="product-"] [data-testid="product-name"]');
    this.productPrice = page.getByTestId('product-price');
    this.category = page.locator('[data-testid^="category-"]');
    this.card = page.locator('a[href^="/product/"]');
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
    return this.productNames.allTextContents();
  }
}
