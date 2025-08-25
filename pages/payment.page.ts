import { Page, Locator, expect } from '@playwright/test';
import { CreditCardDetails } from '../tests/credentials/credit.card.details';

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

  async fillCreditCardDetails() {
    await this.creditCardNumber.fill(CreditCardDetails.creditCardNumber);
    await this.expirationDate.fill(CreditCardDetails.expirationDate);
    await this.cvv.fill(CreditCardDetails.cvv);
    await this.cardHolderName.fill(CreditCardDetails.cardHolderName);
  }

  async expectSuccessMessage(text: string) {
    await expect(this.successMessage).toContainText(text);
  }
}