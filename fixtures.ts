import { test as base } from '@playwright/test';
import { AllPages } from "./pages/allPages";
import { validUser } from './tests/test-data/login';

type App = {
    app: AllPages;
};

export const test = base.extend<App>({
    app: async ({ page }, use) => {
        const app = new AllPages(page);
        await use(app);
    }
});

type LoggedInApp = {
    loggedInApp: AllPages;
};

export const loggedInTest = base.extend<LoggedInApp>({
    loggedInApp: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: '.auth/user.json' });
        const page = await context.newPage();
        const app = new AllPages(page);
        await use(app);
        await context.close();
    }
});

type LoggedInViaApi = {
    loggedInViaApi: AllPages;
};

type LoginResponse = {
    access_token: string;
};

export const loggedInTestApi = base.extend<LoggedInViaApi>({
  loggedInViaApi: async ({ page, request }, use) => {
    const resp = await request.post(`${process.env.API_URL}/users/login`, {
      data: {
        email: validUser.email,
        password: validUser.password,
      }
    });
    const jsonData = await resp.json() as LoginResponse;
    const token = jsonData.access_token;

    await page.goto('/');
    await page.evaluate((token) => {
      localStorage.setItem('auth-token', token);
    }, token);
    await page.reload();

    const app = new AllPages(page);
    await use(app);
  }
});