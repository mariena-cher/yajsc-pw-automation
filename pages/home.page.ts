import { Page } from '@playwright/test';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
  
   async clickProductByName(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).click();
  }
}