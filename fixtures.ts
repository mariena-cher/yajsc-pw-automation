import { test as base } from '@playwright/test';
import { AllPages } from "./pages/allPages";

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