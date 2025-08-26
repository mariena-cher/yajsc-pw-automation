import { expect } from '@playwright/test';
import { loggedInTest as test } from '../fixtures';
import { CreditCardData } from '../tests/test-data/credit.card.details';

test('Verify successful payment using loggedInApp fixture', async ({ loggedInApp }) => {
  await loggedInApp.homePage.goto();
  await loggedInApp.homePage.clickProductByName('Combination Pliers');
  await loggedInApp.productPage.addToCart.click();

  await loggedInApp.productPage.header.navCart.click();
  await expect(loggedInApp.cartPage.productPrice).toContainText('$14.15');
  await expect(loggedInApp.cartPage.linePrice).toContainText('$14.15');
  await loggedInApp.cartPage.proceed1.click();

  await expect(loggedInApp.cartPage.alreadyLoggedInMessage).toBeVisible();
  await loggedInApp.cartPage.proceed2.click();

  await loggedInApp.cartPage.fillShippingAddress('Some State', '1111');
  await loggedInApp.cartPage.proceed3.click();

  await loggedInApp.paymentPage.selectPaymentMethod('credit-card');
  await loggedInApp.paymentPage.fillCreditCardDetails(CreditCardData);
  await loggedInApp.paymentPage.finish.click();

  await expect(loggedInApp.paymentPage.successMessage).toContainText('Payment was successful');
});