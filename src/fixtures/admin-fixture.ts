import { test as base } from '@playwright/test';
import { adminBaseUrl } from '../utils/constants-utils';
import { LoginPage } from '../pages/loginPage';

export const adminTest = base.extend({
    page: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await page.goto(adminBaseUrl);
        await loginPage.isOnPage();
        await loginPage.defaultAdminLogin();
        await use(page);
        if (adminTest.info().status != 'passed') {
            await adminTest.info().attach('screenshot', {
                body: await page.screenshot({ fullPage: true }),
                contentType: 'image/png',
            });
        }
    },
});