import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonBehavior } from "./commonInterface";
import * as allure from "allure-js-commons";

export class CategoryPage extends CommonPage implements CommonBehavior {
    constructor(page: Page) {
        super(page);
    }

    async isOnPage() {
        await allure.step("It should be on Category page", async () => {
            await expect(this.page.locator("//h1[normalize-space()='Categories' or normalize-space()='Create a new category']")).toBeVisible();
        });
    }

    async clickNewCategory() {
        await allure.step("Click on 'New Category' button", async () => {
            const xpath = `//a[normalize-space()='New Category'] | //button[normalize-space()='New Category']`;
            await this.page.locator(xpath).first().click();
        });
    }

    async verifyCategoryCreated(categoryName: string) {
        await allure.step(`Verify category "${categoryName}" is created successfully`, async () => {
            await expect(this.page.locator(`//h1[normalize-space()='Editing ${categoryName}']`)).toBeVisible();
        });
    }
}
