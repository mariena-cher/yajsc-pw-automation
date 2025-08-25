import { Page, expect } from "@playwright/test";
import { Locator } from "@playwright/test";
import { HeaderComponent } from "./component/header.component";

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly unitPrice: Locator;
  readonly addToCart: Locator;
  readonly addToFavorites: Locator;
  readonly alert: Locator;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
    this.unitPrice = page.getByTestId('unit-price');
    this.addToCart = page.getByTestId('add-to-cart');
    this.addToFavorites = page.getByTestId('add-to-favorites');
    this.alert = page.getByRole('alert', { name: 'Product added to shopping' });
    this.header = new HeaderComponent(this.page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/product/);
  }
}
