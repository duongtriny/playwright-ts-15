import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

export class LoginPage {
    page: Page;
    signInButton: Locator;
    commonPage: CommonPage;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = this.page.getByRole('button', { name: 'SIGN IN' });
        this.commonPage = new CommonPage(page);
    }

    async isOnPage() {
        await expect(this.signInButton).toBeVisible();
    }

    async adminLogin(username: string, password: string) {
        await this.commonPage.inputTextByLabel('Email*', username);
        await this.commonPage.inputTextByLabel('Password*', password);
        await this.signInButton.click();
    }
}