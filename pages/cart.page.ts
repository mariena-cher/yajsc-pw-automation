import { Page, expect } from "@playwright/test";
import { Locator } from "@playwright/test";

export class CartPage {
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    proceed1: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productQuantity = page.getByTestId('product-quantity');
        this.productTitle = page.getByTestId('product-title');
        this.proceed1 = page.getByTestId('proceed-1');
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/checkout/);
    }
}