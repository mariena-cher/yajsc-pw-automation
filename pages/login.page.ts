import { Page } from "@playwright/test";
export class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoLogin(): Promise<void> {
    await this.page.goto('/auth/login');
  }

    async performLogin(): Promise<void> {
    await this.page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
    await this.page.getByTestId('password').fill('welcome01');
  
    await this.page.getByTestId('login-submit').click();
}
   
}