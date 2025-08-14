import { Page } from "@playwright/test";
import { validUser } from "../tests/fixtures/credentials";
export class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoLogin(): Promise<void> {
    await this.page.goto('/auth/login');
  }

    async performLogin(): Promise<void> {
    await this.page.getByTestId('email').fill(validUser.email);
    await this.page.getByTestId('password').fill(validUser.password);
    await this.page.getByTestId('login-submit').click();
}
   
}