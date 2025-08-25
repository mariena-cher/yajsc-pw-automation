import { Page, expect } from "@playwright/test";
import { Locator } from "@playwright/test";
import { HeaderComponent } from "./component/header.component";

export class AccountPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByTestId('page-title');
    this.header = new HeaderComponent(this.page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/account/);
  }
}