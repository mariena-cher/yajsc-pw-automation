import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
    page: Page;
    logo: Locator;
    navHome: Locator;
    navCategories: Locator;
    navContact: Locator;
    navSignIn: Locator;
    navCart: Locator;
    languageSelect: Locator;
    navMenu: Locator;

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