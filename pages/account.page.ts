import { Page, expect } from "@playwright/test";

export class AccountPage {
    page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL('/account');
  }
}