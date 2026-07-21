import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonBehavior } from "./commonInterface";
import { adminPassword, adminUsername } from "../utils/constants-utils";

export class LoginPage extends CommonPage implements CommonBehavior {
    signInButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signInButton = this.page.getByRole('button', { name: 'SIGN IN' });
    }

    async isOnPage() {
        await expect(this.signInButton).toBeVisible();
    }

    async adminLogin(username: string, password: string) {
        await this.inputTextByLabel('Email', username);
        await this.inputTextByLabel('Password', password);
        await this.signInButton.click();
    }

    async defaultAdminLogin() {
        await this.adminLogin(adminUsername, adminPassword);
    }
}