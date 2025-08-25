import { Page, expect } from "@playwright/test";
import { Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly productQuantity: Locator;
    readonly productTitle: Locator;
    readonly proceed1: Locator;
    readonly proceed2: Locator;
    readonly proceed3: Locator;
    readonly productPrice: Locator;
    readonly linePrice: Locator;
    readonly state: Locator;
    readonly postalCode: Locator;
    readonly alreadyLoggedInMessage: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.productQuantity = page.getByTestId('product-quantity');
        this.productTitle = page.getByTestId('product-title');
        this.proceed1 = page.getByTestId('proceed-1');
        this.proceed2 = page.getByTestId('proceed-2');
        this.proceed3 = page.getByTestId('proceed-3');
        this.productPrice = page.getByTestId('product-price');
        this.linePrice = page.getByTestId('line-price');
        this.state = page.getByTestId('state');
        this.postalCode = page.getByTestId('postal_code');
        this.alreadyLoggedInMessage = page.locator('text=Hello Jane Doe, you are already logged in. You can proceed to checkout.');
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/checkout/);
    }

    async fillShippingAddress(state: string, postalCode: string): Promise<void> {
        await this.state.fill(state);
        await this.postalCode.fill(postalCode);
    }
}