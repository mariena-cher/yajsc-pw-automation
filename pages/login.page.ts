import { Page } from "@playwright/test";
export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLogin(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async performLogin(): Promise<void> {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-submit').click();
  }
}