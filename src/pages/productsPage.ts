import { expect, Page, request } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonBehavior } from "./commonInterface";
import { apiBaseUrl } from "../utils/constants-utils";

export class ProductsPage extends CommonPage implements CommonBehavior {
    constructor(page: Page) {
        super(page);
    }

    async isOnPage() {
        await expect(this.page.getByText("Create a new product")).toBeVisible();
    }

    async deleteProduct(token: string, id: string) {
        let req = await request.newContext();
        await req.delete(`${apiBaseUrl}/api/products/${id}`, {
            headers: {
                'Cookie': token
            }
        });
    }
}