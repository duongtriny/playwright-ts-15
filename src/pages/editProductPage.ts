import { Page } from "@playwright/test";
import { CommonPage } from "./commonPage";

export class EditProductPage extends CommonPage {
    constructor(page: Page) {
        super(page);
    }

    getProductId() {
        let url = this.page.url();
        let splitted = url.split("/");
        return splitted[splitted.length - 1];
    }
}