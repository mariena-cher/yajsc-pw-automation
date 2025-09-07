import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { SortLabel, SortOrder } from './enums/order.label.sorting';
import { PowerTools } from './enums/product.categories';

test.describe('Product sorting by name', {
  tag: '@regression',
}, () => {
  const sortOptions = [
    { label: SortLabel.AscendingByName, order: SortOrder.Ascending },
    { label: SortLabel.DescendingByName, order: SortOrder.Descending }
  ];

  sortOptions.forEach(({ label, order }) => {
    test(`Verify user can perform sorting by name (asc & desc): ${label}`, async ({ app }) => {
      await app.homePage.goto();

      await app.homePage.sort.selectOption({ label });

      const productNames = await app.homePage.productNames.allTextContents();

      const sortedNames = [...productNames].sort((a, b) =>
        order === SortOrder.Ascending ? a.localeCompare(b) : b.localeCompare(a)
      );

      expect(productNames).toEqual(sortedNames);
    });
  });

  test.describe('Product sorting by price', {
    tag: '@regression',
  }, () => {
    const priceSortOptions = [
      { label: SortLabel.AscendingByPrice, order: SortOrder.Ascending },
      { label: SortLabel.DescendingByPrice, order: SortOrder.Descending }
    ];

    priceSortOptions.forEach(({ label, order }) => {
      test(`Verify user can perform sorting by price: ${label}`, async ({ app }) => {
        await app.homePage.goto();

        await app.homePage.sort.selectOption({ label });

        const productPrices = await app.homePage.getAllProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) =>
          order === SortOrder.Ascending ? a - b : b - a
        );

        expect(productPrices).toEqual(sortedPrices);
      });
    });
  });

  test('Verify user can filter products by category', {
    tag: '@regression',
  }, async ({ app }) => {
    await app.homePage.goto();

    await app.homePage.selectCategoryCheckbox(PowerTools.Sander);

    const productNames = await app.homePage.getAllProductNames();

    productNames.forEach(name => {
      expect(name).toContain('Sander');
    });
  });
});