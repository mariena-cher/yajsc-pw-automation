import { Page, expect } from "@playwright/test";
import { Locator } from "@playwright/test";

export class ProductPage {
    page: Page;
    productName: Locator;
    unitPrice: Locator;
    addToCart: Locator;
    addToFavorites: Locator;
    

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
    this.unitPrice = page.getByTestId('unit-price');
    this.addToCart = page.getByTestId('add-to-cart');
    this.addToFavorites = page.getByTestId('add-to-favorites');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/product/);
    
  }
}