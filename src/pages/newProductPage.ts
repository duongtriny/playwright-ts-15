import { Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

export class NewProductPage {
    page: Page;
    commonPage: CommonPage;
    constructor(page: Page) {
        this.page = page;
        this.commonPage = new CommonPage(page)
    }

    async selectProductCategory(value: string) {
        await this.commonPage.clickButtonByLabel('Select category');
        await this.page.getByPlaceholder('Search categories').fill(value);
        await this.page.locator(`//h3[normalize-space()='${value}']/following::button[1][normalize-space()='Select']`).click();
    }
}