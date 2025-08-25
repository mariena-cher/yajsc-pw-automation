import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly logo: Locator;
  readonly navHome: Locator;
  readonly navCategories: Locator;
  readonly navContact: Locator;
  readonly navSignIn: Locator;
  readonly navCart: Locator;
  readonly languageSelect: Locator;
  readonly navMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'title="Practice Software Testing - Toolshop"' });
    this.navHome = page.getByTestId('nav-home');
    this.navCategories = page.getByTestId('nav-categories');
    this.navContact = page.getByTestId('nav-contact');
    this.navSignIn = page.getByTestId('nav-sign-in');
    this.navCart = page.getByTestId('nav-cart');
    this.languageSelect = page.getByTestId('language-select');
    this.navMenu = page.getByTestId('nav-menu');
  }
}
