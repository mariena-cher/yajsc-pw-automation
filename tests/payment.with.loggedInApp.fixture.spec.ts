import { expect } from '@playwright/test';
import { loggedInTest as test } from '../fixtures';
import { CreditCardData } from '../tests/test-data/credit.card.details';

test(
  'Verify successful payment using loggedInApp fixture',
  { tag: '@smoke' },
  async ({ loggedInApp }) => {
    await test.step('Go to home page', async () => {
      await loggedInApp.homePage.goto();
    });

    await test.step('Select product', async () => {
      await loggedInApp.homePage.clickProductByName('Combination Pliers');
      await loggedInApp.productPage.addToCart.click();
    });

    await test.step('Go to cart and check prices', async () => {
      await loggedInApp.productPage.header.navCart.click();
      await expect(loggedInApp.cartPage.productPrice).toContainText('$14.15');
      await expect(loggedInApp.cartPage.linePrice).toContainText('$14.15');
      await loggedInApp.cartPage.proceed1.click();
    });

    await test.step('Proceed as already logged in', async () => {
      await expect(loggedInApp.cartPage.alreadyLoggedInMessage).toBeVisible();
      await loggedInApp.cartPage.proceed2.click();
    });

    await test.step('Fill shipping address', async () => {
      await loggedInApp.cartPage.fillShippingAddress('Some State', '1111');
      await loggedInApp.cartPage.proceed3.click();
    });

    await test.step('Select payment method, fill card details and pay', async () => {
      await loggedInApp.paymentPage.selectPaymentMethod('credit-card');
      await loggedInApp.paymentPage.fillCreditCardDetails(CreditCardData);
      await loggedInApp.paymentPage.finish.click();
    });

    await test.step('Check payment success message', async () => {
      await expect(loggedInApp.paymentPage.successMessage).toContainText('Payment was successful');
    });
  }
);