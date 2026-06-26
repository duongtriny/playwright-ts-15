import { expect, request, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonBehavior } from "./commonInterface";
import { apiBaseUrl } from "../utils/constants-utils";

export class NewProductPage extends CommonPage implements CommonBehavior {
    constructor(page: Page) {
        super(page);
    }

    async isOnPage() {
        await expect(this.page.locator("//h1[text()='Create a new product']")).toBeVisible();
    }

    async selectProductCategory(value: string) {
        await this.clickButtonByLabel('Select category');
        await this.page.getByPlaceholder('Search categories').fill(value);
        await this.page.locator(`//h3[normalize-space()='${value}']/following::button[1][normalize-space()='Select']`).click();
    }

    async newProductByApi(body: any, token: string) {
        let req = await request.newContext();
        let response = await req.post(`${apiBaseUrl}/api/products`, {
            data: body,
            headers: {
                'Cookie': token
            }
        });
        expect(response.status()).toBeTruthy();
    }
}