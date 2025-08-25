import { Page, Locator, expect } from '@playwright/test';

type CreditCardDetails = {
  number: string;
  expiration: string;
  cvv: string;
  holder: string;
};

export class PaymentPage {
  readonly page: Page;
  readonly paymentMethod: Locator;
  readonly creditCardNumber: Locator;
  readonly expirationDate: Locator;
  readonly cvv: Locator;
  readonly cardHolderName: Locator;
  readonly finish: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentMethod = page.getByTestId('payment-method');
    this.creditCardNumber = page.getByTestId('credit_card_number');
    this.expirationDate = page.getByTestId('expiration_date');
    this.cvv = page.getByTestId('cvv');
    this.cardHolderName = page.getByTestId('card_holder_name');
    this.finish = page.getByTestId('finish');
    this.successMessage = page.getByTestId('payment-success-message');
  }

  async selectPaymentMethod(method: string) {
    await this.paymentMethod.selectOption(method);
  }

  async fillCreditCardDetails(details: CreditCardDetails) {
    await this.creditCardNumber.fill(details.number);
    await this.expirationDate.fill(details.expiration);
    await this.cvv.fill(details.cvv);
    await this.cardHolderName.fill(details.holder);
  }

  async expectSuccessMessage(text: string) {
    await expect(this.successMessage).toContainText(text);
  }
}